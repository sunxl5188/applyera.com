<template>
    <div>
        <div class="po_re schoolSearch">
            <input type="text" name="keywords" class="form-control" v-model="keywords" placeholder="请输入关键字查询"
                   autocomplete="off">
            <i class="iconfont handPower clearSearch" @click="keywords=''"
               v-if="keywords!==''">&#xe7f6;</i>
            <button type="button" class="btn btn-primary btn-search" @click="pagechange(1,3)"></button>
            <button type="button" class="btn btn-default btn-Collapse" @click="filterShow=!filterShow"
                    v-if="!filterShow">收起筛选<i class="iconfont">&#xe688;</i></button>
            <button type="button" class="btn btn-default btn-Collapse" @click="filterShow=!filterShow"
                    v-if="filterShow">展开筛选<i class="iconfont">&#xe630;</i></button>
        </div>
        <div class="clearfix lh30 pb-5 font12 cf00">*由于专业数据量较大，为了避免您等待时间过长，请务必通过下方查询条件搜索。</div>
        <div id="screenTable2" :class="{'hiddenS':filterShow}">
            <table class="table">
                <tbody>
                <tr>
                    <td class="text-right width100"><b>国家</b></td>
                    <td>
                        <a href="javascript:void(0);" v-for="(item,index) in country" :key="index" v-text="item"
                           class="mr-15" :class="{active:active1===item}"
                           @click="active1=item;pagechange(1)"></a>
                    </td>
                </tr>
                <tr>
                    <td class="text-right"><b>类型</b></td>
                    <td>
                        <a href="javascript:void(0);" class="mr-15" :class="{active:active2===1}" @click="active2=1;pagechange(1)">本科</a>
                        <a href="javascript:void(0);" class="mr-15" :class="{active:active2===2}" @click="active2=2;pagechange(1)">硕士</a>
                    </td>
                </tr>
                <tr>
                    <td class="text-right"><b>本国排名</b></td>
                    <td>
                        <a href="javascript:void(0);" v-for="(item,index) in ranking" :key="index" v-text="item.title"
                           :class="active3===item.value?'mr-15 active':'mr-15'"
                           @click="active3=item.value;pagechange(1)"></a>
                    </td>
                </tr>
                <tr>
                    <td class="text-right"><b>学科领域</b></td>
                    <td>
                        <a href="javascript:void(0);" v-for="(item, i) in tuition" :key="i" v-text="item"
                           :class="active4===item?'mr-15 active':'mr-15'" @click="active4=item;pagechange(1)"></a>
                    </td>
                </tr>
                <!--本科*******************-->
                <tr v-if="active2===1">
                    <td colspan="2" style="padding: 0;border-bottom: none;">
                        <table class="table">
                            <tr v-for="(item,key) in langA" :key="'u'+key">
                                <td class="text-right width100"><b>{{item.name}}</b></td>
                                <td>
                                    <a href="javascript:void(0);" v-for="(items, i) in item.list" :key="i"
                                       :class="other[key]===items.key?'active mr-15':' mr-15'"
                                       @click="other[key] = items.key;pagechange(1)">{{items.text}}</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!--硕士********************-->
                <tr v-if="active2===2">
                    <td colspan="2" style="padding: 0;border-bottom: none;">
                        <table class="table">
                            <tr v-for="(item,key) in langB" :key="'m'+key">
                                <td class="text-right width100"><b>{{item.name}}</b></td>
                                <td>
                                    <a href="javascript:void(0);" v-for="(items, i) in item.list" :key="i"
                                       :class="other[key]===items.key?'active mr-15':' mr-15'"
                                       @click="other[key] = items.key;pagechange(1)">{{items.text}}</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr v-if="active2===2 && active1==='英国'">
                    <td class="text-right"><b>GPA</b></td>
                    <td style="border-top: 1px dashed #dedede;">
                        <a href="javascript:void(0);" class="mr-15" :class="{active:schoolType==='不限'}" @click="schoolType='不限'
                        pagechange(1)">不限</a>
                        <a href="javascript:void(0);" class="mr-15" :class="{active:schoolType===1}" @click="schoolType=1
                        pagechange(1)">985</a>
                        <a href="javascript:void(0);" class="mr-15" :class="{active:schoolType===2}" @click="schoolType=2
                        pagechange(1)">211</a>
                        <a href="javascript:void(0);" class="mr-15" :class="{active:schoolType===3}" @click="schoolType=3
                        pagechange(1)">双非</a>
                    </td>
                </tr>
                <tr v-if="active2===2 && active1==='英国'">
                    <td>&nbsp;</td>
                    <td>
                        <a href="javascript:void(0);" v-for="(item,index) in gpaArr" :key="index" v-text="item.title"
                           class="mr-15" :class="{'active':gpa===item.value}"
                           @click="gpa=item.value;pagechange(1)"></a>
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
                        <span class="div_vm">本国排名</span>
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
                <transition-group
                        enter-active-class="animated zoomIn"
                        leave-active-class="animated zoomOut"
                        tag="tbody">
                    <tr v-for="(item, index) in list" :key="'major'+index">
                        <td>
                            <router-link :to="{path:'/functions/schoollist/majordetaila',query:{id:item.unq_id}}"
                                         v-if="item.type===2">
                                <div class="lh16">
                                    <div class="cded textOver">
                                        <span v-html="highlight(cutString(item.major_en,30), keywords)"
                                              data-toggle="tooltip" :title="item.major_en+'<br>'+item.major_cn"></span>
                                        <i class="iconfont cf00" v-if="item.is_hot">&#xe633;</i>
                                    </div>
                                </div>
                                <div class="lh16">
                                    <div class="textOver" v-html="highlight(cutString(item.major_cn,30), keywords)"
                                         data-toggle="tooltip" :title="item.major_en+'<br>'+item.major_cn"></div>
                                </div>
                            </router-link>
                            <router-link :to="{path:'/functions/schoollist/majordetailb',query:{id:item.unq_id}}"
                                         v-if="item.type===3">
                                <div class="lh16">
                                    <div class="cded textOver">
                                        <span v-html="highlight(cutString(item.major_en,30), keywords)"
                                              data-toggle="tooltip" :title="item.major_en+'<br>'+item.major_cn"></span>
                                        <i class="iconfont cf00" v-if="item.is_hot">&#xe633;</i>
                                    </div>
                                </div>
                                <div class="lh16">
                                    <div class="textOver">
                                        <span v-html="highlight(cutString(item.major_cn,30), keywords)"
                                              data-toggle="tooltip" :title="item.major_en+'<br>'+item.major_cn"></span>
                                    </div>
                                </div>
                            </router-link>
                        </td>
                        <td>
                            <router-link
                                    :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.school_unq_id,tab:1}}">
                                <div class="lh16">
                                    <span class="cded" v-html="highlight(cutString(item.englishname,28), keywords)"
                                          data-toggle="tooltip" :title="item.englishname+'<br>'+item.schoolname"></span>
                                </div>
                                <div class="lh16">
                                    <span class="c999" v-html="highlight(cutString(item.schoolname,28), keywords)"
                                          data-toggle="tooltip" :title="item.englishname+'<br>'+item.schoolname"></span>
                                </div>
                            </router-link>
                        </td>
                        <td v-text="item.ranking"></td>
                        <td v-text="item.commission_rate" v-if="userInfo.access.show_commission===1"></td>
                        <td>
                            <a href="javascript:void(0);" @click="collection(item.unq_id, item.type, $event)"
                               v-if="item.is_clt===0" class="btn btn-primary is-round btn-sm">加入收藏</a>
                            <a href="javascript:void(0);" class="btn btn-default is-round btn-sm"
                               @click="collection(item.unq_id, item.type, $event)" v-if="item.is_clt===1">移出收藏</a>
                        </td>
                    </tr>
                </transition-group>
                <tbody>
                <tr v-if="loading" key="majorA">
                    <td :colspan="userInfo.access.show_commission?5:4" class="text-center" v-html="LoadingImg"></td>
                </tr>
                <tr v-if="loading===false && list.length === 0" key="majorB">
                    <td :colspan="userInfo.access.show_commission?5:4" class="text-center" v-html="NoData"></td>
                </tr>
                </tbody>
            </table>
        </div>

        <pagination :total="total" :current-page='current' :display="display" @pagechange="pagechange"/>
    </div>
