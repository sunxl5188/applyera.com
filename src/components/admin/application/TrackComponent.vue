<template>
    <div>
        <div class="modal fade bs-example-modal-lg" id="modalFollow">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">添加跟进</h4>
                    </div>
                    <form action="" id="followFormData" method="POST" class="form-horizontal"
                          @submit.prevent="followValidateBeforeSubmit">
                        <div class="modal-body" style="max-height:500px;overflow-y:auto;">
                            <div class="followList" v-for="(item, i) in majorList" :key="i">
                                <input type="hidden" :name="'id['+i+']'" :value="item.id"/>
                                <div class="pb-15">
                                    <h4>{{item.school_name}}</h4>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">材料提交</label>
                                    <div class="col-sm-9">
                                        <div class="clearfix">
                                            <select :name="'material_status['+i+']'"
                                                    class="form-control selectpicker show-tick" data-container="body"
                                                    data-size="10"
                                                    data-width="fit" v-model="item.material_status">
                                                <option value="">请选择</option>
                                                <option value="1">已提交</option>
                                                <option value="2">已接收</option>
                                            </select>
                                            <input type="hidden" :name="'material_uploads['+i+']'"
                                                   v-model="item.material_uploads"/>
                                            <button type="button" class="btn btn-default" @click="uploadClick(i)">上传凭证
                                            </button>
                                            <button type="button" class="btn btn-default" data-toggle="modal"
                                                    data-backdrop="static" data-index="1051" data-target="#pasteModal"
                                                    @click="pasteObj=[i, 'material_uploads']">
                                                从剪贴板添加
                                            </button>
                                            <button type="button" class="btn btn-default addAnnotation">添加批注</button>
                                        </div>
                                        <!--图片列表1-->
                                        <div :id="'fileList_'+i" class="webUploader pt-10">
                                            <div :id="'EDIT_WU_FILE'+u" class="image-item " :fid="item_p"
                                                 v-for="(item_p, u) in item.material_uploads" :key="u">
                                                <img :src="siteUrl+item_p" width="100" height="100"
                                                     v-if="fileSuffix(item_p)!=='pdf'"/>
                                                <img src="../../../../static/images/pdf.jpg" width="100" height="100"
                                                     v-if="fileSuffix(item_p)==='pdf'"/>
                                                <div class="image-panel" style="display: block;">
                                                    <span class="data">上传成功</span>
                                                    <a href="javascript:void(0);" class="cancel">删除</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" :class="{'hidden':item.material_remark===''}">
                                    <label class="col-sm-3 control-label"></label>
                                    <div class="col-sm-9">
                                        <textarea :name="'material_remark['+i+']'" v-model="item.material_remark"
                                                  class="form-control" placeholder="请输入批注内容"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">申请费支付</label>
                                    <div class="col-sm-9">
                                        <select :name="'pay_has['+i+']'" class="form-control selectpicker show-tick"
                                                data-container="body" data-size="10"
                                                data-width="fit" v-model.number="item.pay_has">
                                            <option value="">请选择</option>
                                            <option value="1">有申请费</option>
                                            <option value="2">无申请费</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" v-show="item.pay_has===1">
                                    <label class="col-sm-3 control-label"></label>
                                    <div class="col-sm-9">
                                        <div class="clearfix">
                                            <select :name="'pay_unit['+i+']'"
                                                    class="form-control selectpicker show-tick" data-container="body"
                                                    data-width="fit" v-model="item.pay_unit">
                                                <option value="">请选择</option>
                                                <option value="UK">英镑</option>
                                                <option value="US">美元</option>
                                                <option value="AU">澳币</option>
                                                <option value="CA">加币</option>
                                            </select>
                                            <input type="text" :name="'pay_fee['+i+']'" class="form-control div_vm"
                                                   placeholder="请输入金额"
                                                   style="display:inline-block;width:100px;" v-model="item.pay_fee"
                                                   v-validate="'required|money'" data-vv-as="金额"/>
                                            <input type="hidden" :name="'pay_uploads['+i+']'"
                                                   v-model="item.pay_uploads"/>
                                            <button type="button" class="btn btn-default" @click="uploadClick('s'+i)">
                                                上传凭证
                                            </button>
                                            <div class="validateTip" v-show="errors.has('pay_fee['+i+']')">
                                                {{ errors.first('pay_fee['+i+']') }}
                                            </div>
                                        </div>
                                        <!--图片列表2-->
                                        <div :id="'fileList_s'+i" class="webUploader pt-10">
                                            <div :id="'EDIT_WU_FILE'+u" class="image-item " :fid="item_p"
                                                 v-for="(item_p, u) in item.pay_uploads" :key="u">
                                                <img :src="siteUrl+item_p" width="100" height="100"
                                                     v-if="fileSuffix(item_p)!=='pdf'"/>
                                                <img src="../../../../static/images/pdf.jpg" width="100" height="100"
                                                     v-if="fileSuffix(item_p)==='pdf'"/>
                                                <div class="image-panel" style="display: block;">
                                                    <span class="data">上传成功</span>
                                                    <a href="javascript:void(0);" class="cancel">删除</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">面试情况</label>
                                    <div class="col-sm-9">
                                        <select :name="'interview_status['+i+']'"
                                                class="form-control selectpicker show-tick" data-container="body"
                                                data-size="10"
                                                data-width="fit" v-model.number="item.interview_status">
                                            <option value="">请选择</option>
                                            <option value="1">待面试</option>
                                            <option value="2">无需面试</option>
                                            <option value="3">已完成</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" v-show="item.interview_status===1">
                                    <label class="col-sm-3 control-label"></label>
                                    <div class="col-sm-9">
                                        <textarea :name="'interview_remark['+i+']'" v-model="item.interview_remark"
                                                  class="form-control" placeholder="添加面试链接及指南"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">申请结果</label>
                                    <div class="col-sm-9">
                                        <div class="clearfix">
                                            <select :name="'res_status['+i+']'"
                                                    class="form-control selectpicker show-tick" data-container="body"
                                                    data-size="10"
                                                    data-width="fit" v-model="item.res_status">
                                                <option value="">请选择</option>
                                                <option value="1">offer</option>
                                                <option value="2">拒信</option>
                                            </select>
                                            <input type="hidden" :name="'res_uploads['+i+']'"
                                                   v-model="item.res_uploads"/>
                                            <button type="button" class="btn btn-default" @click="uploadClick('f'+i)">
                                                上传附件
                                            </button>
                                            <button type="button" class="btn btn-default" data-toggle="modal"
                                                    data-backdrop="static" data-index="1051" data-target="#pasteModal"
                                                    @click="pasteObj=[i, 'res_uploads']">
                                                从剪贴板添加
                                            </button>
                                            <button type="button" class="btn btn-default addAnnotation">添加批注</button>
                                        </div>
                                        <!--图片列表3-->
                                        <div :id="'fileList_f'+i" class="webUploader pt-10">
                                            <div :id="'EDIT_WU_FILE'+u" class="image-item " :fid="item_p"
                                                 v-for="(item_p, u) in item.res_uploads" :key="u">
                                                <img :src="siteUrl+item_p" width="100" height="100"
                                                     v-if="fileSuffix(item_p)!=='pdf'"/>
                                                <img src="../../../../static/images/pdf.jpg" width="100" height="100"
                                                     v-if="fileSuffix(item_p)==='pdf'"/>
                                                <div class="image-panel" style="display: block;">
                                                    <span class="data">上传成功</span>
                                                    <a href="javascript:void(0);" class="cancel">删除</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" :class="{'hidden':item.material_remark===''}">
                                    <label class="col-sm-3 control-label"></label>
                                    <div class="col-sm-9">
                                        <textarea :name="'res_remark['+i+']'" v-model="item.res_remark"
                                                  class="form-control" placeholder="请输入批注内容"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">保存</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!--剪贴板-->
        <div class="modal fade" id="pasteModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">剪贴板上传</h4>
                    </div>
                    <div class="modal-body">
                        <div id="pasteImage" style="width:100%;height:400px;" class="bda bgGray"
                             contenteditable="true"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="savePasteImg">保存</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <!--上传按钮-->
        <div style="position: absolute;left:-9999px;">
            <div :id="'picker'+i" v-for="(item, i) in majorList" :key="i"></div>
            <div :id="'pickerf'+k" v-for="(item, k) in majorList" :key="'f'+k"></div>
            <div :id="'pickers'+n" v-for="(item, n) in majorList" :key="'s'+n"></div>
        </div>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import 'bootstrap-select/dist/js/bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import webupload from '@~/js/webupload'
