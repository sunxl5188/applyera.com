<template>
  <div>
    <div class="clearfix pb-30">
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div class="headerTitle">支付记录</div>
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
              <button class="btn btn-default filter" :class="{'btn-primary':pay_channel || pay_time}" type="button"
                      data-toggle="customizeDropdown"></button>
              <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                <div class="pl-15 pr-15" style="width:180px;">
                  <form action="" method="POST" class="form-horizontal">
                    <div class="form-group">
                      <label>支付渠道</label>
                      <select name="pay_channel" v-model="pay_channel" class="form-control selectpicker show-tick"
                              data-size="10"
                              data-dropup-auto="false">
                        <option value="">请选择</option>
                        <option value="支付宝">支付宝</option>
                        <option value="微信">微信</option>
                        <option value="银联">银联</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>支付时间</label>
                      <input type="text" name="pay_time" v-model="pay_time" placeholder="请选择时间"
                             class="form-control pay-times"/>
                    </div>
                    <div class="form-group text-center">
                      <button type="reset" class="btn btn-default" @click="clearData">重置</button>
                      <button type="button" class="btn btn-primary ml-10" @click="pageChange(1)">
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
        <th>支付机构</th>
        <th>支付账号</th>
        <th>支付金额</th>
        <th>支付项目</th>
        <th>支付渠道</th>
        <th>支付时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in list" :key="i">
        <td>{{item.company_name}}</td>
        <td>{{item.user_name}}</td>
        <td>{{item.pay_fee_cny}}</td>
        <td>{{item.school_name}}</td>
        <td>{{item.pay_channel}}</td>
        <td>{{item.pay_time}}</td>
      </tr>
      <tr v-if="loading">
        <td colspan="6" v-html="LoadingImg"></td>
      </tr>
      <tr v-if="!loading && list.length===0">
        <td colspan="6" v-html="NoData"></td>
      </tr>
      </tbody>
    </table>
    <Pagination :total="total" :current-page='current' @pagechange="pageChange"></Pagination>
  </div>
</template>

<script>
import * as _ from 'lodash'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN.min'
import Pagination from '@#/shared/Pagination'
import db from '@~/js/request'

export default {
  name: 'PayRecording',
  data () {
    return {
      loading: true,
      keywords: '',
      pay_channel: '',
      pay_time: '',
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
    self.$nextTick(() => {
      self.pageChange()
      self.laydate.render({
        elem: '.pay-times',
        type: 'date',
        range: true,
        done: (value) => {
          self.pay_time = value
        }
      })
      $('.selectpicker').selectpicker()
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
      params.append('pay_channel', self.pay_channel)
      params.append('pay_time', self.pay_time)
      db.postRequest('/Institution/Apply/admPayRecord', params).then(res => {
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
      this.keywords = ''
      this.pay_channel = ''
      this.pay_time = ''
      this.pageChange()
    }
  },
  components: { Pagination },
  watch: {
    keywords () {
      this.debouncePagechange()
    }
  }
}
</script>

<style scoped>

</style>
