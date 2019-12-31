<template>
  <div>
    <div v-if="loading" v-html="LoadingImg"></div>
    <div v-if="!loading">
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <SchoolHeader :schoolInfo="headerInfo"/>
      </transition>
        <ul class="nav nav-tabs" id="schoolDetail"><!--nav-justified-->
          <li :class="{'active':tab===1}">
            <a href="#tabs4" data-toggle="tab" data-id="SchoolDetailComponent">学校简介</a>
          </li>
          <li :class="{'active':tab===2}">
            <a href="#tabs5" data-toggle="tab" data-id="MajorListA">本科专业</a>
          </li>
          <li :class="{'active':tab===3}">
            <a href="#tabs6" data-toggle="tab" data-id="MajorListB">硕士专业</a>
          </li>
          <li :class="{'active':tab===4}">
            <a href="#tabs8" data-toggle="tab" data-id="Foundation">预科语言</a>
          </li>
          <li :class="{'active':tab===5}">
            <a href="#tabs7" data-toggle="tab" data-id="CaseList">过往案例</a>
          </li>
        </ul>
        <div class="blk15"></div>
        <div class="tab-content">
          <keep-alive>
            <component :is="component" :id="id" :detailInfo="detailInfo"></component>
          </keep-alive>
          <div class="tab-pane fade in active" id="tabs4"></div>
          <div class="tab-pane fade" id="tabs5"></div>
          <div class="tab-pane fade" id="tabs6"></div>
          <div class="tab-pane fade" id="tabs7"></div>
          <div class="tab-pane fade" id="tabs8"></div>
        </div>
    </div>
  </div>
</template>

<script>
import pagination from '@#/shared/Pagination'
import SchoolHeader from '@#/functions/school/SchoolHeader'
import SchoolDetailComponent from '@#/functions/school/SchoolDetailComponent'
import MajorListA from '@#/functions/school/MajorListA'
import MajorListB from '@#/functions/school/MajorListB'
import Foundation from '@#/functions/school/Foundation'
import CaseList from '@#/functions/school/CaseList'
import store from '@/vuex/Store'
import db from '@~/js/request'

require('@@/js/tipsy/jquery.tipsy')

export default {
  name: 'SchollDetail',
  store,
  data () {
    return {
      loading: true,
      id: '',
      tab: 1,
      name: '',
      headerInfo: {
        'unq_id': '',
        'schoolname': '',
        'englishname': '',
        'address': '',
        'schoolbadge': '',
        'website': '',
        'ranking': {
          'content': '',
          'name': ''
        },
        'qs_ranking': {
          'val': '',
          'name': ''
        },
        'is_clt': '',
        'commission': '',
        'type': ''
      },
      detailInfo: {},
      component: SchoolDetailComponent
    }
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    }
  },
  mounted () {
    let self = this
    let id = self.$route.query.id || ''
    let tab = parseInt(self.$route.query.tab)
    let name = self.$route.name
    self.id = id
    self.tab = tab
    self.name = name
    self.$nextTick(() => {
      if (tab === 1 || name === 'scholldetail') {
        self.getSchoolInfo()
      }
      if (tab === 2) {
        self.component = MajorListA
      }
      if (tab === 3) {
        self.component = MajorListB
      }
      if (tab === 4) {
        self.component = Foundation
      }
      if (tab === 5) {
        self.component = CaseList
      }
      $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        self.tab = $(e.target).parent().index() + 1
        self.component = e.target.getAttribute('data-id')
        self.$router.push({path: '/functions/schoollist/SchollDetail', query: {id: self.id, tab: self.tab}})
      })
    })
  },
  beforeDestroy () {
    $('div[class^=\'tip\']').remove()
  },
  methods: {
    getSchoolInfo () {
      let self = this
      let params = new URLSearchParams()
      params.append('unq_id', self.id)
      self.loading = true
      db.postRequest('Institution/Tools/schoolDetailNew', params).then(res => {
        if (res.status === 1) {
          self.headerInfo = res.data.headerInfo
          self.detailInfo = {
            baseInfo: res.data.baseInfo,
            cityInfo: res.data.cityInfo,
            intro: res.data.intro,
            adms_office: res.data.adms_office,
            rcmd_schools: res.data.rcmd_schools
          }
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    }
  },
  components: {
    SchoolHeader,
    pagination,
    SchoolDetailComponent,
    MajorListA,
    MajorListB,
    Foundation,
    CaseList
  },
  watch: {
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped lang="scss">
.schoolSearch {
  margin:-5px 0 0 0;
}

.nav.nav-tabs {
  padding-top:30px;
  border-bottom-color:#39f;

  & > li {
    margin-bottom:0;

    & > a {
      border:none;
      background-color:#fff;
      color:#333;
      -webkit-border-radius:0;
      -moz-border-radius:0;
      border-radius:0;
      margin-right:0;
      padding:10px 25px;
    }

    &.active {
      & > a {
        background-color:#39f;
        color:#fff;
      }
    }
  }
}

.zhaoshengban {
  & p {
    word-break:break-all; word-wrap:break-word;
  }
}

.masonryItem {
  width:33.3333%;
}
</style>
