<template>
    <div>
        <div v-if="!loading">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">申请资料</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                                返回
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <HeaderNav :id="id" :tabStatus="tabStatus"></HeaderNav>
            <comment :is="commentId" :education="education"></comment>
        </div>
        <div v-if="loading" v-html="LoadingImg()"></div>
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
      tabStatus: [0, 0, 0, 0],
      commentId: MEducationComponent,
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
          } else {
            console.log(res.msg)
          }
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
  watch: {}
}
</script>

<style scoped>

</style>
