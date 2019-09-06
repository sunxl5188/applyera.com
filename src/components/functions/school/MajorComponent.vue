<template>
    <div>
        <div v-if="loading" v-html="LoadingImg()"></div>
        <div v-if="!loading">
            <div class="po_re schoolSearch">
                <input type="text" name="keywords" class="form-control" v-model="keywords" placeholder="请输入关键字查询"
                       autocomplete="off" @keyup.enter="pagechange(1,3)">
                <i class="iconfont handPower clearSearch" @click="keywords='';pagechange(1)"
                   v-if="keywords!==''">&#xe7f6;</i>
                <button type="button" class="btn btn-primary btn-search" @click="pagechange(1,3)"></button>
                <button type="button" class="btn btn-default btn-Collapse" @click="retract()">收起筛选<i
                        class="iconfont">&#xe688;</i>
                </button>
            </div>
            <div class="clearfix lh30 pb-5 font12 cf00">*由于专业数据量较大，为了避免您等待时间过长，请务必通过下方查询条件搜索。</div>
            <div id="screenTable2">
                <table class="table">
                    <tbody>
                    <tr>
                        <td width="12%" class="text-center"><b>国家</b></td>
                        <td>
                            <a href="javascript:void(0);" v-for="(item,index) in country" :key="index" v-text="item"
                               :class="active1===item?'mr-15 active':'mr-15'"
                               @click="active1=item;other={sat: '-', act: '-', ielts: '-', toefl: '-', alevel: '-', ib: '-', gre: '-', gmat: '-'};pagechange(1)"></a>
                        </td>
                    </tr>
                    <tr>
                        <td width="8%" class="text-center"><b>类型</b></td>
                        <td>
                            <a href="javascript:void(0);" v-for="(item,i) in subject" :key="i" v-text="item"
                               :class="active2===i?'mr-15 active':'mr-15'" @click="active2=i;pagechange(1)"></a>
                        </td>
                    </tr>
                    <tr>
                        <td width="8%" class="text-center"><b>院校排名</b></td>
                        <td>
                            <a href="javascript:void(0);" v-for="(item,index) in ranking" :key="index" v-text="item.title"
                               :class="active3===item.value?'mr-15 active':'mr-15'"
                               @click="active3=item.value;pagechange(1)"></a>
                        </td>
                    </tr>
                    <tr>
                        <td width="8%" class="text-center"><b>学科领域</b></td>
                        <td>
                            <a href="javascript:void(0);" v-for="(item, i) in tuition" :key="i" v-text="item"
                               :class="active4===item?'mr-15 active':'mr-15'" @click="active4=item;pagechange(1)"></a>
                        </td>
                    </tr>
                    <!--本科*******************-->
                    <tr v-for="(item,key) in langA" :key="key">
                        <td class="text-center"><b>{{item.name}}</b></td>
                        <td>
                            <a href="javascript:void(0);" v-for="(items, i) in item.list" :key="i"
                               :class="other[key]===items.key?'active mr-15':' mr-15'"
                               @click="other[key] = items.key;pagechange(1)">{{items.text}}</a>
                        </td>
                    </tr>
                    <!--硕士********************-->
                    <tr v-for="(item,key) in langB" :key="key">
                        <td class="text-center"><b>{{item.name}}</b></td>
                        <td>
                            <a href="javascript:void(0);" v-for="(items, i) in item.list" :key="i"
                               :class="other[key]===items.key?'active mr-15':' mr-15'"
                               @click="other[key] = items.key;pagechange(1)">{{items.text}}</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="row">
                <table class="table table-text-over table-customize" id="majorList">
                    <thead>
                    <tr>
                        <th>专业名称</th>
                        <th class="w25">学校名称</th>
                        <th class="w10">
                            <span class="div_vm">排名</span>
                            <a href="javascript:void(0);"
                               :class="sortRank===''?'icon-sort': (sortRank===1?'icon-sort up':'icon-sort down')"
                               @click="sortAction(1)"></a>
                        </th>
                        <th class="w15" v-if="userInfo.access.show_commission===1">
                            <span class="div_vm">佣金范围</span>
                            <a href="javascript:void(0);"
                               :class="sortComm===''?'icon-sort': (sortComm===1?'icon-sort up':'icon-sort down')"
                               @click="sortAction(2)"></a>
                        </th>
                        <th class="w15">收藏</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in list" :key="index">
                        <td class="poshyTop" :title="item.major_en+'<br>'+item.major_cn">
                            <router-link :to="{path:'/functions/schoollist/majordetaila',query:{id:item.unq_id}}"
                                         v-if="item.type===2">
                                <div class="lh16">
                                    <div class="cded textOver"><span v-html="highlight(item.major_en, keywords)"></span><i class="iconfont cf00" v-if="item.is_hot">&#xe633;</i></div>
                                </div>
                                <div class="lh16">
                                    <div class="textOver" v-html="highlight(item.major_cn, keywords)"></div>
                                </div>
                            </router-link>
                            <router-link :to="{path:'/functions/schoollist/majordetailb',query:{id:item.unq_id}}"
                                         v-if="item.type===3">
                                <div class="lh16">
                                    <div class="cded textOver"><span v-html="highlight(item.major_en, keywords)"></span><i class="iconfont cf00" v-if="item.is_hot">&#xe633;</i></div>
                                </div>
                                <div class="lh16">
                                    <div class="textOver" v-html="highlight(item.major_cn, keywords)"></div>
                                </div>
                            </router-link>
                        </td>
                        <td class="poshyTop" :title="item.englishname+'<br>'+item.schoolname">
                            <router-link
                                    :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.school_unq_id,tab:1}}">
                                <div class="lh16">
                                    <div class="cded textOver" v-html="highlight(item.englishname, keywords)"></div>
                                </div>
                                <div class="lh16">
                                    <div class="c999 textOver" v-html="highlight(item.schoolname, keywords)"></div>
                                </div>
                            </router-link>
                        </td>
                        <td v-text="item.ranking"></td>
                        <td v-text="item.commission" v-if="userInfo.access.show_commission===1"></td>
                        <td>
                            <a href="javascript:void(0);" @click="collection(item.unq_id, item.type, $event)"
                               v-if="item.is_clt===0" class="btn btn-primary is-round btn-sm">加入收藏</a>
                            <a href="javascript:void(0);" class="btn btn-default is-round btn-sm"
                               @click="collection(item.unq_id, item.type, $event)" v-if="item.is_clt===1">移出收藏</a>
                        </td>
                    </tr>
                    <tr v-if="loading===false && list.length === 0">
                        <td :colspan="userInfo.access.show_commission?5:4" class="text-center" v-html="NoData()"></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <PagInAction :total="total" :current-page='current' :display="display" @pagechange="pagechange"/>
        </div>
    </div>
