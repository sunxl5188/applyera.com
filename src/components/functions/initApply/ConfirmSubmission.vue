<template>
    <div>
        <InitApplyNav :state="state" step="step4" :id="id"/>
        <div class="clearfix">
            <img src="../../../../static/images/011.jpg" alt="">
            <span class="ml-10">请确认您填写的资料以及院校题目是否无误。若确认无误，请选择院校进行提交，申学纪将会把您的资料递交给申报院校。</span>
        </div>
        <div class="blk20"></div>
        <table class="table table-bordered table-customize">
            <thead>
            <tr>
                <th>选择</th>
                <th>申报院校</th>
                <th>申报截止日期</th>
                <th>状态及原因</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr v-if="loading">
                <td colspan="4" v-html="LoadingImg()"></td>
            </tr>
            <tr v-if="!loading && list.length === 0">
                <td colspan="4" v-html="NoData()"></td>
            </tr>
            </tbody>
        </table>
        <div class="clearfix">已选择 <font class="cf00">0</font> 气学校</div>
        <div class="clearfix text-center">
            <button type="button" class="btn btn-default">提交</button>
        </div>
    </div>
</template>

<script>
import InitApplyNav from '@#/functions/initApply/InitApplyNav'

export default {
  name: 'ConfirmSubmission',
  data () {
    return {
      id: '',
      loading: true,
      list: [],
      state: [0, 0, 0, 0]
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.id = self.$route.query.id || ''
    })
  },
  methods: {},
  components: {
    InitApplyNav
  }
}
</script>

<style scoped>

</style>
