<template>
    <div>
        <div class="po_re schoolSearch">
            <input type="text" name="keywords" class="form-control" v-model="keywords" placeholder="请输入关键字查询"
                   autocomplete="off" @keyup.enter="pagechange(1,3)">
            <i class="iconfont handPower clearSearch" @click="keywords='';pagechange(1)"
               v-if="keywords!==''">&#xe7f6;</i>
            <button type="button" class="btn btn-primary btn-search" @click="pagechange(1,3)"></button>
            <button type="button" class="btn btn-default btn-Collapse" @click="filterShow=!filterShow" v-if="!filterShow">收起筛选<i class="iconfont">&#xe688;</i></button>
            <button type="button" class="btn btn-default btn-Collapse" @click="filterShow=!filterShow" v-if="filterShow">展开筛选<i class="iconfont">&#xe630;</i></button>
        </div>
        <div id="screenTable" :class="{'hiddenS':filterShow}" :style="'height:'+filterHeight+'px'">
            <table class="table">
                <tbody>
                <tr>
                    <td width="10%" class="text-center"><b>选择国家</b></td>
                    <td>
                        <a href="javascript:void(0);" v-for="(item,index) in country" :key="index" v-text="item"
                           :class="active1===item?'mr-15 active':'mr-15'"
                           @click="active1=item;other={sat: '-', act: '-', ielts: '-', toefl: '-', alevel: '-', ib: '-', gre: '-', gmat: '-'};pagechange(1)"></a>
                    </td>
                </tr>
                <tr>
                    <td class="text-center"><b>项目类型</b></td>
                    <td>
                        <a href="javascript:void(0);" :class="degree===1?'active':''"
                           @click="degree=1;pagechange(1)">本科</a>
                        <a href="javascript:void(0);" :class="degree===2?'active ml-15':' ml-15'"
                           @click="degree=2;pagechange(1)">硕士</a>
                    </td>
                </tr>
                <tr>
                    <td class="text-center"><b>学科领域</b></td>
                    <td>
                        <a href="javascript:void(0);" v-for="(item,index) in subject" :key="index" v-text="item"
                           :class="active2===item?'mr-15 active':'mr-15'" @click="active2=item;pagechange(1)"></a>
                    </td>
                </tr>
                <tr>
                    <td class="text-center"><b class="lh26">国内排名</b></td>
                    <td>
                        <a href="javascript:void(0);" v-for="(item,index) in ranking" :key="index" v-text="item.title"
                           :class="active3===item.value?'lh26 mr-15 active':'lh26 mr-15'"
                           @click="active3=item.value;pagechange(1)"></a>
                        <div class="pull-right text-right form-inline custom" style="width:340px;">
                            <span>自定义：</span>
                            <span><input type="text" name="rankingA" class="form-control"
                                         style="width:70px;"
                                         autocomplete="off" v-model="rankingA"></span>
                            <span>-</span>
                            <span><input type="text" name="rankingB" class="form-control"
                                         style="width:70px;"
                                         autocomplete="off" v-model="rankingB"></span>
                            <span><button type="button" class="btn btn-primary ml-10"
                                          @click="pagechange(1,1)">确定</button></span>
                        </div>
                    </td>
                </tr>
                <tr v-if="degree===2 && active1==='英国'">
                    <td class="text-center"><b>GPA</b></td>
                    <td>
                        <a href="javascript:void(0);" v-for="(item,index) in gpaArr" :key="index" v-text="item.title"
                           :class="gpa===item.value?'mr-15 active':'mr-15'"
                           @click="gpa=item.value;pagechange(1)"></a>
                        <select name="schoolType" v-model.number="schoolType" class="form-control" @change="pagechange(1, '')">
                            <option value="1">非985</option>
                            <option value="2">985</option>
                        </select>
                    </td>
                </tr>
                <tr v-if="degree===1">
                    <td class="text-center"><b>每年学费</b></td>
                    <td>
                        <a href="javascript:void(0);" v-for="(item,index) in tuition" :key="index" v-text="item.title"
                           :class="active4===item.value?'mr-15 active':'mr-15'"
                           @click="active4=item.value;pagechange(1)"></a>
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
            <table class="table table-text-over table-customize">
                <thead>
                <tr>
                    <th>学校名称</th>
                    <th class="w20">所在地区</th>
                    <th class="w10">
                        <span class="div_vm">排名</span>
                        <a href="javascript:void(0);"
                           :class="sortRank===''?'icon-sort': (sortRank===1?'icon-sort up':'icon-sort down')"
                           @click="sortAction(1)"></a>
                    </th>
                    <th class="w15" v-if="userInfo.access.show_commission===1">
                        <span class="div_vm">佣金比例</span>
                        <a href="javascript:void(0);"
                           :class="sortComm===''?'icon-sort': (sortComm===1?'icon-sort up':'icon-sort down')"
                           @click="sortAction(2)"></a>
                    </th>
                    <th class="w15">收藏</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td>
                        <div class="media">
                            <div class="media-left">
                                <router-link
                                        :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.unq_id, tab:1}}">
                                    <img class="media-object" :src="'//'+item.schoolbadge" alt="" width="40"
                                         height="40">
                                </router-link>
                            </div>
                            <div class="media-body" style="margin-bottom: 0;">
                                <div class="lh20">
                                    <router-link
                                            :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.unq_id, tab:1}}"
                                            class="cded">
                                        <span v-html="highlight(cutString(item.englishname, 30), keywords)" data-toggle="tooltip" :title="item.englishname+'<br>'+item.schoolname"></span>
                                    </router-link>
                                </div>
                                <div class="lh20 c999">
                                    <span v-html="highlight(cutString(item.schoolname, 30), keywords)" data-toggle="tooltip" :title="item.englishname+'<br>'+item.schoolname"></span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td v-text="item.chinesestate"></td>
                    <td v-text="item.ranking"></td>
                    <td v-text="item.commission_rate" v-if="userInfo.access.show_commission===1"></td>
                    <td>
                        <a href="javascript:void(0);" @click="collection(item.unq_id, 1, $event)"
                           v-if="item.is_clt===0" class="btn btn-primary btn-sm is-round">加入收藏</a>
                        <a href="javascript:void(0);" @click="collection(item.unq_id, 1, $event)"
                           v-if="item.is_clt===1" class="btn btn-default btn-sm is-round">移出收藏</a>
                    </td>
                </tr>
                <tr v-if="loading">
                    <td :colspan="userInfo.access.show_commission===1?5:4"
                        v-html="LoadingImg()"></td>
                </tr>
                <tr v-if="!loading && list.length === 0">
                    <td :colspan="userInfo.access.show_commission===1?5:4"
                        v-html="NoData()"></td>
                </tr>
                </tbody>
            </table>
        </div>
        <PagInAction :total="total" :current-page='current' :display="display" @pagechange="pagechange"/>
    </div>
