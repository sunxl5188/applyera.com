<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">能力考评</div>
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
            <form action="" id="addForm" method="POST" class="form-horizontal" autocomplete="off"
                  @submit.prevent="validateBeforeSubmit">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">档案编号</label>
                            <div class="col-sm-8">
                                <input type="text" name="number" class="form-control" :value="number" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font> 考评标题</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="title" data-vv-as="考评标题"
                                       v-validate="'required'">
                                <div class="validateTip" v-show="errors.has('title')">{{errors.first("title")}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">状态</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" value="启用" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">创建时间</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" :value="time" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-1 control-label"><font class="cf00">*</font>考评建议内容</label>
                    <div class="col-sm-11">
                        <textarea name="content" id="content" class="form-control" data-vv-as="考评建议内容"
                                  v-validate="'required'"></textarea>
                        <div class="validateTip" v-show="errors.has('content')">{{errors.first("content")}}</div>
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
  name: 'AddAbility',
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
      return this.currentTime(1)
    }
  },

  mounted () {
    let self = this
    self.$nextTick(() => {
      setTimeout(function () {
        db.getRequest('Institution/Assess/getNumber', {}).then(res => {
          if (res.status === 1) {
            self.number = res.data
          } else {
            self.layer.alert(res.msg)
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
          db.postRequest('Institution/Assess/add', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (index) {
                self.layer.close(index)
                self.$router.push('/setting/ability/')
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
