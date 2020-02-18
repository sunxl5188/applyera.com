<template>
    <div class="container-fluid bgWhite pt-25 pb-25">

        <div class="clearfix customizeNavTabs">
            <div class="pull-left">
                <router-link to="/archives/student_statistics/type_statistics">学生类型统计</router-link>
                <router-link to="/archives/student_statistics/record_report">跟进记录报表</router-link>
            </div>
            <div class="pull-right">
                <a href="javascript:void(0);" class="lh34">
                    <i class="iconfont">&#xe64e;</i>
                    刷新
                </a>
            </div>
        </div>

        <router-view></router-view>

    </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      loading: true,
      name: 'student_statistics'
    }
  }
}
</script>

<style scoped lang="less">
    .student_statistics{
        margin-bottom:15px;

        &:after{content:'';width:100%;height:0;display:block;clear:both;}

        & .student_statistics_left{
            float:left;width:10%;text-align:right;padding-right:10px;line-height:34px;
        }

        & .student_statistics_right{
            float:right;width:90%;padding:5px 0;

            & > a{
                display:inline-block;margin-right:10px;padding:0 8px;line-height:24px;

                &.active{
                    background-color:#39f;color:#fff;
                }
            }
        }
    }

    .customizeNavTabs{
        border-bottom:1px solid #dedede;

        & .pull-left{
            & > a{
                display:inline-block;line-height:34px;margin-right:30px;position:relative;

                &:before{content:'';width:100%;height:2px;position:absolute;left:0;bottom:-2px;}

                &.active{
                    &:before{background:#39f;}
                }
            }
        }
    }

</style>
