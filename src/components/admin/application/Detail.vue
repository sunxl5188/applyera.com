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
                        <router-link :to="{path:'/functions/applyInfo/detail',query:{id:list.apply_id}}" class="cded">
                            {{list.apply_num}}
                        </router-link>
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
                        <div contenteditable="true" data-placeholder="请输入备注" id="content" v-text="list.remark"
                             @keyup="remark=$event.target.innerText"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="clearfix">
            <span class="pull-left pl-25">
                <div class="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" name="all" id="all" value="all" class="custom-control-input" @click="selectAll($event)">
                    <label class="custom-control-label" for="all">全选</label>
                </div>
            </span>
            <span class="pull-right">
                <button type="button" class="btn btn-default" @click="downFile(1)">下载</button>
                <button type="button" class="btn btn-default ml-15" @click="followBtn">跟进</button>
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
                <td>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" name="id[]" :id="'id'+i" :value="item.id" class="custom-control-input" @change="setCheckbox(item)">
                        <label class="custom-control-label" :for="'id'+i"></label>
                    </div>
                </td>
                <td>
                    <router-link :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.school_unq_id,tab:1}}"
                                 class="cded">
                        {{item.school_name}}
                    </router-link>
                </td>
                <td>
                    <router-link :to="{path:'/functions/schoollist/majordetaila',query:{id:item.major_unq_id}}"
                                 class="cded" v-if="list.apply_type===1">
                        {{item.major_name}}
                    </router-link>
                    <router-link :to="{path:'/functions/schoollist/majordetailb',query:{id:item.major_unq_id}}"
                                 class="cded" v-if="list.apply_type===2">
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
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" name="Fall" id="fall" class="custom-control-input">
                                        <label class="custom-control-label" for="fall">全选</label>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody id="annexId">
                            <tr v-for="(item, i) in list.upload_list" :key="i">
                                <td class="w5">
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" name="id[]" :id="'id-fj'+i" :value="item.id" class="custom-control-input">
                                        <label class="custom-control-label" :for="'id-fj'+i"></label>
                                    </div>
                                </td>
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
        <component :is="component" :majorList="majorList" :id="id"/>
        <a href="" id="saveFile"></a>
    </div>
</template>
<script>
import * as _ from 'lodash'
import TrackComponent from '@#/admin/application/TrackComponent'
import db from '@~/js/request'

export default {
  name: 'Detail',
  data () {
    return {
      loading: true,
      id: '',
      idArr: [],
      majorList: [],
      fArr: [],
      list: {},
      remark: '',
      component: ''
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
    self.getDetail()
    self.$nextTick(() => {
      // 附件列表
      $('#annexId').on('click', '[type="checkbox"]', function () {
        if ($(this).is(':checked')) {
          self.fArr.push(parseInt($(this).val()))
        } else {
          self.fArr.map((item, index) => {
            if (item === parseInt($(this).val())) {
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
            self.fArr.push(parseInt($(this).val()))
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
      $('#pasteModal').on('hidden.bs.modal', function () {
        self.pasteObj = []
      })
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
    // 全选
    selectAll (event) {
      let self = this
      let boole = event.target.checked
      $('#myTable [type="checkbox"]').each(function (index, element) {
        element.checked = boole
        if (boole) {
          self.idArr.push(parseInt($(this).val()))
          self.majorList = self.list.major_list
        } else {
          self.idArr = []
          self.majorList = []
        }
      })
    },
    followBtn () {
      let self = this
      if (self.idArr.length === 0) {
        self.layer.alert('请选择要操作的编号', { icon: 2 })
        return false
      } else {
        self.component = TrackComponent
        _.delay(() => {
          $('#modalFollow').modal({ backdrop: 'static', show: true })
        }, 500)
      }
    },
    // 打包rar
    downFile (type) {
      let self = this
      let ids = ''
      if (self.idArr.length === 0 && type === 1) {
        self.layer.alert('请选择要操作的编号', { icon: 2 })
        return false
      }
      if (self.fArr.length === 0 && type === 2) {
        self.layer.alert('请选择要操作的编号', { icon: 2 })
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
    },
    // 选择申请学校列表
    setCheckbox (item) {
      let self = this
      let boole = event.target.checked
      if (boole) {
        self.majorList.push(item)
        self.idArr.push(item.id)
      } else {
        // self.majorList.splice(_.findIndex(self.majorList, item.id), 1)
        _.remove(self.majorList, (i) => i.id === item.id)
        _.remove(self.idArr, (i) => i === item.id)
      }
    }
  },
  components: {
    TrackComponent
  }
}
</script>

<style scoped>

</style>
