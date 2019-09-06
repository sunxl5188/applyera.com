<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">佣金提现</div>
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

        <div v-if="loading" v-html="LoadingImg()"></div>
        <div v-if="!loading">
            <ul class="nav nav-tabs"><!--nav-justified-->
                <li role="presentation" class="active"><a href="#Apply1" data-toggle="tab">机构申请页</a></li>
                <li role="presentation" v-if="userInfo['access']['withdraw_internal']===1"><a href="#Apply2"
                                                                                              data-toggle="tab">易申学处理页</a>
                </li>
            </ul>
            <div class="tab-content pt-30">
                <div class="tab-pane fade in active" id="Apply1">
                    <form action="" method="POST" class="form-horizontal">
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>机构名称</label>
                                        <input type="text" class="form-control" name="company_name" placeholder="请输入信息"
                                               v-model="company_name" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>操作用户</label>
                                        <input type="text" class="form-control" name="user_name" placeholder="请输入信息"
                                               v-model="user_name" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>提现金额</label>
                                        <input type="text" class="form-control" name="money" placeholder="请输入信息"
                                               v-model="money"
                                               readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>到账银行</label>
                                        <input type="text" class="form-control" name="bank_info" placeholder="请输入信息"
                                               v-model="bank_info" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>银行卡号</label>
                                        <input type="text" class="form-control" name="bank_card" placeholder="请输入信息"
                                               v-model="bank_card" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>提交时间</label>
                                        <input type="text" class="form-control" name="created_time"
                                               v-model="created_time"
                                               placeholder="请输入信息" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="tab-pane fade" id="Apply2" style="display:block;height: 0;overflow: hidden;"
                     v-if="userInfo['access']['withdraw_internal']===1">
                    <form action="" id="adminForm" method="POST" class="form-horizontal"
                          @submit.prevent="validateBeforeSubmit">
                        <input type="hidden" name="id" id="id" :value="id"/>
                        <div class="row lh34">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <b>机构名称</b>：{{company_name}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <b>操作用户</b>：{{user_name}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <b>提现金额</b>：{{money}}
                                </div>
                            </div>
                        </div>
                        <div class="row lh34 mb-15">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <b>到账银行</b>：{{bank_info}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <b>银行卡号</b>：{{bank_card}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <b>提交时间</b>：{{created_time}}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label><font class="cf00">*</font>实际支付时间</label>
                                        <input type="text" name="withdraw_time" class="form-control douTimes"
                                               placeholder="请选择时间"
                                               v-validate="'required|date_format:yyyy-MM-dd HH:mm:ss'"
                                               data-vv-as="实际支付时间"
                                               v-model="withdraw_time">
                                        <div class="validateTip" v-show="errors.has('withdraw_time')">
                                            {{ errors.first("withdraw_time") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label><font class="cf00">*</font>实际支付金额</label>
                                        <input type="text" name="real_money" class="form-control" placeholder="请输入信息"
                                               v-validate="'required|money'" data-vv-as="实际支付金额" v-model="real_money">
                                        <div class="validateTip" v-show="errors.has('real_money')">
                                            {{ errors.first("real_money") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label><font class="cf00">*</font>提现状态</label>
                                        <select name="status" class="form-control" v-validate="'required'"
                                                data-vv-as="状态"
                                                v-model.number="status">
                                            <option value="2">成功</option>
                                            <option value="3">失败</option>
                                        </select>
                                        <div class="validateTip" v-show="errors.has('status')">
                                            {{ errors.first("status") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label>备注信息</label>
                                    <textarea name="withdraw_reason" class="form-control"
                                              v-model="withdraw_reason"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="panel-group" id="myAccordion">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title clearfix">
                                        <div class="pull-left">
                                            <span><font class="cf00">*</font>付款凭证（{{withdraw_proof_path.length}}）</span>
                                            <div class="div_vm">
                                                <span id="picker">添加附件</span>
                                                <input type="hidden" name="file_id" id="file_id"
                                                       v-model="withdrawProofPath">
                                            </div>
                                        </div>
                                        <a data-toggle="collapse" data-parent="#accordion"
                                           href="#collapseOne" class="pull-right" @click="hideCollapse($event)">
                                            收起 <i class="iconfont">&#xe688;</i>
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseOne" class="panel-collapse collapse in">
                                    <div class="panel-body">
                                        <ul class="list-group dashed">
                                            <li class="list-group-item" v-for="(item,i) in withdraw_proof_path" :key="i">
                                                <div class="row">
                                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                                        <i class="iconfont">&#xe602;</i>
                                                        <span>{{item}}</span>
                                                    </div>
                                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8"
                                                         style="display: none;">
                                                        <a :href="imgUrl+'/Uploads'+item" target="_blank"
                                                           class="cded"><i
                                                                class="iconfont handPower">&#xe631;</i> 预览</a>
                                                        <a href="javascript:void(0);" class="cded"
                                                           @click="delFile(item)"><i
                                                                class="iconfont handPower ml-15">&#xe656;</i> 删除</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import store from '@/vuex/Store'
import db from '@~/js/request'
let WebUploader = require('@@/js/webuploader/webuploader')

export default {
  name: 'Apply',
  store,
  data () {
    return {
      loading: true,
      id: '',
      company_name: '',
      user_name: '',
      money: '',
      bank_info: '',
      bank_card: '',
      created_time: '',
      status: 2,
      withdraw_time: '',
      real_money: '',
      withdraw_reason: '',
      withdraw_proof_path: [],
      withdrawProofPath: '',
      imgUrl: window.ajaxBaseUrl
    }
  },
  computed: {
    token () {
      return store.state.token
    },
    userInfo () {
      return store.state.userInfo
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id
    self.$nextTick(() => {
      setTimeout(function () {
        self.laydate.render({
          elem: '.douTimes',
          type: 'datetime',
          done: function (v) {
            self.withdraw_time = v
          }
        })
        self.createUpload()
      }, 500)

      setTimeout(function () {
        $('#Apply2').removeAttr('style')
      }, 1000)

      if (self.id !== undefined) {
        self.getInfo()
        self.elementShow()
      } else {
        self.loading = false
      }
    })
  },
  methods: {
    getInfo () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.postRequest('Institution/Commission/withdrawDeal', params).then(res => {
        if (res.status === 1) {
          self.company_name = res.data.company_name
          self.user_name = res.data.user_name
          self.money = res.data.money
          self.bank_info = res.data.bank_info
          self.bank_card = res.data.bank_card
          self.created_time = res.data.created_time

          self.status = res.data.status
          self.withdraw_time = res.data.withdraw_time
          self.real_money = res.data.real_money
          self.withdraw_reason = res.data.withdraw_reason
          if (res.data.withdraw_proof_path !== '') {
            self.withdraw_proof_path = res.data.withdraw_proof_path.split(',')
            self.withdrawProofPath = res.data.withdraw_proof_path
          }
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let params = new URLSearchParams()
          let formData = $('#adminForm').serializeArray()
          formData.map(item => {
            if (item.name === 'file_id') {
              params.append('withdraw_proof_path', item.value)
            } else {
              params.append(item.name, item.value)
            }
          })
          db.postRequest('Institution/Commission/withdrawDealSave', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/admin/commapply')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    },
    hideCollapse (event) {
      if ($('#collapseOne').hasClass('in')) {
        $(event.currentTarget).html('展开<i class="iconfont">&#xe630;</i>')
      } else {
        $(event.currentTarget).html('收起<i class="iconfont">&#xe688;</i>')
      }
    },
    createUpload () {
      let self = this
      let uploader = WebUploader.create({
        auto: true, // 选完文件后，是否自动上传
        swf: 'static/js/webuploader/Uploader.swf', // '/upload/Uploader.swf', // swf文件路径
        server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne', // 文件接收服务端
        fileVal: 'file',
        pick: {
          id: '#picker',
          multiple: true, // 是否多文件上传 默认false
          label: ''
        }, // 选择文件的按钮。可选
        // 允许选择文件格式。
        accept: {
          title: 'image',
          extensions: 'gif,jpg,jpeg,bmp,png',
          mimeTypes: 'image/*'
        },
        threads: 1,
        fileNumLimit: undefined, // 限制上传个数
        fileSingleSizeLimit: 1024 * 1024 * 2, // 限制单个上传图片的大小
        formData: {func: 'withdraw'}, // 上传所需参数
        duplicate: true // 重复上传
      })

      uploader.on('uploadSuccess', function (file, res) {
        if (res.status === 1) {
          self.withdraw_proof_path.push(res.data.path)
          if (self.withdrawProofPath) {
            self.withdrawProofPath = self.withdrawProofPath + ',' + res.data.path
          } else {
            self.withdrawProofPath = res.data.path
          }
          self.elementShow()
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })

      uploader.on('error', function (error) {
        if (error === 'F_EXCEED_SIZE') {
          self.layer.alert('上传文件格式不正确！', {icon: 2})
        }
      })
    },
    delFile (file) {
      let self = this
      self.withdraw_proof_path.map((item, i) => {
        if (item === file) {
          self.withdraw_proof_path.splice(i, 1)
        }
      })
      self.withdrawProofPath = self.withdraw_proof_path.join(',')
    },
    elementShow () {
      setTimeout(function () {
        $('#collapseOne .list-group-item').mouseleave(function () {
          $(this).find('.col-xs-8').hide()
        }).mouseenter(function () {
          $(this).find('.col-xs-8').show()
        })
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
