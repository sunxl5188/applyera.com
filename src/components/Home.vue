<template>
    <div>
        <div class="container-fluid" :style="name==='home'?'':'display: none;'">

            <div class="clearfix" v-if="loading">
                <div class="pad-30 bgWhite" v-html="LoadingImg()"></div>
            </div>

            <div class="clearfix" v-if="!loading">

                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="clearfix lh40">今日待办</div>
                        <div class="UpcomingWrap">
                            <div class="UpcomingTitle">
                                <span class="UpcomingNum">{{finish}}/{{all}}</span>
                                <span class="progress"><i :style="'width:'+prog+'%;'"></i></span>
                                <span class="setDate">
                                    <a href="javascript:void(0);" class="prov"
                                       @click="CalculationDate(false)">&#xe68a;</a>
                                    <a href="javascript:void(0);" class="next"
                                       @click="CalculationDate(true)">&#xe689;</a>
                                    <font>{{date2}}</font>
                                    <span class="times">{{date1}}</span>
                                </span>
                                <span class="addUpcoming">
                                    <i class="iconfont font22 handPower">&#xe62b;</i>
                                </span>
                            </div>
                            <div class="UpcomingContent">
                                <div class="clearfix text-center lh80" v-if="list.length === 0">今日暂无待办</div>
                                <div :class="item.priority===1 && item.type===1?'row state-0': item.priority===2 && item.type===1 ?'row state-1':item.priority===3 && item.type===1 ? 'row state-2':'row'"
                                     v-for="(item,i) in list" :key="i">
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                        {{item.time_format}}
                                    </div>
                                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                        <span class="textOver" v-if="item.ins_student_id">
                                            <router-link
                                                    :to="{path:'/archives/student/edit',query:{id:item.ins_student_id}}">
                                                {{item.title}}
                                            </router-link>
                                        </span>
                                        <span class="textOver" v-if="item.ins_student_id===''">{{item.title}}</span>
                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                        <span class="label label-success handPower"
                                              @click="setState(item.id)"
                                              v-if="item.status===1">已完成</span>
                                        <span class="label label-default handPower"
                                              @click="setState(item.id)"
                                              v-if="item.status===0">未完成</span>
                                    </div>
                                    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 text-center">
                                        <div class="dropdown">
                                            <i class="iconfont c999 handPower" data-toggle="dropdown">&#xe66b;</i>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a href="#" data-toggle="modal" data-backdrop="static"
                                                       data-target="#CreateSch" @click="getInfo(item)"
                                                       v-if="item.type===1">编辑</a>
                                                    <a href="#" data-toggle="modal" data-backdrop="static"
                                                       data-target="#CreateRe" @click="getInfo(item)"
                                                       v-if="item.type===2">编辑</a>
                                                </li>
                                                <li><a href="javascript:void(0);" @click="delData(item.id)">删除</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="clearfix lh40">数据统计</div>
                        <div class="statistics bgWhite">
                            <router-link to="/archives/student/edit">+ 新增学生</router-link>
                            <div id="echarts"></div>
                        </div>
                    </div>
                </div>
                <div class="blk30"></div>
                <div class="row mb-30">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="clearfix lh40">常用功能</div>
                        <div class="functionList bgWhite">
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <router-link to="/archives/student">
                                            <i class="iconfont">&#xe6b1;</i>
                                        </router-link>
                                    </div>
                                    <div class="media-body">
                                        <router-link to="/archives/student">
                                            <div class="font14 lh20">学生管理</div>
                                            <div class="font12 c999 lh20">管理学生档案</div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <router-link to="/functions/plan">
                                            <i class="iconfont">&#xe60e;</i>
                                        </router-link>
                                    </div>
                                    <div class="media-body">
                                        <router-link to="/functions/plan">
                                            <div class="font14 lh20">留学规划</div>
                                            <div class="font12 c999 lh20">快速生成留学方案</div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <router-link to="/functions/applyInfo">
                                            <i class="iconfont">&#xe65c;</i>
                                        </router-link>
                                    </div>
                                    <div class="media-body">
                                        <router-link to="/functions/applyInfo">
                                            <div class="font14 lh20">申请资料</div>
                                            <div class="font12 c999 lh20">申请资料协作管理</div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <router-link to="/functions/track">
                                            <i class="iconfont">&#xe629;</i>
                                        </router-link>
                                    </div>
                                    <div class="media-body">
                                        <router-link to="/functions/track">
                                            <div class="font14 lh20">申请跟踪</div>
                                            <div class="font12 c999 lh20">实时查看申请动态</div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <a href="javascript:void(0);">
                                            <i class="iconfont">&#xe61c;</i>
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <div class="font14 lh20">数据统计 (待开放）</div>
                                        <div class="font12 c999 lh20">数据统计更快提升效率</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <router-link to="/functions/schoollist">
                                            <i class="iconfont">&#xe611;</i>
                                        </router-link>
                                    </div>
                                    <div class="media-body">
                                        <router-link to="/functions/schoollist">
                                            <div class="font14 lh20">校查查</div>
                                            <div class="font12 c999 lh20">最新最全的全球院校数据</div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <a href="javascript:void(0);">
                                            <i class="iconfont">&#xeb66;</i>
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <div class="font14 lh20">比一比 (内测中)</div>
                                        <div class="font12 c999 lh20">快速对比院校与专业</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <router-link to="/functions/initApply/ChooseSchool">
                                            <i class="iconfont">&#xe6ff;</i>
                                        </router-link>
                                    </div>
                                    <div class="media-body">
                                        <router-link to="/functions/initApply/ChooseSchool">
                                            <div class="font14 lh20">发起申请</div>
                                            <div class="font12 c999 lh20">向全球院校一键提交申请</div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <router-link to="/functions/commission">
                                            <i class="iconfont">&#xe61a;</i>
                                        </router-link>
                                    </div>
                                    <div class="media-body">
                                        <router-link to="/functions/commission">
                                            <div class="font14 lh20">佣金管理</div>
                                            <div class="font12 c999 lh20">全网最高佣金渠道</div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-1-5 col-sm-1-5 col-md-1-5 col-lg-1-5">
                                <div class="media">
                                    <div class="media-left">
                                        <a href="javascript:void(0);">
                                            <i class="iconfont">&#xe61b;</i>
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <div class="font14 lh20">营销管理 (待开放)</div>
                                        <div class="font12 c999 lh20">快速获取生源</div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <router-view></router-view>

        <div class="modal fade" id="CreateRe">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">创建提醒</h4>
                    </div>
                    <form action="" method="POST" class="form-horizontal" id="form3" autocomplete="off">
                        <input type="hidden" name="id" :value="id" v-if="id!==''"/>
                        <input type="hidden" name="type" value="2"/>
                        <div class="modal-body pl-30 pr-30">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">设置标题</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="title" v-model="title"
                                           placeholder="请输入标题">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">选择时间</label>
                                <div class="col-sm-5" v-show="!is_full_day">
                                    <input type="text" name="time" class="form-control dateTime" v-model="dateTime"
                                           placeholder="请选择日期">
                                </div>
                                <div class="col-sm-5" v-show="is_full_day">
                                    <input type="text" name="day" class="form-control dateDay" v-model="dateDay"
                                           placeholder="请选择日期">
                                </div>
                                <div class="col-sm-3">
                                    <select name="repeat" v-model="repeat" class="form-control">
                                        <option value="0">不重复</option>
                                        <option value="1">每天</option>
                                        <option value="5">每个工作日</option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name="is_full_day" value="1" v-model="is_full_day">
                                            全天
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">提醒状态</label>
                                <div class="col-sm-4">
                                    <select name="status" class="form-control" v-model="status">
                                        <option value="1">已完成</option>
                                        <option value="0">未完成</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="deleteInfo('CreateRe')" v-if="id!==''">
                                删除提醒
                            </button>
                            <button type="button" class="btn btn-default" @click="createNext(1)">完成并创建下一个</button>
                            <button type="button" class="btn btn-primary" @click="validateBeforeSubmit()">保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="CreateSch">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">创建日程</h4>
                    </div>
                    <form action="" method="POST" class="form-horizontal" id="form4" autocomplete="off">
                        <input type="hidden" name="id" :value="id" v-if="id!==''"/>
                        <input type="hidden" name="type" value="1"/>
                        <div class="modal-body pl-30 pr-30">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">添加标题</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="title" v-model="title"
                                           placeholder="请输入日程标题">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">优先级</label>
                                <div class="col-sm-10">
                                    <div class="radio priority">
                                        <label :class="priority===3?'high active':'high'" title="高">
                                            <input type="radio" name="priority" value="3" v-model.number="priority">
                                        </label>
                                        <label :class="priority===2?'in active':'in'" title="中">
                                            <input type="radio" name="priority" value="2" v-model.number="priority">
                                        </label>
                                        <label :class="priority===1?'low active':'low'" title="低">
                                            <input type="radio" name="priority" value="1" v-model.number="priority">
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">选择时间</label>
                                <div class="col-sm-5" v-show="!is_full_day">
                                    <input type="text" name="time" class="form-control dateTime" v-model="dateTime"
                                           placeholder="请选择日期"/>
                                </div>
                                <div class="col-sm-5" v-show="is_full_day">
                                    <input type="text" name="day" class="form-control dateDay" v-model="dateDay"
                                           placeholder="请选择日期"/>
                                </div>
                                <div class="col-sm-5">
                                    <div class="checkbox" style="display:inline-block;">
                                        <label>
                                            <input type="checkbox" name="is_full_day" value="1" v-model="is_full_day">
                                            全天
                                        </label>
                                    </div>

                                    <div class="dropdown" style="display: inline-block;">
                                        <i :class="repeat!==0?'iconfont font20 cded ml-15':'iconfont font20 c999 ml-15'"
                                           style="cursor:pointer;"
                                           data-toggle="dropdown">&#xe8bf;</i>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <input type="hidden" name="repeat" :value="repeat"/>
                                            <li @click="repeat=0" :class="repeat===0?'po_re active':'po_re'"><a
                                                    href="#">不重复</a></li>
                                            <li @click="repeat=1" :class="repeat===1?'po_re active':'po_re'"><a
                                                    href="#">每天重复</a></li>
                                            <li @click="repeat=2" :class="repeat===2?'po_re active':'po_re'"><a
                                                    href="#">每周重复</a></li>
                                            <li @click="repeat=3" :class="repeat===3?'po_re active':'po_re'"><a
                                                    href="#">每月重复</a></li>
                                            <li @click="repeat=4" :class="repeat===4?'po_re active':'po_re'"><a
                                                    href="#">每年重复</a></li>
                                            <li @click="repeat=5" :class="repeat===5?'po_re active':'po_re'"><a
                                                    href="#">工作日重复</a></li>
                                        </ul>
                                    </div>

                                    <div class="dropdown" style="display: inline-block;">
                                        <i :class="remind!==0?'iconfont font20 cded ml-15':'iconfont font20 c999 ml-15'"
                                           style="cursor:pointer;"
                                           data-toggle="dropdown">&#xe6b4;</i>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <input type="hidden" name="remind" :value="remind"/>
                                            <li @click="remind=0" :class="remind===0?'active':''"><a href="#">关闭提醒</a>
                                            </li>
                                            <li @click="remind=1" :class="remind===1?'active':''"><a href="#">开始时提醒</a>
                                            </li>
                                            <li @click="remind=2" :class="remind===2?'active':''"><a href="#">5分钟提醒</a>
                                            </li>
                                            <li @click="remind=3" :class="remind===3?'active':''"><a href="#">15分钟提醒</a>
                                            </li>
                                            <li @click="remind=4" :class="remind===4?'active':''"><a href="#">30分钟提醒</a>
                                            </li>
                                            <li @click="remind=5" :class="remind===5?'active':''"><a href="#">1小时前</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">参与者</label>
                                <div class="col-sm-10">
                                    <select name="participant[]" class="form-control selectPicker" v-model="participant"
                                            multiple>
                                        <option :value="item.id" v-for="(item,i) in PartList" :key="i">{{item.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">日程说明</label>
                                <div class="col-sm-10">
                                    <textarea name="content" class="form-control" style="height: 80px;"
                                              v-model="content"></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">日程状态</label>
                                <div class="col-sm-5">
                                    <select name="status" class="form-control" v-model="status">
                                        <option value="1">已完成</option>
                                        <option value="0">未完成</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="deleteInfo('CreateSch')"
                                    v-if="id!==''">删除提醒
                            </button>
                            <button type="button" class="btn btn-default" @click="createNext(2)">完成并创建下一个</button>
                            <button type="button" class="btn btn-primary" @click="validateBeforeSubmitSch()">保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import '@~/js/VeeValidateConfig'
import echarts from 'echarts'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Home',
  store,
  data () {
    return {
      loading: true,
      name: 'home',
      aMonStr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      uDate: [],
      finish: '',
      all: '',
      prog: '',
      date1: '',
      date2: '',
      list: [],
      // --------------------------------
      id: '',
      title: '',
      is_full_day: '',
      repeat: 0,
      status: 0,
      dateTime: '',
      dateDay: '',
      priority: 2,
      remind: 0,
      participant: [],
      PartList: [],
      content: ''
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.newDate = new Date()
    self.name = (self.$route.name).toLocaleLowerCase()
    let date = new Date()
    let M = date.getMonth() + 1
    let MM = M < 10 ? '0' + M : M
    let d = date.getDate()
    let dd = d < 10 ? '0' + d : d
    let H = date.getHours()
    let HH = H < 10 ? '0' + H : H
    let m = date.getMinutes()
    let mm = m < 10 ? '0' + m : m

    setTimeout(function () {
      $(document).on('click', function (e) {
        let i = $(e.target)
        if (!i.closest('.addUpcoming, .popover-content').length > 0) {
          $('.addUpcoming').popover('hide')
        }
      })

      self.laydate.render({
        elem: '.times',
        format: 'yyyy-MM-dd',
        done: (value) => {
          let m = self.aMonStr[parseInt(value.split('-')[1]) - 1]
          self.date2 = m + ' ' + value.split('-')[2]
          self.date1 = value
          self.newDate = new Date(value)
          self.getUpcoming()
        }
      })

      $(document).on('click', '.addUpcoming', function () {
        $(this).popover({
          html: true,
          placement: 'bottom',
          container: 'body',
          content: "<p><a href='#' class='CreateRe'>创建提醒</a></p><p><a href='#' class='CreateSch'>创建日程</a></p>"
        })
        $(this).popover('show')
      })

      // **********创建提醒****************
      $(document).on('click', '.CreateRe', function () {
        $('.addUpcoming').popover('hide')
        $('#CreateRe').modal('show')
        self.id = ''
        self.title = ''
        self.repeat = 0
        self.is_full_day = false
        self.status = 0
        self.time = ''
        self.participant = []
        self.content = ''
        self.priority = 2
        self.remind = 0
        self.dateTime = MM + '-' + dd + ' ' + HH + ':' + mm + ' - ' + MM + '-' + dd + ' ' + HH + ':' + mm
        self.dateDay = MM + '-' + dd + ' - ' + MM + '-' + dd
      })
      // **********创建日程****************
      $(document).on('click', '.CreateSch', function () {
        $('.addUpcoming').popover('hide')
        $('#CreateSch').modal('show')
        $('.selectPicker').selectpicker('refresh')
        self.id = ''
        self.title = ''
        self.repeat = 0
        self.is_full_day = false
        self.status = 0
        self.time = ''
        self.participant = []
        self.content = ''
        self.priority = 2
        self.remind = 0
        self.dateTime = MM + '-' + dd + ' ' + HH + ':' + mm + ' - ' + MM + '-' + dd + ' ' + HH + ':' + mm
        self.dateDay = MM + '-' + dd + ' - ' + MM + '-' + dd
      })

      self.setDates()

      $('.dateTime').each(function (index, element) {
        self.laydate.render({
          elem: element,
          type: 'datetime',
          format: 'MM-dd HH:mm',
          range: true,
          done: (value) => {
            self.dateTime = value
          }
        })
      })

      $('.dateDay').each(function (index, element) {
        self.laydate.render({
          elem: element,
          type: 'date',
          range: true,
          format: 'MM-dd',
          done: (value) => {
            self.dateDay = value
          }
        })
      })
    }, 1000)

    self.getHomeInfo()
    self.getPart()
  },
  methods: {
    getHomeInfo () {
      let self = this
      self.loading = true
      db.postRequest('Institution/Home/getStatistic', {}).then(res => {
        if (res.status === 1) {
          self.createEcharts(res.data)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
        self.loading = false
      })
    },
    setDates () {
      let self = this
      let MM = ''
      let DD = ''
      let Y = self.newDate.getFullYear()
      let M = self.newDate.getMonth()
      let D = self.newDate.getDate()
      if (M < 9) {
        MM = '0' + (M + 1)
      } else {
        MM = M + 1
      }
      if (D < 10) {
        DD = '0' + D
      } else {
        DD = D
      }
      self.date1 = Y + '-' + MM + '-' + DD
      self.date2 = self.aMonStr[M] + ' ' + DD

      for (let i = 0; i < self.laydate.getEndDate(M); i++) {
        self.uDate.push(i + 1)
      }
      self.getUpcoming()
    },
    // 编辑修改今日等办
    getInfo (events) {
      let self = this
      self.id = events.id
      self.title = events.title
      self.is_full_day = events.is_full_day
      self.repeat = events.repeat
      self.status = events.status
      if (events.is_full_day === 1) {
        self.dateDay = events.time
      } else {
        self.dateTime = events.time
      }
      if (events.type === 1) {
        self.participant = events.participant
        self.content = events.content
        setTimeout(function () {
          $('.selectPicker').selectpicker('refresh')
        }, 500)
      }
    },
    // 获取参与者
    getPart () {
      let self = this
      db.postRequest('Institution/Home/getParticipant', {}).then(res => {
        if (res.status === 1) {
          self.PartList = res.data
        } else {
          console.log('获取参与者出错')
        }
      })
    },
    getUpcoming () {
      let self = this
      let params = new URLSearchParams()
      params.append('schedule_date', self.date1)
      db.getRequest('Institution/Home/index', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.finish = res.data.finish
          self.all = res.data.all
          self.prog = (res.data.finish / res.data.all) * 100 || 0
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    createEcharts (data) {
      let self = this
      setTimeout(function () {
        let dom = document.getElementById('echarts')
        let myChart = echarts.init(dom)
        let option = {
          title: {
            text: '',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} <br/>{c} ({d}%)'
          },
          color: ['#f28770', '#01b1ee', '#30c67d', '#9f88ec'],
          legend: {
            right: '1%',
            top: '28%',
            height: 120,
            orient: 'vertical',
            itemGap: 20,
            itemWidth: 25,
            icon: 'circle',
            data: data.title,
            formatter: function (name) {
              let target
              for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].name === name) {
                  target = data.data[i].value
                }
              }
              let arr = ['{b|' + target + '}', '{a|' + name + '}']
              return arr.join('\n')
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 24,
                  padding: [5, 0, 5, 0],
                  color: '#333333'
                },
                b: {
                  fontSize: 22,
                  lineHeight: 24,
                  padding: [5, 0, 5, 0],
                  color: '#EA5504'
                }
              }
            }
          },
          series: [
            {
              name: '数据表',
              type: 'pie',
              radius: [25, 100],
              center: ['18%', '50%'],
              roseType: 'radius',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: data.data
            }
          ]
        }
        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
          myChart.on('legendselectchanged', function (params) {
            data.link.map((item, i) => {
              if (params.name === data.title[i]) {
                self.$router.push(item)
              }
            })
          })
        }
      }, 500)
    },
    setState (id) {
      let self = this
      db.getRequest('Institution/Home/changeScheduleStatus?id=' + id, {}).then(res => {
        if (res.status === 1) {
          self.getUpcoming()
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
      })
    },
    delData (id) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        shadeClose: false
      }, function (i) {
        self.layer.close(i)
        db.postRequest('Institution/Home/delSchedule?id=' + id, {}).then(res => {
          if (res.status === 1) {
            self.list.map((item, i) => {
              if (item.id === id) {
                self.list.splice(i, 1)
              }
            })
          } else {
            self.layer.alert(res.msg, {
              shadeClose: false
            })
          }
        })
      })
    },
    CalculationDate (boole) {
      let self = this
      if (boole === true) {
        self.newDate.setDate(self.newDate.getDate() + 1)
      } else {
        self.newDate.setDate(self.newDate.getDate() - 1)
      }
      self.setDates()
    },
    validateBeforeSubmit (type) {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#form3').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Home/newEditSchedule', params).then(res => {
            if (res.status === 1) {
              self.getUpcoming()
              if (type !== 1) {
                self.layer.alert(res.msg, {
                  icon: 1
                }, function (i) {
                  self.layer.close(i)
                  $('#CreateRe').modal('hide')
                  self.title = ''
                  self.repeat = 0
                  self.is_full_day = false
                  self.status = 0
                  self.dateTime = ''
                  self.dateDay = ''
                  $('[name="time"],[name="day"]').val('')
                })
              }
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    validateBeforeSubmitSch (type) {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#form4').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Home/newEditSchedule', params).then(res => {
            if (res.status === 1) {
              self.getUpcoming()
              if (type !== 1) {
                self.layer.alert(res.msg, {
                  icon: 1
                }, function (i) {
                  self.layer.close(i)
                  $('#CreateSch').modal('hide')
                  self.title = ''
                  self.repeat = 0
                  self.is_full_day = false
                  self.status = 0
                  self.time = ''
                  self.participant = []
                  self.content = ''
                  self.priority = 2
                  self.remind = 0
                  self.dateTime = ''
                  self.dateDay = ''
                  $('[name="time"],[name="day"]').val('')
                })
              }
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    createNext (type) {
      let self = this
      if (type === 1) {
        self.validateBeforeSubmit(1)
      } else {
        self.validateBeforeSubmitSch(1)
      }
      $('.bootstrap-select .filter-option-inner-inner').html('没有选中任何项')
      setTimeout(function () {
        self.id = ''
        self.title = ''
        self.repeat = 0
        self.is_full_day = false
        self.status = 0
        self.time = ''
        self.participant = []
        self.content = ''
        self.priority = 2
        self.remind = 0
        self.dateTime = ''
        self.dateDay = ''
        $('[name="time"],[name="day"]').val('')
      }, 1000)
    },
    deleteInfo (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.getRequest('Institution/Home/ScheduleDel', params).then(res => {
        if (res.status === 1) {
          self.getUpcoming()
          self.title = ''
          self.repeat = 0
          self.is_full_day = false
          self.status = 0
          self.time = ''
          self.participant = []
          self.content = ''
          self.priority = 2
          self.remind = 0
          self.dateTime = ''
          self.dateDay = ''
          $('#' + id).modal('hide')
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    }
  },
  watch: {
    $route (to, from) {
      this.name = (to.name).toLocaleLowerCase()
      if (this.name === 'home') {
        this.getHomeInfo()
        this.getUpcoming()
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .functionList {
        padding:15px;

        & .media {
            margin:15px 0;position:relative;

            & .media-left {display:block;position:absolute;left:0;top:0;}

            & .media-body {
                display:block;padding-left:45px;width:100%;

                & > div {white-space:nowrap;overflow:hidden;-ms-text-overflow:ellipsis;text-overflow:ellipsis;}
            }

            & .iconfont {
                width:40px;height:40px;text-align:center;line-height:40px;background-color:#0094fc;color:#fff;font-size:26px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;
            }
        }

        & > div {
            &:nth-of-type(2) .iconfont {background-color:#8fcf8f;}

            &:nth-of-type(3) .iconfont {background-color:#8fbdd0;}

            &:nth-of-type(4) .iconfont {background-color:#849bd0;}

            &:nth-of-type(5) .iconfont {background-color:#a984d0;}

            &:nth-of-type(6) .iconfont {background-color:#0094fc;}

            &:nth-of-type(7) .iconfont {background-color:#8fcf8f;}

            &:nth-of-type(8) .iconfont {background-color:#8fbdd0;}

            &:nth-of-type(9) .iconfont {background-color:#849bd0;}

            &:nth-of-type(10) .iconfont {background-color:#a984d0;}
        }
    }

    .UpcomingWrap {
        background:#fff;height:303px;

        & .UpcomingTitle {
            height:40px;border-bottom:1px solid #dedede;

            & > span {display:block;float:left;height:40px;}

            & .UpcomingNum {
                width:10%;height:40px;line-height:40px;text-align:center;
            }

            & .progress {
                width:40%;height:40px;background-color:transparent;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;position:relative;margin:0 10%;

                &:before {content:'';width:100%;height:6px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;display:block;position:absolute;left:0;top:17px;background-color:#ebebeb;z-index:1;}

                & > i {position:absolute;left:0;top:17px;z-index:2;width:50%;height:6px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;background-color:#78a95a;}
            }

            & .setDate {
                width:20%;text-align:center;position:relative;line-height:40px;cursor:pointer;

                & > a {
                    display:block;width:20px;height:40px;line-height:40px;text-align:center;position:absolute;top:0;z-index:10;font-family:'iconfont';font-size:20px;

                    &.prov {left:0;}

                    &.next {right:0;}
                }

                & > span {display:block;position:absolute;width:50%;height:40px;left:50%;margin-left:-25%;top:0;z-index:2;filter:Alpha(Opacity=0); opacity:0; white-space:normal;overflow:hidden;}
            }

            & .addUpcoming {
                width:10%;text-align:center;line-height:40px;
            }
        }

        & .UpcomingContent {
            padding:0 15px;height:263px;

            & .row {
                height:40px;margin-top:3px;margin-bottom:4px; border-left:3px solid #fff;line-height:40px;

                & .label {-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;font-weight:500;padding:3px 10px;}

                &.state-0 {border-left-color:#a1c38e;}

                &.state-1 {border-left-color:#3dc0ee;}

                &.state-2 {border-left-color:#f08772;}

                & .label-default {background-color:#f8f8f8;color:#9e9ea4;}

                & .label-success {background-color:#8fcf8f;color:#fff;}

                & .label-warning {background-color:#f08772;color:#fff;}

                &:hover {box-shadow:1px 1px 5px #ccc;}
            }

            & .dropdown-menu {
                min-width:100px;left:-45px;text-align:center;
            }
        }
    }

    .statistics {
        height:303px;overflow:hidden;padding:15px;position:relative;

        & > a {position:absolute;right:20px;top:20px;display:block;width:100px;height:30px;line-height:30px;z-index:10;color:#999;}

        & #echarts {
            width:100%;height:270px;
        }
    }

    #CreateSch {
        & .priority {
            & label {
                width:20px;height:20px;display:inline-block;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;margin-right:15px;position:relative;cursor:pointer;

                & input {filter:Alpha(Opacity=0); opacity:0;z-index:-1;}

                &.high {background-color:#f08772;}

                &.in {background-color:#3dc0ee;}

                &.low {background-color:#a1c38e;}

                &.active {
                    &:before {
                        content:'\e607';font-family:"iconfont";width:20px;height:20px;line-height:20px;text-align:center;position:absolute;left:0;top:2px;color:#fff;
                    }
                }
            }
        }
    }
</style>
