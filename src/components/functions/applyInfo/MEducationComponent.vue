<template>
    <div>
        <form id="EducationForm" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
            <input type="hidden" name="id" v-model="id"/>
            <div class="clearfix lh34 mb-15 bdb">
                <h4>
                    <b>推荐人</b>
                    <span class="font14 c999">(建议您至少添加一位学术推荐人)</span>
                    <button type="button" class="btn btn-primary btn-sm" @click="addReCommend">新增推荐人</button>
                </h4>
            </div>
            <div class="clearfix" v-for="(item, i) in education.rcmder" :key="i">
                <input type="hidden" :name="'rcmder[id]['+i+']'" :value="item.id" />
                <div class="clearfix pt-10 pb-10 mb-10 text-right bdb" v-if="i > 0">
                    <button type="button" class="btn btn-default btn-sm" @click="delRecommend(i)">删除</button>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>推荐人姓名 <font class="cf00">*</font></label>
                            <input type="text" :name="'rcmder[name]['+i+']'" v-model="item.name" class="form-control" placeholder="请用英文输入推荐人姓名" v-validate="'required|ens'" data-vv-as="推荐人姓名">
                            <div class="validateTip" v-show="errors.has('rcmder[name]['+i+']')">
                                {{ errors.first('rcmder[name]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>推荐人职位 <font class="cf00">*</font></label>
                            <input type="text" :name="'rcmder[career]['+i+']'" v-model="item.career" class="form-control" placeholder="请用英文或拼音输入推荐人的职位名称" v-validate="'required|ens'" data-vv-as="推荐人职位">
                            <div class="validateTip" v-show="errors.has('rcmder[career]['+i+']')">
                                {{ errors.first('rcmder[career]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>推荐人称谓 <font class="cf00">*</font></label>
                            <select :name="'rcmder[title]['+i+']'" v-model="item.title" class="form-control selectpicker show-tick" v-validate="'required'" data-vv-as="推荐人称谓">
                                <option value="">请选择</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                                <option value="Mr">Mr</option>
                            </select>
                            <div class="validateTip" v-show="errors.has('rcmder[title]['+i+']')">
                                {{ errors.first('rcmder[title]['+i+']') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>与我的关系 <font class="cf00">*</font></label>
                            <input type="text" :name="'rcmder[relation]['+i+']'" v-model="item.relation" class="form-control" placeholder="请用英文或拼音输入推荐人与您的关系，如：Teacher" v-validate="'required|ens'" data-vv-as="与我的关系">
                            <div class="validateTip" v-show="errors.has('rcmder[relation]['+i+']')">
                                {{ errors.first('rcmder[relation]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>联系电话 <font class="cf00">*</font></label>
                            <input type="text" :name="'rcmder[phone]['+i+']'" v-model="item.phone" class="form-control" placeholder="请输入联系电话" v-validate="'required'" data-vv-as="联系电话">
                            <div class="validateTip" v-show="errors.has('rcmder[phone]['+i+']')">
                                {{ errors.first('rcmder[phone]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>联系邮箱</label>
                            <input type="text" :name="'rcmder[email]['+i+']'" v-model="item.email" class="form-control" placeholder="请输入联系邮箱">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>推荐人优先级
                                <i class="iconfont c999 handPower" title="若学校只要求一个推荐人，我们提交优先级靠前的推荐人" data-toggle="tooltip" data-placement="top">&#xe999;</i>
                                <font class="cf00">*</font>
                            </label>
                            <select :name="'rcmder[lv]['+i+']'" v-model="item.lv" class="form-control selectpicker show-tick" v-validate="'required'" data-vv-as="推荐人优先级">
                                <option value="">请选择</option>
                                <option value="1">第一推荐人</option>
                                <option value="2">第二推荐人</option>
                                <option value="3">第三推荐人</option>
                                <option value="4">第四推荐人</option>
                                <option value="5">第五推荐人</option>
                            </select>
                            <div class="validateTip" v-show="errors.has('rcmder[lv]['+i+']')">
                                {{ errors.first('rcmder[lv]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <div class="form-group">
                            <label>详细地址 <font class="cf00">*</font></label>
                            <div class="form-inline" id="citys">
                                <CitySelect
                                        :p="item.prov"
                                        :c="item.city"
                                        :a="item.district"
                                        :pName="'rcmder[prov]['+i+']'"
                                        :cName="'rcmder[city]['+i+']'"
                                        :aName="'rcmder[district]['+i+']'"
                                        @cityCallback="cityCallback"/>
                                <input type="hidden" :name="'ReDer[prov]['+i+']'" :value="item.prov" v-validate="'required'" data-vv-as="省" />
                                <input type="hidden" :name="'ReDer[city]['+i+']'" :value="item.city" v-validate="'required'" data-vv-as="市" />
                                <input type="hidden" :name="'ReDer[district]['+i+']'" :value="item.district" v-validate="'required'" data-vv-as="区" />
                                <input type="text" :name="'rcmder[details]['+i+']'" v-model="item.details" class="form-control" placeholder="请用英文或拼音输入推荐人地址" v-validate="'required'" data-vv-as="详细地址">
                                <div class="validateTip" v-show="errors.has('ReDer[prov]['+i+']')">
                                    {{ errors.first('ReDer[prov]['+i+']') }}
                                </div>
                                <div class="validateTip" v-show="errors.has('ReDer[city]['+i+']')">
                                    {{ errors.first('ReDer[city]['+i+']') }}
                                </div>
                                <div class="validateTip" v-show="errors.has('ReDer[district]['+i+']')">
                                    {{ errors.first('ReDer[district]['+i+']') }}
                                </div>
                                <div class="validateTip" v-show="errors.has('rcmder[details]['+i+']')">
                                    {{ errors.first('rcmder[details]['+i+']') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        <input type="text" name="enter_time" data-name="enter_time" class="form-control times2"
                               placeholder="请输入学时间"
                               v-validate="'required'" data-vv-as="就读时间"
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
                                <input type="checkbox" name="is_article" data-obj="education" data-name="is_article" v-model="education.is_article">&nbsp;
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
                                <input type="checkbox" name="is_scholarship" data-obj="education" data-name="is_scholarship" v-model="education.is_scholarship">&nbsp;
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
                                <input type="checkbox" name="is_drop" data-obj="education" data-name="is_drop" v-model="education.is_drop">&nbsp;
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
                                        <input name="drop_period" class="form-control" data-name="drop_period"
                                               placeholder="请选择休学时长"
                                               v-validate="'required'" data-vv-as="休学时长"
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
            <div class="clearfix text-center pt-35 pb-15">
                <button type="submit" class="btn btn-primary btn-lg" style="width: 200px;">下一页</button>
                <button type="button" class="btn btn-outline-primary btn-lg ml-20" style="width: 200px;" @click="saveCurrent">保存</button>
            </div>
        </form>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import CitySelect from '@#/shared/CitySelect'
import career from '@@/json/career.json'
import degree from '@@/json/degree.json'
import db from '@~/js/request'
require('icheck')

export default {
  name: 'MEducationComponent',
  props: {
    id: '',
    education: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      career: career,
      degree: degree,
      defaultRe: {
        career: '',
        title: '',
        relation: '',
        phone: '',
        email: '',
        lv: '',
        prov: '',
        details: '',
        city: '',
        district: '',
        name: ''
      }
    }
  },
  mounted () {
    let self = this
    self.showTimeC()
    self.RefreshSelect()
    self.setIcheck()
    self.$nextTick(() => {
      $(document).on('change', '#citys select', function () {
        self.ReIndex = $(this).attr('name').match(/[0-9]+/)[0]
      })
    })
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
        self.laydate.render({
          elem: '.times2',
          type: 'date',
          range: true,
          done: (value) => {
            self.education.enter_time = value
          }
        })
      }, 1500)
    },
    // 验证保存
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#EducationForm').serializeArray()
          let params = new URLSearchParams()
          for (let i = 0; i < formData.length; i++) {
            params.append(formData[i]['name'], formData[i]['value'])
          }
          params.append('verify', 1)
          db.postRequest('/Institution/ApplyMaterial/saveEducation', params).then(res => {
            if (res.status === 1) {
              self.$router.push('/functions/applyInfo/exam?id=' + self.id)
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        } else {
          self.layer.alert('数据没有填写完整', {icon: 2})
        }
      })
    },
    // 保存当前数据
    saveCurrent () {
      let self = this
      let formData = $('#EducationForm').serializeArray()
      let params = new URLSearchParams()
      for (let i = 0; i < formData.length; i++) {
        params.append(formData[i]['name'], formData[i]['value'])
      }
      db.postRequest('/Institution/ApplyMaterial/saveEducation', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
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
              self.showTimeC()
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
    },
    cityCallback (data) {
      let self = this
      setTimeout(function () {
        let i = self.ReIndex
        self.education.rcmder[i]['prov'] = data.province
        self.education.rcmder[i]['city'] = data.city
        self.education.rcmder[i]['district'] = data.area
      }, 100)
    },
    addReCommend () {
      this.education.rcmder.push(this.defaultRe)
    },
    delRecommend (i) {
      this.education.rcmder.splice(i, 1)
    }
  },
  components: {
    CitySelect
  }
}
</script>

<style scoped lang="scss">
.form-group {margin-left:0 !important;margin-right:0 !important;}
</style>
