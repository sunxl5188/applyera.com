<template>
    <div>
        <InitApplyNav :state="state" step="step4" :id="id"/>
        <div class="clearfix">
            <img src="../../../../static/images/011.jpg" alt="">
            <span class="ml-10">请确认您填写的资料以及院校题目是否无误。若确认无误，请选择院校进行提交，申学纪将会把您的资料递交给申报院校。</span>
        </div>
        <div class="blk20"></div>
        <table class="table table-bordered table-customize" id="confirmTable">
            <thead>
            <tr>
                <th class="w50">申报院校</th>
                <th class="w50">申报专业</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in list" :key="i">
                <td>
                    {{item.school_name}}
                </td>
                <td>
                    {{item.major_name}}
                </td>
            </tr>
            <tr v-if="loading">
                <td colspan="2" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="!loading && list.length === 0">
                <td colspan="2" v-html="NoData"></td>
            </tr>
            </tbody>
        </table>
        <div class="clearfix text-center">
            <button type="button" class="btn btn-primary" @click="saveData" v-if="submitStatus===0">确认提交</button>
            <button type="button" class="btn disabled" v-if="submitStatus===1">已提交</button>
        </div>
    </div>
</template>

<script>
import InitApplyNav from '@#/functions/initApply/InitApplyNav'
import db from '@~/js/request'

export default {
  name: 'ConfirmSubmission',
  data () {
    return {
      id: '',
      loading: true,
      submitStatus: 0,
      list: [],
      state: [0, 0, 0, 0]
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.id = self.$route.query.id || ''
      if (self.id) {
        self.pageChange(self.id)
      }
    })
  },
  methods: {
    pageChange () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.postRequest('/Institution/Apply/confirmSubmit', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.submitStatus = res.data.submit_status
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    },
    // 提交确认学校
    saveData () {
      let self = this
      self.layer.confirm('提交后申请将无法更改，您是否确认提交？', {icon: 3}, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('id', self.id)
        db.postRequest('/Institution/Apply/confirmSubmitSave', params).then(res => {
          if (res.status === 1) {
            self.submitStatus = 1
            self.layer.alert(res.msg, {icon: 1})
          } else {
            self.layer.alert(res.msg, {icon: 2})
          }
        })
      })
    }
  },
  components: {
    InitApplyNav
  }
}
</script>

<style scoped>

</style>