</template>

<script>
import langJson from '@@/json/langList'
import _ from 'lodash'
import pagination from '@#/shared/Pagination'
import { mapState } from 'vuex'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'MajorComponent',
  store,
  data () {
    return {
      loading: true,
      ActionT: '',
      filterShow: false,
      active1: '美国',
      active2: 1,
      active3: '不限',
      active4: '不限',
      country: ['美国', '英国', '澳大利亚', '加拿大'],
      ranking: [{ title: '不限', value: '不限' }, { title: '1-20', value: '1-20' }, { title: '21-40', value: '21-40' }, { title: '41-60', value: '41-60' }, { title: '61-80', value: '61-80' }, { title: '81-100', value: '81-100' }, { title: '101-150', value: '101-150' }, { title: '150以上', value: '150-9999' }],
      tuition: ['不限', '商科与管理', '会计金融与经济', '人文与社会科学', '自然与应用科学', '工程学', '建筑与艺术', '医学', '待定'],
      gpaArr: [
        { title: '不限', value: '不限' },
        { title: '74及以下(2.5以下)', value: '1-74' },
        { title: '75-79 (2.5-2.9)', value: '75-79' },
        { title: '80-84 (3.0-3.4)', value: '80-84' },
        { title: '85-89 (3.5-3.9)', value: '85-89' },
        { title: '90及以上 (4)', value: '90-9999' }
      ],
      total: 0,
      current: 1,
      display: 50,
      keywords: '',
      sortRank: '',
      sortComm: '',
      schoolType: '不限',
      gpa: '不限',
      list: [],
      langA: [],
      langB: [],
      other: { sat: '-', act: '-', ielts: '-', toefl: '-', alevel: '-', ib: '-', gre: '-', gmat: '-' },
      langJson: langJson
    }
  },
  computed: {
    ...mapState(['userInfo', 'token'])
  },
  created () {
    this.debouncedPagechange = _.debounce(this.pagechange, 1000)
  },
  beforeDestroy () {
    $('div[class^=\'tip\']').remove()
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.langA = self.langJson[0][1]
      self.langB = self.langJson[0][2]
      self.pagechange()
      setTimeout(() => {
        let $this = $('#screenTable2')
        $this.height($this.outerHeight(true))
      }, 2000)
      // 点击筛选择时触发
      $(document).on('click', '#screenTable2 a', function () {
        let $this = $('#screenTable2')
        setTimeout(() => {
          $this.removeAttr('style')
          $this.height($this.outerHeight(true))
        }, 300)
      })
    })
  },
  methods: {
    pagechange (p, custom) {
      let self = this
      let params = new URLSearchParams()
      if (self.ActionT) {
        clearInterval(self.ActionT)
      }
      if (p > 1) {
        self.current = p
      }
      if (custom === 3) {
        if (self.keywords === '') {
          self.layer.alert('请输入关键字查询!', { icon: 2 })
          return false
        }
      }
      self.current = p || 1
      params.append('page', p || 1)
      params.append('country', self.active1)
      params.append('degree', self.active2)
      params.append('ranking', self.active3)
      params.append('majorArea', self.active4)
      params.append('keywords', self.keywords)
      params.append('sortRank', self.sortRank)
      params.append('sortComm', self.sortComm)
      params.append('gpa', self.gpa)
      params.append('gpa_type', self.schoolType)
      for (let key in self.other) {
        params.append(key, self.other[key])
      }
      self.list = []
      self.loading = true
      db.postRequest('Institution/Tools/choseMajor', params).then(res => {
        if (res.status === 1) {
          self.total = res.data.total
          let len = res.data.list.length
          if (len > 0) {
            let count = 0
            self.ActionT = setInterval(function () {
              if (len === count) {
                clearInterval(self.ActionT)
                setTimeout(function () {
                  $('[data-toggle="tooltip"]').tooltip({ html: true })
                }, 500)
              } else {
                self.list.push(res.data.list[count])
                count = count + 1
              }
            }, 30)
          } else {
            self.list = []
          }
        } else {
          console.log(res.msg)
        }
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
      self.pagechange(self.current)
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
    // 筛选附加项
    setLangstate () {
      let self = this
      let i = ''
      switch (self.active1) {
        case '美国':
          i = 0
          break
        case '英国':
          i = 1
          break
        case '澳大利亚':
          i = 2
          break
        case '加拿大':
          i = 3
          break
      }
      if (self.degree === 1) {
        self.langA = self.langJson[i][self.active2]
      } else {
        self.langB = self.langJson[i][self.active2]
      }
    }
  },
  components: { pagination },
  watch: {
    keywords () {
      this.debouncedPagechange()
    },
    active1 () {
      this.setLangstate()
      this.other = {sat: '-', act: '-', ielts: '-', toefl: '-', alevel: '-', ib: '-', gre: '-', gmat: '-'}
    },
    degree () {
      this.setLangstate()
      this.other = {sat: '-', act: '-', ielts: '-', toefl: '-', alevel: '-', ib: '-', gre: '-', gmat: '-'}
    }
  }
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
                & .table {
                    margin:0;

                    & > tr {
                        border-bottom:none;

                        & > td {
                            padding:8px;

                            &:first-of-type {border-top:none;}

                            &:last-of-type {border-top:none;border-bottom:1px dashed #dedede;}
                        }

                        &:last-of-type {
                            & > td {border-bottom:none;}
                        }
                    }
                }
            }

            &:last-of-type {
                & > td {border-bottom:none;}
            }
        }
    }
    & .width100 {width:100px;}
}
</style>
