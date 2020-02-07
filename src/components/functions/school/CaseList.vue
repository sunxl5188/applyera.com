<template>
    <div>
        <div v-if="loading" v-html="LoadingImg"></div>
        <div v-if="!loading">
            <div class="po_re schoolSearch last">
                <input type="text" name="keywordsB" class="form-control" v-model="keywords" placeholder="请输入关键字查询"
                       autocomplete="off">
                <i class="iconfont handPower clearSearch" @click="keywords=''" v-if="keywords!==''">&#xe7f6;</i>
                <button type="button" class="btn btn-primary btn-search" @click="getCase()"></button>
            </div>

            <div class="clearfix" v-if="userInfo.access.show_school_case!==1">
                <img src="../../../../static/images/permission.jpg" alt="" class="img-responsive"
                     style="margin:0 auto;">
            </div>
            <div class="clearfix pt-10" v-if="userInfo.access.show_school_case===1">
                <div class="clearfix">
                    <div v-if="caseList.length === 0" v-html="NoData"></div>
                    <div class="row grid">
                        <div class="grid-item col-xs-4 col-sm-4 col-md-4 col-lg-4" v-for="(item, i) in caseList" :key="i">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <p v-for="(items, i) in item.content" :key="i">
                                        <span v-html="highlight(i, keywords) +'：' + highlight(items, keywords)"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <pagination :total="total" :current-page='current' :display=18 @pagechange="getCase" v-if="caseList.length > 0"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import '@@/js/jquery.masonry.min'
import pagination from '@#/shared/Pagination'
import * as _ from 'lodash'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'CaseList',
  store,
  props: ['id'],
  data () {
    return {
      loading: true,
      keywords: '',
      caseList: [],
      total: 0,
      current: 1
    }
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    }
  },
  created () {
    this.debouncedPagechange = _.debounce(this.getCase, 1000)
  },
  mounted () {
    this.getCase()
  },
  methods: {
    // 获取过往案例
    getCase (page) {
      let self = this
      let p = page || 1
      let params = new URLSearchParams()
      params.append('unq_id', self.id)
      params.append('page', p)
      params.append('keywords', self.keywords)
      self.loading = true
      db.postRequest('Institution/Tools/applyExample', params).then(res => {
        if (res.status === 1) {
          self.caseList = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.current = p
        self.loading = false
        _.delay(() => {
          $('.grid').masonry({
            // options...
            itemSelector: '.grid-item',
            columnWidth: 0
          })
        }, 500)
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
