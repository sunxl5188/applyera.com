<template>
    <div>
        <div v-if="loading" v-html="LoadingImg()"></div>
        <div v-if="!loading">
            <div class="po_re schoolSearch last">
                <input type="text" name="keywords" class="form-control" v-model="keywords"
                       @keyup.enter="pageChange(1,'search')" placeholder="请输入关键字查询"
                       autocomplete="off">
                <i class="iconfont handPower clearSearch" @click="keywords='';pageChange()" v-if="keywords!==''">&#xe7f6;</i>
                <button type="button" class="btn btn-primary btn-search" @click="pageChange(1,'search')"></button>
            </div>
            <div class="row">
                <table class="table table-text-over table-customize">
                    <thead>
                    <tr>
                        <th>专业名称</th>
                        <th class="w25">所属学院</th>
                        <th class="w15">学科领域</th>
                        <th class="w15" v-if="userInfo.access.show_commission===1">
                            佣金比例
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
                            <router-link :to="{path:'/functions/schoollist/majordetailb', query:{id:item.unq_id}}">
                                <div class="lh20 cded textOver">
                                    <span v-html="highlight(cutString(item.major_en, 30), keywords)" :title="item.major_en +'<br>'+item.major_cn" data-toggle="tooltip"></span>
                                    <i class="iconfont cf00" v-if="item.is_hot">&#xe633;</i>
                                </div>
                                <div class="lh20">
                                    <span v-html="highlight(cutString(item.major_cn, 30), keywords)" :title="item.major_en +'<br>'+item.major_cn" data-toggle="tooltip"></span>
                                </div>
                            </router-link>
                        </td>
                        <td>
                            <router-link :to="{path:'/functions/schoollist/majordetailb', query:{id:item.unq_id}}">
                                <div class="lh20"><span v-html="highlight(cutString(item.college_en,30), keywords)" :title="item.college_en!=='-'?item.college_en +'<br>'+item.college_cn:''" data-toggle="tooltip"></span></div>
                                <div class="lh20 c999"><span v-html="highlight(cutString(item.college_cn,20), keywords)" :title="item.college_en!=='-'?item.college_en +'<br>'+item.college_cn:''" data-toggle="tooltip"></span></div>
                            </router-link>
                        </td>
                        <td>{{item.major_area}}</td>
                        <td v-if="userInfo.access.show_commission===1">{{item.commission_rate}}</td>
                        <td>
                            <a href="javascript:void(0);" class="btn btn-primary btn-sm is-round"
                               @click="addCollection(1, item.unq_id, 3)"
                               v-if="item.is_clt === 0">加入收藏</a>
                            <a href="javascript:void(0);" class="btn btn-default btn-sm is-round"
                               @click="addCollection(2, item.unq_id, 3)"
                               v-if="item.is_clt === 1">移出收藏</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <PagInAction :total="total" :current-page='current' :display="display"
                         @pagechange="pageChange"></PagInAction>
        </div>
    </div>
</template>

<script>
import PagInAction from '@#/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'MajorListB',
  store,
  props: ['id'],
  data () {
    return {
      loading: true,
      keywords: '',
      total: 0,
      current: 1,
      display: 50,
      list: [],
      sortComm: ''
    }
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
    pageChange (p, t) {
      let self = this
      let params = new URLSearchParams()
      if (t === 'search' && self.keywords === '') {
        self.layer.alert('请输入关键字搜索', {icon: 2})
      }
      self.loading = true
      params.append('schoolUnqId', self.id)
      params.append('keywords', self.keywords)
      params.append('sort', self.sortComm)
      params.append('page', p || 1)
      db.postRequest('Institution/Tools/majorList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
          setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip({html: true})
          }, 500)
        } else {
          console.log(res.msg)
        }
        self.loading = false
        self.current = p || 1
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
