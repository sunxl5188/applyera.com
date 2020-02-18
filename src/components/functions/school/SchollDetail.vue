<template>
  <div>
    <div v-show="name==='scholldetail'">
      <div v-if="loading" v-html="LoadingImg"></div>
      <div v-if="!loading">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <SchoolHeader :schoolInfo="headerInfo"/>
        </transition>
          <ul class="nav nav-tabs" id="schoolDetail"><!--nav-justified-->
            <li :class="{'active':tab===1}" @click="setTabs(1)">
              <a href="javascript:void(0);">学校简介</a>
            </li>
            <li :class="{'active':tab===2}" @click="setTabs(2)">
              <a href="javascript:void(0);">本科专业</a>
            </li>
            <li :class="{'active':tab===3}" @click="setTabs(3)">
              <a href="javascript:void(0);">硕士专业</a>
            </li>
            <li :class="{'active':tab===4}" @click="setTabs(4)">
              <a href="javascript:void(0);">预科语言</a>
            </li>
            <li :class="{'active':tab===5}" @click="setTabs(5)">
              <a href="javascript:void(0);">过往案例</a>
            </li>
          </ul>
          <div class="blk15"></div>
          <div class="tab-content">
            <keep-alive>
              <component :is="component" :id="id" :detailInfo="detailInfo"></component>
            </keep-alive>
          </div>
      </div>
    </div>
    <router-view></router-view>
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
    })
  },
  beforeDestroy () {
    $('div[class^=\'tip\']').remove()
  },
  methods: {
    setTabs (type) {
      let self = this
      self.tab = type
      switch (type) {
        case 1:
          self.component = SchoolDetailComponent
          break
        case 2:
          self.component = MajorListA
          break
        case 3:
          self.component = MajorListB
          break
        case 4:
          self.component = Foundation
          break
        case 5:
          self.component = CaseList
          break
      }
    },
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
    id () {
      this.getSchoolInfo()
    },
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped lang="less">
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
