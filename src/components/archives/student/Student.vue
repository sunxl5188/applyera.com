<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div class="po_re">
            <div id="filePicker" style="position: absolute;left: -999px;z-index: 1;"></div>
        </div>
        <div :style="name==='student'?'display:block;':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">学生管理</div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" @click="student_name=''"
                               v-if="student_name!==''">&#xe7f6;</i>
                            <input type="text" name="student_name" v-model="student_name" class="form-control"
                                   placeholder="请输入学生姓名搜索"
                                   style="padding-left:30px;">
                        </div>
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button :class="student_type || student_status || adviser || created_time?'btn btn-primary filter':'btn btn-default filter'"
                                        type="button" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                    <div class="pl-15 pr-15" style="width:180px;">
                                        <form action="" method="POST" class="form-horizontal">
                                            <div class="form-group">
                                                <label>学生类型</label>
                                                <select name="student_type" v-model="student_type" class="form-control">
                                                    <option value="">请选择</option>
                                                    <option :value="item.id" v-for="(item,i) in student_type_list.type" :key="i">
                                                        {{item.stu_type}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>学生状态</label>
                                                <select name="student_status" v-model="student_status"
                                                        class="form-control">
                                                    <option value="">请选择</option>
                                                    <option :value="item.id" v-for="(item, i) in student_type_list.state" :key="i">{{item.status_name}}</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>服务顾问</label>
                                                <select name="adviser" v-model="adviser" class="form-control">
                                                    <option value="">请选择</option>
                                                    <option :value="item.id" v-for="(item,i) in service_adviser_list" :key="i">
                                                        {{item.name}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>生成日期</label>
                                                <input type="text" name="created_time" v-model="created_time"
                                                       class="form-control times"
                                                       placeholder="请选择时间">
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
                            <button type="button" class="btn btn-default delete" @click="deleteOne('all')"></button>
                        </div>
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button type="button" class="btn btn-default edit" data-toggle="dropdown"></button>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li><a href="#" data-toggle="modal" data-backdrop="static"
                                           data-target="#editStudent">编辑学生</a></li>
                                    <li><a href="#" data-toggle="modal" data-target="#consultant"
                                           data-backdrop="static">顾问交接</a></li>
                                    <li><a href="#" @click="shiftHighSeas">移至公海</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group ml-10">
                            <div class="dropdown">
                                <button type="button" class="btn btn-default" data-toggle="dropdown"><i
                                        class="iconfont">&#xe73e;</i> 添加
                                </button>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <router-link to="/archives/student/edit">手动添加</router-link>
                                    </li>
                                    <li><a href="javascript:void(0);" @click="uploadStart">模板导入</a></li>
                                    <li><a :href="siteUrl+'/Public/xls_temp/Student_profile.xlsx'"
                                           download="Student_profile.xlsx" target="_blank">下载模板</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div v-if="alert.state > 0">
                <div :class="alert.state===1?'alert alert-primary':(alert.state===2?'alert alert-success':'alert alert-danger')">
                    {{alert.msg}}
                </div>
            </div>

            <div class="row">
                <table class="table table-customize">
                    <thead>
                    <tr>
                        <th class="w5"></th>
                        <th>学生姓名</th>
                        <th>学生类型</th>
                        <th>申请项目</th>
                        <th>服务顾问</th>
                        <th>
                            创建时间
                            <a href="javascript:void(0);"
                               class="iconfont sort"
                               :class="time_sort===0?'':(time_sort===1?'down':'up')"
                               @click="listSort"></a>
                        </th>
                        <th class="w10">状态</th>
                        <th class="w10"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in list" :key="i">
                        <td><input type="checkbox" name="id[]" :value="item.id"></td>
                        <td>
                            <router-link :to="{path:'/archives/student/edit',query:{id:item.id}}" class="cded">
                                <span v-html="highlight(item.name, student_name)"></span>
                            </router-link>
                        </td>
                        <td>{{item.student_type}}</td>
                        <td>
                            <span v-if="item.intention_degree===1">本科,</span>
                            <span v-if="item.intention_degree===2">硕士,</span> {{item.intention_country}}
                        </td>
                        <td>{{item.adviser}}</td>
                        <td>{{item.create_time}}</td>
                        <td>
                            <span class="label is-round" v-for="(items, i) in student_type_list.state" :key="i"
                                  v-if="items.id === item.sign_status"
                                  :style="'background-color:'+item.status_color+';'">
                                {{items.status_name}}
                            </span>
                        </td>
                        <td class="text-center">
                            <div class="dropdown">
                                <a href="javascript:void(0);" data-toggle="dropdown"><i
                                        class="iconfont">&#xe66b;</i></a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <router-link :to="{path:'/archives/student/edit',query:{id:item.id}}">查看
                                        </router-link>
                                    </li>
                                    <li><a href="javascript:void(0);" @click="id=[item.id];deleteOne('one')">删除</a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="8" class="text-center" v-html="LoadingImg"></td>
                    </tr>
                    <tr v-if="loading===false && list.length === 0">
                        <td colspan="8" class="text-center" v-html="NoData"></td>
                    </tr>
                    </tbody>
                </table>
                <pagination :total="total" :current-page='current' @pagechange="pagechange"
                            v-if="list.length > 0"></pagination>
            </div>

        </div>
        <router-view></router-view>
        <!--编辑学生-->
        <div class="modal fade" id="editStudent">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">编辑学生</h4>
                    </div>
                    <div class="modal-body">
                        <form action="" method="POST" class="form-horizontal" id="studentForm"
                              @submit.prevent="validateBeforeSubmitStudent('form1')" data-vv-scope="form1">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">选择字段</label>
                                <div class="col-sm-6">
                                    <select name="field" class="form-control" v-model="field" v-validate="'required'"
                                            data-vv-as="必选项">
                                        <option value="">请选择</option>
                                        <option value="type">学生类型</option>
                                        <option value="state">学生状态</option>
                                    </select>
                                    <div class="validateTip" v-show="errors.has('form1.field')">
                                        {{ errors.first("form1.field") }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">批量修改为</label>
                                <div class="col-sm-6">
                                    <select name="student_type" class="form-control" v-validate="'required'"
                                            data-vv-as="必选项">
                                        <option value="">请选择</option>
                                        <option :value="item.id" v-for="(item,i) in student_type_list['type']" :key="i" v-if="field==='type'">
                                            {{item.stu_type}}
                                        </option>
                                        <option :value="item.id" v-for="(item,i) in student_type_list['state']" :key="i" v-if="field==='state'">
                                            {{item.status_name}}
                                        </option>
                                    </select>
                                    <div class="validateTip" v-show="errors.has('form1.student_type')">
                                        {{ errors.first("form1.student_type") }}
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <div class="col-sm-10 col-sm-offset-2">
                                    <button type="submit" class="btn btn-primary">确定</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="consultant">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">顾问交接</h4>
                    </div>
                    <div class="modal-body">
                        <form action="" method="POST" class="form-horizontal" id="consultantForm"
                              @submit.prevent="validateBeforeSubmitConsultant('form2')" data-vv-scope="form2">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">新负责人</label>
                                <div class="col-sm-6">
                                    <select name="adviser_id" class="form-control" v-validate="'required'"
                                            data-vv-as="新负责人">
                                        <option value="">请选择负责人</option>
                                        <option :value="item.id" v-for="(item,i) in service_adviser_list" :key="i">{{item.name}}
                                        </option>
                                    </select>
                                    <div class="validateTip" v-show="errors.has('form2.adviser_id')">
                                        {{ errors.first("form2.adviser_id") }}
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <div class="col-sm-10 col-sm-offset-2">
                                    <button type="submit" class="btn btn-primary">确定</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import * as _ from 'lodash'
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import db from '@~/js/request'
let WebUploader = require('@@/js/webuploader/webuploader')

export default {
  name: 'Student',
  store,
  data () {
    return {
      siteUrl: window.ajaxBaseUrl,
      name: 'student',
      loading: true,
      field: '',
      student_name: '',
      student_type: '',
      student_status: '',
      adviser: '',
      created_time: '',
      time_sort: 0,
      list: [],
      total: 0,
      current: 1,
      alert: {state: 0, msg: ''},
      student_type_list: [],
      service_adviser_list: [],
      id: [],
      idArr: []
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
    self.name = (self.$route.name).toLocaleLowerCase()
    self.student_status = self.$route.query.status || ''

    self.$nextTick(() => {
      if (self.name === 'student') {
        setTimeout(function () {
          self.pagechange(1)
        }, 500)
      }
      $(document).on('click', '[name="id[]"]', function () {
        if ($(this).is(':checked')) {
          self.idArr.push($(this).val())
        } else {
          self.idArr.map((item, i) => {
            if (item === $(this).val()) {
              self.idArr.splice(i, 1)
            }
          })
        }
      })
    })
    setTimeout(function () {
      self.laydate.render({
        elem: '.times',
        range: true,
        done: (v) => {
          self.created_time = v
        }
      })

      self.createUpload()
    }, 1000)
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      self.list = []
      self.loading = true
      params.append('student_name', self.student_name)
      params.append('student_type', self.student_type)
      params.append('student_status', self.student_status)
      params.append('adviser', self.adviser)
      params.append('created_time', self.created_time)
      params.append('sort_by_time', self.time_sort)
      params.append('page', p || 1)
      db.postRequest('Institution/Student/index', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
          self.student_type_list = res.data.student_type
          self.service_adviser_list = res.data.service_adviser
        } else {
          self.layer.alert(res.msg)
        }
        self.loading = false
        self.current = p || 1
      })
    },
    clearData () {
      let self = this
      self.student_name = ''
      self.student_type = ''
      self.student_status = ''
      self.adviser = ''
      self.created_time = ''
      self.time_sort = 0
      setTimeout(function () {
        self.pagechange(1)
      }, 100)
    },
    uploadStart () {
      $('#filePicker .webuploader-element-invisible').click()
    },
    listSort () {
      let self = this
      if (self.time_sort === 0) {
        self.time_sort = 1
      } else if (self.time_sort === 1) {
        self.time_sort = 2
      } else if (self.time_sort === 2) {
        self.time_sort = 1
      }
      self.pagechange()
    },
    // 删除
    deleteOne (type) {
      let self = this
      self.layer.confirm('删除学生同时会自动清除此学生关联的联系人和申请资料。该操作成功之后，将无法恢复。如果学生已完成留学合同的支付，则无法删除该学生', {icon: 3}, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        if (type === 'one') {
          params.append('student_id[]', self.id)
        }
        if (type === 'all') {
          if (self.idArr.length === 0) {
            self.layer.alert('请选择需要操作的学生', {icon: 2})
            return false
          } else {
            self.idArr.map(item => {
              params.append('student_id[]', item)
            })
          }
        }
        db.postRequest('Institution/Student/batchDelStu', params).then(res => {
          if (res.status === 1) {
            self.pagechange(self.current)
            self.id = []
            self.idArr = []
          } else {
            self.layer.alert(res.msg, {icon: 2})
          }
        })
      })
    },
    createUpload () {
      let self = this
      let uploader = WebUploader.create({
        auto: true,
        swf: 'static/js/webuploader/Uploader.swf',
        server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne',
        fileVal: 'file',
        pick: '#filePicker',
        file_id: 'file_id',
        fileNumLimit: 1,
        fileSingleSizeLimit: 1024 * 1024 * 20,
        duplicate: true,
        accept: {
          title: '',
          extensions: 'xlsx,xls',
          mimeTypes: '*/*'
        },
        formData: {func: 'student_import'}
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
    validateBeforeSubmitStudent (scope) {
      let self = this
      self.$validator.validateAll(scope).then((result) => {
        if (result) {
          if (self.idArr.length === 0) {
            self.layer.alert('请选择要操作的ID', {icon: 2})
            return false
          }
          let formData = $('#studentForm').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          self.idArr.map(item => {
            params.append('student_id[]', item)
          })
          db.postRequest('Institution/Student/batchChangeType', params).then(res => {
            if (res.status === 1) {
              self.idArr = []
              self.pagechange(self.current)
              $('[name="id[]"]').each(function (index, element) {
                element.checked = false
              })
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
                $('#editStudent').modal('hide')
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
    validateBeforeSubmitConsultant (scope) {
      let self = this
      let advName = $('[name="adviser_id"]').find('option:selected').text().replace('请选择负责人', '')
      self.$validator.validateAll(scope).then((result) => {
        if (result) {
          if (self.idArr.length === 0) {
            self.layer.alert('请选择要操作的ID', {icon: 2})
            return false
          }
          let formData = $('#consultantForm').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          self.idArr.map(item => {
            params.append('student_id[]', item)
          })
          self.layer.confirm("是否确定把所选的学生转移至 <b class='cf00'>" + advName + '</b>转移成功后，原负责人不能再维护跟进和更新此学生数据。', {
            icon: 3
          }, function (ii) {
            self.layer.close(ii)
            db.postRequest('Institution/Student/batchChangeAdviser', params).then(res => {
              if (res.status === 1) {
                self.idArr = []
                self.pagechange(self.current)
                $('[name="id[]"]').each(function (index, element) {
                  element.checked = false
                })
                self.layer.alert(res.msg, {
                  icon: 1
                }, function (i) {
                  self.layer.close(i)
                  $('#consultant').modal('hide')
                })
              } else {
                self.layer.alert(res.msg, {
                  icon: 2
                })
              }
            })
          })
        }
      })
    },
    // 移至公海
    shiftHighSeas () {
      let self = this
      let params = new URLSearchParams()
      if (self.idArr.length === 0) {
        self.layer.alert('请选择需要操作的学生', {icon: 2})
        return false
      } else {
        self.layer.confirm('学生将被移至学生公海，届时该学生将对您所在机构的所有顾问老师可见。您确认将学生转移至学生公海吗？', {
          icon: 3
        }, function (i) {
          self.layer.close(i)
          self.idArr.map(item => {
            params.append('student_id[]', item)
          })
          db.postRequest('/Institution/Student/backStudent', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.pagechange(self.current)
                self.idArr = []
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        })
      }
    }
  },
  components: {pagination},
  watch: {
    student_name () {
      this.debouncePagechange()
    },
    $route (to, from) {
      let self = this
      self.name = (to.name).toLocaleLowerCase()
      if (self.name === 'student') {
        self.pagechange(1)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
