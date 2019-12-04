<template>
    <div>
        <InitApplyNav :state="state" step="step3" :id="id"/>
        <div v-if="loading" v-html="LoadingImg()"></div>
        <div v-if="!loading">
            <form id="questionForm" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                <div class="clearfix">
                    <img src="../../../../static/images/011.jpg" alt="">
                    <span class="ml-10">请您确认院校要求的文书材料已完成并已提交，申请提交后文书将不可修改</span>
                </div>
                <div class="blk20"></div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="w25">申请专业</th>
                        <th class="w30">所需材料</th>
                        <th>关联材料</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, i) in list" :key="i">
                    <tr>
                        <td rowspan="2" style="border-right:1px solid #ddd;">
                            <input type="hidden" :name="'major[id]['+i+']'" :value="item.id" />
                            {{item.school_name}}<br>
                            {{item.major_name}}
                        </td>
                        <td>推荐人 {{item.rcmd_num}} 位</td>
                        <td>
                            <select v-model="item.rcmd_id_list" class="form-control selectpicker show-tick" multiple
                                    data-size="15" data-selected-text-format="count > 3" title="请选择" data-width="200px">
                                <option :value="items.id" v-for="(items, k) in rcmdList" :key="k">{{items.name}}</option>
                            </select>
                            <a class="btn btn-default" @click="getReferrer(item.id, item.rcmd_id_list)" v-if="item.rcmd_id_list.length > 0">编辑推荐人</a>
                            <router-link to="/functions/applyInfo/detail" class="cded" v-if="rcmdList.length === 0">前往创建</router-link>
                        </td>
                    </tr>
                    <tr>
                        <td>院校题目作答</td>
                        <td>
                            <div v-if="docList.length > 0">
                                <select :name="'major[doc_id]['+i+']'" v-model="item.doc_id" class="form-control selectpicker show-tick" data-size="10" data-width="200px">
                                    <option value="">请选择</option>
                                    <option :value="items.id" v-for="(items, k) in docList" :key="k">{{items.title}}</option>
                                </select>
                            </div>
                            <router-link to="/functions/answer/addAnswer" class="cded" v-if="docList.length === 0">前往创建</router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="blk20"></div>
                <div class="clearfix text-center">
                    <router-link :to="{path:'/functions/initApply/ConfirmSubmission',query:{id:id}}"
                                 class="btn btn-default">下一页
                    </router-link>
                    <button type="submit" class="btn btn-primary ml-20">保存</button>
                </div>
            </form>
            <!--编辑推荐人-->
            <div class="modal fade bs-example-modal-lg" id="modalReferrer">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">编辑推荐人</h4>
                        </div>
                        <form action="" id="referrerForm" method="POST" class="form-horizontal" @submit.prevent="saveReferrer">
                            <div class="modal-body" style="max-height:500px;overflow-y:auto;padding-top:50px;padding-bottom:50px;">
                                <div class="clearfix" v-for="(item, i) in referrer" :key="i" :class="{'mt-15 pt-25 bdt':i>0}">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label class="col-sm-5 control-label">推荐人姓名</label>
                                                <div class="col-sm-7">
                                                    <input type="hidden" name="rcmder[id][]" :value="item.id" />
                                                    <input type="text" name="rcmder[name][]" v-model="item.name" class="form-control" placeholder="请输入推荐人姓名">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label class="col-sm-5 control-label">推荐人职位 <font class="cf00">*</font></label>
                                                <div class="col-sm-7">
                                                    <input type="text" :name="'rcmder[career]['+i+']'" v-model="item.career" class="form-control" placeholder="请输入推荐人职位" v-validate="'required'" data-vv-as="职位">
                                                    <div class="validateTip" v-show="errors.has('rcmder[career]['+i+']')">
                                                        {{ errors.first('rcmder[career]['+i+']') }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label class="col-sm-5 control-label">推荐人称谓 <font class="cf00">*</font></label>
                                                <div class="col-sm-7">
                                                    <input type="text" :name="'rcmder[title]['+i+']'" v-model="item.title" class="form-control" placeholder="请输入推荐人称谓" v-validate="'required'" data-vv-as="称谓">
                                                    <div class="validateTip" v-show="errors.has('rcmder[title]['+i+']')">
                                                        {{ errors.first('rcmder[title]['+i+']') }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label class="col-sm-5 control-label">与我的关系</label>
                                                <div class="col-sm-7">
                                                    <input type="text" name="rcmder[relation][]" v-model="item.relation" class="form-control" placeholder="请输入关系">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label class="col-sm-5 control-label">联系电话</label>
                                                <div class="col-sm-7">
                                                    <input type="text" name="rcmder[phone][]" v-model="item.phone" class="form-control" placeholder="请输入联系电话">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label class="col-sm-5 control-label">联系邮箱</label>
                                                <div class="col-sm-7">
                                                    <input type="text" name="rcmder[email][]" v-model="item.email" class="form-control" placeholder="请输入联系邮箱">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label class="col-sm-5 control-label">推荐人优先级</label>
                                                <div class="col-sm-7">
                                                    <select name="rcmder[lv][]" v-model="item.lv" class="form-control selectpicker show-tick" data-container="body" data-size="10">
                                                        <option value="">请选择</option>
                                                        <option value="1">第一推荐人</option>
                                                        <option value="2">第二推荐人</option>
                                                        <option value="3">第三推荐人</option>
                                                        <option value="4">第四推荐人</option>
                                                        <option value="5">第五推荐人</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label" style="width:14%;">推荐人地址</label>
                                                <div class="col-sm-8" style="width:86%;" id="citys">
                                                    <CitySelect
                                                            :p="item.prov"
                                                            :c="item.city"
                                                            :a="item.district"
                                                            :pName="'rcmder[prov]['+i+']'"
                                                            :cName="'rcmder[city]['+i+']'"
                                                            :aName="'rcmder[district]['+i+']'"
                                                            @cityCallback="cityCallback"/>
                                                    <input type="text" name="rcmder[details][]" v-model="item.details" class="form-control" style="display: inline-block;width: auto;vertical-align: middle;" placeholder="请输入详细地址"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="submit" class="btn btn-primary">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import InitApplyNav from '@#/functions/initApply/InitApplyNav'
import CitySelect from '@#/shared/CitySelect'
import db from '@~/js/request'

export default {
  name: 'QuestionAnswer',
  data () {
    return {
      id: '',
      loading: true,
      ReIndex: '',
      omId: '',
      state: [0, 0, 0, 0],
      list: [],
      docList: [],
      rcmdList: [],
      referrer: []
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.id = self.$route.query.id || ''
      self.getDetail()
      self.$nextTick(() => {
        $(document).on('change', '#citys select', function () {
          self.ReIndex = $(this).attr('name').match(/[0-9]+/)[0]
        })
        $('#modalReferrer').on('hidden.bs.modal', function () {
          self.referrer = []
        })
      })
    })
  },
  methods: {
    // 获取页面详情
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.postRequest('Institution/Apply/questionAnswer', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.docList = res.data.doc_list
          self.rcmdList = res.data.rcmd_list
        } else {
          console.log(res.msg)
        }
        setTimeout(() => {
          $('.selectpicker').selectpicker()
        }, 500)
        self.loading = false
      })
    },
    // 保存当前数据
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#questionForm').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          self.list.map((item, i) => {
            params.append('major[rcmd_id_list][' + i + ']', item.rcmd_id_list)
          })
          db.postRequest('/Institution/Apply/questionAnswerSave', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
              })
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    // 获取推荐人信息
    getReferrer (omId, arr) {
      let self = this
      if (arr.length === 0) {
        self.layer.alert('请选择推荐人后编辑')
        return false
      }
      self.omId = omId
      self.referrer = []
      arr.map((item) => {
        self.rcmdList.map((items) => {
          if (parseInt(item) === items.id) {
            self.referrer.push(items)
          }
        })
      })
      $('#modalReferrer').modal({
        backdrop: 'static',
        show: true // 模态框初始化之后就立即显示出来
      })
    },
    // 保存推荐人
    saveReferrer () {
      let self = this
      self.$validator.validateAll().then((res) => {
        if (res) {
          let formData = $('#referrerForm').serializeArray()
          let params = new URLSearchParams()
          params.append('om_id', self.omId)
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Apply/rcmderSava', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                $('#modalReferrer').modal('hide')
              })
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    cityCallback (data) {
      let self = this
      setTimeout(function () {
        let i = self.ReIndex
        self.referrer[i]['prov'] = data.province
        self.referrer[i]['city'] = data.city
        self.referrer[i]['district'] = data.area
      }, 100)
    }
  },
  components: { InitApplyNav, CitySelect }
}
</script>

<style scoped>

</style>
