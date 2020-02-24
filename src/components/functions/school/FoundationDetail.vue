<template>
    <div>
        <div v-if="loading" v-html="LoadingImg"></div>
        <div v-if="!loading">
            <div class="row pb-25">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div class="clearfix">
                        <div class="cded font18 lh22 pb-15">{{detail.header.major_cn + '/' + detail.header.major_en}}
                        </div>
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
                    <a href="javascript:void(0);" v-if="detail.header.is_clt===0"
                       @click="collection(detail.header.unq_id,detail.header.type, 1)"><i
                            class="iconfont">&#xe642;</i> <span class="div_vm">加入收藏</span>
                    </a>
                    <a href="javascript:void(0);" v-if="detail.header.is_clt===1"
                       @click="collection(detail.header.unq_id,detail.header.type, 2)"><i
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
                <p v-for="(item, i) in detail.brochure" :key="i">
                    <svg t="1577433970704" class="icon div_vm" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="6900" width="24" height="24">
                        <path d="M534.78 74.67h57.71v91.61c108.81 0.61 217.73-1.12 326.43 0.51 23.41-2.24 41.74 16 39.39 39.39 1.73 190.15-0.41 380.39 1 570.64-1 20.56 2 43.36-9.77 61.58-14.86 10.78-34.2 9.36-51.6 10.18-101.79-0.51-203.58-0.31-305.47-0.31v101.8h-63.3C374 921.77 218.61 895.92 63.38 868.64q-0.15-356.22 0-712.33c157.07-27.18 314.13-54.87 471.4-81.64z"
                              fill="#DC2E1B" p-id="6901"></path>
                        <path d="M110.51 551.6V427.19h37.32q21.22 0 27.65 1.87 9.9 2.8 16.57 12.18t6.68 24.23q0 11.45-3.85 19.25A33.46 33.46 0 0 1 185.1 497a32.41 32.41 0 0 1-12.1 5.88q-8.34 1.79-24.12 1.79h-15.12v46.93z m23.25-103.37v35.31h12.73q13.75 0 18.38-1.95a15.53 15.53 0 0 0 7.27-6.11 17.74 17.74 0 0 0 2.63-9.67 16.84 16.84 0 0 0-3.7-11.2 15.77 15.77 0 0 0-9.34-5.52q-4.18-0.85-16.73-0.85zM217.74 427.19h42.51q14.37 0 21.92 2.38A38.25 38.25 0 0 1 299.52 441a55.26 55.26 0 0 1 11 20.15q3.77 11.93 3.78 29.41 0 15.36-3.54 26.47-4.32 13.58-12.34 22-6 6.37-16.33 9.93-7.71 2.64-20.59 2.63h-43.76z m23.26 21v82.41h17.36q9.74 0 14.07-1.18a21 21 0 0 0 9.38-5.18q3.73-3.65 6.08-12t2.37-22.78q0-14.43-2.37-22.16t-6.59-12a21.61 21.61 0 0 0-10.77-5.85q-4.88-1.19-19.09-1.19zM334.16 551.6V427.19h78.95v21h-55.7v29.45h48.08v21h-48.08v52.96z"
                              fill="#FFFFFF" p-id="6902"></path>
                        <path d="M815.32 596.59a22.61 22.61 0 0 0-3.14-2.81c-4.66-3.52-14.15-8.66-32.86-13.11q-2.79-0.67-5.77-1.29c12.42 9.27 23 15 31.7 17 5.21 1.3 8.38 0.8 10.07 0.21zM708.86 409c2.43-8.52 4.09-23.81 0.57-26.88l-0.06 0.07c-4.7 6.5-10.64 33.19-8.67 49.29 3.73-6.64 4.91-11.08 8.16-22.48zM709.47 552.2A211.78 211.78 0 0 1 683 499.62a541.34 541.34 0 0 1-45.11 54.52c16.99-1.68 43.93-2.64 71.58-1.94z"
                              fill="#FFFFFF" p-id="6903"></path>
                        <path d="M589.1 196.82v361.91c9.41-2.69 15.9-4.05 15.9-4.05 5.64-5.88 5-5.33 11.77-12.6a758.94 758.94 0 0 0 59.94-73.54c-0.18-2.36-6.65-91.12 21.44-102.93a18.67 18.67 0 0 1 11.64-0.85c5.13 1.22 10 4.54 12.5 8.45 6.34 10.07 6.22 24.77 1 45.35-8.28 32.57-20.9 50.71-20.9 50.71s4 40.18 42 84.79c17.45 1.48 32.46 3.69 44.64 6.59 20.94 5 33.39 11.92 38.06 21.19 2.64 5.24 3 11.7-0.16 19.32s-6.37 11.4-12.2 13.64c-4.88 1.88-11 2-18.13 0.26-21.32-5.08-49.59-25.37-68-41.71-29.78-2.34-65.92-2.6-107.48-0.8q-18.53 19.91-32.07 31.85v213.35H925V196.82z"
                              fill="#FFFFFF" p-id="6904"></path>
                    </svg>
                    <span class="div_vm">{{item}}</span>
                    <span class="div_vm">
                        <a href="javascript:void(0);" class="ml-15 cded" @click="downFile(item)">下载</a>
                        <a href="javascript:void(0);" class="ml-10 cded" @click="viewPdf(siteUrl + item)">预览</a>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import JsZip from 'jszip'
