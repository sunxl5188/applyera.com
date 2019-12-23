<template>
    <div>
        <div v-show="name==='application'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">院校申请</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right:auto;left:0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" @click="keywords='';pageChange()" v-if="keywords">&#xe7f6;</i>
                            <input type="text" name="keywords" v-model="keywords" class="form-control"
                                   placeholder="请输入关键字搜索"
                                   style="padding-left:30px;"
                                   @keyup.enter="pageChange()">
                        </div>
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button class="btn btn-primary filter"
                                        type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>申请项目</label>
                                                <select class="form-control">
                                                    <option value="">请选择</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>申请国家</label>
                                                <select class="form-control">
                                                    <option value="">请选择</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>服务顾问</label>
                                                <select class="form-control">
                                                    <option value="">请选择</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>创建时间</label>
                                                <input type="text" class="form-control" id="dateTime" name="createdTime"
                                                       placeholder="请选择日期">
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
                    <th>学生姓名</th>
                    <th>申请项目</th>
                    <th>申请国家</th>
                    <th>负责顾问</th>
                    <th>所属机构</th>
                    <th>创建时间
                        <a href="javascript:void(0);"
                           :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                           @click="listSort"></a>
                    </th>
                    <th class="w10"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td>
                        <router-link :to="{path:'/admin/application/Detail',query:{id:item.id}}" class="cded">{{item.student_name}}</router-link>
                    </td>
                    <td>{{item.apply_type}}</td>
                    <td>{{item.country_list}}</td>
                    <td>{{item.user_name}}</td>
                    <td>{{item.company_name}}</td>
                    <td>{{item.created_time}}</td>
                    <td class="text-center">
                        <div class="dropdown">
                            <a href="javascript:void(0);" data-toggle="dropdown"><i class="iconfont">&#xe66b;</i></a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><router-link :to="{path:'/admin/application/Detail',query:{id:item.id}}">编辑</router-link></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr v-if="loading">
                    <td colspan="7" v-html="LoadingImg"></td>
                </tr>
                <tr v-if="!loading && list.length===0">
                    <td colspan="7" v-html="NoData"></td>
                </tr>
                </tbody>
            </table>
            <pagination :total="total" :current-page="current" @pagechange="pageChange" />
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import pagination from '@#/shared/Pagination'
import db from '@~/js/request'

export default {
  name: 'Index',
  data () {
    return {
      loading: true,
      name: '',
      keywords: '',
      time_sort: 0,
      list: [],
      current: 0,
      total: 0
    }
  },
  mounted () {
    let self = this
    self.name = self.$route.name
    self.$nextTick(() => {
      self.pageChange()
    })
  },
  methods: {
    pageChange (page) {
      let self = this
      let params = new URLSearchParams()
      self.loading = true
      params.append('page', page || 1)
      db.postRequest('/Institution/Apply/admOrderList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.current = page || 1
        self.loading = false
      })
    },
    clearData () {
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
      self.pageChange()
    }
  },
  components: {
    pagination
  },
  watch: {
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped>

</style>
