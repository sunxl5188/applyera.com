<template>
    <div>
        <router-link :to="{path:'/functions/schoollist/FoundationDetail', query:{id:1}}">1111111111111111</router-link>
        <div v-if="loading" v-html="LoadingImg()"></div>
        <div v-if="!loading">
            <div class="po_re schoolSearch last">
                <input type="text" name="keywords" class="form-control" v-model="keywords" placeholder="请输入关键字查询"
                       autocomplete="off" @keyup.enter="pageChange(1,'search')">
                <i class="iconfont handPower clearSearch" @click="keywords='';pageChange()" v-if="keywords!==''">&#xe7f6;</i>
                <button type="button" class="btn btn-primary btn-search" @click="pageChange(1,'search')"></button>
            </div>
            <table class="table table-text-over table-customize">
                <thead>
                <tr>
                    <th>专业名称</th>
                    <th class="w25">课程时长</th>
                    <th class="w15">语言要求</th>
                    <th class="w15">
                        预计返佣
                        <a href="javascript:void(0);"
                           :class="sortComm===''?'icon-sort': (sortComm===1?'icon-sort up':'icon-sort down')"
                           @click="sortAction()"></a>
                    </th>
                    <th class="w15">收藏</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-if="list.length===0">
                    <td v-html="NoData()"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import PagInAction from '@#/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Foundation',
  store,
  props: ['id'],
  data () {
    return {
      loading: true,
      keywords: '',
      total: 0,
      current: 1,
      list: [],
      sortComm: ''
    }
  },
  computed: {},
  mounted () {},
  methods: {
    pageChange (page) {
      let self = this
      let p = page || 1
      let params = new URLSearchParams()
      self.loading = true
      params.append('page', p)
      db.postRequest('', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.current = p
        self.loading = false
      })
    },
    sortAction () {
      let self = this
      if (self.sortComm === '') {
        self.sortComm = 1
      } else if (self.sortComm === 1) {
        self.sortComm = 2
      } else if (self.sortComm === 2) {
        self.sortComm = 1
      }
    },
    addCollection (a, id, t) {
      let self = this
      let params = new URLSearchParams()
      params.append('action', a)
      params.append('unqId', id)
      params.append('type', t)
      db.postRequest('Institution/Tools/collection', params).then(res => {
        if (res.status === 1) {
          if (t === 2) {
            for (let i = 0; i < self.MajorA.length; i++) {
              if (self.MajorA[i]['unq_id'] === id) {
                self.MajorA[i]['is_clt'] = self.MajorA[i]['is_clt'] === 1 ? 0 : 1
              }
            }
          }
          if (t === 3) {
            for (let i = 0; i < self.MajorB.length; i++) {
              if (self.MajorB[i]['unq_id'] === id) {
                self.MajorB[i]['is_clt'] = self.MajorB[i]['is_clt'] === 1 ? 0 : 1
              }
            }
          }
        } else {
          console.log(res.msg)
        }
      })
    }
  },
  components: {
    PagInAction
  }
}
</script>

<style scoped>

</style>
