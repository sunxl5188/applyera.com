<template>
    <div>
        <div :style="name==='ability'?'display:block;':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">能力考评</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button :class="title || number ?'btn btn-primary filter':'btn btn-default filter'" type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>考评标题</label>
                                                <input type="text" class="form-control" name="title" v-model="title"
                                                       placeholder="请输入信息">
                                            </div>
                                            <div class="form-group">
                                                <label>档案编号</label>
                                                <input type="text" class="form-control" name="number" v-model="number"
                                                       placeholder="请输入信息">
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
                            <div class="form-group ml-10">
                                <router-link to="/setting/ability/addability" class="btn btn-default"><i
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
                        <th>操作</th>
                        <th>档案编号</th>
                        <th>考评标题</th>
                        <th>创建时间</th>
                        <th>状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in list" :key="i">
                        <td>
                            <router-link :to="{path:'/setting/ability/showAbility',query:{id:item.id}}" class="cded">
                                查看
                            </router-link>
                            <a href="javascript:void(0);" class="cded ml-10" @click="enableBtn(item.id, 1)"
                               v-if="item.status === 2 || item.status === 0">启用</a>
                            <a href="javascript:void(0);" class="cded ml-10" @click="enableBtn(item.id, 2)"
                               v-if="item.status === 1">禁用</a>
                            <a href="javascript:void(0);" class="cded ml-10" v-if="item.status === 0"
                               @click="deleteBtn(item.id)">删除</a>
                        </td>
                        <td>{{item.number}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.create_time}}</td>
                        <td>{{item.status|state}}</td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="5" v-html="LoadingImg"></td>
                    </tr>
                    <tr v-if="list.length === 0 && !loading">
                        <td colspan="5" v-html="NoData"></td>
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
import PagInAction from '@#/shared/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Ability',
  data () {
    return {
      name: 'ability',
      loading: true,
      title: '',
      number: '',
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
    self.name = self.$route.name.toLocaleLowerCase()
    self.$nextTick(() => {
      if (self.name === 'ability') {
        setTimeout(function () {
          self.pagechange(1)
        }, 500)
      }
    })
  },
  methods: {
    // 启用
    enableBtn (id, s) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('status', s)
      db.postRequest('Institution/Assess/changeStatus', params).then(res => {
        if (res.status === 1) {
          self.pagechange(self.current)
        } else {
          self.layer.msg(res.msg)
        }
      })
    },
    // 删除
    deleteBtn (id) {
      let self = this
      db.getRequest('Institution/Assess/delete', {
        id: id
      }).then(res => {
        self.layer.msg(res.msg)
        if (res.status === 1) {
          self.pagechange(self.current)
        } else {
          self.layer.msg(res.msg)
        }
      })
    },
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('title', self.title)
      params.append('number', self.number)
      params.append('page', p || 1)
      db.postRequest('Institution/Assess/index', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg)
        }
        self.loading = false
        self.current = p || 1
      })
    },
    clearData () {
      let self = this
      self.title = ''
      self.number = ''
      setTimeout(function () {
        self.pagechange(1)
      }, 100)
    }
  },
  components: {PagInAction},
  watch: {
    $route (to, from) {
      let self = this
      self.name = (to.name).toLocaleLowerCase()
      if (self.name === 'ability') {
        setTimeout(function () {
          self.pagechange(1)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>

</style>
