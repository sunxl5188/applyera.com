<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">发布/编辑公告</div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="submitForm()"><i
                                class="iconfont">&#xe637;</i> 保存
                        </button>
                    </div>

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>

                </div>

            </div>
        </div>

        <div v-if="loading" v-html="LoadingImg"></div>
        <form action="" method="POST" class="form-horizontal" autocomplete="off" v-if="!loading"
              @submit.prevent="validateBeforeSubmit">
            <input type="hidden" name="id" id="id" v-if="id!==''" :value="id"/>
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>公告编号</label>
                            <input type="text" name="number" class="form-control" placeholder="" :value="msgId"
                                   readonly>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>发布状态</label>
                            <input type="text" name="" class="form-control" placeholder="" :value="created_time"
                                   readonly>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>创建时间</label>
                            <input type="text" name="" class="form-control" placeholder="" :value="created_time"
                                   readonly>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>最新发布时间</label>
                            <input type="text" name="" class="form-control" placeholder="" :value="last_time" readonly>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label><font class="cf00">*</font> 公告类型</label>
                            <select name="type" v-model="type" class="form-control" v-validate="'required'"
                                    data-vv-as="公告类型">
                                <option value="">请选择</option>
                                <option value="1">紧急通知</option>
                                <option value="2">申请通知</option>
                                <option value="3">系统消息</option>
                                <option value="4">院校资讯</option>
                            </select>
                            <div class="validateTip" v-show="errors.has('type')">
                                {{ errors.first("type") }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label><font class="cf00">*</font> 所属国家</label>
                            <select name="country" v-model="country" class="form-control" v-validate="'required'"
                                    data-vv-as="所属国家">
                                <option value="">请选择</option>
                                <option value="全部">全部</option>
                                <option value="英国">英国</option>
                                <option value="美国">美国</option>
                                <option value="澳大利亚">澳大利亚</option>
                                <option value="加拿大">加拿大</option>
                            </select>
                            <div class="validateTip" v-show="errors.has('country')">
                                {{ errors.first("country") }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label><font class="cf00">*</font>公告标题</label>
                        <input type="text" name="title" v-model="title" class="form-control" placeholder="请输入公告标题"
                               v-validate="'required'" data-vv-as="公告标题">
                        <div class="validateTip" v-show="errors.has('title')">
                            {{ errors.first("title") }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label><font class="cf00">*</font>公告内容</label>
                        <textarea name="content" id="content" v-model="content"
                                  style="width:100%;height: 120px;display: block;" v-validate="'required'"
                                  data-vv-as="公告内容"></textarea>
                        <div class="validateTip" v-show="errors.has('content')">
                            {{ errors.first("content") }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label><font class="cf00">*</font>消息接收机构</label>
                        <select name="company_id" class="form-control selectpicker" multiple v-validate="'required'"
                                data-vv-as="消息接收机构" v-model="ins_company_id">
                            <option value="">请选择</option>
                            <option :value="item.id" v-for="(item, i) in companyList" :key="i">
                                {{item.name}}({{item.number}})
                            </option>
                        </select>
                        <div class="validateTip" v-show="errors.has('company_id')">
                            {{ errors.first("company_id") }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="blk15"></div>

            <ul class="nav nav-tabs"><!--nav-justified-->
                <li role="presentation" class="active"><a href="#tabs1" data-toggle="tab">附件管理</a></li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade in active" id="tabs1">
                    <div class="panel panel-default mt-15" style="border: none;">
                        <div class="panel-heading">
                            <div class="panel-title">
                                <input type="hidden" name="file_id" id="file_id"/>
                                <b class="div_vm">公告附件(0)</b>
                                <span id="picker" class="div_vm ml-10 pt-5">添加附件</span>
                                <a class="div_vm ml-20" data-toggle="collapse" data-parent="#tabs1"
                                   href="#collapseOne">
                                    收起 <i class="iconfont">&#xe61f;</i>
                                </a>
                            </div>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse in">
                            <div class="panel-body">
                                <ul class="list-group">
                                    <li class="list-group-item clearfix" v-for="(item,i) in attachment" :key="i">
                                        <input type="hidden" name="attachment[path][]" v-model="item.path"/>
                                        <input type="hidden" name="attachment[name][]" v-model="item.name"/>
                                        <div class="row">
                                            <div class="pull-left col-sm-3">
                                                <i class="iconfont">&#xe602;</i>
                                                <span class="div_vm" style="width: 80%;"><span class="textOver">{{item.name}}</span></span>
                                            </div>
                                            <div class="pull-right col-sm-9">
                                                <a :href="imgurl+'/Uploads'+item.path" target="_blank"><i
                                                        class="iconfont">&#xe631;</i> 预览</a>
                                                <a href="javascript:void(0);" class="ml-15"
                                                   @click="deleteFile(item.path)"><i
                                                        class="iconfont">&#xe656;</i> 删除</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>

    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import store from '@/vuex/Store'
import db from '@~/js/request'
require('@@/js/kindeditor/kindeditor-all')
let WebUploader = require('@@/js/webuploader/webuploader')

export default {
  name: 'AddMessage',
  store,
  data () {
    return {
      loading: true,
      id: '',
      msgId: '',
      created_time: '',
      last_time: '',
      type: '',
      country: '',
      title: '',
      content: '',
      attachment: [],
      ins_company_id: [],
      imgurl: window.ajaxBaseUrl,
      companyList: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    setTimeout(function () {
      $('#tabs1').on('hidden.bs.collapse', function () {
        $(this).find('a > i').html('&#xe61e;')
      })
      $('#tabs1').on('show.bs.collapse', function () {
        $(this).find('a > i').html('&#xe61f;')
      })

      if (self.id !== '') {
        self.getDetail()
      } else {
        self.loading = false
        self.createEditor()
        self.createUpload()
      }
      self.getCompany()
    }, 500)
    setTimeout(function () {
      $('.selectpicker').selectpicker()
    }, 1000)
  },
  methods: {
    createUpload () {
      let self = this
      setTimeout(function () {
        let uploader = WebUploader.create({
          auto: true, // 选完文件后，是否自动上传
          swf: 'static/js/webuploader/Uploader.swf', // '/upload/Uploader.swf', // swf文件路径
          server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne', // 文件接收服务端
          fileVal: 'file',
          pick: {
            id: '#picker',
            multiple: true, // 是否多文件上传 默认false
            label: ''
          }, // 选择文件的按钮。可选
          // 允许选择文件格式。
          accept: {
            title: 'image',
            extensions: 'gif,jpg,jpeg,bmp,png,pdf',
            mimeTypes: 'image/*'
          },
          threads: 1,
          fileNumLimit: 10, // 限制上传个数
          fileSingleSizeLimit: 1024 * 1024 * 20, // 限制单个上传图片的大小
          formData: {func: 'notice_publish_attachment'}, // 上传所需参数
          duplicate: true // 重复上传
        })
        uploader.on('uploadSuccess', function (file, res) {
          if (res.status === 1) {
            self.attachment.push({
              path: res.data.path,
              name: res.data.file_name
            })
          } else {
            self.layer.alert(res.msg, {icon: 2})
          }
          setTimeout(function () {
            $('.fileList').mouseenter(function () {
              $(this).find('span:last').show()
            }).mouseleave(function () {
              $(this).find('span:last').hide()
            })
          }, 500)
        })
      }, 1000)
    },
    createEditor () {
      let self = this
      setTimeout(function () {
        window.KindEditor.create('#content', {
          height: 200,
          resizeType: 0, // 2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动
          themesPath: '/static/js/kindeditor/themes/',
          allowPreviewEmoticons: false, // true时鼠标放在表情上可以预览表情。
          allowImageUpload: false, // true时显示图片上传按钮。
          uploadJson: '', // 指定上传文件的服务器端程序
          fileManagerJson: '', // 指定浏览远程图片的服务器端程序
          allowFileManager: true, // true时显示浏览远程服务器按钮。
          imageTabIndex: 1, // 图片弹出层的默认显示标签索引
          extraFileUploadParams: {item_id: 1000, category_id: 1}, // 上传图片、Flash、视音频、文件时，支持添加别的参数一并传到服务器
          filePostName: 'upload', // 指定上传文件form名称
          afterCreate: function () { // 设置编辑器创建后执行的回调函数。
            this.sync()
            self.content = this.html()
          },
          afterBlur: function () { // 编辑器失去焦点(blur)时执行的回调函数。
            this.sync()
            self.content = this.html()
          },
          afterChange: function () { // 编辑器内容发生变化后执行的回调函数。
            this.sync()
            self.content = this.html()
          },
          items: [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
            'insertunorderedlist', '|', 'emoticons', 'image', 'link']
        })
      }, 500)
    },
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('.form-horizontal').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Notice/publishEdit', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/admin/message/list')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    },
    deleteFile (path) {
      let self = this
      let params = new URLSearchParams()
      params.append('func', 'notice_publish_attachment')
      params.append('id', path)
      db.postRequest('/Institution/Upload/deleteAttachment', params).then(res => {
        if (res.status === 1) {
          self.layer.msg(res.msg)
          self.attachment.map((item, i) => {
            if (item.path === path) {
              self.attachment.splice(i, 1)
            }
          })
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.getRequest('Institution/Notice/publishDetail', params).then(res => {
        if (res.status === 1) {
          self.id = res.data.id
          self.type = res.data.type
          self.country = res.data.country
          self.title = res.data.title
          self.content = res.data.content
          self.ins_company_id = res.data.ins_company_id.split(',')
          self.attachment = res.data.attachment
          self.last_time = res.data.last_time
          self.msgId = res.data.number
          self.status = res.data.status
          self.created_time = res.data.created_time
          self.createEditor()
          self.createUpload()
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    getCompany () {
      let self = this
      db.postRequest('Institution/Notice/getCompanyAll', {}).then(res => {
        if (res.status === 1) {
          self.companyList = res.data
        } else {
          console.log(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .panel-heading {
        padding-top:5px;padding-bottom:5px;

        & .panel-title {font-size:14px;}
    }

    .list-group {
        & .list-group-item {
            border-bottom:1px dashed #dedede;

            & .pull-right {display:none; -webkit-transition:all .3s ease 0s;-moz-transition:all .3s ease 0s;-ms-transition:all .3s ease 0s;transition:all .3s ease 0s;}

            &:hover {
                & .pull-right {
                    display:inline-block;
                }
            }
        }
    }
</style>
