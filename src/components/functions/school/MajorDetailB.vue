<template>
    <div id="majorWrapB">
        <div v-if="loading" v-html="LoadingImg()" class="pt-50"></div>
        <div v-if="!loading">
            <!--header start-->
            <MajorDetailHeader :schoolInfo="schoolInfo"></MajorDetailHeader>
            <!--header end-->

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
                        <dd class="col-lg-6 lh30" v-for="(v, i) in course" :key="i">{{i+1}}. {{v}}</dd>
                    </dl>
                    <div class="schoolTitle" id="tabs8">成绩要求</div>

                    <table class="table table-customize table-hover text-center table-bordered">
                        <thead>
                        <tr v-for="(item,i) in langReq.academic" :key="i" v-if="i===0">
                            <th :width="100 / item.length + '%'" class="text-center" v-for="(items, k) in item" :key="k">
                                {{items}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,i) in langReq.academic" :key="i" v-if="i>0">
                            <td :width="100 / item.length + '%'" class="text-center" v-for="(items, k) in item" :key="k">
                                {{items}}
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    <table class="table table-customize table-hover text-center table-bordered">
                        <thead>
                        <tr v-for="(item,i) in langReq.toefl_ielts" :key="i" v-if="i===0">
                            <th :width="100 / item.length + '%'" class="text-center" v-for="(items, k) in item" :key="k">{{items}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,i) in langReq.toefl_ielts" :key="i" v-if="i>0">
                            <td :width="100 / item.length + '%'" class="text-center" v-for="(items, k) in item" :key="k">
                                {{items}}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div class="schoolTitle" id="tabs9">申请要求</div>
                    <div class="bgGray pl-25 pr-25 pt-10 pb-10">

                        <div class="row lh40 bdWhite applyInfoFs">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-for="(item, i) in applyInfo.fs" :key="i">
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <b>{{item.name}}：</b>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                        {{item.val}}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row lh40">
                            <div class="hiddenList bdb clearfix" v-if="applyInfo.qs_list.ps_show===1">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <b>个人陈述：</b>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                    <span v-if="applyInfo.qs_list.ps_is !== '-'" class="handPower"
                                          @click="showAsk($event)">
                                        <span class="dib_vm">{{applyInfo.qs_list.ps_is}}</span>
                                        <i class="iconfont">&#xe630;</i>
                                    </span>
                                    <span v-if="applyInfo.qs_list.ps_is === '-'">-</span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hiddenCom"
                                     v-if="applyInfo.qs_list.ps_is !== '-'">
                                    <div class="bgWhite pad-15 lh24" style="margin: -2px -15px 0;">
                                        <div v-html="applyInfo.qs_list.ps"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="hiddenList bdb clearfix" v-if="applyInfo.qs_list.ws_show===1">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <b>Writing Sample :</b>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                    <span v-if="applyInfo.qs_list.ws_is==='-'">-</span>
                                    <span class="handPower" v-if="applyInfo.qs_list.ws_is!=='-'"
                                          @click="showAsk($event)">
                                        <span class="dib_vm">{{applyInfo.qs_list.ws_is}}</span>
                                        <i class="iconfont">&#xe630;</i>
                                    </span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hiddenCom"
                                     v-if="applyInfo.qs_list!=='-'">
                                    <div class="bgWhite pad-15 lh24" style="margin: -2px -15px 0;">
                                        <div v-html="applyInfo.qs_list.ws"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="hiddenList bdb clearfix">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <b>语言豁免 :</b>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                    <span v-if="applyInfo.qs.is_language_waiver ==='N'">无</span>
                                    <span class="handPower" v-if="applyInfo.qs.is_language_waiver !=='N'"
                                          @click="showAsk($event)">
                                        <span class="dib_vm">有</span>
                                        <i class="iconfont">&#xe630;</i>
                                    </span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hiddenCom"
                                     v-if="applyInfo.qs.is_language_waiver !=='N'">
                                    <div class="bgWhite pad-15 lh24" style="margin: -2px -15px 0;">
                                        <div v-html="applyInfo.qs.language_waiver"></div>
                                    </div>
                                </div>
                            </div>

                            <div :class="country==='美国'?'hiddenList bdb clearfix':'hiddenList clearfix'">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <b>专业背景要求 :</b>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                    <span v-if="applyInfo.qs.need_academic ===''">无</span>
                                    <span class="handPower" v-if="applyInfo.qs.need_academic !==''"
                                          @click="showAsk($event)">
                                        <span class="dib_vm">要求</span>
                                        <i class="iconfont">&#xe630;</i>
                                    </span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hiddenCom"
                                     v-if="applyInfo.qs.need_academic !==''">
                                    <div class="bgWhite pad-15 lh24" style="margin: -2px -15px 0;">
                                        <div v-html="applyInfo.qs.need_academic"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="hiddenList clearfix" v-if="country==='美国'">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <b>附加 :</b>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                                    <span v-if="applyInfo.qs.is_others ==='无'">-</span>
                                    <span class="handPower" v-if="applyInfo.qs.is_others !=='无'"
                                          @click="showAsk($event)">
                                        <span class="dib_vm">要求</span>
                                        <i class="iconfont">&#xe630;</i>
                                    </span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hiddenCom"
                                     v-if="applyInfo.qs.is_others !=='无'">
                                    <div class="bgWhite pad-15 lh24" style="margin: -2px -15px 0;">
                                        <div v-html="applyInfo.qs.others"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="blk20"></div>
                    <div class="schoolTitle">申请时间</div>

                    <div class="bgGray pl-25 pr-25 pt-10 pb-10">
                        <div class="row lh40 bdWhite applydatelist">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" v-for="(item, i) in applyDate" :key="i">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <b>{{item.title}}</b>
                                </div>
                                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-right">
                                    {{item.val}}
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
  name: 'SchoolHeaderB',
  store,
  data () {
    return {
      loading: true,
      unqId: '',
      schoolInfo: {},
      majorIntro: '',
      baseInfo: [],
      course: [],
      langReq: {},
      applyInfo: {},
      applyDate: [],
      tabs: [],
      stickMenu: '',
      major: '',
      country: ''
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

    self.getMajorInfo(id)

    setTimeout(function () {
      $('.hiddenList .hiddenCom').slideUp(0)
      $('.hiddenList:eq(0) .hiddenCom').slideDown(0)
      $('.hiddenList:eq(0)').find('i').html('&#xe688;')

      $(document).on('click', '.navbar-wrapper a', function () {
        let i = $(this).parent().index()
        $(window).scrollTop(self.tabs[i] - 41)
      })
    }, 500)
  },
  methods: {
    getMajorInfo (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('unq_id', id)
      self.loading = true
      db.postRequest('Institution/Tools/masterMajorDetailNew', params).then(res => {
        if (res.status === 1) {
          self.$route.meta.tabs = res.data.headerInfo.schoolname + '-' + res.data.headerInfo.major_cn
          self.schoolInfo = res.data.headerInfo
          self.majorIntro = res.data.majorIntro
          self.baseInfo = res.data.baseInfo
          self.course = res.data.course
          self.langReq = res.data.langReq
          self.applyDate = res.data.applyDate
          self.applyInfo = res.data.applyInfo
          self.major = res.data.major
          self.country = res.data.country

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
      let obj = $(event.currentTarget).parents('.hiddenList')
      let $this = $(event.currentTarget)
      if (obj.find('.hiddenCom').is(':hidden')) {
        $this.find('i').html('&#xe688;')
        obj.find('.hiddenCom').slideDown()
      } else {
        $this.find('i').html('&#xe630;')
        obj.find('.hiddenCom').slideUp()
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
        if (WinTop > self.tabs[3]) {
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
            position:fixed;z-index:100;box-shadow:1px 1px 5px #ccc;right:15px;top:50px;background-color:#fff;
        }
    }

    .nav.nav-tabs{
        border-bottom-color:#39f;

        & > li{
            margin-bottom:0;

            & > a{
                border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;margin-right:0;padding:10px 25px;

                &:hover, &:focus{background:#fff;}
            }

            &.active{
                & > a{
                    background-color:#39f;color:#fff;
                }
            }
        }
    }

    .applydatelist{
        & > div{
            border-bottom:1px solid #fff;

            &:nth-of-type(odd){
                border-right:1px solid #fff;
            }
        }
    }

    .applyInfoFs{
        & > div{
            border-bottom:1px solid #dedede;

            &:nth-of-type(odd){
                border-right:1px solid #dedede;
            }
        }
    }
</style>
