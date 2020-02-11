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
                    <div class="col-sm-8 lh34">{{list.student_name}}</div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-4 control-label">所属机构</label>
                    <div class="col-sm-8 lh34">{{list.company_name}}</div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-4 control-label">所属顾问</label>
                    <div class="col-sm-8 lh34">{{list.user_name}}</div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-4 control-label">申请材料</label>
                    <div class="col-sm-8 lh34">
                        <router-link :to="{path:'/functions/applyInfo/detail',query:{id:list.apply_id}}" class="cded">{{list.apply_num}}</router-link>
                    </div>
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
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-4 control-label">发起时间</label>
                    <div class="col-sm-8 lh34">{{list.created_time}}</div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                    <label class="col-sm-1 control-label">备注</label>
                    <div class="col-sm-11" style="padding-top:7px;">
                        <div contenteditable="true" data-placeholder="请输入备注" id="content" v-text="list.remark" @keyup="remark=$event.target.innerText"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="clearfix">
            <span class="pull-left pl-45">
                <label class="checkbox">
                    <input type="checkbox" name="all" value="all" @click="selectAll($event)"/>
                    全选
                </label>
            </span>
            <span class="pull-right">
                <button type="button" class="btn btn-default" @click="downFile(1)">下载</button>
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
            <tr v-for="(item, i) in list.major_list" :key="i">
                <td><input type="checkbox" name="id[]" :value="item.id"/></td>
                <td>
                    <router-link :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.school_unq_id,tab:1}}" class="cded">
                        {{item.school_name}}
                    </router-link>
                </td>
                <td>
                    <router-link :to="{path:'/functions/schoollist/majordetaila',query:{id:item.major_unq_id}}" class="cded" v-if="list.apply_type===1">
                        {{item.major_name}}
                    </router-link>
                    <router-link :to="{path:'/functions/schoollist/majordetailb',query:{id:item.major_unq_id}}" class="cded" v-if="list.apply_type===2">
                        {{item.major_name}}
                    </router-link>
                </td>
                <td style="word-break:break-all; word-wrap:break-word;">{{item.major_url}}</td>
                <td>{{item.term}}</td>
                <td>{{item.comm}}</td>
                <td>{{item.comm_channel}}</td>
                <td>
                    {{item.apply_status}}
                </td>
            </tr>
            <tr v-if="loading">
                <td colspan="8" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="!loading && list.major_list.length===0">
                <td colspan="8" v-html="NoData"></td>
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
                    <div class="modal-body" style="max-height: 400px;overflow-y: auto;">
                        <table class="table table-customize">
                            <thead>
                            <tr>
                                <th colspan="5">
                                    <label>
                                        <input type="checkbox" name="Fall" />
                                        全选
                                    </label>
                                </th>
                            </tr>
                            </thead>
                            <tbody id="annexId">
                            <tr v-for="(item, i) in list.upload_list" :key="i">
                                <td class="w5"><input type="checkbox" name="id[]" :value="item.id"/></td>
                                <td>{{item.file_name}}</td>
                                <td>{{item.file_type}}</td>
                                <td>{{item.file_size}}</td>
                                <td>{{item.add_time}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="downFile(2)">下载</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <!--跟进状态窗口-->
        <div class="modal fade bs-example-modal-lg" id="modalFollow">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">添加跟进</h4>
                    </div>
                    <form action="" id="followFormData" method="POST" class="form-horizontal" @submit.prevent="followValidateBeforeSubmit">
                        <div class="modal-body" style="max-height:500px;overflow-y:auto;">
                            <div class="followList" v-for="(item, i) in list.major_list" :key="i">
                                <div v-for="(items, k) in idArr" :key="k" v-if="item.id === parseInt(items)">
                                    <input type="hidden" name="id[]" :value="item.id" />
                                    <div class="pb-15">
                                        <h4>{{item.school_name}}</h4>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">材料提交</label>
                                        <div class="col-sm-9">
                                            <div class="clearfix">
                                                <select name="material_status[]" class="form-control selectpicker show-tick" data-container="body" data-size="10"
                                                        data-width="fit" v-model="item.material_status">
                                                    <option value="">请选择</option>
                                                    <option value="1">已提交</option>
                                                    <option value="2">已接收</option>
                                                </select>
                                                <input type="hidden" name="material_uploads[]" v-model="item.material_uploads" />
                                                <button type="button" class="btn btn-default" @click="uploadClick(i)">上传凭证
                                                </button>
                                                <button type="button" class="btn btn-default" data-toggle="modal"
                                                        data-backdrop="static" data-index="1051" data-target="#pasteModal" @click="pasteObj=[i, 'material_uploads']">
                                                    从剪贴板添加
                                                </button>
                                                <button type="button" class="btn btn-default addAnnotation">添加批注</button>
                                            </div>
                                            <!--图片列表1-->
                                            <div :id="'fileList_'+i" class="webUploader pt-10">
                                                <div :id="'EDIT_WU_FILE'+u" class="image-item " :fid="item_p" v-for="(item_p, u) in item.material_uploads" :key="u">
                                                    <img :src="siteUrl+item_p" width="100" height="100" v-if="fileSuffix(item_p)!=='pdf'" />
                                                    <img src="../../../../static/images/pdf.jpg" width="100" height="100" v-if="fileSuffix(item_p)==='pdf'" />
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
                                            <textarea name="material_remark[]" v-model="item.material_remark" class="form-control" placeholder="请输入批注内容"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">申请费支付</label>
                                        <div class="col-sm-9">
                                            <select name="pay_has[]" class="form-control selectpicker show-tick" data-container="body" data-size="10"
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
                                                <select name="pay_unit[]" class="form-control selectpicker show-tick" data-container="body" data-width="fit" v-model="item.pay_unit">
                                                    <option value="">请选择</option>
                                                    <option value="UK">英镑</option>
                                                    <option value="US">美元</option>
                                                    <option value="AU">澳币</option>
                                                    <option value="CA">加币</option>
                                                </select>
                                                <input type="text" :name="'pay_fee['+i+']'" class="form-control div_vm" placeholder="请输入金额"
                                                       style="display:inline-block;width:100px;" v-model="item.pay_fee" v-validate="'required|money'" data-vv-as="金额" />
                                                <input type="hidden" name="pay_uploads[]" v-model="item.pay_uploads" />
                                                <button type="button" class="btn btn-default" @click="uploadClick('s'+i)">上传凭证</button>
                                                <div class="validateTip" v-show="errors.has('pay_fee['+i+']')">
                                                    {{ errors.first('pay_fee['+i+']') }}
                                                </div>
                                            </div>
                                            <!--图片列表2-->
                                            <div :id="'fileList_s'+i" class="webUploader pt-10">
                                                <div :id="'EDIT_WU_FILE'+u" class="image-item " :fid="item_p" v-for="(item_p, u) in item.pay_uploads" :key="u">
                                                    <img :src="siteUrl+item_p" width="100" height="100" v-if="fileSuffix(item_p)!=='pdf'" />
                                                    <img src="../../../../static/images/pdf.jpg" width="100" height="100" v-if="fileSuffix(item_p)==='pdf'" />
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
                                            <select name="interview_status[]" class="form-control selectpicker show-tick" data-container="body" data-size="10"
                                                    data-width="fit" v-model.number="item.interview_status">
                                                <option value="">请选择</option>
                                                <option value="2">无需面试</option>
                                                <option value="1">待面试</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="item.interview_status===1">
                                        <label class="col-sm-3 control-label"></label>
                                        <div class="col-sm-9">
                                            <textarea name="interview_remark[]" v-model="item.interview_remark" class="form-control" placeholder="添加面试链接及指南"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">申请结果</label>
                                        <div class="col-sm-9">
                                            <div class="clearfix">
                                                <select name="res_status[]" class="form-control selectpicker show-tick" data-container="body" data-size="10"
                                                        data-width="fit" v-model="item.res_status">
                                                    <option value="">请选择</option>
                                                    <option value="1">offer</option>
                                                    <option value="2">拒信</option>
                                                </select>
                                                <input type="hidden" name="res_uploads[]" v-model="item.res_uploads" />
                                                <button type="button" class="btn btn-default" @click="uploadClick('f'+i)">上传附件</button>
                                                <button type="button" class="btn btn-default" data-toggle="modal"
                                                        data-backdrop="static" data-index="1051" data-target="#pasteModal" @click="pasteObj=[i, 'res_uploads']">
                                                    从剪贴板添加
                                                </button>
                                                <button type="button" class="btn btn-default addAnnotation">添加批注</button>
                                            </div>
                                            <!--图片列表3-->
                                            <div :id="'fileList_f'+i" class="webUploader pt-10">
                                                <div :id="'EDIT_WU_FILE'+u" class="image-item " :fid="item_p" v-for="(item_p, u) in item.res_uploads" :key="u">
                                                    <img :src="siteUrl+item_p" width="100" height="100" v-if="fileSuffix(item_p)!=='pdf'" />
                                                    <img src="../../../../static/images/pdf.jpg" width="100" height="100" v-if="fileSuffix(item_p)==='pdf'" />
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
                                            <textarea name="res_remark[]" v-model="item.res_remark" class="form-control" placeholder="请输入批注内容"></textarea>
                                        </div>
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
                        <div id="pasteImage" style="width:100%;height:400px;" class="bda bgGray" contenteditable="true"></div>
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
            <div :id="'picker'+i" v-for="(item, i) in list.major_list" :key="i"></div>
            <div :id="'pickerf'+k" v-for="(item, k) in list.major_list" :key="'f'+k"></div>
            <div :id="'pickers'+n" v-for="(item, n) in list.major_list" :key="'s'+n"></div>
        </div>
        <a href="" id="saveFile"></a>
    </div>
</template>
<script>
import '@~/js/VeeValidateConfig'
import 'bootstrap-select/dist/js/bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import webupload from '@~/js/webupload'
import db from '@~/js/request'

export default {
  name: 'Detail',
  data () {
    return {
      loading: true,
      id: '',
      siteUrl: window.ajaxBaseUrl,
      idArr: [],
      fArr: [],
      file_id: [],
      list: {},
      pasteObj: [],
      remark: ''
    }
  },
  beforeDestroy () {
    let self = this
    let params = new URLSearchParams()
    if (self.remark !== '' && self.list.remark !== self.remark) {
      params.append('id', self.id)
      params.append('remark', self.remark)
      db.postRequest('/Institution/Apply/admOrderRemarkSave', params).then(res => {
        console.log(res.msg)
      })
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.eventPaste()
    self.getDetail()
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
      // 附件列表
      $('#annexId').on('click', '[type="checkbox"]', function () {
        if ($(this).is(':checked')) {
          self.fArr.push($(this).val())
        } else {
          self.fArr.map((item, index) => {
            if (item === $(this).val()) {
              self.fArr.splice(index, 1)
            }
          })
        }
      })
      // 附件列表全选
      $(document).on('click', '[name="Fall"]', function () {
        let boole = $(this).is(':checked')
        $('#annexId [type="checkbox"]').each(function () {
          $(this)[0].checked = boole
          if (boole) {
            self.fArr.push($(this).val())
          } else {
            self.fArr = []
          }
        })
      })
      // 材料提交显示
      $(document).on('click', '.addAnnotation', function () {
        let $this = $(this).parents('.form-group').next()
        if ($this.is(':hidden')) {
          $this.removeClass('hidden')
          $this.find('textarea').removeAttr('disabled')
        } else {
          $this.addClass('hidden')
          $this.find('textarea').attr('disabled', 'disabled')
        }
      })
      // 点击跟进显示弹窗
      $(document).on('click', '.followBtn', function () {
        if (self.idArr.length === 0) {
          self.layer.alert('请选择要操作的编号', {icon: 2})
          return false
        } else {
          $('.selectpicker').selectpicker('refresh')
          $('#modalFollow').modal({
            backdrop: 'static',
            keyboard: true,
            show: true
          })
        }
      })
      $('#pasteModal').on('hidden.bs.modal', function () {
        self.pasteObj = []
      })
      setTimeout(() => {
        // 上传凭证、上传附件
        self.list.major_list.map((item, i) => {
          self.formUpload(i, item.material_uploads)
          self.formUpload('s' + i, item.pay_uploads)
          self.formUpload('f' + i, item.res_uploads)
        })
      }, 3000)
    })
  },
  methods: {
    // 获取详情
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.postRequest('Institution/Apply/admOrderDetails', params).then(res => {
        if (res.status === 1) {
          self.list = res.data
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    },
    followValidateBeforeSubmit () {
      let self = this
      let formData = $('#followFormData').serializeArray()
      let params = new URLSearchParams()
      formData.map(item => {
        params.append(item.name, item.value)
      })
      db.postRequest('Institution/Apply/admOrderDetailsSave', params).then(res => {
        if (res.status === 1) {
          $('#modalFollow').modal('hide')
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
    uploadClick (id) {
      document.querySelector('#picker' + id + ' label').click()
    },
    formUpload (id, field) {
      let self = this
      webupload(field, {
        pick: '#picker' + id,
        accept: {
          title: '',
          extensions: 'pdf,jpg,png',
          mimeTypes: '*!/!*'
        },
        fileSingleSizeLimit: 1024 * 1024 * 2,
        formData: { func: 'apply_order', order_id: self.id },
        uploadSuccess: (file, response) => {
          let $this = $('#' + file.id)
          $this.find('.image-panel').show() // 显示图片时
          $this.find('.data').text('上传成功')
          $this.attr('fid', response.data)
          field.push(response.data)
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
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 保存剪切板图片
    savePasteImg () {
      let self = this
      $('#pasteImage img').each(function () {
        self.list.major_list[self.pasteObj[0]][self.pasteObj[1]].push($(this).attr('data-url'))
      })
      $('#pasteImage').html('')
      $('#pasteModal').modal('hide')
    },
    // 打包rar
    downFile (type) {
      let self = this
      let ids = ''
      if (self.idArr.length === 0 && type === 1) {
        self.layer.alert('请选择要操作的编号', {icon: 2})
        return false
      }
      if (self.fArr.length === 0 && type === 2) {
        self.layer.alert('请选择要操作的编号', {icon: 2})
        return false
      }
      let a = document.querySelector('#saveFile')
      if (type === 1) {
        ids = self.idArr
      } else {
        ids = self.fArr
      }
      a.href = window.ajaxBaseUrl + '/Institution/Apply/admOrderDownload?ids=' + ids + '&token=' + self.$cookies.get('token')
      a.target = '_blank'
      a.click()
      $('[type="checkbox"]').each(function () {
        $(this)[0].checked = false
      })
      self.idArr = []
      self.fArr = []
    }
  }
}
</script>

<style scoped>

</style>
