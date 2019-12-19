<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">数据角色</div>
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

        <div v-if="loading" v-html="LoadingImg"></div>
        <div v-if="!loading">
            <form action="" id="Addjuese" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                <input type="hidden" name="id" id="id" v-if="id" v-model="id"/>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>数据编号</label>
                                <input type="text" name="role_num" class="form-control" placeholder="请输入数据编号"
                                       v-model="role_num" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label><font class="cf00">*</font>数据名称</label>
                                <input type="text" name="role_name" class="form-control" placeholder="请输入数据名称"
                                       v-model="role_name">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group form-search">
                                <label><font class="cf00">*</font>所属机构</label>
                                <input type="hidden" name="company_id" v-model="company_id"/>
                                <input type="text" class="form-control" placeholder=""
                                       v-model="company_name">
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
                                <input type="text" name="status" class="form-control" placeholder="" value="启用"
                                       readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>创建时间</label>
                                <input type="text" name="created_time" class="form-control" placeholder="" readonly
                                       v-model="created_time">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="blk30"></div>
                <ul class="nav nav-tabs"><!--nav-justified-->
                    <li role="presentation" class="active"><a href="#Addjuese1" data-toggle="tab">关联用户</a></li>
                    <li role="presentation"><a href="#Addjuese2" data-toggle="tab">权限分配</a></li>
                </ul>
                <div class="tab-content pt-30">
                    <div class="tab-pane fade in active" id="Addjuese1">
                        <div class="table-responsive">
                            <table class="table table-hover table-text-over table-condensed table-bordered text-center">
                                <thead>
                                <tr>
                                    <th class="text-center w10">
                                        <i class="iconfont handPower cded" @click="addUserList">&#xe622;</i>
                                    </th>
                                    <th class="text-center w25">用户编号</th>
                                    <th class="text-center w25">用户名称</th>
                                    <th class="text-center">关联时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, i) in userList" :key="i">
                                    <td>
                                        <i class="iconfont handPower cded" @click="userList.splice(i,1)">&#xe61f5;</i>
                                    </td>
                                    <td>
                                        <div class="form-group form-search" style="margin: 0;">
                                            <input type="hidden" name="userIdArr[]" :value="item.id"/>
                                            <input type="text" class="form-control" placeholder="请选择"
                                                   v-model="item.user_number">
                                            <i class="iconfont handPower cded" data-toggle="modal"
                                               data-backdrop="static" data-target="#UserComponent"
                                               @click="userIndex = i">&#xe618;</i>
                                        </div>
                                    </td>
                                    <td>{{item.user_name}}</td>
                                    <td>{{item.created_time}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="Addjuese2">

                        <div class="clearfix pb-15">
                            <button type="button" class="btn btn-primary"
                                    @click="List.push({table:'',relation:[], role: []})">新增
                            </button>
                            <span class="c999">（选择要进行权限控制的档案和单据）</span>
                        </div>

                        <div class="panel-group">
                            <div class="panel panel-default" style="margin-bottom:25px;" v-for="(its,k) in List" :key="k">
                                <div class="panel-heading clearfix">
                                    <span class="pull-left">
                                        <select :name="'roleDetails[table]['+k+']'" class="form-control"
                                                @change="selectParent($event.currentTarget.value,k)"
                                                v-model="its.table">
                                            <option value="">请选择</option>
                                            <option :value="key" v-for="(item,key) in tables" :key="key">{{item.name}}</option>
                                        </select>
                                    </span>
                                    <span class="pull-right"><i
                                            class="iconfont handPower lh34 font24"
                                            @click="List.splice(k,1)">&#xe656;</i></span>
                                </div>
                                <div class="panel-collapse collapse in">
                                    <div class="panel-body">
                                        <div class="clearfix lh34 c999 pb-15">（针对已选的档案单据，添加要控制的数据范围）</div>
                                        <table class="table table-hover table-bordered table-condensed table-text-over text-center">
                                            <thead>
                                            <tr>
                                                <th class="text-center w10">
                                                    <i class="iconfont handPower cded"
                                                       @click="its.role.push({type:'',join_table:'',data_range_id:'',range: []})">&#xe622;</i>
                                                </th>
                                                <th class="text-center">过滤类型</th>
                                                <th class="text-center">档案名</th>
                                                <th class="text-center">数据范围</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(item, i) in its.role" :key="i">
                                                <td><i class="iconfont handPower cded" @click="its.role.splice(i,1)">&#xe61f5;</i>
                                                </td>
                                                <td>
                                                    <div class="form-group" style="margin: 0;">
                                                        <select :name="'roleDetails[type]['+k+'][]'"
                                                                class="form-control"
                                                                v-model.number="item.type"
                                                                @change="selectType(item.type,its.table,k,i)">
                                                            <option value="">请选择</option>
                                                            <option value="1">档案数据过滤</option>
                                                            <option value="2">数据逻辑过滤</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-group" style="margin: 0;">
                                                        <input type="hidden" :name="'roleDetails[join_table]['+k+'][]'"
                                                               value="" v-if="item.type===2"/>
                                                        <select :name="'roleDetails[join_table]['+k+'][]'"
                                                                class="form-control"
                                                                @change="dataFanwei($event.currentTarget.value, k, i)"
                                                                v-model="item.join_table"
                                                                v-if="item.type===''||item.type===1">
                                                            <option value="">请选择</option>
                                                            <option :value="key" v-for="(items,key) in its.relation" :key="key">
                                                                {{items}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-group" style="margin: 0;">
                                                        <select :name="'roleDetails[data_range_id]['+k+'][]'"
                                                                class="form-control" v-model="item.data_range_id"
                                                                :disabled="item.type===''">
                                                            <option value="">请选择</option>
                                                            <option :value="items.id"
                                                                    v-for="(items, k) in its.role[i].range" :key="k">
                                                                {{items.range_name}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
        <UserComponent @UserCallback="UserCallback"></UserComponent>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import CompanyComponent from '@/components/admin/featRole/CompanyComponent'
import UserComponent from '@/components/admin/featRole/UserComponent'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Detail',
  store,
  data () {
    return {
      loading: true,
      id: '',
      role_num: '',
      role_name: '',
      company_id: '',
      company_name: '',
      userIndex: 0,
      userList: [],
      tables: [],
      List: []
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
    if (self.id !== undefined) {

    } else {
      self.loading = false
    }
    self.getInfo()
  },
  methods: {
    getInfo () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id || '')
      self.loading = true
      db.postRequest('Institution/RoleData/roleDetail', params).then(res => {
        if (res.status === 1) {
          self.role_num = res.data.list.role_num
          self.role_name = res.data.list.role_name
          self.company_id = res.data.list.company_id
          self.company_name = res.data.list.company_name
          self.created_time = res.data.list.created_time
          self.tables = res.data.tables
          self.userList = res.data.list.role_user_list
          self.List = res.data.list.role_detail_list
          self.List.map((item, k) => {
            item['relation'] = self.tables[item.table]['relation']
            item.role.map((items, i) => {
              if (items.type === 1) {
                self.dataFanwei(items.join_table, k, i)
              } else {
                self.dataFanwei(item.table, k, i)
              }
            })
          })
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#Addjuese').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/RoleData/roleSave', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/admin/dataRole')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    },
    companyCallback (obj) {
      this.company_id = obj.id
      this.company_name = obj.name
    },
    addUserList () {
      this.userList.push({
        id: '',
        user_number: '',
        user_name: '',
        created_time: ''
      })
    },
    UserCallback (obj) {
      let self = this
      let i = self.userIndex
      self.userList[i]['id'] = obj.id
      self.userList[i]['user_number'] = obj.number
      self.userList[i]['user_name'] = obj.name
      self.userList[i]['created_time'] = self.currentTime(1)
    },
    // 数据范围
    dataFanwei (val, k, i) {
      let self = this
      let params = new URLSearchParams()
      params.append('range_table', val)
      params.append('type', self.List[k].role[i].type)
      db.postRequest('Institution/RoleData/choseRange', params).then(res => {
        if (res.status === 1) {
          self.List[k].role[i].range = res.data.list
        }
      })
    },
    selectParent (val, k) {
      this.List[k].role.map(item => {
        item.type = ''
        item.join_table = ''
        item.data_range_id = ''
        item.range = []
      })
      if (val === '') {
        this.relation = []
        this.List[k].table = ''
        this.List[k].relation = ''
      } else {
        this.List[k].table = val
        this.List[k].relation = this.tables[val].relation
      }
    },
    selectType (type, val, k, i) {
      this.List[k].role[i].data_range_id = ''
      this.List[k].role[i].join_table = ''
      this.List[k].role[i].range = []
      if (type === 2) {
        this.dataFanwei(val, k, i)
      }
    }
  },
  components: {CompanyComponent, UserComponent}
}
</script>

<style scoped>

</style>
