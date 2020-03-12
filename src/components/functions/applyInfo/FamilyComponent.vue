<template>
  <div>
    <HeaderNav :id="id" :studentId="studentId" :educationType="educationType" :tabStatus="tabStatus"></HeaderNav>
    <div v-if="!loading">
      <form id="FamilyForm" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
        <input type="hidden" name="id" v-model="id"/>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="form-group">
              <label for="is_need_info">我要申请美国的学校</label>
              <span class="checkbox" style="display: inline-block;">
                              <input type="checkbox" name="is_need_info" id="is_need_info" data-obj="family" data-name="is_need_info" v-model="family.is_need_info"
                                     value="1">
                          </span>
            </div>
          </div>
        </div>
        <div v-if="family.is_need_info===1">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="form-group">
                <label>父母婚姻状况 <font class="cf00">*</font></label>
                <div class="radio">
                  <label>
                    <input type="radio" name="parents_marriage" data-obj="family"
                           data-name="parents_marriage" v-model.number="family.parents_marriage"
                           value="1"
                           checked> 已婚
                  </label>
                  <label>
                    <input type="radio" name="parents_marriage" data-obj="family"
                           data-name="parents_marriage" v-model.number="family.parents_marriage"
                           value="2">
                    未婚
                  </label>
                  <label>
                    <input type="radio" name="parents_marriage" data-obj="family"
                           data-name="parents_marriage" v-model.number="family.parents_marriage"
                           value="3">
                    丧偶
                  </label>
                  <label>
                    <input type="radio" name="parents_marriage" data-obj="family"
                           data-name="parents_marriage" v-model.number="family.parents_marriage"
                           value="4">
                    分居
                  </label>
                  <label>
                    <input type="radio" name="parents_marriage" data-obj="family"
                           data-name="parents_marriage" v-model.number="family.parents_marriage" value="5"> 离婚
                  </label>
                  <input type="text" name="parents_marriage_time" class="form-control" id="divorceTime"
                         placeholder="请选择时间"
                         style="display: inline-block;width: 200px; margin-left: 15px;"
                         v-if="family.parents_marriage===5"
                         v-validate="'required'" data-vv-as="离婚时间" v-model="family.parents_marriage_time">
                  <div class="validateTip" v-show="errors.has('parents_marriage_time')">
                    {{ errors.first('parents_marriage_time') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="form-group">
                <label>您的法定监护人 <font class="cf00">*</font></label>
                <div class="radio">
                  <label>
                    <input type="radio" name="guardian" v-model.number="family.guardian" value="1"
                           data-obj="family" data-name="guardian"> 父亲
                  </label>
                  <label>
                    <input type="radio" name="guardian" v-model.number="family.guardian" value="2"
                           data-obj="family" data-name="guardian"> 母亲
                  </label>
                  <label>
                    <input type="radio" name="guardian" v-model.number="family.guardian" value="3"
                           data-obj="family" data-name="guardian"> 父母双方
                  </label>
                  <label>
                    <input type="radio" name="guardian" v-model.number="family.guardian" value="4"
                           data-obj="family" data-name="guardian"> 其他
                  </label>
                  <input type="text" name="guardian_other" class="form-control"
                         placeholder="请用用英文填写与您的关系"
                         style="display: inline-block;width: 200px; margin-left: 15px;"
                         v-if="family.guardian===4"
                         v-validate="'required|en'" data-vv-as="其他关系" v-model="family.guardian_other">
                  <div class="validateTip" v-show="errors.has('guardian_other')">
                    {{ errors.first('guardian_other') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="clearfix bdb mb-15" v-if="family.guardian===1 || family.guardian===3"><h4><b>监护人（父亲）</b></h4>
          </div>
          <div class="clearfix bdb mb-15" v-if="family.guardian===4"><h4><b>监护人（其他）</b></h4></div>
          <Father ref="FatherChild" :family="family" @FatherCallBack="FatherCallBack"
                  v-if="family.guardian===1 || family.guardian===3 || family.guardian===4"></Father>

          <div class="clearfix bdb mb-15" v-if="family.guardian===2 || family.guardian===3"><h4><b>监护人（母亲）</b></h4>
          </div>
          <Mother ref="MotherChild" :family="family" @MotherCallBack="MotherCallBack"
                  v-if="family.guardian===2 || family.guardian===3"></Mother>

          <!--兄弟姐妹*************************************************-->
          <div class="row" id="brotherWrap">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="form-group">
                <label for="brother">我有直属兄弟/姐妹</label>
                <div class="checkbox" style="display: inline-block;">
                  <input type="checkbox" name="brother_is" id="brother" data-obj="family" data-name="brother_is"
                         v-model="family.brother_is"> &nbsp;
                </div>

                <!--************************************-->
                <div class="clearfix brotherList" v-for="(item, i) in family.brother_info" :key="i"
                     v-if="family.brother_is">
                  <div class="clearfix bdb mb-15">
                    <h4 style="display: inline-block;">亲属({{i+1}})</h4>
                    <a href="javascript:void(0);" class="ml-30" @click="delbrother(i)"
                       v-if="i > 0"><i class="iconfont">&#xe656;</i> 删除</a>
                  </div>
                  <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <div class="form-group">
                        <label>姓名 <font class="cf00">*</font></label>
                        <input type="text" :name="'brother_info[name]['+i+']'"
                               class="form-control" placeholder="请输入中文姓名，如：李雷"
                               v-validate="'required|zh'" data-vv-as="姓名" v-model="item.name">
                        <div class="validateTip"
                             v-show="errors.has('brother_info[name]['+i+']')">
                          {{ errors.first('brother_info[name]['+i+']') }}
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <div class="form-group">
                        <label>姓(拼音) <font class="cf00">*</font></label>
                        <input type="text" :name="'brother_info[lastName]['+i+']'"
                               class="form-control" placeholder="请输入姓的拼音，如：Li"
                               v-validate="'required|en'" data-vv-as="姓" v-model="item.lastName">
                        <div class="validateTip"
                             v-show="errors.has('brother_info[lastName]['+i+']')">
                          {{ errors.first('brother_info[lastName]['+i+']') }}
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <div class="form-group">
                        <label>名(拼音) <font class="cf00">*</font></label>
                        <input type="text" :name="'brother_info[firstName]['+i+']'"
                               class="form-control" placeholder="请输入名的拼音，如：Lei"
                               v-validate="'required|en'" data-vv-as="名" v-model="item.firstName">
                        <div class="validateTip"
                             v-show="errors.has('brother_info[firstName]['+i+']')">
                          {{ errors.first('brother_info[firstName]['+i+']') }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <div class="form-group">
                        <label>出生日期 <font class="cf00">*</font></label>
                        <input type="text" :name="'brother_info[birthday]['+i+']'" data-name="birthday"
                               class="form-control times" placeholder="请选择时间"
                               v-validate="'required'" data-vv-as="出生日期" v-model="item.birthday">
                        <div class="validateTip"
                             v-show="errors.has('brother_info[birthday]['+i+']')">
                          {{ errors.first('brother_info[birthday]['+i+']') }}
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <div class="form-group">
                        <label>他（她）是你的 <font class="cf00">*</font></label>
                        <div class="checkbox">
                          <label style="padding-left: 0;">
                            <input type="radio" :name="'brother_info[type]['+i+']'"
                                   value="1" v-model="item.type"> 哥哥
                          </label>
                          <label>
                            <input type="radio" :name="'brother_info[type]['+i+']'"
                                   value="2" v-model="item.type"> 姐姐
                          </label>
                          <label>
                            <input type="radio" :name="'brother_info[type]['+i+']'"
                                   value="3" v-model="item.type"> 弟弟
                          </label>
                          <label>
                            <input type="radio" :name="'brother_info[type]['+i+']'"
                                   value="4" v-model="item.type"> 妹妹
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <div class="form-group">
                        <label>最高学历 <font class="cf00">*</font></label>
                        <select :name="'brother_info[schoolLv]['+i+']'"
                                class="form-control selectpicker"
                                v-validate="'required'" data-vv-as="最高学历" v-model="item.schoolLv">
                          <option value="">请选择</option>
                          <option value="7">博士</option>
                          <option value="6">硕士</option>
                          <option value="5">本科</option>
                          <option value="4">大专</option>
                          <option value="3">高中</option>
                          <option value="2">中专</option>
                          <option value="1">初中</option>
                        </select>
                        <div class="validateTip"
                             v-show="errors.has('brother_info[schoolLv]['+i+']')">
                          {{ errors.first('brother_info[schoolLv]['+i+']') }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <div class="form-group">
                        <label>就读院校</label>
                        <input type="text" :name="'brother_info[schoolName]['+i+']'"
                               class="form-control" placeholder="请用英文或拼音输入院校名称"
                               v-validate="'required'" data-vv-as="就读院校" v-model="item.schoolName">
                        <div class="validateTip"
                             v-show="errors.has('brother_info[schoolName]['+i+']')">
                          {{ errors.first('brother_info[schoolName]['+i+']') }}
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <div class="form-group">
                        <label>就读期间</label>
                        <input type="text" :name="'brother_info[schoolTime]['+i+']'"
                               data-name="schoolTime"
                               class="form-control schoolTime" placeholder="请选择时间"
                               v-validate="'required'" data-vv-as="就读期间" v-model="item.schoolTime">
                        <div class="validateTip"
                             v-show="errors.has('brother_info[schoolTime]['+i+']')">
                          {{ errors.first('brother_info[schoolTime]['+i+']') }}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="clearfix text-right lh34" v-if="family.brother_is">
                  <a href="javascript:void(0);" class="cded" @click="addBrother">+继续添加直属兄弟、姐妹</a>
                </div>
                <!--************************************-->
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix text-center pt-35 pb-15">
          <button type="submit" class="btn btn-primary btn-lg" style="width: 200px;">下一页</button>
          <button type="button" class="btn btn-outline-primary btn-lg ml-20" style="width: 200px;" @click="saveCurrent">
            保存
          </button>
        </div>
      </form>
    </div>
    <div v-if="loading" v-html="LoadingImg"></div>

  </div>
</template>

<script>
import * as _ from 'lodash'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import HeaderNav from '@/components/functions/applyInfo/HeaderNav'
import Father from '@/components/functions/applyInfo/Father'
import Mother from '@/components/functions/applyInfo/Mother'
import '@~/js/VeeValidateConfig'
import db from '@~/js/request'

require('icheck')

export default {
  name: 'FamilyComponent',
  data () {
    return {
      id: '',
      loading: true,
      studentId: '',
      tabStatus: [0, 0, 0, 0],
      modify: 0, // 表单是否修改过 大于1是修改过
      result1: false,
      formChild1: [],
      result2: false,
      formChild2: [],
      educationType: 1,
      family: {
        is_need_info: 0,
        parents_marriage: 1,
        guardian: 1,
        main_guardian_name: '',
        main_guardian_last_name: '',
        main_guardian_first_name: '',
        main_guardian_alive: 1,
        main_guardian_address_not_same: false,
        main_guardian_nationality: '',
        main_guardian_birthday: '',
        main_guardian_school_level: '',
        main_guardian_leave_time: '',
        main_guardian_phone: '',
        main_guardian_email: '',
        main_guardian_school_name: '',
        main_guardian_school_time: '',
        main_guardian_work: '',
        main_guardian_work_name: '',
        main_guardian_work_position: '',

        second_guardian_name: '',
        second_guardian_last_name: '',
        second_guardian_first_name: '',
        second_guardian_nationality: '',
        second_guardian_address_not_same: false,
        second_guardian_alive: 1,
        second_guardian_birthday: '',
        second_guardian_leave_time: '',
        second_guardian_phone: '',
        second_guardian_email: '',
        second_guardian_school_level: '',
        second_guardian_school_name: '',
        second_guardian_school_time: '',
        second_guardian_work_name: '',
        second_guardian_work_position: '',
        second_guardian_work: '',
        brother_is: false,
        brother_info: [{ type: 1, schoolLv: '', birthday: '', schoolTime: '', name: '', schoolName: '', reason: '' }]
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    let self = this
    if (self.modify > 1) {
      self.layer.confirm('您将离开当前页面，是否保存已填写的内容？', { icon: 3 }, function (i) {
        self.layer.close(i)
        let formdata1 = ''
        let formdata2 = ''
        if (self.family.guardian === 1 || self.family.guardian === 3 || self.family.guardian === 4) {
          formdata1 = $('#familyChild').serializeArray()
        }
        if (self.family.guardian === 2 || self.family.guardian === 3) {
          formdata2 = $('#familyChild2').serializeArray()
        }
        setTimeout(() => {
          let formData = $('#FamilyForm').serializeArray()
          if (self.family.guardian === 3) {
            formData.push.apply(formData, formdata1)
            formData.push.apply(formData, formdata2)
          } else if (self.family.guardian === 2) {
            formData.push.apply(formData, formdata2)
          } else if (self.family.guardian === 1 || self.family.guardian === 4) {
            formData.push.apply(formData, formdata1)
          }
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('/Institution/ApplyMaterial/saveFamily', params).then(res => {
            if (res.status === 1) {
              next(true)
            } else {
              next(false)
              self.layer.alert(res.msg, { icon: 2 })
            }
          })
        }, 100)
      }, function () {
        next(true)
      })
      self.modify = 0
    } else {
      next(true)
    }
  },
  mounted: function () {
    let self = this
    self.id = self.$route.query.id || ''
    self.$nextTick(() => {
      if (self.id) {
        let self = this
        let params = new URLSearchParams()
        params.append('id', self.id)
        db.getRequest('/Institution/ApplyMaterial/editFamily', params).then(res => {
          if (res.status === 1) {
            self.tabStatus = res.data.tab_status
            self.educationType = res.data.education_type
            self.studentId = res.data.student_id
            self.family = res.data
            self.showTime()
            self.setIcheck()
            self.RefreshSelect()
          } else {
            console.log(res.msg)
          }
          self.loading = false
        })
      }
    })
  },
  methods: {
    showTime () {
      let self = this
      _.delay(() => {
        if ($('#divorceTime').length > 0) {
          self.laydate.render({
            elem: '#divorceTime',
            done (v) {
              self.family.parents_marriage_time = v
            }
          })
        }
        $('#brotherWrap .times').each(function (index, element) {
          self.laydate.render({
            elem: this,
            done (v) {
              self.family.brother_info[index][element.getAttribute('data-name')] = v
            }
          })
        })

        $('#brotherWrap .schoolTime').each(function (index, element) {
          self.laydate.render({
            elem: this,
            range: true,
            done (v) {
              self.family.brother_info[index][element.getAttribute('data-name')] = v
              element.value = v
              element.focus()
              element.blur()
            }
          })
        })
      }, 500)
    },
    // 添加兄弟姐妹
    addBrother () {
      let self = this
      self.family.brother_info.push({
        name: '',
        lastName: '',
        firstName: '',
        birthday: '',
        schoolLv: '',
        schoolName: '',
        schoolTime: '',
        type: 1
      })
      self.showTime()
      self.RefreshSelect()
    },
    // 删除兄弟姐妹
    delbrother (k) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', { icon: 3 }, function (i) {
        self.layer.close(i)
        self.family.brother_info.splice(k, 1)
      })
    },
    // 验证保存
    validateBeforeSubmit () {
      let self = this
      if (self.family.is_need_info === 1) {
        if (self.family.guardian === 1 || self.family.guardian === 3 || self.family.guardian === 4) {
          self.$refs.FatherChild.validateBeforeSubmit()
        }
        if (self.family.guardian === 2 || self.family.guardian === 3) {
          self.$refs.MotherChild.validateBeforeSubmit()
        }

        setTimeout(function () {
          let isTrue = false
          let formData = $('#FamilyForm').serializeArray()
          if (self.family.guardian === 3 && self.result1 && self.result2) {
            formData.push.apply(formData, self.formChild1)
            formData.push.apply(formData, self.formChild2)
            isTrue = true
          } else if (self.family.guardian === 2 && self.result2) {
            formData.push.apply(formData, self.formChild2)
            isTrue = true
          } else if ((self.family.guardian === 1 || self.family.guardian === 4) && self.result1) {
            formData.push.apply(formData, self.formChild1)
            isTrue = true
          } else {
            isTrue = false
          }
          self.modify = 0
          self.$validator.validateAll().then((result) => {
            if (result && isTrue) {
              let params = new URLSearchParams()
              formData.map(item => {
                params.append(item.name, item.value)
              })
              params.append('verify', 1)
              db.postRequest('/Institution/ApplyMaterial/saveFamily', params).then(res => {
                if (res.status === 1) {
                  self.$router.push('/functions/applyInfo/education?id=' + self.id)
                } else {
                  self.layer.alert(res.msg, {
                    icon: 2
                  })
                }
              })
            } else {
              self.layer.alert('信息没有填写完整', { icon: 2 })
            }
          })
        }, 100)
      } else {
        let formData = $('#FamilyForm').serializeArray()
        let params = new URLSearchParams()
        formData.map(item => {
          params.append(item.name, item.value)
        })
        self.modify = 0
        db.postRequest('/Institution/ApplyMaterial/saveFamily', params).then(res => {
          if (res.status === 1) {
            self.$router.push('/functions/applyInfo/education?id=' + self.id)
          } else {
            self.layer.alert(res.msg, {icon: 2})
          }
        })
      }
    },
    // 保存当前数据
    saveCurrent () {
      let self = this
      let formdata1 = ''
      let formdata2 = ''
      if (self.family.guardian === 1 || self.family.guardian === 3 || self.family.guardian === 4) {
        formdata1 = $('#familyChild').serializeArray()
      }
      if (self.family.guardian === 2 || self.family.guardian === 3) {
        formdata2 = $('#familyChild2').serializeArray()
      }
      setTimeout(() => {
        let formData = $('#FamilyForm').serializeArray()
        if (self.family.guardian === 3) {
          formData.push.apply(formData, formdata1)
          formData.push.apply(formData, formdata2)
        } else if (self.family.guardian === 2) {
          formData.push.apply(formData, formdata2)
        } else if (self.family.guardian === 1 || self.family.guardian === 4) {
          formData.push.apply(formData, formdata1)
        }
        let params = new URLSearchParams()
        formData.map(item => {
          params.append(item.name, item.value)
        })
        self.modify = 0
        db.postRequest('/Institution/ApplyMaterial/saveFamily', params).then(res => {
          if (res.status === 1) {
            self.layer.alert(res.msg, { icon: 1 }, function (i) {
              self.layer.close(i)
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      }, 100)
    },
    FatherCallBack (result, formData) {
      this.result1 = result
      this.formChild1 = formData
    },
    MotherCallBack (result, formData) {
      this.result2 = result
      this.formChild2 = formData
    },
    RefreshSelect () {
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh')
      }, 200)
    },
    // 设置单、多选样式
    setIcheck () {
      let self = this
      _.delay(() => {
        $('#FamilyForm [type="checkbox"]').each(function () {
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
              self.showTime()
            }
          })
        })
        $('#FamilyForm [type="radio"]').each(function () {
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
              self[obj][thisName] = parseInt(event.currentTarget.value)
              self.RefreshSelect()
              if (thisName === 'guardian') {
                self.showTime()
                self.formChild1 = []
                self.formChild2 = []
              }
              if (thisName === 'parents_marriage') {
                self.showTime()
              }
            }
          })
        })
      }, 500)
    }
  },
  components: {
    HeaderNav, Father, Mother
  },
  watch: {
    family: {
      handler: function () {
        this.modify += 1
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.form-group {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>
