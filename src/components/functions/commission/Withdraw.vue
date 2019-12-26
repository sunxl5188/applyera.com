<template>
    <div>
        <nav class="breadcrumb-content bdb">
            <b class="pull-left font16">佣金提现</b>
            <div class="pull-right">
                <a href="javascript:void(0);" class="c666 ml-10" @click="$router.back()">
                    <i class="iconfont">&#xe64f;</i>
                    <span>返回</span>
                </a>
            </div>
        </nav>
        <div class="pad-30" v-if="loading" v-html="LoadingImg"></div>
        <div class="pad-30" v-if="!loading">
            <div style="min-width: 400px;max-width: 600px;margin:0 auto;" v-if="info.res===1">
                <form action="" method="POST" class="form-horizontal" autocomplete="off"
                      @submit.prevent="validateBeforeSubmit">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">选择预留银行</label>
                        <div class="col-sm-9">
                            <select name="bankId" class="form-control" v-model="bankId" v-validate="'required'"
                                    data-vv-as="银行卡">
                                <option value="">请选择</option>
                                <option :value="item.id" v-for="(item, i) in info.bank_list" :key="i">
                                    {{item.bank}}
                                </option>
                            </select>
                            <div class="validateTip" v-show="errors.has('bankId')">
                                {{ errors.first('bankId') }}
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">可提现金</label>
                        <div class="col-sm-9 lh34">
                            <span>￥{{info.last}}元</span>
                            <a href="javascript:void(0);" class="ml-20 cded" @click="withdrawalAll(info.last)">全部提现</a>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-3 control-label">可提金额</label>
                        <div class="col-sm-9">
                            <input type="text" name="money" class="form-control" v-model="money"
                                   v-validate="'required|money'" data-vv-as="金额"/>
                            <div class="validateTip" v-show="errors.has('money')">
                                {{ errors.first('money') }}
                            </div>
                        </div>
                    </div>
                    <div class="blk15"></div>
                    <div class="form-group">
                        <div class="col-sm-3 col-sm-offset-4">
                            <button type="submit" class="btn btn-primary btn-block">提现</button>
                        </div>
                    </div>
                </form>
                <div class="commonTitle">温馨提示</div>
                <div class="clearfix lh20 c999">
                    <p>1、提现申请成功后，资金将在三个工作日内划转到指定设置的银行卡上；</p>
                    <p>2、提现单笔限额50万元；</p>
                    <p>3、每个用户每天可免费提现5次；</p>
                    <p>4、如果转账过程中出现错误，申学纪工作人员将会主动与您取得联系。</p>
                </div>
            </div>
            <!--***************success********************-->
            <div class="withdrawal-success" v-if="info.res===2">
                <div class="text-center">
                    <i class="iconfont c52c font80">&#xe719;</i>
                    <h3 style="margin-top:0;">提交成功</h3>
                    <p class="c999">提现申请已提交，等待易申学工作人员处理。</p>
                </div>
                <div class="blk30"></div>
                <div class="text-justify mb-20">
                    <span>{{info.user_name}}<br>{{info.user_time}}</span>
                    <span>{{info.service_name}}<br>{{info.service_time}}</span>
                    <span v-html="info.expect"></span>
                </div>

                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0"
                         aria-valuemax="100"
                         style="width:50%;"></div>
                </div>

                <div class="text-justify">
                    <span>提现申请</span>
                    <span>工作人员处理</span>
                    <span>提现成功</span>
                </div>
                <div class="clearfix text-center">
                    <router-link to="/functions/commission" class="btn btn-primary">返回佣金管理看板</router-link>
                    <router-link to="/" class="btn btn-default ml-30">返回首页</router-link>
                </div>
            </div>
            <!--****************error********************-->
            <div class="withdrawal-error" v-if="info.res===3">
                <div class="text-center">
                    <i class="iconfont cf00 font80">&#xe606;</i>
                    <h3 style="margin-top:0;">提交失败</h3>
                    <p class="c999">请核对以下信息后，如有疑惑请咨询易申学工作人员（电话：0592-5093666 ）。</p>
                </div>
                <div class="blk30"></div>
                <div class="clearfix" style="display: none;">
                    <h4><b>您提交的内容有如下错误：</b></h4>
                    <div class="clearfix">
                        <i class="iconfont cfad">&#xe610;</i>
                        <span>您本日的提现次数已使用完毕，请明天再做提现操作。</span>
                    </div>
                </div>
                <div class="clearfix text-center pt-20">
                    <router-link to="/functions/commission" class="btn btn-primary">返回佣金管理看板</router-link>
                    <a href="javascript:void(0);" class="btn btn-default ml-30" @click="reSubmit(info.cid)">重新提现</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Withdraw',
  store,
  data () {
    return {
      loading: true,
      bankId: '',
      money: '',
      info: {}
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.getInfo()
    })
  },
  methods: {
    getInfo () {
      let self = this
      self.loading = true
      db.postRequest('Institution/Commission/withdrawIndex', {}).then(res => {
        if (res.status === 1) {
          self.info = res.data
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
        self.loading = false
      })
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let params = new URLSearchParams()
          params.append('money', self.money)
          params.append('bankId', self.bankId)
          db.postRequest('Institution/Commission/withdraw', params).then(res => {
            if (res.status === 1) {
              self.info.res = 2
            } else {
              self.info.res = 3
            }
          })
        }
      })
    },
    reSubmit (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('cid', id)
      db.postRequest('Institution/Commission/withdrawReset', params).then(res => {
        if (res.status === 1) {
          self.getInfo()
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
      })
    },
    withdrawalAll (num) {
      this.money = num
    }
  },
  components: {},
  watch: {}
}
</script>

<style scoped lang="scss">
    .withdrawal-success, .withdrawal-error {min-width:400px;max-width:600px;margin:0 auto;}
    .text-justify {
        text-align:justify; text-align-last:justify; line-height:0; height:44px;
        &:after {
            display:inline-block;overflow:hidden;width:100%;height:0;content:'';vertical-align:top;
        }
        & span {
            width:33%;display:inline-block; text-align:center;font-size:14px;height:25px;line-height:25px;
            text-decoration:none; text-align-last:center;
            &:first-of-type {text-align-last:left;}
            &:last-of-type {text-align-last:right;}
        }
    }
    @media all and (-webkit-min-device-pixel-ratio:0) {
        .text-justify {
            font-size:0;
        }
    }
    .progress {
        height:2px;overflow:initial;position:relative;
        &:before {content:'';width:10px;height:10px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;background:#ccc;border:1px solid #fff;position:absolute;right:0;top:50%;margin-top:-5px;z-index:1;}
        & .progress-bar {
            height:2px;position:relative;
            &:after, &:before {
                content:'';width:10px;height:10px;display:block;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;background:#337ab7;position:absolute;left:0;top:50%;margin-top:-5px;border:1px solid #fff;z-index:5;
            }
            &:before {left:auto;right:0;}
        }
    }

</style>
