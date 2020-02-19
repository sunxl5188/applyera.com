<template>
    <div>
        <div v-show="name==='authReview'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">认证审核</div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right:auto;left:0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" @click="keywords=''" v-if="keywords">&#xe7f6;</i>
                            <input type="text" name="keywords" v-model="keywords" class="form-control"
                                   placeholder="搜索"
                                   style="padding-left:30px;"
                                   @keyup.enter="pageChange()">
                        </div>
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button class="btn btn-default filter" type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>用户名称</label>
                                                <input type="text" class="form-control" placeholder="请输入信息"/>
                                            </div>
                                            <div class="form-group text-center">
                                                <button type="reset" class="btn btn-default" @click="clearData">重置</button>
                                                <button type="button" class="btn btn-primary ml-10" @click="pageChange">
                                                    开始筛选
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <table class="table table-customize">
                <thead>
                <tr>
                    <th>机构名</th>
                    <th>申请号</th>
                    <th>状态</th>
                    <th>提交时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td></td>
                    <td>
                        <router-link :to="{path:'/admin/authReview/detail',query:{id:1}}"></router-link>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-if="loading">
                    <td colspan="4" v-html="LoadingImg"></td>
                </tr>
                <tr v-if="!loading && list.length===0">
                    <td colspan="4" v-html="NoData"></td>
                </tr>
                </tbody>
            </table>
            <Pagination :total="total" :currentPage="current" @pagechange="pageChange"></Pagination>
        </div>
        <router-view/>
    </div>
</template>

<script>
import * as _ from 'lodash'
import Pagination from '@#/shared/Pagination'
import db from '@~/js/request'

export default {
  name: 'AuthReview',
  data () {
    return {
      loading: true,
      name: 'authReview',
      keywords: '',
      current: 1,
      total: 0,
      list: []
    }
  },
  created () { // 在实例创建完成后
    this.debouncePagechange = _.debounce(this.pageChange, 1000)
  },
  mounted () {
    let self = this
    self.name = self.$route.name || ''
    self.$nextTick(() => {})
  },
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
    clearData () {}
  },
  components: {Pagination},
  watch: {
    $route (to, from) {
      this.name = to.name
    },
    keywords () {
      this.debouncePagechange()
    }
  }
}
</script>

<style scoped>

</style>
