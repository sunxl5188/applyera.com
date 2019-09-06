<template>
    <div>
        <form id="EducationForm" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
            <input type="hidden" name="education_type" id="education_type" value="2"/>
            <div class="clearfix lh34 mb-15 bdb"><h4><b>本科信息</b></h4></div>

            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>大学名称 <font class="cf00">*</font></label>
                        <input type="text" name="school_name" class="form-control" placeholder="请用英文输入大学名称"
                               v-validate="'required|ens'" data-vv-as="大学名称" v-model="education.school_name">
                        <div class="validateTip" v-show="errors.has('school_name')">
                            {{ errors.first("school_name") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>就读时间 <font class="cf00">*</font></label>
                        <input type="text" name="enter_time" data-name="enter_time" class="form-control times"
                               placeholder="请输入学时间"
                               v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="就读时间"
                               v-model="education.enter_time">
                        <div class="validateTip" v-show="errors.has('enter_time')">
                            {{ errors.first("enter_time") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>专业名 <font class="cf00">*</font></label>
                        <input type="text" name="major" class="form-control"
                               placeholder="请用英文输入专业名称"
                               v-validate="'required|ens'" data-vv-as="专业名" v-model="education.major">
                        <div class="validateTip" v-show="errors.has('major')">
                            {{ errors.first("major") }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>平均分 <font class="cf00">*</font></label>
                        <input type="text" name="gpa_score" class="form-control" placeholder="请输入您的绩点"
                               v-validate="'required|nb'" data-vv-as="平均分" v-model="education.gpa_score">
                        <div class="validateTip" v-show="errors.has('gpa_score')">
                            {{ errors.first("gpa_score") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>学位等级 <font class="cf00">*</font></label>
                        <select name="degree" class="form-control selectpicker" v-validate="'required'" data-vv-as="学位等级"
                                v-model="education.degree">
                            <option value="">请选择</option>
                            <option :value="item.id" v-for="(item, i) in degree" :key="i">{{item.cn}}</option>
                        </select>
                        <div class="validateTip" v-show="errors.has('degree')">
                            {{ errors.first("degree") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>总课时 </label>
                        <input type="text" name="period" class="form-control"
                               placeholder="请输入总课时" v-model="education.period">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>我不会/没有取得毕业证书 </label>
                        <div class="checkbox" style="display:inline-block;">
                            <label>
                                <input type="checkbox" name="get_degree_is" data-obj="education" data-name="get_degree_is" v-model="education.get_degree_is">&nbsp;
                            </label>
                        </div>
                        <div class="row" v-if="education.get_degree_is">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label>原因</label>
                                    <textarea name="get_degree_reason" class="form-control"
                                              placeholder="请用英文说明没有取得毕业证书的原因" v-validate="'required|ens'"
                                              data-vv-as="原因" v-model="education.get_degree_reason"></textarea>
                                    <div class="validateTip" v-show="errors.has('get_degree_reason')">
                                        {{ errors.first("get_degree_reason") }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>我有发表过文章 </label>
                        <div class="checkbox" style="display:inline-block;">
                            <label>
                                <input type="checkbox" name="is_article" data-obj="education" data-name="is_article" v-model="education.is_article"
                                       @change="showTimeC">&nbsp;
                            </label>
                        </div>
                        <div class="row" v-if="education.is_article">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>发布时间</label>
                                    <input name="article_time" class="form-control times" data-name="article_time"
                                           placeholder="请选择"
                                           v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="时间"
                                           v-model="education.article_time">
                                    <div class="validateTip" v-show="errors.has('article_time')">
                                        {{ errors.first("article_time") }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <div class="form-group">
                                    <label>文章概述 </label> <span class="c999">（75个字）</span>
                                    <input name="article_intro" class="form-control" placeholder="请用英文填写文章概述"
                                           v-validate="'required|ens|max:75'" data-vv-as="文章概述"
                                           v-model="education.article_intro">
                                    <div class="validateTip" v-show="errors.has('article_intro')">
                                        {{ errors.first("article_intro") }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>我有获得过奖学金 </label>
                        <div class="checkbox" style="display:inline-block;">
                            <label>
                                <input type="checkbox" name="is_scholarship" data-obj="education" data-name="is_scholarship" v-model="education.is_scholarship"
                                       @change="showTimeC">&nbsp;
                            </label>
                        </div>
                        <div class="clearfix" v-if="education.is_scholarship">
                            <div class="row">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label>奖学金名称</label>
                                        <input name="scholarship_name" class="form-control"
                                               placeholder="请用英文填写奖学金名称" v-validate="'required|ens'"
                                               data-vv-as="奖学金名称" v-model="education.scholarship_name">
                                        <div class="validateTip" v-show="errors.has('scholarship_name')">
                                            {{ errors.first("scholarship_name") }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label>获得时间 </label>
                                        <input name="scholarship_time" class="form-control times"
                                               data-name="scholarship_time" placeholder="请选择"
                                               v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="获得时间"
                                               v-model="education.scholarship_time">
                                        <div class="validateTip" v-show="errors.has('scholarship_time')">
                                            {{ errors.first("scholarship_time") }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label>颁发机构 </label>
                                        <input name="scholarship_from" class="form-control"
                                               placeholder="请用英文输入奖学金颁发机构名称" v-validate="'required|ens'"
                                               data-vv-as="颁发机构" v-model="education.scholarship_from">
                                        <div class="validateTip" v-show="errors.has('scholarship_from')">
                                            {{ errors.first("scholarship_from") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label>文章概述</label><span class="c999">(75个字)</span>
                                        <textarea name="scholarship_intro" class="form-control"
                                                  placeholder="请用英文简单介绍奖学金（是什么？如何获得？)"
                                                  v-validate="'required|ens|max:75'" data-vv-as="文章概述"
                                                  v-model="education.scholarship_intro"></textarea>
                                        <div class="validateTip" v-show="errors.has('scholarship_intro')">
                                            {{ errors.first("scholarship_intro") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>我曾经休学过半年以上 </label>
                        <div class="checkbox" style="display:inline-block;">
                            <label>
                                <input type="checkbox" name="is_drop" data-obj="education" data-name="is_drop" v-model="education.is_drop"
                                       @change="showTimeC">&nbsp;
                            </label>
                        </div>
                        <div class="clearfix" v-if="education.is_drop">
                            <div class="row">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label>休学原因</label>
                                        <select name="drop_reason" class="form-control selectpicker" v-validate="'required'"
                                                data-vv-as="休学原因" v-model="education.drop_reason">
                                            <option value="">请选择</option>
                                            <option value="1">旅游</option>
                                            <option value="2">工作</option>
                                            <option value="3">旅游</option>
                                            <option value="4">处理个人事务</option>
                                            <option value="5">不适用</option>
                                            <option value="6">其他</option>
                                        </select>
                                        <div class="validateTip" v-show="errors.has('drop_reason')">
                                            {{ errors.first("drop_reason") }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label>休学时长 </label>
                                        <input name="drop_period" class="form-control times" data-name="drop_period"
                                               placeholder="请选择休学时长"
                                               v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="休学时长"
                                               v-model="education.drop_period">
                                        <div class="validateTip" v-show="errors.has('drop_period')">
                                            {{ errors.first("drop_period") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label>其他概述</label><span class="c999">(75个字)</span>
                                        <textarea name="drop_describe" class="form-control" placeholder="请问英文输入休学原因"
                                                  v-validate="'required|ens|max:75'" data-vv-as="文章概述"
                                                  v-model="education.drop_describe"></textarea>
                                        <div class="validateTip" v-show="errors.has('drop_describe')">
                                            {{ errors.first("drop_describe") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>我曾有过学术违规</label>
                        <span class="checkbox" style="display: inline-block;">
                                <label>
                                    <input type="checkbox" name="is_mistake" data-obj="education" data-name="is_mistake" v-model="education.is_mistake">&nbsp;
                                </label>
                            </span>
                        <div class="clearfix" v-if="education.is_mistake">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label>请详细描写学术违规内容</label><span
                                            class="c999">(包括为何违规？是否有特定罪名？时间？后果？对您的影响？)</span>
                                        <textarea name="mistake_describe" class="form-control"
                                                  placeholder="请用英文输入学术违规原因（包括为何违规？是否有特定罪名？时间？后果？对你的影响？"
                                                  v-validate="'required|ens'" data-vv-as="违规内容"
                                                  v-model="education.mistake_describe"></textarea>
                                        <div class="validateTip" v-show="errors.has('mistake_describe')">
                                            {{ errors.first("mistake_describe") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
import career from '@@/json/career.json'
import degree from '@@/json/degree.json'
require('icheck')

export default {
  name: 'MEducationComponent',
  props: {
    education: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      career: career,
      degree: degree
    }
  },
  mounted () {
    let self = this
    self.showTimeC()
    self.RefreshSelect()
    self.setIcheck()
  },
  methods: {
    showTimeC () {
      let self = this
      setTimeout(function () {
        $('#EducationForm .times').each(function (index, element) {
          let manes = element.getAttribute('data-name').split('|')
          if (manes.length > 1) {
            self.laydate.render({
              elem: element,
              done (value1) {
                self.education[manes[0]][manes[2]][manes[1]] = value1
              }
            })
          } else {
            self.laydate.render({
              elem: element,
              done (value1) {
                self.education[element.getAttribute('name')] = value1
              }
            })
          }
        })
      }, 1500)
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        let formData = $('#EducationForm').serializeArray()
        self.$emit('EducationCallback', result, formData)
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
        $('#EducationForm [type="checkbox"]').each(function () {
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
            }
          })
        })
        $('#EducationForm [type="radio"]').each(function () {
          $(this).iCheck({
            labelHover: false,
            cursor: true,
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            increaseArea: '20%'
          })
        })
      }, 500)
    }
  }
}
</script>

<style scoped>
    .form-group {margin-left:0;margin-right:0;}
</style>
