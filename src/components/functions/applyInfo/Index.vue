<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div :style="name==='applyinfo'?'display:block;':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">申请资料</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" @click="keywords='';pagechange()" v-if="keywords">&#xe7f6;</i>
                            <input type="text" name="keywords" v-model="keywords" class="form-control"
                                   placeholder="请输入关键字搜索"
                                   style="padding-left:30px;"
                                   @keyup.enter="pagechange()">
                        </div>
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button :class="item || createdTime ?'btn btn-primary filter':'btn btn-default filter'"
                                        type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>申请项目</label>
                                                <select class="form-control" v-model="item">
                                                    <option value="">请选择</option>
                                                    <option value="1">本科</option>
                                                    <option value="2">硕士</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>创建时间</label>
                                                <input type="text" class="form-control" id="dateTime"
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
                                <router-link to="/functions/applyInfo/applyType" class="btn btn-default"><i
                                        class="iconfont">&#xe73e;</i>
                                    添加
                                </router-link>
                            </div>
                            <div class="form-group ml-10">
                                <button type="button" class="btn btn-default" @click="refresh"><i class="iconfont">&#xe64e;</i>
                                    刷新
                                </button>
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
                        <th>资料编号</th>
                        <th class="w10">申请项目</th>
                        <th class="w10">服务顾问</th>
                        <th class="w15">创建时间</th>
                        <th class="w10"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in list" :key="i">
                        <td>
                            <router-link :to="{path:'/functions/applyInfo/detail',query:{id:item.id}}">
                                <span class="cded" v-html="highlight(item.name, keywords)"></span>
                                (<span v-html="highlight(item.number, keywords)"></span>)
                            </router-link>
                        </td>
                        <td>{{item.apply_num}}</td>
                        <td>{{item.education_type}}</td>
                        <td>{{item.adviser_name}}</td>
                        <td>{{item.created_time}}</td>
                        <td class="text-center">
                            <div class="dropdown">
                                <a href="javascript:void(0);" data-toggle="dropdown"><i
                                        class="iconfont">&#xe66b;</i></a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <router-link :to="{path:'/functions/applyInfo/detail', query:{id:item.id}}">查看
                                        </router-link>
                                    </li>
                                    <li><a href="javascript:void(0);" @click="delItem(item.id)">删除</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="6" class="text-center" v-html="LoadingImg()"></td>
                    </tr>
                    <tr v-if="loading===false && list.length === 0">
                        <td colspan="6" class="text-center" v-html="NoData()"></td>
                    </tr>
                    </tbody>
                </table>

                <PagInAction :total="total" :current-page='current' @pagechange="pagechange"
                             v-if="list.length > 0"></PagInAction>
            </div>

        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import PagInAction from '@/components/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Applyinfo',
  store,
  data () {
    return {
      name: 'applyinfo',
      keywords: '',
      item: '',
      createdTime: '',
      loading: true,
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
  mounted () {
    let self = this
    self.name = (self.$route.name).toLocaleLowerCase()
    self.$nextTick(() => {
      self.laydate.render({
        elem: '#dateTime',
        range: true,
        done: (v, d, e) => {
          self.createdTime = v
        }
      })
      if (self.name === 'applyinfo') {
        self.pagechange(1)
      }
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('keywords', self.keywords)
      params.append('item', self.item)
      params.append('createdTime', self.createdTime)
      params.append('page', p || 1)
      self.loading = true
      db.postRequest('Institution/ApplyMaterial/index', params).then(res => {
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
      self.stuName = ''
      self.stuNumber = ''
      self.applyNumber = ''
      self.createdTime = ''
      self.pagechange(1)
    },
    delItem (id) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        icon: 2
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.getRequest('Institution/ApplyMaterial/delete', params).then(res => {
          if (res.status === 1) {
            for (let i = 0; i < self.list.length; i++) {
              if (self.list[i]['id'] === id) {
                self.list.splice(i, 1)
              }
            }
          } else {
            self.layer.alert(res.msg, {
              shadeClose: false
            })
          }
        })
      })
    }
  },
  components: {PagInAction},
  watch: {
    $route (to, from) {
      let self = this
      self.name = (to.name).toLocaleLowerCase()
      if (self.name === 'applyinfo') {
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
