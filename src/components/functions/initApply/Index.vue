<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div :style="name==='initapply'?'display:block;':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">发起申请</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" @click="keywords=''" v-if="keywords">&#xe7f6;</i>
                            <input type="text" name="keywords" v-model="keywords" class="form-control"
                                   placeholder="请输入关键字搜索"
                                   style="padding-left:30px;">
                        </div>

                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button :class="country || applyType || submit_status || createdTime?'btn btn-primary filter':'btn btn-default filter'"
                                        type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>申请国家</label>
                                                <select class="form-control" v-model="country">
                                                    <option value="">请选择</option>
                                                    <option value="美国">美国</option>
                                                    <option value="英国">英国</option>
                                                    <option value="澳大利亚">澳大利亚</option>
                                                    <option value="加拿大">加拿大</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>申报类型</label>
                                                <select name="type" id="type" class="form-control" v-model="applyType"
                                                        style="width:180px;">
                                                    <option value="">请选择</option>
                                                    <option value="1">本科</option>
                                                    <option value="2">硕士</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>是否确认提交</label>
                                                <select name="submit_status" class="form-control" v-model="submit_status"
                                                        style="width:180px;">
                                                    <option value="">请选择</option>
                                                    <option value="1">是</option>
                                                    <option value="0">否</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>创建时间</label>
                                                <input type="text" class="form-control times"
                                                       name="createdTime"
                                                       placeholder="请选择日期">
                                            </div>
                                            <div class="form-group text-center">
                                                <button type="reset" class="btn btn-default" @click="clearData">重置
                                                </button>
                                                <button type="button" class="btn btn-primary ml-10"
                                                        @click="pagechange()">
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
                                <router-link to="/functions/initApply/ChooseSchool" class="btn btn-default"><i class="iconfont">&#xe73e;</i>
                                    添加
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <table class="table table-customize">
                    <thead>
                    <tr>
                        <th>学生姓名</th>
                        <th>申请项目</th>
                        <th>申请国家</th>
                        <th>服务顾问</th>
                        <th class="w15">创建时间</th>
                        <th class="w10"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in list" :key="i">
                        <td>
                            <router-link :to="{path:'/functions/initApply/ChooseSchool',query:{id:item.id}}" class="cded" v-html="highlight(item.name, keywords)"></router-link>
                        </td>
                        <td>{{item.apply_type}}</td>
                        <td>{{item.apply_country}}</td>
                        <td>{{item.adviser_name}}</td>
                        <td>{{item.created_time}}</td>
                        <td class="text-center">
                            <div class="dropdown">
                                <a href="javascript:void(0);" data-toggle="dropdown"><i
                                        class="iconfont">&#xe66b;</i></a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <router-link :to="{path:'/functions/initApply/ChooseSchool',query:{id:item.id}}">查看
                                        </router-link>
                                    </li>
                                    <li><a href="javascript:void(0);" v-if="item.pay_status ==='否'"
                                           @click="delApply(item.id, $event)">删除</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="6" class="text-center" v-html="LoadingImg"></td>
                    </tr>
                    <tr v-if="loading===false && list.length === 0">
                        <td colspan="6" class="text-center" v-html="NoData"></td>
                    </tr>
                    </tbody>
                </table>

                <pagination :total="total" :current-page='current' @pagechange="pagechange"></pagination>
            </div>

        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import * as _ from 'lodash'
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'initApply',
  data () {
    return {
      name: '',
      loading: true,
      keywords: '',
      country: '',
      applyType: '',
      submit_status: '',
      createdTime: '',
      list: [],
      total: 0,
      current: 1
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  created () {
    this.debouncePagechange = _.debounce(this.pagechange, 1000)
  },
  mounted () {
    let self = this
    self.name = (self.$route.name).toLocaleLowerCase()
    self.$nextTick(() => {
      self.laydate.render({
        elem: '.times',
        range: true,
        done: (value) => {
          self.createdTime = value
        }
      })
      self.pagechange(1)
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('keywords', self.keywords)
      params.append('country', self.country)
      params.append('applyType', self.applyType)
      params.append('submit_status', self.submit_status)
      params.append('createdTime', self.createdTime)
      params.append('page', p || 1)
      db.postRequest('Institution/Apply/orderList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.loading = false
        self.current = p || 1
      })
    },
    clearData () {
      let self = this
      self.keywords = ''
      self.studentName = ''
      self.studentNum = ''
      self.applyType = ''
      self.submit_status = ''
      self.createdTime = ''
      self.pagechange(1)
    },
    delApply (id, event) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.postRequest('Institution/Apply/orderDel', params).then(res => {
          if (res.status === 1) {
            $(event.target).parents('tr').remove()
            self.layer.alert(res.msg, {icon: 1}, function (i) {
              self.layer.close(i)
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      })
    }
  },
  components: {pagination},
  watch: {
    keywords () {
      this.debouncePagechange()
    },
    $route (to, from) {
      let self = this
      self.name = (to.name).toLocaleLowerCase()
      if (self.name === 'initapply') {
        setTimeout(function () {
          self.pagechange(self.current)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>

</style>
