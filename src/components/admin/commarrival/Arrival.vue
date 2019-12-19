<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">佣金到账</div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="submitForm()"><i
                                class="iconfont">&#xe637;</i> 保存
                        </button>
                    </div>

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>

                </div>

            </div>
        </div>

        <div v-if="loading" v-html="LoadingImg"></div>
        <div v-if="!loading">
            <form action="" method="POST" class="form-horizontal" id="arrivalForm"
                  @submit.prevent="validateBeforeSubmit">
                <input type="hidden" name="id" id="id" v-model="id" v-if="id!==undefined"/>
                <input type="hidden" name="om_id" id="om_id" v-model="om_id"/>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group form-search">
                                <i class="iconfont handPower" style="top:25px;" data-toggle="modal"
                                   data-backdrop="static"
                                   data-target="#StudentId">&#xe618;</i>
                                <label><font class="cf00">*</font>关联学生</label>
                                <input type="text" class="form-control" name="name" placeholder="请输入信息" v-model="name"
                                       v-validate="'required'" data-vv-as="学生">
                                <div class="validateTip" v-show="errors.has('name')">
                                    {{ errors.first('name') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>学生编号</label>
                                <input type="text" class="form-control" name="" placeholder="请输入信息" v-model="number"
                                       readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>中介机构</label>
                                <input type="text" class="form-control" name="" placeholder="请输入信息"
                                       v-model="company_name"
                                       readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>申报类型</label>
                                <input type="text" class="form-control" name="" placeholder="请输入信息" v-model="apply_type"
                                       readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>申报院校</label>
                                <input type="text" class="form-control" name="" placeholder="请输入信息"
                                       v-model="school_name"
                                       readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>申报专业</label>
                                <input type="text" class="form-control" name="" placeholder="请输入信息" v-model="major_name"
                                       readonly>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>学费</label>
                                <input type="text" class="form-control" name="fee" placeholder="请输入信息"
                                       v-model="school_tuition" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>佣金占学费比例（%）</label>
                                <input type="text" class="form-control" name="commission_fee_rate" placeholder="请输入信息"
                                       v-model="commission_percent" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label><font class="cf00">*</font>院校实际支付佣金</label>
                                <input type="text" class="form-control" name="schoo_money" placeholder="请输入信息"
                                       v-model="schoolMoney" v-validate="'required|money'" data-vv-as="院校实际支付佣金"
                                       @keyup="setMoney">
                                <div class="validateTip" v-show="errors.has('schoolMoney')">
                                    {{ errors.first('schoolMoney') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label><font class="cf00">*</font>佣金实际到账时间</label>
                                <input type="text" class="form-control" id="times" name="real_time" placeholder="请输入信息"
                                       v-validate="'required|date_format:yyyy-MM-dd HH:mm:ss'" data-vv-as="佣金实际到账时间"
                                       v-model="real_time">
                                <div class="validateTip" v-show="errors.has('real_time')">
                                    {{ errors.first('real_time') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>中介佣金比例（%）</label>
                                <input type="text" class="form-control" name="commission_rate" placeholder="请输入信息"
                                       v-model="commission_rate">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>中介可获佣金</label>
                                <input type="text" class="form-control" name="commission" placeholder="请输入信息"
                                       v-model="commission">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>易申学留存金额</label>
                                <input type="text" class="form-control" name="ysx_commission" placeholder="请输入信息"
                                       :value="ysx_commission" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>创建时间</label>
                                <input type="text" class="form-control" name="created_time" placeholder="请输入信息"
                                       v-model="created_time" readonly>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
        <div class="modal fade bs-example-modal-lg" id="StudentId">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">学生档案</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-inline" role="form">
                            <div class="form-group">
                                <label>学生名称</label>
                                <input type="text" class="form-control" name="" placeholder="模糊搜索"
                                       v-model="studentName">
                            </div>
                            <button type="button" class="btn btn-primary ml-15" @click="pagechange(1)">搜索</button>
                            <button type="reset" class="btn btn-default ml-15" @click="clearData">清空</button>
                        </form>
                        <div class="blk25"></div>
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered table-condensed table-text-over text-center">
                                <thead>
                                <tr>
                                    <th class="text-center">关联学生</th>
                                    <th class="text-center">学生编号</th>
                                    <th class="text-center">中介机构</th>
                                    <th class="text-center">申报类型</th>
                                    <th class="text-center">申报院校</th>
                                    <th class="text-center">申报专业</th>
                                    <th class="text-center">学费</th>
                                    <th class="text-center">中介可获佣金</th>
                                    <th class="text-center">中介佣金比例</th>
                                    <th class="text-center">佣金占学费比例</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,i) in studentList" :key="i" class="handPower"
                                    @click="setStudentId(item)">
                                    <td>{{item.student_name}}</td>
                                    <td>{{item.student_num}}</td>
                                    <td>{{item.company_name}}</td>
                                    <td>{{item.apply_type}}</td>
                                    <td>{{item.school_name}}</td>
                                    <td>{{item.major_name}}</td>
                                    <td>{{item.fee}}</td>
                                    <td>{{item.commission}}</td>
                                    <td>{{item.commission_rate}}</td>
                                    <td>{{item.commission_fee_rate}}</td>
                                </tr>
                                <tr v-if="loading">
                                    <td colspan="10" v-html="LoadingImg"></td>
                                </tr>
                                <tr v-if="!loading && studentList.length===0">
                                    <td colspan="10" v-html="NoData"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <PagInAction :total="total" :display="display" @pagechange="pagechange"></PagInAction>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
import PagInAction from '@#/shared/PagInAction'
import '@~/js/VeeValidateConfig'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Arrival',
  store,
  data () {
    return {
      loading: true,
      id: '',
      om_id: '',
      name: '',
      number: '',
      apply_type: '',
      school_name: '',
      company_name: '',
      major_name: '',
      commission_rate: '',
      created_time: '',
      school_tuition: '',
      commission: '',
      commission_percent: '',
      schoolMoney: '',
      real_time: '',
      ysx_commission: '',
      studentName: '',
      display: 10,
      total: 0,
      studentList: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.$nextTick(() => {
      if (self.id !== '') {
        self.getInfo()
      } else {
        self.loading = false
      }

      self.pagechange(1)

      setTimeout(function () {
        self.laydate.render({
          elem: '#times',
          type: 'datetime',
          done: function (v) {
            self.real_time = v
          }
        })
      }, 500)
    })
  },
  methods: {
    getInfo () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.postRequest('Institution/Commission/incomeDetail', params).then(res => {
        if (res.status === 1) {
          self.om_id = res.data.om_id
          self.name = res.data.student_name
          self.number = res.data.student_num
          self.apply_type = res.data.apply_type
          self.school_name = res.data.school_name
          self.company_name = res.data.company_name
          self.major_name = res.data.major_name
          self.commission_rate = res.data.commission_rate
          self.created_time = res.data.created_time
          self.school_tuition = res.data.fee
          self.commission = res.data.commission
          self.commission_percent = res.data.commission_fee_rate
          self.schoolMoney = res.data.school_money
          self.real_time = res.data.real_time
          self.ysx_commission = res.data.ysx_commission
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#arrivalForm').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Commission/incomeSave', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/admin/commarrival')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    },
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('studentName', self.studentName)
      params.append('page', p)
      db.postRequest('Institution/Commission/incomeChose', params).then(res => {
        if (res.status === 1) {
          self.studentList = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    setStudentId (obj) {
      this.om_id = obj.id
      this.name = obj.student_name
      this.number = obj.student_num
      this.apply_type = obj.apply_type
      this.school_name = obj.school_name
      this.company_name = obj.company_name
      this.major_name = obj.major_name
      this.commission_rate = obj.commission_rate
      this.school_tuition = obj.fee
      this.commission = obj.commission
      this.commission_percent = obj.commission_fee_rate
      $('#StudentId').modal('hide')
    },
    clearData () {
      this.studentName = ''
      this.pagechange(1)
    },
    setMoney () {
      let self = this
      if (/^[1-9]\d+\.([0-9]{2})$|^[1-9]\d+$|^[1-9]$|^[1-9]\.(\d{2})|^0\.(\d{2})/.test(self.schoolMoney) && self.commission !== '') {
        if (self.schoolMoney - self.commission > 0) {
          self.ysx_commission = (self.schoolMoney - self.commission).toFixed(2)
        } else {
          self.ysx_commission = 0
        }
      }
    }
  },
  components: {PagInAction}
}
</script>

<style scoped>

</style>
