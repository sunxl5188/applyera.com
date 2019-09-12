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
       <form action="" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">触手姓名</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="" placeholder="">
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">触手姓名</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="" placeholder="">
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">触手姓名</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="" placeholder="">
                        </div>
                    </div>
                </div>
            </div>
           <div class="row">
               <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                   <div class="form-group">
                       <label class="col-sm-4 control-label">收款渠道</label>
                       <div class="col-sm-8">
                           <input type="text" class="form-control" name="" placeholder="">
                       </div>
                   </div>
               </div>
               <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                   <div class="form-group">
                       <label class="col-sm-4 control-label">收款户名</label>
                       <div class="col-sm-8">
                           <input type="text" class="form-control" name="" placeholder="">
                       </div>
                   </div>
               </div>
               <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                   <div class="form-group">
                       <label class="col-sm-4 control-label">收款账号</label>
                       <div class="col-sm-8">
                           <input type="text" class="form-control" name="" placeholder="">
                       </div>
                   </div>
               </div>
           </div>

           <div class="form-group">
               <label class="col-sm-2 control-label" style="width:11%;">收款备注</label>
               <div class="col-sm-10" style="width: 89%;">
                   <textarea name="" id="" class="form-control"></textarea>
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
    return {}
  },
  mounted () {},
  methods: {
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit (scope) {
      let self = this
      self.$validator.validateAll(scope).then((result) => {
        if (result) {
          let formData = $('').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
                self.$router.push('')
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
