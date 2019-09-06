<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">银行档案</div>
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

        <div class="clearfix">
            <form method="POST" id="addForm" class="form-horizontal" autocomplete="off"
                  @click.prevent="validateBeforeSubmit">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">银行编号</label>
                            <div class="col-sm-8">
                                <input type="text" name="number" class="form-control" placeholder=""
                                       :value="bankName" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>银行名称</label>
                            <div class="col-sm-8">
                                <input type="text" name="name" class="form-control" placeholder="" data-vv-as="银行名称"
                                       v-validate="'required'"/>
                                <div class="validateTip" v-show="errors.has('name')">
                                    {{errors.first("name")}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">状态</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" placeholder="请输入信息" value="启用" readonly/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">创建时间</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" placeholder="" :value="time" readonly/>
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
import db from '@~/js/request'
import store from '@/vuex/Store'

export default {
  name: 'AddBank',
  store,
  data () {
    return {
      bankName: ''
    }
  },
  computed: {
    time () {
      return this.currentTime(1)
    },
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      setTimeout(function () {
        db.getRequest('Institution/Bank/getNumber', {}).then(res => {
          if (res.status === 1) {
            self.bankName = res.data
          }
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
          let formData = $('#addForm').serializeArray()
          let params = new URLSearchParams()
          for (let i = 0; i < formData.length; i++) {
            params.append(formData[i]['name'], formData[i]['value'])
          }
          db.postRequest('Institution/Bank/add', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 2
              }, function (e) {
                self.layer.close(e)
                self.$router.push('/archives/bank/')
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
