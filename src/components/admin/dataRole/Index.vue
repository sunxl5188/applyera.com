<template>
    <div>
        <div :style="name==='dataRole'?'display: block;':'display: none;'">
            <div class="clearfix pb-30">
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div class="headerTitle">数据角色</div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                            <div class="form-group ml-10">
                                <div class="dropdown">
                                    <button :class="role_name || role_num || status || company_name ?'btn btn-primary filter':'btn btn-default filter'"  type="button" data-toggle="dropdown"></button>
                                    <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                        <div class="pl-15 pr-15" style="width:180px;">
                                            <form action="" method="POST" class="form-horizontal">
                                                <div class="form-group">
                                                    <label>角色名称</label>
                                                    <input type="text" class="form-control" v-model="role_name" placeholder="请输入信息"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>角色编号</label>
                                                    <input type="text" class="form-control" v-model="role_num" placeholder="请输入信息"/>
                                                </div>

                                                <div class="form-group">
                                                    <label>状态</label>
                                                    <select name="status" class="form-control" v-model.number="status">
                                                        <option value="">请选择</option>
                                                        <option value="0">全部</option>
                                                        <option value="1">启用</option>
                                                        <option value="2">禁用</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>中介机构</label>
                                                    <input type="text" class="form-control" name="company_name" placeholder="请输入信息"
                                                           v-model="company_name">
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
                                <router-link to="/admin/dataRole/detail" class="btn btn-default"><i class="iconfont">&#xe73e;</i> 添加</router-link>
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
                        <th>创建时间</th>
                        <th class="w10">状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td class="text-left">
                            <router-link :to="{path:'/admin/dataRole/detail',query:{id:item.id}}"
                                         class="cded ml-10">查看
                            </router-link>
                            <a href="javascript:void(0);" class="cded ml-10" @click="setEnable(item.id,1)"
                               v-if="item.status===0||item.status===2">启用</a>
                            <a href="javascript:void(0);" class="cded ml-10" @click="setEnable(item.id,2)"
                               v-if="item.status===1">禁用</a>
                            <a href="javascript:void(0);" class="cded ml-10" @click="delElement(item.id)"
                               v-if="item.status===0">删除</a>
                        </td>
                        <td>{{item.role_num}}</td>
                        <td>{{item.role_name}}</td>
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
import PagInAction from '@#/shared/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Index',
  store,
  data () {
    return {
      name: 'dataRole',
      loading: true,
      role_name: '',
      role_num: '',
      company_name: '',
      status: '',
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
    if (self.name === 'dataRole') {
      self.pagechange(1)
    }
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('role_name', self.role_name)
      params.append('role_num', self.role_num)
      params.append('company_name', self.company_name)
      params.append('status', self.status)
      params.append('page', p)
      db.headers.token = self.token
      self.loading = true
      db.postRequest('Institution/RoleData/roleList', params).then(res => {
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
      this.role_name = ''
      this.role_num = ''
      this.company_name = ''
      this.status = ''
      this.pagechange(1)
    },
    setEnable (id, status) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('status', status)
      db.headers.token = self.token
      db.postRequest('Institution/RoleData/roleIce', params).then(res => {
        if (res.status === 1) {
          self.list.map(item => {
            if (item.id === id) {
              item.status = status
            }
          })
        }
      })
    },
    delElement (id) {
      let self = this
      self.layer.confirm('您确定删除此信息？', {
        shadeClose: false
      }, function (e) {
        self.layer.close(e)
        let params = new URLSearchParams()
        params.append('id', id)
        db.headers.token = self.token
        db.postRequest('Institution/RoleData/roleDel', params).then(res => {
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
  components: {PagInAction},
  watch: {
    $route (to, from) {
      this.name = to.name
      if (this.name === 'dataRole') {
        this.pagechange(1)
      }
    }
  }
}
</script>

<style scoped>

</style>
