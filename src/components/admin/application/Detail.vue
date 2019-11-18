<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">申请详情</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group">
                        <button type="button" class="btn btn-default" @click="$router.back()">
                            <i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row form-horizontal">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-4 control-label">学生姓名</label>
                    <div class="col-sm-8 lh34">MEIRU XSS</div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-4 control-label">所属机构</label>
                    <div class="col-sm-8 lh34">琥珀留学</div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-4 control-label">所属顾问</label>
                    <div class="col-sm-8 lh34">琥珀</div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-4 control-label">申请材料</label>
                    <div class="col-sm-8 lh34">XSSIAXISAJXIAS</div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-4 control-label">学生附件</label>
                    <div class="col-sm-8 lh34">
                        <a href="#" class="cded" data-toggle="modal" data-backdrop="static"
                           data-target="#modalId">打开附件</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix lh34">申请详情</div>
        <div class="clearfix">
            <span class="pull-left pl-45">
                <label class="checkbox">
                    <input type="checkbox" name="all" value="all" @click="selectAll($event)"/>
                    全选
                </label>
            </span>
            <span class="pull-right">
                <button type="button" class="btn btn-default">下载</button>
                <button type="button" class="btn btn-default ml-15 followBtn">跟进</button>
            </span>
        </div>
        <table class="table table-customize" id="myTable">
            <thead>
            <tr>
                <th class="w5"></th>
                <th class="w15">院校名称</th>
                <th class="w15">专业名称</th>
                <th>专业网址</th>
                <th class="w10">申请批次</th>
                <th class="w10">返佣明细</th>
                <th class="w10">返佣渠道</th>
                <th class="w10">申请状态</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><input type="checkbox" name="id[]" value="12"/></td>
                <td>
                    <router-link :to="{path:'/',query:{id:1}}" class="cded">
                        <div>MIT</div>
                        <div>麻省理工</div>
                    </router-link>
                </td>
                <td>
                    <router-link :to="{path:'/',query:{id:2}}">
                        <div>MIT</div>
                        <div>麻省理工</div>
                    </router-link>
                </td>
                <td style="word-break:break-all; word-wrap:break-word;">www.axsoxkasoxkoaskxoaskoxkasoxkaso.com</td>
                <td>2020/9</td>
                <td>6%</td>
                <td>---</td>
                <td>材料提交</td>
            </tr>
            <tr>
                <td><input type="checkbox" name="id[]" value="13"/></td>
                <td>
                    <router-link :to="{path:'/',query:{id:1}}" class="cded">
                        <div>MIT</div>
                        <div>麻省理工</div>
                    </router-link>
                </td>
                <td>
                    <router-link :to="{path:'/',query:{id:2}}">
                        <div>MIT</div>
                        <div>麻省理工</div>
                    </router-link>
                </td>
                <td style="word-break:break-all; word-wrap:break-word;">www.axsoxkasoxkoaskxoaskoxkasoxkaso.com</td>
                <td>2020/9</td>
                <td>6%</td>
                <td>---</td>
                <td>材料提交</td>
            </tr>
            <tr>
                <td colspan="8" v-html="LoadingImg()"></td>
            </tr>
            <tr>
                <td colspan="8" v-html="NoData()"></td>
            </tr>
            </tbody>
        </table>
        <!--附件窗口-->
        <div class="modal fade bs-example-modal-lg" id="modalId">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">附件管理</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-customize">
                            <tbody>
                            <tr>
                                <td class="w10"><input type="checkbox" name="id[]" value=""/></td>
                                <td>附件名称</td>
                                <td>护照</td>
                                <td>3.01MB</td>
                                <td>2014-10-10</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">下载</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <!--跟进状态窗口-->
        <div class="modal fade" id="modalFollow">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">添加跟进</h4>
                    </div>
                    <form action="" method="POST" class="form-horizontal" @submit.prevent="followValidateBeforeSubmit">
                        <div class="modal-body" style="max-height:500px;overflow-y:auto;">
                            <div class="followList">
                                <h4>格拉斯哥大学</h4>
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">材料提交</label>
                                    <div class="col-sm-9">
                                        <select name="" class="form-control selectpicker show-tick" data-size="10"
                                                data-width="fit">
                                            <option value="">请选择</option>
                                            <option value="2">已提交</option>
                                            <option value="1">已接收</option>
                                        </select>
                                        <button type="button" class="btn btn-default certificate" data-id="picker1"
                                                @click="uploadClick('picker1')">上传凭证
                                        </button>
                                        <button type="button" class="btn btn-default" data-toggle="modal"
                                                data-backdrop="static" data-index="1051" data-target="#pasteModal">
                                            从剪贴板添加
                                        </button>
                                        <button type="button" class="btn btn-default" @click="material=!material">添加批注
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group" v-show="material">
                                    <label class="col-sm-3 control-label"></label>
                                    <div class="col-sm-9">
                                        <textarea name="" class="form-control" placeholder="请输入批注内容"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">申请费支付</label>
                                    <div class="col-sm-9">
                                        <select name="" class="form-control selectpicker show-tick" data-size="10"
                                                data-width="fit" v-model.number="applicationFee">
                                            <option value="">请选择</option>
                                            <option value="1">有申请费</option>
                                            <option value="0">无申请费</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" v-show="applicationFee===1">
                                    <label class="col-sm-3 control-label"></label>
                                    <div class="col-sm-9">
                                        <select name="" class="form-control selectpicker show-tick" data-width="fit">
                                            <option value="">请选择</option>
                                            <option value="">英镑</option>
                                            <option value="">美元</option>
                                            <option value="">澳币</option>
                                            <option value="">加币</option>
                                        </select>
                                        <input type="number" min="0" name="" class="form-control div_vm" placeholder="请输入金额"
                                               style="display:inline-block;width:auto;"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">面试情况</label>
                                    <div class="col-sm-9">
                                        <select name="" class="form-control selectpicker show-tick" data-size="10"
                                                data-width="fit" v-model.number="interview">
                                            <option value="">请选择</option>
                                            <option value="0">无需面试</option>
                                            <option value="1">待面试</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" v-show="interview===1">
                                    <label class="col-sm-3 control-label">面试内容</label>
                                    <div class="col-sm-9">
                                        <textarea name="" class="form-control" placeholder="添加面试链接及指南"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">申请结果</label>
                                    <div class="col-sm-9">
                                        <select name="" class="form-control selectpicker show-tick" data-size="10"
                                                data-width="fit">
                                            <option value="">请选择</option>
                                            <option value="1">offer</option>
                                            <option value="0">拒信</option>
                                        </select>
                                        <button type="button" class="btn btn-default annex" data-id="picker3">上传附件
                                        </button>
                                        <button type="button" class="btn btn-default" data-toggle="modal"
                                                data-backdrop="static" data-index="1051" data-target="#pasteModal">
                                            从剪贴板添加
                                        </button>
                                        <button type="button" class="btn btn-default"
                                                @click="applyAnnotation=!applyAnnotation">添加批注
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group" v-show="applyAnnotation">
                                    <label class="col-sm-3 control-label"></label>
                                    <div class="col-sm-9">
                                        <textarea name="" class="form-control" placeholder="请输入批注内容"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">保存</button>
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
                        <div id="pasteImage" style="width:100%;height:400px;" class="bda bgGray" contenteditable="true">
                            <img src="" alt="" class="img-responsive hidden">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">保存</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <!--上传按钮-->
        <div style="position: absolute;left:-9999px;">
            <div id="picker1"></div>
            <div id="picker2"></div>
            <div id="picker3"></div>
            <div id="picker4"></div>
        </div>
    </div>
