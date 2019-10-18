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
                        <button type="button" class="btn btn-default ml-10" @click="submitData()"><i class="iconfont">&#xe64d;</i> 提交</button>
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
                    <input type="text" name="title" v-model="title" class="form-control title" placeholder="请输入文书标题"/>
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
                    <div class="clearfix lh22 pb-15">
                        <div :contenteditable="id?true:false" data-placeholder="请输入个人陈述" @focusout="statementSave()"
                             v-html="topic.custom_ps"></div>
                    </div>
                    <div class="clearfix bdt pt-15">
                        <div contenteditable="true" data-placeholder="请用英文作答" id="answer_ps"
                             v-html="topic.answer_ps"></div>
                    </div>
                    <div class="clearfix lh50 font16 fontB">Writing Sample</div>
                    <div class="clearfix lh22 pb-15">
                        <div :contenteditable="id?true:false" data-placeholder="请输入个人写作" @focusout="statementSave()"
                             v-html="topic.custom_ws"></div>
                    </div>
                    <div class="clearfix bdt pt-15 mt-15">
                        <div :class="{notebook:id}" contenteditable="true" data-placeholder="请用英文作答" id="answer_ws"
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
                        <li><a href="#" @click="getComment(1)">批注记录</a></li>
                        <li><a href="#" @click="getComment(2)">操作记录</a></li>
                    </ul>
                </div>
                <div class="clearfix pt-15">
                    <ul class="media-list rightMediaList">
                        <div class="mediaItem" :data-id="item[0]['front_code']" v-for="(item, i) in commentArr"
                             :key="i">
                            <div class="media media-top">
                                <div class="media-item" :class="{gtTwo:item.length>1}"
                                     v-for="(items, k) in item" :key="k" :data-id="items.id">
                                    <div class="media-left">
                                        <img :src="items.head_img || 'https://via.placeholder.com/30x30/cccccc/ffffff'"
                                             width="30" height="30" class="img-circle"/>
                                    </div>
                                    <div class="media-body">
                                        <div class="media-heading">
                                        <span class="pull-left">{{items.user_name}} <span
                                                class="c999 font12">{{items.created_time}}</span></span>
                                            <a href="javascript:void(0);" class="pull-right cded" v-if="k === 0" v-show="item[0]['solve_status']===0" @click="delComment(items.id, 'solve', items.front_code)">解决</a>
                                        </div>
                                        <div class="clearfix commentContent font12 c999 lh20 pb-5 pt-5"
                                             contenteditable="false">
                                            {{items.content}}
                                        </div>
                                        <div class="editBtn" v-show="item[0]['solve_status']===0">
                                            <a href="javascript:void(0);" class="cded edit">编辑</a>
                                            <a href="javascript:void(0);" class="cded save hidden">保存</a>
                                            · <a href="javascript:void(0);" class="cded" @click="delComment(items.id, 'del', items.front_code)">删除</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="media" v-show="item[0]['solve_status']===0">
                                <div class="media-left">
                                    <img :src="userInfo.headphoto || 'https://via.placeholder.com/30x30/cccccc/ffffff'"
                                         width="30" height="30" class="img-circle"/>
                                </div>
                                <div class="media-body">
                                    <div class="clearfix pb-10 pt-5">
                                        <span contenteditable="true"
                                              :data-placeholder="item[0]['id']?'@回复':'最新回复'"
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
                        <div v-if="commentArr.length === 0" v-html="NoData()" class="bda fillet-4 pad-10"></div>
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
import { mapState } from 'vuex'
import db from '@~/js/request'

export default {
  name: 'Detail',
  data () {
    return {
      id: '',
      title: '',
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
      sendStudentString: {},
      commentArr: [],
      commentId: ''
    }
  },
  beforeDestroy () {
    $('.fullScreen .fullRight').removeAttr('style')
  },
  computed: { // 选项/数据=>计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例
    ...mapState(['userInfo'])
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.getSchoolAndStudent()
    self.$nextTick(() => {
      if (self.id !== '') {
        self.getDetail()
        self.getComment()
      } else {
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh')
        }, 500)
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
              self.commentArr.splice(i, 1)
              $('.notebook [data-id="' + self.commentId + '"]').removeAttr('style').removeClass('comment-extra-inner-span').removeAttr('data-id')
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
          self.title = res.data.title
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
    cancelannotion (event, type) {
      event.preventDefault()
      let self = this
      if (type === 1) {
        let $this = $(event.target).parents('.mediaItem')
        $this.removeClass('stateEdit')
      } else {
        $('.notebook [data-id="' + self.commentId + '"]').removeAttr('style').removeClass('comment-extra-inner-span').removeAttr('data-id')
        self.commentArr.map((item, i) => {
          if (item[0]['id'] === '') {
            self.commentArr.splice(i, 1)
          }
        })
        self.commentId = ''
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
      params.append('title', self.title)
      params.append('stu_id', self.stu_id)
      params.append('apply_type', self.apply_type)
      params.append('school_unq_id', self.school_unq_id)
      params.append('major_unq_id', self.major_unq_id)
      params.append('custom_ps', self.topic.custom_ps)
      params.append('answer_ps', $('#answer_ps').html())
      params.append('custom_ws', self.topic.custom_ws)
      params.append('answer_ws', $('#answer_ws').html())
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
    },
    // 批注列表
    getComment (state) {
      let self = this
      let params = new URLSearchParams()
      params.append('doc_id', self.id)
      params.append('record', state || 1)
      db.postRequest('/Institution/Document/noteList', params).then(res => {
        if (res.status === 1) {
          self.commentArr = res.data
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
      let str = $('.notebook').html()
      let resp = str.replace(/<span class="">(.*?)<\/span>/ig, '$1')
      let res = resp.replace(/<span style="[^\\"]*?">(.*?)<\/span>/ig, '$1')
      let params = new URLSearchParams()
      params.append('doc_id', self.id)
      params.append('content', content)
      if (type === 2) {
        params.append('front_code', self.commentId)
        params.append('note_ws', res)
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
      let params = new URLSearchParams()
      params.append('type', type)
      params.append('note_id', id)
      params.append('action', cid)
      db.postRequest('/Institution/Document/noteAction', params).then(res => {
        if (res.status === 1) {
          self.getComment()
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
          console.log(res.msg)
        }
      })
    },
    // 提交保存
    submitData () {
      let self = this
      if (self.id === '') {
        self.layer.alert('请先保存后再提交信息!', {icon: 2})
        return false
      }
      self.layer.confirm('您确定要提交信息吗？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', self.id)
        db.postRequest('Institution/Document/qsSubmit', params).then(res => {
          if (res.status === 1) {
            self.layer.alert(res.msg, {icon: 1}, function (i) {
              self.layer.close(i)
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
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
        -webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;margin-left:-20px;

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
.title {border:none;padding-left:0;padding-right:0;}

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
            }
        }

        &.stateEdit {
            cursor:auto;border-color:#ddd;

            & .media {
                &.media-top{
                    max-height:max-content;overflow:inherit;
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
                &:first-of-type {display:none;}

                &:last-of-type {display:block;}
            }
        }
    }
}
</style>
