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
                                   style="padding-left:30px;">
                        </div>
                        <div class="form-group ml-10">
                            <div class="customizeDropdown">
                                <button class="btn filter" :class="audit_status || time ? 'btn-primary':'btn-default'"
                                        type="button" data-toggle="customizeDropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>审核状态</label>
                                                <select name="audit_status" v-model="audit_status"
                                                        class="form-control selectpicker show-tick" data-size="10">
                                                    <option value="">请选择</option>
                                                    <option value="2">待审核</option>
                                                    <option value="3">已通过</option>
                                                    <option value="4">已驳回</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>提交时间</label>
                                                <input type="text" name="time" v-model="time"
                                                       class="form-control authTime"/>
                                            </div>
                                            <div class="form-group text-center">
                                                <button type="reset" class="btn btn-default" @click="clearData">重置
                                                </button>
                                                <button type="button" class="btn btn-primary ml-10"
                                                        @click="pageChange()">
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
                    <th>申请号</th>
                    <th class="w25">机构名</th>
                    <th class="w20">状态</th>
                    <th class="w25">提交时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td>
                        <router-link :to="{path:'/admin/authReview/detail',query:{id:item.id}}"><span
                                v-html="highlight(item.apply_no,keywords)"></span></router-link>
                    </td>
                    <td v-html="highlight(item.company_name,keywords)"></td>
                    <td>
                        <span v-if="item.audit_status===2" class="cf90">待审核</span>
                        <span v-if="item.audit_status===3" class="c52c">已通过</span>
                        <span v-if="item.audit_status===4" class="cf00">已驳回</span>
                    </td>
                    <td>{{item.add_time}}</td>
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
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import Pagination from '@#/shared/Pagination'
import db from '@~/js/request'

export default {
  name: 'AuthReview',
  data () {
    return {
      loading: true,
      name: 'authReview',
      keywords: '',
      audit_status: '',
      time: '',
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
    self.pageChange()
    self.$nextTick(() => {
      self.laydate.render({
        elem: '.authTime',
        type: 'date',
        range: true,
        done: (value) => {
          self.time = value
        }
      })
      $('.selectpicker').selectpicker('refresh')
    })
  },
  methods: {
    pageChange (page) {
      let self = this
      let p = page || 1
      let params = new URLSearchParams()
      self.loading = true
      params.append('page', p)
      params.append('keywords', self.keywords)
      params.append('audit_status', self.audit_status)
      params.append('time', self.time)
      db.postRequest('/Institution/Company/admAuthList', params).then(res => {
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
    clearData () {
      this.audit_status = ''
      this.time = ''
      this.pageChange()
    }
  },
  components: { Pagination },
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
