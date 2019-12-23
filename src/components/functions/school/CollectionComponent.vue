<template>
  <div>
    <div class="btn-group" role="group" id="majortab">
      <a href="#majortab1" data-toggle="tab" class="btn btn-default btn-primary">收藏学校</a>
      <a href="#majortab2" data-toggle="tab" class="btn btn-default">本科专业</a>
      <a href="#majortab3" data-toggle="tab" class="btn btn-default">硕士专业</a>
    </div>
    <div class="blk15"></div>
    <div class="tab-content">
      <div class="tab-pane fade in active" id="majortab1">
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
            <tr v-for="(item, i) in school" :key="i">
              <td>
                <div class="media">
                  <div class="media-left">
                    <router-link :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.unq_id, tab:1}}">
                      <img class="media-object" :src="'//'+item.schoolbadge" alt="" width="40"
                           height="40">
                    </router-link>
                  </div>
                  <div class="media-body" style="margin-bottom: 0;">
                    <div class="lh20">
                      <router-link
                          :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.unq_id, tab:1}}"
                          class="cded">
                        {{item.englishname}}
                      </router-link>
                    </div>
                    <div class="lh20 c999">{{item.schoolname}}</div>
                  </div>
                </div>
              </td>
              <td v-text="item.chinesestate"></td>
              <td v-text="item.ranking"></td>
              <td v-text="item.commission_rate" v-if="userInfo.access.show_commission===1"></td>
              <td>
                <a href="javascript:void(0);" class="btn btn-default btn-sm is-round"
                   @click="clearCollection(item.unq_id, 1)">移出收藏</a>
              </td>
            </tr>
            <tr v-if="loading">
              <td :colspan="userInfo.access.show_commission===1?5:4" class="text-center" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="loading===false && school.length === 0">
              <td :colspan="userInfo.access.show_commission===1?5:4" class="text-center" v-html="NoData"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tab-pane fade" id="majortab2">
        <div class="row">
          <table class="table table-text-over table-customize">
            <thead>
            <tr>
              <th>专业名称</th>
              <th class="w25">学校名称</th>
              <th class="w10">
                <span class="div_vm">排名</span>
                <a href="javascript:void(0);"
                   :class="sortRank1===''?'icon-sort': (sortRank1===1?'icon-sort up':'icon-sort down')"
                   @click="sortAction(3)"></a>
              </th>
              <th class="w15" v-if="userInfo.access.show_commission===1">
                <span class="div_vm">佣金比例</span>
                <a href="javascript:void(0);"
                   :class="sortComm1===''?'icon-sort': (sortComm1===1?'icon-sort up':'icon-sort down')"
                   @click="sortAction(4)"></a>
              </th>
              <th class="w15">收藏</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in profession" :key="i">
              <td>
                <router-link :to="{path:'/functions/schoollist/majordetaila',query:{id:item.unq_id}}">
                  <div class="lh16">
                    <div class="cded textOver">{{item.majoren}}</div>
                  </div>
                  <div class="lh16">
                    <div class="textOver">{{item.majorch}}</div>
                  </div>
                </router-link>
              </td>
              <td>
                <router-link :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.school_unq_id,tab:1}}">
                  <div class="lh16">
                    <div class="cded textOver">{{item.englishname}}</div>
                  </div>
                  <div class="lh16">
                    <div class="c999 textOver">{{item.schoolname}}</div>
                  </div>
                </router-link>
              </td>
              <td v-text="item.ranking"></td>
              <td v-text="item.commission_rate" v-if="userInfo.access.show_commission===1"></td>
              <td>
                <a href="javascript:void(0);" class="btn btn-default btn-sm is-round"
                   @click="clearCollection(item.unq_id, 2)">移出收藏</a>
              </td>
            </tr>
            <tr v-if="loading">
              <td :colspan="userInfo.access.show_commission===1?5:4" class="text-center" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="loading===false && profession.length === 0">
              <td :colspan="userInfo.access.show_commission===1?5:4" class="text-center" v-html="NoData"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tab-pane fade" id="majortab3">
        <div class="row">
          <table class="table table-text-over table-customize">
            <thead>
            <tr>
              <th>专业名称</th>
              <th class="w25">学校名称</th>
              <th class="w10">
                <span class="div_vm">排名</span>
                <a href="javascript:void(0);"
                   :class="sortRank2===''?'icon-sort': (sortRank2===1?'icon-sort up':'icon-sort down')"
                   @click="sortAction(5)"></a>
              </th>
              <th class="w15" v-if="userInfo.access.show_commission===1">
                <span class="div_vm">佣金比例</span>
                <a href="javascript:void(0);"
                   :class="sortComm2===''?'icon-sort': (sortComm2===1?'icon-sort up':'icon-sort down')"
                   @click="sortAction(6)"></a>
              </th>
              <th class="w15">收藏</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in major" :key="i">
              <td>
                <router-link :to="{path:'/functions/schoollist/majordetailb',query:{id:item.unq_id}}">
                  <div class="lh16">
                    <div class="cded textOver">{{item.major_en}}</div>
                  </div>
                  <div class="lh16">
                    <div class="textOver">{{item.major_cn}}</div>
                  </div>
                </router-link>
              </td>
              <td>
                <router-link :to="{path:'/functions/schoollist/SchollDetail',query:{id:item.school_unq_id,tab:1}}">
                  <div class="lh16">
                    <div class="cded textOver">{{item.englishname}}</div>
                  </div>
                  <div class="lh16">
                    <div class="c999 textOver">{{item.schoolname}}</div>
                  </div>
                </router-link>
              </td>
              <td v-text="item.ranking"></td>
              <td v-text="item.commission_rate" v-if="userInfo.access.show_commission===1"></td>
              <td>
                <a href="javascript:void(0);" class="btn btn-default btn-sm is-round"
                   @click="clearCollection(item.unq_id, 3)">移出收藏</a>
              </td>
            </tr>
            <tr v-if="loading">
              <td :colspan="userInfo.access.show_commission===1?5:4" class="text-center" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="loading===false && major.length === 0">
              <td :colspan="userInfo.access.show_commission===1?5:4" class="text-center" v-html="NoData"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@#/shared/Pagination'
