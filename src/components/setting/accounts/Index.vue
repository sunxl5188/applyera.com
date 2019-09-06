<template>
    <div>
        <div class="row">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="list-group department">
                    <li class="list-group-item hover">
                        <span class="iconfont c999 font14 shrink">&#xe61e;</span>
                        <div>
                            <span class="handPower"
                                  @click="department_id=0;pagechange()">全公司({{departmentCount}}人)</span>
                            <i class="iconfont cded pull-right handPower popovers font12 lh36"
                               @click="level=0;department_id=0">&#xe66a;</i>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="(item,i) in department" :key="i">
                                <span class="iconfont c999 font14 shrink ml-10">&#xe61e;</span>
                                <div>
                                    <span class="handPower" @click="department_id=item.id;pagechange()">{{item.department_name}}({{item.count}}人)</span>
                                    <i class="iconfont cded pull-right handPower popovers font12 lh36"
                                       @click="level=1;department_id=item.parent_id;parentId=item.parent_id;depId=item.id">&#xe66a;</i>
                                </div>
                                <ul class="list-group" v-if="item.child.length > 0">
                                    <li class="list-group-item" v-for="(items,m) in item.child" :key="m">
                                        <div class="ml-20">
                                            <span class="handPower" @click="department_id=items.id;pagechange()">{{items.department_name}}({{items.count}}人)</span>
                                            <i class="iconfont cded pull-right handPower popovers font12 lh36"
                                               @click="level=2;department_id=items.id;parentId=items.parent_id;depId=items.id">&#xe66a;</i>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </div>
            </div>
            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <div class="clearfix pb-30">
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"></div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                            <div class="form-group ml-10">
                                <button type="button" class="btn btn-default" data-toggle="modal" data-backdrop="static"
                                        data-target="#addAccounts" @click="layTitle='新增账号信息'"><i class="iconfont">&#xe73e;</i>
                                    新增
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <table class="table table-customize">
                        <thead>
                        <tr>
                            <th>姓名</th>
                            <th>手机号</th>
                            <th>角色</th>
                            <th>所属部门</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th width="5%"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,i) in list" :key="i">
                            <td>
                                {{item.name}}
                                <span class="label label-primary" v-if="item.is_main_account===1">主账号</span>
                            </td>
                            <td>{{item.phone}}</td>
                            <td>{{item.role_name}}</td>
                            <td>{{item.department_name}}</td>
                            <td>{{item.created_time}}</td>
                            <td>{{item.status}}</td>
                            <td>
                                <div class="dropdown">
                                    <a href="javascript:void(0);" data-toggle="dropdown"><i
                                            class="iconfont">&#xe66b;</i></a>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li><a href="javascript:void(0);" @click="editUserInfo(item.id)">编辑</a></li>
                                        <li><a href="javascript:void(0);" @click="closeStatus(item.id)">关闭</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="7" v-html="LoadingImg()"></td>
                        </tr>
                        <tr v-if="list.length===0 && !loading">
                            <td colspan="7" v-html="NoData()"></td>
                        </tr>
                        </tbody>
                    </table>
                    <PagInAction :total="total" :current-page="current" @pagechange="pagechange"></PagInAction>
                </div>
            </div>
        </div>

        <div id="popoverDepartment" style="display: none;">
            <p v-if="department_id===0 && level===0"><a href="javascript:void(0);" class='addClassParent'>新建下级部门</a></p>
            <div v-if="level>0">
                <p v-if="level<2"><a href="javascript:void(0);" class="addChildDepartment">新建下级部门</a></p>
                <p><a href="javascript:void(0);" class="addDepartment" @click="addClass=true;level=0">新建同级部门</a></p>
                <p><a href="javascript:void(0);" class="editDepartment">修改部门名称</a></p>
                <p><a href="javascript:void(0);" class="deleteDepartment">删除部门</a></p>
            </div>
        </div>

        <!--新增编账号-->
        <div class="modal fade bs-example-modal-lg" id="addAccounts">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">{{layTitle}}</h4>
                    </div>
                    <form action="" method="POST" id="AccountsForm" class="form-horizontal"
                          @submit.prevent="validateBeforeSubmit" autocomplete="off">
                        <input type="hidden" name="account_id" :value="accounts.id" v-if="accounts.id!==''"/>
                        <div class="modal-body pl-30 pr-30">
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">用户姓名</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" name="name" placeholder="请输入姓名"
                                                   v-validate="'required'" data-vv-as="用户姓名" v-model="accounts.name">
                                            <div class="validateTip" v-show="errors.has('name')">
                                                {{ errors.first("name") }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">手机号</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" name="phone" placeholder="请输入手机号"
                                                   v-validate="'required|mobile'" data-vv-as="手机号"
                                                   v-model="accounts.phone">
                                            <div class="validateTip" v-show="errors.has('phone')">
                                                {{ errors.first("phone") }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">登录密码</label>
                                        <div class="col-sm-9" v-if="accounts.id===''">
                                            <input type="password" name="pwd" class="form-control"
                                                   placeholder="请输入6-12位密码,包含数字,字母" v-validate="'required|alpha_dash'"
                                                   data-vv-as="登录密码" v-model="accounts.pwd">
                                            <div class="validateTip" v-show="errors.has('pwd')">
                                                {{ errors.first("pwd") }}
                                            </div>
                                        </div>
                                        <div class="col-sm-9" v-if="accounts.id!==''">
                                            <input type="password" name="pwd" class="form-control"
                                                   placeholder="不修改密码则不填写">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">账户状态</label>
                                        <div class="col-sm-9">
                                            <div class="radio">
                                                <label>
                                                    <input type="radio" name="state" value="1" checked
                                                           v-model="accounts.status"> 开启
                                                </label>
                                                <label class="ml-10">
                                                    <input type="radio" name="state" value="0"
                                                           v-model="accounts.status">
                                                    关闭
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">所属角色</label>
                                        <div class="col-sm-9">
                                            <select name="role_id" class="form-control" v-validate="'required'"
                                                    data-vv-as="角色" v-model="accounts.role_id">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="(item,i) in roleList" :key="i">{{item.name}}</option>
                                            </select>
                                            <div class="validateTip" v-show="errors.has('role_id')">
                                                {{ errors.first("role_id") }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">所属部门</label>
                                        <div class="col-sm-9">
                                            <select name="department_id"
                                                    class="form-control departmentSelect"
                                                    v-validate="'required'" data-vv-as="部门"
                                                    v-model.number="accounts.department_id"></select>
                                            <div class="validateTip" v-show="errors.has('department_id')">
                                                {{ errors.first("department_id") }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">职务信息</label>
                                        <div class="col-sm-9">
                                            <input type="text" name="position_info" class="form-control"
                                                   placeholder="请输入信息" v-model="accounts.position_info">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">身份信息</label>
                                        <div class="col-sm-9">
                                            <div class="radio">
                                                <label>
                                                    <input type="radio" name="role_info" v-model="accounts.role_info"
                                                           value="1" checked> 普通成员
                                                </label>
                                                <label class="ml-10">
                                                    <input type="radio" name="role_info" v-model="accounts.role_info"
                                                           value="2"> 上级
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="submit" class="btn btn-primary">保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!--创建编辑部门-->
        <div class="modal fade" id="departmentId">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">部门分类</h4>
                    </div>
                    <div class="modal-body">
                        <form action="" method="POST" class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">部门名称</label>
                                <div class="col-sm-6">
                                    <input type="text" name="departmentName" v-model="department_name"
                                           class="form-control"/>
                                </div>
                                <div class="col-sm-3">
                                    <button type="button" class="btn btn-primary" @click="addDepartment" v-show="!edit">
                                        保存
                                    </button>
                                    <button type="button" class="btn btn-primary" @click="editDepartment" v-show="edit">
                                        保存
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import store from '@/vuex/Store'
import PagInAction from '@/components/PagInAction'
import db from '@~/js/request'

export default {
  name: 'Index',
  store,
  data () {
    return {
      layTitle: '新增账号信息',
      loading: true,
      total: 0,
      current: 1,
      list: [],
      department: [],
      departmentCount: 0,
      departmentOption: '',
      roleList: [],
      // ------------
      edit: false,
      department_name: '',
      department_id: 0,
      parentId: 0,
      depId: 0,
      level: 0,
      accounts: {
        name: '',
        phone: '',
        pwd: '',
        status: '',
        role_id: '',
        department_id: '',
        position_info: '',
        role_info: ''
      }

    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    let option = {
      html: true,
      placement: 'bottom',
      container: 'body',
      content: function () {
        return $('#popoverDepartment').html()
      }
    }
    self.pagechange()
    self.getDepartment()
    self.getRole()
    self.$nextTick(() => {
      setTimeout(function () {
        // 部门分类=>鼠标移入时显示按钮
        $(document).on('mouseenter mouseleave', '.department li div', function (event) {
          if (event.type === 'mouseenter') {
            if ($('.department li').length > 1) {
              $('.department li').removeClass('hover')
            }
            $(this).parent().addClass('hover')
          }
        })
        // 部门分类=>点击按钮弹出层
        $(document).on('click', '.popovers', function () {
          let $this = $(this)
          let obj = $('.popovers')
          obj.popover(option)
          obj.popover('hide')
          setTimeout(function () {
            $this.popover('show')
          }, 300)
        })

        // 点击空白处时关闭popover
        $(document).click(function (e) {
          let i = $(e.target)
          if (!i.closest('.popovers, .popover-content').length > 0) {
            $('.popovers').popover('hide')
          }
        })
        // 新建一级分类
        $(document).on('click', '.addClassParent', function () {
          $('.popovers').popover('hide')
          $('#departmentId').modal('show')
        })
        // 新建下级
        $(document).on('click', '.addChildDepartment', function () {
          self.department_id = self.depId
          self.level = 2
          $('.popovers').popover('hide')
          $('#departmentId').modal('show')
        })
        // 新建同级
        $(document).on('click', '.addDepartment', function () {
          self.department_id = self.parentId
          $('.popovers').popover('hide')
          $('#departmentId').modal('show')
        })
        // 修改部门分类
        $(document).on('click', '.editDepartment', function () {
          self.edit = true
          self.department_id = self.depId
          $('.popovers').popover('hide')
          $('#departmentId').modal('show')
        })
        // 删除部门
        $(document).on('click', '.deleteDepartment', function () {
          $('.popovers').popover('hide')
          self.deleteDepartment(self.depId)
        })

        // 点击展开收起部门列表
        $(document).on('click', 'span.shrink', function () {
          if ($(this).siblings('ul').is(':visible')) {
            $(this).siblings('ul').slideUp()
            $(this).html('&#xe61f;')
          } else {
            $(this).siblings('ul').slideDown()
            $(this).html('&#xe61e;')
          }
        })
      }, 1000)
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      self.loading = true
      self.current = p || 1
      params.append('page', p || 1)
      params.append('department_id', self.department_id)
      db.getRequest('Institution/Account/index', params).then(res => {
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
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#AccountsForm').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Account/editAccount', params).then(res => {
            if (res.status === 1) {
              self.pagechange()
              self.getDepartment()
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
                $('#addAccounts').modal('hide')
                setTimeout(function () {
                  self.accounts = {
                    name: '',
                    phone: '',
                    pwd: '',
                    status: '',
                    role_id: '',
                    department_id: '',
                    position_info: '',
                    role_info: ''
                  }
                }, 500)
              })
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    getDepartment () {
      let self = this
      db.getRequest('Institution/Account/departmentInfo', {}).then(res => {
        if (res.status === 1) {
          self.departmentCount = res.data.all
          self.department = res.data.tree
          self.treeData(0)
        } else {
          console.log(res.msg)
        }
      })
    },
    addDepartment () {
      let self = this
      let params = new URLSearchParams()
      params.append('department_id', self.department_id)
      params.append('level', self.level)
      params.append('department_name', self.department_name)
      db.postRequest('Institution/Account/departmentAdd', params).then(res => {
        if (res.status === 1) {
          self.addClass = false
          self.department_name = ''
          self.department_id = 0
          self.level = 0
          self.getDepartment()
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            $('#departmentId').modal('hide')
            self.layer.close(i)
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    editDepartment () {
      let self = this
      let params = new URLSearchParams()
      params.append('department_id', self.department_id)
      params.append('department_name', self.department_name)
      db.postRequest('Institution/Account/departmentEdit', params).then(res => {
        if (res.status === 1) {
          self.addClass = false
          self.edit = false
          self.department_name = ''
          self.department_id = 0
          self.getDepartment()
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            $('#departmentId').modal('hide')
            self.layer.close(i)
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    deleteDepartment (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('department_id', id)
      db.getRequest('Institution/Account/departmentDel', params).then(res => {
        if (res.status === 1) {
          self.getDepartment()
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    getRole () {
      let self = this
      db.getRequest('Institution/Account/getRoleInfo', {}).then(res => {
        if (res.status === 1) {
          self.roleList = res.data
        } else {
          console.log(res.msg)
        }
      })
    },
    treeData () {
      let self = this
      let option = '<option value="">请选择</option>'
      let tree = self.department
      if (Object.prototype.toString.call(tree) === '[object Array]') {
        tree.map(item => {
          option += "<option value='" + item.id + "'>" + item.department_name + '</option>'
          if (item.child.length > 0) {
            option += self.treeChild(item.child)
          }
        })
      }
      $('.departmentSelect').html(option)
    },
    treeChild (arr) {
      let self = this
      let option = ''
      arr.map(item => {
        let blank = ''
        if (item.level > 2) {
          for (let i = 1; i < item.level; i++) {
            blank += '&nbsp;&nbsp;'
          }
        }
        blank = blank + '&nbsp;&nbsp;├&nbsp;&nbsp;'
        option += "<option value='" + item.id + "'>" + blank + item.department_name + '</option>'
        if (item.child.length > 0) {
          option += self.treeChild(item.child)
        }
      })
      return option
    },
    editUserInfo (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.getRequest('Institution/Account/getAccountInfo', params).then(res => {
        if (res.status === 1) {
          self.accounts = res.data
          self.layTitle = '编辑账号信息'
          $('#addAccounts').modal('show')
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    closeStatus (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('status', 0)
      db.postRequest('Institution/Account/changeStatus', params).then(res => {
        if (res.status === 1) {
          self.list.map(item => {
            if (item.id === id) {
              item.status = '关闭'
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
  components: {PagInAction}
}
</script>

<style scoped lang="scss">
    #departmentId{
        & .table{
            margin-bottom:0;

            & td{
                padding:0;
            }
        }
    }

    .department{
        & .list-group-item{
            padding:0;
            -webkit-border-radius:0;
            -moz-border-radius:0;
            border-radius:0;
            border:none;
            line-height:36px;

            & > span.iconfont{
                float:left;width:20px;height:36px;line-height:40px;overflow:hidden;cursor:pointer;text-align:center;
            }

            & > div{
                & > .iconfont{
                    display:none;
                    outline:none !important;
                }
            }

            &.hover{
                background-color:#a1e0ff;
                color:#333;
            }

            &.hover{
                & > div > .iconfont{
                    display:inline-block;
                }
            }

            & > ul{
                margin-bottom:0;

                & > .list-group-item{
                    line-height:36px;

                    & > div{padding-left:20px;}

                    & > ul{
                        margin-bottom:0;

                        & > .list-group-item{
                            line-height:36px;

                            & > div{padding-left:20px;}
                        }
                    }
                }
            }
        }
    }
</style>
