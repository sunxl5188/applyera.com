<template>
    <div class="schoolHeader">
        <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div class="media">
                    <span class="media-left media-middle" style="padding-right:20px;">
                        <img :src="schoolInfo.schoolbadge" style="width:80px; height:80px;">
                    </span>
                    <div class="media-body">
                        <h4 class="media-heading" v-text="schoolInfo.schoolname"></h4>
                        <div class="lh22 pb-15" v-text="schoolInfo.englishname"></div>
                        <div class="lh24"><i class="iconfont font20 c666">&#xe6ac;</i> {{schoolInfo.address}}</div>
                        <div class="lh24"><i class="iconfont font20 c666">&#xe626;</i> {{schoolInfo.website}}</div>
                    </div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="clearfix text-right pb-15">
                    <a href="javascript:void(0);" v-if="schoolInfo.is_clt===0"
                            @click="collection(schoolInfo.unq_id,schoolInfo.type,$event)"><i class="iconfont">&#xe642;</i> <span class="div_vm">加入收藏</span>
                    </a>
                    <a href="javascript:void(0);" v-if="schoolInfo.is_clt===1"
                            @click="collection(schoolInfo.unq_id,schoolInfo.type,$event)"><i class="iconfont cf90">&#xe69a;</i> <span class="div_vm">取消收藏</span>
                    </a>
                    <a href="javascript:void(0);" class="ml-15" @click="$router.back()"><i class="iconfont">&#xe64f;</i> <span class="div_vm">返回</span></a>
                </div>
                <div class="clearfix text-center">
                    <div class="row" v-if="userInfo.access.show_commission===1">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="lh36 cded font20">{{schoolInfo.ranking['content']}}</div>
                            <div class="lh20">{{schoolInfo.ranking.name}}</div>
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                            <div class="lh36 cded font20">{{schoolInfo.qs_ranking["val"]}}</div>
                            <div class="lh20">{{schoolInfo.qs_ranking["name"]}}</div>
                        </div>
                        <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                            <div class="lh36 cded font20">
                                {{schoolInfo.commission==="-"?"暂无":schoolInfo.commission}}
                            </div>
                            <div class="lh20">预计返佣</div>
                        </div>
                    </div>
                    <div class="row" v-if="userInfo.access.show_commission!==1">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="lh36 cded font20">{{schoolInfo.ranking['content']}}</div>
                            <div class="lh20">{{schoolInfo.ranking.name}}</div>
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                            <div class="lh36 cded font20">{{schoolInfo.qs_ranking["val"]}}</div>
                            <div class="lh20">{{schoolInfo.qs_ranking["name"]}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'SchoolHeader',
  store,
  data () {
    return {
      loading: true
    }
  },
  props: {
    schoolInfo: {
      type: Object,
      default: () => {}
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
  mounted () {},
  methods: {
    // 加入取消收藏
    collection (unqId, type, event) {
      let self = this
      let params = new URLSearchParams()
      params.append('unqId', unqId)
      params.append('type', type)
      if (event.currentTarget.classList.value.indexOf('btn-primary') >= 0) {
        params.append('action', 1)
      } else {
        params.append('action', 2)
      }
      db.postRequest('Institution/Tools/collection', params).then(res => {
        if (res.status === 1) {
          for (let key in self.schoolInfo) {
            if (key === 'is_clt') {
              self.schoolInfo[key] = self.schoolInfo[key] === 0 ? 1 : 0
            }
          }
        } else {
          self.layer.alert(res.msg)
        }
      })
    }
  },
  components: {},
  watch: {}
}
</script>

<style scoped lang="less">
    .schoolHeader {}
</style>
