<template>
  <div>
    <SchoolHeader :schoolInfo="headerInfo"/>

    <ul class="nav nav-tabs" id="schoolDetail"><!--nav-justified-->
      <li :class="tab===1?'active':''" @click="clickTabs(0)">
        <a href="#tabs4" data-toggle="tab">学校简介</a>
      </li>
      <li :class="tab===2?'active':''" @click="clickTabs(1)">
        <a href="#tabs5" data-toggle="tab">本科专业</a>
      </li>
      <li :class="tab===3?'active':''" @click="clickTabs(2)">
        <a href="#tabs6" data-toggle="tab">硕士专业</a>
      </li>
      <li :class="tab===4?'active':''" @click="clickTabs(3)">
        <a href="#tabs7" data-toggle="tab">过往案例</a>
      </li>
    </ul>
    <div class="blk15"></div>
    <div class="tab-content">
      <div :class="tab===1?'tab-pane fade in active':'tab-pane fade'" id="tabs4">
        <div class="schoolTitle">基本信息</div>
        <div class="row lh34">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" v-for="(item, i) in baseInfo" :key="i">
            {{item.name}}：{{item.val}}
          </div>
        </div>

        <div class="schoolTitle">城市信息</div>
        <div class="row lh34">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" v-for="(item, i) in cityInfo" :key="i">
            {{item.name}}：{{item.val}}
          </div>
        </div>
        <div class="schoolTitle">学校概述</div>
        <div class="clearfix lh20" v-html="intro"></div>
        <div class="schoolTitle" v-if="adms_office.length > 0">招生办信息</div>
        <div class="row" v-if="adms_office.length > 0">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pb-15" v-for="(item, i) in adms_office" :key="i">
            <p v-for="(items, k) in item" :key="k" v-html="items"></p>
          </div>
        </div>
        <div class="schoolTitle">类似的学校有</div>
        <div class="row">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" v-for="(item, i) in rcmd_schools" :key="i">
            <div class="pt-15 pb-15">
              <div class="media">
                <div class="media-left">
                  <router-link
                      :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.unq_id, tab:1}}">
                    <img class="media-object" :src="item.schoolbadge" width="40" height="40">
                  </router-link>
                </div>
                <div class="media-body">
                  <h5 class="media-heading">
                    <router-link
                        :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.unq_id, tab:1}}"
                        class="cded">{{item.englishname}}
                    </router-link>
                  </h5>
                  <div class="clearfix lh20">{{item.schoolname}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="tab===2?'tab-pane fade in active':'tab-pane fade'" id="tabs5">
        <div class="po_re schoolSearch last">
          <input type="text" name="keywordsA" class="form-control" v-model="keywordsA" placeholder="请输入关键字查询"
                 autocomplete="off" @keyup.enter="getMajorA(1,'search')">
          <i class="iconfont handPower clearSearch" @click="keywordsA='';getMajorA()" v-if="keywordsA!==''">&#xe7f6;</i>
          <button type="button" class="btn btn-primary btn-search" @click="getMajorA(1,'search')"></button>
        </div>
        <div class="row">
          <table class="table table-text-over table-customize">
            <thead>
            <tr>
              <th>专业名称</th>
              <th class="w25">所属学院</th>
              <th class="w15">学科领域</th>
              <th class="w15" v-if="userInfo.access.show_commission===1">
                佣金比例
                <a href="javascript:void(0);"
                   :class="sortComm===''?'icon-sort': (sortComm===1?'icon-sort up':'icon-sort down')"
                   @click="sortAction()"></a>
              </th>
              <th class="w15">收藏</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in MajorA" :key="i">
              <td :title="item.majoren +'<br>'+item.majorch" class="poshyTop">
                <router-link :to="{path:'/functions/schoollist/majordetaila', query:{id:item.unq_id}}">
                  <div class="lh20 cded textOver">
                    <span v-html="highlight(item.majoren, keywordsA)"></span>
                    <i class="iconfont cf00" v-if="item.is_hot">&#xe633;</i>
                  </div>
                  <div class="lh20" v-html="highlight(item.majorch,keywordsA)"></div>
                </router-link>
              </td>
              <td :title="item.collageen!=='-'?item.collageen +'<br>'+item.collagech:''"
                  :class="{poshyTop:item.collageen!=='-'}">
                <router-link :to="{path:'/functions/schoollist/majordetaila', query:{id:item.unq_id}}">
                  <div class="lh20 textOver" v-html="highlight(item.collageen,keywordsA)"></div>
                  <div class="lh20 c999" v-html="highlight(item.collagech,keywordsA)"></div>
                </router-link>
              </td>
              <td>{{item.majorarea}}</td>
              <td v-if="userInfo.access.show_commission===1">{{item.commission_rate}}</td>
              <td>
                <a href="javascript:void(0);" class="btn btn-primary btn-sm is-round"
                   @click="addCollection(1, item.unq_id, 2)"
                   v-if="item.is_clt === 0">加入收藏</a>
                <a href="javascript:void(0);" class="btn btn-default btn-sm is-round"
                   @click="addCollection(2, item.unq_id, 2)"
                   v-if="item.is_clt === 1">移出收藏</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <PagInAction :total="totalA" :current-page='currentA' :display="display"
                     @pagechange="getMajorA"></PagInAction>
      </div>
      <div :class="tab===3?'tab-pane fade in active':'tab-pane fade'" id="tabs6">
        <div class="po_re schoolSearch last">
          <input type="text" name="keywordsB" class="form-control" v-model="keywordsB"
                 @keyup.enter="getMajorB(1,'search')" placeholder="请输入关键字查询"
                 autocomplete="off">
          <i class="iconfont handPower clearSearch" @click="keywordsB='';getMajorB()" v-if="keywordsB!==''">&#xe7f6;</i>
          <button type="button" class="btn btn-primary btn-search" @click="getMajorB(1,'search')"></button>
        </div>
        <div class="row">
          <table class="table table-text-over table-customize">
            <thead>
            <tr>
              <th>专业名称</th>
              <th class="w25">所属学院</th>
              <th class="w15">学科领域</th>
              <th class="w15" v-if="userInfo.access.show_commission===1">
                佣金比例
                <a href="javascript:void(0);"
                   :class="sortComm2===''?'icon-sort': (sortComm2===1?'icon-sort up':'icon-sort down')"
                   @click="sortAction2()"></a>
              </th>
              <th class="w15">收藏</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in MajorB" :key="i">
              <td :title="item.major_en +'<br>'+item.major_cn" class="poshyTop">
                <router-link :to="{path:'/functions/schoollist/majordetailb', query:{id:item.unq_id}}">
                  <div class="lh20 cded textOver">
                    <span v-html="highlight(item.major_en, keywordsB)"></span>
                    <i class="iconfont cf00" v-if="item.is_hot">&#xe633;</i>
                  </div>
                  <div class="lh20" v-html="highlight(item.major_cn, keywordsB)"></div>
                </router-link>
              </td>
              <td :title="item.college_en!=='-'?item.college_en +'<br>'+item.college_cn:''" :class="{poshyTop:item.college_en!=='-'}">
                <router-link :to="{path:'/functions/schoollist/majordetailb', query:{id:item.unq_id}}">
                  <div class="lh20 textOver" v-html="highlight(item.college_en, keywordsB)"></div>
                  <div class="lh20 c999" v-html="highlight(item.college_cn, keywordsB)"></div>
                </router-link>
              </td>
              <td>{{item.major_area}}</td>
              <td v-if="userInfo.access.show_commission===1">{{item.commission_rate}}</td>
              <td>
                <a href="javascript:void(0);" class="btn btn-primary btn-sm is-round"
                   @click="addCollection(1, item.unq_id, 3)"
                   v-if="item.is_clt === 0">加入收藏</a>
                <a href="javascript:void(0);" class="btn btn-default btn-sm is-round"
                   @click="addCollection(2, item.unq_id, 3)"
                   v-if="item.is_clt === 1">移出收藏</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <PagInAction :total="totalB" :current-page='currentB' :display="display"
                     @pagechange="getMajorB"></PagInAction>
      </div>
      <div :class="tab===4?'tab-pane fade in active':'tab-pane fade'" id="tabs7">
        <div class="po_re schoolSearch last">
          <input type="text" name="keywordsB" class="form-control" v-model="keywordsC"
                 @keyup.enter="getCase()" placeholder="请输入关键字查询"
                 autocomplete="off">
          <i class="iconfont handPower clearSearch" @click="keywordsC='';getCase()" v-if="keywordsC!==''">&#xe7f6;</i>
          <button type="button" class="btn btn-primary btn-search" @click="getCase()"></button>
        </div>

        <div class="clearfix" v-if="userInfo.access.show_school_case!==1">
          <img src="../../../../static/images/permission.jpg" alt="" class="img-responsive"
               style="margin:0 auto;">
        </div>
        <div class="clearfix pt-10" v-if="userInfo.access.show_school_case===1">
          <div class="clearfix">
            <div v-if="caseList.length === 0" v-html="NoData()"></div>
            <div v-masonry transition-duration="0.3s" item-selector=".item" class="row">
              <div v-masonry-tile class="item col-xs-4 col-sm-4 col-md-4 col-lg-4"
                   v-for="(item, i) in caseList" :key="i">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <p v-for="(items, i) in item.content" :key="i">
                      <span v-html="highlight(i, keywordsC) +'：' + highlight(items, keywordsC)"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PagInAction :total="total" :current-page='current' :display=18
                       @pagechange="getCase" v-if="caseList.length > 0"></PagInAction>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagInAction from '@/components/PagInAction'
import SchoolHeader from '@/components/functions/school/SchoolHeader'
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
      keywordsA: '',
      keywordsB: '',
      keywordsC: '',
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
      baseInfo: {},
      cityInfo: {},
      intro: {},
      MajorA: [],
      MajorB: [],
      totalA: 0,
      totalB: 0,
      display: 50,
      currentA: 1,
      currentB: 1,
      sortComm: '',
      sortComm2: '',
      caseList: [],
      current: 1,
      total: 0,
      adms_office: [],
      rcmd_schools: []
    }
  },
  computed: {
    token () {
      return store.state.token
    },
    userInfo () {
      return store.state.userInfo
    }
  },
  mounted () {
    let self = this
    let id = self.$route.query.id
    let tab = parseInt(self.$route.query.tab)
    self.id = id
    self.tab = tab
    self.$nextTick(() => {
      self.getSchoolInfo()

      if (tab === 2) {
        self.getMajorA()
      }
      if (tab === 3) {
        self.getMajorB()
      }
      if (tab === 4) {
        self.getCase()
      }
    })
  },
  beforeDestroy () {
    $('div[class^=\'tip\']').remove()
  },
  methods: {
    // 切换标签加载数据
    clickTabs (len) {
      let self = this
      if (len === 0 && Object.keys(self.headerInfo).length === 0) {
        self.getSchoolInfo()
      }
      if (len === 1 && self.MajorA.length === 0) {
        self.getMajorA()
      }
      if (len === 2 && self.MajorB.length === 0) {
        self.getMajorB()
      }
      if (len === 3 && self.caseList.length === 0) {
        self.getCase()
      }
    },
    getSchoolInfo () {
      let self = this
      let params = new URLSearchParams()
      params.append('unq_id', self.id)
      self.loading = true
      db.postRequest('Institution/Tools/schoolDetailNew', params).then(res => {
        if (res.status === 1) {
          self.$route.meta.tabs = res.data.headerInfo.schoolname
          self.headerInfo = res.data.headerInfo
          self.baseInfo = res.data.baseInfo
          self.cityInfo = res.data.cityInfo
          self.intro = res.data.intro
          self.adms_office = res.data.adms_office
          self.rcmd_schools = res.data.rcmd_schools
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    },
    getMajorA (p, t) {
      let self = this
      let params = new URLSearchParams()
      if (t === 'search' && self.keywordsA === '') {
        self.layer.alert('请输入关键字搜索', {
          shadeClose: false
        })
      }
      params.append('schoolUnqId', self.id)
      params.append('keywords', self.keywordsA)
      params.append('sort', self.sortComm)
      params.append('page', p || 1)
      self.loading = true
      db.postRequest('Institution/Tools/professionList', params).then(res => {
        if (res.status === 1) {
          self.MajorA = res.data.list
          self.totalA = res.data.total
          setTimeout(function () {
            $('.poshyTop').tipsy({
              gravity: 's', // 显示方向s:上,n:下,w:右,e:左
              html: true, // 是否html
              opacity: 1, // 层透明度 0-1
              title: 'title', // 读取内容元素属性,默认为title 附：original-title
              trigger: 'hover' // 事件模式 hover mouseenter focus
            })
          }, 500)
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    },
    getMajorB (p, t) {
      let self = this
      let params = new URLSearchParams()
      if (t === 'search' && self.keywordsB === '') {
        self.layer.alert('请输入关键字搜索', {
          shadeClose: false
        })
      }
      params.append('schoolUnqId', self.id)
      params.append('keywords', self.keywordsB)
      params.append('sort', self.sortComm2)
      params.append('page', p || 1)
      db.postRequest('Institution/Tools/majorList', params).then(res => {
        if (res.status === 1) {
          self.MajorB = res.data.list
          self.totalB = res.data.total
          setTimeout(function () {
            $('.poshyTop').tipsy({
              gravity: 's', // 显示方向s:上,n:下,w:右,e:左
              html: true, // 是否html
              opacity: 1, // 层透明度 0-1
              title: 'title', // 读取内容元素属性,默认为title 附：original-title
              trigger: 'hover' // 事件模式 hover mouseenter focus
            })
          }, 500)
        } else {
          console.log(res.msg)
        }
      })
    },
    addCollection (a, id, t) {
      let self = this
      let params = new URLSearchParams()
      params.append('action', a)
      params.append('unqId', id)
      params.append('type', t)
      db.postRequest('Institution/Tools/collection', params).then(res => {
        if (res.status === 1) {
          if (t === 2) {
            for (let i = 0; i < self.MajorA.length; i++) {
              if (self.MajorA[i]['unq_id'] === id) {
                self.MajorA[i]['is_clt'] = self.MajorA[i]['is_clt'] === 1 ? 0 : 1
              }
            }
          }
          if (t === 3) {
            for (let i = 0; i < self.MajorB.length; i++) {
              if (self.MajorB[i]['unq_id'] === id) {
                self.MajorB[i]['is_clt'] = self.MajorB[i]['is_clt'] === 1 ? 0 : 1
              }
            }
          }
        } else {
          console.log(res.msg)
        }
      })
    },
    sortAction () {
      let self = this
      if (self.sortComm === '') {
        self.sortComm = 1
      } else if (self.sortComm === 1) {
        self.sortComm = 2
      } else if (self.sortComm === 2) {
        self.sortComm = 1
      }
      self.getMajorA()
    },
    sortAction2 () {
      let self = this
      if (self.sortComm2 === '') {
        self.sortComm2 = 1
      } else if (self.sortComm2 === 1) {
        self.sortComm2 = 2
      } else if (self.sortComm2 === 2) {
        self.sortComm2 = 1
      }
      self.getMajorB()
    },
    // 获取过往案例
    getCase (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('unq_id', self.id)
      params.append('page', p || 1)
      params.append('keywords', self.keywordsC)
      db.postRequest('Institution/Tools/applyExample', params).then(res => {
        if (res.status === 1) {
          self.caseList = res.data.list
          self.total = res.data.total
          self.current = p || 1
          setTimeout(function () {
            self.$redrawVueMasonry()
          }, 100)
        } else {
          console.log(res.msg)
        }
      })
    }
  },
  components: { SchoolHeader, PagInAction },
  watch: {
    $route (to, from) {
      if (from.name === 'scholldetail') {
        this.id = to.query.id
        this.tab = to.query.tab
        this.getSchoolInfo()
        $('html,body').animate({ scrollTop: 0 }, 500)
      }
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
