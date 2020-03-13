<template>
    <div class="container-fluid bgWhite pt-25 pb-25">

        <div :class="{hidden:name!=='student_seas'}">
            <div class="po_re">
                <div id="filePicker" style="position: absolute;left: -999px;z-index: 1;"></div>
            </div>
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">学生公海</div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" v-if="keywords" @click="keywords=''">&#xe7f6;</i>
                            <input type="text" v-model="keywords" class="form-control"
                                   placeholder="请输入学生名字搜索"
                                   style="padding-left:30px;">
                        </div>
                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default" @click="filterShow=!filterShow">
                                <span v-if="!filterShow">收起筛选</span>
                                <span v-if="filterShow">展开筛选</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div class="pl-15 pr-15 pt-15 bda filterList"
                 :style="filterShow?'height:0;padding:0;overflow:hidden;':'height:175px;'">
                <div class="student_seas_filter">
                    <div class="student_seas_filter_left">
                        学生类型：
                    </div>
                    <div class="student_seas_filter_right">
                        <a href="javascript:void(0);" :class="{active:student_type===''}"
                           @click="student_type='';pagechange()">全部</a>
                        <a href="javascript:void(0);" :class="{active:student_type===item.id}"
                           v-for="(item,i) in studentTypeArr.type" :key="i"
                           @click="student_type=item.id;pagechange()">{{item.stu_type}}</a>
                    </div>
                </div>
                <div class="student_seas_filter">
                    <div class="student_seas_filter_left">
                        前负责人：
                    </div>
                    <div class="student_seas_filter_right" style="padding: 0;">
                        <div class="col-sm-3">
                            <select class="form-control selectpicker" v-model="adviser" data-live-search="true"
                                    @change="pagechange()">
                                <option value="">请选择负责人</option>
                                <option :value="item.id" v-for="(item,i) in adviserArr" :key="i">{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="student_seas_filter">
                    <div class="student_seas_filter_left">
                        创建时间：
                    </div>
                    <div class="student_seas_filter_right">
                        <a href="javascript:void(0);" :class="{active:type===1 && end_time === ''}"
                           @click="setFilter(1)">不限</a>
                        <a href="javascript:void(0);" :class="{active:type===2 && end_time === ''}"
                           @click="setFilter(2)">本周</a>
                        <a href="javascript:void(0);" :class="{active:type===3 && end_time === ''}"
                           @click="setFilter(3)">本月</a>
                        <a href="javascript:void(0);" :class="{active:type===4 && end_time === ''}"
                           @click="setFilter(4)">本季</a>
                        <div id="times" contenteditable="true" data-placeholder="自定义时间段"
                            :class="{active:type==='' && end_time !== ''}"></div>
                    </div>
                </div>
            </div>

            <div class="clearfix pt-25 pb-25">
                <div class="pull-left lh34">共 <span class="cded">{{total}}</span>名学生</div>
                <div class="pull-right">
                    <button type="button" class="btn btn-default ml-10" @click="receive()">领取</button>
                    <div class="dropdown ml-10" style="display: inline-block;">
                        <button class="btn btn-default dropdown-toggle" type="button"
                                data-toggle="dropdown">操作
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><a href="#" @click="editStudent">编辑学生</a></li>
                            <li><a href="#" @click="consultant">分配顾问</a></li>
                        </ul>
                    </div>
                    <button type="button" class="btn btn-default ml-10" @click="deleteInfo">删除</button>
                    <div class="dropdown ml-10" style="display: inline-block;">
                        <button class="btn btn-default dropdown-toggle" type="button"
                                data-toggle="dropdown">添加
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li>
                                <router-link to="/archives/student_seas/edit?isCommon=1">新建学生</router-link>
                            </li>
                            <li><a href="javascript:void(0);" @click="uploadStart">模板导入</a></li>
                            <li><a :href="siteUrl+'/Public/xls_temp/students_import.xlsx'"
                                   download="Student_profile.xlsx" target="_blank">下载模板</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div v-if="alert.state > 0">
                <div :class="alert.state===1?'alert alert-info':(alert.state===2?'alert alert-success':'alert alert-danger')">
                    {{alert.msg}}
                </div>
            </div>

            <table class="table table-customize">
                <thead>
                <tr>
                    <th width="5%"></th>
                    <th width="15%">学生姓名</th>
                    <th width="10%">学生类型</th>
                    <th width="12%">前负责人</th>
                    <th width="15%">创建时间
                        <a href="javascript:void(0);"
                           :class="sort_by_time===0?'iconfont sort':(sort_by_time===1?'iconfont sort up':'iconfont sort down')"
                           @click="listSort"></a>
                    </th>
                    <th>跟进动态</th>
                    <th width="5%"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,i) in list" :key="i">
                    <td><input type="checkbox" name="id[]" :value="item.id" @click="setActiveId($event, item.id)"/></td>
                    <td>
                        <router-link :to="{path:'/archives/student_seas/edit',query:{id:item.id,isCommon:1}}" class="cded" v-html="highlight(item.name, keywords)"></router-link>
                    </td>
                    <td>{{item.student_type}}</td>
                    <td>{{item.operator_name}}</td>
                    <td>{{item.create_time}}</td>
                    <td class="showMore">
                        <span v-for="(items,k) in item.follows" :key="k" v-html="items.contact_content" v-if="k===0"></span>
                        <button type="button" class="btn btn-primary" @click="viewFollow(item.follows);sid=item.id">查看全部
                        </button>
                    </td>
                    <td class="text-center">
                        <div class="dropdown">
                            <a href="javascript:void(0);" data-toggle="dropdown"><i
                                    class="iconfont">&#xe66b;</i></a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li>
                                    <router-link :to="{path:'/archives/student_seas/edit',query:{id:item.id,isCommon:1}}">查看
                                    </router-link>
                                </li>
                                <li><a href="javascript:void(0);" @click="activeId=[item.id];deleteInfo()">删除</a>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr v-if="loading">
                    <td colspan="7" v-html="LoadingImg"></td>
                </tr>
                <tr v-if="!loading && list.length === 0">
                    <td colspan="7" v-html="NoData"></td>
                </tr>
                </tbody>
            </table>
            <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
        </div>

        <router-view></router-view>

        <!--查看跟进状态-->
        <div class="modal fade" id="recording-id">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">跟进动态</h4>
                    </div>
                    <div class="modal-body">
                        <div class="recordingBody">
                            <div class="recordingContent">
                                <div class="media" v-for="(item,i) in followObj" :key="i">
                                    <a class="media-left" href="javascript:void(0);">
                                        <img :src="item.head_img || '/manage/static/images/defaultface.png'"
                                             style="width:50px; height:50px;" class="img-circle">
                                    </a>
                                    <div class="media-body">
                                        <div class="clearfix media-heading">
                                            <span class="pull-left">
                                                <span class="div_vm">{{item.adviser_name}}</span>
                                                <a href="javascript:void(0);"
                                                   class="div_vm ml-10 hidden deleteBtn">删除</a>
                                            </span>
                                            <span class="pull-right c999">{{item.contact_time}}</span>
                                        </div>
                                        <div class="clearfix lh22">
                                            {{item.contact_content}}
                                        </div>
                                        <div class="clearfix font12 c999" v-if="item.next_contact_time">
                                            下次跟进时间: {{item.next_contact_time}}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="row bdb"></div>
                            <div class="clearfix pt-10">
                                <textarea name="reContent" class="form-control"
                                          placeholder="请输入跟进内容，按Enter 发布" style="border:none;" v-model="followContent"
                                          @keyup.enter="sendFollow"></textarea>
                            </div>
                            <div class="clearfix pt-10">
                                <div class="row">
                                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                        <input type="text" name="times" class="form-control" id="times1"
                                               v-model="followTime" style="border:none;" placeholder="下次跟进时间"/>
                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center lh34">
                                        <a href="javascript:void(0);" @click="sendFollow">发布</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--编辑学生-->
        <div class="modal fade" id="editStudent-id">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">编辑学生</h4>
                    </div>
                    <div class="modal-body">
                        <form action="" method="POST" class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">选择字段</label>
                                <div class="col-sm-7">
                                    <select name="" class="form-control selectpicker show-tick">
                                        <option value=""> 学生类型</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">批量修改为</label>
                                <div class="col-sm-7">
                                    <select name="" class="form-control selectpicker show-tick" v-model="studentType">
                                        <option value="">请选择</option>
                                        <option :value="item.id" v-for="(item,i) in studentTypeArr.type" :key="i">{{item.stu_type}}
                                        </option>
                                    </select>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveStudent">确定</button>
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
                                    <select name="" class="form-control selectpicker show-tick" data-size="10" data-live-search="true" v-model="adviserId">
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

    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import * as _ from 'lodash'
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import db from '@~/js/request'
let WebUploader = require('@@/js/webuploader/webuploader')

