<template>
    <div id="bankWrap">
        <form id="bankForm" class="form-horizontal" @submit.prevent="validateSubmit">
            <ul class="nav nav-tabs"><!--nav-justified-->
                <li role="presentation" class="active"><a href="#tabs1" data-toggle="tab">财务信息</a></li>
                <li role="presentation"><a href="#tabs2" data-toggle="tab">附件管理</a></li>
                <li role="presentation"><a href="#tabs3" data-toggle="tab">上传LOGO</a></li>
            </ul>
            <div class="tab-content pt-15">
                <div class="tab-pane fade in active" id="tabs1">
                    <div class="clearfix form-inline pb-15">
                        <span>银行账户名称</span>
                        <input type="text" name="bank_account" class="form-control" v-model="bankAccount"
                               placeholder="请输入收款方名称">
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered table-customize">
                            <thead>
                            <tr>
                                <th width="5%"><i class="handPower iconfont cded" @click="addBank">&#xe622;</i></th>
                                <th width="15%"><font class="cf00">*</font>开户银行</th>
                                <th width="15%"><font class="cf00">*</font>帐户名称</th>
                                <th width="25%"><font class="cf00">*</font>银行卡号</th>
                                <th><font class="cf00">*</font>银行卡开户行信息</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(banks, i) in oldBank" :key="i" class="bankList">
                                <td>
                                    <i class="handPower iconfont cded" @click="deleteBank(i)">&#xe61f5;</i>
                                    <input type="hidden" :name="'bank_id['+i+']'" :value="banks.id"
                                           v-validate="'required'" data-vv-as="开户银行"/>
                                </td>
                                <td>
                                    <input type="text" :name="'bank_name['+i+']'" class="form-control"
                                           :value="banks.name" readonly>
                                </td>
                                <td>
                                    <input type="text" :name="'bank_account['+i+']'" class="form-control"
                                           :value="banks.account" readonly>
                                </td>
                                <td>
                                    <input type="text" :name="'bank_card_num['+i+']'" class="form-control"
                                           :value="banks.card_num" readonly>
                                </td>
                                <td>
                                    <input type="text" :name="'bank_card_info['+i+']'" class="form-control"
                                           :value="banks.card_info" readonly>
                                </td>
                            </tr>

                            <tr v-for="(item, i) in bankList" :key="i" class="bankList">
                                <td>
                                    <i class="handPower iconfont cded" @click="deleteBank2(i)">&#xe61f5;</i>
                                    <input type="hidden" :name="item.bank_id" v-validate="'required'"
                                           data-vv-as="开户银行"/>
                                </td>
                                <td>
                                    <div class="form-search">
                                        <i class="iconfont" data-toggle="modal" data-target="#modal-id"
                                           @click="openLayId(item.bank_id, item.bank_name)">&#xe618;</i>
                                        <input type="text" :name="item.bank_name" class="form-control" readonly
                                               data-toggle="modal" data-target="#modal-id"
                                               @click="openLayId(item.bank_id, item.bank_name)">
                                        <div class="validateTip" v-show="errors.has(item.bank_id)">
                                            {{ errors.first(item.bank_id) }}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <input type="text" :name="item.bank_account" class="form-control"
                                           v-validate="'required'" data-vv-as="帐户名称">
                                    <div class="validateTip" v-show="errors.has(item.bank_account)">
                                        {{ errors.first(item.bank_account) }}
                                    </div>
                                </td>
                                <td>
                                    <input type="text" :name="item.bank_card_num" class="form-control"
                                           v-validate="'required'" data-vv-as="银行卡号">
                                    <div class="validateTip" v-show="errors.has(item.bank_card_num)">
                                        {{ errors.first(item.bank_card_num) }}
                                    </div>
                                </td>
                                <td>
                                    <input type="text" :name="item.bank_card_info" class="form-control"
                                           v-validate="'required'" data-vv-as="银行卡开户行信息">
                                    <div class="validateTip" v-show="errors.has(item.bank_card_info)">
                                        {{ errors.first(item.bank_card_info) }}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="tab-pane fade" id="tabs2" style="display: block;height: 0;overflow: hidden;">
                    <div class="panel-group" id="accordion">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <span class="font16 div_vm mr-10">营业执照</span>
                                    <div class="div_vm">
                                        <span id="picker">添加附件</span>
                                        <input type="hidden" name="file_id" v-model="file_id"/>
                                    </div>
                                    <a class="ml-10 div_vm" data-toggle="collapse" data-parent="#accordion"
                                       href="#collapseOne">
                                        <span>收起</span>
                                        <i class="iconfont">&#xe61f;</i>
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseOne" class="panel-collapse collapse in">
                                <div class="panel-body">
                                    <div class="clearfix fileList" v-for="(item,i) in picList" :key="i">
                                    <span style="display: inline-block;width: 25%;">
                                        <i class="iconfont">&#xe602;</i>
                                        <span style="vertical-align: middle;display: inline-block;width: 85%;overflow: hidden;-ms-text-overflow: ellipsis;text-overflow: ellipsis;">{{item.file_name}}</span>
                                    </span>
                                        <span style="display: none;">
                                        <a :href="baseUrl +'/Uploads'+ item.path" target="_blank" class="ml-15"><i
                                                class="iconfont">&#xe631;</i>预览</a>
                                        <a href="javascript:void(0);" class="ml-15" @click="deleteFile(item.id)"><i
                                                class="iconfont">&#xe656;</i>删除</a>
                                    </span>
                                    </div>
                                    <div class="clearfix" v-if="picList.length===0" v-html="NoData()"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="tabs3" style="display: block;height: 0;overflow: hidden;">
                    <div class="clearfix" v-if="LOGO.path">
                        <a href="#" class="thumbnail" style="max-width: 200px;">
                            <img :src="'//'+LOGO.path" alt="">
                        </a>
                    </div>
                    <div class="div_vm">
                        <span id="picker2">上传LOGO</span>
                        <input type="hidden" name="logo" v-model="LOGO.id"/>
                    </div>
                </div>

            </div>
            <!--*************************************-->
            <div class="modal fade bs-example-modal-lg" id="modal-id">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title text-center">选择开户银行</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-inline" role="form">
                                <div class="form-group">
                                    <label>银行名称</label>
                                    <input type="text" class="form-control" name="keyword" v-model="keyword"
                                           placeholder="请输入银行名称">
                                </div>
                                <button type="button" class="btn btn-primary ml-15" @click="pagechange(1)">搜索</button>
                                <button type="button" class="btn btn-default ml-15" @click="clearData">清空</button>
                            </form>
                            <div class="blk20"></div>
                            <div class="table-responsive">
                                <table class="table table-hover table-text-over table-bordered table-customize">
                                    <thead>
                                    <tr>
                                        <th width="40%">银行编号</th>
                                        <th>银行名称</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item, i) in layBankList" :key="i" class="handPower"
                                        @click="setBankNumber(item.id, item.name)">
                                        <td v-text="item.number"></td>
                                        <td v-text="item.name"></td>
                                    </tr>
                                    <tr v-if="layBankList.length === 0">
                                        <td colspan="2" v-html="NoData()"></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <PagInAction :total="total" :current-page='current' :display='display'
                                             @pagechange="pagechange"/>
                            </div>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
            <!--*************************************-->
        </form>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import db from '@~/js/request'
