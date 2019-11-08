<template>
    <div>
        <div :style="name==='message-config'?'':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">消息配置</div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group ml-10">
                            <router-link to="/admin/message/config/detail" class="btn btn-default"><i class="iconfont">&#xe73e;</i>
                                添加
                            </router-link>
                        </div>
                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default" @click="refresh"><i
                                    class="iconfont">&#xe64e;</i> 刷新
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div v-if="loading" v-html="LoadingImg()"></div>
            <div class="row" v-if="!loading">
                <table class="table table-customize">
                    <thead>
                    <tr>
                        <th width="15%">操作</th>
                        <th>消息类型</th>
                        <th>触发策略</th>
                        <th>业务描述</th>
                        <th width="18%">创建时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td>
                            <router-link :to="{path:'/admin/message/config/detail',query:{id:item.id}}"
                                         class="cded">查看
                            </router-link>
                            <a href="javascript:void(0);" class="cded ml-5" v-if="item.status===2"
                               @click="setStatus(item.id, 1)">启用</a>
                            <a href="javascript:void(0);" class="cded ml-5" v-if="item.status===1"
                               @click="setStatus(item.id, 2)">停用</a>
                            <a href="javascript:void(0);" class="cded ml-5" @click="deleteData(item.id)">删除</a>
                        </td>
                        <td>{{item.msg_type}}</td>
                        <td>{{item.trigger_type}}</td>
                        <td>{{item.msg_content}}</td>
                        <td>{{item.created_time}}</td>
                    </tr>
                    <tr v-if="list.length === 0">
                        <td colspan="5" v-html="NoData()"></td>
                    </tr>
                    </tbody>
                </table>
                <PagInAction :total="total" :current-page="currentPage" @pagechange="pagechange"></PagInAction>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import store from '@/vuex/Store'
import PagInAction from '@/components/PagInAction'
import db from '@~/js/request'

export default {
  name: 'Config',
  store,
  data () {
    return {
      loading: true,
      name: 'message-config',
      currentPage: 1,
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
    self.name = (self.$route.name).toLocaleLowerCase()
    if (self.name === 'message-config') {
      self.pagechange()
    }
    if (self.name === 'message-config-detail' && self.list.length === 0) {
      self.pagechange()
    }
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('page', p || 1)
      self.currentPage = p || 1
      self.loading = true
      db.postRequest('Institution/Msg/msgList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    setStatus (id, status) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('status', status)
      db.postRequest('Institution/Msg/ice', params).then(res => {
        if (res.status === 1) {
          self.layer.msg(res.msg)
          self.list.map(item => {
            if (item.id === id) {
              item.status = status
            }
          })
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    deleteData (id) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        shadeClose: false
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.postRequest('Institution/Msg/del', params).then(res => {
          if (res.status === 1) {
            self.layer.msg(res.msg)
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
      this.name = (to.name).toLocaleLowerCase()
      if (from.name === 'message-config-detail') {
        this.pagechange(this.currentPage)
      }
    }
  }
}
</script>

<style scoped>

</style>
