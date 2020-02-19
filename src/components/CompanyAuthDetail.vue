<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle div_vm">提交资料</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                    申请号: X0920i23904i3209
                </div>
            </div>
        </div>
        <div v-if="isEdit">
            <form id="companyData" method="POST" class="form-horizontal pl-50 pr-50" role="form" @submit.prevent="validateBeforeSubmit">
                <div class="commonTitle">营业执照</div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 营业执照照片</label>
                    <div class="col-sm-10 form-inline">
                        <div class="clearfix c999">需年检章齐全(当年成立公司除外)<br />必须为彩色图片且小于2M，文件格式为bmp、png、jpge、jpg或gif</div>
                        <div class="clearfix">
                            <input type="hidden" name="picker1" v-model="picker1" v-validate="'required'" data-vv-as="营业执照照片" />
                            <div id="picker1" class="webuploader-btn">上传文件</div>
                        </div>
                        <div class="validateTip" v-show="errors.has('picker1')">
                            {{ errors.first('picker1') }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 营业执照注册号</label>
                    <div class="col-sm-5">
                        <input type="text" name="" class="form-control" placeholder="">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 营业期限</label>
                    <div class="col-sm-10 form-inline">
                        <input type="text" name="" class="form-control dataTime" placeholder="">
                        至
                        <input type="text" name="" class="form-control dataTime" placeholder="">
                        <div class="custom-control custom-checkbox custom-control-inline ml-15">
                            <input type="checkbox" name="" id="long" value="" class="custom-control-input">
                            <label class="custom-control-label" for="long">长期</label>
                        </div>
                        <div class="c999 clearfix pt-5">
                            证件有效期限需与上传文件上所示期限一致，若有效期限超过2100年，请选择“长期”
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 经营范围</label>
                    <div class="col-sm-10">
                        <textarea name="" class="form-control" placeholder=""></textarea>
                        <div class="clearfix c999 pt-5">
                            与企业工商营业执照上一致
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 注册地址</label>
                    <div class="col-sm-5">
                        <input type="text" name="" class="form-control"/>
                        <div class="clearfix c999 pt-5">
                            注册地址需与营业执照登记住所一致
                        </div>
                    </div>
                </div>
                <div class="commonTitle">企业法人</div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件持有人类型</label>
                    <div class="col-sm-10">
                        <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                            <option value="">请选择</option>
                            <option value="">法人</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件类型</label>
                    <div class="col-sm-10">
                        <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                            <option value="">请选择</option>
                            <option value="">身份证(限中国大陆居民)</option>
                            <option value="">护照(限境外人士)</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 身份证正面照片</label>
                    <div class="col-sm-10">
                        <div class="clearfix c999">必须为彩色图片且小于2M，文件格式为bmp、png、jpge、jpg或gif</div>
                        <div class="clearfix">
                            <input type="hidden" name="picker2" v-model="picker2" />
                            <div id="picker2" class="webuploader-btn">上传文件</div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 身份证反面照片</label>
                    <div class="col-sm-10">
                        <div class="clearfix c999">必须为彩色图片且小于2M，文件格式为bmp、png、jpge、jpg或gif</div>
                        <div class="clearfix">
                            <input type="hidden" name="picker3" v-model="picker3" />
                            <div id="picker3" class="webuploader-btn">上传文件</div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件号码</label>
                    <div class="col-sm-3">
                        <input type="text" name="" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件持有人姓名</label>
                    <div class="col-sm-3">
                        <input type="text" name="" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label"><font class="cf00">*</font> 证件有效期</label>
                    <div class="col-sm-10 form-inline">
                        <input type="text" name="" class="form-control dataTime"/>
                        至
                        <input type="text" name="" class="form-control dataTime"/>
                        <div class="custom-control custom-checkbox custom-control-inline ml-15">
                            <input type="checkbox" name="" id="Certificate" value="" class="custom-control-input">
                            <label class="custom-control-label" for="Certificate">长期</label>
                        </div>
                        <div class="c999 clearfix pt-5">
                            证件有效期限需与上传文件上所示期限一致，若有效期限超过2100年，请选择“长期”
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
        <div v-if="!isEdit" class="form-horizontal pl-50 pr-50">
            <div class="commonTitle">营业执照</div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">营业执照照片</label>
                <div class="col-sm-10 form-inline">
                    <img src="https://via.placeholder.com/100x100/FF5733/ffffff" />
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">营业执照注册号</label>
                <div class="col-sm-5 control-text">XXXXXXXX</div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">营业期限</label>
                <div class="col-sm-10 form-inline control-text">
                    <div class="c999 clearfix pt-5">
                        证件有效期限需与上传文件上所示期限一致，若有效期限超过2100年，请选择“长期”
                    </div>
                    <div class="clearfix">2020-20-20 至 2020-20-20</div>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">经营范围</label>
                <div class="col-sm-10 control-text">
                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象使用xhr请求图片,并设置返回的文件类型为Blob对象
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">注册地址</label>
                <div class="col-sm-5 control-text">
                    注册地址需与营业执照登记住所一致
                </div>
            </div>
            <div class="commonTitle">企业法人</div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">证件持有人类型</label>
                <div class="col-sm-10 control-text">
                    法人
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">证件类型</label>
                <div class="col-sm-10 control-text">
                    身份证(限中国大陆居民)
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
                <div class="col-sm-3 control-text">
                    XXXXXXXXXX
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">证件持有人姓名</label>
                <div class="col-sm-3 control-text">
                    XXXX
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">证件有效期</label>
                <div class="col-sm-10 form-inline control-text">
                    <div class="c999 clearfix pt-5">
                        证件有效期限需与上传文件上所示期限一致，若有效期限超过2100年，请选择“长期”
                    </div>
                    <div class="clearfix">2020-20-20 至 2020-20-20</div>
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
      isEdit: true,
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
        db.postRequest('', params).then(res => {
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
      self.createUpload('picker1', self.picker1)
      self.createUpload('picker2', self.picker2)
      self.createUpload('picker3', self.picker3)
      _.delay(() => {
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
        $('.selectpicker').selectpicker()
      }, 1000)
    })
  },
  methods: {
    createUpload (id, fid) {
      let self = this
      _.delay(() => {
        webupload(fid, {
          pick: {
            id: '#' + id,
            multiple: false
          },
          accept: {
            title: '',
            extensions: 'bmp,png,jpge,jpg,gif',
            mimeTypes: '*!/!*'
          },
          formData: {},
          uploadSuccess: (file, res) => { },
          uploadFinished: (msg) => {
            if (msg === '') {
              self.layer.alert('上传成功！', {icon: 1})
            } else {
              self.layer.alert(msg, {icon: 2})
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
          db.postRequest('', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1})
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
