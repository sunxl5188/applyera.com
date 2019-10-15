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
                        <button type="button" class="btn btn-default ml-10"><i class="iconfont">&#xe64d;</i> 提交</button>
                        <button type="button" class="btn btn-default ml-10" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 bdr-d leftBox">
                <div class="clearfix pb-30">
                    <input type="text" name="title" class="form-control title" placeholder="请输入文书标题"/>
                </div>
                <table class="table">
                    <tbody>
                    <tr>
                        <td class="w20 text-center bgGray">学生姓名</td>
                        <td>
                            <div class="col-sm-6">
                                <select v-model="stu_id" class="form-control selectpicker show-tick"
                                        data-live-search="true">
                                    <option value="">请选择</option>
                                    <option :value="item.id" v-for="(item, i) in studentArr" :key="i">
                                        {{item.stu_name}}
                                    </option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">申报类型</td>
                        <td>
                            <div class="col-sm-6">
                                <select v-model.number="apply_type" @change="getProfession()"
                                        class="form-control selectpicker show-tick">
                                    <option value="1">本科</option>
                                    <option value="2">硕士</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">申请学校</td>
                        <td>
                            <div class="col-sm-6">
                                <select v-model="school_unq_id" @change="getProfession()"
                                        class="form-control selectpicker show-tick" data-live-search="true">
                                    <option value="">请选择</option>
                                    <option :value="item.unq_id" v-for="(item, i) in schoolArr" :key="i">
                                        {{item.sc_name}}
                                    </option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">申请专业</td>
                        <td>
                            <div class="col-sm-6">
                                <select v-model="major_unq_id" @change="getTopic()"
                                        class="form-control selectpicker show-tick" data-live-search="true">
                                    <option value="">请选择</option>
                                    <option :value="item.unq_id" v-for="(item, i) in professionArr" :key="i">
                                        {{item.mj_name}}
                                    </option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="clearfix" v-if="topic.answer_ps">
                    <div class="clearfix lh50 font16 fontB">个人陈述</div>
                    <div class="clearfix lh22 pb-15 statement">
                        <div class="statementShow" v-html="topic.custom_ps"></div>
                        <div class="statementEdit" contenteditable="true" spellcheck="false" data-placeholder="请输入个人陈述"
                             @focusout="statementSave()" v-html="topic.custom_ps"></div>
                        <button type="button" class="btn btn-primary" @click="statmentState($event)">编辑</button>
                    </div>
                    <div class="clearfix bdt pt-15">
                        <div contenteditable="true" spellcheck="false" data-placeholder="请用英文作答"
                             v-html="topic.answer_ps"></div>
                    </div>
                    <div class="clearfix lh50 font16 fontB">Writing Sample</div>
                    <div class="clearfix lh22 notebook po_re" v-html="topic.custom_ws" contenteditable="true"></div>
                    <div class="clearfix bdt pt-15 mt-15">
                        <div contenteditable="true" spellcheck="false" data-placeholder="请用英文作答"
                             v-html="topic.answer_ws"></div>
                    </div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="dropdown">
                    <a href="javascript:void(0);" data-toggle="dropdown">
                        批注记录
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="#">批注记录</a></li>
                        <li><a href="#">操作记录</a></li>
                    </ul>
                </div>
                <div class="clearfix pt-15">
                    <ul class="media-list rightMediaList">
                        <div class="mediaItem" data-id="comment-1570848524872">
                            <div class="media">
                                <div class="media-left">
                                    <img src="https://via.placeholder.com/30x30/FF5733/ffffff" class="img-circle"/>
                                </div>
                                <div class="media-body">
                                    <div class="media-heading">
                                        <span class="pull-left">SUNNY <span
                                                class="c999 font12">5月12日 14:39</span></span>
                                        <a href="javascript:void(0);" class="pull-right cded">解决</a>
                                    </div>
                                    <div class="clearfix font12 c999 lh20 pb-5 pt-5">"<em>Proin sodales pulvinar sic
                                        tempor.
                                        Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                                        mus.</em>"
                                    </div>
                                    <div class="editBtn">
                                        <a href="javascript:void(0);" class="cded">编辑</a> · <a
                                            href="javascript:void(0);" class="cded">删除</a>
                                    </div>
                                    <div class="clearfix lh20 c999 pb-5 pt-5">这段不是很好，建议用XXXXXSXJSJ</div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <img src="https://via.placeholder.com/30x30/FF5733/ffffff" class="img-circle"/>
                                </div>
                                <div class="media-body">
                                    <div class="clearfix pb-10 pt-5"><span contenteditable="true"
                                                                           data-placeholder="回复"></span></div>
                                    <div class="editBtn">
                                        <button type="button" class="btn btn-primary btn-sm">发布</button>
                                        <button type="button" class="btn btn-default btn-sm ml-10"
                                                @click="cancelannotion($event)">取消
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <ShareIt :info="sendStudentString"></ShareIt>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import ShareIt from '@#/functions/applyInfo/ShareIt'
import db from '@~/js/request'

