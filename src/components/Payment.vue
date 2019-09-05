<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">在线支付</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" v-html="LoadingImg()"></div>
        <div v-if="!loading">

            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <ul class="media-list">
                        <div class="media">
                            <div class="media-left">
                                <i class="iconfont cded font80">&#xe719;</i>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading mt-25">{{info.student_name}}-{{info.pay_trade_no}}</h4>
                                <p>{{info.applyInfo}}</p>
                            </div>
                        </div>
                    </ul>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 font16 text-center">
                    <div class="lh30 pt-10">总额：<span class="cfad">￥</span><span class="cfad font26">{{info.pay_money_cny}}</span>
                    </div>
                    <div class="lh30 c999">（总计{{info.school_count}}所院校{{info.major_count}}个专业,共${{info.pay_money}}）
                    </div>
                </div>
            </div>
            <div class="clearfix bdb mb-50">
                <h4 class="fontB lh40">选择以下支付方式</h4>
            </div>

            <div class="text-justify">
                <a href="javascript:void(0);" :class="payState===1?'active':''" @click="payState=1"><img
                        src="../../static/images/001.jpg" alt=""></a>
                <a href="javascript:void(0);" :class="payState===2?'active':''" @click="payState=2"><img
                        src="../../static/images/002.jpg" alt=""></a>
                <a href="javascript:void(0);" :class="payState===3?'active':''" @click="payState=3"><img
                        src="../../static/images/003.jpg" alt=""></a>
            </div>

            <div class="clearfix pt-25" style="width: 80%;margin:0 auto;">
                <div class="form-group">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="isAgree" v-model="isAgree">
                            同意
                        </label>
                        <a href="/agreement" class="cded" target="_blank">《申学纪服务条款》</a>

                    </div>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary btn-md" @click="applyPayment" v-if="payState===1">
                        立即支付
                    </button>
                    <a :href="SITEURL+'/Institution/Payment/create_order/contractid/'+id"
                       :class="isAgree?'btn btn-primary btn-md':'btn btn-primary disabled btn-md'" target="_blank"
                       v-if="payState===2">立即支付</a>
                    <a :href="SITEURL+'/Institution/Payment/unionPay/contractid/'+id"
                       :class="isAgree?'btn btn-primary btn-md':'btn btn-primary disabled btn-md'" target="_blank"
                       v-if="payState===3">立即支付</a>
                    <button type="button" class="btn btn-default btn-md ml-20" @click="$router.back()">取消支付</button>
                </div>
            </div>
            <div class="blk100"></div>
        </div>

        <div class="modal fade bs-example-modal-sm" id="weixinLay">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">微信扫码支付</h4>
                    </div>
                    <div class="modal-body weixingCode">
                        <div :style="pay===1?'display: block;':'display: none;'">
                            <i class="iconfont c52c">&#xe607;</i>
                            <span class="c52c">支付成功</span>
                        </div>
                        <img src="" id="weixinImg">
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
import Qrcode from 'qrcode'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Payment',
  store,
  data () {
    return {
      id: '',
      pay: 0,
      payState: 1,
      isAgree: true,
      loading: true,
      info: {},
      payT: '',
      SITEURL: window.ajaxBaseUrl
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id
    self.$nextTick(() => {
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.getRequest('Institution/Apply/payIndex', params).then(res => {
        if (res.status === 1) {
          self.info = res.data
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          }, function (i) {
            self.layer.close(i)
            self.$router.back()
          })
        }
        self.loading = false
      })

      setTimeout(function () {
        $('#weixinLay').on('hidden.bs.modal', function () {
          clearInterval(self.payT)
        })
      }, 1000)
    })
  },
  methods: {
    applyPayment () {
      let self = this
      if (!self.isAgree) {
        self.layer.alert('必须同意申学纪服务条款')
        return false
      }
      let params = new URLSearchParams()
      params.append('orderId', self.id)
      db.getRequest('Institution/Apply/wechatPay', params).then(res => {
        if (res.status === 1) {
          Qrcode.toDataURL(res.data.code_url, {
            errorCorrectionLevel: 'H',
            width: 200
          }, function (err, url) {
            $('#weixinImg').attr('src', url)
            $('#weixinLay').modal({
              backdrop: 'static',
              show: true
            })
            self.payT = setInterval(function () {
              if (self.pay === 1) {
                clearInterval(self.payT)
                setTimeout(function () {
                  $('#weixinLay').modal('hide')
                  self.$router.push('/functions/application')
                }, 1500)
                return false
              }
              self.weixinCallback()
            }, 1000)
            if (err) {
              console.log(err)
            }
          })
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
      })
    },
    weixinCallback () {
      let self = this
      let params = new URLSearchParams()
      params.append('contractid', self.id)
      db.getRequest('Institution/Apply/ifpaySuccess', params).then(res => {
        if (res.status === 1) {
          self.pay = 1
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .text-justify {
        text-align:justify; text-align-last:justify; line-height:0; height:70px;width:80%;margin:0 auto;
        &:after {
            display:inline-block;overflow:hidden;width:100%;height:0;content:'';vertical-align:top;
        }
        & > a {
            width:200px;display:inline-block; height:70px;line-height:70px;text-align:center;text-decoration:none; text-align-last:center;border:1px solid #dedede;padding:0;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;
            &:hover {
                border-color:#428bca;background-color:transparent;
            }
            &.active {
                border-color:#428bca;background:url("../../static/images/002.png") no-repeat right bottom;
            }
        }
    }
    @media all and (-webkit-min-device-pixel-ratio:0) {
        .text-justify {
            font-size:0;
        }
    }
    .tab-content {width:80%;margin:0 auto;}
    .weixingCode {
        text-align:center;position:relative;
        & > div {
            width:200px;height:200px;background-color:rgba(255, 255, 255, .9);position:absolute;left:50%;top:50%;margin-left:-100px;margin-top:-100px;z-index:10;
            & > i {font-size:80px;margin-top:30px;}
            & > span {display:block;line-height:30px;font-size:16px;margin-top:-30px;font-weight:bold;}
        }
    }
</style>
