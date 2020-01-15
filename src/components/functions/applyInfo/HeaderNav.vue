<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">申请资料</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group ml-10" v-if="id">
                        <button type="button" class="btn btn-default" @click="sendStudent()"><i class="iconfont">&#xe601;</i>
                            发送给学生填写
                        </button>
                    </div>
                    <div class="form-group ml-10">
                        <router-link to="/functions/applyInfo" exact class="btn btn-default"><i class="iconfont">&#xe64f;</i>
                            返回</router-link>
                    </div>
                </div>
            </div>
        </div>
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
        <!-- 发送信息给学生start-->
        <ShareIt :info="sendStudentString" v-if="id"></ShareIt>
        <!-- 发送信息给学生end-->
    </div>
</template>

<script>
import ShareIt from '@#/functions/applyInfo/ShareIt'
import db from '@~/js/request'
export default {
  name: 'HeaderNav',
  data () {
    return {
      sendStudentString: {}
    }
  },
  props: {
    id: '',
    studentId: '',
    educationType: '',
    tabStatus: {
      type: Array,
      default: () => [0, 0, 0, 0]
    }
  },
  mounted () {
    this.$nextTick(() => {
      $('[data-toggle="tooltip"]').tooltip()
    })
  },
  methods: {
  // 发送给学生填写
    sendStudent () {
      let self = this
      if (self.studentId === '') {
        self.layer.alert('请选关联学生', {
          icon: 2
        })
      } else {
        let params = new URLSearchParams()
        params.append('id', self.studentId)
        params.append('education_type', self.educationType)
        db.postRequest('/Institution/ApplyMaterial/sendStudent', params).then(res => {
          if (res.status === 1) {
            self.sendStudentString = res.data
            $('#sendInfo').modal({
              backdrop: 'static',
              show: true
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      }
    }
  },
  components: {
    ShareIt
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