</template>

<script>
import 'bootstrap-select/dist/js/bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import webupload from '@~/js/webupload'
import db from '@~/js/request'

export default {
  name: 'Detail',
  data () {
    return {
      idArr: [],
      file_id: [],
      material: false, // 材料显示批注
      applyAnnotation: false, // 申请显示批注,
      applicationFee: '', // 申请费
      interview: '' // 面试情况
    }
  },
  mounted () {
    let self = this
    self.eventPaste()
    self.$nextTick(() => {
      $('.selectpicker').selectpicker()
      // 选择申请学校列表
      $('#myTable').on('click', '[type="checkbox"]', function () {
        if ($(this).is(':checked')) {
          self.idArr.push($(this).val())
        } else {
          self.idArr.map((item, index) => {
            if (item === $(this).val()) {
              self.idArr.splice(index, 1)
            }
          })
        }
      })
      // 点击跟进显示弹窗
      $(document).on('click', '.followBtn', function (event) {
        event.preventDefault()
        if (self.idArr.length === 0) {
          self.layer.alert('请选择要操作的编号', {icon: 2})
          return false
        } else {
          $('#modalFollow').modal({
            backdrop: 'static',
            keyboard: true, // 键盘上的 esc 键被按下时关闭模态框
            show: true// 模态框初始化之后就立即显示出来
            // remote:'http://www.'
          })
        }
      })
      setTimeout(() => {
        // 上传凭证、上传附件
        $('.certificate, .annex').each(function () {
          self.formUpload($(this).attr('data-id'))
        })
        $('#modalFollow').on('hidden.bs.modal', function () {
          self.material = false
          self.applyAnnotation = false
          self.applicationFee = ''
          self.interview = ''
        })
      }, 1000)
    })
  },
  methods: {
    followValidateBeforeSubmit () {

    },
    uploadClick (id) {
      document.querySelector('#' + id + ' label').click()
    },
    formUpload (id) {
      webupload(self.file_id, {
        pick: '#' + id,
        accept: {
          title: '',
          extensions: 'pdf',
          mimeTypes: '*!/!*'
        },
        formData: { u_type: id },
        error: (e) => {
          if (e === 'Q_TYPE_DENIED' || e === 'F_EXCEED_SIZE') {
            self.layer.alert('请上传PDF格式的文件', { icon: 2 })
          }
        }
      })
    },
    // 全选
    selectAll (event) {
      let self = this
      let boole = event.target.checked
      $('#myTable [type="checkbox"]').each(function (index, element) {
        element.checked = boole
        if (boole) {
          self.idArr.push($(this).val())
        } else {
          self.idArr = []
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
      params.append('image', file)
      db.postRequest('Institution/Upload/UploadOne', params).then(res => {
        if (res.status === 1) {
          console.log(res.msg)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
      /* let formData = new FormData()
      formData.append('image', file)
      formData.append('submission-type', type)
      let xhr = new XMLHttpRequest()
      xhr.open('POST', '/upload_image_by_paste')
      xhr.onload = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText)
            let tarBox = document.getElementById('tar_box')
            if (isChrome) {
              let img = document.createElement('img')
              img.className = 'my_img'
              img.src = data.store_path
              tarBox.appendChild(img)
            } else {
              let imgList = document.querySelectorAll('#tar_box img')
              let len = imgList.length
              let i
              for (i = 0; i < len; i++) {
                if (imgList[i].className !== 'my_img') {
                  imgList[i].className = 'my_img'
                  imgList[i].src = data.store_path
                }
              }
            }
          } else {
            console.log(xhr.statusText)
          }
        };
      }
      xhr.onerror = function (e) {
        console.log(xhr.statusText)
      }
      xhr.send(formData) */
    }
  },
  components: {},
  watch: {},
  errorCaptured (err, vm, info) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>
