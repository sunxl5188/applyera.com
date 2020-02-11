<template>
    <div class="addAnswer">
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">题目作答</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group">
                        <button type="button" class="btn btn-default ml-10" @click="sendStudent()"><i class="iconfont">&#xe62c;</i>
                            分享
                        </button>
                        <button type="button" class="btn btn-default ml-10" @click="saveData()"><i class="iconfont">&#xe637;</i>
                            保存
                        </button>
                        <button type="button" class="btn btn-default ml-10" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 bdr-d leftBox">
                <table class="table">
                    <tbody>
                    <tr>
                        <td class="w20 text-center bgGray">学生姓名</td>
                        <td>
                            <div v-if="status!==2">
                                <select v-model="stu_id" class="form-control selectpicker show-tick" data-width="fit"
                                        data-live-search="true" data-size="10">
                                    <option value="">请选择</option>
                                    <option :value="item.id" v-for="(item, i) in studentArr" :key="i">
                                        {{item.stu_name}}
                                    </option>
                                </select>
                            </div>
                            <div v-if="status===2">
                                <span class="textOver" :title="item.stu_name" v-for="(item, i) in studentArr" :key="i" v-if="item.id===stu_id">{{item.stu_name}}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">申报类型</td>
                        <td>
                            <div v-if="status!==2">
                                <select v-model.number="apply_type" @change="getProfession()"
                                        class="form-control selectpicker show-tick" data-width="fit">
                                    <option value="1">本科</option>
                                    <option value="2">硕士</option>
                                </select>
                            </div>
                            <div v-if="status===2">
                                <span v-if="apply_type===1">本科</span>
                                <span v-if="apply_type===2">硕士</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">申请学校</td>
                        <td>
                            <div v-if="status!==2">
                                <select v-model="school_unq_id" @change="getProfession()"
                                        class="form-control selectpicker show-tick" data-width="fit" data-live-search="true" data-size="10">
                                    <option value="">请选择</option>
                                    <option value="custom">自定义学校</option>
                                    <option :value="item.unq_id" v-for="(item, i) in schoolArr" :key="i">
                                        {{item.sc_name}}
                                    </option>
                                </select>
                            </div>
                            <div v-if="status===2">
                                <span class="textOver" :title="item.sc_name" v-for="(item, i) in schoolArr" :key="i" v-if="item.unq_id===school_unq_id">{{item.sc_name}}</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="school_unq_id==='custom'">
                        <td class="w20 text-center bgGray">自定义学校</td>
                        <td>
                            <input type="text" name="school_custom" class="form-control" v-model="school_custom" placeholder="请输入自定义学校名称" style="border-color:transparent;"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">申请专业</td>
                        <td>
                            <div v-if="status!==2">
                                <select v-model="major_unq_id" @change="getTopic()"
                                        class="form-control selectpicker show-tick" data-width="fit" data-live-search="true" data-size="10">
                                    <option value="">请选择</option>
                                    <option value="custom">自定义专业</option>
                                    <option :value="item.unq_id" v-for="(item, i) in professionArr" :key="i">
                                        {{item.mj_name}}
                                    </option>
                                </select>
                            </div>
                            <div v-if="status===2">
                                <span class="textOver" :title="item.mj_name" v-for="(item, i) in professionArr" :key="i" v-if="item.unq_id===major_unq_id">{{item.mj_name}}</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="major_unq_id === 'custom'">
                        <td class="w20 text-center bgGray">自定义专业</td>
                        <td>
                            <input type="text" name="major_custom" class="form-control" v-model="major_custom" placeholder="请输入自定义专业名" style="border-color:transparent;"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="clearfix" v-if="topic.custom_ps">
                    <div class="clearfix lh50 font16 fontB">个人陈述</div>
                    <div class="clearfix lh22 pb-15">
                        <div :contenteditable="id?true:false" data-placeholder="请输入个人陈述"
                             v-html="topic.custom_ps" class="wordwrap"></div>
                    </div>
                    <div class="clearfix bdt pt-15">
                        <div :class="{notebook:id&&status!==2}" class="wordwrap" :contenteditable="status!==2?true:false" :data-placeholder="topic.answer_ps_tips" id="answer_ps" v-html="topic.answer_ps"></div>
                    </div>
                    <div class="clearfix lh50 font16 fontB mt-30">Writing Sample</div>
                    <div class="clearfix lh22 pb-15">
                        <div class="wordwrap" :contenteditable="id?true:false" data-placeholder="请输入个人写作"
                             v-html="topic.custom_ws"></div>
                    </div>
                    <div class="clearfix bdt pt-15 mt-15">
                        <div :class="{notebook:id&&status!==2}" class="wordwrap" :contenteditable="status!==2?true:false" :data-placeholder="topic.answer_ws_tips" id="answer_ws" v-html="topic.answer_ws"></div>
                    </div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="commentBox">
                    <div class="dropdown">
                        <a href="javascript:void(0);" data-toggle="dropdown">
                            {{dropName}}
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#" @click="getComment();dropName='批注记录'">批注记录</a></li>
                            <li><a href="#" @click="getOperAction();dropName='操作记录'">操作记录</a></li>
                        </ul>
                    </div>
                    <div class="clearfix pt-15" v-if="dropName==='批注记录'">
                        <ul class="media-list rightMediaList">
                            <div class="mediaItem" :data-id="item[0]['front_code']" v-for="(item, i) in commentArr"
                                 :key="i">
                                <div class="media media-top">
                                    <div class="media-item" :class="{gtTwo:item.length>1}"
                                         v-for="(items, k) in item" :key="k" :data-id="items.id">
                                        <div class="media-left">
                                            <img :src="items.head_img || '../../static/images/defaultface.png'" class="img-circle userHeader"/>
                                        </div>
                                        <div class="media-body">
                                            <div class="media-heading">
                                        <span class="pull-left">{{items.user_name}} <span
                                                class="c999 font12">{{items.created_time}}</span></span>
                                                <a href="javascript:void(0);" class="pull-right cded" v-if="k === 0" v-show="item[0]['solve_status']===0" @click="delComment(items.id, 'solve', items.front_code)">解决</a>
                                            </div>
                                            <div class="clearfix commentContent font12 c999 lh20 pb-5 pt-5"
                                                 contenteditable="false">{{items.content}}</div>
                                            <div class="editBtn" v-show="item[0]['solve_status']===0" v-if="items.is_self===1">
                                                <a href="javascript:void(0);" class="cded edit">编辑</a>
                                                <a href="javascript:void(0);" class="cded save hidden">保存</a>
                                                · <a href="javascript:void(0);" class="cded" @click="delComment(items.id, 'del', items.front_code)">删除</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="media" v-show="item[0]['solve_status']===0">
                                    <div class="media-left">
                                        <img :src="userInfo.headphoto  || '../../static/images/defaultface.png'" class="img-circle userHeader"/>
                                    </div>
                                    <div class="media-body">
                                        <div class="clearfix pb-10 pt-5">
                                        <span contenteditable="true"
                                              :data-placeholder="item[0]['id']?'@回复':'添加批注'"
                                              data-label="content"></span>
                                        </div>
                                        <div class="editBtn" v-if="commentId===''">
                                            <button type="button" class="btn btn-primary btn-sm"
                                                    @click="addComment($event, 1)">发布
                                            </button>
                                            <button type="button" class="btn btn-default btn-sm ml-10"
                                                    @click="cancelannotion($event, 1)">取消
                                            </button>
                                        </div>
                                        <div class="editBtn" v-if="commentId">
                                            <button type="button" class="btn btn-primary btn-sm"
                                                    @click="addComment($event, 2)">发布
                                            </button>
                                            <button type="button" class="btn btn-default btn-sm ml-10"
                                                    @click="cancelannotion($event, 2)">取消
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div class="clearfix pt-15" v-if="dropName==='操作记录'">
                        <p v-for="(item, i) in OperAction" :key="i">{{item.log}}<br/><span class="font12 c999">{{item.add_time}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <ShareIt :info="sendStudentString"></ShareIt>
    </div>
</template>

<script>
import * as _ from 'lodash'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import ShareIt from '@#/functions/applyInfo/ShareIt'
import { mapState } from 'vuex'
import db from '@~/js/request'

export default {
  name: 'Detail',
  data () {
    return {
      id: '',
      status: 0,
      stu_id: '',
      apply_type: 1,
      school_unq_id: '',
      major_unq_id: '',
      school_custom: '',
      major_custom: '',
      studentArr: [],
      schoolArr: [],
      professionArr: [],
      OperAction: [],
      topic: {
        custom_ps: '',
        custom_ws: '',
        answer_ps: '',
        answer_ws: '',
        answer_ps_tips: '',
        answer_ws_tips: ''
      },
      sendStudentString: {},
      commentArr: [],
      commentId: '',
      dropName: '批注记录',
      offsetObj: {}
    }
  },
  beforeDestroy () {
    $('.fullScreen .fullRight').removeAttr('style')
    $(window).unbind('resize')
  },
  computed: { // 选项/数据=>计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例
    ...mapState(['userInfo'])
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.stu_id = self.$route.query.stuId || ''
    self.getSchoolAndStudent()
    self.$nextTick(() => {
      if (self.id !== '') {
        self.getDetail()
        self.getComment()
      } else {
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh')
        }, 1000)
      }
      $('.fullScreen .fullRight').css({ position: 'initial' })
      // 点击批注
      $(document).on('click', '.mediaItem .media-top', function () {
        if (!$(this).parent().hasClass('stateEdit')) {
          $('.mediaItem').removeClass('stateEdit')
          $(this).parent().addClass('stateEdit')
        }
      })
      // 点击空白处时
      $(document).click(function (e) {
        let i = $(e.target)
        let txt = window.getSelection ? window.getSelection() : document.selection.createRange().text
        // 批注列表点到空白处时收起，最小化
        if (i.closest('.mediaItem').length === 0) {
          $('.stateEdit').removeClass('stateEdit')
        }
        if (i.closest('.mediaItem').length === 0 && txt.toString() === '') {
          self.commentArr.map((item, i) => {
            if (item[0].id === '') {
              let noteThis = $('.notebook [data-id="' + self.commentId + '"]')
              let text = noteThis.text()
              noteThis.after(text)
              noteThis.remove()
              self.commentArr.splice(i, 1)
              // $('.notebook [data-id="' + self.commentId + '"]').removeAttr('style').removeClass('comment-extra-inner-span').removeAttr('data-id')
            }
          })
        }
        // 点到空白处时，批注按钮隐藏
        if (i.closest('.notebook-tool').length === 0 && txt.toString() === '') {
          $('.notebook-tool').hide()
        }
      })
      // 框选时弹出按钮
      $(document).on('mouseup', '.notebook', function (event) {
        event.preventDefault()
        let txt = window.getSelection ? window.getSelection() : document.selection.createRange().text
        let x = -20
        let y = -55
        if (txt.toString() === '') {
          return false
        }
        if (txt !== '') {
          if ($('.notebook-tool').length === 0) {
            let tooltip = '<div class=\'notebook-tool\'><button type=\'button\'><i class=\'iconfont\'>&#xe95b;</i></button></div>'
            $('body').append(tooltip)
          }
          $('.notebook-tool').css({
            'top': (event.pageY + y) + 'px',
            'left': (event.pageX + x) + 'px'
          }).show()
        }
      })
      // 设置批注标签
      $(document).on('click', '.notebook-tool button', function (event) {
        event.preventDefault()
        let txt = window.getSelection ? window.getSelection() : document.selection.createRange().text
        let html = $(window.getSelection().anchorNode.parentNode).html().replace(/\s/ig, '')
        let str = txt.toString().replace(/\s/ig, '')
        $(this).parent().hide()
        if (html.indexOf(str) < 0) {
          self.layer.alert('选中的批注重复了，重新选择！', {icon: 2})
          return false
        }
        let sid = new Date().getTime()
        let cid = 'comment-' + sid
        self.dropName = '批注记录'
        document.execCommand('BackColor', false, '#ffe9a8')
        $(window.getSelection().anchorNode.parentNode).attr('data-id', cid)
        $(window.getSelection().anchorNode.parentNode).addClass('comment-extra-inner-span')
        let arr = [{
          'id': '',
          'user_name': self.userInfo.name,
          'head_img': self.userInfo.headphoto,
          'content': '',
          'front_code': cid,
          'solve_status': 0,
          'created_time': '',
          'first_char': ''
        }]
        self.commentArr.push(arr)
        setTimeout(function () {
          $('.rightMediaList [data-id="' + cid + '"]').addClass('stateAdd')
          self.commentId = cid
        }, 300)
      })
      // 批注点击编辑
      $(document).on('click', '.editBtn a.edit', function (event) {
        event.preventDefault()
        $(this).next('a').removeClass('hidden')
        $(this).addClass('hidden')
        $(this).parent().prev('.commentContent').attr('contenteditable', true)
      })
      // 批注点击保存
      $(document).on('click', '.editBtn .save', function (event) {
        event.preventDefault()
        $(this).prev('.edit').removeClass('hidden')
        $(this).addClass('hidden')
        $(this).parent().prev('.commentContent').attr('contenteditable', false)
        let id = $(this).parents('.media-item').attr('data-id')
        let content = $(this).parents('.media-item').find('.commentContent').text()
        self.saveComment(id, content)
      })
      // 鼠标移入移出批注时
      $(document).on('mouseenter mouseleave', '[data-id^="comment-"]', function (event) {
        let $id = $(this).attr('data-id')
        // 鼠标穿过时触发
        if (event.type === 'mouseenter') {
          $('[data-id="' + $id + '"]').addClass('active')
        }
        // 鼠标离开时触发
        if (event.type === 'mouseleave') {
          $('[data-id="' + $id + '"]').removeClass('active')
        }
      })
      // 禁止右键与ctrl+V
      $(document).on('keyup', function (event) {
        setTimeout(() => {
          if (event.code === 'KeyV') {
            let id = $(event.target).attr('id')
            let html = $(event.target).html()
            let html1 = html.replace(/<[^<>]+>/g, '')
            let str1 = []
            let str2 = html.match(/(<span(.*?)class="comment-extra-inner-span[^\\"]*?"(.*?)>(.*?)<\/span>)/ig)
            $(event.target).find('.comment-extra-inner-span').each(function (i, e) {
              str1.push(e.innerText)
            })
            if (str2 !== null) {
              for (let i = 0; i < str1.length; i++) {
                html1 = html1.replace(str1[i], str2[i])
              }
            }
            if (id === 'answer_ps') {
              self.topic.answer_ps = html1
              $('#answer_ps').html(html1)
            }
            if (id === 'answer_ws') {
              self.topic.answer_ws = html1
              $('#answer_ws').html(html1)
            }
          }
        }, 200)
      })
      document.body.oncontextmenu = function (e) {
        if (e.button) {
          e.returnValue = false
        }
      }
      // 设置右边浮动
      setTimeout(() => {
        let $this = $('.commentBox')
        let leftH = $('.leftBox').height()
        let $thisW = $this.parent().width()
        let $thisH = $(window).height() - 50
        let $thisOffset = $this.parent().offset().top
        let left = $this.parent().offset().left
        self.offsetObj = {w: $thisW, h: $thisH, l: left}
        $this.css({left: self.offsetObj['l'], width: self.offsetObj['w'], height: leftH + 'px'})
        $(document).on('scroll resize', function () {
          let top = $(window).scrollTop() + 50
          if (top - $thisOffset > 0) {
            $this.addClass('fixed').css({left: self.offsetObj['l'], width: self.offsetObj['w'], height: self.offsetObj['h']})
          } else {
            $this.removeClass('fixed')
          }
        })
        $(window).on('resize', function () {
          let $this = $('.commentBox')
          let $thisW = $this.parent().outerWidth(true)
          let $thisH = $(window).height() - 50
          let left = $this.parent().offset().left
          self.offsetObj = {w: $thisW, h: $thisH, l: left}
          $this.css({left: self.offsetObj['l'], width: self.offsetObj['w'], height: self.offsetObj['h']})
        })
      }, 1000)
    })
  },
  methods: {
    // 获取请求ID详情
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.postRequest('/Institution/Document/qsEdit', params).then(res => {
        if (res.status === 1) {
          self.status = res.data.status
          self.apply_type = res.data.apply_type
          self.stu_id = res.data.ins_student_id
          self.school_unq_id = res.data.school_unq_id
          self.major_unq_id = res.data.major_unq_id
          self.school_custom = res.data.school_custom
          self.major_custom = res.data.major_custom
          self.topic.custom_ps = res.data.custom_ps
          self.topic.custom_ws = res.data.custom_ws
          self.topic.answer_ps = res.data.answer_ps
          self.topic.answer_ws = res.data.answer_ws
          self.topic.answer_ps_tips = res.data.answer_ps_tips
          self.topic.answer_ws_tips = res.data.answer_ws_tips
          self.getProfession('auto')
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          }, function (i) {
            self.layer.close(i)
            self.$router.back()
          })
        }
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh')
        }, 500)
      })
    },
    // 获取学生、学校列表
    getSchoolAndStudent () {
      let self = this
      db.postRequest('/Institution/Document/stuList', {}).then(res => {
        if (res.status === 1) {
          self.studentArr = res.data.stu_list
          self.schoolArr = res.data.sc_list
        } else {
          console.log(res.msg)
        }
      })
    },
    // 获取专业列表
    getProfession (action) {
      let self = this
      let params = new URLSearchParams()
      if (action !== 'auto') {
        self.major_unq_id = ''
        self.topic = {
          custom_ps: '',
          custom_ws: '',
          answer_ps: '',
          answer_ws: ''
        }
      }
      if (self.school_unq_id === '') {
        self.professionArr = []
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh')
        }, 500)
        return false
      }
      params.append('apply_type', self.apply_type)
      params.append('school_unq_id', self.school_unq_id)
      db.postRequest('/Institution/Document/mjList', params).then(res => {
        if (res.status === 1) {
          self.professionArr = res.data
        } else {
          self.professionArr = []
          console.log(res.msg)
        }
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh')
        }, 500)
      })
    },
    // 获取题目信息
    getTopic () {
      let self = this
      let params = new URLSearchParams()
      if (self.major_unq_id === '') {
        self.topic = {
          custom_ps: '',
          custom_ws: '',
          answer_ps: '',
          answer_ws: ''
        }
        return false
      }
      params.append('apply_type', self.apply_type)
      params.append('major_unq_id', self.major_unq_id)
      db.postRequest('/Institution/Document/getQs', params).then(res => {
        if (res.status === 1) {
          self.topic = res.data
          setTimeout(() => {
            let $this = $('.commentBox')
            let leftH = $('.leftBox').height()
            $this.css({height: leftH + 'px'})
          }, 500)
        } else {
          console.log(res.msg)
        }
      })
    },
    // 取消批注编辑
    cancelannotion (event, type) {
      event.preventDefault()
      let self = this
      if (type === 1) {
        let $this = $(event.target).parents('.mediaItem')
        $this.removeClass('stateEdit')
      } else {
        let noteThis = $('.notebook [data-id="' + self.commentId + '"]')
        let text = noteThis.text()
        noteThis.after(text)
        noteThis.remove()
        // $('.notebook [data-id="' + self.commentId + '"]').removeAttr('style').removeClass('comment-extra-inner-span').removeAttr('data-id')
        self.commentArr.map((item, i) => {
          if (item[0]['id'] === '') {
            self.commentArr.splice(i, 1)
          }
        })
        self.commentId = ''
      }
    },
    // 保存当前数据
    saveData (msgFalse) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      params.append('stu_id', self.stu_id)
      params.append('apply_type', self.apply_type)
      params.append('school_unq_id', self.school_unq_id)
      params.append('major_unq_id', self.major_unq_id)
      params.append('school_custom', self.school_custom)
      params.append('major_custom', self.major_custom)
      params.append('custom_ps', self.topic.custom_ps)
      params.append('answer_ps', $('#answer_ps').html())
      params.append('custom_ws', self.topic.custom_ws)
      params.append('answer_ws', $('#answer_ws').html())
      db.postRequest('/Institution/Document/qsSave', params).then(res => {
        if (msgFalse === true) {
          return false
        }
        if (res.status === 1) {
          self.layer.alert(res.msg, { icon: 1 }, function (i) {
            self.layer.close(i)
            if (self.id === '') {
              let str = location.href
              if (str.indexOf('?') >= 0) {
                window.location.replace(str.substr(0, str.indexOf('?')) + '?id=' + res.data)
              } else {
                window.location.replace(str + '?id=' + res.data)
              }
            }
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 发送给学生填写
    sendStudent () {
      let self = this
      if (self.stu_id === '') {
        self.layer.alert('请选择保存页面后再分享！', {
          icon: 2
        })
      } else {
        let params = new URLSearchParams()
        params.append('id', self.stu_id)
        params.append('education_type', self.apply_type)
        db.postRequest('/Institution/ApplyMaterial/sendStudent', params).then(res => {
          if (res.status === 1) {
            self.sendStudentString = res.data
            $('#sendInfo').modal({
              backdrop: 'static',
              show: true
            })
          } else {
            self.layer.alert(res.msg, {
              shadeClose: false
            })
          }
        })
      }
    },
    // 批注列表
    getComment () {
      let self = this
      let params = new URLSearchParams()
      params.append('doc_id', self.id)
      db.postRequest('/Institution/Document/noteList', params).then(res => {
        if (res.status === 1) {
          self.commentArr = res.data
        } else {
          console.log(res.msg)
        }
      })
    },
    getOperAction () {
      let self = this
      let params = new URLSearchParams()
      params.append('doc_id', self.id)
      db.postRequest('Institution/Document/notelog', params).then(res => {
        if (res.status === 1) {
          self.OperAction = res.data
        } else {
          console.log(res.msg)
        }
      })
    },
    // 添加批注
    addComment (event, type) {
      let self = this
      let $this = $(event.target)
      let content = $this.parents('.media-body').find('[data-label="content"]').text()
      let str1 = $('#answer_ps').html()
      let resp1 = str1.replace(/<span class="">(.*?)<\/span>/ig, '$1')
      let res1 = resp1.replace(/<span style="[^\\"]*?">(.*?)<\/span>/ig, '$1')
      let str2 = $('#answer_ws').html()
      let resp2 = str2.replace(/<span class="">(.*?)<\/span>/ig, '$1')
      let res2 = resp2.replace(/<span style="[^\\"]*?">(.*?)<\/span>/ig, '$1')
      let params = new URLSearchParams()
      params.append('doc_id', self.id)
      params.append('type', type)
      params.append('content', content)
      if (type === 2) {
        params.append('front_code', self.commentId)
        params.append('note_ps', res1)
        params.append('note_ws', res2)
      } else {
        let commentId = $this.parents('.mediaItem').attr('data-id')
        params.append('front_code', commentId)
      }
      db.postRequest('/Institution/Document/noteAdd', params).then(res => {
        if (res.status === 1) {
          self.getComment()
          $this.parents('.mediaItem').removeClass('stateAdd')
          if (type === 2) {
            self.commentId = ''
          }
          $this.parents('.media-body').find('[data-label="content"]').html('')
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 删除批注
    delComment (id, type, cid) {
      let self = this
      let $this = $('#answer_ps [data-id="' + cid + '"]')
      let _this = $('#answer_ws [data-id="' + cid + '"]')
      let params = new URLSearchParams()
      params.append('type', type)
      params.append('note_id', id)
      params.append('action', cid)
      db.postRequest('/Institution/Document/noteAction', params).then(res => {
        if (res.status === 1) {
          if (res.data.del_all === 1) {
            if ($this.length > 0) {
              let text = $this.text()
              $this.after(text)
              $this.remove()
            }
            if (_this.length > 0) {
              let text = _this.text()
              _this.after(text)
              _this.remove()
            }
            _.delay(() => {
              self.saveData(true)
            }, 100)
          }
          _.delay(() => {
            self.getComment()
          }, 500)
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    // 保存批注内容
    saveComment (id, content) {
      let params = new URLSearchParams()
      params.append('note_id', id)
      params.append('content', content)
      db.postRequest('/Institution/Document/noteEdit', params).then(res => {
        if (res.status === 1) {
          console.log(res.msg)
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    }
  },
  components: {
    ShareIt
  }
}
</script>
<style lang="scss">
.addAnswer {
    .bootstrap-select {
        -webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;

        & .dropdown-toggle {
            border:none;

            & .filter-option-inner-inner {
                white-space:nowrap;-ms-text-overflow:ellipsis;text-overflow:ellipsis;overflow:hidden;max-width:300px;min-width:150px;
            }

            & .bs-caret {display:none;}

            &:hover, &:focus, &:active {background-color:transparent;outline:none !important;}
        }
    }
    & .open{
        & .dropdown-toggle {
            &.btn-default{background-color:transparent;}
        }
    }
}
</style>
<style scoped lang="scss">
.leftBox {position:initial;}

.table {
    & tbody {
        & tr {
            & td {
                &:first-of-type {border-top:none;}

                &:last-of-type {
                    border-right:1px solid #ddd;
                }
            }

            &:last-of-type {
                & td {
                    &:last-of-type {border-bottom:1px solid #ddd;}
                }
            }
        }
    }
}
.commentBox{
    overflow-y:auto;
    &.fixed{
        position:fixed;z-index:100;top:50px;padding:15px;
    }
}

.rightMediaList {
    overflow-y:auto;margin-bottom:0;

    & .mediaItem {
        border:1px solid transparent;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;cursor:pointer;margin-bottom:15px;

        &:hover, &.active {
            border-color:#ddd;
        }

        & .media {
            padding:10px 15px;margin-top:0;

            & .media-item {
                margin-bottom:10px;position:relative;

                & .media-left {z-index:2;position:relative;}

                & .media-heading {display:none;}

                & .media-body {
                    & .media-heading {
                        &:after {content:'';display:block;width:100%;height:0;clear:both;overflow:hidden;}

                        & .pull-right {display:none;}
                    }

                    & .editBtn {display:none;}
                }

                &.gtTwo {
                    &:after {content:'';width:1px;height:150%;background-color:#dedede;position:absolute;display:block;left:15px;top:0;z-index:1;}

                    &:last-of-type:after {display:none;}
                }
            }

            &:last-of-type {display:none;background-color:#f7f9fa;}

            &.media-top{
                max-height:80px;overflow:hidden;padding-bottom:0;margin-bottom:10px;
                & .commentContent{
                    height:18px;overflow:hidden;padding-top:0;padding-bottom:0;
                }
            }
        }

        &.stateEdit {
            cursor:auto;border-color:#ddd;

            & .media {
                &.media-top{
                    max-height:max-content;overflow:inherit;
                    & .commentContent{
                        height:auto;overflow:initial;padding-top:5px;padding-bottom:5px;
                    }
                }
                & .media-heading {display:inline;}

                & .media-body {
                    & .media-heading {
                        & .pull-right {display:initial;}
                    }

                    & .editBtn {display:block;}
                }

                &:last-of-type {display:block;border-top:1px solid #ddd;}
            }
        }

        &.stateAdd {
            cursor:auto;border-color:#ddd;

            & .media {
                &.media-top{
                    & .commentContent{
                        height:auto;overflow:initial;padding-top:5px;padding-bottom:5px;
                    }
                }
                &:first-of-type {display:none;}

                &:last-of-type {display:block;}
            }
        }
    }
  & .userHeader{width:30px;height:30px;}
}
.wordwrap{
    word-wrap: break-word; word-break: normal;width:100%; display:block;
}
</style>