import db from '@~/js/request'

export default {
  name: 'TrackComponent',
  props: {
    id: {
      type: String,
      default: ''
    },
    majorList: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      siteUrl: window.ajaxBaseUrl,
      pasteObj: []
    }
  },
  mounted () {
    let self = this
    $('.selectpicker').selectpicker()
    self.eventPaste()
    self.majorList.map((item, i) => {
      self.formUpload(i, item.material_uploads)
      self.formUpload('s' + i, item.pay_uploads)
      self.formUpload('f' + i, item.res_uploads)
    })
    $('#modalFollow').on('hidden.bs.modal', function () {
      self.$parent.$data.component = ''
    })
  },
  methods: {
    followValidateBeforeSubmit () {
      let self = this
      let formData = $('#followFormData').serializeArray()
      let params = new URLSearchParams()
      formData.map(item => {
        params.append(item.name, item.value)
      })
      db.postRequest('Institution/Apply/admOrderDetailsSave', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, { icon: 1 }, function (i) {
            self.layer.close(i)
            $('#modalFollow').modal('hide')
          })
        } else {
          self.layer.alert(res.msg, { icon: 2 })
        }
      })
    },
    uploadClick (id) {
      document.querySelector('#picker' + id + ' label').click()
    },
    formUpload (id, field) {
      let self = this
      webupload({
        assign: field,
        pick: { id: '#picker' + id, multiple: false },
        accept: {
          title: '',
          extensions: 'pdf,jpg,png',
          mimeTypes: '*!/!*'
        },
        fileSingleSizeLimit: 1024 * 1024 * 2,
        formData: { func: 'apply_order', order_id: self.id },
        uploadSuccess: (file, response) => {
          if (response.status === 1) {
            let $this = $('#' + file.id)
            $this.find('.image-panel').show() // 显示图片时
            $this.find('.data').text('上传成功')
            $this.attr('fid', response.data)
            field.push(response.data)
          } else {
            self.layer.alert(response.msg, { icon: 2 })
          }
        },
        error: (e) => {
          if (e === 'Q_TYPE_DENIED') {
            self.layer.alert('请上传pdf,jpg,png格式的文件', { icon: 2 })
          }
          if (e === 'F_EXCEED_SIZE') {
            self.layer.alert('上传文件已超出2MB大小限制', { icon: 2 })
          }
        }
      })
    },
    // 粘贴图片上传
    eventPaste () {
      let self = this
      document.querySelector('#pasteImage').addEventListener('paste', function (event) {
        if (event.clipboardData || event.originalEvent) {
          // not for ie11  某些chrome版本使用的是event.originalEvent
          let clipboardData = (event.clipboardData || event.originalEvent.clipboardData)
          if (clipboardData.items) {
            // for chrome
            let items = clipboardData.items
            let len = items.length
            let blob = null

            // 阻止默认行为即不让剪贴板内容在div中显示出来
            event.preventDefault()

            // 在items里找粘贴的image,据上面分析,需要循环
            for (let i = 0; i < len; i++) {
              if (items[i].type.indexOf('image') !== -1) {
                // getAsFile() 此方法只是living standard firefox ie11 并不支持
                blob = items[i].getAsFile()
              }
            }
            if (blob !== null) {
              let reader = new FileReader()
              reader.onload = function (event) {
                // event.target.result 即为图片的Base64编码字符串
                let base64Str = event.target.result
                // 可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
                self.uploadImgFromPaste(base64Str)
              }
              reader.readAsDataURL(blob)
            }
          } else {
            // for firefox
            self.imgList()
          }
        } else {
          // for ie11
          self.imgList()
        }
      })
    },
    imgList () {
      let self = this
      setTimeout(function () {
        // 设置setTimeout的原因是为了保证图片先插入到div里，然后去获取值
        let imgList = document.querySelectorAll('#tar_box img')
        let len = imgList.length
        let srcStr = ''
        let i
        for (i = 0; i < len; i++) {
          if (imgList[i].className !== 'my_img') {
            // 如果是截图那么srcStr就是base64 如果是复制的其他网页图片那么srcStr就是此图片在别人服务器的地址
            srcStr = imgList[i].src
          }
        }
        self.uploadImgFromPaste(srcStr)
      }, 1)
    },
    uploadImgFromPaste (file) {
      let self = this
      let params = new URLSearchParams()
      let img = document.createElement('img')
      params.append('func', 'apply_order')
      params.append('order_id', self.id)
      params.append('base64_img', file)
      db.postRequest('/Institution/Upload/uploadOne', params).then(res => {
        if (res.status === 1) {
          img.src = window.ajaxBaseUrl + res.data
          img.setAttribute('data-url', res.data)
          img.className = 'img-responsive'
          $('#pasteImage').append(img)
        } else {
          self.layer.alert(res.msg, { icon: 2 })
        }
      })
    },
    // 保存剪切板图片
    savePasteImg () {
      let self = this
      let i = self.pasteObj[0]
      let name = self.pasteObj[1]
      $('#pasteImage img').each(function () {
        self.majorList[i][name].push($(this).attr('data-url'))
      })
      $('#pasteImage').html('')
      $('#pasteModal').modal('hide')
    }
  }
}
</script>

<style scoped>

</style>
