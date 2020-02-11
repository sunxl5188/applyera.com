<template>
    <div>
        <InitApplyNav :state="state" step="step2" :id="id"/>
        <div class="clearfix form-horizontal">
            您申请的学校有：{{schoolText}}
        </div>
        <div class="clearfix lh30">建议上传附件：</div>
        <div class="clearfix lh24">
                <span class="tipsys mr-10">成绩单<i class="iconfont handPower c999" data-toggle="tooltip"
                                                 data-placement="top" data-container="body"
                                                 title="在读生请提供现有6个学期中英文完整成绩单； 毕业生请提供大学4年完整中英文成绩单">&#xe999;</i></span>,
            <span class="tipsys mr-10">毕业证书 or 学位证书 or 在读证明<i class="iconfont handPower c999" data-toggle="tooltip"
                                                              data-placement="top" data-container="body"
                                                              title="如已毕业，请提供毕业证书或学位证书，请注意证书要打印在学校的信纸上，有中英文对照且加盖学校公章。如尚未毕业，请提供在读证明，在读证明需要打印在学校的信纸上，有中英文对照且加盖学校公章。">&#xe999;</i></span>,
            <span class="tipsys mr-10">推荐信<i class="iconfont handPower c999" data-toggle="tooltip"
                                             data-placement="top" data-container="body"
                                             title="推荐信请用学校信签纸打印，必须包含推荐人的姓名、电话、邮箱、地址信息、日期，推荐人亲笔签名">&#xe999;</i></span>,
            <span class="tipsys mr-10">语言成绩</span>,
            <span class="tipsys mr-10">护照</span>,
            <span class="tipsys mr-10">材料真实性声明<a :href="siteUrl + '/Public/xls_temp/Declaration_of_Authenticity.doc'"
                                                 target="_blank" class="cded"
                                                 download="Declaration_of_Authenticity">下载</a><i
                    class="iconfont handPower c999" data-toggle="tooltip" data-placement="top" data-container="body"
                    title="用于声明材料的真实性，请下载后打印">&#xe999;</i></span>,
            <span class="tipsys mr-10">个人简历</span>,
            <span class="tipsys mr-10">实习证明或工作证明<i class="iconfont handPower c999" data-toggle="tooltip"
                                                   data-placement="top" data-container="body"
                                                   title="请尽量提供中英文对照的实习证明或工作证明，打印在单位抬头纸上，并加盖上单位公章">&#xe999;</i></span>
            ,
            <span class="tipsys mr-10">奖状及证书<i class="iconfont handPower c999" data-toggle="tooltip"
                                               data-placement="top" data-container="body"
                                               title="如有证书或获奖请上传相关的扫描件，如奖学金，资格证书等。">&#xe999;</i></span>,
            <span class="tipsys mr-10">作品集<i class="iconfont handPower c999" data-toggle="tooltip"
                                             data-placement="top" data-container="body" title="艺术生提供，具体要求根据专业和学校而定">&#xe999;</i></span>,
            <span class="tipsys mr-10">课程列表<i class="iconfont handPower c999" data-toggle="tooltip"
                                              data-placement="top" data-container="body"
                                              title="在校大四学生尽量提供最后一学年的课程列表（module list）">&#xe999;</i></span>
        </div>
        <!--上传列表-->
        <div class="clearfix pb-15 pt-15 pl-45">
            <div class="pull-right">
                <button type="button" class="btn btn-default ml-10" @click="downfile()">下载</button>
                <button type="button" class="btn btn-default ml-10" @click="delfile()">删除</button>
                <div id="picker" v-if="submitStatus===0">上传</div>
            </div>
        </div>
        <table class="table table-bordered table-customize" id="uploadTable">
            <thead>
            <tr>
                <th colspan="5">
                  <label for="selectAll" class="mr-10">
                    <input type="checkbox" name="selectAll" id="selectAll" value="sAll" style="vertical-align:top;"/>
                  </label>
                    <img src="../../../../static/images/007.png" width="20" alt="" class="div_vm">
                    <span class="div_vm">学生端</span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in list.student" :key="i">
                <td class="w5">
                    <input type="checkbox" name="id[]" :value="item.id" :id="item.id"/>
                </td>
                <td>
                    <label :for="item.id">{{item.file_name}}</label>
                </td>
                <td class="w25">
                    <select class="form-control selectpicker show-tick" v-model="item.file_type"
                            @change="selectSaveType(item.id, item.file_type)">
                        <option value="">请关联</option>
                        <option :value="n" v-for="(items, n) in typeMapping" :key="n">{{items}}</option>
                    </select>
                </td>
                <td class="w15">{{item.file_size}}</td>
                <td class="w20">{{item.add_time}}</td>
            </tr>
            <tr v-if="loading">
                <td colspan="5" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="!loading && list.student.length === 0">
                <td colspan="5" v-html="NoData"></td>
            </tr>
            </tbody>
        </table>
        <!--************************************************************************************-->
        <table class="table table-bordered table-customize" id="uploadTable2">
            <thead>
            <tr>
                <th colspan="5">
                    <label for="selectAll2" class="mr-10">
                      <input type="checkbox" name="selectAll" id="selectAll2" value="cAll" style="vertical-align:top;"/>
                    </label>
                    <img src="../../../../static/images/007.png" width="20" alt="" class="div_vm">
                    <span class="div_vm">机构端</span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in list.user" :key="i">
                <td class="w5">
                    <input type="checkbox" name="id[]" :value="item.id" :id="item.id"/>
                </td>
                <td>
                    <label :for="item.id">{{item.file_name}}</label>
                </td>
                <td class="w25">
                    <select class="form-control selectpicker show-tick" v-model="item.file_type"
                            @change="selectSaveType(item.id, item.file_type)">
                        <option value="">请关联</option>
                        <option :value="n" v-for="(items, n) in typeMapping" :key="n">{{items}}</option>
                    </select>
                </td>
                <td class="w15">{{item.file_size}}</td>
                <td class="w20">{{item.add_time}}</td>
            </tr>
            <tr v-if="loading">
                <td colspan="5" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="!loading && list.user.length === 0">
                <td colspan="5" v-html="NoData"></td>
            </tr>
            </tbody>
        </table>
        <div class="clearfix c999 lh20 font12">
            <div>小贴士：1. 申请材料请尽量上传PDF文件，大小不超过2MB。</div>
            <div style="text-indent:4em;">2. 同一种类文件的中英文（如在读证明，成绩单，实习证明）请务必把中英文合并放在同一个PDF文件里。</div>
        </div>
        <div class="blk20"></div>
        <div class="clearfix text-center" v-if="submitStatus===0">
            <router-link to="/functions/initApply/QuestionAnswer" class="btn btn-default" v-if="!id">下一页</router-link>
            <router-link :to="{path:'/functions/initApply/QuestionAnswer',query:{id:id}}" class="btn btn-default" v-if="id">下一页</router-link>
        </div>
        <div id="fileList" class="hidden"></div>
        <a href="" id="downfile"></a>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import webupload from '@~/js/webupload'
