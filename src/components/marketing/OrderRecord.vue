<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle div_vm">订单记录</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group form-search">
                        <i class="iconfont" style="right:auto;left:0;">&#xe741;</i>
                        <i class="iconfont handPower clearSearch" @click="keywords=''" v-if="keywords">&#xe7f6;</i>
                        <input type="text" name="keywords" v-model="keywords" class="form-control"
                               placeholder="请输入关键字搜索"
                               style="padding-left:30px;"
                               @keyup.enter="pageChange()">
                    </div>
                    <div class="form-group ml-10">
                        <div class="customizeDropdown">
                            <button class="btn filter"
                                    :class="country || date ? 'btn-primary' : 'btn-default'"
                                    type="button" data-toggle="customizeDropdown"></button>
                            <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                <div class="pl-15 pr-15" style="width:180px;">
                                    <form action="" method="POST" class="form-horizontal">
                                        <div class="form-group">
                                            <label>所属国家</label>
                                            <select class="form-control selectpicker show-tick" data-live-search="true"
                                                    data-size="10" v-model="country">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="(item, i) in nation" :key="i">
                                                    {{item.cn}}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>生成日期</label>
                                            <input type="text" name="date" class="form-control times"
                                                   placeholder="请选择"/>
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
                    <div class="form-group">
                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default" @click="deleteId('all')"><i
                                    class="iconfont">&#xe656;</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-customize">
            <thead>
            <tr>
                <th class="w5"></th>
                <th>订单编号</th>
                <th>所属国家</th>
                <th>产品名称</th>
                <th>学生姓名</th>
                <th>联系电话</th>
                <th>支付金额</th>
                <th>更新时间
                    <a href="javascript:void(0);"
                       :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                       @click="listSort"></a>
                </th>
                <th class="w10">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <div class="custom-control custom-checkbox custom-control-inline pt-5">
                        <input type="checkbox" name="id[]" id="id" value="" class="custom-control-input">
                        <label class="custom-control-label" for="id">&nbsp;</label>
                    </div>
                </td>
                <td>3r353</td>
                <td>美国</td>
                <td>--</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>退款</td>
            </tr>
            </tbody>
        </table>
        <Pagination :total="total" :currentPage="current" @pagechange="pageChange"></Pagination>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import nation from '@@/json/nation.json'
import db from '@~/js/request'
import Pagination from '@#/shared/Pagination'
import * as _ from 'lodash'
export default {
  name: 'OrderRecord',
  data () {
    return {
      keywords: '',
      country: '',
      date: '',
      nation: nation,
      time_sort: 0,
      current: 1,
      total: 0,
      list: []
    }
  },
  created () {
    this.debouncePagechange = _.debounce(this.pageChange, 1000)
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      _.delay(() => {
        $('.selectpicker').selectpicker('refresh')
      }, 2000)
    })
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
    clearData () {},
    deleteId () {},
    listSort () {
      let self = this
      if (self.time_sort === 0) {
        self.time_sort = 1
      } else if (self.time_sort === 1) {
        self.time_sort = 2
      } else if (self.time_sort === 2) {
        self.time_sort = 1
      }
      self.pageChange(self.current)
    }
  },
  components: {Pagination},
  watch: {
    keywords () {
      this.debouncePagechange()
    }
  }
}
</script>

<style scoped>

</style>
