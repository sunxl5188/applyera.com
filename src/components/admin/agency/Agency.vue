<template>
    <div>
        <div :style="name==='agency'?'display:block;':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">中介机构</div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">

                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button :class="names || number ?'btn btn-primary filter':'btn btn-default filter'" type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>机构名称</label>
                                                <input type="text" class="form-control" v-model="names"
                                                       placeholder="请输入信息"/>
                                            </div>
                                            <div class="form-group">
                                                <label>机构编号</label>
                                                <input type="text" class="form-control" v-model="number"
                                                       placeholder="请输入信息"/>
                                            </div>

                                            <div class="form-group text-center">
                                                <button type="reset" class="btn btn-default" @click="clearData">重置
                                                </button>
                                                <button type="button" class="btn btn-primary ml-10"
                                                        @click="pagechange(1)">
                                                    开始筛选
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </ul>
                            </div>
                        </div>

                        <div class="form-group ml-10">
                            <router-link to="/admin/agency/addagency" class="btn btn-default"><i class="iconfont">&#xe73e;</i>
                                添加
                            </router-link>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row">
                <table class="table table-customize">
                    <thead>
                    <tr>
                        <th class="w15">操作</th>
                        <th>机构编号</th>
                        <th>机构名称</th>
                        <th>电话</th>
                        <th>创建时间</th>
                        <th class="w10">状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td class="text-left">
                            <router-link :to="{path:'/admin/agency/showagency',query:{id:item.id}}"
                                         class="cded ml-5">查看
                            </router-link>
                            <a href="javascript:void(0);" class="cded ml-10" @click="enableBtn(item.id,1)"
                               v-if="item.status === 0 || item.status === 2">启用</a>
                            <a href="javascript:void(0);" class="cded ml-10" @click="enableBtn(item.id,2)"
                               v-if="item.status === 1">禁用</a>
                            <a href="javascript:void(0);" class="cded ml-10" @click="deleteBtn(item.id)"
                               v-if="item.status === 0">删除</a>
                        </td>
                        <td v-text="item.number"></td>
                        <td v-text="item.name"></td>
                        <td v-text="item.phone"></td>
                        <td v-text="item.create_time"></td>
                        <td v-text="item.statusStr"></td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="6" class="text-center" v-html="LoadingImg"></td>
                    </tr>
                    <tr v-if="loading===false && list.length===0">
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
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Agency',
  store,
  data () {
    return {
      name: 'agency',
      names: '',
      number: '',
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
    self.name = self.$route.name.toLocaleLowerCase()
    self.$nextTick(() => {
      if (self.name === 'agency') {
        setTimeout(function () {
          self.pagechange(1)
        }, 500)
      }
    })
  },
  methods: {
    enableBtn (id, s) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('status', s)
      db.postRequest('Institution/Company/changeStatus', params).then(res => {
        if (res.status === 1) {
          self.pagechange(self.current)
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    deleteBtn (id) {
      let self = this
      db.getRequest('Institution/company/delete', {
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
      params.append('name', self.names)
      params.append('number', self.number)
      params.append('page', p)
      db.postRequest('Institution/Company/index', params).then(res => {
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
  components: {pagination},
  watch: {
    $route (to, from) {
      let self = this
      self.name = to.name.toLocaleLowerCase()
      if (self.name === 'agency') {
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
