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
                    <input type="checkbox" name="all" value="all" @click="selectAll"/>
                    全选
                </label>
            </span>
            <span class="pull-right">
                <button type="button" class="btn btn-default">下载</button>
                <button type="button" class="btn btn-default ml-15" data-toggle="modal" data-backdrop="static" data-target="#modalFollow">跟进</button>
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
                <td><input type="checkbox" name="id[]" value=""/></td>
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
                <td><input type="checkbox" name="id[]" value=""/></td>
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
                                    <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                                        <option value="">请选择</option>
                                        <option value="">已提交</option>
                                        <option value="">已接收</option>
                                    </select>
                                    <button type="button" class="btn btn-default certificate" data-id="picker1" @click="uploadClick('picker1')">上传凭证</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">申请费支付</label>
                                <div class="col-sm-9">
                                    <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                                        <option value="">请选择</option>
                                        <option value="">学生支付</option>
                                        <option value="">申学纪代付</option>
                                        <option value="">无需支付</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">面试情况</label>
                                <div class="col-sm-9">
                                    <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                                        <option value="">请选择</option>
                                        <option value="">无需面试</option>
                                        <option value="">待面试</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">申请结果</label>
                                <div class="col-sm-9">
                                    <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                                        <option value="">请选择</option>
                                        <option value="">offer</option>
                                        <option value="">拒信</option>
                                    </select>
                                    <button type="button" class="btn btn-default annex" data-id="picker3">上传附件</button>
                                </div>
                            </div>
                        </div>
                        <div class="followList">
                            <h4>格拉斯哥大学</h4>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">材料提交</label>
                                <div class="col-sm-9">
                                    <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                                        <option value="">请选择</option>
                                        <option value="">已提交</option>
                                        <option value="">已接收</option>
                                    </select>
                                    <button type="button" class="btn btn-default certificate" data-id="picker2">上传凭证</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">申请费支付</label>
                                <div class="col-sm-9">
                                    <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                                        <option value="">请选择</option>
                                        <option value="">学生支付</option>
                                        <option value="">申学纪代付</option>
                                        <option value="">无需支付</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">面试情况</label>
                                <div class="col-sm-9">
                                    <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                                        <option value="">请选择</option>
                                        <option value="">无需面试</option>
                                        <option value="">待面试</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">申请结果</label>
                                <div class="col-sm-9">
                                    <select name="" class="form-control selectpicker show-tick" data-size="10" data-width="fit">
                                        <option value="">请选择</option>
                                        <option value="">offer</option>
                                        <option value="">拒信</option>
                                    </select>
                                    <button type="button" class="btn btn-default annex" data-id="picker4">上传附件</button>
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
export default {
  name: 'Detail',
  data () {
    return {
      idArr: [],
      file_id: []
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      $('.selectpicker').selectpicker()
      setTimeout(() => {
        // 上传凭证、上传附件
        $('.certificate, .annex').each(function () {
          console.log($(this).attr('data-id'))
          self.formUpload($(this).attr('data-id'))
        })
      }, 3000)
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
    selectAll () {
      $('#myTable [type="checkbox"]').each(function (index, element) {
        if (element.checked) {
          element.checked = false
        } else {
          element.checked = true
        }
      })
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
