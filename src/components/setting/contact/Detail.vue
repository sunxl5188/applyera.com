<template>
    <div>
        <div v-if="loading" v-html="LoadingImg()" class="pad-30"></div>
        <div v-if="!loading">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">联系人</div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <button type="button" class="btn btn-default" @click="validateBeforeSubmit"><i class="iconfont">&#xe637;</i>保存
                        </button>
                        <button type="button" class="btn btn-default ml-15" @click="$router.back()"><i class="iconfont">&#xe64f;</i>返回
                        </button>
                    </div>
                </div>
            </div>
            <div class="clearfix">
                <form action="" id="contact_form" method="POST" class="form-horizontal"
                      @submit.prevent="validateBeforeSubmit">
                    <input type="hidden" name="id" v-if="id" :value="id"/>
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>编号</label>
                                    <input type="text" class="form-control" name="number" v-model="detail.number"
                                           placeholder=""
                                           readonly>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label><font class="cf00">*</font>联系人</label>
                                    <input type="text" class="form-control" name="name" placeholder=""
                                           v-validate="'required'" data-vv-as="学生类型" v-model="detail.name">
                                    <div class="validateTip" v-show="errors.has('name')">
                                        {{ errors.first("name") }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label><font class="cf00">*</font>关联学生</label>
                                    <select name="ins_student_id" class="form-control selectpicker"
                                            data-live-search="true" v-model="detail.ins_student_id">
                                        <option value="">请选择</option>
                                        <option :value="item.id" v-for="(item,i) in studentList" :key="i">{{item.name}}</option>
                                    </select>
                                    <div class="validateTip" v-show="errors.has('ins_student_id')">
                                        {{ errors.first("ins_student_id") }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>与学生关系</label>
                                    <input type="text" class="form-control" name="relation" v-model="detail.relation"
                                           placeholder="">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>联系电话</label>
                                    <input type="text" class="form-control" name="phone" v-model="detail.phone"
                                           placeholder="请输入信息">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>联系邮箱</label>
                                    <input type="text" class="form-control" name="email" v-model="detail.email"
                                           placeholder="请输入信息">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>微信</label>
                                    <input type="text" class="form-control" name="wechat" v-model="detail.wechat"
                                           placeholder="请输入信息">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>QQ</label>
                                    <input type="text" class="form-control" name="qq" v-model="detail.qq"
                                           placeholder="请输入信息">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>创建时间</label>
                                    <input type="text" class="form-control" name="created_time"
                                           v-model="detail.created_time" placeholder=""
                                           readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>状态</label>
                                    <input type="text" class="form-control" name="status" :value="detail.status|state"
                                           placeholder="" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>备注</label>
                                    <textarea name="remark" class="form-control" style="height: 80px;"
                                              v-model="detail.remark"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import '@~/js/VeeValidateConfig'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Detail',
  store,
  data () {
    return {
      loading: true,
      id: '',
      studentList: [],
      detail: {
        ins_student_id: '',
        number: '',
        name: '',
        relation: '',
        phone: '',
        email: '',
        wechat: '',
        qq: '',
        remark: '',
        created_time: '',
        status: '',
        stu_name: ''
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
    self.$nextTick(() => {
      if (self.id !== '') {
        self.getDetail()
      } else {
        self.loading = false
        setTimeout(function () {
          $('.selectpicker').selectpicker()
        }, 500)
      }
      self.getStudent()
    })
  },
  methods: {
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.getRequest('Institution/StudentContact/detail', params).then(res => {
        if (res.status === 1) {
          self.detail = res.data
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
          let formData = $('#contact_form').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/StudentContact/edit', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
                self.$router.push('/setting/contact')
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
    getStudent () {
      let self = this
      db.postRequest('Institution/StudentContact/getStudent', {}).then(res => {
        if (res.status === 1) {
          self.studentList = res.data
          setTimeout(function () {
            $('.selectpicker').selectpicker()
          }, 500)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .row {
        display:flex;
        align-items:flex-start;
        flex-wrap:wrap;
    }
</style>
