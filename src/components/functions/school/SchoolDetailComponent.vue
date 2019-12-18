<template>
    <div>
        <div class="schoolTitle">基本信息</div>
        <div class="row lh34">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" v-for="(item, i) in detailInfo.baseInfo" :key="i">
                {{item.name}}：{{item.val}}
            </div>
        </div>

        <div class="schoolTitle">城市信息</div>
        <div class="row lh34">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" v-for="(item, i) in detailInfo.cityInfo" :key="i">
                {{item.name}}：{{item.val}}
            </div>
        </div>
        <div class="schoolTitle">学校概述</div>
        <div class="clearfix lh20" v-html="detailInfo.intro"></div>
        <div class="schoolTitle" v-if="detailInfo.adms_office.length > 0">招生办信息</div>
        <div class="row" v-if="detailInfo.adms_office.length > 0">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pb-15" v-for="(item, i) in detailInfo.adms_office" :key="i">
                <p v-for="(items, k) in item" :key="k" v-html="items"></p>
            </div>
        </div>
        <div class="schoolTitle">类似的学校有</div>
        <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" v-for="(item, i) in detailInfo.rcmd_schools" :key="i">
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
</template>

<script>
export default {
  name: 'SchoolDetailComponent',
  props: {
    detailInfo: Object
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