import store from '@/vuex/Store'
import PagInAction from '@/components/PagInAction'
let WebUploader = require('@@/js/webuploader/webuploader')

export default {
  name: 'AgencyTabs',
  store,
  props: {
    type: Number,
    oldBank: '',
    picList: '',
    logo: '',
    bank_account: ''
  },
  data () {
    return {
      LOGO: this.logo,
      bankAccount: this.bank_account,
      file_id: '',
      baseUrl: window.ajaxBaseUrl,
      keyword: '',
      bankList: [],
      layBankList: [],
      total: 0,
      current: 1,
      display: 10,
      formData: {
        func: 'institution'
      }
    }
  },
  computed: {
    token () {
      return store.state.token
    },
    userInfo () {
      return store.state.userInfo
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      $('#accordion').on('show.bs.collapse', function () {
        $(this).find('.panel-heading .iconfont').html('&#xe61f;')
      })
      $('#accordion').on('hide.bs.collapse', function () {
        $(this).find('.panel-heading .iconfont').html('&#xe61e;')
      })
      let fileArr = []
      self.picList.map(item => {
        fileArr.push(item.id)
      })
      self.file_id = fileArr.join(',')
    })

    self.createUpload()
    self.createUploadLogo()

    setTimeout(function () {
      $('#bankWrap .tab-pane').removeAttr('style')
      $('.fileList').mouseenter(function () {
        $(this).find('span:last').show()
      }).mouseleave(function () {
        $(this).find('span:last').hide()
      })
      self.pagechange(1)
    }, 1000)
  },
  methods: {
    addBank () {
      let len = $('.bankList').length
      let obj = {
        bank_id: 'bank_id[' + len + ']',
        bank_name: 'bank_name[' + len + ']',
        bank_account: 'bank_account[' + len + ']',
        bank_card_num: 'bank_card_num[' + len + ']',
        bank_card_info: 'bank_card_info[' + len + ']'
      }
      this.bankList.push(obj)
    },
    deleteBank (i) {
      this.oldBank.splice(i, 1)
    },
    deleteBank2 (i) {
      this.bankList.splice(i, 1)
    },
    validateSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        self.$emit('setChildForm', result, $('#bankForm').serializeArray())
      })
    },
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('name', self.keyword)
      params.append('page', p)
      db.postRequest('Institution/Company/getBank', params).then(res => {
        if (res.status === 1) {
          self.layBankList = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    clearData () {
      let self = this
      self.keyword = ''
      self.pagechange(1)
    },
    openLayId (id, name) {
      let self = this
      self.openId = id
      self.openName = name
    },
    setBankNumber (id, name) {
      let self = this
      $('#modal-id').modal('hide')
      $('[name="' + self.openId + '"]').val(id)
      $('[name="' + self.openName + '"]').val(name)
    },
    deleteFile (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('func', 'institution')
      db.headers.token = this.token
      db.postRequest('Institution/Upload/deleteAttachment', params).then(res => {
        if (res.status === 1) {
          self.picList.map((item, i) => {
            if (item.id === id) {
              self.picList.splice(i, 1)
            }
          })
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    createUpload () {
      let self = this
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
          extensions: 'gif,jpg,jpeg,bmp,png',
          mimeTypes: 'image/*'
        },
        threads: 1,
        fileNumLimit: 10, // 限制上传个数
        fileSingleSizeLimit: 1024 * 1024 * 2, // 限制单个上传图片的大小
        formData: {func: 'institution'}, // 上传所需参数
        duplicate: true // 重复上传
      })
      uploader.on('uploadSuccess', function (file, res) {
        if (res.status === 1) {
          let arr = []
          self.picList.push({
            id: res.data.id,
            path: res.data.path,
            file_name: res.data.file_name
          })
          self.picList.map(item => {
            arr.push(item.id)
          })
          self.file_id = arr.join(',')
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
    },
    createUploadLogo () {
      let self = this
      let uploader = WebUploader.create({
        auto: true, // 选完文件后，是否自动上传
        swf: 'static/js/webuploader/Uploader.swf', // '/upload/Uploader.swf', // swf文件路径
        server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne', // 文件接收服务端
        fileVal: 'file',
        pick: {
          id: '#picker2',
          multiple: false, // 是否多文件上传 默认false
          label: ''
        }, // 选择文件的按钮。可选
        // 允许选择文件格式。
        accept: {
          title: 'image',
          extensions: 'gif,jpg,jpeg,bmp,png',
          mimeTypes: 'image/*'
        },
        threads: 1,
        fileNumLimit: 1, // 限制上传个数
        fileSingleSizeLimit: 1024 * 1024, // 限制单个上传图片的大小
        formData: {func: 'logo'}, // 上传所需参数
        duplicate: true // 重复上传
      })
      uploader.on('uploadSuccess', function (file, res) {
        if (res.status === 1) {
          self.LOGO = {id: res.data.id, path: res.data.path}
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
    }
  },
  components: {
    PagInAction
  }
}
</script>
<style scoped lang="scss">
    .fileList{
        line-height:35px;border-bottom:1px dashed #dedede;

        &:last-of-type{
            border-bottom:none;
        }
    }
</style>
