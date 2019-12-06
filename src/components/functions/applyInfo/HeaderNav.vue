<template>
    <div>
        <div class="studentNav">
            <div class="text-justify">
                <!--无ID时-->
                <router-link to="/functions/applyInfo/detail" v-if="!id">个人信息
                    <i class="iconfont cf00" v-if="tabStatus[0]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="tabStatus[0]===1">&#xe719;</i>
                </router-link>
                <a href="javascript:void(0);" title="请保存个人信息后继续" data-toggle="tooltip" v-if="!id">家庭信息
                    <i class="iconfont cf00" v-if="tabStatus[1]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="tabStatus[1]===1">&#xe719;</i>
                </a>
                <a href="javascript:void(0);" title="请保存个人信息后继续" data-toggle="tooltip" v-if="!id">教育背景
                    <i class="iconfont cf00" v-if="tabStatus[2]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="tabStatus[2]===1">&#xe719;</i>
                </a>
                <a href="javascript:void(0);" title="请保存个人信息后继续" data-toggle="tooltip" v-if="!id">考试成绩
                    <i class="iconfont cf00" v-if="tabStatus[3]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="tabStatus[3]===1">&#xe719;</i>
                </a>
                <!--有ID时-->
                <router-link :to="{path:'/functions/applyInfo/detail',query:{id:id}}" v-if="id">个人信息
                    <i class="iconfont cf00" v-if="tabStatus[0]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="tabStatus[0]===1">&#xe719;</i>
                </router-link>
                <router-link :to="{path:'/functions/applyInfo/family',query:{id:id}}" v-if="id">家庭信息
                    <i class="iconfont cf00" v-if="tabStatus[1]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="tabStatus[1]===1">&#xe719;</i>
                </router-link>
                <router-link :to="{path:'/functions/applyInfo/education',query:{id:id}}" v-if="id">教育背景
                    <i class="iconfont cf00" v-if="tabStatus[2]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="tabStatus[2]===1">&#xe719;</i>
                </router-link>
                <router-link :to="{path:'/functions/applyInfo/exam',query:{id:id}}" v-if="id">考试成绩
                    <i class="iconfont cf00" v-if="tabStatus[3]===0">&#xe610;</i>
                    <i class="iconfont c52c" v-if="tabStatus[3]===1">&#xe719;</i>
                </router-link>
            </div>
        </div>
        <div class="blk30"></div>
    </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  data () {
    return {
    }
  },
  props: {
    id: '',
    tabStatus: {
      type: Array,
      default: () => [0, 0, 0, 0]
    }
  },
  mounted () {
    this.$nextTick(() => {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
}
</script>

<style scoped lang="scss">
    .studentNav {
        position:relative;width:100%;height:65px;
        &:after {
            content:'';width:100%;height:10px;display:block;background-color:#e6e6e6;left:0;bottom:0;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;position:absolute;
        }
        & .text-justify {
            text-align:justify; text-align-last:justify; line-height:0; height:55px;
            &:after {
                display:inline-block;overflow:hidden;width:100%;height:0;content:'';vertical-align:top;
            }
            & a {
                width:20%;display:inline-block; height:55px;line-height:40px;text-align:center;color:#666;font-size:18px;text-align-last:center;position:relative;padding-bottom:15px;
                &.active {
                    color:#428bca;
                    &:after {content:'';width:100%;height:10px;display:block;position:absolute;left:0;bottom:-10px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;background-color:#428bca;z-index:2;}
                    &:before {content:'';width:15px;height:15px;display:block;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;position:absolute;left:50%;bottom:-10px;margin-left:-5px;background-color:#428bca;z-index:3;border:2px solid #fff;}
                }
            }
        }
        @media all and (-webkit-min-device-pixel-ratio:0) {
            .text-justify {
                font-size:0;
            }
        }
    }
</style>
