<template>
    <div>
        <div :style="name==='message-list'?'display:block;':'display: none;'">
            <div class="clearfix pb-30">
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div class="headerTitle">公告管理</div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                            <div class="form-group ml-10">
                                <div class="dropdown">
                                    <button :class="title || type || time || status ?'btn btn-primary filter':'btn btn-default filter'"  type="button" data-toggle="dropdown"></button>
                                    <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                        <div class="pl-15 pr-15" style="width:180px;">
                                            <form action="" method="POST" class="form-horizontal">
                                                <div class="form-group">
                                                    <label>公告标题</label>
                                                    <input type="text" class="form-control" v-model="title" placeholder="请输入信息"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>公告类型</label>
                                                    <select name="type" class="form-control" v-model="type">
                                                        <option value="">数据更新</option>
                                                        <option value="">系统通知</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>创建时间</label>
                                                    <input type="text" class="form-control times" name="time" v-model="time" placeholder="请选择时间">
                                                </div>
                                                <div class="form-group">
                                                    <label>发布状态</label>
                                                    <select name="status" class="form-control" v-model.number="status">
                                                        <option value="0">未发布</option>
                                                        <option value="1">已发布</option>
                                                    </select>
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
                                <router-link to="/admin/message/list/detail" class="btn btn-default"><i class="iconfont">&#xe73e;</i> 添加</router-link>
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
                        <th width="15%">操作</th>
                        <th>公告标题</th>
                        <th width="10%">发布状态</th>
                        <th width="10%">公告类型</th>
                        <th width="15%">创建时间</th>
                        <th width="15%">最新发布时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td>
                            <router-link :to="{path:'/admin/message/list/detail', query:{id:item.id}}"
                                         class="cded">查看
                            </router-link>
                            <a href="javascript:void(0);" class="cded" v-if="item.status===1" @click="setStatus(item.id, 0)">取消发布</a>
                            <a href="javascript:void(0);" class="cded ml-5" v-if="item.status===0" @click="setStatus(item.id, 1)">发布</a>
                            <a href="javascript:void(0);" class="cded ml-5" @click="deleteMsg(item.id)">删除</a>
                        </td>
                        <td>{{item.title}}</td>
                        <td>
                            <span v-if="item.type===1">紧急通知</span>
                            <span v-if="item.type===2">申请通知</span>
                            <span v-if="item.type===3">系统消息</span>
                            <span v-if="item.type===4">院校资讯</span>
                        </td>
                        <td>
                            <span v-if="item.status===0">未发布</span>
                            <span v-if="item.status===1">已发布</span>
                        </td>
                        <td>{{item.created_time}}</td>
                        <td>{{item.last_time}}</td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="6" class="text-center" v-html="LoadingImg"></td>
                    </tr>
                    <tr v-if="loading===false && list.length===0">
                        <td colspan="6" class="text-center" v-html="NoData"></td>
                    </tr>
                    </tbody>
                </table>
                <PagInAction :total="total" :current-page="current" @pagechange="pagechange"
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
      name: 'message-list',
      loading: true,
      title: '',
      type: '',
      time: '',
      status: 0,
      current: 1,
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
    self.name = (self.$route.name).toLocaleLowerCase()
    self.laydate.render({
      elem: '.times',
      type: 'date',
      done: (value) => {
        self.time = value
      }
    })

    if (self.name === 'message-list') {
      self.pagechange()
    }
    if (self.name === 'message-detail' && self.list.length === 0) {
      self.pagechange()
    }
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('page', p || 1)
      params.append('title', self.title)
      params.append('type', self.type)
      params.append('time', self.time)
      params.append('status', self.status)
      self.loading = true
      db.postRequest('Institution/Notice/publishList', params).then(res => {
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
      this.title = ''
      this.type = ''
      this.time = ''
      this.status = 0
      this.pagechange()
    },
    // 删除公告
    deleteMsg (id) {
      let self = this
      self.layer.confirm('确定在删除此信息？', {
        shadeClose: false
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.getRequest('Institution/Notice/delete', params).then(res => {
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
    },
    // 发布消息、取消发布
    setStatus (id, status) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('status', status)
      db.postRequest('Institution/Notice/changeStatus', params).then(res => {
        if (res.status === 1) {
          self.layer.msg(res.msg)
          self.list.map(item => {
            if (item.id === id) {
              item.status = parseInt(res.data)
            }
          })
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    }
  },
  components: {PagInAction},
  watch: {
    $route (to, from) {
      this.name = (to.name).toLocaleLowerCase()
      if (from.name === 'message-detail') {
        this.pagechange()
      }
    }
  }
}
</script>

<style scoped>

</style>
