<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">触手详情</div>
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
       <form action="" id="TentacleDetail" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
           <input type="hidden" name="id" id="id" v-if="id" v-model="id" />
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">触手姓名</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="name" v-model="name" placeholder="">
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">联系电话</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="phone" v-model="phone" placeholder="">
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">微信号</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="wechat_account" v-model="wechat_account" placeholder="">
                        </div>
                    </div>
                </div>
            </div>
           <div class="row">
               <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                   <div class="form-group">
                       <label class="col-sm-4 control-label">收款渠道</label>
                       <div class="col-sm-8">
                           <input type="text" class="form-control" name="receipt_channels" v-model="receipt_channels" placeholder="">
                       </div>
                   </div>
               </div>
               <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                   <div class="form-group">
                       <label class="col-sm-4 control-label">收款户名</label>
                       <div class="col-sm-8">
                           <input type="text" class="form-control" name="receipt_name" v-model="receipt_name" placeholder="">
                       </div>
                   </div>
               </div>
               <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                   <div class="form-group">
                       <label class="col-sm-4 control-label">收款账号</label>
                       <div class="col-sm-8">
                           <input type="text" class="form-control" name="receipt_account" v-model="receipt_account" placeholder="">
                       </div>
                   </div>
               </div>
           </div>

           <div class="form-group">
               <label class="col-sm-2 control-label" style="width:11%;">收款备注</label>
               <div class="col-sm-10" style="width: 89%;">
                   <textarea name="receipt_remark" v-model="receipt_remark" class="form-control"></textarea>
               </div>
           </div>
       </form>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import db from '@~/js/request'
export default {
  name: 'TentacleDetail',
  data () {
    return {
      loading: true,
      id: '',
      name: '',
      phone: '',
      wechat_account: '',
      receipt_channels: '',
      receipt_name: '',
      receipt_account: '',
      receipt_remark: ''
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
      self.loading = true
      db.postRequest('/Institution/SourceSubmit/cltorDetail', params).then(res => {
        if (res.status === 1) {
          self.name = res.data.name
          self.phone = res.data.phone
          self.wechat_account = res.data.wechat_account
          self.receipt_channels = res.data.receipt_channels
          self.receipt_name = res.data.receipt_name
          self.receipt_account = res.data.receipt_account
          self.receipt_remark = res.data.receipt_remark
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
    validateBeforeSubmit (scope) {
      let self = this
      self.$validator.validateAll(scope).then((result) => {
        if (result) {
          let formData = $('#TentacleDetail').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('/Institution/SourceSubmit/cltorEdit', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
                self.$router.push('/marketing/saleslead')
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