</template>

<script>
import PagInAction from '@/components/PagInAction'
import { mapState } from 'vuex'
import store from '@/vuex/Store'
import db from '@~/js/request'
require('@@/js/tipsy/jquery.tipsy')

export default {
  name: 'MajorComponent',
  store,
  data () {
    return {
      loading: true,
      active1: '美国',
      active2: 0,
      active3: '不限',
      active4: '不限',
      country: ['美国', '英国', '澳大利亚', '加拿大'],
      subject: ['本科', '硕士'],
      ranking: [{title: '不限', value: '不限'}, {title: '1-20', value: '1-20'}, {title: '21-40', value: '21-40'}, {title: '41-60', value: '41-60'}, {title: '61-80', value: '61-80'}, {title: '81-100', value: '81-100'}, {title: '101-150', value: '101-150'}, {title: '150以上', value: '150-9999'}],
      tuition: ['不限', '商科与管理', '会计金融与经济', '人文与社会科学', '自然与应用科学', '工程学', '建筑与艺术', '医学', '待定'],
      total: 0,
      current: 1,
      display: 50,
      keywords: '',
      sortRank: '',
      sortComm: '',
      list: [],
      langA: [],
      langB: [],
      other: {sat: '-', act: '-', ielts: '-', toefl: '-', alevel: '-', ib: '-', gre: '-', gmat: '-'}
    }
  },
  computed: {
    ...mapState(['userInfo', 'token'])
  },
  beforeDestroy () {
    $("div[class^='tip']").remove()
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      setTimeout(function () {
        self.pagechange()
      }, 500)
    })
  },
  methods: {
    pagechange (p, custom) {
      let self = this
      let params = new URLSearchParams()
      $('#screenTable2').removeAttr('style')
      if (p > 1) {
        self.current = p
      }
      if (custom === 3) {
        if (self.keywords === '') {
          self.layer.alert('请输入关键字查询!', {
            shadeClose: false
          })
          return false
        }
      }
      self.current = p || 1
      params.append('page', p || 1)
      params.append('country', self.active1)
      params.append('degree', self.active2 + 1)
      params.append('ranking', self.active3)
      params.append('majorArea', self.active4)
      params.append('keywords', self.keywords)
      params.append('sortRank', self.sortRank)
      params.append('sortComm', self.sortComm)
      for (let key in self.other) {
        params.append(key, self.other[key])
      }
      self.list = []
      self.loading = true
      db.postRequest('Institution/Tools/choseMajor', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
          self.langA = res.data.lang.u
          self.langB = res.data.lang.m
        } else {
          console.log(res.msg)
        }
        setTimeout(function () {
          $('.poshyTop').tipsy({
            gravity: 's', // 显示方向s:上,n:下,w:右,e:左
            html: true, // 是否html
            opacity: 1, // 层透明度 0-1
            title: 'title', // 读取内容元素属性,默认为title 附：original-title
            trigger: 'hover' // 事件模式 hover mouseenter focus
          })
        }, 1000)
        self.loading = false
      })
    },
    // 排序
    sortAction (type) {
      let self = this
      if (type === 1) {
        self.sortRank = self.sortRank === 1 ? 2 : 1
      } else {
        self.sortComm = self.sortComm === 1 ? 2 : 1
      }
      self.pagechange()
    },
    // 收藏
    collection (id, type, event) {
      let self = this
      let params = new URLSearchParams()
      params.append('unqId', id)
      params.append('type', type)
      if (event.currentTarget.classList.value.indexOf('btn-primary') < 0) {
        params.append('action', 2)
      } else {
        params.append('action', 1)
      }
      db.postRequest('Institution/Tools/collection', params).then(res => {
        if (res.status === 1) {
          for (let i = 0; i < self.list.length; i++) {
            if (self.list[i]['unq_id'] === id) {
              self.list[i].is_clt = self.list[i].is_clt === 0 ? 1 : 0
            }
          }
        }
      })
    },
    // 展开收起筛选
    retract () {
      let $this = $('#screenTable2')
      if ($this.attr('style') === undefined) {
        $this.height($this.outerHeight())
      }
      if ($this.height() > 0) {
        $this.addClass('hiddenS')
        $('.btn-Collapse').html('展开筛选<i class="iconfont">&#xe630;</i>')
      } else {
        $this.removeClass('hiddenS')
        $('.btn-Collapse').html('收起筛选<i class="iconfont">&#xe688;</i>')
      }
    }
  },
  components: {PagInAction},
  watch: {}
}
</script>

<style scoped lang="scss">
    #screenTable2 {
        border:1px solid #dedede;padding-right:25px;
        & table {
            margin:15px 0;
            & > tbody > tr {
                border-bottom:none;
                & > td {
                    &:first-of-type {border-top:none;}
                    &:last-of-type {border-top:none;border-bottom:1px dashed #dedede;}
                }
                &:last-of-type {
                    & > td {border-bottom:none;}
                }
            }
        }
    }
</style>
