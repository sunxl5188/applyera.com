<template>
    <div>
        <InitApplyNav :state="state" step="step3" :id="id"/>
        <div class="clearfix">
            <img src="../../../../static/images/011.jpg" alt="">
            <span class="ml-10">请您确认院校要求的文书材料已完成并已提交，申请提交后文书将不可修改</span>
        </div>
        <div class="blk20"></div>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th class="w20">申请专业</th>
                <th>所需材料</th>
                <th>关联材料</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td rowspan="2" style="border-right:1px solid #ddd;">
                    <div>Accounting/会计学</div>
                    <div>麻省理工/MIT</div>
                </td>
                <td>推荐信 3封</td>
                <td>
                    <select name="name" class="form-control selectpicker show-tick" multiple data-live-search="true" data-size="15">
                        <option value="1">段老师</option>
                        <option value="2">高老师</option>
                        <option value="3">赵老师</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>院校题目作答</td>
                <td>
                    YXTM201933345
                    <router-link to="" class="cded">前往创建</router-link>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="blk20"></div>
        <div class="clearfix text-center">
            <button type="button" class="btn btn-primary">下一页</button>
            <button type="button" class="btn btn-outline-primary ml-20">保存</button>
        </div>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import InitApplyNav from '@#/functions/initApply/InitApplyNav'

export default {
  name: 'QuestionAnswer',
  data () {
    return {
      id: '',
      state: [0, 0, 0, 0]
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.id = self.$route.query.id || ''
      self.$nextTick(() => {
        $('.selectpicker').selectpicker()
      })
    })
  },
  methods: {},
  components: { InitApplyNav },
  watch: {}
}
</script>

<style scoped>

</style>
