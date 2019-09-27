<template>
    <div>
        <form id="familyChild2" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>姓名 <font class="cf00">*</font></label>
                        <input type="text" name="second_guardian_name" class="form-control"
                               placeholder="请输入中文姓名，如：李雷" v-validate="'required|zh'" data-vv-as="姓名"
                               v-model="family.second_guardian_name">
                        <div class="validateTip" v-show="errors.has('second_guardian_name')">
                            {{ errors.first("second_guardian_name") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>姓(拼音) <font class="cf00">*</font></label>
                        <input type="text" name="second_guardian_last_name" class="form-control"
                               placeholder="请输入姓的拼音，如：Li" v-validate="'required|en'" data-vv-as="姓"
                               v-model="family.second_guardian_last_name">
                        <div class="validateTip" v-show="errors.has('second_guardian_last_name')">
                            {{ errors.first("second_guardian_last_name") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>名(拼音) <font class="cf00">*</font></label>
                        <input type="text" name="second_guardian_first_name" class="form-control"
                               placeholder="请输入名的拼音，如：Lei" v-validate="'required|en'" data-vv-as="名"
                               v-model="family.second_guardian_first_name">
                        <div class="validateTip" v-show="errors.has('second_guardian_first_name')">
                            {{ errors.first("second_guardian_first_name") }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>国籍 <font class="cf00">*</font></label>
                        <select name="second_guardian_nationality" class="form-control selectpicker"
                                v-validate="'required'" data-vv-as="国籍" v-model="family.second_guardian_nationality">
                            <option value="">请选择</option>
                            <option :value="item.id" v-for="(item, i) in nation" :key="i">{{item.cn}}</option>
                        </select>
                        <div class="validateTip" v-show="errors.has('second_guardian_nationality')">
                            {{ errors.first("second_guardian_nationality") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>出生日期 <font class="cf00">*</font></label>
                        <input type="text" name="second_guardian_birthday" class="form-control times"
                               placeholder="请选择时间" v-validate="'required'" data-vv-as="日期"
                               v-model="family.second_guardian_birthday">
                        <div class="validateTip" v-show="errors.has('second_guardian_birthday')">
                            {{ errors.first("second_guardian_birthday") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>是否健在 <font class="cf00">*</font></label>
                        <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <select name="second_guardian_alive" class="form-control selectpicker"
                                        v-model.number="family.second_guardian_alive" @change="showTime">
                                    <option value="1"> 是</option>
                                    <option value="0"> 否</option>
                                </select>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-if="family.second_guardian_alive === 0">
                                <input type="text" name="second_guardian_leave_time"
                                       class="form-control times" v-validate="'required'"
                                       data-vv-as="时间" placeholder="请选择离世时间"
                                       v-model="family.second_guardian_leave_time">
                                <div class="validateTip" v-show="errors.has('second_guardian_leave_time')">
                                    {{ errors.first("second_guardian_leave_time") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="currentContact" v-if="family.second_guardian_alive === 1">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>联系电话 <font class="cf00">*</font></label>
                            <input type="text" name="second_guardian_phone" class="form-control"
                                   placeholder="请输入联系电话" v-validate="'required|mobile'" data-vv-as="电话"
                                   v-model="family.second_guardian_phone">
                            <div class="validateTip" v-show="errors.has('second_guardian_phone')">
                                {{ errors.first("second_guardian_phone") }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>邮箱 <font class="cf00">*</font></label>
                            <input type="text" name="second_guardian_email" class="form-control"
                                   placeholder="请输入邮箱" v-validate="'required|email'" data-vv-as="邮箱"
                                   v-model="family.second_guardian_email">
                            <div class="validateTip" v-show="errors.has('second_guardian_email')">
                                {{ errors.first("second_guardian_email") }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>详细地址</label>
                            <div class="checkbox" style="display: inline-block;">
                                <label>
                                    <input type="checkbox" name="second_guardian_address_not_same" data-obj="family"
                                           data-name="second_guardian_address_not_same"
                                           v-model="family.second_guardian_address_not_same"> 监护人不和我住一起
                                </label>
                            </div>
                            <div class="row form-inline" v-if="family.second_guardian_address_not_same">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 familyAddress">
                                    <CitySelect
                                            :p="family.second_guardian_address_province"
                                            :c="family.second_guardian_address_city"
                                            :a="family.second_guardian_address_area"
                                            @cityCallback="cityCallback"
                                    />
                                    <input type="hidden" name="second_guardian_address_province_code"
                                           v-model="family.second_guardian_address_province"/>
                                    <input type="hidden" name="second_guardian_address_city_code"
                                           v-model="family.second_guardian_address_city"/>
                                    <input type="hidden" name="second_guardian_address_area_code"
                                           v-model="family.second_guardian_address_area"/>

                                    <input type="text" name="second_guardian_address_detail"
                                           class="form-control"
                                           style="min-width:260px;" v-validate="'required'"
                                           data-vv-as="详细地址" placeholder="请用拼音填写详细地址"
                                           v-model="family.second_guardian_address_detail">
                                    <div class="clearfix">
                                        <div class="validateTip"
                                             v-show="errors.has('second_guardian_address_province_code')">
                                            {{ errors.first("second_guardian_address_province_code") }}
                                        </div>
                                        <div class="validateTip"
                                             v-show="errors.has('second_guardian_address_city_code')">
                                            {{ errors.first("second_guardian_address_city_code") }}
                                        </div>
                                        <div class="validateTip"
                                             v-show="errors.has('second_guardian_address_area_code')">
                                            {{ errors.first("second_guardian_address_area_code") }}
                                        </div>
                                        <div class="validateTip"
                                             v-show="errors.has('second_guardian_address_detail')">
                                            {{ errors.first("second_guardian_address_detail") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>最高学历</label>
                            <select name="second_guardian_school_level" class="form-control selectpicker"
                                    v-model="family.second_guardian_school_level">
                                <option value="">请选择</option>
                                <option value="7">博士</option>
                                <option value="6">硕士</option>
                                <option value="5">本科</option>
                                <option value="4">大专</option>
                                <option value="3">高中</option>
                                <option value="2">中专</option>
                                <option value="1">初中</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>毕业学校</label>
                            <input type="text" name="second_guardian_school_name" class="form-control"
                                   placeholder="请输入学校名称" v-model="family.second_guardian_school_name">
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>毕业时间</label>
                            <input type="text" name="second_guardian_school_time" class="form-control times"
                                   placeholder="请输入所获学位" v-model="family.second_guardian_school_time">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>工作状态</label>
                            <select name="second_guardian_work" class="form-control selectpicker"
                                    v-model="family.second_guardian_work">
                                <option value="">请选择</option>
                                <option :value="item.id" v-for="(item, i) in workState" :key="i">{{item.cn}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>工作单位</label>
                            <input type="text" name="second_guardian_work_name" class="form-control"
                                   placeholder="请输入工作单位" v-model="family.second_guardian_work_name">
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>工作职务</label>
                            <input type="text" name="second_guardian_work_position" class="form-control"
                                   placeholder="请输入工作职务" v-model="family.second_guardian_work_position">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import '@~/js/VeeValidateConfig'
import nation from '@@/json/nation'
import workState from '@@/json/workState'
import CitySelect from '@#/shared/CitySelect'
require('icheck')

export default {
  name: 'Mother',
  data () {
    return {
      nation: nation, // 国家
      workState: workState // 国家
    }
  },
  props: {
    family: {
      type: Object,
      default: () => {}
    }
  },
  computed: {},
  mounted () {
    let self = this
    self.showTime()
    self.RefreshSelect()
    self.setIcheck()
  },
  methods: {
    showTime () {
      let self = this
      setTimeout(function () {
        $('#familyChild2 .times').each(function (index, element) {
          self.laydate.render({
            elem: this,
            done (v) {
              self.family[element.name] = v
            }
          })
        })
      }, 500)
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        let formData = $('#familyChild2').serializeArray()
        self.$emit('MotherCallBack', result, formData)
      })
    },
    RefreshSelect () {
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh')
      }, 200)
    },
    // 设置单、多选样式
    setIcheck () {
      let self = this
      setTimeout(function () {
        $('#familyChild2 [type="checkbox"]').each(function () {
          $(this).iCheck({
            labelHover: false,
            cursor: true,
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            increaseArea: '20%'
          })
          $(this).on('ifChanged', function (event) {
            let obj = $(event.currentTarget).attr('data-obj')
            let thisName = $(event.currentTarget).attr('data-name')
            if (thisName !== undefined) {
              self[obj][thisName] = event.currentTarget.checked ? 1 : ''
              self.RefreshSelect()
              self.setIcheck()
            }
          })
        })
        $('#familyChild2 [type="radio"]').each(function () {
          $(this).iCheck({
            labelHover: false,
            cursor: true,
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            increaseArea: '20%'
          })
        })
      }, 500)
    },
    cityCallback (data) {
      this.family.main_guardian_address_province = data.province
      this.family.main_guardian_address_city = data.city
      this.family.main_guardian_address_area = data.area
    }
  },
  components: {
    CitySelect
  }
}
</script>

<style scoped lang="scss">
.form-group {margin-left:0 !important;margin-right:0 !important;}
.familyAddress .form-inline {display:inline-block !important;}
</style>
