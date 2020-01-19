<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">发起申请</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group">
                        <a href="javascript:void(0);" class="btn btn-default ml-10" v-if="source==='1'" @click="$router.back()">
                            <i class="iconfont">&#xe64f;</i>
                            返回
                        </a>
                        <router-link :to="{path:'/functions/initApply',query:{id:id}}" exact class="btn btn-default ml-10" v-if="source===''">
                            <i class="iconfont">&#xe64f;</i>
                            返回
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <ul class="nav nav-pills nav-justified nav-pills-custom">
            <li>
                <router-link to="/functions/initApply/ChooseSchool" v-if="!id">选择学校
                    <!--<i class="iconfont cf00" v-if="state[0]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="state[0]===1">&#xe719;</i>-->
                </router-link>
                <router-link :to="{path:'/functions/initApply/ChooseSchool',query:{id:id}}" v-if="id">选择学校
                    <!--<i class="iconfont cf00" v-if="state[0]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="state[0]===1">&#xe719;</i>-->
                </router-link>
            </li>
            <li>
                <a href="javascript:void(0);" data-toggle="tooltip" title="请先保存第一步选择学校后继续" v-if="id===''">上传资料
                    <!--<i class="iconfont cf00" v-if="state[1]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="state[1]===1">&#xe719;</i>-->
                </a>
                <router-link :to="{path:'/functions/initApply/UploadData',query:{id:id}}" v-if="id">上传资料
                    <!--<i class="iconfont cf00" v-if="state[1]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="state[1]===1">&#xe719;</i>-->
                </router-link>
            </li>
            <li>
                <a href="javascript:void(0);" data-toggle="tooltip" title="请先保存第一步选择学校后继续" v-if="id===''">题目作答
                    <!--<i class="iconfont cf00" v-if="state[1]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="state[1]===1">&#xe719;</i>-->
                </a>
                <router-link :to="{path:'/functions/initApply/QuestionAnswer',query:{id:id}}" v-if="id">题目作答
                    <!--<i class="iconfont cf00" v-if="state[2]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="state[2]===1">&#xe719;</i>-->
                </router-link>
            </li>
            <li>
                <a href="javascript:void(0);" data-toggle="tooltip" title="请先保存第一步选择学校后继续" v-if="id===''">确认提交
                    <!--<i class="iconfont cf00" v-if="state[1]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="state[1]===1">&#xe719;</i>-->
                </a>
                <router-link :to="{path:'/functions/initApply/ConfirmSubmission',query:{id:id}}" v-if="id">确认提交
                    <!--<i class="iconfont cf00" v-if="state[3]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="state[3]===1">&#xe719;</i>-->
                </router-link>
            </li>
        </ul>
        <div class="progress progress-4" :class="step">
            <div class="progress-bar" aria-valuemax="100" style="width:25%;"></div>
        </div>
        <div class="blk30"></div>
    </div>
</template>

<script>
export default {
  name: 'InitApplyNav',
  props: {
    id: '',
    step: {
      type: String,
      default: 'step1'
    },
    state: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      source: ''
    }
  },
  mounted () {
    this.source = this.$route.query.source || ''
    this.$nextTick(() => {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
}
</script>

<style scoped lang="scss">
.progress{
    &.step1{
        & .progress-bar{margin-left:0;}
    }
    &.step2{
        & .progress-bar{margin-left:25%;}
    }
    &.step3{
        & .progress-bar{margin-left:50%;}
    }
    &.step4{
        & .progress-bar{margin-left:75%;}
    }
}
</style>
