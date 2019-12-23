<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div :class="{hidden:name!=='answer'}">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">题目作答</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" @click="keyword='';pageChange()" v-if="keyword">&#xe7f6;</i>
                            <input type="text" name="keywords" v-model="keyword" class="form-control"
                                   placeholder="请输入关键字搜索"
                                   style="padding-left:30px;"
                                   @keyup.enter="pageChange()">
                        </div>
                        <div class="form-group ml-10">
                            <div class="customizeDropdown">
                                <button :class="add_time || user_id || status?'btn btn-primary filter':'btn btn-default filter'" type="button"
                                        data-toggle="customizeDropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>生成日期</label>
                                                <input type="text" name="times" v-model="add_time" id="times"
                                                       class="form-control" placeholder="请选择日期"/>
                                            </div>
                                            <div class="form-group">
                                                <label>负责顾问</label>
                                                <select class="form-control selectpicker show-tick" v-model="user_id">
                                                    <option value="">请选择</option>
                                                    <option :value="i" v-for="(item, i) in userArr" :key="i">{{item}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>作答状态</label>
                                                <select class="form-control selectpicker show-tick" v-model="status">
                                                    <option value="">请选择</option>
                                                    <option :value="i" v-for="(item, i) in statusArr" :key="i">
                                                        {{item}}
                                                    </option>
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
                                <router-link to="/functions/answer/addAnswer" class="btn btn-default dropdown-toggle">添加文书</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-customize">
                <thead>
                <tr>
                    <th>学生姓名</th>
                    <th>院校名称</th>
                    <th>负责顾问</th>
                    <th>作答状态</th>
                    <th>
                        创建时间
                        <a href="javascript:void(0);"
                           :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                           @click="listSort"></a>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td>
                        <router-link :to="{path:'/functions/answer/addAnswer',query:{id:item.id}}" class="cded" v-html="highlight(item.stu_name, keyword)"></router-link>
                    </td>
                    <td>{{item.school_name}}</td>
                    <td>{{item.oper_name}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.created_time}}</td>
                    <td width="5%">
                        <div class="dropdown">
                            <a href="javascript:void(0);" data-toggle="dropdown"><i
                                    class="iconfont">&#xe66b;</i></a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li>
                                    <router-link :to="{path:'/functions/answer/addAnswer',query:{id:item.id}}">查看
                                    </router-link>
                                </li>
                                <li><a href="javascript:void(0);" @click="deleteId(item.id)">删除</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr v-if="loading">
                    <td colspan="6" v-html="LoadingImg"></td>
                </tr>
                <tr v-if="!loading && list.length === 0">
                    <td colspan="6" v-html="NoData"></td>
                </tr>
                </tbody>
            </table>
            <pagination :total="total" :current-page="current" @pagechange="pageChange"/>
        </div>
        <router-view/>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import pagination from '@#/shared/Pagination'
import db from '@~/js/request'

export default {
  name: 'Index',
  data () {
    return {
      loading: true,
      name: 'answer',
      keyword: '',
      user_id: '',
      add_time: '',
      status: '',
      list: [],
      total: 0,
      current: 1,
      time_sort: 0,
      userArr: [],
      statusArr: []
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.name = self.$route.name
      self.pageChange()
      self.laydate.render({
        elem: '#times',
        type: 'date',
        done: (value) => {
          self.add_time = value
        }
      })
    })
  },
  methods: {
    pageChange (page) {
      let self = this
      let params = new URLSearchParams()
      params.append('user_id', self.user_id)
      params.append('status', self.status)
      params.append('add_time', self.add_time)
      params.append('keywords', self.keyword)
      params.append('sort', self.time_sort)
      params.append('page', page || 1)
      self.loading = true
      db.postRequest('Institution/Document/qsList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
          self.userArr = res.data.option.user_list
          self.statusArr = res.data.option.status_list
        } else {
          console.log(res.msg)
        }
        self.current = page || 1
        self.loading = false
        self.setSelect()
      })
    },
    clearData () {
      this.keyword = ''
      this.user_id = ''
      this.add_time = ''
      this.status = ''
      this.pageChange()
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
    },
    deleteId (id) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.postRequest('Institution/Document/qsDel', params).then(res => {
          if (res.status === 1) {
            self.list.map((item, i) => {
              if (item.id === id) {
                self.list.splice(i, 1)
              }
            })
            self.layer.alert(res.msg, { icon: 1 }, function (i) {
              self.layer.close(i)
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      })
    },
    setSelect () {
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh')
      }, 500)
    }
  },
  components: { pagination },
  watch: {
    $route (to, from) {
      this.name = to.name
      if (this.name === 'answer') {
        this.pageChange(this.current)
      }
    }
  }
}
</script>

<style scoped>

</style>
