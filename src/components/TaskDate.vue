<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div class="po_re">
            <div class="checkbox eventType po_ab" style='left:160px;top:0;'>
                <label>
                    <input type="checkbox" name="show_remind" value="2" checked> 提醒
                </label>
                <label class='ml-10'>
                    <input type="checkbox" name="show_task" value="1" checked> 日程
                </label>
            </div>
        </div>
        <FullCalendar
                ref="fullCalendar"
                defaultView="dayGridMonth"
                locale="zh-cn"
                :header="{
                    left: 'timeGridWeek,dayGridMonth today',
                    center: 'prev title next',
                    right: ''
                  }"
                :views="{
                    timeGrid: {
                      eventLimit: 6
                    }
                }"
                :eventTimeFormat="{
                    hour:'2-digit',
                    minute:'2-digit',
                    hour12: false
                }"
                :eventLimit="true"
                :plugins="calendarPlugins"
                :weekends="calendarWeekends"
                :editable="false"
                :events="calendarEvents"
                :buttonText="buttonText"
                @dateClick="handleDateClick"
                @eventClick="handleEventClick"
        />

        <div id="popoverMenu" style="display: none;">
            <dd>
                <i class='iconfont'>&#xe6b4;</i>
                <a href='#' class="createRe">创建提醒</a>
            </dd>
            <dd>
                <i class='iconfont'>&#xe600;</i>
                <a href='#' class="createSch">创建日程</a>
            </dd>
        </div>

        <div class="modal fade" id="createRe">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">创建提醒</h4>
                    </div>
                    <form action="" method="POST" class="form-horizontal" id="form1" autocomplete="off">
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
                                    <input type="text" name="time" class="form-control dateTime" placeholder="请选择日期">
                                </div>
                                <div class="col-sm-5" v-show="is_full_day">
                                    <input type="text" name="day" class="form-control dateDay"
                                           placeholder="请选择日期">
                                </div>
                                <div class="col-sm-3">
                                    <select name="repeat" v-model="repeat" class="form-control selectPicker">
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
                                    <select name="status" class="form-control selectPicker" v-model="status">
                                        <option value="1">已完成</option>
                                        <option value="0">未完成</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="deleteInfo('createRe')" v-if="id!==''">
                                删除提醒
                            </button>
                            <button type="button" class="btn btn-default" @click="createNext(1)">完成并创建下一个</button>
                            <button type="button" class="btn btn-primary" @click="validateBeforeSubmit()">保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="createSch">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">创建日程</h4>
                    </div>
                    <form action="" method="POST" class="form-horizontal" id="form2" autocomplete="off">
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
                                    <input type="text" name="time" class="form-control dateTime" placeholder="请选择日期"/>
                                </div>
                                <div class="col-sm-5" v-show="is_full_day">
                                    <input type="text" name="day" class="form-control dateDay" placeholder="请选择日期"/>
                                </div>
                                <div class="col-sm-5">
                                    <div class="checkbox" style="display:inline-block;">
                                        <label>
                                            <input type="checkbox" name="is_full_day" value="1" v-model="is_full_day">
                                            全天
                                        </label>
                                    </div>

                                    <div class="dropdown" style="display: inline-block;" data-toggle="tooltip" title="设置重复">
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

                                    <div class="dropdown" style="display: inline-block;" data-toggle="tooltip" title="设置提醒">
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
                                    <select name="status" class="form-control selectPicker" v-model.number="status">
                                        <option value="1">已完成</option>
                                        <option value="0">未完成</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="deleteInfo('createSch')"
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
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'TaskDate',
  store,
  data () {
    return {
      id: '',
      title: '', // 标题
      time: '', // 时间
      participant: [], // 参与者
      content: '', // 内容
      priority: 2, // 优先级
      status: 0, // 状态
      repeat: 0, // 重复
      remind: 0, // 提醒
      is_full_day: false, // 是否全天

      dateDay: '',
      dateTime: '',
      PartList: [],
      show_remind: 1,
      show_task: 1,
      // -------------------------------
      buttonText: {
        today: '回今天',
        month: '月',
        week: '周',
        day: '天',
        list: '列表'
      },
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin
      ],
      calendarWeekends: true,
      calendarEvents: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    let calendarApi = self.$refs.fullCalendar.getApi()
    self.getEventInfo()
    self.getPart()

    self.$nextTick(() => {
      setTimeout(function () {
        $(document).on('click', function (e) {
          let i = $(e.target)
          if (!i.closest('.fc-view-container, div.popover').length > 0) {
            $('.fc-bg td').popover('hide')
          }
        })

        $('[data-toggle="tooltip"]').tooltip()
      }, 500)
      // 点击上一个月、周、天
      $(document).on('click', '.fc-header-toolbar [aria-label="prev"]', function () {
        let D = new Date(calendarApi.getDate())
        let MM = D.getMonth() + 1
        MM = (MM < 10) ? '0' + MM : MM
        let Ndate = D.getFullYear() + '-' + MM
        self.getEventInfo(Ndate)
        $('[id^="popover"]').hide()
      })
      // 点击下一个月、周、天
      $(document).on('click', '.fc-header-toolbar [aria-label="next"]', function () {
        let D = new Date(calendarApi.getDate())
        let MM = D.getMonth() + 1
        MM = (MM < 10) ? '0' + MM : MM
        let Ndate = D.getFullYear() + '-' + MM
        self.getEventInfo(Ndate)
        $('[id^="popover"]').hide()
      })
      // 点击头部工具栏
      $(document).on('click', '.eventType [type="checkbox"]', function () {
        let showRemind = $('.eventType [name="show_remind"]').is(':checked')
        let showTask = $('.eventType [name="show_task"]').is(':checked')
        self.show_remind = showRemind ? 1 : ''
        self.show_task = showTask ? 1 : ''
        self.getEventInfo()
      })
      // 弹出创建提醒
      $(document).on('click', '.createRe', function () {
        self.id = ''
        self.title = ''
        self.repeat = 0
        self.is_full_day = false
        self.status = 0
        $('#createRe').modal({
          backdrop: 'static',
          show: true
        })
        $('.fc-bg td').popover('hide')
        setTimeout(function () {
          $('.selectPicker').selectpicker('refresh')
        }, 500)
      })
      // 弹出创建日程
      $(document).on('click', '.createSch', function () {
        self.id = ''
        self.title = ''
        self.time = ''
        self.participant = []
        self.content = ''
        self.priority = 2
        self.status = 0
        self.repeat = 0
        self.remind = 0
        self.is_full_day = false
        $('#createSch').modal({
          backdrop: 'static',
          show: true
        })
        $('.fc-bg td').popover('hide')
        setTimeout(function () {
          $('.selectPicker').selectpicker('refresh')
        }, 500)
      })
    })
  },
  methods: {
    // 获取事件
    getEventInfo (date) {
      let self = this
      let params = new URLSearchParams()
      params.append('date', date || '')
      params.append('show_remind', self.show_remind)
      params.append('show_task', self.show_task)
      db.postRequest('Institution/Home/calendarInfo', params).then(res => {
        if (res.status === 1) {
          self.calendarEvents = res.data
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
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
    // 用户点击日期或时间触发
    handleDateClick (info) {
      let self = this
      let parI = $(info.dayEl).parents('.fc-row').index()
      let i = $(info.dayEl).index()
      let date = new Date(info.dateStr)
      let MM = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

      $('.fc-bg td').popover({
        html: true,
        placement: 'auto',
        container: 'body',
        content: function () {
          return $('#popoverMenu').html()
        }
      })
      $('.fc-bg td').popover('hide')
      self.dateDay = MM + '-' + DD + ' - ' + MM + '-' + DD
      self.dateTime = MM + '-' + DD + ' 00:00 - ' + MM + '-' + DD + ' 00:00'
      setTimeout(function () {
        $('.fc-day-grid').find('.fc-row').eq(parI).find('.fc-bg td').eq(i).popover('show')
        self.viewTime()
      }, 300)
    },
    // 用户点击事件触发
    handleEventClick (info) {
      let self = this
      let sDate = new Date(info.event.extendedProps.time_start)
      let eDate = new Date(info.event.extendedProps.time_end)
      self.id = info.event.id || ''
      self.title = info.event.title
      self.repeat = info.event.extendedProps.repeat
      self.remind = info.event.extendedProps.remind
      self.priority = info.event.extendedProps.priority
      self.participant = info.event.extendedProps.participant
      self.content = info.event.extendedProps.content
      self.is_full_day = info.event.extendedProps.is_full_day === 1
      self.status = info.event.extendedProps.status
      let m = sDate.getMonth() + 1
      let mm = m < 10 ? '0' + m : m
      let d = sDate.getDate()
      let dd = d < 10 ? '0' + d : d
      let h = sDate.getHours()
      let hh = h < 10 ? '0' + h : h
      let s = sDate.getMinutes()
      let ss = s < 10 ? '0' + s : s
      let M = eDate.getMonth() + 1
      let MM = M < 10 ? '0' + M : M
      let D = eDate.getDate()
      let DD = D < 10 ? '0' + D : D
      let H = eDate.getHours()
      let HH = H < 10 ? '0' + H : H
      let S = eDate.getMinutes()
      let SS = S < 10 ? '0' + S : S
      self.dateTime = mm + '-' + dd + ' ' + hh + ':' + ss + ' - ' + MM + '-' + DD + ' ' + HH + ':' + SS
      self.dateDay = mm + '-' + dd + ' - ' + MM + '-' + DD

      if (info.event.extendedProps.type === 1) {
        let selectVal = []
        $('#createSch').modal('show')
        info.event.extendedProps.participant.map(item => {
          self.PartList.map(it => {
            if (it.id === parseInt(item)) {
              selectVal.push(it.name)
            }
          })
        })
        $('.bootstrap-select .filter-option-inner-inner').html(selectVal.join(','))
      }
      if (info.event.extendedProps.type === 2) {
        $('#createRe').modal('show')
      }
      setTimeout(function () {
        $('.selectPicker').selectpicker('refresh')
      }, 500)
      self.viewTime()
    },
    changeMonth (start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    validateBeforeSubmit (type) {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#form1').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Home/newEditSchedule', params).then(res => {
            if (res.status === 1) {
              self.getEventInfo()
              if (type !== 1) {
                self.layer.alert(res.msg, {
                  icon: 1
                }, function (i) {
                  self.layer.close(i)
                  $('#createRe').modal('hide')
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
          let formData = $('#form2').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Home/newEditSchedule', params).then(res => {
            if (res.status === 1) {
              self.getEventInfo()
              if (type !== 1) {
                self.layer.alert(res.msg, {
                  icon: 1
                }, function (i) {
                  self.layer.close(i)
                  $('#createSch').modal('hide')
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
    viewTime () {
      let self = this
      setTimeout(function () {
        $('.dateTime').each(function (index, element) {
          self.laydate.render({
            elem: element,
            type: 'datetime',
            value: self.dateTime,
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
            value: self.dateDay,
            done: (value) => {
              self.dateDay = value
            }
          })
        })
      }, 1000)
    },
    createNext (type) {
      let self = this
      if (type === 1) {
        self.validateBeforeSubmit(1)
      } else {
        self.validateBeforeSubmitSch(1)
      }
      $('.bootstrap-select .filter-option-inner-inner').html('没有选中任何项')
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
    },
    deleteInfo (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.getRequest('Institution/Home/ScheduleDel', params).then(res => {
        if (res.status === 1) {
          self.getEventInfo()
          $('#' + id).modal('hide')
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    }
  },
  components: {
    FullCalendar
  }
}
</script>

<style>
    @import "../../node_modules/@fullcalendar/core/main.min.css";
    @import '../../node_modules/@fullcalendar/daygrid/main.css';
    @import '../../node_modules/@fullcalendar/timegrid/main.css';
</style>
<style lang="less">
    .fc-button-group{
        & button{
            &.fc-button-primary{
            }
        }
    }

    .fc-toolbar.fc-header-toolbar{
        & .fc-left{
            & button{
                background-color:#fff;color:#333;border-color:#d9d9d9;

                &.fc-button-active, &:disabled{
                    background:#d9d9d9;
                }
            }
        }

        & .fc-center{
            & h2{display:inline-block;vertical-align:middle;font-size:16px;}

            & button{
                padding:0;border:none;background-color:transparent;color:#666;vertical-align:middle;

                .fc-icon{margin-top:-2px;}
            }
        }
    }

    .fc-body{
        & .fc-bg{ }

        & .fc-content-skeleton{
            bottom:0;

            & .fc-event-container{
                & a{
                    border:none;cursor:pointer;background:#fce5e0;

                    & .fc-content{ background:#fce5e0;color:#333; }

                    &.expired{
                        background:#f4f4f4;

                        & .fc-content{
                            background:#f4f4f4;color:#999;text-decoration:line-through;
                        }
                    }

                    &.schedule{
                        background:#3788d8;

                        & .fc-content{
                            background:#3788d8;color:#fff;
                        }
                    }
                }
            }
        }
    }

    .popover-content{
        padding:15px 30px;

        & dd{
            line-height:35px;

            & a{display:inline-block;vertical-align:middle;margin-left:5px;color:#666;}
        }
    }
</style>
<style scoped lang="less">
    #createSch{
        & .priority{
            & label{
                width:20px;height:20px;display:inline-block;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;margin-right:15px;position:relative;cursor:pointer;

                & input{filter:Alpha(Opacity=0); opacity:0;z-index:-1;}

                &.high{background-color:#f08772;}

                &.in{background-color:#3dc0ee;}

                &.low{background-color:#a1c38e;}

                &.active{
                    &:before{
                        content:'\e607';font-family:"iconfont";width:20px;height:20px;line-height:20px;text-align:center;position:absolute;left:0;top:2px;color:#fff;
                    }
                }
            }
        }
    }

    .dropdown{
        & .dropdown-menu{
            & li{
                position:relative;

                &.active{
                    &:after{
                        content:'\e607';font-family:"iconfont";width:20px;height:20px;line-height:20px;text-align:center;position:absolute;right:0;top:3px;
                    }

                    & a{background-color:transparent;color:#333;text-align:left;}
                }
            }
        }
    }
</style>