import InitApplyNav from '@#/functions/initApply/InitApplyNav'
import db from '@~/js/request'
require('icheck')

export default {
  name: 'UploadData',
  data () {
    return {
      id: '',
      siteUrl: window.ajaxBaseUrl,
      loading: true,
      submitStatus: 0,
      list: [],
      state: [0, 0, 0, 0],
      idArr: [],
      file_id: [],
      typeMapping: [],
      schoolText: ''
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.id = self.$route.query.id || ''
      $('[data-toggle="tooltip"]').tooltip()
      if (self.id === '') {
        self.loading = false
      } else {
        self.getAnnex()
      }
      // *****************************
      if (self.submitStatus === 0) {
        setTimeout(function () {
          // 上传
          webupload(self.file_id, {
            fileList: { id: '#fileList', type: 'file' },
            accept: {
              title: '',
              extensions: 'pdf',
              mimeTypes: '*!/!*'
            },
            formData: { apply_order_id: self.id, func: 'student_attachment' },
            uploadSuccess: (file, response) => {},
            uploadFinished: (msg) => {
              if (msg === '') {
                self.layer.alert('上传成功！', {icon: 1})
              } else {
                self.layer.alert(msg, {icon: 2})
              }
              self.getAnnex()
            },
            error: (e) => {
              if (e === 'Q_TYPE_DENIED' || e === 'F_EXCEED_SIZE') {
                self.layer.alert('请上传PDF格式的文件', { icon: 2 })
              }
            }
          })
        }, 500)
      }
    })
  },
  methods: {
    // 获取附件列表
    getAnnex () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.postRequest('Institution/Apply/uplodaData', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.typeMapping = res.data.file_type_list
          self.schoolText = res.data.school_rcmd_list
          self.submitStatus = res.data.submit_status
        } else {
          console.log(res.msg)
        }
        self.reSelect()
        self.setIcheck()
        self.loading = false
      })
    },
    // 下载
    downfile () {
      let self = this
      if (self.idArr.length === 0) {
        self.layer.alert('请选择要操作的编号')
        return false
      }
      let url = window.ajaxBaseUrl + '/Institution/Apply/uplodaDataDownload?id=' + self.id + '&ids=' + self.idArr + '&token=' + self.$cookies.get('token')
      let element = document.querySelector('#downfile')
      element.href = url
      element.target = '_blank'
      element.click()
    },
    // 删除附件
    delfile () {
      let self = this
      if (self.idArr.length === 0) {
        self.layer.alert('请选择要操作的编号')
        return false
      }
      self.layer.confirm('您确定要删除此附件？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('apply_order_id', self.id)
        self.idArr.map((item) => {
          params.append('index[]', item)
        })
        db.postRequest('/Institution/Student/batchDelAttach', params).then(res => {
          if (res.status === 1) {
            self.layer.msg(res.msg)
            self.getAnnex()
          } else {
            self.layer.msg(res.msg)
          }
        })
      })
    },
    // 设置附件类型
    selectSaveType (id, type) {
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('type', type)
      db.postRequest('Institution/Student/relate', params).then(res => {
        console.log(res.msg)
      })
    },
    reSelect () {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh')
      }, 500)
    },
    // 设置单、多选样式
    setIcheck () {
      let self = this
      setTimeout(function () {
        $('#uploadTable [type="checkbox"], #uploadTable2 [type="checkbox"]').each(function () {
          $(this).iCheck({
            labelHover: false,
            cursor: true,
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            increaseArea: '20%'
          })
          $(this).on('ifChanged', function (event) {
            let _this = $(event.target)
            let name = _this.attr('name')
            if (name === 'selectAll') {
              if (_this.val() === 'sAll') {
                if (_this.is(':checked') === true) {
                  $('#uploadTable [name="id[]"]').each(function () {
                    $(this).iCheck('check')
                  })
                } else {
                  $('#uploadTable [name="id[]"]').each(function () {
                    $(this).iCheck('uncheck')
                  })
                }
              }
              if (_this.val() === 'cAll') {
                if (_this.is(':checked') === true) {
                  $('#uploadTable2 [name="id[]"]').each(function () {
                    $(this).iCheck('check')
                  })
                } else {
                  $('#uploadTable2 [name="id[]"]').each(function () {
                    $(this).iCheck('uncheck')
                  })
                }
              }
            } else {
              if (_this.is(':checked') === true) {
                self.idArr.push(_this.val())
              } else {
                self.idArr.map((item, i) => {
                  if (item === _this.val()) {
                    self.idArr.splice(i, 1)
                  }
                })
              }
            }
          })
        })
      }, 500)
    }
  },
  components: {InitApplyNav}
}
</script>

<style lang="scss">
#picker{
    display:inline-block;vertical-align:middle;height:34px;margin-left:10px;
    & .webuploader-pick{
      padding:7px 15px;background-color:#547bbd;color:#fff;height:34px;
        &:before{content:'';}
  }
}
#uploadTable, #uploadTable2{
    & label{margin-bottom:0;cursor:pointer;}
}
</style>