import { mapState } from 'vuex'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'CollectionComponent',
  store,
  data () {
    return {
      loading: true,
      school: [],
      profession: [],
      major: [],
      sortRank: '',
      sortComm: '',
      sortRank1: '',
      sortComm1: '',
      sortRank2: '',
      sortComm2: ''
    }
  },
  computed: {
    ...mapState(['userInfo', 'token'])
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      $(document).on('click', '#majortab a', function () {
        $(this).siblings('a').removeClass('btn-primary').end().addClass('btn-primary')
      })
      self.getCollection()
    })
  },
  methods: {
    // 获取收藏信息
    getCollection () {
      let self = this
      let params = new URLSearchParams()
      params.append('sortRank', self.sortRank)
      params.append('sortComm', self.sortComm)
      params.append('sortRank1', self.sortRank1)
      params.append('sortComm1', self.sortComm1)
      params.append('sortRank2', self.sortRank2)
      params.append('sortComm2', self.sortComm2)
      self.school = []
      self.profession = []
      self.major = []
      self.loading = true
      db.getRequest('Institution/Tools/myCollection', params).then(res => {
        if (res.status === 1) {
          self.school = res.data.school
          self.profession = res.data.profession
          self.major = res.data.major
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    },
    // 取消收藏
    clearCollection (id, type) {
      let self = this
      let params = new URLSearchParams()
      params.append('action', 2)
      params.append('unqId', id)
      params.append('type', type)
      db.postRequest('Institution/Tools/collection', params).then(res => {
        if (res.status === 1) {
          if (type === 1) {
            let Arr = []
            for (let i = 0; i < self.school.length; i++) {
              if (self.school[i]['unq_id'] !== id) {
                Arr.push(self.school[i])
              }
            }
            self.school = Arr
          }
          if (type === 2) {
            let Arr1 = []
            for (let i = 0; i < self.profession.length; i++) {
              if (self.profession[i]['unq_id'] !== id) {
                Arr1.push(self.profession[i])
              }
            }
            self.profession = Arr1
          }
          if (type === 3) {
            let Arr2 = []
            for (let i = 0; i < self.major.length; i++) {
              if (self.major[i]['unq_id'] !== id) {
                Arr2.push(self.major[i])
              }
            }
            self.major = Arr2
          }
        } else {
          console.log(res.msg)
        }
      })
    },
    // 排序
    sortAction (type) {
      let self = this
      if (type === 1) {
        self.sortRank = self.sortRank === 1 ? 2 : 1
        self.sortComm = ''
      }
      if (type === 2) {
        self.sortComm = self.sortComm === 1 ? 2 : 1
        self.sortRank = ''
      }
      if (type === 3) {
        self.sortRank1 = self.sortRank1 === 1 ? 2 : 1
        self.sortComm1 = ''
      }
      if (type === 4) {
        self.sortComm1 = self.sortComm1 === 1 ? 2 : 1
        self.sortRank1 = ''
      }
      if (type === 5) {
        self.sortRank2 = self.sortRank2 === 1 ? 2 : 1
        self.sortComm2 = ''
      }
      if (type === 6) {
        self.sortComm2 = self.sortComm2 === 1 ? 2 : 1
        self.sortRank2 = ''
      }
      self.getCollection()
    }
  },
  components: { pagination },
  watch: {}
}
</script>

<style scoped lang="scss">
#majortab {
  & > a {
    border-color:#dedede;

    &:first-of-type {
      border-bottom-left-radius:20px;border-top-left-radius:20px;padding-left:20px;
    }

    &:last-of-type {
      border-top-right-radius:20px;border-bottom-right-radius:20px;padding-right:20px;
    }

    &.btn-primary {
      border-color:#428bca;
    }
  }
}
</style>