export default {
  name: 'Detail',
  data () {
    return {
      id: '',
      stu_id: '',
      apply_type: 1,
      school_unq_id: '',
      major_unq_id: '',
      studentArr: [],
      schoolArr: [],
      professionArr: [],
      topic: {
        custom_ps: '',
        custom_ws: '',
        answer_ps: '',
        answer_ws: ''
      },
      sendStudentString: {}
    }
  },
  beforeDestroy () {
    $('.fullScreen .fullRight').removeAttr('style')
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.getSchoolAndStudent()
    self.$nextTick(() => {
      if (self.id !== '') {
        self.getDetail()
      }
      $('.fullScreen .fullRight').css({ position: 'initial' })
      // 点击批注
      $(document).on('click', '.mediaItem .media:eq(0)', function () {
        if (!$(this).parents('.mediaItem').hasClass('stateEdit')) {
          $(this).parents('.mediaItem').addClass('stateEdit')
        }
      })
      $(document).click(function (e) {
        let i = $(e.target)
        if (i.closest('.mediaItem').length === 0) {
          $('.stateEdit').removeClass('stateEdit')
        }
      })
      // 框选时弹出按钮
      $(document).on('mouseup', '.notebook', function (event) {
        event.preventDefault()
        let txt = window.getSelection ? window.getSelection() : document.selection.createRange().text
        let x = -20
        let y = -55
        let r = ''
        if (txt.toString() === '') {
          return false
        }
        if (document.selection) {
          r = document.selection.createRange().text
        } else if (window.getSelection()) {
          r = window.getSelection()
        }
        if (r !== '') {
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
        let sid = new Date().getTime()
        let cid = 'comment-' + sid
        $(this).parent().hide()
        document.execCommand('BackColor', false, '#ffe9a8')
        $(window.getSelection().anchorNode.parentNode).attr('data-id', cid)
        $(window.getSelection().anchorNode.parentNode).addClass('comment-extra-inner-span')
      })
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
          self.apply_type = res.data.apply_type
          self.stu_id = res.data.ins_student_id
          self.school_unq_id = res.data.school_unq_id
          self.major_unq_id = res.data.major_unq_id
          self.topic.custom_ps = res.data.custom_ps
          self.topic.custom_ws = res.data.custom_ws
          self.topic.answer_ps = res.data.answer_ps
          self.topic.answer_ws = res.data.answer_ws
          self.getProfession('auto')
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          }, function (i) {
            self.layer.close(i)
            self.$router.back()
          })
        }
        self.setRightHeigth()
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
        } else {
          console.log(res.msg)
        }
        self.setRightHeigth()
      })
    },
    // 设置右边高度
    setRightHeigth () {
      setTimeout(function () {
        let lh = $('.leftBox').height() - 35
        let rh = $('.rightMediaList').height()
        if (lh > rh) {
          $('.rightMediaList').height(lh)
        }
      }, 500)
    },
    // 设置编辑器
    setNoteBook () {
      setTimeout(function () {
        $('.notebook').on('contentChange', function (e) {
          let id = e.originalEvent.detail.id
          // let content = e.originalEvent.detail.content
          // let index = $('.notebook').find('[data-id=' + id + ']').index()
          $(document).on('click', function (event) {
            let i = $(event.target)
            if (i.closest('[data-id=' + id + ']').length === 0 && i.closest('.jquery-notebook.bubble.jump').length === 0) {
              document.cookie = 'notebook='
              $(this).unbind('click')
              console.log('点击空白处，取消批注，重新加载数据')
            }
          })
        })
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
      }, 1000)
    },
    // 取消批注编辑
    cancelannotion (event) {
      let $this = $(event.currentTarget).parents('.mediaItem')
      $this.removeClass('stateEdit')
    },
    // 点击编辑个人陈述
    statmentState (event) {
      if (this.id === '') {
        self.layer.alert('请选保存当前页面后再编辑!', { icon: 2 })
      } else {
        let $this = $(event.currentTarget).parents('.statement')
        $this.addClass('active')
      }
    },
    // 保存个人陈述
    statementSave () {
      let content = $('.statementEdit').text()
      let params = new URLSearchParams()
      params.append('content', content)
      db.postRequest('', params).then(res => {
        console.log(res.msg)
      })
    },
    // 保存当前数据
    saveData () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      params.append('stu_id', self.stu_id)
      params.append('apply_type', self.apply_type)
      params.append('school_unq_id', self.school_unq_id)
      params.append('major_unq_id', self.major_unq_id)
      params.append('custom_ps', self.topic.custom_ps)
      params.append('answer_ps', self.topic.answer_ps)
      params.append('custom_ws', self.topic.custom_ws)
      params.append('answer_ws', self.topic.answer_ws)
      db.postRequest('/Institution/Document/qsSave', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, { icon: 1 }, function (i) {
            self.layer.close(i)
            if (self.id === '') {
              window.location.replace('/functions/answer/addAnswer?id=' + res.data)
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
    }
  },
  components: {
    ShareIt
  }
}
</script>
<style lang="scss">
.addAnswer {
    .bootstrap-select .dropdown-toggle .filter-option-inner-inner {
        white-space:nowrap;-ms-text-overflow:ellipsis;text-overflow:ellipsis;overflow:hidden;max-width:300px;min-width:150px;
    }
}
</style>
<style scoped lang="scss">
.title {border:none;padding-left:0;padding-right:0;}

