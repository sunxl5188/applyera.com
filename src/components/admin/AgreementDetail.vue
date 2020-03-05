<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">添加/编辑</div>
                </div>
            </div>
        </div>
        <form id="agreement" method="POST" class="form-horizontal" autocomplete="off"
              @submit.prevent="validateBeforeSubmit">
            <input type="hidden" name="id" :value="id" v-if="id"/>
            <div class="form-group">
                <label class="col-sm-2 control-label">协议标题</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" name="title" placeholder="请输入标题" v-model="title"
                           v-validate="'required'" data-vv-as="协议标题">
                    <div class="validateTip" v-show="errors.has('title')">
                        {{ errors.first('title') }}
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">协议内容</label>
                <div class="col-sm-10">
                    <textarea name="content" id="agreement-content" class="form-control" v-model="content"
                              placeholder="请输入内容"></textarea>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2">
                    <button type="submit" class="btn btn-primary">保存</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import * as _ from 'lodash'
import '@~/js/VeeValidateConfig'
import db from '@~/js/request'

require('@@/js/kindeditor/kindeditor-all')

export default {
  name: 'AgreementDetail',
  data () {
    return {
      id: '',
      title: '',
      content: ''
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.$nextTick(() => {
      if (self.id !== '') {
        self.getDetail(self.id)
      } else {
        self.createEditor()
      }
    })
  },
  methods: {
    getDetail (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.postRequest('/Institution/Service/details', params).then(res => {
        if (res.status === 1) {
          self.title = res.data.title
          self.content = res.data.content
          self.createEditor()
        } else {
          self.layer.alert(res.msg, { icon: 2 })
        }
      })
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#agreement').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('/Institution/Service/save', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, { icon: 1 }, function (i) {
                self.layer.close(i)
              })
            } else {
              self.layer.alert(res.msg, { icon: 2 })
            }
          })
        }
      })
    },
    createEditor () {
      let self = this
      _.delay(() => {
        window.KindEditor.create('#agreement-content', {
          height: 400,
          resizeType: 0, // 2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动
          basePath: '/static/js/kindeditor/',
          allowPreviewEmoticons: false, // true时鼠标放在表情上可以预览表情。
          allowImageUpload: false, // true时显示图片上传按钮。
          uploadJson: '', // 指定上传文件的服务器端程序
          fileManagerJson: '', // 指定浏览远程图片的服务器端程序
          allowFileManager: true, // true时显示浏览远程服务器按钮。
          imageTabIndex: 1, // 图片弹出层的默认显示标签索引
          extraFileUploadParams: { item_id: 1000, category_id: 1 }, // 上传图片、Flash、视音频、文件时，支持添加别的参数一并传到服务器
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
          }
        })
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
