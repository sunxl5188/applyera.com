<template>
    <div>
        <div :style="name==='message'?'':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">公告通知</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                            <input type="text" name="keywords" v-model="keywords" class="form-control" placeholder="搜索"
                                   style="padding-left:30px;"
                                   @keyup.enter="pagechange()">
                        </div>
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button class="btn btn-default filter" type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>所属国家</label>
                                                <select name="country" v-model="country" class="form-control">
                                                    <option value="">请选择</option>
                                                    <option value="全部">全部</option>
                                                    <option value="英国">英国</option>
                                                    <option value="美国">美国</option>
                                                    <option value="澳大利亚">澳大利亚</option>
                                                    <option value="加拿大">加拿大</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>公告类型</label>
                                                <select name="type" v-model="type" class="form-control">
                                                    <option value="0">全部通知</option>
                                                    <option value="1">紧急通知</option>
                                                    <option value="2">申请通知</option>
                                                    <option value="3">系统消息</option>
                                                    <option value="4">院校资讯</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>发布时间</label>
                                                <input type="text" name="time" v-model="time" class="form-control times"
                                                       placeholder="请选择时间">
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
                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default refresh" @click="refresh()"></button>
                        </div>

                    </div>
                </div>
            </div>
            <div v-if="loading" v-html="LoadingImg"></div>
            <div v-if="!loading">
                <table class="table table-customize">
                    <thead>
                    <tr>
                        <th class="text-center" width="15%">国家</th>
                        <th>消息详情</th>
                        <th width="15%">公告类型</th>
                        <th width="15%">创建时间 <a href="javascript:void(0);"
                                                :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                                                @click="listSort"></a></th>
                        <th width="5%">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in list" :key="i">
                        <td class="text-center">{{item.country}}</td>
                        <td>
                            <span :class="item.is_read===0?'fontB':''">
                                <router-link :to="{path:'/setting/message/detail',query:{id:item.id}}">{{item.title}}</router-link>
                            </span>
                            <span class="c999 font12" v-if="item.is_read===1">(已读)</span>
                            <span class="cf00 font12" v-if="item.is_read===0">(未读)</span>
                        </td>
                        <td>
                            <span v-if="item.type===0">全部</span>
                            <span v-if="item.type===1">紧急通知</span>
                            <span v-if="item.type===2">申请通知</span>
                            <span v-if="item.type===3">系统消息</span>
                            <span v-if="item.type===4">院校资讯</span>
                        </td>
                        <td>{{item.created_time}}</td>
                        <td class="text-center">
                            <div class="dropdown">
                                <i class="iconfont handPower c999" data-toggle="dropdown">&#xe66b;</i>
                                <ul class="dropdown-menu" style="right:0;left:auto;min-width:80px;">
                                    <li>
                                        <router-link :to="{path:'/setting/message/detail',query:{id:item.id}}"
                                                     class="cded text-center">查看
                                        </router-link>
                                    </li>
                                    <li><a href="javascript:void(0);" class="cded text-center"
                                           @click="deleteData(item.id)">删除</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="list.length===0">
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
import store from '@/vuex/Store'
import nation from '@@/json/nation.json'
import pagination from '@#/shared/Pagination'
import db from '@~/js/request'

export default {
  name: 'message',
  store,
  data () {
    return {
      loading: true,
      name: 'message',
      nation: nation,
      keywords: '',
      country: '',
      type: 0,
      time: '',
      time_sort: 0,
      current: 1,
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

    if (self.name === 'detail' && self.list.length === 0) {
      self.pagechange()
    }
    if (self.name === 'message') {
      self.pagechange()
    }

    setTimeout(function () {
      $('.times').each(function (index, element) {
        self.laydate.render({
          elem: element,
          type: 'date',
          done: (value) => {
            self.time = value
          }
        })
      })
    }, 1000)
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('page', p || 1)
      params.append('keywords', self.keywords)
      params.append('country', self.country)
      params.append('type', self.type)
      params.append('time', self.time)
      params.append('time_sort', self.time_sort)
      self.loading = true
      db.postRequest('Institution/Notice/notifyList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
        self.current = p || 1
        self.loading = false
      })
    },
    clearData () {
      this.country = ''
      this.type = ''
      this.time = ''
      this.pagechange()
    },
    deleteData (id) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        shadeClose: false
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.getRequest('Institution/Notice/deleteNotify', params).then(res => {
          if (res.status === 1) {
            self.layer.msg(res.msg)
            self.list.map((item, i) => {
              if (item.id === id) {
                self.list.splice(i, 1)
              }
            })
          } else {
            self.layer.alert(res.msg, {
              shadeClose: false
            })
          }
        })
      })
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
      self.pagechange()
    }
  },
  components: {pagination},
  watch: {
    $route (to, from) {
      this.name = (to.name).toLocaleLowerCase()
      if (to.name === 'message') {
        this.pagechange(this.current)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
