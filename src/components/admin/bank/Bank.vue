<template>
    <div>
        <div :style="name==='bank'?'display:block;':'display: none;'">

            <div class="clearfix pb-30">
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div class="headerTitle">银行档案</div>
                        </div>

                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                            <div class="form-group ml-10">
                                <div class="dropdown">
                                    <button :class="bankName || bankNumber ?'btn btn-primary filter':'btn btn-default filter'" type="button" data-toggle="dropdown"></button>
                                    <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                        <div class="pl-15 pr-15" style="width:180px;">
                                            <form action="" method="POST" class="form-horizontal">
                                                <div class="form-group">
                                                    <label>银行名称</label>
                                                    <input type="text" v-model="bankName" class="form-control" placeholder="请输入信息"/>
                                                </div>
                                                <div class="form-group">
                                                    <label>银行编号</label>
                                                    <input type="text" v-model="bankNumber" class="form-control" placeholder="请输入信息"/>
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
                                <router-link to="/admin/bank/addbank" class="btn btn-default"><i class="iconfont">&#xe73e;</i> 添加</router-link>
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
                        <th width="10%">银行编号</th>
                        <th>银行名称</th>
                        <th width="20%">创建时间</th>
                        <th width="8%">状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td>
                            <router-link :to="{path:'/admin/bank/showbank',query:{id:item.id}}" class="cded">查看
                            </router-link>
                            <a href="javascript:void(0);" class="cded ml-10" @click="enableBtn(item.id, 1)"
                               v-if="item.status === 2 || item.status === 0">启用</a>
                            <a href="javascript:void(0);" class="cded ml-10" @click="enableBtn(item.id, 2)"
                               v-if="item.status === 1">禁用</a>
                            <a href="javascript:void(0);" class="cded ml-10" v-if="item.status === 0"
                               @click="deleteBtn(item.id)">删除</a>
                        </td>
                        <td>{{item.number}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.create_time}}</td>
                        <td>{{item.statusStr}}</td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="5" class="text-center" v-html="LoadingImg"></td>
                    </tr>
                    <tr v-if="loading===false && list.length === 0">
                        <td colspan="5" class="text-center" v-html="NoData"></td>
                    </tr>
                    </tbody>
                </table>
                <PagInAction :total="total" :current-page='current' @pagechange="pagechange"
                             v-if="list.length > 0"/>
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
  name: 'Bank',
  store,
  data () {
    return {
      name: 'bank',
      loading: true,
      bankName: '',
      bankNumber: '',
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
      if (self.name === 'bank') {
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
      db.postRequest('Institution/Bank/changeStatus', params).then(res => {
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
      db.getRequest('Institution/Bank/delete', {
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
      params.append('name', self.bankName)
      params.append('number', self.bankNumber)
      params.append('page', p)
      db.postRequest('Institution/Bank/index', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
        self.current = p
      })
    },
    clearData () {
      let self = this
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
      if (self.name === 'bank') {
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
