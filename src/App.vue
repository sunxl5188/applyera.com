<template>
    <div id="app" v-if="!loading">
        <div class="fullScreen">
            <header>
                <nav class="navbar navbar-default" role="navigation">
                    <i class="iconfont c999 handPower ml-20 navExpanded">&#xe663;</i>

                    <div class="crumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/" exact>首页</router-link>
                            </li>
                            <li class="breadcrumb-item" :class="{active:(i+1) === breadArr.length}" v-for="(item, i) in breadArr" :key="i">
                                <router-link :to="{path:item.path}" v-if="(i+1) < breadArr.length">
                                    {{item.meta.title}}
                                </router-link>
                                <span v-if="(i+1) === breadArr.length">{{item.meta.title}}</span>
                            </li>
                        </ol>
                    </div>

                    <ul class="nav navbar-nav">
                        <li>
                            <router-link to="/home/workProcess" class="iconLink">
                                <i class="iconfont" data-toggle="tooltip" title="服务进度" data-placement="bottom">&#xe64c;</i>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/home/taskdate" class="iconLink">
                                <i class="iconfont" data-toggle="tooltip" title="日历" data-placement="bottom">&#xe63b;</i>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/setting/message" class="iconLink">
                                <i class="number" v-if="msgNum>0">{{msgNum}}</i>
                                <i class="iconfont" data-toggle="tooltip" title="系统公告" data-placement="bottom">&#xe67d;</i>
                            </router-link>
                        </li>
                        <li class="dropdown" id="userBtnList">
                            <a class="dropdown-toggle" href="#">
                                <i class="iconfont font22" v-if="userInfo.headphoto===''">&#xe62a;</i>
                                <p v-if="userInfo.headphoto!==''"><img :src="userInfo.headphoto" alt=""></p>
                                <span v-text="userInfo.company +','+ userInfo.name" class="div_vm" v-if="userInfo.company"></span>
                                <span class="caret"></span>
                            </a>
                            <div class="popover fade bottom in">
                                <div class="arrow" style="left: 50%;"></div>
                                <div class="popover-content" style="padding:9px 14px;">
                                    <dl style="width:80px;" class="text-center">
                                        <dd>
                                            <router-link to="/home/user">
                                                <span>个人中心</span>
                                            </router-link>
                                        </dd>
                                        <dd>
                                            <router-link to="/home/enterprise">
                                                <span>我的企业</span>
                                            </router-link>
                                        </dd>
                                        <dd>
                                            <a href="javascript:void(0);" @click="logOut">
                                                <span>退出登录</span>
                                            </a>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
            <!--Left///////////////-->
            <div class="fullLeft">
                <div class="logo">
                    <a href="/">
                        <img :src="userInfo.logo?userInfo.logo:'/manage/static/images/logo.png'" alt=""
                             v-show="!leftClose">
                        <img src="../static/images/logo-2.png" alt="" v-show="leftClose">
                    </a>
                </div>
                <ul class="list-group" v-if="userInfo.hasOwnProperty('access')">
                    <li class="list-group-item" v-if="userInfo.access.home.show===1">
                        <router-link to="/" exact><i class="iconfont">&#xe6c2;</i><span>首页</span></router-link>
                    </li>
                    <li class="list-group-item" v-if="userInfo.access.student.show===1">
                        <a href="javascript:void(0);"><i class="iconfont">&#xe603;</i><span>学生</span></a>
                        <div class="list-group">
                            <router-link to="/archives/student" class="list-group-item"
                                         v-if="userInfo.access.student.child[0]===1">学生管理
                            </router-link>
                            <router-link to="/archives/student_seas" class="list-group-item"
                                         v-if="userInfo.access.student.child[1]===1"
                            >学生公海
                            </router-link>
                            <router-link to="/archives/student_statistics" class="list-group-item"
                                         v-if="userInfo.access.student.child[2]===1"
                            >统计分析
                            </router-link>
                        </div>
                    </li>
                    <li class="list-group-item" v-if="userInfo.access.function.show===1">
                        <a href="javascript:void(0);"><i class="iconfont">&#xe614;</i><span>功能</span></a>
                        <div class="list-group">
                            <router-link to="/functions/schoollist" class="list-group-item"
                                         v-if="userInfo.access.function.child[0]===1">校查查
                            </router-link>
                            <router-link to="/functions/plan" class="list-group-item"
                                         v-if="userInfo.access.function.child[1]===1">留学规划
                            </router-link>
                            <router-link to="/functions/applyInfo" class="list-group-item"
                                         v-if="userInfo.access.function.child[2]===1">申请资料
                            </router-link>
                            <router-link to="/functions/answer" class="list-group-item"
                                         v-if="userInfo.access.function.child[6]===1"
                            >文书作答
                            </router-link>
                            <router-link to="/functions/initApply" class="list-group-item"
                                         v-if="userInfo.access.function.child[3]===1">发起申请
                            </router-link>
                            <router-link to="/functions/track" class="list-group-item"
                                         v-if="userInfo.access.function.child[4]===1">申请跟踪
                            </router-link>
                            <router-link to="/functions/commission" class="list-group-item"
                                         v-if="userInfo.access.function.child[5]===1">佣金管理
                            </router-link>
                        </div>
                    </li>
                    <li class="list-group-item" v-if="userInfo.access.marketing.show===1">
                        <a href="javascript:void(0);"><i class="iconfont">&#xe6e4;</i><span>市场</span></a>
                        <div class="list-group">
                            <router-link to="/marketing/saleslead" class="list-group-item"
                                         v-if="userInfo.access.marketing.child[0]===1">渠道工具
                            </router-link>
                            <router-link to="/marketing/product" class="list-group-item"
                                         v-if="userInfo.access.marketing.child[1]===1">产品管理
                            </router-link>
                        </div>
                    </li>
                    <li class="list-group-item" v-if="userInfo.access.setting.show===1">
                        <a href="javascript:void(0);"><i class="iconfont">&#xe600;</i><span>设置</span></a>
                        <div class="list-group">
                            <router-link to="/setting/accounts" class="list-group-item"
                                         v-if="userInfo.access.setting.child[0]===1">帐号管理
                            </router-link>
                            <router-link to="/setting/rolePermit" class="list-group-item"
                                         v-if="userInfo.access.setting.child[1]===1">角色权限
                            </router-link>
                            <router-link to="/setting/ability" class="list-group-item"
                                         v-if="userInfo.access.setting.child[2]===1">能力考评
                            </router-link>
                            <router-link to="/setting/budget" class="list-group-item"
                                         v-if="userInfo.access.setting.child[3]===1">费用预算
                            </router-link>
                            <router-link to="/setting/student_type" class="list-group-item"
                                         v-if="userInfo.access.setting.child[4]===1">学生类型
                            </router-link>
                            <router-link to="/setting/follow" class="list-group-item"
                                         v-if="userInfo.access.setting.child[5]===1">跟进状态
                            </router-link>
                            <router-link to="/setting/contact" class="list-group-item"
                                         v-if="userInfo.access.setting.child[7]===1">联系人
                            </router-link>
                        </div>
                    </li>
                    <li class="list-group-item" v-if="userInfo.access.applyoversea.show===1">
                        <a href="javascript:void(0);"><i class="iconfont">&#xe697;</i><span>易申学</span></a>
                        <div class="list-group">
                            <router-link to="/admin/commarrival" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[0]===1">佣金到账
                            </router-link>
                            <router-link to="/admin/commapply" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[1]===1">佣金提现
                            </router-link>
                            <router-link to="/admin/agency" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[2]===1">中介机构
                            </router-link>
                            <router-link to="/admin/bank" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[3]===1">银行档案
                            </router-link>
                            <router-link to="/admin/user" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[4]===1">操作用户
                            </router-link>
                            <router-link to="/admin/featRole" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[5]===1">功能角色
                            </router-link>
                            <router-link to="/admin/dataRole" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[6]===1">数据角色
                            </router-link>
                            <router-link to="/admin/range" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[7]===1">数据范围
                            </router-link>
                            <router-link to="/admin/message/list" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[8]===1">公告发布
                            </router-link>
                            <router-link to="/admin/message/config" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[9]===1">消息配置
                            </router-link>
                            <router-link to="/admin/application" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[10]===1">院校申请
                            </router-link>
                            <router-link to="/admin/topic" class="list-group-item"
                                         v-if="userInfo.access.applyoversea.child[11]===1">题目更新
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>

            <!--Left End-->
            <div class="fullRight">
                <div class="fullRightContent">
                    <div class="container-fluid">
                        <transition name="custom-classes-transition" enter-active-class="animated fadeIn"
                                    leave-class="animated fadeOut" :duration="{ enter: 200, leave: 0 }">
                            <router-view></router-view>
                        </transition>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalRemind">
            <div class="modal-dialog ">
                <div class="modal-content" style="max-height:650px;overflow-y:auto;">
                    <div style="background: #39f;height: 250px;-webkit-border-radius: 6px 6px 0 0;-moz-border-radius: 6px 6px 0 0;border-radius: 6px 6px 0 0;"></div>
                    <div class="modal-body text-center">
                        <div v-for="(item, i) in remindInfo" :key="i">
                            <p v-if="item.stu_name!==''">您有一个（{{item.stu_name}}）的日历提醒，标题为：{{item.title}}</p>
                            <p v-if="item.stu_name===''">您有一个日历提醒，标题为：{{item.title}}</p>
                            <p>开始明间:{{item.time_start}}</p>
                        </div>
                        <div class="clearfix pt-15 pb-50">
                            <button type="button" class="btn btn-primary is-round" data-dismiss="modal"
                                    @click="remindInfo=[]">知 道 啦
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as _ from 'lodash'
import 'malihu-custom-scrollbar-plugin'
import 'jquery-mousewheel'
import store from '@/vuex/Store'
import { mapState, mapActions, mapGetters } from 'vuex'
import db from '@~/js/request'

