<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">认证审核</div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                    <span v-if="company.audit_status!==0">申请号: {{company.apply_no}}</span>
                </div>

            </div>
        </div>
        <div v-if="loading" v-html="LoadingImg"></div>
        <div class="form-horizontal pl-50 pr-50" v-if="!loading">
            <div class="commonTitle">营业执照</div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">营业执照照片</label>
                <div class="col-sm-10 form-inline">
                    <span class="div_vm bda"><img :src="siteUrl + company.trading_cert_path" width="100" height="100" /></span>
                    <a href="javascript:void(0);" class="div_vm ml-20" @click="downImage(siteUrl + company.trading_cert_path)">下载</a>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">社会信用代码</label>
                <div class="col-sm-5 control-text">{{company.credit_code}}</div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">营业期限</label>
                <div class="col-sm-10 form-inline control-text">
                    <div class="c999 clearfix">
                        证件有效期限需与上传文件上所示期限一致，若有效期限超过2100年，请选择“长期”
                    </div>
                    <div class="clearfix" v-if="company.trading_long_time===0">{{company.trading_start}} 至 {{company.trading_end}}</div>
                    <div class="clearfix" v-if="company.trading_long_time===1">长期有效</div>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">经营范围</label>
                <div class="col-sm-10 control-text">{{company.business_scope}} </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">注册地址</label>
                <div class="col-sm-5 control-text">{{company.reg_address}}</div>
            </div>
            <div class="commonTitle">企业法人</div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">证件持有人类型</label>
                <div class="col-sm-10 control-text">
                    <span v-if="company.cert_holder_type===1">法人</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">证件类型</label>
                <div class="col-sm-10 control-text">
                    <span v-if="company.cert_type===1">身份证(限中国大陆居民)</span>
                    <span v-if="company.cert_type===2">护照(限境外人士)</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">身份证正面照片</label>
                <div class="col-sm-10 control-text">
                    <span class="div_vm bda"><img :src="siteUrl + company.cert_front_path" width="100" height="100"></span>
                    <a href="javascript:void(0);" class="div_vm ml-20">下载</a>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">身份证反面照片</label>
                <div class="col-sm-10 control-text">
                    <span class="div_vm bda"><img :src="siteUrl + company.cert_back_path" width="100" height="100"></span>
                    <a href="javascript:void(0);" class="div_vm ml-20">下载</a>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">证件号码</label>
                <div class="col-sm-3 control-text">{{company.cert_no|plusXin(4,4)}}</div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">证件持有人姓名</label>
                <div class="col-sm-3 control-text">{{company.cert_holder_name}}</div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">证件有效期</label>
                <div class="col-sm-10 form-inline control-text">
                    <div class="c999 clearfix5">
                        证件有效期限需与上传文件上所示期限一致，若有效期限超过2100年，请选择“长期”
                    </div>
                    <div class="clearfix" v-if="company.cert_long_time===0">{{company.cert_start}} 至 {{company.cert_end}}</div>
                    <div class="clearfix" v-if="company.cert_long_time===1">长期有效</div>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-10 col-sm-offset-2">
                    <button type="button" class="btn btn-primary">通过</button>
                    <button type="button" class="btn btn-default ml-20">驳回</button>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@~/js/request'
export default {
  name: 'AuthReviewDetail',
  data () {
    return {
      loading: true,
      siteUrl: window.ajaxBaseUrl,
      company: {
        apply_no: '',
        trading_cert_path: '',
        credit_code: '',
        trading_start: '',
        trading_end: '',
        trading_long_time: false,
        business_scope: '',
        reg_address: '',
        cert_holder_type: '',
        cert_type: '',
        cert_front_path: '',
        cert_back_path: '',
        cert_no: '',
        cert_holder_name: '',
        cert_start: '',
        cert_end: '',
        cert_long_time: false,
        auth_status: ''
      }
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.getAuthDetail()
    })
  },
  methods: {
    getAuthDetail () {
      let self = this
      let params = new URLSearchParams()
      db.postRequest('/Institution/Company/authEdit', params).then(res => {
        if (res.status === 1) {
          self.company = res.data
          self.$nextTick(() => {
            self.loading = false
          })
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    downImage (url) {
      window.URL = window.URL || window.webkitURL
      let xhr = new XMLHttpRequest()
      xhr.open('get', 'http://www.js.me/demo/images/001.jpg', true)
      // 至关重要
      xhr.responseType = 'blob'
      xhr.onload = function () {
        if (this.status === 200) {
          // 得到一个blob对象
          let blob = this.response
          console.log('blob', blob)
          // 至关重要
          let oFileReader = new FileReader()
          oFileReader.onloadend = function (e) {
            // 此处拿到的已经是 base64的图片了
            let base64 = e.target.result
            console.log('方式一》》》》》》》》》', base64)
          }
          oFileReader.readAsDataURL(blob)
          // ====为了在页面显示图片，可以删除====
          var img = document.createElement('img')
          img.onload = function (e) {
            window.URL.revokeObjectURL(img.src) // 清除释放
          }
          let src = window.URL.createObjectURL(blob)
          img.src = src
          // document.getElementById("container1").appendChild(img);
          // ====为了在页面显示图片，可以删除====
        }
      }
      xhr.send()
    }
  },
  components: {},
  watch: {}
}
</script>

<style scoped>

</style>
