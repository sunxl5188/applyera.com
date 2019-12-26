<template>
    <div id="majorWrap">
        <div v-if="loading" v-html="LoadingImg" class="pt-50"></div>
        <div v-if="!loading">
            <MajorDetailHeader :schoolInfo="schoolInfo"/>

            <div class="blk30"></div>
            <div class="navbar-wrapper">
                <ul class="nav nav-tabs"><!--nav-justified-->
                    <li class="menuItem active"><a href="javascript:void(0);">专业信息</a></li>
                    <li class="menuItem"><a href="javascript:void(0);">主修课程</a></li>
                    <li class="menuItem"><a href="javascript:void(0);">成绩要求</a></li>
                    <li class="menuItem"><a href="javascript:void(0);">申请要求</a></li>
                </ul>
            </div>

            <div class="tab-content">
                <div class="tab-pane fade in active">
                    <div class="schoolTitle" id="tabs6">专业信息</div>
                    <div class="row lh34">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" v-for="(item, i) in baseInfo" :key="i">
                            <span>{{item.name}}:</span>
                            <span data-toggle="tooltip" :title="item.val">{{item.val|cutString(20)}}</span>
                        </div>

                    </div>

                    <div class="schoolTitle">专业概况</div>
                    <div class="clearfix lh20" v-html="majorIntro"></div>
                    <div class="schoolTitle" v-if="major!==''">可选专业</div>
                    <div class="row pb-15" v-if="major!==''">
                        <div class="col-sm-6 lh30" v-for="(item,key) in major" :key="key">
                            {{key+1}}.{{item}}
                        </div>
                    </div>
                    <div class="schoolTitle" id="tabs7">主修课程</div>
                    <dl class="clearfix row dlList">
                        <dd class="col-lg-6 lh30" v-for="(item, index) in course" :key="index"
                            style="white-space: nowrap;-ms-text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;">
                            {{index+1}}. {{item}}
                        </dd>
                    </dl>
                    <div class="schoolTitle" id="tabs8">成绩要求</div>

                    <table class="table table-customize table-hover table-bordered text-center">
                        <thead>
                        <tr v-for="(item,i) in langReq.academic" :key="i" v-if="i===0">
                            <td v-for="(items, k) in item" :key="k" :width="100 / item.length +'%'">
                                {{items}}
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,i) in langReq.academic" :key="i" v-if="i>0">
                            <td v-for="(items, k) in item" :key="k">
                                {{items}}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <table class="table table-customize table-hover table-bordered text-center">
                        <tbody>
                        <tr v-for="(item, i) in langReq.toefl" :key="i">
                            <td v-for="(items, k) in item" :key="k" :width="100 / item.length +'%'">{{items}}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div class="schoolTitle" id="tabs9">申请要求</div>
                    <div class="bgGray pad-10">
                        <table class="table tableWhiteBor">
                            <tbody>
                            <tr>
                                <td width="15%"><b>条件录取：</b></td>
                                <td>&nbsp;</td>
                                <td class="text-right">
                                    <span class="mr-25" v-if="applyInfo.condition.is !== '允许'">-</span>
                                    <span v-if="applyInfo.condition.is === '允许'" class="handPower showAsk"
                                          @click="showAsk($event)"><span>{{applyInfo.condition.is}}</span><i
                                            class="iconfont">&#xe630;</i></span>
                                </td>
                            </tr>
                            <tr class="hiddenCom" v-if="applyInfo.condition.is === '允许'">
                                <td colspan="3">
                                    <div class="bgWhite pad-15 lh24">
                                        {{applyInfo.condition.text}}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><b>语言免除：</b></td>
                                <td></td>
                                <td class="text-right">
                                    <span class="mr-25" v-if="applyInfo.langwav.is !== '允许'">-</span>
                                    <span v-if="applyInfo.langwav.is === '允许'" class="handPower showAsk"
                                          @click="showAsk($event)"><span>{{applyInfo.langwav.is}}</span><i
                                            class="iconfont">&#xe630;</i></span>
                                </td>
                            </tr>
                            <tr class="hiddenCom" v-if="applyInfo.langwav.is === '允许'">
                                <td colspan="3">
                                    <div class="bgWhite pad-15 lh24">
                                        {{applyInfo.langwav.text}}
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="applyInfo.qs_list.ps_show===1">
                                <td><b>个人陈述：</b></td>
                                <td></td>
                                <td class="text-right">
                                    <span class="mr-25"
                                          v-if="applyInfo.qs_list.ps_is === '-'">-</span>
                                    <span v-if="applyInfo.qs_list.ps_is !== '-'"
                                          class="handPower showAsk" @click="showAsk($event)"><span>{{applyInfo.qs_list.ps_is}}</span><i
                                            class="iconfont">&#xe630;</i></span>
                                </td>
                            </tr>
                            <tr class="hiddenCom"
                                v-if="applyInfo.qs_list.ps_show===1 && applyInfo.qs_list.ps_is !== '-'">
                                <td colspan="3">
                                    <div class="bgWhite pad-15 lh24">
                                        <div class="clearfix lh24" v-html="applyInfo.qs_list.ps"></div>
                                    </div>
                                </td>
                            </tr>

                            <tr v-if="applyInfo.qs_list.ws_show===1">
                                <td><b>写作：</b></td>
                                <td></td>
                                <td class="text-right">
                                    <span class="mr-25"
                                          v-if="applyInfo.qs_list.ws_is === '-'">-</span>
                                    <span class="handPower showAsk" @click="showAsk($event)"
                                          v-if="applyInfo.qs_list.ws_is !== '-'"><span>{{applyInfo.qs_list.ws_is}}</span><i
                                            class="iconfont">&#xe630;</i></span>
                                </td>
                            </tr>

                            <tr class="hiddenCom"
                                v-if="applyInfo.qs_list.ws_show===1 && applyInfo.ws_qs.is !== '-'">
                                <td colspan="3">
                                    <div class="bgWhite pad-15 lh24" v-html="applyInfo.qs_list.ws"></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="blk20"></div>
                    <div class="row">
                        <div :class="counrty==='澳大利亚'?'col-xs-3 col-sm-3 col-md-3 col-lg-3':'col-xs-12 col-sm-12 col-md-12 col-lg-12'"
                             v-for="(item, i) in applyInfo.apply_date" :key="i">
                            <div class="bgGray pad-10">
                                <div class="font24 text-center lh30" style="position: relative;">
                                    <span class="fontB">{{item.title}}</span>
                                </div>
                                <div class="blk10"></div>
                                <div class="bgWhite pt-20 pb-20 pl-10 pr-10 applyDateList">
                                    <div class="lh22" v-for="(items, i) in item.file" :key="i" v-html="items"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="blk20"></div>

                    <div class="bgGray pl-25 pr-25 pt-10 pb-10">
                        <div class="row lh40 bdWhite">

                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-if="applyInfo.recommend">
                                <div class="row">
                                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <b>推荐信：</b>
                                    </div>
                                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 text-right">
                                        {{applyInfo.recommend}}
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-if="applyInfo.score">
                                <div class="row">
                                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <b>高中成绩单：</b>
                                    </div>
                                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 text-right">
                                        {{applyInfo.score}}
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-if="applyInfo.report">
                                <div class="row">
                                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <b>学校报告：</b>
                                    </div>
                                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 text-right">
                                        {{applyInfo.report}}
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-if="applyInfo.property">
                                <div class="row">
                                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <b>财产证明：</b>
                                    </div>
                                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 text-right">
                                        {{applyInfo.property}}
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                 v-if="applyInfo.highschool_graduation_need">
                                <div class="row">
                                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <b>高中毕业证书：</b>
                                    </div>
                                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 text-right">
                                        {{applyInfo.highschool_graduation_need}}
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-if="applyInfo.unifiedtest">
                                <div class="row">
                                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <b>高考成绩：</b>
                                    </div>
                                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 text-right">
                                        {{applyInfo.unifiedtest}}
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-if="applyInfo.resume">
                                <div class="row">
                                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <b>个人简历：</b>
                                    </div>
                                    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 text-right">
                                        {{applyInfo.resume}}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MajorDetailHeader from '@/components/functions/school/MajorDetailHeader'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'MajorDetailA',
  store,
  data () {
    return {
      loading: true,
      unqId: '',
      schoolInfo: {},
      isCollection: false,
      baseInfo: '',
      majorIntro: '',
      course: '',
      langReq: '',
      applyInfo: '',
      tabs: [],
      stickMenu: '',
      major: '',
      counrty: ''
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    let id = self.$route.query.id
    self.unqId = id
    self.$nextTick(() => {
      self.getMajorInfo(id)
      setTimeout(function () {
        $('tr.hiddenCom').hide()
        $('tr.hiddenCom').eq(0).show()
        $('tr.hiddenCom .bgWhite').slideUp(0)
        $('tr.hiddenCom .bgWhite:eq(0)').slideDown(0)
        $('.showAsk').eq(0).find('i').html('&#xe688;')

        let hArr = []
        $('.applyDateList').each(function () {
          hArr.push($(this).outerHeight(true))
        })
        $('.applyDateList').height(Math.max.apply(null, hArr))

        $(document).on('click', '.navbar-wrapper a', function () {
          let i = $(this).parent().index()
          $(window).scrollTop(self.tabs[i] - 41)
        })
      }, 500)
    })
  },
  methods: {
    getMajorInfo (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('unq_id', id)
      self.loading = true
      db.postRequest('Institution/Tools/majorDetailNew', params).then(res => {
        if (res.status === 1) {
          self.$route.meta.tabs = res.data.headerInfo.schoolname + '-' + res.data.headerInfo.major_cn
          self.schoolInfo = res.data.headerInfo
          self.baseInfo = res.data.baseInfo
          self.majorIntro = res.data.majorIntro
          self.course = res.data.course
          self.langReq = res.data.langReq
          self.applyInfo = res.data.applyInfo
          self.major = res.data.major
          self.counrty = res.data.counrty

          setTimeout(function () {
            let tabsArr = ['#tabs6', '#tabs7', '#tabs8', '#tabs9']
            tabsArr.map(item => {
              self.tabs.push($(item).offset().top - 80)
            })
            self.stickMenu = $('.navbar-wrapper').offset().top

            $(window).on('resize', function () {
              self._stickUp()
            })
            $(window).on('scroll', function () {
              self._stickUp()
            })
            self._stickUp()
            $('[data-toggle="tooltip"]').tooltip()
          }, 200)
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    },
    showAsk (event) {
      let obj = $(event.currentTarget).parents('tr')
      let $this = $(event.currentTarget)
      if (obj.next('tr').is(':hidden')) {
        $this.find('i').html('&#xe688;')
        obj.next('tr').show()
        obj.next('tr').find('.bgWhite').slideDown()
      } else {
        $this.find('i').html('&#xe630;')
        obj.next('tr').find('.bgWhite').slideUp(function () {
          obj.next('tr').hide()
        })
      }
    },
    goHistory () {
      this.$router.back()
    },
    // 收藏
    collection (id, type, a) {
      let self = this
      let params = new URLSearchParams()
      params.append('unqId', id)
      params.append('type', type)
      params.append('action', a)
      db.postRequest('Institution/Tools/collection', params).then(res => {
        if (res.status === 1) {
          self.majorInfo['is_collect'] = self.majorInfo['is_collect'] === 0 ? 1 : 0
        }
      })
    },
    _stickUp () {
      let self = this
      setTimeout(function () {
        let _this = $('.navbar-wrapper')
        let WinTop = $(window).scrollTop() + 50
        let _thisW = $('.fullRightContent > .container-fluid').width()

        if (WinTop - self.stickMenu > 0) {
          _this.width(_thisW)
          _this.addClass('stuckMenu')
        } else {
          _this.width(_thisW - 30)
          _this.removeClass('stuckMenu')
        }

        if (WinTop > 0 && WinTop < self.tabs[1]) {
          _this.find('li').removeClass('active')
          _this.find('li').eq(0).addClass('active')
        }
        if (WinTop > self.tabs[1] && WinTop < self.tabs[2]) {
          _this.find('li').removeClass('active')
          _this.find('li').eq(1).addClass('active')
        }
        if (WinTop > self.tabs[2] && WinTop < self.tabs[3]) {
          _this.find('li').removeClass('active')
          _this.find('li').eq(2).addClass('active')
        }
        if (WinTop > self.tabs[3] || WinTop === document.body.offsetHeight - window.innerHeight + 50) {
          _this.find('li').removeClass('active')
          _this.find('li').eq(3).addClass('active')
        }
      }, 200)
    }
  },
  components: {MajorDetailHeader},
  watch: {}
}
</script>

<style scoped lang="scss">
    .navbar-wrapper{
        &.stuckMenu{
            position:fixed;
            z-index:10;
            top:50px; right:15px;
            box-shadow:1px 1px 5px #ccc;
            background-color:#fff;
        }
    }

    .nav.nav-tabs{
        border-bottom-color:#39f;
        & > li{
            margin-bottom:0;

            & > a{
                border:none;
                -webkit-border-radius:0;
                -moz-border-radius:0;
                border-radius:0;
                padding:10px 25px;
                margin-right:0;

                &:hover, &:focus{background:#fff;}
            }

            &.active{
                & > a{
                    background-color:#39f;
                    color:#fff;
                }
            }
        }
    }

    .dlList{
        & dd:nth-child(odd){
            border-right:1px solid #dedede;
        }
    }

    .tableWhiteBor > tbody > tr > td{
        border-top-color:#fff;
    }

    .bdWhite{
        & > div:nth-child(odd){
            border-right-style:solid;
            border-width:1px;
            border-color:#fff;
        }

        & > div:nth-child(n+3){
            border-top-style:solid;
            border-width:1px;
            border-color:#fff;
        }
    }
</style>
