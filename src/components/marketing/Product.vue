<template>
    <div>
        <div v-show="name==='product'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle div_vm">产品管理</div>
                        <a href="#" class="c999 ml-10" data-toggle="modal" data-backdrop="static"
                           data-target="#modalSalesLeads">
                            <i class="iconfont">&#xe999;</i>
                            <span class="div_vm lh34">如何设置？</span>
                        </a>
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
                            <div class="dropdown">
                                <button class="btn filter" :class="country || date || userId ? 'btn-primary' : 'btn-default'"
                                        type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>所属国家</label>
                                                <select class="form-control" v-model="country">
                                                    <option value="">请选择</option>
                                                    <option :value="item.id" v-for="(item, i) in nation" :key="i">{{item.cn}}</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>生成日期</label>
                                                <input type="text" name="date" class="form-control times" placeholder="请选择"/>
                                            </div>
                                            <div class="form-group">
                                                <label>发布者</label>
                                                <select class="form-control" v-model="userId">
                                                    <option value="">请选择</option>
                                                    <option :value="item.id" v-for="(item, i) in userList" :key="i">{{item.user_name}}</option>
                                                </select>
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
                            <div class="form-group ml-10">
                                <router-link to="/marketing/product/detail" class="btn btn-default"><i
                                        class="iconfont">&#xe73e;</i>
                                    添加
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modalSalesLeads">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">如何设置</h4>
                        </div>
                        <div class="modal-body">
                            <p>欢迎您使用申学纪线上支付功能，本功能旨在帮助机构及顾问老师将支付线上化，提升用户付费体验及提高机构的管理效率。使用该功能需要开通微信，支付宝支付，请联系申学纪客服开通。</p>
                            <p>STEP 1 复制链接</p>
                            <p class="form-inline">
                                <input type="text" name="linkUrl" id="linkUrl" v-model="linkUrl" class="form-control"
                                       style="width: 80%;" value="" readonly>
                                <button type="button" class="btn btn-primary copyBtn" data-clipboard-target="#linkUrl"
                                        @click="CopyText">复制链接
                                </button>
                            </p>
                            <p>STEP 2 设置链接</p>
                            <p>登录微信公众号后台将链接放置在公众号按钮中，或直接发送给市场人员</p>
                            <p><img src="../../../static/images/u270.jpg" alt="" class="img-responsive"></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">知道了</button>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-customize">
                <thead>
                <tr>
                    <th class="w5"></th>
                    <th>订单号</th>
                    <th>国家</th>
                    <th>名称</th>
                    <th>价格</th>
                    <th class="w10">发布者</th>
                    <th class="w20">发布时间</th>
                    <th class="w5"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td>
                        <input type="checkbox" name="id[]" :value="item.id">
                    </td>
                    <td>{{item.order_no}}</td>
                    <td>{{item.country|countryActive}}</td>
                    <td>{{item.prod_name}}</td>
                    <td>￥{{item.fee_cny}}</td>
                    <td>{{item.user_name}}</td>
                    <td>{{item.add_time}}</td>
                    <td class="text-center">
                        <div class="dropdown">
                            <a href="javascript:void(0);" data-toggle="dropdown"><i
                                    class="iconfont">&#xe66b;</i></a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li>
                                    <router-link :to="{path:'/marketing/product/detail', query:{ id:item.id }}">查看
                                    </router-link>
                                </li>
                                <li><a href="javascript:void(0);" @click="deleteId(item.id)">删除</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr v-if="loading">
                    <td colspan="8" v-html="LoadingImg"></td>
                </tr>
                <tr v-if="!loading && list.length===0">
                    <td colspan="8" v-html="NoData"></td>
                </tr>
                </tbody>
            </table>
            <Pagination :total="total" :currentPage="current" @pagechange="pageChange"></Pagination>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import nation from '@@/json/nation.json'
import Clipboard from 'clipboard'
import Pagination from '@#/shared/Pagination'
import _ from 'lodash'
import db from '@~/js/request'

export default {
  name: 'Product',
  data () {
    return {
      loading: true,
      name: '',
      keywords: '',
      country: '',
      date: '',
      userId: '',
      linkUrl: '',
      nation: nation,
      current: 1,
      total: 0,
      list: [],
      arrId: [],
      userList: []
    }
  },
  created () { // 在实例创建完成后
    this.debouncedPagechange = _.debounce(this.pageChange, 1000)
  },
  mounted () {
    let self = this
    self.name = self.$route.name
    self.copyBtn = new Clipboard('.copyBtn')
    self.$nextTick(() => {
      if (self.name === 'product') {
        self.getUserList()
        self.pageChange()
      }
      self.laydate.render({
        elem: '.times',
        type: 'date',
        range: true,
        done: (value) => {
          self.date = value
        }
      })
      // 点击checkbox
      $(document).on('click', '[name="id[]"]', function () {
        let isCheck = $(this).is(':checked')
        let val = $(this).val()
        if (isCheck) {
          self.arrId.push(val)
        } else {
          self.arrId.map((item, i) => {
            if (item === val) {
              self.arrId.splice(i, 1)
            }
          })
        }
      })
      // 获取如何设置URL
      db.postRequest('/Institution/PayProd/createUrl', {}).then(res => {
        if (res.status === 1) {
          self.linkUrl = res.data
        } else {
          console.log(res.msg)
        }
      })
    })
  },
  methods: {
    getUserList () {
      let self = this
      let params = new URLSearchParams()
      db.getRequest('/Institution/PayProd/userList', params).then(res => {
        if (res.status === 1) {
          self.userList = res.data
        } else {
          console.log(res.msg)
        }
      })
    },
    pageChange (page) {
      let self = this
      let p = page || 1
      let params = new URLSearchParams()
      self.loading = true
      params.append('page', p)
      params.append('keywords', self.keywords)
      params.append('country', self.country)
      params.append('date', self.date)
      params.append('userId', self.userId)
      db.postRequest('/Institution/PayProd/index', params).then(res => {
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
      this.country = ''
      this.date = ''
      this.userId = ''
    },
    deleteId (type) {
      let self = this
      let params = new URLSearchParams()
      if (self.arrId.length === 0 && type === 'all') {
        self.layer.alert('请选择操作编号', {icon: 2})
        return false
      }
      self.layer.confirm('您确定要删除此信息？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        if (type === 'all') {
          self.arrId.map(item => {
            params.append('ids[]', item)
          })
        } else {
          params.append('ids[]', type)
        }
        db.postRequest('/Institution/PayProd/del', params).then(res => {
          if (res.status === 1) {
            self.pageChange(self.current)
            self.layer.alert(res.msg, {icon: 1})
          } else {
            self.layer.alert(res.msg, {icon: 2})
          }
        })
      })
    },
    CopyText () {
      let self = this
      let clipboard = self.copyBtn
      clipboard.on('success', function () {
        self.layer.msg('复制成功')
      })
      clipboard.on('error', function () {
        self.layer.msg('复制失败，请手动选择复制！')
      })
    }
  },
  components: { Pagination },
  watch: {
    keywords () {
      this.debouncedPagechange()
    },
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped>

</style>
