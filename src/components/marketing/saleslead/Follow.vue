<template>
  <div>
    <div class="po_re schoolSearch">
      <input type="text" name="keywords" class="form-control" v-model="keyword" placeholder="搜索所有内容"
             autocomplete="off">
      <i class="iconfont handPower clearSearch" @click="keyword=''"
         v-if="keyword!==''">&#xe7f6;</i>
      <button type="button" class="btn btn-primary btn-search" @click="pageChange(1)"></button>
      <button type="button" class="btn btn-default btn-Collapse" @click="retract()">收起筛选<i
          class="iconfont">&#xe688;</i>
      </button>
    </div>
    <div class="bda clearfix filterFollow mb-20">
      <table class="table filter">
        <tbody>
        <tr>
          <td width="10%" class="text-center"><b>添加时间</b></td>
          <td>
            <a href="javascript:void(0);" @click="start_time='';end_time='';type=1;pageChange()"
               :class="type===1 && end_time === '' ? 'label label-primary' : 'label'">全部</a>
            <a href="javascript:void(0);" @click="start_time='';end_time='';type=2;pageChange()"
               :class="type===2 && end_time === '' ? 'label label-primary' : 'label'">近三月</a>
            <a href="javascript:void(0);" @click="start_time='';end_time='';type=3;pageChange()"
               :class="type===3 && end_time === '' ? 'label label-primary' : 'label'">近一年</a>
            <span id="customTime" contenteditable="true" data-placeholder="自定义时间段"
                  :class="type==='' && end_time !== ''?'active':''"></span>
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center"><b>线索来源</b></td>
          <td>
            <div class="w25">
              <select name="from_user_id" class="form-control selectpicker" v-model="from_user_id"
                      @change="pageChange()">
                <option value=""> 请选择渠道</option>
                <option :value="key" v-for="(item, key) in filter.sou_users" :key="key">{{item}}</option>
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center"><b>负责顾问</b></td>
          <td>
            <div class="w25">
              <select name="operator_user_id" class="form-control selectpicker" v-model="operator_user_id"
                      @change="pageChange()">
                <option value=""> 请选择负责顾问</option>
                <option :value="key" v-for="(item, key) in filter.ope_users" :key="key">{{item}}</option>
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <td width="10%" class="text-center"><b>当前状态</b></td>
          <td>
            <div style="margin-left: -.8rem;">
              <a href="javascript:void(0);" :class="key === sign_status ? 'label label-primary' : 'label'"
                 v-for="(item, key) in filter.status_list" :key="key"
                 @click="sign_status = key;pageChange()">{{item}}</a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="clearfix pb-15">
      <div class="pull-left lh34">共 <span class="cded">{{total}}</span> 条线索</div>
      <div class="pull-right">
        <button type="button" class="btn btn-default ml-10" @click="deleteList()">删除</button>
        <button type="button" class="btn btn-default ml-10" @click="settlement()">结算</button>
      </div>
    </div>
    <table class="table table-customize">
      <thead>
      <tr>
        <th width="5%"></th>
        <th width="15%">学生姓名</th>
        <th>联系电话</th>
        <th>线索来源</th>
        <th width="20%">
          添加时间
          <a href="javascript:void(0);"
             :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
             @click="listSort"></a>
        </th>
        <th width="12%">负责顾问</th>
        <th width="17%">当前状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in list" :key="i" v-if="!loading">
        <td><input type="checkbox" :value="item.id" @click="setActiveId($event, item.id)"></td>
        <td>
          <router-link :to="{path:'/archives/student/edit',query:{id:item.id}}" class="cded" v-html="highlight(item.name, keyword)"></router-link>
        </td>
        <td>{{item.phone}}</td>
        <td>{{item.from_user}}</td>
        <td>{{item.create_time}}</td>
        <td>{{item.operator_user}}</td>
        <td>
          <span :style="'color:'+item.status_color+';'">{{item.status_name}}</span>
          <span v-if="item.sub_name">
            <a href="javascript:void(0);" @click="viewDetail(item.id)" v-if="item.sub_name==='(查看明细)'">{{item.sub_name}}</a>
            <a href="javascript:void(0);" @click="review(item.id)" v-if="item.sub_name==='(审核线索)'">{{item.sub_name}}</a>
            <a href="javascript:void(0);" @click="review(item.id)" v-if="item.sub_name==='(编辑)'">{{item.sub_name}}</a>
          </span>
        </td>
      </tr>
      <tr v-if="loading">
        <td colspan="7" v-html="LoadingImg"></td>
      </tr>
      <tr v-if="!loading && list.length === 0">
        <td colspan="7" v-html="NoData"></td>
      </tr>
      </tbody>
    </table>
    <pagination :total="total" :current-page="current" @pagechange="pageChange"></pagination>
    <!--审核线索-->
    <div class="modal fade bs-example-modal-lg" id="modal-id">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">审核线索</h4>
          </div>
          <form action="" id="reForm" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
            <input type="hidden" name="id" id="id" v-model="reDetail.id"/>
            <div class="modal-body">
              <div class="pl-15 pr-15">
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                      <label class="col-sm-4 control-label">学生姓名</label>
                      <div class="col-sm-8 lh34">
                        {{reDetail.name}}
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                      <label class="col-sm-4 control-label">负责顾问</label>
                      <div class="col-sm-8 lh34">
                        {{reDetail.operator_name}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                      <label class="col-sm-4 control-label">线索来源</label>
                      <div class="col-sm-8 lh34">
                        {{reDetail.from_name}}
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                      <label class="col-sm-4 control-label">审核状态</label>
                      <div class="col-sm-8">
                        <div class="radio">
                          <label>
                            <input type="radio" name="audit_status" value="1" v-model="reDetail.audit_status"> 通过
                          </label>
                          <label class="ml-10">
                            <input type="radio" name="audit_status" value="2" v-model="reDetail.audit_status"> 不通过
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                      <label class="col-sm-4 control-label">签单金额</label>
                      <div class="col-sm-8">
                        <input type="text" name="sign_money" class="form-control" placeholder="请输入"
                               v-model="reDetail.sign_money"/>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                      <label class="col-sm-4 control-label">签单时间</label>
                      <div class="col-sm-8">
                        <input type="text" name="sign_time" id="times" class="form-control" placeholder="请选择"
                               v-model="reDetail.sign_success_time"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="form-group">
                      <label class="col-sm-4 control-label">返佣金额</label>
                      <div class="col-sm-8">
                        <input type="text" name="sign_comm" class="form-control" placeholder="请输入"
                               v-model="reDetail.sign_commission"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="reDetail={}">取消</button>
              <button type="submit" class="btn btn-primary">确定</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!--查看明细-->
    <div class="modal fade bs-example-modal-lg" id="modal-id2">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">查看明细</h4>
          </div>
          <div class="modal-body">
            <div class="pl-15 pr-15">
              <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-for="(item, i) in layDetail" :key="i">
                  <div class="form-group">
                    <label class="col-sm-4 control-label">{{item.name}}</label>
                    <div class="col-sm-8 lh34">
                      {{item.val}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="layDetail={}">确定</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/js/i18n/defaults-zh_CN'
import '@~/js/VeeValidateConfig'
import * as _ from 'lodash'
import pagination from '@#/shared/Pagination'
import db from '@~/js/request'

export default {
  name: 'Follow',
  data () {
    return {
      loading: true,
      activeId: [],
      keyword: '',
      type: 1,
      start_time: '',
      end_time: '',
      from_user_id: '',
      operator_user_id: '',
      sign_status: '0',
      time_sort: 0,
      list: [],
      total: 0,
      current: 1,
      reDetail: {},
      layDetail: {},
      filter: {}
    }
  },
  created () {
    this.debouncePagechange = _.debounce(this.pageChange, 1000)
  },
  mounted () {
    let self = this
    self.pageChange()
    self.getFilter()
    self.$nextTick(() => {
      self.laydate.render({
        elem: '#customTime',
        type: 'date',
        range: true,
        done: (value) => {
          let date = value.split(' - ')
          self.start_time = date[0]
          self.end_time = date[1]
          self.type = ''
          self.pageChange()
        }
      })
      self.laydate.render({
        elem: '#times',
        type: 'datetime',
        done: (value) => {
          self.reDetail.sign_success_time = value
        }
      })
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh')
      }, 500)
    })
  },
  methods: {
    getFilter () {
      let self = this
      db.getRequest('/Institution/SourceSubmit/cltorSearch', {}).then(res => {
        if (res.status === 1) {
          self.filter = res.data
        } else {
          console.log(res.msg)
        }
      })
    },
    pageChange (page) {
      let self = this
      let params = new URLSearchParams()
      self.loading = true
      params.append('page', page || 1)
      params.append('type', self.type)
      params.append('start_time', self.start_time)
      params.append('end_time', self.end_time)
      params.append('keywords', self.keyword)
      params.append('from_user_id', self.from_user_id)
      params.append('operator_user_id', self.operator_user_id)
      params.append('sign_status', self.sign_status)
      params.append('time_sort', self.time_sort)
      db.postRequest('/Institution/SourceSubmit/cltorStuList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.current = page || 1
        self.loading = false
      })
    },
    listSort () {
      let self = this
      if (self.time_sort === 0) {
        self.time_sort = 1
      } else if (self.time_sort === 1) {
        self.time_sort = 2
      } else if (self.time_sort === 2) {
        self.time_sort = 1
      }
      self.pageChange(self.current)
    },
    // 审核线索
    review (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.postRequest('/Institution/SourceSubmit/stuAudit', params).then(res => {
        if (res.status === 1) {
          self.reDetail = res.data
          $('#modal-id').modal('show')
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    validateBeforeSubmit () {
      let self = this
      let formData = $('#reForm').serializeArray()
      let params = new URLSearchParams()
      formData.map(item => {
        params.append(item.name, item.value)
      })
      db.postRequest('/Institution/SourceSubmit/stuAuditEdit', params).then(res => {
        if (res.status === 1) {
          self.reDetail = {}
          self.pageChange(self.current)
          self.layer.alert(res.msg, { icon: 1 }, function (i) {
            $('#modal-id').modal('hide')
            self.layer.close(i)
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 查看明细
    viewDetail (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.postRequest('/Institution/SourceSubmit/stuCommDetail', params).then(res => {
        if (res.status === 1) {
          self.layDetail = res.data
          $('#modal-id2').modal('show')
        } else {
          console.log(res.msg)
        }
      })
    },
    // 展开收起筛选
    retract () {
      let $this = $('.filterFollow')
      if ($this.attr('style') === undefined) {
        $this.height($this.outerHeight())
      }
      if ($this.height() > 0) {
        $this.addClass('hiddenS')
        $('.btn-Collapse').html('展开筛选<i class="iconfont">&#xe630;</i>')
      } else {
        $this.removeClass('hiddenS')
        $('.btn-Collapse').html('收起筛选<i class="iconfont">&#xe688;</i>')
      }
    },
    // 设置选中ID
    setActiveId (event, id) {
      let self = this
      if (event.currentTarget.checked) {
        self.activeId.push(id)
      } else {
        self.activeId.map((item, i) => {
          if (item === id) {
            self.activeId.splice(i, 1)
          }
        })
      }
    },
    // 删除
    deleteList () {
      let self = this
      if (self.activeId.length === 0) {
        self.layer.alert('请选择要操作的学生', { icon: 2 })
        return false
      }
      self.layer.confirm('您确定要删除此信息？', {
        shadeClose: false
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        self.activeId.map(item => {
          params.append('ids[]', item)
        })
        db.postRequest('/Institution/SourceSubmit/stuDel', params).then(res => {
          if (res.status === 1) {
            self.layer.alert(res.msg, { icon: 1 }, function (i) {
              self.layer.close(i)
              self.pageChange(self.current)
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      })
    },
    // 结算
    settlement () {
      let self = this
      if (self.activeId.length === 0) {
        self.layer.alert('请选择要操作的学生', { icon: 2 })
        return false
      }
      let params = new URLSearchParams()
      self.activeId.map(item => {
        params.append('ids[]', item)
      })
      db.postRequest('/Institution/SourceSubmit/stuPaycomm', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
            self.pageChange(self.current)
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    }
  },
  components: {pagination},
  watch: {
    keyword () {
      this.debouncePagechange()
    }
  }
}
</script>

<style scoped lang="less">
.filterFollow {
  -webkit-transition:all .3s ease 0s;-moz-transition:all .3s ease 0s;-ms-transition:all .3s ease 0s;transition:all .3s ease 0s;

  &.hiddenS {height:1px !important;overflow:hidden;}

  & table {margin-bottom:0;}
}

.filter {
  & tbody tr td {padding-top:10px;padding-bottom:10px;border:none;}

  & tbody tr:first-of-type td { padding-top:20px;}

  & tbody tr:last-of-type td { padding-bottom:20px;}

  & .label {
    margin-right:10px;color:#333;font-size:14px;

    &.label-primary {
      color:#fff;

      &:hover, &:focus {background-color:#39f;}
    }
  }

  #customTime{
    &:before{color:#333;cursor:pointer;}
  }

  & .active {background-color:#39f;color:#fff;line-height:22px;padding-left:.8rem;padding-right:.8rem;-webkit-border-radius:.25em;-moz-border-radius:.25em;border-radius:.25em;}
}
</style>
