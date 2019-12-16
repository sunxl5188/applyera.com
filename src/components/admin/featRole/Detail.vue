<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">功能角色</div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="submitForm()"><i
                                class="iconfont">&#xe637;</i> 保存
                        </button>
                    </div>

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>

                </div>

            </div>
        </div>

        <div v-if="loading" v-html="LoadingImg()"></div>
        <div v-if="!loading">
            <form action="" id="gongneng" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                <input type="hidden" name="id" id="id" v-model="id" v-if="id!==undefined"/>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>用户编号</label>
                                <input type="text" name="group_num" class="form-control" placeholder=""
                                       v-model="info.group_num" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label><font class="cf00">*</font>用户名称</label>
                                <input type="text" name="group_name" class="form-control" placeholder="请输入用户名称"
                                       v-model="info.group_name">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group form-search">
                                <label><font class="cf00">*</font>所属机构</label>
                                <input type="hidden" name="ins_company_id" id="ins_company_id"
                                       v-model="info.ins_company_id" placeholder="请选择所属机构"/>
                                <input type="text" name="" class="form-control" placeholder=""
                                       v-model="info.company_name">
                                <i class="iconfont handPower" style="top:25px;" data-toggle="modal"
                                   data-backdrop="static"
                                   data-target="#mechanism">&#xe618;</i>
                                <CompanyComponent @companyCallback="companyCallback"></CompanyComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>状态</label>
                                <input type="text" name="" class="form-control" placeholder="" readonly
                                       :value="info.status|state">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>创建时间</label>
                                <input type="text" name="" class="form-control times" placeholder="请选择时间"
                                       v-model="info.created_time">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="blk30"></div>
                <ul class="nav nav-tabs"><!--nav-justified-->
                    <li role="presentation" class="active"><a href="#Addgongneng1" data-toggle="tab">关联用户</a></li>
                    <li role="presentation"><a href="#Addgongneng2" data-toggle="tab">权限分配</a></li>
                </ul>
                <div class="tab-content pt-30">
                    <div class="tab-pane fade in active" id="Addgongneng1">
                        <div class="table-responsive">
                            <table class="table table-hover table-text-over table-condensed table-bordered text-center">
                                <thead>
                                <tr>
                                    <th class="text-center w10"><i class="iconfont handPower cded" @click="addUser">&#xe622;</i>
                                    </th>
                                    <th class="text-center w30">用户编号</th>
                                    <th class="text-center w30">用户名称</th>
                                    <th class="text-center">关联时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,i) in users" :key="i">
                                    <td><i class="iconfont handPower cded" @click="delUser(i)">&#xe61f5;</i></td>
                                    <td>
                                        <div class="form-group form-search" style="margin: 0;">
                                            <input type="hidden" name="userIds[]" v-model="item.id"/>
                                            <input type="text" name="" class="form-control" placeholder=""
                                                   v-model="item.number" readonly>
                                            <i class="iconfont handPower cded" data-toggle="modal"
                                               data-backdrop="static" data-target="#relationUsers"
                                               v-show="item.add === 1" @click="uIndex=i">&#xe618;</i>
                                        </div>
                                    </td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.created_time}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="Addgongneng2">
                        <div class="row">
                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                <ul class="list-group">
                                    <li class="list-group-item active"><a href="#tabs1" data-toggle="tab">中介机构端</a></li>
                                </ul>
                            </div>
                            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                <div class="tab-content">
                                    <div class="tab-pane fade in active" id="tabs1">
                                        <div class="panel-group" id="Addgongneng">
                                            <div class="panel panel-default" v-for="(item,i) in permission" :key="i">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title clearfix">
                                                        <div class="checkbox pull-left">
                                                            <label>
                                                                <input type="checkbox" name="listIds[]"
                                                                       :value="item.id" v-model="item.check"
                                                                       @click="setChecked(i, item.check)">
                                                                {{item.name}}
                                                            </label>
                                                        </div>
                                                        <a data-toggle="collapse" data-parent="#Addgongneng"
                                                           :href="'#collapseOne_'+i" class="pull-right pt-5 lh20"
                                                           v-if="i===0">
                                                            收起 <i class="iconfont">&#xe688;</i>
                                                        </a>
                                                        <a data-toggle="collapse" data-parent="#Addgongneng"
                                                           :href="'#collapseOne_'+i" class="pull-right pt-5 lh20"
                                                           v-if="i!==0">
                                                            展开 <i class="iconfont">&#xe630;</i>
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div :id="'collapseOne_'+i"
                                                     :class="i===0?'panel-collapse collapse in':'panel-collapse collapse'">
                                                    <div class="panel-body">
                                                        <div class="clearfix" v-for="(items,k) in item.child" :key="k">
                                                            <div class="checkbox bdb pb-5">
                                                                <label>
                                                                    <input type="checkbox" name="listIds[]"
                                                                           :value="items.id" v-model="items.check"
                                                                           @click="setCheckedChild(i, k, items.check)">
                                                                    <b>{{items.name}}</b>
                                                                </label>
                                                            </div>
                                                            <div class="checkbox">
                                                                <label class="mr-15" v-for="(child,n) in items.child" :key="n">
                                                                    <input type="checkbox" name="listIds[]"
                                                                           :value="child.id"
                                                                           v-model="child.check"> {{child.name}}
                                                                </label>
                                                            </div>
                                                            <div class="blk20"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!--关联用户-->
        <div class="modal fade" id="relationUsers">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">关联用户</h4>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered table-condensed table-text-over">
                                <thead>
                                <tr>
                                    <th>用户编号</th>
                                    <th>用户名称</th>
                                    <th>创建时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="handPower" @click="userCallback(item)" v-for="(item,i) in userList" :key="i">
                                    <td>{{item.number}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.created_time}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <PagInAction :display="display" :total="total1" @pagechange="getUsers"></PagInAction>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import PagInAction from '@#/shared/PagInAction'
