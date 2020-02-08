<template>
    <div>
        <div class="modal fade bs-example-modal-lg" id="addReferrer">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">添加推荐人</h4>
                    </div>
                    <form action="" method="POST" id="ReferrerForm" class="form-horizontal" autocomplete="off"
                          @submit.prevent="saveReferrer">
                        <div class="modal-body">
                            <input type="hidden" name="id" :value="referrer.id"/>
                            <input type="hidden" name="student_id" :value="id"/>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">推荐人姓名<font
                                                class="cf00">*</font></label>
                                        <div class="col-sm-8">
                                            <input type="text" name="name" v-model="referrer.name"
                                                   class="form-control" placeholder="请用英文输入推荐人姓名"
                                                   v-validate="'required|ens'" data-vv-as="推荐人姓名">
                                            <div class="validateTip" v-show="errors.has('name')">
                                                {{ errors.first('name') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">推荐人职位<font
                                                class="cf00">*</font></label>
                                        <div class="col-sm-8">
                                            <input type="text" name="career" v-model="referrer.career"
                                                   class="form-control" placeholder="请用英文或拼音输入推荐人的职位名称"
                                                   v-validate="'required|ens'" data-vv-as="推荐人职位">
                                            <div class="validateTip" v-show="errors.has('career')">
                                                {{ errors.first('career') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">推荐人称谓<font
                                                class="cf00">*</font></label>
                                        <div class="col-sm-8">
                                            <select name="title" v-model="referrer.title"
                                                    class="form-control selectpicker show-tick"
                                                    v-validate="'required'" data-vv-as="推荐人称谓">
                                                <option value="">请选择</option>
                                                <option value="Miss">Miss</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Mr">Mr</option>
                                            </select>
                                            <div class="validateTip" v-show="errors.has('title')">
                                                {{ errors.first('title') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">与我的关系<font
                                                class="cf00">*</font></label>
                                        <div class="col-sm-8">
                                            <input type="text" name="relation" v-model="referrer.relation"
                                                   class="form-control" placeholder="请用英文或拼音输入推荐人与您的关系，如：Teacher"
                                                   v-validate="'required|ens'" data-vv-as="与我的关系">
                                            <div class="validateTip" v-show="errors.has('relation')">
                                                {{ errors.first('relation') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">联系电话</label>
                                        <div class="col-sm-8">
                                            <input type="text" name="phone" v-model="referrer.phone"
                                                   class="form-control" placeholder="请输入联系电话">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">联系邮箱</label>
                                        <div class="col-sm-8">
                                            <input type="text" name="email" v-model="referrer.email"
                                                   class="form-control" placeholder="请输入联系邮箱">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">
                                            推荐人优先级
                                            <i class="iconfont c999 handPower" title="若学校只要求一个推荐人，我们提交优先级靠前的推荐人"
                                               data-toggle="tooltip" data-placement="top">&#xe999;</i>
                                            <font class="cf00">*</font>
                                        </label>
                                        <div class="col-sm-8">
                                            <select name="lv" v-model="referrer.lv"
                                                    class="form-control selectpicker show-tick"
                                                    v-validate="'required'" data-vv-as="推荐人优先级">
                                                <option value="">请选择</option>
                                                <option value="1">第一推荐人</option>
                                                <option value="2">第二推荐人</option>
                                                <option value="3">第三推荐人</option>
                                                <option value="4">第四推荐人</option>
                                                <option value="5">第五推荐人</option>
                                            </select>
                                            <div class="validateTip" v-show="errors.has('lv')">
                                                {{ errors.first('lv') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">&nbsp;</div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">详细地址 <font
                                                class="cf00">*</font></label>
                                        <div class="col-sm-10 form-inline">
                                            <CitySelect
                                                    :p="referrer.prov"
                                                    :c="referrer.city"
                                                    :a="referrer.district"
                                                    pName="prov"
                                                    cName="city"
                                                    aName="district"
                                                    ref="city"
                                                    @cityCallback="cityCallback"/>
                                            <input type="text" name="details" v-model="referrer.details"
                                                   class="form-control" placeholder="请用英文或拼音输入推荐人地址"
                                                   v-validate="'required'" data-vv-as="详细地址">
                                            <input type="hidden" name="Cprov" :value="referrer.prov"
                                                   v-validate="'required'" data-vv-as="省"/>
                                            <input type="hidden" name="Ccity" :value="referrer.city"
                                                   v-validate="'required'" data-vv-as="市"/>
                                            <input type="hidden" name="Cdistrict" :value="referrer.district"
                                                   v-validate="'required'" data-vv-as="区"/>
                                            <div class="validateTip" v-show="errors.has('Cprov')">
                                                {{ errors.first('Cprov') }}
                                            </div>
                                            <div class="validateTip" v-show="errors.has('Ccity')">
                                                {{ errors.first('Ccity') }}
                                            </div>
                                            <div class="validateTip" v-show="errors.has('Cdistrict')">
                                                {{ errors.first('Cdistrict') }}
                                            </div>
                                            <div class="validateTip" v-show="errors.has('details')">
                                                {{ errors.first('details') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="submit" class="btn btn-primary">保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import CitySelect from '@#/shared/CitySelect'
import db from '@~/js/request'
export default {
  name: 'AddCommend',
  data () {
    return {
    }
  },
  props: {
    id: '',
    referrer: {}
  },
  mounted () {
    let self = this
    $('#addReferrer').on('shown.bs.modal', function () {
      self.$refs.city.province = self.referrer.prov
      self.$refs.city.city = self.referrer.city
      self.$refs.city.area = self.referrer.district
      self.$refs.city.init()
    })
    self.$nextTick(() => {
      $('[data-toggle="tooltip"]').tooltip()
    })
  },
  methods: {
    // 保存推荐人
    saveReferrer () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#ReferrerForm').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('/Institution/Student/rcmderEdit', params).then(res => {
            if (res.status === 1) {
              $('#addReferrer').modal('hide')
              self.$emit('referrerBack', res.data.rcmder_list)
              self.layer.alert(res.msg, { icon: 1 }, function (i) {
                self.layer.close(i)
              })
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    cityCallback (data) {
      let self = this
      self.referrer['prov'] = data.province
      self.referrer['city'] = data.city
      self.referrer['district'] = data.area
    }
  },
  components: {
    CitySelect
  }
}
</script>

<style scoped>

</style>