.leftBox {position:initial;}

.table {
    & tbody {
        & tr {
            & td {
                &:first-of-type {border-top:none;}

                &:last-of-type {border-right:1px solid #ddd;}
            }

            &:last-of-type {
                & td {
                    &:last-of-type {border-bottom:1px solid #ddd;}
                }
            }
        }
    }
}

.rightMediaList {
    overflow-y:auto;margin-bottom:0;

    & .mediaItem {
        border:1px solid transparent;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;cursor:pointer;

        &:hover, &.active {
            border-color:#ddd;
        }

        & .media {
            padding:10px 15px;

            & .media-body {
                & .media-heading {
                    &:after {content:'';display:block;width:100%;height:0;clear:both;overflow:hidden;}

                    & .pull-right {display:none;}
                }

                & .editBtn {display:none;}
            }

            &:last-of-type {display:none;}
        }

        &.stateEdit {
            cursor:auto;border-color:#ddd;

            & .media {
                & .media-body {
                    & .media-heading {
                        & .pull-right {display:initial;}
                    }

                    & .editBtn {display:block;}
                }

                &:last-of-type {display:block;border-top:1px solid #ddd;}
            }
        }
    }
}

.statement {
    position:relative;

    & .btn {display:none;position:absolute;right:0;bottom:15px;z-index:2;}

    &:hover {
        & .btn {display:initial;}
    }

    & .statementShow {display:block;}

    & .statementEdit {display:none;}

    &.active {
        &:hover {
            & .btn {display:none !important;}
        }

        & .statementShow {display:none;}

        & .statementEdit {display:block;}
    }
}
</style>
