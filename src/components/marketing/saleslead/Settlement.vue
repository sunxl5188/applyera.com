<template>
    <div>
        <div class="po_re">
            <div class="col-sm-4 po_ab" style="right:-15px;top: -60px;">
                <div class="form-group form-search">
                    <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                    <i class="iconfont handPower clearSearch" autocomplete="off" v-if="keyword" @click="keyword='';pagechange(1)">&#xe7f6;</i>
                    <input type="text" name="keyword" class="form-control"
                           placeholder="搜索所有内容"
                           style="padding-left:30px;" v-model="keyword" @keyup.enter="pagechange(1)">
                </div>
            </div>
        </div>
        <table class="table bda filter">
            <tbody>
            <tr>
                <td width="10%" class="text-center"><b>结算时间</b></td>
                <td>
                    <a href="javascript:void(0);" class="label label-primary">不限</a>
                    <a href="javascript:void(0);" class="label">本月</a>
                    <a href="javascript:void(0);" class="label">本季度</a>
                    <span id="customTime" contenteditable="true" data-placeholder="自定义时间段"></span>
                </td>
            </tr>
            </tbody>
        </table>

        <table class="table table-customize">
            <thead>
            <tr>
                <th>触手姓名</th>
                <th>结算金额</th>
                <th>结算明细</th>
                <th>结算时间</th>
                <th>结算凭证</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <router-link to="/" class="cded">学生姓名</router-link>
                </td>
                <td>￥200</td>
                <td>---</td>
                <td>2019-01-06</td>
                <td>上传凭证</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  name: 'Settlement',
  data () {
    return {
      keyword: ''
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.laydate.render({
        elem: '#customTime',
        type: 'date',
        range: true,
        done: (value) => {

        }
      })
    })
  },
  methods: {
    pagechange (page) {

    }
  }
}
</script>

<style scoped lang="scss">
.filter{
    & tbody tr td{padding-top:15px;padding-bottom:15px;}
    & .label{
        margin-right:10px;color:#333;
        &.label-primary{color:#fff;}
    }
    & .active{background-color:#39f;color:#fff;line-height:22px;padding-left:.8rem;padding-right:.8rem;-webkit-border-radius:.25em;-moz-border-radius:.25em;border-radius:.25em;}
}
</style>
