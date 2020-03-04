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
                    <td class="w5"><i class="iconfont handPower" @click="viewBtn($event)">&#xe636;</i></td>
                    <td class="w10">{{item.name}}</td>
                    <td class="w10">{{item.country}}</td>
                    <td class="w10">{{item.apply_type}}</td>
                    <td>{{item.school_name}}</td>
                    <td class="w15">{{item.user_name}}</td>
                    <td class="w15">
                        <span v-if="item.apply_code===0">无需操作</span>
                        <span v-if="item.apply_code===2">已支付</span>
                        <button type="button" class="btn btn-warning" data-toggle="modal" data-backdrop="static" data-target="#applyFee" v-if="item.apply_code===1" @click="itemInfo={id: item.id, title:item.apply_tips, annotation: item.apply_remark, image: item.apply_images}">待支付</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-backdrop="static" data-target="#interview" v-if="item.apply_code===3" @click="itemInfo={id: item.id, title:item.apply_tips, annotation: item.apply_remark, image: item.apply_images}">待面试</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-backdrop="static" data-target="#viewResult" v-if="item.apply_code===4" @click="itemInfo={id: item.id, title:item.apply_tips, annotation: item.apply_remark, image: item.apply_images}">查看结果</button>
                    </td>
                </tr>
                <tr class="infoView" style="display:none;">
                    <td colspan="2">
                        {{item.major_name}}
                    </td>
                    <td colspan="4">
                        <div class="row text-center progressX">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div class="clearfix">
                                    <i class="iconfont c999" v-if="item.material_status===0">&#xe63e;</i>
                                    <i class="iconfont cded" v-if="item.material_status===1">&#xe719;</i>
                                    <i class="iconfont cded" v-if="item.material_status===2">&#xe63e;</i>
                                </div>
                                <span>资料接收(<span v-if="item.material_status===0" class="c999">等待</span><span
                                        v-if="item.material_status===1" class="cded">已提交</span><span
                                        v-if="item.material_status===2" class="cded">已接收</span>)</span>
                                <div class="clearfix c999 font12">{{item.material_status_time}}</div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div class="clearfix">
                                    <i class="iconfont c999" v-if="item.pay_has===1 && item.pay_status===0">&#xe63e;</i>
                                    <i class="iconfont cded" v-if="item.pay_has===1 && item.pay_status===1">&#xe719;</i>
                                    <i class="iconfont c999" v-if="item.pay_has===0">&#xe719;</i>
                                    <i class="iconfont cded" v-if="item.pay_has===2">&#xe719;</i>
                                </div>
                                <span>申请费(<span v-if="item.pay_has===1 && item.pay_status===0" class="c999">待支付</span><span v-if="item.pay_has===1 && item.pay_status===1" class="cded">已支付</span><span v-if="item.pay_has===2" class="cded">无需支付</span><span v-if="item.pay_has===0" class="c999">待确定</span>)</span>
                                <div class="clearfix c999 font12">{{item.pay_time}}</div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div class="clearfix">
                                    <i class="iconfont c999" v-if="item.interview_status===0">&#xe63e;</i>
                                    <i class="iconfont cded" v-if="item.interview_status===1">&#xe63e;</i>
                                    <i class="iconfont cded" v-if="item.interview_status===2">&#xe719;</i>
                                </div>
                                <span>学生面试(<span v-if="item.interview_status===0" class="c999">待确定</span><span v-if="item.interview_status===1" class="cded">待面试</span><span v-if="item.interview_status===2" class="cded">无需面试</span>)
                                </span>
                                <div class="clearfix c999 font12">{{item.interview_status_time}}</div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div class="clearfix">
                                    <i class="iconfont c999" v-if="item.res_status===0">&#xe63e;</i>
                                    <i class="iconfont cded" v-if="item.res_status===1">&#xe719;</i>
                                    <i class="iconfont cf00" v-if="item.res_status===2">&#xe606;</i>
                                </div>
                                <span>结果发放(<span v-if="item.res_status===0" class="c999">等待</span><span
                                        v-if="item.res_status===1" class="cded">offer</span><span v-if="item.res_status===2" class="cf00">拒信</span>)</span>
                                <div class="clearfix c999 font12">{{item.res_status_time}}</div>
                            </div>
                        </div>
                    </td>
                    <td class="text-center">
                        <a href="javascript:void(0);" class="cded" @click="viewImg(item.img_list)">回执中心</a>
                    </td>
                </tr>
                </tbody>
                <tbody v-if="!loading && list.length === 0">
                <tr>
                    <td colspan="7" v-html="NoData"></td>
                </tr>
                </tbody>
                <tbody v-if="loading">
                <tr>
                    <td colspan="7" v-html="LoadingImg"></td>
                </tr>
                </tbody>
            </table>
            <pagination :total="total" @pagechange="pagechange"></pagination>
        </div>
        <!--申请费-->
        <div class="modal fade bs-example-modal-lg" id="applyFee">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">申请费</h4>
                    </div>
                    <div class="modal-body" style="max-height: 500px;overflow-y: auto;">
                        <div v-html="itemInfo.title" class="pt-15 pb-15"></div>
                        <div v-text="itemInfo.annotation" class="pt-15 pb-15" v-if="itemInfo.annotation"></div>
                        <div class="text-center">
                            <img :src="item" alt="" v-for="(item, i) in itemInfo.image" :key="i" class="img-responsive">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <router-link :to="{path:'/home/payment',query:{id:itemInfo.id}}" class="btn btn-primary" data-dismiss="modal">前往支付</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!--院校面试-->
        <div class="modal fade bs-example-modal-lg" id="interview">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">院校面试</h4>
                    </div>
                    <div class="modal-body" style="max-height: 500px;overflow-y: auto;">
                        <div v-html="itemInfo.title" class="pt-15 pb-15"></div>
                        <div v-text="itemInfo.annotation" class="pt-15 pb-15" v-if="itemInfo.annotation"></div>
                        <div class="text-center">
                            <img :src="item" alt="" v-for="(item, i) in itemInfo.image" :key="i" class="img-responsive">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="layerTips(itemInfo.id)">已完成</button>
                    </div>
                </div>
            </div>
        </div>
        <!--查看结果-->
        <div class="modal fade bs-example-modal-lg" id="viewResult">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">查看结果</h4>
                    </div>
                    <div class="modal-body" style="max-height: 500px;overflow-y: auto;">
                        <div v-html="itemInfo.title" class="pt-15 pb-15"></div>
                        <div v-text="itemInfo.annotation" class="pt-15 pb-15" v-if="itemInfo.annotation"></div>
                        <div class="text-center">
                            <img :src="item" alt="" v-for="(item, i) in itemInfo.image" :key="i" class="img-responsive">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">知道了</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Track',
  store,
  data () {
    return {
      loading: true,
      studentName: '',
      studentNum: '',
      applyType: '',
      payStatus: '',
      payTime: '',
      list: [],
      total: 0,
      itemInfo: {
        id: '',
        title: '',
        annotation: '',
        image: []
      }
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
        self.current = p || 1
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
    // 查看图片
    viewImg (arr) {
      let self = this
      let imgList = []
      if (arr.length === 0) {
        self.layer.alert('暂无回执', {icon: 2})
      } else {
        arr.map((item, i) => {
          imgList.push({
            'alt': '',
            'pid': i,
            'src': item,
            'thumb': ''
          })
        })
        let data = {
          'title': '',
          'start': 0,
          'data': imgList
        }
        self.layer.photos({
          photos: data,
          anim: 5
        })
      }
    },
    viewBtn (event) {
      let $this = $(event.currentTarget)
      if ($this.parents('tr').next('.infoView').is(':hidden')) { // &#xe636;
        $this.parents('tr').next('.infoView').show()
        $this.html('&#xe63a;')
      } else {
        $this.parents('tr').next('.infoView').hide()
        $this.html('&#xe636;')
      }
    },
    layerTips (id) {
      let self = this
      $('#interview').modal('hide')
      self.layer.confirm('您是否确认已完成院校面试？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', id)
        db.postRequest('/Institution/Apply/interviewConfirm', params).then(res => {
          console.log(res.msg)
        })
      })
    }
  },
  components: {
    pagination
  }
}
</script>

<style scoped lang="less">
    .table > tbody {
        border-top:none;

        &:nth-child(odd) {
            & > tr:first-child > td {background-color:#fff;}
        }
    }

    .progressX {
        position:relative;

        &:after {
            content:'';width:76%;height:1px;background:#ddd;position:absolute;left:12%;top:10px;z-index:1;
        }

        & > div {z-index:2;}
    }
</style>