export default {
  name: 'App',
  store,
  data () {
    return {
      loading: true,
      breadCrumb: [],
      leftClose: false,
      remindInfo: [],
      RightW: 1000,
      MinW: 1000,
      inter1: 0,
      inter2: 0
    }
  },
  computed: {
    ...mapState(['userInfo', 'token', 'msgNum']),
    ...mapGetters(['checkLogin']),
    breadArr () {
      return _.filter(this.breadCrumb, (item, i) => i > 0)
    }
  },
  mounted () {
    let self = this
    self.breadCrumb = self.$route.matched
    if (JSON.parse(sessionStorage.getItem('navArr')) !== null) {
      self.navArr = JSON.parse(sessionStorage.getItem('navArr'))
    }
    self.$nextTick(() => {
      // 同步登录信息
      let getUserInfo = self.$cookies.get('userInfo')
      if (getUserInfo) {
        db.postRequest('/Institution/Home/roleAccessList', {}).then(res => {
          if (res.status === 1) {
            getUserInfo.access = res.data
            self.$store.dispatch('login', getUserInfo)
          } else {
            self.layer.alert(res.msg, {icon: 2})
          }
        })
      }
    })

    _.delay(() => {
      self.loading = false
    }, 500)

    _.delay(() => {
      $('[data-toggle="tooltip"]').tooltip({
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner" style="white-space: nowrap;"></div></div>'
      })

      $('.list-group-item.active div.list-group').height($('.list-group-item.active div.list-group a').length * 40)

      $(document).on('click', '.fullLeft ul>li>a', function () {
        let $this = $(this).parent()
        let H = $this.find('.list-group a').length * 40
        $this.find('.list-group').height(H)
        setTimeout(function () {
          $this.siblings('li').removeClass('active')
          $this.siblings('li').find('.list-group').removeAttr('style')
          if ($this.hasClass('active')) {
            $this.removeClass('active')
            $this.find('.list-group').removeAttr('style')
          } else {
            $this.addClass('active')
          }
        }, 100)
      })

      $(document).on('click', '.navExpanded', function () {
        let obj = $('.fullScreen')
        if (obj.hasClass('expanded')) {
          obj.removeClass('expanded')
          $(this).html('&#xe663;')
          self.leftClose = false
        } else {
          obj.addClass('expanded')
          $(this).html('&#xe6680;')
          self.leftClose = true
        }
      })

      $(document).on('click', '#userBtnList', function () {
        $(this).find('.popover').show()
      })
      $(document).on('click', '#userBtnList .popover-content a', function () {
        setTimeout(function () {
          $('#userBtnList .popover').hide()
        }, 200)
      })

      $(document).click(function (e) {
        let i = $(e.target)
        if (!i.closest('#userBtnList').length > 0) {
          $('#userBtnList .popover').hide()
        }
      })

      self.setView()
    }, 1000)

    _.delay(() => {
      $('.fullLeft').mCustomScrollbar({
        axis: 'y'
      })
    }, 3000)

    let msgTime = setInterval(function () {
      db.getRequest('Institution/Notice/getNotifyNumber', {}).then(res => {
        if (res.status === 1) {
          self.$store.commit('uploadMsg', res.data)
        }
        if (res.status === 402 || res.status === 403) {
          clearInterval(msgTime)
        }
      })
    }, 60000)
    // 每一分钟执行，获取提醒信息
    let remindTime = setInterval(function () {
      db.postRequest('Institution/Home/getRemind', {}).then(res => {
        if (res.status === 1 && res.data.length > 0) {
          self.remindInfo = res.data
          $('#modalRemind').modal({ backdrop: 'static', show: true })
        } else if (res.status === 402 || res.status === 403) {
          clearInterval(remindTime)
        } else {
          console.log('获取日历提醒：' + res.msg)
        }
      })
    }, 60000)
    // 执行全站自定义下拉菜单
    $(document).on('click', '[data-toggle="customizeDropdown"]', function (event) {
      event.preventDefault()
      let $this = $(this).parents('.customizeDropdown')
      if ($this.hasClass('open')) {
        $this.removeClass('open')
      } else {
        $this.addClass('open')
      }
    })
    $(document).on('click', function (event) {
      let i = $(event.target)
      if (i.closest('.customizeDropdown').length === 0) {
        $('.customizeDropdown').removeClass('open')
      }
    })
  },
  methods: {
    ...mapActions(['login']),
    logOut () {
      let self = this
      self.layer.confirm('您确定要退出登录吗？', {icon: 3}, function (e) {
        store.dispatch('logOut')
        self.nav = 0
        self.layer.close(e)
        window.location.replace('/')
      })
    },
    setView () {
      let $this = $('.fullRightContent')
      let viewH = $(window).height() - 51
      $this.css({ 'min-height': viewH + 'px' })
    }
  },
  watch: {
    $route (to, from) {
      let self = this
      self.breadCrumb = to.matched
    }
  }
}
</script>
<style lang="scss">
#userBtnList {
    position:relative;

    & > a {
        padding-top:10px;padding-bottom:10px;

        & p, & i {
            display:inline-block;margin-bottom:0;width:30px;height:30px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;overflow:hidden;vertical-align:middle;line-height:30px;text-align:center;

            & img {width:100%;height:100%;}
        }
    }

    & .popover {
        top:50px;left:50%;margin-left:-44px;

        & .popover-content {
            & dl {
                margin-bottom:0;

                & dd {line-height:24px;}
            }
        }
    }

}

#modalRemind {
    & .modal-content {
        &:before {content:'';width:404px;height:312px;background:url("../static/images/004.png") no-repeat 0 0; display:block;position:absolute;left:50%;top:-95px;margin-left:-202px;z-index:1;}

        &:after {content:'';width:100%;height:122px;background:url("../static/images/003.png") no-repeat 0 0; display:block;position:absolute;left:0;top:128px;z-index:2;}
    }
}
</style>
