<template>
    <div>
        <form action="" id="admin" method="POST" class="form-horizontal">
            <input type="hidden" name="orderId" id="orderId" :value="id"/>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>机构邮箱</label>
                        <input type="text" class="form-control" name="email" placeholder=""
                               style="display:inline-block;width:200px;" v-model="adminList.email">
                    </div>
                </div>
            </div>
            <div class="blk-15"></div>

            <div class="panel panel-default">
                <div class="panel-heading">01-上传院校回执</div>
                <div class="panel-body">
                    <div class="clearfix pb-15">
                        <button type="button" class="btn btn-primary sendEmail1" @click="sendEmail(1)">选择发送邮件(0)
                        </button>
                    </div>
                    <table class="table table-bordered table-hover table-condensed table-text-over text-center">
                        <thead>
                        <tr>
                            <th class="text-center w5">
                                <input type="checkbox" @click="setChecked(1, $event)">
                            </th>
                            <th class="text-center">发送邮件次数</th>
                            <th class="text-center">院校名称</th>
                            <th class="text-center">专业名称</th>
                            <th class="text-center">是否收到回执</th>
                            <th class="text-center">上传附件</th>
                            <th class="text-center">信息备注</th>
                            <th class="text-center">最后发送时间</th>
                            <th class="text-center">已发送邮件次数</th>
                        </tr>
                        </thead>
                        <tbody class="table1">
                        <tr v-for="(item, i) in adminList.return" :key="i">
                            <td>
                                <input type="checkbox" name="order_major_id[]" :value="item.order_major_id">
                                <input type="hidden" name="order_major[id][]" :value="item.order_major_id"/>
                            </td>
                            <td>{{item.email_count}}</td>
                            <td>{{item.school_name}}</td>
                            <td>{{item.major_name}}</td>
                            <td>
                                <select name="order_major[is_return][]" class="form-control" v-model="item.is_return">
                                    <option value="1">是</option>
                                    <option value="2">否</option>
                                </select>
                            </td>
                            <td>
                                <div :id="'picker_A'+i">
                                    上传附件({{item.return_upload===''?0:(item.return_upload).split('|').length}})
                                </div>
                                <input type="hidden" :name="'order_major[return_upload]['+i+']'"
                                       v-model="item.return_upload"/>
                            </td>
                            <td><input type="text" name="order_major[return_info][]" class="form-control"
                                       v-model="item.return_info"></td>
                            <td>{{item.last_send_time}}</td>
                            <td>{{item.email_count}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--上传面试-->
            <div class="panel panel-default">
                <div class="panel-heading">上传面试信息</div>
                <div class="panel-body">
                    <div class="clearfix pb-15">
                        <button type="button" class="btn btn-primary sendEmail2">选择发送邮件(0)</button>
                    </div>
                    <table class="table table-bordered table-hover table-text-over table-condensed text-center">
                        <thead>
                        <tr>
                            <th class="text-center w5">
                                <input type="checkbox" @click="setChecked(2, $event)">
                            </th>
                            <th class="text-center">院校名称</th>
                            <th class="text-center">专业名称</th>
                            <th class="text-center">是否需要面试</th>
                            <th class="text-center">面试链接地址</th>
                            <th class="text-center">信息备注</th>
                            <th class="text-center">最后发送时间</th>
                            <th class="text-center">已发送邮件次数</th>
                        </tr>
                        </thead>
                        <tbody class="table2">
                        <tr v-for="(item, i) in adminList.interview" :key="i">
                            <td>
                                <input type="checkbox" :value="item.order_major_id">
                            </td>
                            <td>{{item.school_name}}</td>
                            <td>{{item.major_name}}</td>
                            <td>
                                <select name="order_major[is_interview][]" class="form-control"
                                        v-model="item.is_interview">
                                    <option value="1">是</option>
                                    <option value="2">否</option>
                                </select>
                            </td>
                            <td><input type="text" name="order_major[interview_link][]" class="form-control"
                                       v-model="item.interview_link"></td>
                            <td><input type="text" name="order_major[interview_info][]" class="form-control"
                                       v-model="item.interview_info"></td>
                            <td>{{item.last_send_time}}</td>
                            <td>{{item.email_count}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!--上传offer-->
            <div class="panel panel-default">
                <div class="panel-heading">02-上传offer/拒信</div>
                <div class="panel-body">
                    <div class="clearfix pb-15">
                        <button type="button" class="btn btn-primary sendEmail3" @click="sendEmail(3)">选择发送邮件(0)
                        </button>
                    </div>
                    <table class="table table-bordered table-hover table-text-over table-condensed text-center">
                        <thead>
                        <tr>
                            <th class="text-center w5">
                                <input type="checkbox" @click="setChecked(3, $event)">
                            </th>
                            <th class="text-center">院校名称</th>
                            <th class="text-center">专业名称</th>
                            <th class="text-center">申请结果</th>
                            <th class="text-center">上传附件</th>
                            <th class="text-center">信息备注</th>
                            <th class="text-center">最后发送时间</th>
                            <th class="text-center">已发送邮件次数</th>
                        </tr>
                        </thead>
                        <tbody class="table3">
                        <tr v-for="(item, i) in adminList.res" :key="i">
                            <td><input type="checkbox" :value="item.order_major_id"></td>
                            <td>{{item.school_name}}</td>
                            <td>{{item.major_name}}</td>
                            <td>
                                <select name="order_major[res][]" class="form-control" v-model="item.res">
                                    <option value="">请选择</option>
                                    <option value="1">offer</option>
                                    <option value="2">拒信</option>
                                </select>
                            </td>
                            <td>
                                <div :id="'picker_B'+i">
                                    上传附件({{item.res_upload===''?0:(item.res_upload).split('|').length}})
                                </div>
                                <input type="hidden" :name="'order_major[res_upload]['+i+']'"
                                       v-model="item.res_upload"/>
                            </td>
                            <td><input type="text" name="order_major[res_info][]" class="form-control"
                                       v-model="item.res_info"></td>
                            <td>{{item.last_send_time}}</td>
                            <td>{{item.email_count}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import store from '@/vuex/Store'
import db from '@~/js/request'
let WebUploader = require('@@/js/webuploader/webuploader')

export default {
  name: 'AdminComponent',
  store,
  data () {
    return {
      adminList: {}
    }
  },
  props: ['id'],
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.getAdmin()

    setTimeout(function () {
      $(document).on('click', ".table1 input[type='checkbox'], .table2 input[type='checkbox'], .table3 input[type='checkbox']", function () {
        let len = $(this).parents('tbody').find("input[type='checkbox']:checked").length
        $(this).parents('.panel-body').find('[class*="sendEmail"]').html('选择发送邮件(' + len + ')')
      })
    }, 2000)
  },
  methods: {
    // 易申学处理信息
    getAdmin () {
      let self = this
      let Arr1 = []
      let Arr2 = []
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.getRequest('Institution/Apply/internalHandleIndex', params).then(res => {
        self.adminList = res.data
        res.data.return.map((item, i) => {
          Arr1.push({id: 'picker_A' + i, fid: 'return_upload[' + i + ']'})
        })
        res.data.res.map((item, i) => {
          Arr2.push({id: 'picker_B' + i, fid: 'res_upload[' + i + ']'})
        })
        setTimeout(function () {
          self.createUpload(Arr1)
          self.createUpload(Arr2)
        }, 500)
      })
    },
    createUpload (list) {
      let self = this
      for (let i = 0; i < list.length; i++) {
        let uploader = list[i]['id']
        let fileType = ''
        if ((list[i]['id']).indexOf('picker_A') >= 0) {
          fileType = 'upload_return'
        }
        if ((list[i]['id']).indexOf('picker_B') >= 0) {
          fileType = 'upload_res'
        }
        uploader = WebUploader.create({
          auto: true, // 选完文件后，是否自动上传
          swf: 'static/js/webuploader/Uploader.swf', // '/upload/Uploader.swf', // swf文件路径
          server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne', // 文件接收服务端
          fileVal: 'file',
          pick: {
            id: '#' + list[i]['id'],
            multiple: true, // 是否多文件上传 默认false
            label: ''
          }, // 选择文件的按钮。可选
          // 允许选择文件格式。
          accept: {
            title: '',
            extensions: 'jpg,jpeg,png,bmp',
            mimeTypes: 'image/*'
          },
          threads: 1,
          fileNumLimit: undefined, // 限制上传个数
          fileSingleSizeLimit: 1024 * 1024 * 2, // 限制单个上传图片的大小
          formData: {func: fileType}, // 上传所需参数
          duplicate: true // 重复上传
        })
        uploader.on('uploadSuccess', function (file, res) {
          if (res.status === 1) {
            if ((list[i]['id']).indexOf('picker_A') >= 0) {
              if (self.adminList.return[(list[i]['id']).match(/\d/)[0]]['return_upload']) {
                self.adminList.return[(list[i]['id']).match(/\d/)[0]]['return_upload'] += '|' + res.data.path
              } else {
                self.adminList.return[(list[i]['id']).match(/\d/)[0]]['return_upload'] = res.data.path
              }
              $('#' + list[i]['id']).find('.webuploader-pick').html('上传附件(' + self.adminList.return[(list[i]['id']).match(/\d/)[0]]['return_upload'].split('|').length + ')')
            }
            if ((list[i]['id']).indexOf('picker_B') >= 0) {
              if (self.adminList.res[(list[i]['id']).match(/\d/)[0]]['res_upload']) {
                self.adminList.res[(list[i]['id']).match(/\d/)[0]]['res_upload'] += '|' + res.data.path
              } else {
                self.adminList.res[(list[i]['id']).match(/\d/)[0]]['res_upload'] = res.data.path
              }
              $('#' + list[i]['id']).find('.webuploader-pick').html('上传附件(' + self.adminList.res[(list[i]['id']).match(/\d/)[0]]['res_upload'].split('|').length + ')')
            }
          } else {
            self.layer.alert(res.msg, {
              shade: true, // 是否显示遮罩
              shadeClose: false// 点击遮罩是否关闭
            })
          }
        })
      }
    },
    save () {
      let self = this
      let formData = $('#admin').serializeArray()
      let params = new URLSearchParams()
      formData.map(item => {
        params.append(item.name, item.value)
      })
      db.postRequest('Institution/Apply/internalHandleSave', params).then(res => {
        self.layer.alert(res.msg, {
          shadeClose: false
        })
      })
    },
    setChecked (i, event) {
      let $this = event.currentTarget.checked
      $('.table' + i + ' input[type="checkbox"]').each(function (i, element) {
        element.checked = $this
      })
      let len = $('.table' + i + ' input[type="checkbox"]:checked').length
      $('.sendEmail' + i).html('选择发送邮件(' + len + ')')
    },
    sendEmail (type) {
      let self = this
      let params = new URLSearchParams()
      if (type === 1) {
        $(".table1 input[type='checkbox']:checked").each(function () {
          params.append('order_major_id[]', $(this).val())
        })
      }
      if (type === 3) {
        $(".table3 input[type='checkbox']:checked").each(function () {
          params.append('order_major_id[]', $(this).val())
        })
      }
      params.append('order_major_id[]', '')
      params.append('type', type)
      params.append('email', self.adminList.email)
      db.postRequest('Institution/Apply/emailSend', params).then(res => {
        /* if (res.status === 1) {
            self.getAdmin()
          } */
        self.layer.alert(res.msg, {
          shadeClose: false
        })
      })
    }
  }
}
</script>
