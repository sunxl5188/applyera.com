<template>
    <div>
        <div v-if="loading" v-html="LoadingImg"></div>
        <div v-if="!loading">
            <div class="row pb-25">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div class="clearfix">
                        <div class="cded font18 lh22 pb-15">{{detail.header.major_cn + '/' + detail.header.major_en}}</div>
                        <p>所属学校：{{detail.header.school_cn +'/'+ detail.header.school_en}}</p>
                    </div>
                    <div class="row">
                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <p class="cded font18">{{detail.header.language}}</p>
                            <p>雅思/托福</p>
                        </div>
                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <p class="cded font18">{{detail.header.project}}</p>
                            <p>学费/项目</p>
                        </div>
                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <p class="cded font18">{{detail.header.duration}}</p>
                            <p>课程时长</p>
                        </div>
                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><!--权限查看-->
                            <p class="cded font18">{{detail.header.commission}}</p>
                            <p>预计返佣</p>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-right">
                    <a href="javascript:void(0);" v-if="detail.header.is_clt===0" @click="collection(schoolInfo.unq_id,schoolInfo.type,$event)"><i
                            class="iconfont">&#xe642;</i> <span class="div_vm">加入收藏</span>
                    </a>
                    <a href="javascript:void(0);" v-if="detail.header.is_clt===1" @click="collection(schoolInfo.unq_id,schoolInfo.type,$event)"><i
                            class="iconfont cf90">&#xe69a;</i> <span class="div_vm">取消收藏</span>
                    </a>
                    <a href="javascript:void(0);" class="ml-15" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                        <span class="div_vm">返回</span></a>
                </div>
            </div>
            <div class="navbar-wrapper">
                <ul class="nav nav-tabs"><!--nav-justified-->
                    <li class="menuItem active"><a href="javascript:void(0);">申请要求</a></li>
                    <li class="menuItem"><a href="javascript:void(0);">申请材料</a></li>
                    <li class="menuItem"><a href="javascript:void(0);">直升专业</a></li>
                    <li class="menuItem"><a href="javascript:void(0);">宣传册</a></li>
                </ul>
            </div>
            <div class="schoolTitle" id="fdPage1">申请要求</div>
            <div class="clearfix">
                <p>语言要求：{{detail.req.lang}}</p>
                <p>学术要求：{{detail.req.learning}}</p>
            </div>
            <div class="schoolTitle" id="fdPage2">申请材料</div>
            <div class="clearfix">
                <span v-for="(item, i) in detail.material" :key="i">
                    {{item}}
                </span>
            </div>
            <div class="schoolTitle" id="fdPage3">直升专业</div>
            <div class="clearfix">
                <p v-for="(item, i) in detail.major" :key="i">
                    {{item}}
                </p>
            </div>
            <div class="schoolTitle" id="fdPage4">宣传册</div>
            <div class="clearfix">
                <p>
                    {{detail.brochure}}
                    <a href="javascript:void(0);">下载</a>
                    <a :href="siteUrl + detail.brochure" target="_blank">预览</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@~/js/request'
export default {
  name: 'FoundationDetail',
  data () {
    return {
      loading: false,
      id: '',
      cid: '',
      tabs: [],
      stickMenu: 0,
      detail: {
        header: '',
        major: '',
        material: '',
        req: ''
      },
      siteUrl: window.ajaxBaseUrl
    }
  },
  computed: {},
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.cid = self.$route.query.cid || ''
    self.$nextTick(() => {
      if (self.id === '' || self.cid === '') {
        self.layer.alert('非法请求', {icon: 2}, function (i) {
          self.layer.close(i)
          return false
        })
      } else {
        self.getDetail()
      }
      $(document).on('click', '.navbar-wrapper a', function () {
        let i = $(this).parent().index()
        $(window).scrollTop(self.tabs[i] - 41)
      })
      this.setScroll()
    })
  },
  methods: {
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('unq_id', self.id)
      params.append('apply_type', self.cid)
      db.postRequest('/Institution/Tools/prepDetails', params).then(res => {
        if (res.status === 1) {
          self.detail = res.data
        } else {
          console.log(res.msg)
        }
      })
    },
    setScroll () {
      let self = this
      setTimeout(function () {
        let tabsArr = ['#fdPage1', '#fdPage2', '#fdPage3', '#fdPage4']
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
      }, 2000)
    },
    collection (id, type, event) {},
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
  }
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
</style>
