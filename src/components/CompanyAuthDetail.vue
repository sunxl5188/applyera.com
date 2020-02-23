<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle div_vm">提交资料</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                    <span v-if="company.auth_status!==0">申请号: {{company.apply_no}}</span>
                </div>
            </div>
        </div>
        <div v-if="company.auth_status===0 || company.auth_status===1">
            <form id="companyData" method="POST" class="form-horizontal pl-50 pr-50" role="form" @submit.prevent="validateBeforeSubmit">
                <div class="commonTitle">营业执照</div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 营业执照照片</label>
                    <div class="col-sm-10 form-inline">
                        <div class="clearfix c999">需年检章齐全(当年成立公司除外)<br />必须为彩色图片且小于2M，文件格式为bmp、png、jpge、jpg或gif</div>
                        <div class="clearfix">
                            <div class="webUploader" id="theList1">
                                <div id="my_WU_FILE_0" class="image-item" v-if="picker1">
                                    <img :src="siteUrl + picker1">
                                </div>
                            </div>
                            <input type="hidden" name="trading_cert_path" v-model="picker1" v-validate="'required'" data-vv-as="营业执照照片" />
                            <div id="picker1" class="webuploader-btn">上传文件</div>
                        </div>
                        <div class="validateTip" v-show="errors.has('trading_cert_path')">
                            {{ errors.first('trading_cert_path') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 社会信用代码</label>
                    <div class="col-sm-5">
                        <input type="text" name="credit_code" v-model="company.credit_code" class="form-control" placeholder="请输入社会信用代码" v-validate="'required'" data-vv-as="社会信用代码">
                        <div class="validateTip" v-show="errors.has('credit_code')">
                            {{ errors.first('credit_code') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 营业期限</label>
                    <div class="col-sm-10 form-inline">
                        <div v-if="!company.trading_long_time" class="div_vm">
                            <input type="text" name="trading_start" v-model="company.trading_start" class="form-control dataTime" placeholder="请选择营业期限开始时间" v-validate="'required'" data-vv-as="营业期限开始时间">
                            至
                            <input type="text" name="trading_end" v-model="company.trading_end" class="form-control dataTime" placeholder="请选择营业期限结束时间" v-validate="'required'" data-vv-as="营业期限结束时间">
                        </div>
                        <div v-if="company.trading_long_time" class="div_vm">
                            <input type="text" name="trading_start" class="form-control" disabled placeholder="请选择营业期限开始时间" />
                            至
                            <input type="text" name="trading_end" class="form-control" disabled placeholder="请选择营业期限结束时间" />
                        </div>
                        <div class="custom-control custom-checkbox custom-control-inline ml-15">
                            <input type="checkbox" name="trading_long_time" id="long" :value=1 class="custom-control-input" v-model="company.trading_long_time">
                            <label class="custom-control-label" for="long">长期</label>
                        </div>
                        <div class="c999 clearfix pt-5">
                            证件有效期限需与上传文件上所示期限一致，若有效期限超过2100年，请选择“长期”
                        </div>
                        <div v-if="!company.trading_long_time">
                            <div class="validateTip" v-show="errors.has('trading_start')">
                                {{ errors.first('trading_start') }}
                            </div>
                            <div class="validateTip" v-show="errors.has('trading_end')">
                                {{ errors.first('trading_end') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 经营范围</label>
                    <div class="col-sm-10">
                        <textarea name="business_scope" v-model="company.business_scope" class="form-control" placeholder="" v-validate="'required'" data-vv-as="经营范围"></textarea>
                        <div class="clearfix c999 pt-5">
                            与企业工商营业执照上一致
                        </div>
                        <div class="validateTip" v-show="errors.has('business_scope')">
                            {{ errors.first('business_scope') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 注册地址</label>
                    <div class="col-sm-5">
                        <input type="text" name="reg_address" v-model="company.reg_address" class="form-control" v-validate="'required'" data-vv-as="注册地址"/>
                        <div class="clearfix c999 pt-5">
                            注册地址需与营业执照登记住所一致
                        </div>
                        <div class="validateTip" v-show="errors.has('reg_address')">
                            {{ errors.first('reg_address') }}
                        </div>
                    </div>
                </div>
                <div class="commonTitle">企业法人</div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件持有人类型</label>
                    <div class="col-sm-10">
                        <div class="clearfix">
                            <select name="cert_holder_type" v-model="company.cert_holder_type" class="form-control selectpicker show-tick" data-size="10" data-width="fit" v-validate="'required'" data-vv-as="证件持有人类型">
                                <option value="">请选择</option>
                                <option :value=1>法人</option>
                            </select>
                        </div>
                        <div class="validateTip" v-show="errors.has('cert_holder_type')">
                            {{ errors.first('cert_holder_type') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件类型</label>
                    <div class="col-sm-10">
                        <div class="clearfix">
                            <select name="cert_type" v-model="company.cert_type" class="form-control selectpicker show-tick" data-size="10" data-width="fit" v-validate="'required'" data-vv-as="证件类型">
                                <option value="">请选择</option>
                                <option :value=1>身份证(限中国大陆居民)</option>
                                <option :value=2>护照(限境外人士)</option>
                            </select>
                        </div>
                        <div class="validateTip" v-show="errors.has('cert_type')">
                            {{ errors.first('cert_type') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 身份证正面照片</label>
                    <div class="col-sm-10">
                        <div class="clearfix c999">必须为彩色图片且小于2M，文件格式为bmp、png、jpge、jpg或gif</div>
                        <div class="clearfix">
                            <div class="webUploader" id="theList2">
                                <div id="my_WU_FILE_2" class="image-item" v-if="picker2">
                                    <img :src="siteUrl + picker2">
                                </div>
                            </div>
                            <input type="hidden" name="cert_front_path" v-model="picker2" v-validate="'required'" data-vv-as="身份证正面照片" />
                            <div id="picker2" class="webuploader-btn">上传文件</div>
                        </div>
                        <div class="validateTip" v-show="errors.has('cert_front_path')">
                            {{ errors.first('cert_front_path') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 身份证反面照片</label>
                    <div class="col-sm-10">
                        <div class="clearfix c999">必须为彩色图片且小于2M，文件格式为bmp、png、jpge、jpg或gif</div>
                        <div class="clearfix">
                            <div class="webUploader" id="theList3">
                                <div id="my_WU_FILE_3" class="image-item" v-if="picker3">
                                    <img :src="siteUrl + picker3">
                                </div>
                            </div>
                            <input type="hidden" name="cert_back_path" v-model="picker3" v-validate="'required'" data-vv-as="身份证反面照片" />
                            <div id="picker3" class="webuploader-btn">上传文件</div>
                        </div>
                        <div class="validateTip" v-show="errors.has('cert_back_path')">
                            {{ errors.first('cert_back_path') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件号码</label>
                    <div class="col-sm-3">
                        <input type="text" name="cert_no" v-model="company.cert_no" class="form-control" v-validate="'required|idCard'" data-vv-as="证件号码"/>
                        <div class="validateTip" v-show="errors.has('cert_no')">
                            {{ errors.first('cert_no') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件持有人姓名</label>
                    <div class="col-sm-3">
                        <input type="text" name="cert_holder_name" v-model="company.cert_holder_name" class="form-control" v-validate="'required'" data-vv-as="证件持有人姓名"/>
                        <div class="validateTip" v-show="errors.has('cert_holder_name')">
                            {{ errors.first('cert_holder_name') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件有效期</label>
                    <div class="col-sm-10 form-inline">
                        <div v-if="!company.cert_long_time" class="div_vm">
                            <input type="text" name="cert_start" v-model="company.cert_start" class="form-control dataTime" placeholder="请选择证件有效期开始时间" v-validate="'required'" data-vv-as="证件有效期开始时间"/>
                            至
                            <input type="text" name="cert_end" v-model="company.cert_end" class="form-control dataTime" placeholder="请选择证件有效期结束时间" v-validate="'required'" data-vv-as="证件有效期结束时间"/>
                        </div>
                        <div v-if="company.cert_long_time" class="div_vm">
                            <input type="text" name="cert_start" class="form-control" disabled placeholder="请选择证件有效期开始时间"/>
                            至
                            <input type="text" name="cert_end" class="form-control" disabled placeholder="请选择证件有效期结束时间"/>
                        </div>
                        <div class="custom-control custom-checkbox custom-control-inline ml-15">
                            <input type="checkbox" name="cert_long_time" id="Certificate" :value=1 class="custom-control-input" v-model="company.cert_long_time">
                            <label class="custom-control-label" for="Certificate">长期</label>
                        </div>
                        <div class="c999 clearfix pt-5">
                            证件有效期限需与上传文件上所示期限一致，若有效期限超过2100年，请选择“长期”
                        </div>
                        <div v-if="!company.cert_long_time">
                            <div class="validateTip" v-show="errors.has('cert_start')">
                                {{ errors.first('cert_start') }}
                            </div>
                            <div class="validateTip" v-show="errors.has('cert_end')">
                                {{ errors.first('cert_end') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8 col-sm-offset-4">
                        <button type="submit" class="btn btn-primary">保存并提交</button>
                    </div>
                </div>
            </form>
        </div>
        <!--查看详情-->
        <div v-if="company.auth_status===2 || company.auth_status===3" class="form-horizontal pl-50 pr-50">
            <div class="commonTitle">营业执照</div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">营业执照照片</label>
                <div class="col-sm-10 form-inline">
                    <span class="div_vm bda"><img :src="siteUrl + company.trading_cert_path" width="100" height="100" /></span>
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
                    <span class="font20">保密</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">身份证反面照片</label>
                <div class="col-sm-10 control-text">
                    <span class="font20">保密</span>
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
        </div>
    </div>
</template>

<script>
import * as _ from 'lodash'
import '@~/js/VeeValidateConfig'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import db from '@~/js/request'
import webupload from '@~/js/webupload'

export default {
  name: 'CompanyAuthDetail',
  data () {
    return {
      loading: true,
      siteUrl: window.ajaxBaseUrl,
      modify: 0,
      company: {},
      picker1: [],
      picker2: [],
      picker3: []
    }
  },
  beforeRouteLeave (to, from, next) {
    let self = this
    if (self.modify > 1) {
      self.layer.confirm('您将离开当前页面，是否保存已填写的内容？', {icon: 3}, function (i) {
        self.layer.close(i)
        let formData = $('#companyData').serializeArray()
        let params = new URLSearchParams()
        formData.map(item => {
          params.append(item.name, item.value)
        })
        params.append('audit_status', 1)
        db.postRequest('/Institution/Company/authSave', params).then(res => {
          if (res.status === 1) {
            next(true)
          } else {
            next(false)
            self.layer.alert(res.msg, {icon: 2})
          }
        })
      }, function () {
        next(true)
      })
      self.modify = 0
    } else {
      next(true)
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
          self.picker1 = [res.data.trading_cert_path]
          self.picker2 = [res.data.cert_front_path]
          self.picker3 = [res.data.cert_back_path]
          self.$nextTick(() => {
            self.loading = false
          })
          _.delay(() => {
            self.createUpload('picker1', self.picker1)
            self.createUpload('picker2', self.picker2)
            self.createUpload('picker3', self.picker3)
            $('.dataTime').each(function (index, element) {
              self.laydate.render({
                elem: element,
                type: 'date',
                done: (value) => {
                  element.value = value
                  element.focus()
                  element.blur()
                }
              })
            })
            $('.selectpicker').selectpicker('refresh')
          }, 500)
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    createUpload (id, fid) {
      let self = this
      _.delay(() => {
        webupload({
          assign: fid,
          pick: {
            id: '#' + id,
            multiple: false
          },
          accept: {
            title: '',
            extensions: 'bmp,png,jpge,jpg,gif',
            mimeTypes: 'image/*'
          },
          formData: {func: 'auth'},
          uploadSuccess: (file, res) => {
            if (res.status === 1) {
              fid.splice(0, 1, res.data)
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          },
          error: (e) => {
            if (e === 'Q_TYPE_DENIED') {
              self.layer.alert('文件类型不正确！', { icon: 2 })
            }
            if (e === 'F_EXCEED_SIZE') {
              self.layer.alert('文件大小超过2MB限制！', { icon: 2 })
            }
          }
        })
      }, 1000)
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#companyData').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          params.append('audit_status', 2)
          db.postRequest('/Institution/Company/authSave', params).then(res => {
            if (res.status === 1) {
              self.modify = 0
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/home/company/authentic')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    }
  },
  watch: {
    company: {
      handler: function () {
        this.modify += 1
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
