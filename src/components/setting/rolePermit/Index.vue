<template>
    <div>
        <div :style="name==='rolePermit'?'':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">权限设置</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group ml-10">
                            <div class="form-group ml-10">
                                <router-link to="/setting/rolePermit/detail" class="btn btn-default"><i
                                        class="iconfont">&#xe73e;</i>
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
                        <th>角色名称</th>
                        <th class="w15">创建时间</th>
                        <th class="w10">状态</th>
                        <th class="w10"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td>{{item.name}}</td>
                        <td>{{item.created_time}}</td>
                        <td>{{item.status}}</td>
                        <td class="text-center">
                            <div class="dropdown">
                                <a href="javascript:void(0);" data-toggle="dropdown"><i
                                        class="iconfont">&#xe66b;</i></a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <router-link :to="{path:'/setting/rolePermit/detail',query:{id:item.id}}">编辑
                                        </router-link>
                                    </li>
                                    <li><a href="javascript:void(0);" @click="setStatus(item.id, 0)">关闭</a></li>
                                    <li><a href="javascript:void(0);" @click="setStatus(item.id, 1)">开启</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="5" v-html="LoadingImg"></td>
                    </tr>
                    <tr v-if="list.length===0 && !loading">
                        <td colspan="5" v-html="NoData"></td>
                    </tr>
                    </tbody>
                </table>

                <pagination :total="total" :current-page="current" @pagechange="pagechange"></pagination>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'rolePermit',
  store,
  data () {
    return {
      name: '',
      loading: true,
      total: 0,
      current: 1,
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
    self.pagechange()
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      self.loading = true
      self.current = p || 1
      params.append('page', p || 1)
      db.getRequest('Institution/Account/permissionList', {}).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
        self.loading = false
      })
    },
    setStatus (id, state) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('status', state)
      db.postRequest('Institution/Account/permissionChangeStatus', params).then(res => {
        if (res.status === 1) {
          self.list.map(item => {
            if (item.id === id) {
              item.status = (state === 1) ? '开启' : '关闭'
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
    $route (to, from) {
      this.name = to.name
      if (from.name === 'rolePermitDetail') {
        this.pagechange()
      }
    }
  }
}
</script>

<style scoped>

</style>
