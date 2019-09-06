<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">费用预算</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="submitForm()"><i class="iconfont">&#xe637;</i> 保存
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
            <form method="POST" class="form-horizontal" id="addForm" autocomplete="off"
                  @submit.prevent="validateBeforeSubmit">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">档案编号</label>
                            <div class="col-sm-8">
                                <input type="text" name="number" class="form-control" placeholder=""
                                       :value="number" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>费用预算项目</label>
                            <div class="col-sm-8">
                                <input type="text" name="item" class="form-control" placeholder=""
                                       v-validate="'required'" data-vv-as="费用预算项目"/>
                                <div class="validateTip" v-show="errors.has('item')">
                                    {{ errors.first("item") }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>金额（元）</label>
                            <div class="col-sm-8">
                                <input type="text" name="price" class="form-control" placeholder="请输入信息"
                                       v-validate="'required|money'" data-vv-as="金额"/>
                                <div class="validateTip" v-show="errors.has('price')">
                                    {{ errors.first("price") }}
                                </div>
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
                                       :value="time" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">状态</label>
                            <div class="col-sm-8">
                                <input type="text" name="statusStr" class="form-control" value="启用" placeholder=""
                                       readonly/>
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
  name: 'Add',
  store,
  data () {
    return {
      number: ''
    }
  },
  computed: {
    token () {
      return store.state.token
    },
    time () {
      return this.currentTime()
    }
  },
  mounted () {
    let self = this

    setTimeout(function () {
      db.getRequest('Institution/Budget/getNumber', {}).then(res => {
        if (res.status === 1) {
          self.number = res.data
        }
      })
    }, 500)
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
          db.postRequest('Institution/Budget/add', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (e) {
                self.layer.close(e)
                self.$router.push('/setting/budget/')
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

<style scoped>

</style>