import saveAs from 'file-saver'
import db from '@~/js/request'

export default {
  name: 'FoundationDetail',
  data () {
    return {
      loading: false,
      id: '',
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
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.$nextTick(() => {
      if (self.id === '') {
        self.layer.alert('非法请求', { icon: 2 }, function (i) {
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
    collection (unqId, type, action) {
      let self = this
      let params = new URLSearchParams()
      params.append('unqId', unqId)
      params.append('type', type)
      params.append('action', action)
      db.postRequest('Institution/Tools/collection', params).then(res => {
        if (res.status === 1) {
          self.detail.header.is_clt = action === 1 ? 1 : 0
        } else {
          self.layer.alert(res.msg, {icon: 2})
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
    },
    downFile (fileUrl) {
      let self = this
      let index = self.layer.load(1, { shade: [0.5] })
      self.loadXMLDoc(fileUrl, 'post', true, 'blob', function (xhr) {
        let x = xhr.currentTarget
        let fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length)
        if (x.readyState === 4) {
          let zip = new JsZip()
          zip.file(fileName, x.response)
          zip.generateAsync({ type: 'blob' })
            .then(function (content) {
              self.layer.close(index)
              saveAs(content, 'download.zip')
            })
        }
      })
    },
    loadXMLDoc (fileUrl, types, boole, ft, callback) {
      let xhr
      let self = this
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        /*eslint-disable*/
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
      if (xhr != null) {
        xhr.onreadystatechange = callback
        xhr.open(types, self.siteUrl + '/Institution/Read/pdfDownload', boole)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.setRequestHeader('token', self.$cookies.get('token') || '')
        xhr.responseType = ft
        xhr.send('pdf=' + fileUrl)
      } else {
        console.log('浏览器不支持XMLHTTP。')
      }
    },
    viewPdf (url) {
      let self = this
      self.layer.open({
        type: 2,
        area: ['1000px', document.body.clientHeight - 50 + 'px'],
        content: url
      })
    }
  }
}
</script>

<style scoped lang="less">
.navbar-wrapper {
    &.stuckMenu {
        position:fixed;
        z-index:10;
        top:50px; right:15px;
        box-shadow:1px 1px 5px #ccc;
        background-color:#fff;
    }
}

.nav.nav-tabs {
    border-bottom-color:#39f;

    & > li {
        margin-bottom:0;

        & > a {
            border:none;
            -webkit-border-radius:0;
            -moz-border-radius:0;
            border-radius:0;
            padding:10px 25px;
            margin-right:0;

            &:hover, &:focus {background:#fff;}
        }

        &.active {
            & > a {
                background-color:#39f;
                color:#fff;
            }
        }
    }
}
</style>
