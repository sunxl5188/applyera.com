<template>
    <div>
        <div :style="name==='commarrival'?'display:block;':'display:none;'">

            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">学生管理</div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button :class="studentName || studentNum || applyType || insCompany || createdTime ?'btn btn-primary filter':'btn btn-default filter'" type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>学生姓名</label>
                                                <input type="text" name="" class="form-control" v-model="studentName" placeholder="请输入信息">
                                            </div>
                                            <div class="form-group">
                                                <label>学生编号</label>
                                                <input type="text" name="" class="form-control" v-model="studentNum" placeholder="请输入信息">
                                            </div>
                                            <div class="form-group">
                                                <label>申报类型</label>
                                                <select name="applyType" id="applyType" class="form-control" v-model.number="applyType">
                                                    <option value="">请选择</option>
                                                    <option value="1">本科</option>
                                                    <option value="2">硕士</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>中介机构</label>
                                                <input type="text" name="" class="form-control" v-model="insCompany" placeholder="请输入信息">
                                            </div>
                                            <div class="form-group">
                                                <label>日期</label>
                                                <input type="text" id="dateTime" name="createdTime"
                                                       class="form-control times"
                                                       placeholder="请选择时间">
                                            </div>

                                            <div class="form-group text-center">
                                                <button type="reset" class="btn btn-default" @click="clearData">重置
                                                </button>
                                                <button type="button" class="btn btn-primary ml-10" @click="pagechange(1)">
                                                    开始筛选
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </ul>
                            </div>
                        </div>

                        <div class="form-group ml-10">
                            <router-link to="/admin/commarrival/arrival" class="btn btn-default"><i class="iconfont">&#xe73e;</i> 添加</router-link>
                        </div>

                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default" @click="refresh"><i class="iconfont">&#xe64e;</i> 刷新</button>
                        </div>

                    </div>

                </div>
            </div>

            <div class="row">
                <table class="table table-customize">
                    <thead>
                    <tr>
                        <th class="w10">操作</th>
                        <th>学生编号</th>
                        <th>学生姓名</th>
                        <th>申报类型</th>
                        <th>申报学校</th>
                        <th>申报专业</th>
                        <th>中介机构</th>
                        <th>创建时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td>
                            <router-link :to="{path:'/admin/commarrival/arrival',query:{id:item.id}}"
                                         class="cded">
                                查看
                            </router-link>
                            <a href="javascript:void(0);" class="cded ml-5" @click="delData(item.id)">删除</a>
                        </td>
                        <td>{{item.number}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.apply_type}}</td>
                        <td>{{item.school_name}}</td>
                        <td>{{item.major_name}}</td>
                        <td>{{item.company_name}}</td>
                        <td>{{item.created_time}}</td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="8" v-html="LoadingImg"></td>
                    </tr>
                    <tr v-if="!loading && list.length===0">
                        <td colspan="8" v-html="NoData"></td>
                    </tr>
                    </tbody>
                </table>
                <PagInAction :total="total" @pagechange="pagechange"></PagInAction>
            </div>

        </div>

        <router-view></router-view>

    </div>
</template>

<script>
import PagInAction from '@#/shared/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Index',
  store,
  data () {
    return {
      loading: true,
      name: 'commarrival',
      studentName: '',
      studentNum: '',
      applyType: '',
      insCompany: '',
      createdTime: '',
      list: [],
      total: 0
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.name = self.$route.name
    self.$nextTick(() => {
      self.laydate.render({
        elem: '#dateTime',
        range: true,
        done (val) {
          self.createdTime = val
        }
      })
      if (self.name === 'commarrival') {
        self.pagechange(1)
      }
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('studentName', self.studentName)
      params.append('studentNum', self.studentNum)
      params.append('applyType', self.applyType)
      params.append('insCompany', self.insCompany)
      params.append('createdTime', self.createdTime)
      params.append('page', p)
      self.loading = true
      db.postRequest('Institution/Commission/incomeList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
        self.current = p || 1
      })
    },
    clearData () {
      this.studentName = ''
      this.studentNum = ''
      this.applyType = ''
      this.insCompany = ''
      this.createdTime = ''
      this.pagechange(1)
    },
    delData (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.postRequest('Institution/Commission/incomeDel', params).then(res => {
        if (res.status === 1) {
          self.list.map((item, i) => {
            if (item.id === id) {
              self.list.splice(i, 1)
            }
          })
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    }
  },
  components: {
    PagInAction
  },
  watch: {
    $route (to, from) {
      this.name = to.name
      if (this.name === 'commarrival') {
        this.pagechange(1)
      }
    }
  }
}
</script>

<style scoped>

</style>
