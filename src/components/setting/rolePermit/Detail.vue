<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">权限分配</div>
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

        <div class="clearfix" v-if="loading" v-html="LoadingImg"></div>
        <div class="clearfix" v-if="!loading">
            <form action="" id="roleForm" method="post" role="form">
                <input type="hidden" name="permission_id" :value="id" v-if="id!==''"/>

                <ul class="list-group">

                    <li class="list-group-item" style="border-bottom: none;">
                        <div class="clearfix form-inline">
                            <div class="form-group">
                                <label>角色名称<font class="cf00">*</font></label>
                                <input type="text" name="role_name" class="form-control" v-model="userList.name"
                                       placeholder="请输入角色名称">
                            </div>
                        </div>
                    </li>

                    <li class="list-group-item" v-for="(item, k) in list" :key="k">
                        <h4>{{item.name}}</h4>
                        <div class="checkbox pt-10" v-if="item.child.length>0">
                            <label class="checkbox-inline" v-for="(items, kk) in item.child" :key="kk" v-if="id!==''">
                                <input type="checkbox" name="func_id[]" :value="items.id"
                                       :checked="userList.func_id[k]['child'][kk]['check']===1">
                                {{items.name}}
                            </label>
                            <label class="checkbox-inline" v-for="(items, kk) in item.child" :key="kk" v-if="id===''">
                                <input type="checkbox" name="func_id[]" :value="items.id">
                                {{items.name}}
                            </label>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <h4>数据权限</h4>

                        <div class="row pt-10">
                            <div class="col-lg-4 col-lg-4 col-lg-4 col-lg-4">
                                <div class="radio">
                                    <label class="radio-inline">
                                        <input type="radio" name="data_permission" value="1"
                                               v-model.number="userList.data_permission"> 本人
                                    </label>
                                </div>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <span class="lh26">只能操作自己和下属的数据</span>
                            </div>
                            <div class="col-lg-4 col-lg-4 col-lg-4 col-lg-4">
                                <div class="radio">
                                    <label class="radio-inline">
                                        <input type="radio" name="data_permission" value="2"
                                               v-model.number="userList.data_permission"> 所属部门
                                    </label>
                                </div>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <span class="lh26">能操作自己、下属和自己所属部门的数据</span>
                            </div>
                            <div class="col-lg-4 col-lg-4 col-lg-4 col-lg-4">
                                <div class="radio">
                                    <label class="radio-inline">
                                        <input type="radio" name="data_permission" value="3"
                                               v-model.number="userList.data_permission"> 所属部门及下能部门
                                    </label>
                                </div>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <span class="lh26">能操作自己、下属、自己所属部门及下级部门的数据</span>
                            </div>
                            <div class="col-lg-4 col-lg-4 col-lg-4 col-lg-4">
                                <div class="radio">
                                    <label class="radio-inline">
                                        <input type="radio" name="data_permission" value="4"
                                               v-model.number="userList.data_permission"> 全公司
                                    </label>
                                </div>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <span class="lh26">能操作全公司的数据</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </form>

        </div>

    </div>
</template>

<script>
import * as _ from 'lodash'
import store from '@/vuex/Store'
import db from '@~/js/request'

require('icheck')

export default {
  name: 'Detail',
  store,
  data () {
    return {
      loading: true,
      id: '',
      list: [],
      userList: {
        name: '',
        data_permission: 1
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
    self.id = self.$route.query.id || ''
    self.getModle()
    if (self.id !== '') {
      self.getUserModel()
    } else {
      self.loading = false
    }
  },
  methods: {
    // 提交
    submitForm () {
      let self = this
      let formData = $('#roleForm').serializeArray()
      let params = new URLSearchParams()
      formData.map(item => {
        params.append(item.name, item.value)
      })
      db.postRequest('Institution/Account/permissionEdit', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, { icon: 1 }, function (i) {
            self.layer.close(i)
            self.$router.push('/setting/rolePermit')
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 获取模块
    getModle () {
      let self = this
      db.postRequest('Institution/Account/permissionInfo', {}).then(res => {
        if (res.status === 1) {
          self.list = res.data
          _.delay(() => {
            $('input[name="func_id[]"], input[name="data_permission"]').iCheck({
              labelHover: false,
              cursor: true,
              checkboxClass: 'icheckbox_minimal-blue',
              radioClass: 'iradio_minimal-blue',
              increaseArea: '20%'
            })
          }, 1000)
        } else {
          console.log(res.msg)
        }
      })
    },
    // 获取用户权限信息
    getUserModel () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.getRequest('Institution/Account/getPermissionInfo', params).then(res => {
        if (res.status === 1) {
          self.userList = res.data
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
        setTimeout(function () {
          self.loading = false
        }, 500)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.row {
    display:flex;
    display:-webkit-flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-content:flex-start;
}
.list-group{
    & .checkbox-inline{padding-left:0 !important;}
    & .radio-inline{padding-left:0 !important;}
}
</style>
