<template>
    <div>
        <div>
            <div class="po_re schoolSearch last">
                <input type="text" name="keywords" class="form-control" v-model="keywords" placeholder="请输入关键字查询"
                       autocomplete="off">
                <i class="iconfont handPower clearSearch" @click="keywords=''" v-if="keywords!==''">&#xe7f6;</i>
                <button type="button" class="btn btn-primary btn-search" @click="pageChange(1,'search')"></button>
            </div>
            <table class="table table-text-over table-customize">
                <thead>
                <tr>
                    <th>专业名称</th>
                    <th class="w10">课程时长</th>
                    <th class="w20">语言要求</th>
                    <th class="w15" v-if="userInfo.access.show_commission===1">
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
                    <td>
                        <div>
                            <router-link :to="{path:'/functions/schoollist/scholldetail/FoundationDetail',query:{id:item.unq_id}}" class="cded" v-html="highlight(item.major_cn,keywords)"></router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'/functions/schoollist/scholldetail/FoundationDetail',query:{id:item.unq_id}}" class="cded" v-html="highlight(item.major_en,keywords)"></router-link>
                        </div>
                    </td>
                    <td>{{item.duration}}</td>
                    <td>{{item.lang_req}}</td>
                    <td v-if="userInfo.access.show_commission===1">{{item.commission}}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm is-round" v-if="item.is_clt===0" @click="addCollection(1, item.unq_id, item.type)">加入收藏</button>
                        <button type="button" class="btn btn-default btn-sm is-round" v-if="item.is_clt===1" @click="addCollection(2, item.unq_id, item.type)">移出收藏</button>
                    </td>
                </tr>
                <tr v-if="loading">
                    <td :colspan="userInfo.access.show_commission===1?5:4" v-html="LoadingImg"></td>
                </tr>
                <tr v-if="!loading && list.length===0">
                    <td :colspan="userInfo.access.show_commission===1?5:4" v-html="NoData"></td>
                </tr>
                </tbody>
            </table>
            <pagination :total="total" :currentPage="current" :display=25 @pagechange="pageChange"></pagination>
        </div>
    </div>
</template>

<script>
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import _ from 'lodash'
import db from '@~/js/request'

export default {
  name: 'Foundation',
  store,
  props: {
    id: String
  },
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
  created () {
    this.debouncedPagechange = _.debounce(this.pageChange, 1000)
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    }
  },
  mounted () {
    this.pageChange()
  },
  methods: {
    pageChange (page, isSearch) {
      let self = this
      let p = page || 1
      let params = new URLSearchParams()
      if (isSearch === 'search' && self.keywords === '') {
        self.layer.alert('请输入关键字后搜索', {icon: 2})
        return false
      }
      self.loading = true
      params.append('school_unq_id', self.id)
      params.append('keywords', self.keywords)
      params.append('page', p)
      db.postRequest('/Institution/Tools/prepList', params).then(res => {
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
      self.pageChange()
    },
    addCollection (a, id, t) {
      let self = this
      let params = new URLSearchParams()
      params.append('action', a)
      params.append('unqId', id)
      params.append('type', t)
      db.postRequest('Institution/Tools/collection', params).then(res => {
        if (res.status === 1) {
          self.list.map((item, i) => {
            if (item.unq_id === id) {
              self.list[i]['is_clt'] = (a === 1) ? 1 : 0
            }
          })
        } else {
          console.log(res.msg)
        }
      })
    }
  },
  components: {
    pagination
  },
  watch: {
    keywords () {
      this.debouncedPagechange()
    }
  }
}
</script>

<style scoped>

</style>
