<template>
    <div>
        <div :style="name==='stu_list'?'':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">学生类型</div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" v-if="keyword" @click="keyword=''">&#xe7f6;</i>
                            <input type="text" name="keyword" class="form-control"
                                   placeholder="搜索"
                                   style="padding-left:30px;" v-model="keyword">
                        </div>
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button :class="created_time || status ?'btn btn-primary filter':'btn btn-default filter'" type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal" autocomplete="off">
                                            <div class="form-group">
                                                <label>生成日期</label>
                                                <input type="text" name="created_time" class="form-control times"
                                                       placeholder="请选择时间" v-model="created_time">
                                            </div>
                                            <div class="form-group">
                                                <label>状态</label>
                                                <select name="status" class="form-control" v-model="status">
                                                    <option value="">请选择</option>
                                                    <option value="1">启用</option>
                                                    <option value="2">停用</option>
                                                </select>
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

                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <router-link to="/setting/student_type/detail" class="btn btn-default"><i class="iconfont">&#xe73e;</i>
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
                        <th>类型编号</th>
                        <th>学生类型</th>
                        <th>
                            创建时间
                            <a href="javascript:void(0);"
                               :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                               @click="listSort"></a>
                        </th>
                        <th>状态</th>
                        <th class="w10"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td v-html="highlight(item.stu_type_num, keyword)"></td>
                        <td>{{item.stu_type}}</td>
                        <td>{{item.created_time}}</td>
                        <td>
                            <span class="c52c" v-if="item.status===1">启用</span>
                            <span class="c999" v-if="item.status===2">停用</span>
                        </td>
                        <td class="text-center">
                            <div class="dropdown">
                                <a href="javascript:void(0);" data-toggle="dropdown"><i
                                        class="iconfont">&#xe66b;</i></a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <router-link
                                                :to="{path:'/setting/student_type/detail',query:{id:item.id}}">编辑
                                        </router-link>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" @click="setDisable(item.id,2)"
                                           v-if="item.status===1">停用</a>
                                        <a href="javascript:void(0);" @click="setDisable(item.id,1)"
                                           v-if="item.status===2">启用</a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="8" class="text-center" v-html="LoadingImg"></td>
                    </tr>
                    <tr v-if="loading===false && list.length === 0">
                        <td colspan="8" class="text-center" v-html="NoData"></td>
                    </tr>
                    </tbody>
                </table>
                <pagination :total="total" :current-page='current' @pagechange="pagechange"
                             v-if="list.length > 0"></pagination>
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
  name: 'List',
  store,
  data () {
    return {
      loading: true,
      name: 'stu_list',
      keyword: '',
      created_time: '',
      status: '',
      current: 1,
      total: 0,
      list: [],
      time_sort: 0
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
    self.name = self.$route.name
    self.$nextTick(() => {
      if (self.name === 'stu_list') {
        self.pagechange()
      }

      setTimeout(function () {
        self.laydate.render({
          elem: '.times',
          type: 'date',
          done: (value) => {
            self.created_time = value
          }
        })
      }, 1000)
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      self.loading = true
      params.append('keyword', self.keyword)
      params.append('created_time', self.created_time)
      params.append('status', self.status)
      params.append('sort_by_time', self.time_sort)
      params.append('page', p || 1)
      db.postRequest('Institution/StudentType/index', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg)
        }
        self.loading = false
        self.current = p || 1
      })
    },
    clearData () {
      this.keyword = ''
      this.created_time = ''
      this.status = ''
      this.pagechange()
    },
    listSort () {
      let self = this
      if (self.time_sort === 0) {
        self.time_sort = 1
      } else if (self.time_sort === 1) {
        self.time_sort = 2
      } else if (self.time_sort === 2) {
        self.time_sort = 1
      }
      self.pagechange()
    },
    setDisable (id, i) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('status', i)
      db.postRequest('Institution/StudentType/changeStatus', params).then(res => {
        if (res.status === 1) {
          self.list.map(item => {
            if (item.id === id) {
              item.status = i
            }
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    }
  },
  components: {pagination},
  watch: {
    keyword () {
      this.debouncePagechange()
    },
    $route (to, from) {
      this.name = to.name
      this.pagechange(this.current)
    }
  }
}
</script>

<style scoped>

</style>
