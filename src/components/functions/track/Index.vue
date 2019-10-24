<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">申请跟踪</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group ml-10">
                        <div class="dropdown">
                            <button :class="studentName || studentNum || applyType || payStatus || payTime ?'btn btn-primary filter':'btn btn-default filter'"
                                    type="button" data-toggle="dropdown"></button>
                            <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                <div class="pl-15 pr-15" style="width:180px;">
                                    <form action="" method="POST" class="form-horizontal">
                                        <div class="form-group">
                                            <label>学生姓名</label>
                                            <input type="text" class="form-control" name="name" v-model="studentName"
                                                   placeholder="请输入信息">
                                        </div>
                                        <div class="form-group">
                                            <label>学生编号</label>
                                            <input type="text" class="form-control" name="number" v-model="studentNum"
                                                   placeholder="请输入信息">
                                        </div>
                                        <div class="form-group">
                                            <label>申报类型</label>
                                            <select name="type" id="type" class="form-control" v-model="applyType"
                                                    style="width:180px;">
                                                <option value="">请选择</option>
                                                <option value="1">本科</option>
                                                <option value="2">硕士</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>申请状态</label>
                                            <select name="type1" class="form-control" v-model.number="payStatus"
                                                    style="width:180px;">
                                                <option value="">请选择</option>
                                                <option value="3">等待院校回执</option>
                                                <option value="2">等待院校结果</option>
                                                <option value="1">结果已公布(offer)</option>
                                                <option value="0">结果已公布(拒信)</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>申请支付时间</label>
                                            <input type="text" class="form-control times"
                                                   name="createdTime"
                                                   placeholder="请选择日期">
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
                </div>
            </div>
        </div>

        <div class="row">
            <table class="table table-customize">
                <thead>
                <tr>
                    <th width="5%"></th>
                    <th>学生</th>
                    <th>申请国家</th>
                    <th>申报类型</th>
                    <th>申请学校</th>
                    <th>服务顾问</th>
                    <th>申请状态</th>
                </tr>
                </thead>
                <tbody v-for="(item,i) in list" :key="i">
                <tr>
                    <td width="5%"><i class="iconfont handPower" @click="viewBtn($event)">&#xe636;</i></td>
                    <td width="10%">{{item.name}}</td>
                    <td>{{item.country}}</td>
                    <td>{{item.apply_type_name}}</td>
                    <td>{{item.schoolname}}</td>
                    <td>{{item.user_name}}</td>
                    <td width="15%">{{item.status}}</td>
                </tr>
                <tr class="infoView" style="display:none;">
                    <td colspan="2">
                        {{item.major_en}}<br/>{{item.major_name}}
                    </td>
                    <td colspan="4">
                        <div class="row text-center progressX">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="clearfix">
                                    <i class="iconfont c999" v-if="item.is_return_val===0">&#xe63e;</i>
                                    <i class="iconfont cded" v-if="item.is_return_val===1">&#xe719;</i>
                                    <i class="iconfont cf00" v-if="item.is_return_val===2">&#xe606;</i>
                                </div>
                                <span>回执(<span v-if="item.is_return_val===0">等待</span><span
                                        v-if="item.is_return_val===1">收到回执</span><span
                                        v-if="item.is_return_val===2">没收到</span>)</span>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="clearfix">
                                    <i class="iconfont c999" v-if="item.is_interview_val===0">&#xe63e;</i>
                                    <i class="iconfont cded" v-if="item.is_interview_val===1">&#xe719;</i>
                                    <i class="iconfont cf00" v-if="item.is_interview_val===2">&#xe606;</i>
                                </div>
                                <span>面试(<span v-if="item.is_interview_val===0">等待中</span><span
                                        v-if="item.is_interview_val===1">通过</span><span
                                        v-if="item.is_interview_val===2">不通过</span>)</span>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="clearfix">
                                    <i class="iconfont c999" v-if="item.res===0">&#xe63e;</i>
                                    <i class="iconfont cded" v-if="item.res===1">&#xe719;</i>
                                    <i class="iconfont cf00" v-if="item.res===2">&#xe606;</i>
                                </div>
                                <span>结果(<span v-if="item.res===0">等待</span><span
                                        v-if="item.res===1">offer</span><span v-if="item.res===2">拒信</span>)</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p v-if="item.is_res_upload===0"><a href="javascript:void(0);" class="c999">查看回执</a> <a
                                href="javascript:void(0);" class="c999">下载回执</a></p>
                        <p v-if="item.is_res_upload===1"><a href="javascript:void(0);" class="cded"
                                                            @click="viewImg(item.res_upload)">查看回执</a> <a
                                :href="url+'/Institution/Apply/showReturn?id='+item.id" class="cded ml-10"
                                target="_blank">下载回执</a></p>
                        <p v-if="item.is_return_upload===0"><a href="javascript:void(0);" class="c999">申请结果</a> <a
                                href="javascript:void(0);" class="c999">下载结果</a></p>
                        <p v-if="item.is_return_upload===1"><a href="javascript:void(0);" class="cded"
                                                               @click="viewImg(item.return_upload)">申请结果</a><a
                                :href="url+'/Institution/Apply/showRes?id='+item.id" class="cded ml-10" target="_blank">下载结果</a>
                        </p>
                    </td>
                </tr>
                </tbody>
                <tbody v-if="!loading && list.length === 0">
                <tr>
                    <td colspan="7" v-html="NoData()"></td>
                </tr>
                </tbody>
                <tbody v-if="loading">
                <tr>
                    <td colspan="7" v-html="LoadingImg()"></td>
                </tr>
                </tbody>
            </table>
            <PagInAction :total="total" @pagechange="pagechange"></PagInAction>
        </div>
    </div>
