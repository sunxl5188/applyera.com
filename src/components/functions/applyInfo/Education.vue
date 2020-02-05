<template>
    <div>
        <HeaderNav :id="id" :studentId="studentId" :educationType="educationType" :tabStatus="tabStatus"></HeaderNav>
        <div v-if="!loading">
            <comment :is="commentId" :id="id" :education="education"></comment>
        </div>
        <div v-if="loading" v-html="LoadingImg"></div>
    </div>
</template>

<script>
import HeaderNav from '@/components/functions/applyInfo/HeaderNav'
import MEducationComponent from '@/components/functions/applyInfo/MEducationComponent'
import UEducationComponent from '@/components/functions/applyInfo/UEducationComponent'
import '@~/js/VeeValidateConfig'
import db from '@~/js/request'
export default {
  name: 'Education',
  data () {
    return {
      id: '',
      loading: true,
      studentId: '',
      tabStatus: [0, 0, 0, 0],
      modify: 0, // 表单是否修改过 大于1是修改过
      commentId: '',
      educationType: 1,
      education: {
        highschool_name: '',
        highschool_enter_time: '',
        teacher_name: '',
        teacher_last_name: '',
        teacher_first_name: '',
        teacher_position: '',
        teacher_email: '',
        teacher_phone: '',
        is_highschool_boarding: 1,
        is_not_graduated: '',
        is_graduated_plan: '',
        get_degree_is: '',
        is_article: '',
        is_scholarship: '',
        is_drop: '',
        is_mistake: '',
        point: '',
        graduated_plan_reason: 1,
        gpa_import: 1,
        degree: '',
        course: [{
          name: '',
          plan: '',
          type: ''
        }],
        activity: [{
          grade: '',
          name: '',
          position: '',
          time: '',
          hour: '',
          week: '',
          join: 1,
          detail: ''
        }],
        is_other_school: false,
        other_school: [{degree: 1, name: '', time: '', reason: ''}],
        is_study_university: false,
        study_university: [{type: 1, schoolName: '', time: '', courseName: '', point: ''}],
        is_honor: false,
        honor: [{name: '', grade: '', honorLv: ''}],
        career_interest: '',
        career_planing: '',
        drop_reason: '',
        school_name: '',
        enter_time: '',
        rcmder: [{
          career: '',
          title: '',
          relation: '',
          phone: '',
          email: '',
          lv: '',
          prov: '',
          details: '',
          city: '',
          district: '',
          name: ''
        }]
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    let self = this
    if (self.modify > 1) {
      self.layer.confirm('您将离开当前页面，是否保存已填写的内容？', {icon: 3}, function (i) {
        self.layer.close(i)
        let formData = $('#EducationForm').serializeArray()
        let params = new URLSearchParams()
        for (let i = 0; i < formData.length; i++) {
          params.append(formData[i]['name'], formData[i]['value'])
        }
        db.postRequest('/Institution/ApplyMaterial/saveEducation', params).then(res => {
          if (res.status === 1) {
            next(true)
          } else {
            next(false)
            self.layer.alert(res.msg, {icon: 2})
          }
        })
      }, function () {
        next(true)
      })
      self.modify = 0
    } else {
      next(true)
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.$nextTick(() => {
      if (self.id) {
        let self = this
        let params = new URLSearchParams()
        params.append('id', self.id)
        db.getRequest('/Institution/ApplyMaterial/editEducation', params).then(res => {
          if (res.status === 1) {
            self.tabStatus = res.data.tab_status
            self.educationType = res.data.education_type
            self.studentId = res.data.student_id
            self.education = res.data
            if (res.data.education_type === 1) {
              self.commentId = UEducationComponent
            }
            if (res.data.education_type === 2) {
              self.commentId = MEducationComponent
            }
          } else {
            console.log(res.msg)
          }
          self.loading = false
        })
      }
    })
  },
  methods: {},
  components: {
    HeaderNav,
    MEducationComponent,
    UEducationComponent
  },
  watch: {
    education: {
      handler: function () {
        this.modify += 1
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
