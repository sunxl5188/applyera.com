<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div :style="name==='plan'?'display: block;':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">留学规划</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right:auto;left:0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" @click="keywords='';pagechange()" v-if="keywords">&#xe7f6;</i>
                            <input type="text" name="keywords" v-model="keywords" class="form-control"
                                   placeholder="请输入关键字搜索"
                                   style="padding-left:30px;"
                                   @keyup.enter="pagechange()">
                        </div>
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button :class="item || country || user || dates ?'btn btn-primary filter':'btn btn-default filter'"
                                        type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>申请项目</label>
                                                <select class="form-control" v-model="item">
                                                    <option value="">请选择</option>
                                                    <option value="本科">本科</option>
                                                    <option value="本科预科">本科预科</option>
                                                    <option value="本硕连读">本硕连读</option>
                                                    <option value="硕士">硕士</option>
                                                    <option value="硕士预科">硕士预科</option>
                                                    <option value="博士">博士</option>
                                                    <option value="硕博连读">硕博连读</option>
                                                    <option value="ESL(语言班)">ESL(语言班)</option>
                                                    <option value="高中">高中</option>
                                                    <option value="初中">初中</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>申请国家</label>
                                                <select class="form-control" v-model="country">
                                                    <option value="">请选择</option>
                                                    <option :value="item.id" v-for="(item, i) in nation" :key="i">
                                                        {{item.cn}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>服务顾问</label>
                                                <select class="form-control" v-model="user">
                                                    <option value="">请选择</option>
                                                    <option :value="item.id" v-for="(item,i) in companyList" :key="i">
                                                        {{item.name}}
                                                    </option>
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
                                <router-link to="/functions/plan/edit" class="btn btn-default"><i class="iconfont">&#xe73e;</i>
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
                        <th class="w15">申请项目</th>
                        <th class="w25">申请国家</th>
                        <th class="w10">服务顾问</th>
                        <th class="w15">创建时间</th>
                        <th class="w10"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in list" :key="i">
                        <td>
                            <router-link :to="{path:'/functions/plan/view',query:{id:item.id}}"><span class="cded" v-html="highlight(item.name,keywords)"></span>
                                (<span v-html="highlight(item.number, keywords)"></span>)
                            </router-link>
                        </td>
                        <td>{{item.ins_student_apply_degree}}</td>
                        <td>{{setCountry(item.ins_student_intention_country)}}</td>
                        <td>{{item.user_name}}</td>
                        <td>{{item.create_time}}</td>
                        <td class="text-center">
                            <div class="dropdown">
                                <a href="javascript:void(0);" data-toggle="dropdown"><i
                                        class="iconfont">&#xe66b;</i></a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <router-link :to="{path:'/functions/plan/view', query:{ id:item.id }}">查看
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{path:'/functions/plan/edit', query:{ id:item.id }}">编辑
                                        </router-link>
                                    </li>
                                    <li><a href="javascript:void(0);" @click="studentDelete(item.id)">删除</a></li>
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

                <pagination :total="total" :current-page='current' @pagechange="pagechange"
                             v-if="list.length > 0"></pagination>
            </div>

        </div>

        <router-view></router-view>

    </div>
</template>

<script>
import nation from '@@/json/nation.json'
import pagination from '@#/shared/Pagination'
import db from '@~/js/request'
import store from '@/vuex/Store'

export default {
  name: 'Index',
  store,
  data () {
    return {
      name: 'plan',
      loading: true,
      nation: nation,
      keywords: '',
      item: '',
      country: '',
      user: '',
      dates: '',
      total: 0,
      current: 1,
      list: [],
      companyList: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this

    self.$nextTick(() => {
      self.name = (self.$route.name).toLocaleLowerCase()

      self.laydate.render({
        elem: '#dateTime',
        range: true,
        done: function (value, date, endDate) {
          self.dates = value
        }
      })

      if (self.name === 'plan') {
        self.pagechange(1)
      }

      self.getCompany()
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('page', p || 1)
      params.append('item', self.item)
      params.append('keywords', self.keywords)
      params.append('country', self.country)
      params.append('user', self.user)
      params.append('date', self.dates)
      self.loading = true
      db.postRequest('Institution/Plan/index', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    },
    clearData () {
      let self = this
      self.keywords = ''
      self.item = ''
      self.country = ''
      self.user = ''
      self.dates = ''
      self.pagechange(1)
    },
    // 删除文档
    studentDelete (id) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.getRequest('Institution/Plan/delete', params).then(res => {
          if (res.status === 1) {
            for (let i = 0; i < self.list.length; i++) {
              if (self.list[i]['id'] === id) {
                self.list.splice(i, 1)
              }
            }
          } else {
            console.log(res.msg)
          }
        })
      })
    },
    setCountry (arr) {
      let self = this
      let Arr = arr.split(',')
      let text = []
      Arr.map(item => {
        self.nation.map(items => {
          if (items.id === parseInt(item)) {
            text.push(items.cn)
          }
        })
      })
      return text.join(',')
    },
    // 获取顾问
    getCompany () {
      let self = this
      db.getRequest('Institution/ApplyMaterial/getUserList', {}).then(res => {
        if (res.status === 1) {
          self.companyList = res.data
        } else {
          console.log(res.msg)
        }
      })
    }
  },
  components: {
    pagination
  },
  watch: {
    $route (to, from) {
      let self = this
      self.name = (to.name).toLocaleLowerCase()
      if (self.name === 'plan') {
        self.pagechange(1)
      }
    }
  }
}
</script>

<style scoped>

</style>