</template>

<script>
import PagInAction from '@/components/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Track',
  store,
  data () {
    return {
      loading: true,
      url: '//' + window.ajaxBaseUrl,
      studentName: '',
      studentNum: '',
      applyType: '',
      payStatus: '',
      payTime: '',
      list: [],
      total: 0
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.studentName = self.$route.query.studentName || ''
    self.studentNum = self.$route.query.studentNum || ''
    self.$nextTick(() => {
      self.laydate.render({
        elem: '.times',
        range: true,
        done: (v) => {
          self.payTime = v
        }
      })
      self.pagechange(1)
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('studentName', self.studentName)
      params.append('studentNum', self.studentNum)
      params.append('applyType', self.applyType)
      params.append('applyStatus', self.payStatus)
      params.append('payTime', self.payTime)
      params.append('page', p || 1)
      self.loading = true
      db.postRequest('Institution/Apply/stateList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    },
    clearData () {
      this.id = ''
      this.studentName = ''
      this.studentNum = ''
      this.applyType = ''
      this.payStatus = ''
      this.payTime = ''
      this.pagechange()
    },
    viewImg (arr) {
      let self = this
      let imgList = []
      if (arr.length === 0) {
        self.layer.alert('查无信息', {icon: 2})
      } else {
        arr.map((item, i) => {
          imgList.push({
            'alt': '',
            'pid': i,
            'src': '//' + item,
            'thumb': ''
          })
        })
        let data = {
          'title': '',
          'start': 0,
          'data': imgList
        }
        self.layer.photos({
          photos: data
        })
      }
    },
    viewBtn (event) {
      let $this = $(event.currentTarget)
      if ($this.parents('tr').next('.infoView').is(':hidden')) {
        $this.parents('tr').next('.infoView').show()
      } else {
        $this.parents('tr').next('.infoView').hide()
      }
    }
  },
  components: {
    PagInAction
  }
}
</script>

<style scoped lang="scss">
    .table > tbody {
        border-top:none;

        &:nth-child(odd) {
            & > tr:first-child > td {background-color:#fff;}
        }
    }

    .progressX {
        position:relative;

        &:after {
            content:'';width:66%;height:1px;background:#ddd;position:absolute;left:50%;margin-left:-33%;top:10px;z-index:1;
        }

        & > div {z-index:2;}
    }
</style>