</template>

<script>
import PagInAction from '@/components/PagInAction'
import { mapState } from 'vuex'
import store from '@/vuex/Store'
import db from '@~/js/request'
require('@@/js/tipsy/jquery.tipsy')

export default {
  name: 'SchoolListComponent',
  store,
  data () {
    return {
      loading: true,
      filterShow: false,
      filterHeight: '',
      active1: '美国',
      active2: '不限',
      active3: '不限',
      active4: '不限',
      gpa: '不限',
      schoolType: 1,
      country: ['美国', '英国', '澳大利亚', '加拿大'],
      subject: ['不限', '商科与管理', '会计金融与经济', '人文与社会科学', '自然与应用科学', '工程学', '建筑与艺术', '医学', '待定'],
      gpaArr: [{title: '不限', value: '不限'}, {title: '74及以下(2.5以下)', value: '1-74'}, {title: '75-79 (2.5-2.9)', value: '75-79'}, {title: '80-84 (3.0-3.4)', value: '80-84'}, {title: '85-89 (3.5-3.9)', value: '85-89'}, {title: '90及以上 (4)', value: '90-9999'}],
      ranking: [{title: '不限', value: '不限'}, {title: '1-20', value: '1-20'}, {title: '21-40', value: '21-40'}, {title: '41-60', value: '41-60'}, {title: '61-80', value: '61-80'}, {title: '81-100', value: '81-100'}, {title: '101-150', value: '101-150'}, {title: '150以上', value: '150-9999'}],
      tuition: [{title: '不限', value: '不限'}, {title: '15万以下', value: '1-15'}, {title: '15-20万', value: '15-20'}, {title: '20-25万', value: '20-25'}, {title: '25-30万', value: '25-30'}, {title: '30-35万', value: '30-35'}, {title: '35万以上', value: '35-9999'}],
      degree: 1,
      total: 0,
      current: 1,
      display: 50,
      keywords: '',
      rankingA: '',
      rankingB: '',
      moneyA: '',
      moneyB: '',
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
      setTimeout(() => {
        self.filterHeight = $('#screenTable').outerHeight()
      }, 2000)
    })
  },
  methods: {
    pagechange (p, custom) {
      let self = this
      let params = new URLSearchParams()
      $('#screenTable').removeAttr('style')
      if (p > 1) {
        self.current = p
      } else {
        self.current = 1
      }
      if (custom === 1) {
        if (!/^[1-9]|[1-9][0-9]/.test(self.rankingA) || !/^[1-9]|[1-9][0-9]/.test(self.rankingB)) {
          self.layer.alert('自定义排名信息不正确!', {
            shadeClose: false
          })
          return false
        } else {
          self.active3 = self.rankingA + '-' + self.rankingB
        }
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
      params.append('degree', self.degree)
      params.append('country', self.active1)
      params.append('majorArea', self.active2)
      params.append('ranking', self.active3)
      params.append('tuition', self.active4)
      params.append('keywords', self.keywords)
      params.append('sortRank', self.sortRank)
      params.append('sortComm', self.sortComm)
      params.append('gpa', self.gpa)
      params.append('school_type', self.schoolType)
      for (let key in self.other) {
        params.append(key, self.other[key])
      }
      self.list = []
      self.loading = true
      db.postRequest('Institution/Tools/choseSchool', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
          self.langA = res.data.lang.u
          self.langB = res.data.lang.m
        } else {
          console.log(res.msg)
        }
        setTimeout(function () {
          $('[data-toggle="tooltip"]').tooltip({
            html: true
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
        self.sortComm = ''
      } else {
        self.sortComm = self.sortComm === 1 ? 2 : 1
        self.sortRank = ''
      }
      self.pagechange()
    },
    // 收藏
    collection (id, type, event) {
      let self = this
      let params = new URLSearchParams()
      params.append('unqId', id)
      params.append('type', type)
      if (event.currentTarget.classList.value === 'active') {
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
    }
  },
  components: {PagInAction}
}
</script>

<style scoped lang="scss">
    #screenTable {
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
            & .custom {
                & input {height:26px;}
                & button { height:26px;padding:0 10px;font-size:12px;}
            }
            & select {
                display:inline-block;width:auto;padding:0;border:none;height:20px;text-align-last:left;margin-left:-8px;
            }
        }
    }
</style>
