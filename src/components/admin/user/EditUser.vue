<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">操作用户</div>
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

        <div class="clearfix" v-if="Object.keys(list).length ===0" v-html="LoadingImg"></div>
        <div class="clearfix" v-if="Object.keys(list).length>0">
            <form method="POST" class="form-horizontal" id="editForm" autocomplete="off"
                  @submit.prevent="validateBeforeSubmit">
                <input type="hidden" name="id" id="id" :value="list.id"/>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">用户编号</label>
                            <div class="col-sm-8">
                                <input type="text" name="number" class="form-control" placeholder=""
                                       :value="list.number" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>用户名称</label>
                            <div class="col-sm-8">
                                <input type="text" name="name" class="form-control" placeholder=""
                                       v-validate="'required'" data-vv-as="用户名称" v-model="list.name"/>
                                <div class="validateTip" v-show="errors.has('name')">
                                    {{ errors.first("name") }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>所属机构</label>
                            <div class="col-sm-8">
                                <select name="companyId" class="form-control" v-validate="'required'"
                                        data-vv-as="所属机构" v-model="list.ins_company_id">
                                    <option value="">请选择</option>
                                    <option :value="item.id" v-for="(item,i) in companys" :key="i">{{item.name}}</option>
                                </select>
                                <div class="validateTip" v-show="errors.has('companyId')">
                                    {{ errors.first("companyId") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>移动电话</label>
                            <div class="col-sm-8">
                                <input type="text" name="phone" class="form-control" placeholder=""
                                       v-validate="'required|mobile'" v-model="list.phone"/>
                                <div class="validateTip" v-show="errors.has('phone')">{{errors.first('phone')}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">邮箱</label>
                            <div class="col-sm-8">
                                <input type="text" name="email" class="form-control" placeholder=""
                                       v-model="list.email"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">状态</label>
                            <div class="col-sm-8">
                                <input type="text" name="statusStr" class="form-control" placeholder=""
                                       :value="list.status|state" readonly/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">创建时间</label>
                            <div class="col-sm-8">
                                <input type="text" name="create_time" class="form-control" placeholder=""
                                       :value="list.created_time" readonly/>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>

    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'EditUser',
  store,
  data () {
    return {
      list: '',
      companys: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    let id = self.$route.query.id
    self.$nextTick(() => {
      setTimeout(function () {
        db.getRequest('Institution/User/detail', {
          id: id
        }).then(res => {
          if (res.status === 1) {
            self.list = res.data
            self.companys = res.data.companys
          } else {
            self.layer.alert(res.msg, {icon: 2})
          }
          self.loading = false
        })
      }, 500)
    })
  },
  methods: {
    submitForm () {
      let self = this
      self.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#editForm').serializeArray()
          let params = new URLSearchParams()
          for (let i = 0; i < formData.length; i++) {
            params.append(formData[i]['name'], formData[i]['value'])
          }
          db.postRequest('Institution/User/edit', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (e) {
                self.layer.close(e)
                self.$router.push('/admin/user/')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
