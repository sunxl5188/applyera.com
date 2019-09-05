<template>
    <div class="container-fluid">
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group form-search">
                        <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                        <i class="iconfont handPower clearSearch" v-if="keywords" @click="keywords='';pagechange()">&#xe7f6;</i>
                        <input type="text" v-model="keywords" class="form-control"
                               placeholder="请输入学生姓名搜索"
                               style="padding-left:30px;"
                               @keyup.enter="pagechange()">
                    </div>
                    <div class="form-group ml-10">
                        <div class="dropdown">
                            <button :class="student_type || adviser ?'btn btn-primary filter':'btn btn-default filter'"
                                    type="button" data-toggle="dropdown"></button>
                            <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                <div class="pl-15 pr-15" style="width:180px;">
                                    <form action="" method="POST" class="form-horizontal">
                                        <div class="form-group">
                                            <label>学生类型</label>
                                            <select v-model="student_type" class="form-control">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="(item,i) in studentTypeArr" :key="i">
                                                    {{item.stu_type}}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>服务顾问</label>
                                            <select v-model="adviser" class="form-control">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="(item,i) in adviserArr" :key="i">{{item.name}}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="form-group text-center">
                                            <button type="reset" class="btn btn-default" @click="clearData">重置
                                            </button>
                                            <button type="button" class="btn btn-primary ml-10"
                                                    @click="pagechange()">
                                                开始筛选
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group ml-10">
                        <router-link to="/archives/student/edit" class="btn btn-default">
                            <i class="iconfont">&#xe73e;</i>
                            添加
                        </router-link>
                    </div>

                </div>

            </div>
        </div>

        <div class="row" v-masonry transition-duration="0.3s" item-selector=".masonryItem">
            <div v-masonry-tile v-for="(item, i) in list" :key="i"
                 class="masonryItem col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="clearfix lh24 pb-10">
                    <span>{{item.status_name}}</span>
                    <span>{{item.total}}</span>
                </div>
                <div class="panel panel-default" v-for="(items, k) in item.list" :key="k">
                    <div class="panel-body">
                        <div class="media-list">
                            <div class="media" :data-id="items.id">
                                <div class="media-left">
                                    <i :class="items.first_char">{{items.first_char}}</i>
                                    <img :src="items.adviser_img || 'http://placehold.it/64x64'" alt=""
                                         class="img-circle" width="20"
                                         height="20">
                                </div>
                                <div class="media-body">
                                    <div class="media-heading">
                                        <span class="pull-left" v-html="highlight(items.name,keywords)"></span>
                                        <span class="pull-right">
                                        <div class="dropdown">
                                          <button class="btn btn-default dropdown-toggle" type="button"
                                                  data-toggle="dropdown" style="padding:0 6px;color: #999;"><span
                                                  class="caret"></span></button>
                                          <ul class="dropdown-menu dropdown-menu-right">
                                            <li v-for="(sitem, n) in sign_status" :key="n"
                                                v-if="item.status_name !== sitem.status_name">
                                                <a href="#" @click="setStudentState(items.id, sitem.id)">{{sitem.status_name}}</a>
                                            </li>
                                          </ul>
                                        </div>
                                    </span>
                                    </div>
                                    <div class="media-content">
                                        <div class="lh20">{{items.intention_country}}，{{items.intention_degree}}</div>
                                        <div class="lh20">{{items.student_type}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--弹出详细层-->
        <div class="modal fade bs-example-modal-lg" id="workStudent-id">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <div class="dropdown pull-right">
                            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                                <span class="glyphicon glyphicon-option-vertical"></span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li>
                                    <a href="#" @click="viewStudentDetail(modalData.student_info.stu_id)">学生详情</a>
                                </li>
                                <li><a href="#" @click="deleteInfo(modalData.student_info.stu_id)">删除学生</a></li>
                                <li><a href="#" @click="viewAdviser(modalData.student_info.stu_id)">变更顾问</a>
                                </li>
                            </ul>
                        </div>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">

                        <div class="row">

                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 studentInfoDetail">
                                <h4>{{modalData.student_info.stu_name}} ({{modalData.student_info.stu_number}})</h4>
                                <div class="clearfix pb-15">
                                    <div class="row lh34">
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <span class="col-sm-4 control-label">当前状态</span>
                                            <div class="col-sm-8">
                                                <div class="dropdown">
                                                    <button class="btn btn-default dropdown-toggle" type="button"
                                                            data-toggle="dropdown">
                                                        {{modalData.student_info.sign_status_str}}
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li v-for="(item,i) in sign_status" :key="i"
                                                            @click="modalData.student_info.sign_status_str = item.status_name;setStudentState(modalData.student_info.stu_id, item.id)">
                                                            <a href="#">{{item.status_name}}</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <div class="form-group" style="margin-bottom:0;">
                                                <span class="col-sm-4 control-label">学生类型</span>
                                                <div class="col-sm-8">
                                                    <div class="dropdown">
                                                        <button class="btn btn-default dropdown-toggle" type="button"
                                                                data-toggle="dropdown">
                                                            {{modalData.student_info.student_type_str}}
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li v-for="(item,i) in studentTypeArr" :key="i"
                                                                @click="modalData.student_info.student_type_str=item.stu_type;setStudentType(modalData.student_info.stu_id, item.id)">
                                                                <a href="#">{{item.stu_type}}</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <div class="form-group" style="margin-bottom:0;">
                                                <span class="col-sm-4 control-label">负责顾问</span>
                                                <div class="col-sm-8">
                                                    <div class="dropdown">
                                                        <button class="btn btn-default dropdown-toggle" type="button"
                                                                data-toggle="dropdown">
                                                            <img :src="modalData.student_info.adviser_img || 'https://via.placeholder.com/20x20/FF5733/ffffff'"
                                                                 class="img-circle" width="30" height="30"/>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li v-for="(item,i) in adviserArr" :key="i" @click="adviserId=item.id"><a
                                                                    href="#">{{item.name}}</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row bdb"></div>
                                <div class="clearfix pt-15">
                                    <div class="clearfix pb-15 lh34">
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>联系微信</div>
                                            <div contenteditable="true" data-placeholder="请输入联系微信"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'stu_wechat', $event.target.innerText)"
                                                 v-text="modalData.student_info.stu_wechat"></div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>联系电话</div>
                                            <div contenteditable="true" data-placeholder="请输入联系电话"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'stu_phone', $event.target.innerText)"
                                                 v-text="modalData.student_info.stu_phone"></div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>在读学校</div>
                                            <div contenteditable="true" data-placeholder="请输入在读学校"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'reading_school', $event.target.innerText)"
                                                 v-text="modalData.student_info.reading_school"></div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>在读年级</div>
                                            <div contenteditable="true" data-placeholder="请输入在读年级"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'reading_grade', $event.target.innerText)"
                                                 v-text="modalData.student_info.reading_grade"></div>
                                        </div>
                                    </div>
                                    <div class="clearfix pb-15 lh34">
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>语言成绩</div>
                                            <div class="clearfix">
                                                <div class="pull-left w40">
                                                    <select class="selectpicker" data-width="fit" title="请选择"
                                                            style="display:inline-block;"
                                                            v-model="modalData.student_info.lang_score_type"
                                                            @change="saveData(modalData.student_info.stu_id, 'lang_score_type', modalData.student_info.lang_score_type)">
                                                        <option value="">请选择</option>
                                                        <option value="雅思">雅思</option>
                                                        <option value="托福">托福</option>
                                                        <option value="PTE">PTE</option>
                                                        <option value="无">无</option>
                                                    </select>
                                                </div>
                                                <div class="pull-right w55 text-center">
                                                    <div contenteditable="true" data-placeholder="请输入"
                                                         @focusout="saveData(modalData.student_info.stu_id, 'lang_score', $event.target.innerText)"
                                                         v-text="modalData.student_info.lang_score"></div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>学术成绩</div>
                                            <div class="clearfix">
                                                <div class="pull-left w40">
                                                    <select name="acad_score_type" class="selectpicker" title="请选择"
                                                            data-width="fit"
                                                            style="display:inline-block;"
                                                            v-model="modalData.student_info.acad_score_type"
                                                            @change="saveData(modalData.student_info.stu_id, 'acad_score_type', modalData.student_info.acad_score_type)">
                                                        <option value="">请选择</option>
                                                        <option value="GRE">GRE</option>
                                                        <option value="GMAT">GMAT</option>
                                                        <option value="SAT">SAT</option>
                                                        <option value="ACT">ACT</option>
                                                        <option value="A-Level">ALevel</option>
                                                        <option value="O-Level">OLevel</option>
                                                        <option value="GCSE">GCSE</option>
                                                        <option value="BTEC">BTEC</option>
                                                        <option value="IB">IB</option>
                                                        <option value="高考">高考</option>
                                                        <option value="无">无</option>
                                                    </select>
                                                </div>
                                                <div class="pull-right w55 text-center">
                                                    <div contenteditable="true" data-placeholder="请输入"
                                                         @focusout="saveData(modalData.student_info.stu_id, 'acad_score', $event.target.innerText)"
                                                         v-text="modalData.student_info.acad_score"></div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>当前专业</div>
                                            <div contenteditable="true" data-placeholder="请输入当前专业"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'reading_major', $event.target.innerText)"
                                                 v-text="modalData.student_info.reading_major"></div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>GPA</div>
                                            <div contenteditable="true" data-placeholder="请输入GPA"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'avg_gpa', $event.target.innerText)"
                                                 v-text="modalData.student_info.avg_gpa"></div>
                                        </div>
                                    </div>
                                    <div class="clearfix pb-15 lh34">
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>申请学位</div>
                                            <div contenteditable="true" data-placeholder="请输入申请学位"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'intention_degree', $event.target.innerText)"
                                                 v-text="modalData.student_info.intention_degree"></div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>出国时间</div>
                                            <div contenteditable="true" data-placeholder="请输入出国时间"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'abroad_time', $event.target.innerText)"
                                                 v-text="modalData.student_info.abroad_time"></div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>意向专业</div>
                                            <div contenteditable="true" data-placeholder="请输入意向专业"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'intention_major', $event.target.innerText)"
                                                 v-text="modalData.student_info.intention_major"></div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <div>意向国家</div>
                                            <div>
                                                <select class="selectpicker" title="请选择"
                                                        data-width="fit"
                                                        data-size="5"
                                                        multiple
                                                        data-live-search="true" data-dropup-auto="false"
                                                        v-model="modalData.student_info.intention_country"
                                                        @change="saveData(modalData.student_info.stu_id, 'intention_country', modalData.student_info.intention_country)">
                                                    <option :value="item.id" v-for="(item,i) in nation" :key="i">
                                                        {{item.cn}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class="col-lg-12 col-lg-12 col-lg-12 col-lg-12">
                                            <div>备注</div>
                                            <div contenteditable="true" data-placeholder="请输入备注"
                                                 @focusout="saveData(modalData.student_info.stu_id, 'remark', $event.target.innerText)"
                                                 v-text="modalData.student_info.remark"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 bdl" style="height:500px;">
                                <h4>跟进动态</h4>
                                <div class="followBody">
                                    <div class="followItem" v-for="(item,i) in modalData.follow_info" :key="i">
                                        <div class="clearfix font12 followTitle">
                                        <span class="pull-left">
                                            <img :src="item.head_img || 'https://via.placeholder.com/20x20/FF5733/ffffff'"
                                                 class="img-circle div_vm" width="30" height="30"/>
                                            <span class="div_vm">{{item.adviser_name}}</span>
                                            <a href="javascript:void(0);" class="div_vm ml-10 deleteBtn"
                                               @click="deleteFollow(item.id, modalData.student_info.id)">删除</a>
                                        </span>
                                            <span class="pull-right c999">{{item.contact_time_format}}</span>
                                        </div>
                                        <div class="clearfix pl-25 pt-5 pb-5 lh22">
                                            {{item.contact_content}}
                                        </div>
                                        <div class="clearfix pl-25 font12 c999">
                                            下次跟进时间: {{item.next_contact_time_format}}
                                        </div>
                                    </div>
                                </div>
                                <div class="row bdb"></div>
                                <form action="" method="POST" class="form-horizontal">
                                    <input type="hidden" name="student_id" id="student_id"
                                           :value="modalData.student_info.stu_id"/>
                                    <div class="form-group">
                                        <div style="margin:15px;height:100px;overflow:auto;overflow-x:hidden;"
                                             contenteditable="true" data-placeholder="请输入跟进内容，按Enter 发布"
                                             @keyup.enter="sendFollow" id="contact_content"></div>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-sm-8" id="next_contact_time" contenteditable="true"
                                             data-placeholder="下次跟进时间"></div>
                                        <div class="col-sm-4">
                                            <a href="javascript:void(0);" class="cded" @click="sendFollow">发布</a>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--转移负责人-->
        <div class="modal fade" id="principal-id">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">转移负责人</h4>
                    </div>
                    <div class="modal-body">
                        <form action="" method="POST" class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">新负责人</label>
                                <div class="col-sm-7">
                                    <select name="" class="form-control" v-model="adviserId">
                                        <option value=""> 请选择用户</option>
                                        <option :value="item.id" v-for="(item,i) in adviserArr" :key="i">{{item.name}}</option>
                                    </select>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveAdviser">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!--删除列表信息-->
        <div class="modal fade" id="delete-id">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">提示</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right">
                                <i class="iconfont font60 cf90">&#xe669;</i>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 lh24">
                                <p>学生删除会同时自动清除此学生关联的<span class="cded">联系人</span>状语从句：<span class="cded">申请资料</span>。该操作成功之后，将<span
                                        class="cded">无法恢复</span>。</p>
                                <p>如果学生已完成留学合同的支付，则无法删除该学生</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="deleteAction">确定</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import nation from '@@/json/nation.json'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'WorkProcess',
  store,
  data () {
    return {
      loading: true,
      nation: nation,
      // 筛选
      keywords: '',
      student_type: '',
      adviser: '',

      adviserArr: [],
      studentTypeArr: [],
      sign_status: [],
      list: [],
      // layer save
      studentId: '',
      adviserId: '',
      studentTypeId: '',
      modalData: {
        student_info: {
          intention_country: []
        },
        follow_info: {
          head_img: '',
          adviser_name: '',
          contact_time_format: '',
          contact_content: '',
          next_contact_time_format: ''
        }
      }
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
      // PinYin.getCamelChars("中")
      self.pagechange()

      $(document).on('click', '.media-left, .media-content, .media-heading .pull-left', function () {
        let id = $(this).parents('.media').attr('data-id')
        self.getDetail(id)
      })

      setTimeout(function () {
        self.laydate.render({
          elem: '#next_contact_time',
          type: 'datetime',
          done: (value) => {

          }
        })
      }, 1000)
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('page', p | 1)
      params.append('keywords', self.keywords)
      params.append('student_type', self.student_type)
      params.append('adviser', self.adviser)
      db.headers.token = self.token
      db.postRequest('/Institution/WorkFlow/index', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.info
          self.adviserArr = res.data.adviser
          self.studentTypeArr = res.data.student_type
          self.sign_status = res.data.sign_status
          setTimeout(function () {
            self.$redrawVueMasonry()
          }, 300)
        } else {
          console.log(res.msg)
        }
        self.current = p | 1
      })
    },
    clearData () {
      this.keywords = ''
      this.student_type = ''
      this.adviser = ''
      this.pagechange()
    },
    // 发布跟进动态
    sendFollow () {
      let self = this
      let studentId = $('#student_id').val()
      let contactContent = $('#contact_content').text()
      let nextContactTime = $('#next_contact_time').text()
      let params = new URLSearchParams()
      params.append('student_id', studentId)
      params.append('contact_content', contactContent)
      params.append('next_contact_time', nextContactTime)
      db.headers.token = self.token
      db.postRequest('/Institution/Student/stuFollowSave', params).then(res => {
        if (res.status === 1) {
          $('#contact_content').html('')
          $('#next_contact_time').html('')
          self.getDetail(studentId)
          self.layer.msg(res.msg)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 删除跟进动态
    deleteFollow (id, pid) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.headers.token = self.token
        db.getRequest('/Institution/WorkFlow/deleteFollow', params).then(res => {
          if (res.status === 1) {
            self.layer.alert(res.msg, {icon: 1}, function (i) {
              self.layer.close(i)
              self.getStudentDetail(pid)
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      })
    },
    // 保存学生信息
    saveData (id, field, value) {
      let self = this
      let params = new URLSearchParams()
      if (value === '') {
        return false
      }
      if (self.modalData[field] === value) {
        return false
      }
      params.append('stu_id', id)
      params.append(field, value)
      db.headers.token = self.token
      db.postRequest('/Institution/WorkFlow/studentSave', params).then(res => {
        console.log(res.msg)
      })
    },
    // 修改学生类型
    setStudentType (id, type) {
      let self = this
      let params = new URLSearchParams()
      params.append('student_id', id)
      params.append('student_type', type)
      db.headers.token = self.token
      db.postRequest('/Institution/WorkFlow/changeStudentType', params).then(res => {
        if (res.status === 1) {
          self.pagechange(self.current)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 修改学生状态
    setStudentState (sid, id) {
      let self = this
      let params = new URLSearchParams()
      params.append('student_id', sid)
      params.append('sign_status', id)
      db.headers.token = self.token
      db.postRequest('/Institution/WorkFlow/changeStudentStatus', params).then(res => {
        if (res.status === 1) {
          self.pagechange(self.current)
          setTimeout(function () {
            self.$redrawVueMasonry()
          }, 350)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 保存转移负责人
    saveAdviser () {
      let self = this
      let params = new URLSearchParams()
      if (self.studentId === '') {
        self.layer.alert('非法操作', {icon: 2})
        return false
      }
      if (self.adviserId === '') {
        self.layer.alert('请选择新负责人', {icon: 2})
        return false
      }
      params.append('student_id[]', self.studentId)
      params.append('adviser_id', self.adviserId)
      db.headers.token = self.token
      db.postRequest('/Institution/Student/batchChangeAdviser', params).then(res => {
        if (res.status === 1) {
          self.studentId = ''
          self.adviserId = ''
          self.pagechange(self.current)
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
            $('#principal-id').modal('hide')
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 删除学生
    deleteInfo (id) {
      let self = this
      self.studentId = id
      if (id === '') {
        self.layer.alert('非法操作', {icon: 2})
        return false
      }
      $('#workStudent-id').modal('hide')
      $('#delete-id').modal({
        backdrop: 'static',
        show: true
      })
    },
    deleteAction () {
      let self = this
      let params = new URLSearchParams()
      params.append('student_id[]', self.studentId)
      db.headers.token = self.token
      db.postRequest('/Institution/Student/batchDelStu', params).then(res => {
        if (res.status === 1) {
          self.pagechange(self.current)
          self.studentId = ''
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
            $('#delete-id').modal('hide')
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    getStudentDetail (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.headers.token = self.token
      db.getRequest('/Institution/WorkFlow/studentDetail', params).then(res => {
        if (res.status === 1) {
          self.modalData = res.data
        } else {
          console.log(res.msg)
        }
      })
    },
    // 弹出变更顾问
    viewAdviser (id) {
      this.studentId = id
      $('#workStudent-id').modal('hide')
      $('#principal-id').modal('show')
    },
    // 查看学生详情
    viewStudentDetail (id) {
      $('#workStudent-id').modal('hide')
      this.$router.push('/archives/student/edit?id=' + id)
    },
    // 弹出层详情
    getDetail (id) {
      let self = this
      if (id === '') {
        self.layer.alert('未找到ID编号', {icon: 2})
        return false
      }
      let params = new URLSearchParams()
      params.append('id', id)
      db.headers.token = self.token
      db.getRequest('/Institution/WorkFlow/studentDetail', params).then(res => {
        if (res.status === 1) {
          self.modalData = res.data
          setTimeout(function () {
            $('.selectpicker').selectpicker('refresh')
          }, 500)
          $('#workStudent-id').modal({
            backdrop: 'static',
            show: true
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .panel {
        &.panel-default {
            & .panel-body {
                & .media {
                    overflow:inherit;

                    & .media-left {
                        position:relative;

                        & > i {
                            width:50px;height:50px;display:inline-block;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;
                            text-align:center;line-height:50px;font-size:30px;font-style:normal;color:#fff;

                            &.A {background-color:#ff6815;}

                            &.B {background-color:#ff940c;}

                            &.C {background-color:#ffb500;}

                            &.D {background-color:#ffdb00;}

                            &.E {background-color:#d6cf06;}

                            &.F {background-color:#8bc43d;}

                            &.G {background-color:#00a350;}

                            &.H {background-color:#00a99d;}

                            &.I {background-color:#00aff0;}

                            &.J {background-color:#0084ce;}

                            &.K {background-color:#005fac;}

                            &.L {background-color:#bcc3c7;}

                            &.M {background-color:#6c7b87;}

                            &.N {background-color:#273f50;}

                            &.O {background-color:#1e3894;}

                            &.P {background-color:#663592;}

                            &.Q {background-color:#973290;}

                            &.R {background-color:#f93174;}

                            &.S {background-color:#fb281a;}

                            &.T {background-color:#ff6815;}

                            &.U {background-color:#ff940c;}

                            &.V {background-color:#ffb500;}

                            &.W {background-color:#ffdb00;}

                            &.X {background-color:#d6cf06;}

                            &.Y {background-color:#8bc43d;}

                            &.Z {background-color:#00a350;}
                        }

                        & > img {
                            position:absolute;left:30px;top:30px;z-index:2;
                        }
                    }

                    & .media-body {
                        overflow:visible;

                        & .media-heading {
                            &:after {content:'';display:block;width:100%;height:0;clear:both;}
                        }
                    }
                }
            }
        }
    }

    #workStudent-id {
        & .dropdown {
            margin-right:15px;

            & .btn {
                border:none;padding:0 6px;color:#666;

                &:hover, &:focus {background:#fff;}
            }
        }

        & .followBody {
            height:280px;overflow-y:auto;overflow-x:hidden;

            & .followItem {
                margin-bottom:15px;

                & .followTitle {
                    & .deleteBtn {
                        display:none;
                    }

                    &:hover {
                        & .deleteBtn {
                            display:inline-block;
                        }
                    }
                }

            }
        }
    }

</style>
<style lang="scss">
    #workStudent-id {
        & .dropdown-toggle {
            border:none;background:#fff !important;

            & .filter-option-inner-inner {
                max-width:95px;display:block;word-break:break-all; word-wrap:break-word;
            }
        }

        .pull-left {
            & .bootstrap-select {display:inline-block;margin-top:-5px;}

            & .dropdown-toggle {padding:0;}
        }
    }

</style>
