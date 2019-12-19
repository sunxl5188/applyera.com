<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">账单明细</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group ml-10">
                        <div class="dropdown">
                            <button :class="createdTime || time || type || studentNo || studentName?'btn btn-primary filter':'btn btn-default filter'" type="button" data-toggle="dropdown"></button>
                            <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                <div class="pl-15 pr-15" style="width:180px;">
                                    <form action="" method="POST" class="form-horizontal">
                                        <div class="form-group">
                                            <label>创建时间</label>
                                            <input type="text" class="form-control times" name="createdTime"
                                                   placeholder="请选择日期"
                                                   v-model="createdTime">
                                        </div>
                                        <div class="form-group">
                                            <div class="radio">
                                                <label>
                                                    <input type="radio" name="times" value="3" v-model="time"> 最近三个月
                                                </label>
                                                <label>
                                                    <input type="radio" name="times" value="6" v-model="time"> 最近半年
                                                </label>
                                                <label>
                                                    <input type="radio" name="times" value="12" v-model="time"> 最近一年
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>入账/提现</label>
                                            <select name="name" id="inputID" class="form-control" v-model.number="type">
                                                <option value="">请选择</option>
                                                <option value="3">全部</option>
                                                <option value="2">提现</option>
                                                <option value="1">入账</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>学生编号</label>
                                            <input type="text" class="form-control" name="number" placeholder=""
                                                   v-model="studentNo">
                                        </div>
                                        <div class="form-group">
                                            <label>学生姓名</label>
                                            <input type="text" class="form-control" name="name" placeholder=""
                                                   v-model="studentName">
                                        </div>
                                        <div class="form-group text-center">
                                            <button type="reset" class="btn btn-default" @click="clearData">重置
                                            </button>
                                            <button type="button" class="btn btn-primary ml-10" @click="pagechange()">
                                                开始筛选
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="refresh"><i class="iconfont">&#xe64e;</i>
                            刷新
                        </button>
                    </div>
                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="$router.back()"><i class="iconfont">&#xe64f;</i>返回
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <table class="table table-customize">
            <thead>
            <tr>
                <th>账单生成时间</th>
                <th>账单信息</th>
                <th>金额（元）</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in list" :key="i">
                <td>{{item.created_time}}</td>
                <td>{{item.type}}</td>
                <td>{{item.money}}</td>
                <td>{{item.status}}</td>
                <td>
                    <a href="javascript:void(0);" class="cded" @click="showModalLay(1, item.detail)"
                       v-if="item.status==='入账成功'">详情</a>
                    <a href="javascript:void(0);" class="cded" @click="showModalLay(2, item.detail)"
                       v-if="item.status!=='入账成功'">详情</a>
                </td>
            </tr>
            <tr v-if="loading">
                <td colspan="5" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="!loading && list.length===0">
                <td colspan="5" v-html="NoData"></td>
            </tr>
            </tbody>
            <tfoot>
            <tr v-if="list.length>0">
                <td colspan="5" class="text-right">
                    <span>入账合计：<span class="cf00">{{income}}</span></span>
                    <span class="ml-20">支出合计：<span class="c52c">{{withdrawal}}</span></span>
                </td>
            </tr>
            </tfoot>
        </table>
        <PagInAction :total="total" @pagechange="pagechange"></PagInAction>

        <div class="modal fade" id="CumulativeId">
            <div class="modal-dialog" style="width: 400px;">
                <div class="modal-content">
                    <div class="modal-body" v-if="Object.keys(modalData).length > 0">
                        <div class="clearfix" v-if="modalData['state'] === 1">
                            <h5 class="text-center">佣金入账</h5>
                            <p class="text-center cfad font18">+{{modalData.money}}</p>
                            <ul class="list-group">
                                <li class="list-group-item clearfix"><span class="pull-left">学生编号</span><span
                                        class="pull-right">{{modalData.student_no}}</span></li>
                                <li class="list-group-item clearfix"><span class="pull-left">学生姓名</span><span
                                        class="pull-right">{{modalData.student_name}}</span></li>
                                <li class="list-group-item clearfix"><span class="pull-left">学生电话</span><span
                                        class="pull-right">{{modalData.student_phone}}</span></li>
                                <li class="list-group-item clearfix"><span class="pull-left">返佣院校</span><span
                                        class="pull-right">{{modalData.school_name}}</span></li>
                                <li class="list-group-item clearfix"><span class="pull-left">业务单号</span><span
                                        class="pull-right">{{modalData.trade_no}}</span></li>
                                <li class="list-group-item clearfix"><span class="pull-left">创建时间</span><span
                                        class="pull-right">{{modalData.order_created_time}}</span></li>
                            </ul>
                        </div>
                        <div class="clearfix" v-if="modalData['state'] === 2">
                            <h5 class="text-center">佣金提现</h5>
                            <p class="text-center font18">-{{modalData.money}}</p>
                            <ul class="list-group">
                                <li class="list-group-item clearfix"><span class="pull-left">收款账户</span><span
                                        class="pull-right">{{modalData.company_card}}</span></li>
                                <li class="list-group-item clearfix"><span class="pull-left">收款人</span><span
                                        class="pull-right">{{modalData.company_name}}</span></li>
                                <li class="list-group-item clearfix"><span class="pull-left">收款人电话</span><span
                                        class="pull-right">{{modalData.company_phone}}</span></li>
                                <li class="list-group-item clearfix"><span class="pull-left">业务单号</span><span
                                        class="pull-right">{{modalData.trade_no}}</span></li>
                                <li class="list-group-item clearfix"><span class="pull-left">创建时间</span><span
                                        class="pull-right">{{modalData.order_created_time}}</span></li>
                            </ul>
                        </div>
                        <div class="clearfix text-center">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PagInAction from '@#/shared/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Cumulative',
  store,
  data () {
    return {
      loading: true,
      createdTime: '',
      time: '',
      type: '',
      studentNo: '',
      studentName: '',
      list: [],
      total: 0,
      income: 0,
      withdrawal: 0,
      modalData: {}
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.laydate.render({
        elem: '.times',
        range: true,
        done (v) {
          self.createdTime = v
        }
      })
      self.pagechange(1)
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('createdTime', self.createdTime)
      params.append('time', self.time)
      params.append('type', self.type)
      params.append('studentNo', self.studentNo)
      params.append('studentName', self.studentName)
      params.append('page', p)
      self.loading = true
      db.postRequest('Institution/Commission/detailList', params).then(res => {
        if (res.status === 1) {
          self.total = res.data.total
          self.list = res.data.list
          self.income = res.data.income
          self.withdrawal = res.data.withdrawal
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
        self.loading = false
      })
    },
    clearData () {
      this.createdTime = ''
      this.time = ''
      this.type = 3
      this.studentNo = ''
      this.studentName = ''
      this.pagechange(1)
    },
    showModalLay (i, data) {
      let self = this
      Object.assign(data, {state: i})
      self.modalData = data
      setTimeout(function () {
        $('#CumulativeId').modal('show')
      }, 300)
    }
  },
  components: {
    PagInAction
  }
}
</script>

<style scoped lang="scss">
    .list-group-item {border-top:none;border-left:none;border-right:none;margin-bottom:0;}
</style>
