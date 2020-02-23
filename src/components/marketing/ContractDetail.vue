<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle div_vm">合同详情</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <button type="button" class="btn btn-default" @click="startUpload"><i class="iconfont">&#xe640;</i>本地上传
                    </button>
                    <button type="button" class="btn btn-default"><i class="iconfont">&#xe637;</i>选择模板</button>
                    <button type="button" class="btn btn-default" @click="saveContract"><i class="iconfont">&#xe637;</i>保存
                    </button>
                    <button type="button" class="btn btn-default" @click="$router.back()"><i
                            class="iconfont">&#xe64f;</i>返回
                    </button>
                </div>
            </div>
        </div>
        <div class="clearfix">
            <UeEditor :config="config" :vlaue="value" @UeCallback="UeCallback"/>
        </div>
        <div style="position: absolute;left: -9999px;">
            <div id="contractPicker"></div>
        </div>
    </div>
</template>

<script>
import * as _ from 'lodash'
import webupload from '@~/js/webupload'
import UeEditor from '@#/shared/UeEditor'

export default {
  name: 'ContractDetail',
  data () {
    return {
      UE: '',
      value: '',
      fid: '',
      config: {
        wordCount: false,
        initialFrameHeight: 400,
        enableAutoSave: false
      },
      content: ''
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      _.delay(() => {
        webupload({
          assign: self.fid,
          pick: {
            id: '#contractPicker',
            multiple: false
          },
          accept: {
            title: '',
            extensions: 'doc,docx',
            mimeTypes: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          },
          formData: {func: 'yht_temp'},
          uploadSuccess: (file, res) => { },
          uploadFinished: (msg) => {
            if (msg === '') {
              self.layer.alert('上传成功！', {icon: 1})
            } else {
              self.layer.alert(msg, {icon: 2})
            }
          },
          error: (e) => {
            if (e === 'Q_TYPE_DENIED') {
              self.layer.alert('文件类型不正确！', {icon: 2})
            }
            if (e === 'F_EXCEED_SIZE') {
              self.layer.alert('文件大小超过2MB限制！', {icon: 2})
            }
          }
        })
      }, 10)
    })
  },
  methods: {
    startUpload () {
      $('#contractPicker label').click()
    },
    UeCallback (data) {
      this.content = data
      console.log(data)
    },
    saveContract () {}
  },
  components: {UeEditor},
  watch: {}
}
</script>
