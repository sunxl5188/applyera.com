<template>
    <div>
        <div v-if="loading" v-html="LoadingImg" class="pad-30"></div>
        <div v-if="!loading">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">学生类型</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default" @click="submitForm()"><i class="iconfont">&#xe637;</i>
                                保存
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

            <div class="clearfix">
                <form action="" id="stu_type_form" method="POST" class="form-horizontal"
                      @submit.prevent="validateBeforeSubmit">
                    <input type="hidden" name="id" v-if="id" :value="id"/>
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>编号</label>
                                    <input type="text" class="form-control" v-model="detail.stu_type_num" placeholder=""
                                           readonly>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label><font class="cf00">*</font>学生类型</label>
                                    <input type="text" class="form-control" name="stu_type" placeholder=""
                                           v-validate="'required'" data-vv-as="学生类型" v-model="detail.stu_type">
                                    <div class="validateTip" v-show="errors.has('stu_type')">
                                        {{ errors.first("stu_type") }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>状态</label>
                                    <input type="text" class="form-control" :value="detail.status|state" placeholder=""
                                           readonly>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>创建时间</label>
                                    <input type="text" class="form-control" v-model="detail.created_time" placeholder=""
                                           readonly>
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
      detail: {
        created_time: '',
        status: '',
        stu_type: '',
        stu_type_num: ''
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
      }
    })
  },
  methods: {
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.getRequest('Institution/StudentType/detail', params).then(res => {
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
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#stu_type_form').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/StudentType/edit', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
                self.$router.push('/setting/student_type')
              })
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
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
