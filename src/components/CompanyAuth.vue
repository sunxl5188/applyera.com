<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle div_vm">实名认证</div>
                </div>
            </div>
        </div>
        <div class="pl-100 pr-100 pt-20 pb-20 lh24">线上支付以及电子合同功能仅对注册了个体工商户顾问老师或具备企业资质的机构开放。实名认证您将需要用到
            营业执照及法人的身份证件，请提前准备以节约认证的时间。
        </div>
        <div class="clearfix text-center">
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="pad-15 bda fillet-5">
                        <div class="text-center">
                            <span class="companyIcon"><i class="iconfont font100 cded">&#xe647;</i></span>
                        </div>
                        <div class="clearfix pt-15">
                            <router-link to="/home/company/authDetail" class="font16">个体工商户/企业实名认证</router-link>
                            <div class="c666" v-if="auth_status===0">未认证</div>
                            <div class="c52c" v-if="auth_status===2">(审核中)</div>
                            <div class="c52c" v-if="auth_status===3">认证成功</div>
                            <div class="cf00" v-if="auth_status===1">驳回，请修改后提交</div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
            </div>
            <div class="blk-50"></div>
        </div>
    </div>
</template>

<script>
import db from '@~/js/request'
export default {
  name: 'CompanyAuth',
  data () {
    return {
      auth_status: ''
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      let params = new URLSearchParams()
      db.postRequest('/Institution/Company/authStatus', params).then(res => {
        if (res.status === 1) {
          self.auth_status = res.data.audit_status
        } else {
          console.log(res.msg)
        }
      })
    })
  },
  methods: {},
  components: {},
  watch: {
  }
}
</script>

<style scoped>
.companyIcon{width:160px;height:160px;display:inline-block;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;background-color:#dedede;line-height:160px;text-align:center;}
</style>
