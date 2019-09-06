<template>
    <div>
        <div :style="name==='featRole'?'display: block;':'display: none;'">
            <div class="clearfix pb-30">
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div class="headerTitle">功能角色</div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                            <div class="form-group ml-10">
                                <div class="dropdown">
                                    <button :class="role_name || role_number || status || company ?'btn btn-primary filter':'btn btn-default filter'"  type="button" data-toggle="dropdown"></button>
                                    <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                        <div class="pl-15 pr-15" style="width:180px;">
                                            <form action="" method="POST" class="form-horizontal">
                                                <div class="form-group">
                                                    <label>角色名称</label>
                                                    <input type="text" class="form-control" v-model="role_name" placeholder="请输入信息"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>角色编号</label>
                                                    <input type="text" class="form-control" v-model="role_number" placeholder="请输入信息"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>状态</label>
                                                    <input type="text" class="form-control" v-model="status" placeholder="请输入信息"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>中介机构</label>
                                                    <input type="text" class="form-control" v-model="company" placeholder="请输入信息"/>
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
                                <router-link to="/admin/featRole/detail" class="btn btn-default"><i class="iconfont">&#xe73e;</i> 添加</router-link>
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
                        <th class="w15">操作</th>
                        <th>角色编号</th>
                        <th>角色名称</th>
                        <th>中介机构</th>
                        <th class="w20">创建时间</th>
                        <th class="w10">状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td class="text-left">
                            <router-link :to="{path:'/admin/featRole/detail',query:{id:item.id}}"
                                         class="cded">查看
                            </router-link>
                            <a href="javascript:void(0);" class="cded ml-10" @click="setState(item.id, 1)"
                               v-if="item.status===0||item.status===2">启用</a>
                            <a href="javascript:void(0);" class="cded ml-10" @click="setState(item.id, 2)"
                               v-if="item.status===1">禁用</a>
                            <a href="javascript:void(0);" class="cded ml-10" v-if="item.status===0"
                               @click="delItem(item.id)">删除</a>
                        </td>
                        <td>{{item.group_num}}</td>
                        <td>{{item.group_name}}</td>
                        <td>{{item.company_name}}</td>
                        <td>{{item.created_time}}</td>
                        <td>{{item.status|state}}</td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="6" v-html="LoadingImg()"></td>
                    </tr>
                    <tr v-if="list.length === 0 && !loading">
                        <td colspan="6" v-html="NoData()"></td>
                    </tr>
                    </tbody>
                </table>
                <PagInAction :total="total" @pagechange="pagechange"
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
  name: 'Index',
  store,
  data () {
    return {
      name: 'featRole',
      loading: true,
      role_name: '',
      role_number: '',
      status: '',
      company: '',
      total: 0,
      list: []
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
    if (self.name === 'featRole') {
      self.pagechange(1)
    }
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('role_name', self.role_name)
      params.append('role_number', self.role_number)
      params.append('status', self.status)
      params.append('company', self.company)
      params.append('page', p)
      self.loading = true
      db.postRequest('Institution/RoleFunc/index', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    clearData () {
      this.role_name = ''
      this.role_number = ''
      this.status = ''
      this.company = ''
      this.pagechange(1)
    },
    setState (id, i) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('status', i)
      db.postRequest('Institution/RoleFunc/changeStatus', params).then(res => {
        if (res.status === 1) {
          self.list.map(item => {
            if (item.id === id) {
              item.status = i
            }
          })
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    delItem (id) {
      let self = this
      self.layer.confirm('您确定要删除此信息?', {
        shadeClose: false
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.getRequest('Institution/RoleFunc/delete', params).then(res => {
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
      })
    }
  },
  components: {
    PagInAction
  },
  watch: {
    $route (to, from) {
      this.name = to.name
      if (this.name === 'featRole') {
        this.pagechange(1)
      }
    }
  }
}
</script>

<style scoped>

</style>