import CompanyComponent from '@/components/admin/featRole/CompanyComponent'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Detail',
  store,
  data () {
    return {
      id: '',
      loading: true,
      info: {group_num: '', group_name: '', ins_company_id: 2, company_name: '', created_time: '', 'status': 0},
      permission: [],
      users: [],
      uIndex: '',
      userList: [],
      total1: 0,
      CompanyList: [],
      total2: 0,
      display: 10
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id

    if (self.id === undefined) {
      self.loading = false
      db.getRequest('Institution/RoleFunc/getNumber', {}).then(res => {
        if (res.status === 1) {
          self.info.group_num = res.data
        }
      })
      db.getRequest('Institution/RoleFunc/getPermission', {}).then(res => {
        if (res.status === 1) {
          self.permission = res.data
        }
      })
    } else {
      self.getInfo()
    }

    self.getUsers()

    setTimeout(function () {
      $('#Addgongneng').on('show.bs.collapse', function (e) {
        $(e.target).siblings('.panel-heading').find('a').html('收起 <i class="iconfont">&#xe688;</i>')
      })
      $('#Addgongneng').on('hide.bs.collapse', function (e) {
        $(e.target).siblings('.panel-heading').find('a').html('展开 <i class="iconfont">&#xe630;</i>')
      })
      self.laydate.render({
        elem: '.times',
        type: 'datetime',
        done: (v) => {
          self.info.created_time = v
        }
      })
    }, 1000)
  },
  methods: {
    getInfo () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.getRequest('Institution/RoleFunc/detail', params).then(res => {
        if (res.status === 1) {
          self.info = res.data
          self.permission = res.data.permission
          self.users = res.data.users
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    getUsers (p) {
      // 关联用户
      let self = this
      let params = new URLSearchParams()
      params.append('records', '')
      params.append('page', p)
      db.postRequest('Institution/RoleFunc/getUser', params).then(res => {
        if (res.status === 1) {
          self.userList = res.data.list
          self.total1 = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    addUser () {
      let self = this
      let obj = {id: '', number: '', name: '', created_time: '', add: 1}
      self.users.push(obj)
    },
    delUser (id) {
      let self = this
      self.info.users.map((item, i) => {
        if (id === i) {
          self.info.users.splice(i, 1)
        }
      })
    },
    userCallback (obj) {
      this.users[this.uIndex]['id'] = obj.id
      this.users[this.uIndex]['number'] = obj.number
      this.users[this.uIndex]['name'] = obj.name
      this.users[this.uIndex]['created_time'] = obj.created_time
      $('#relationUsers').modal('hide')
    },
    companyCallback (obj) {
      this.info.ins_company_id = obj.id
      this.info.company_name = obj.name
    },
    setChecked (i, boolean) {
      let self = this
      self.permission[i].child.map((item, j) => {
        item.check = !boolean
        if (self.permission[i].child[j].child !== undefined) {
          self.permission[i].child[j].child.map(items => {
            items.check = !boolean
          })
        }
      })
    },
    setCheckedChild (i, j, boolean) {
      let self = this
      self.permission[i].child[j].child.map(item => {
        item.check = !boolean
      })
    },
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#gongneng').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/RoleFunc/edit', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/admin/featRole')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    }
  },
  components: {PagInAction, CompanyComponent}
}
</script>

<style scoped lang="scss">
    .list-group {
        border:1px solid #ddd;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;min-height:400px;

        & .list-group-item {
            border:none;margin-top:0;
        }
    }

    .list-group-item {
        &:last-child, &:first-child {
            -webkit-border-radius:0;-moz-border-radius:0;border-radius:0;
        }

        &.active {
            border-color:#fff;

            & a {color:#fff;}
        }
    }
</style>