export default {
  name: 'Index',
  store,
  data () {
    return {
      loading: true,
      name: 'student_seas',
      sid: '',
      siteUrl: window.ajaxBaseUrl,
      activeId: [],
      keywords: '',
      student_type: '',
      adviser: '',
      type: 1,
      start_time: '',
      end_time: '',
      sort_by_time: 0,
      studentTypeArr: [],
      adviserArr: [],
      filterShow: false,
      current: 1,
      total: 0,
      list: [],
      followObj: {},
      followContent: '',
      followTime: '',
      studentType: '',
      adviserId: '',
      alert: {state: 0, msg: ''}
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  created () {
    this.debouncePagechange = _.debounce(this.pagechange, 1000)
  },
  mounted () {
    let self = this
    self.name = self.$route.name

    self.$nextTick(() => {
      self.laydate.render({
        elem: '#times',
        type: 'date',
        range: true,
        done: (value) => {
          let date = value.split(' - ')
          self.start_time = date[0]
          self.end_time = date[1]
          self.type = ''
          self.pagechange()
        }
      })
      self.laydate.render({
        elem: '#times1',
        type: 'datetime',
        done: (value) => {
          self.followTime = value
        }
      })
      self.pagechange()

      setTimeout(function () {
        self.createUpload()

        $('#recording-id').on('hidden.bs.modal', function () {
          self.followObj = {}
          self.sid = ''
        })
      }, 1000)
    })
  },
  methods: {
    setFilter (i) {
      let self = this
      self.type = i
      self.start_time = ''
      self.end_time = ''
      self.debouncePagechange()
    },
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      self.loading = true
      params.append('page', p || 1)
      params.append('keywords', self.keywords)
      params.append('student_type', self.student_type)
      params.append('adviser', self.adviser)
      params.append('type', self.type)
      params.append('start_time', self.start_time)
      params.append('end_time', self.end_time)
      params.append('sort_by_time', self.sort_by_time)
      db.postRequest('Institution/Student/CommonStudentList', params).then(res => {
        if (res.status === 1) {
          self.total = res.data.total
          self.list = res.data.list
          self.studentTypeArr = res.data.student_type
          self.adviserArr = res.data.service_adviser
        } else {
          console.log(res.msg)
        }
        self.current = p || 1
        self.loading = false
        self.reSelect()
      })
    },
    listSort () {
      let self = this
      if (self.sort_by_time === 0) {
        self.sort_by_time = 1
      } else if (self.sort_by_time === 1) {
        self.sort_by_time = 2
      } else if (self.sort_by_time === 2) {
        self.sort_by_time = 1
      }
      self.pagechange()
    },
    // 删除列表信息
    deleteInfo () {
      let self = this
      if (self.activeId.length === 0) {
        self.layer.alert('请选择需要操作的学生', {icon: 2})
        return false
      }
      self.layer.confirm('学生被删除后数据将无法恢复，您确定要删除该学生吗？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        self.deleteAction()
      })
    },
    deleteAction () {
      let self = this
      let params = new URLSearchParams()
      self.activeId.map(item => {
        params.append('student_id[]', item)
      })
      db.postRequest('/Institution/Student/batchDelStu', params).then(res => {
        if (res.status === 1) {
          self.pagechange(self.current)
          self.cancelCheck()
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
    editStudent () {
      let self = this
      if (self.activeId.length === 0) {
        self.layer.alert('请选择需要操作的学生', {icon: 2})
        return false
      }
      $('#editStudent-id').modal({
        backdrop: 'static',
        show: true
      })
    },
    consultant () {
      let self = this
      if (self.activeId.length === 0) {
        self.layer.alert('请选择需要操作的学生', {icon: 2})
        return false
      }
      $('#principal-id').modal({
        backdrop: 'static',
        show: true
      })
    },
    // 设置选中ID
    setActiveId (event, id) {
      let self = this
      if (event.currentTarget.checked) {
        self.activeId.push(id)
      } else {
        self.activeId.map((item, i) => {
          if (item === id) {
            self.activeId.splice(i, 1)
          }
        })
      }
    },
    createUpload () {
      let self = this
      let uploader = WebUploader.create({
        auto: true,
        swf: 'static/js/webuploader/Uploader.swf',
        server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne',
        fileVal: 'file',
        pick: {
          id: '#filePicker',
          multiple: false
        },
        file_id: 'file_id',
        fileSingleSizeLimit: 1024 * 1024 * 20,
        duplicate: true,
        accept: {
          title: '',
          extensions: 'xlsx,xls',
          mimeTypes: '*/*'
        },
        formData: {func: 'student_import', is_common: 1}
      })
      uploader.on('uploadStart', function (e) {
        self.alert = {
          state: 1,
          msg: '数据正在导入中..., 请稍后!'
        }
      })
      uploader.on('uploadSuccess', function (file, res) {
        if (res.status === 1) {
          self.alert = {
            state: 2,
            msg: '数据导入成功！'
          }
        } else {
          self.alert = {
            state: 3,
            msg: res.msg
          }
        }

        setTimeout(function () {
          self.alert = {
            state: 0,
            msg: ''
          }
        }, 3000)
        self.pagechange(1)
      })

      uploader.on('error', function (handler) {
        if (handler === 'Q_TYPE_DENIED') {
          self.alert = {
            state: 3,
            msg: '文件类型不正确！'
          }
          setTimeout(function () {
            self.alert = {
              state: 0,
              msg: ''
            }
          }, 3000)
        }
      })
    },
    uploadStart () {
      $('#filePicker .webuploader-element-invisible').click()
    },
    sendFollow () {
      let self = this
      let params = new URLSearchParams()
      params.append('student_id', self.sid)
      params.append('contact_content', self.followContent)
      params.append('next_contact_time', self.followTime)
      if (self.followContent === '') {
        self.layer.alert('请输入跟进内容！', {icon: 2})
        return false
      }
      db.postRequest('/Institution/Student/stuFollowSave', params).then(res => {
        if (res.status === 1) {
          self.layer.msg(res.msg)
          self.pagechange(self.current)
          self.followContent = ''
          self.followTime = ''
          setTimeout(function () {
            self.list.map(item => {
              if (item.id === self.sid) {
                self.followObj = item.follows
              }
            })
          }, 1000)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 保存编辑学生状态
    saveStudent () {
      let self = this
      let params = new URLSearchParams()
      if (self.studentType === '') {
        self.layer.alert('请选择状态', {icon: 2})
        return false
      }
      self.activeId.map(item => {
        params.append('student_id[]', item)
      })
      params.append('student_type', self.studentType)
      params.append('field', 'type')
      db.postRequest('/Institution/Student/batchChangeType', params).then(res => {
        if (res.status === 1) {
          self.studentType = ''
          self.pagechange(self.current)
          self.cancelCheck()
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
            $('#editStudent-id').modal('hide')
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 清除选中ID与checked
    cancelCheck () {
      let self = this
      setTimeout(function () {
        self.activeId = []
        $('.table-customize [type="checkbox"]:checked').each(function () {
          $(this)[0].checked = false
        })
      }, 500)
    },
    // 保存转移负责人
    saveAdviser () {
      let self = this
      let params = new URLSearchParams()
      if (self.adviserId === '') {
        self.layer.alert('请选择新负责人', {icon: 2})
        return false
      }
      self.activeId.map(item => {
        params.append('student_id[]', item)
      })
      params.append('adviser_id', self.adviserId)
      db.postRequest('/Institution/Student/batchChangeAdviser', params).then(res => {
        if (res.status === 1) {
          self.adviserId = ''
          self.pagechange(self.current)
          self.cancelCheck()
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
    // 查看跟进状态
    viewFollow (obj) {
      this.followObj = obj
      $('#recording-id').modal({
        backdrop: 'static',
        show: true
      })
    },
    // 领取
    receive () {
      let self = this
      if (self.activeId.length === 0) {
        self.layer.alert('请选择要领取的学生编号', {icon: 2})
        return false
      }
      let params = new URLSearchParams()
      self.activeId.map(item => {
        params.append('student_id[]', item)
      })
      db.postRequest('/Institution/Student/getStudent', params).then(res => {
        if (res.status === 1) {
          self.pagechange(self.current)
          self.cancelCheck()
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
    reSelect () {
      _.delay(() => {
        $('.selectpicker').selectpicker('refresh')
      }, 1000)
    }
  },
  components: {
    'v-pagination': pagination
  },
  watch: {
    keywords () {
      this.debouncePagechange()
    },
    $route (to, from) {
      this.name = to.name
      if (this.name === 'student_seas') {
        this.pagechange(this.current)
      }
    }
  }
}
</script>

<style scoped lang="less">
    .filterList {
        -webkit-transition:all .3s ease 0s;-moz-transition:all .3s ease 0s;-ms-transition:all .3s ease 0s;transition:all .3s ease 0s;

        & .student_seas_filter {
            margin-bottom:15px;

            &:after {content:'';width:100%;height:0;display:block;clear:both;}

            & .student_seas_filter_left {
                float:left;width:10%;text-align:right;padding-right:10px;line-height:34px;
            }

            & .student_seas_filter_right {
                float:right;width:90%;padding:5px 0;

                & > a, & > div {
                    display:inline-block;margin-right:10px;padding:0 8px;line-height:24px;

                    &.active {
                        background-color:#39f;color:#fff;
                    }
                }
            }
        }
    }

    .showMore {
        position:relative;word-break:break-all; word-wrap:break-word;

        & .btn {
            display:none;position:absolute;left:50%;top:50%;margin-top:-17px;margin-left:-41px;
        }

        &:hover {
            & .btn {display:inline-block;}
        }
    }

    .recordingBody {
        width:100%;height:400px;

        & .recordingContent {
            width:100%;position:relative;height:260px;z-index:10;overflow-y:auto;overflow-x:hidden;padding:0 15px;

        }

    }
</style>
