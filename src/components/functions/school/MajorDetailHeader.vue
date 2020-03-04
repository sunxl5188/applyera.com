<template>
    <div>
        <div class="row">
            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <div class="textOver pt-10 pb-10">
                    <span class="cded font18">{{schoolInfo.major_cn}}</span>
                    <span class="c999 font16">/ {{schoolInfo.major_en}}</span>
                </div>
                <div class="row lh24 c999">
                     <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                         <span>所属院校：<router-link :to="{path:'/functions/schoollist/SchollDetail?id=US1&tab=1',query:{id:schoolInfo.school_unq_id,tab:1}}" class="cded">{{schoolInfo.schoolname}}</router-link></span>
                     </div>
                     <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                         <span class="textOver">所属学院：<span v-if="schoolInfo.college_cn!=='-'">{{schoolInfo.college_cn}} / {{schoolInfo.college_en}}</span></span>
                     </div>
                </div>
                <div class="row lh24 c999">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        毕业学位：{{schoolInfo.degree}}
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        专业网址：<a :href="schoolInfo.major_url" class="cded" target="_blank" v-if="schoolInfo.major_url!=='-'">点击查看</a>
                    </div>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right">
                <div class="clearfix text-right pb-15">
                    <a href="javascript:void(0);" v-if="schoolInfo.is_collect===0"
                       @click="collection(schoolInfo.major_unq_id, schoolInfo.type, 1)"><i class="iconfont">&#xe642;</i> <span class="div_vm">加入收藏</span>
                    </a>
                    <a href="javascript:void(0);" v-if="schoolInfo.is_collect===1"
                       @click="collection(schoolInfo.major_unq_id, schoolInfo.type, 2)"><i class="iconfont cf90">&#xe69a;</i> <span class="div_vm">移出收藏</span>
                    </a>
                    <a href="javascript:void(0);" class="ml-15" @click="$router.back()"><i class="iconfont">&#xe64f;</i> <span class="div_vm">返回</span></a>
                </div>
            </div>
        </div>
        <div class="clearfix pt-20">
            <div class="pull-left w10" v-for="(item, i) in schoolInfo.bottom" :key="i">
                <div class="lh22 cded font18">{{item.val}}</div>
                <div class="lh22">{{item.name}}</div>
            </div>
        </div>
        <div class="blk-25"></div>
    </div>
</template>

<script>
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'MajorDetailHeader',
  store,
  data () {
    return {}
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
    }
  },
  methods: {
    // 加入取消收藏
    collection (unqId, type, action) {
      let self = this
      let params = new URLSearchParams()
      params.append('unqId', unqId)
      params.append('type', type)
      params.append('action', action)
      db.postRequest('Institution/Tools/collection', params).then(res => {
        if (res.status === 1) {
          if (action === 1) {
            self.schoolInfo.is_collect = 1
          } else {
            self.schoolInfo.is_collect = 0
          }
        } else {
          self.layer.alert(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
