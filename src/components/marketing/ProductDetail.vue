<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle div_vm">产品管理</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group">
                        <div class="form-group">
                            <button type="button" class="btn btn-default" @click="validateBeforeSubmit">
                                <i class="iconfont">&#xe637;</i>
                                保存
                            </button>
                        </div>
                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default" @click="$router.back()">
                                <i class="iconfont">&#xe64f;</i>
                                返回
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form action="" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
             <div class="row">
                 <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                     <div class="form-group">
                         <label class="col-sm-4 control-label">所属国家</label>
                         <div class="col-sm-8">
                             <select name="" class="form-control selectpicker show-tick" data-size="10" data-live-search="true">
                                 <option value="">请选择</option>
                                 <option :value="item.id" v-for="(item, i) in nation" :key="i">{{item.cn}}</option>
                             </select>
                         </div>
                     </div>
                 </div>
                 <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                     <div class="form-group">
                         <label class="col-sm-4 control-label">产品名称</label>
                         <div class="col-sm-8">
                             <input type="text" name="name" class="form-control" value="" placeholder="请输入新品名称(不超过6个字)" >
                         </div>
                     </div>
                 </div>
                 <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                     <div class="form-group">
                         <label class="col-sm-4 control-label">产品价格</label>
                         <div class="col-sm-8">
                             <input type="number" step="0.01" min="0" name="name" class="form-control" placeholder="请输入产品价格"/>
                         </div>
                     </div>
                 </div>
             </div>
            <div class="row">
                 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                     <div class="form-group">
                         <label class="col-sm-1 control-label" style="width: 11.2%;">产品介绍</label>
                         <div class="col-sm-11" style="width: 88.8%;">
                             <textarea name="" class="form-control" placeholder="请输入产品介绍"></textarea>
                         </div>
                     </div>
                 </div>
            </div>
        </form>
    </div>
</template>

<script>
import nation from '@@/json/nation.json'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import '@~/js/VeeValidateConfig'
import db from '@~/js/request'
export default {
  name: 'ProductDetail',
  data () {
    return {
      nation: nation
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      $('.selectpicker').selectpicker()
    })
  },
  methods: {
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    }
  },
  components: {},
  watch: {},
  errorCaptured (err, vm, info) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>
