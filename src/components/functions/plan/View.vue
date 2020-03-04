<template>
    <div id="editplanShow" class="bgGray">
        <div class="editplanWrap">
            <div class="pad30" v-if="loading" v-html="LoadingImg"></div>
            <div v-if="!loading">
                <div class="header-wrap bgGray">
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="header-title"><span>留学规划</span></div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center lh36 c999">
                            <div v-if="studentInfo.ins_student_name && studentInfo.ins_student_apply_degree && studentInfo.ins_student_intention_major">
                                {{studentInfo.ins_student_name}}
                                {{"-"+studentInfo.ins_student_apply_degree}}
                                {{"-"+studentInfo.ins_student_intention_major}}
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-right">
                            <router-link :to="{path:'/functions/plan/edit',query:{id:id}}" exact
                                         class="btn btn-default ml-10">
                                <i class="iconfont">&#xe60f;</i>
                                <span>编辑</span>
                            </router-link>
                            <a :href="siteUrl+'/Institution/ToPdf/execute?id='+id+'&token='+token" target="_blank"
                               class="btn btn-default ml-10">
                                <i class="iconfont">&#xe637;</i>下载
                            </a>
                            <a href="javascript:void(0);" exact class="btn btn-default ml-10" @click="$router.back()">
                                <i class="iconfont">&#xe64f;</i>
                                <span>返回</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div style="height:50px;"></div>
                <div class="pad-30 bgWhite" id="pdfContent">
                    <!--page1-->
                    <div class="row pb-25 pl-10 pr-10">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <img :src="insInfo.logo"
                                 style="max-height:80px;max-width:200px;display: block;">
                        </div>
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <div class="row lh40">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="pull-left w30">机构名称</div>
                                    <div class="pull-left w70">
                                        <span v-text="insInfo.institutionName"></span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="pull-left w30">联系电话</div>
                                    <div class="pull-left w70">
                                        <span v-text="insInfo.institutionPhone"></span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="pull-left w30">负责顾问</div>
                                    <div class="pull-left w70">
                                        <span v-text="insInfo.userName"></span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="pull-left w30">顾问微信</div>
                                    <div class="pull-left w70">
                                        <span v-text="insInfo.wechat"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--page2-->
                    <div class="pl-10 pr-10">
                        <div class="font18 lh50">基本信息</div>
                        <div class="row lh40">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>学生姓名</span></div>
                                <div class="pull-left w70">
                                    <span v-text="studentInfo.ins_student_name"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>联系电话</span></div>
                                <div class="pull-left w70">
                                    <span v-text="studentInfo.ins_student_phone"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>在读学校</span></div>
                                <div class="pull-left w70">
                                    <div v-text="studentInfo.ins_student_school"></div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>在读年级</span></div>
                                <div class="pull-left w70">
                                    <span v-text="studentInfo.ins_student_grade"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>当前专业</span></div>
                                <div class="pull-left w70">
                                    <span v-text="studentInfo.ins_student_major"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>出国时间</span></div>
                                <div class="pull-left w70">
                                    <span v-text="studentInfo.ins_student_go_abroad_time"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>GPA</span></div>
                                <div class="pull-left w70">
                                    <span v-text="studentInfo.ins_student_gpa"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>语言成绩</span></div>
                                <div class="pull-left w70">
                                    {{studentInfo.language_score_type}}{{studentInfo.language_score}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>学术成绩</span></div>
                                <div class="pull-left w70">
                                    {{studentInfo.academic_score_type}}{{studentInfo.academic_score}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>申请学位</span></div>
                                <div class="pull-left w70">
                                    {{studentInfo.ins_student_apply_degree}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>意向国家</span></div>
                                <div class="pull-left w70">
                                    {{country}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>意向专业</span></div>
                                <div class="pull-left w70">
                                    <span v-text="studentInfo.ins_student_intention_major"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--page3-->
                    <div class="pl-10 pr-10">
                        <div class="font18 lh50">推荐院校</div>
                        <div class="table-responsive" v-if="schoolInfoTable.length > 0">
                            <table class="table table-hover table-bordered table-condensed text-center">
                                <thead>
                                <tr>
                                    <th class="text-center w5"></th>
                                    <th class="text-center w10">国家</th>
                                    <th class="text-center w25">学校名称</th>
                                    <th class="text-center w25">专业名称</th>
                                    <th class="text-center">截止时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, i) in schoolInfoTable" :key="'a'+i">
                                    <td>{{item.ranking}}</td>
                                    <td>{{item.country}}</td>
                                    <td>
                                        <div class="lh18">{{item.school_en}}</div>
                                        <div class="lh18">{{item.school}}</div>
                                    </td>
                                    <td>
                                        <div class="lh18">{{item.major_en}}</div>
                                        <div class="lh18">{{item.major}}</div>
                                    </td>
                                    <td>
                                        {{item.time_select}}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!--page4-->

                    <div class="font18 lh50">院校及专业详情</div>

                    <div class="schoolMajor" v-for="(item, i) in schoolInfo" :key="'b'+i">

                        <div v-text="item.schoolname"></div>
                        <div class="SchoolTitle"><span>基本信息</span></div>
                        <div class="row lh40">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">成立年份</div>
                                <div class="pull-left w65">
                                    <span v-text="item.year"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">学校形式</div>
                                <div class="pull-left w65">
                                    <span v-text="item.typech"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">学制</div>
                                <div class="pull-left w65">
                                    <span v-text="item.systemch"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">录取率</div>
                                <div class="pull-left w65">
                                    <span v-text="item.acceptancerate"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">师生比</div>
                                <div class="pull-left w65">
                                    <span v-text="item.tsscale"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">学生人数</div>
                                <div class="pull-left w65">
                                    <span v-text="item.stdnum"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">国际生比率</div>
                                <div class="pull-left w65">
                                    <span v-text="item.stdscale"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">毕业率</div>
                                <div class="pull-left w65">
                                    <span v-text="item.graduationrate"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">就业率</div>
                                <div class="pull-left w65">
                                    <span v-text="item.empolymentrate"></span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <span>学校概述</span>
                                <div v-text="item.introduction"
                                     class="lh20"></div>
                            </div>
                        </div>
                        <div class="SchoolTitle">
                            <span v-text="item.majoren" class="font16"></span>
                            <div v-text="item.majorch"
                                 style="display:inline-block;font-size:16px;margin-left: 5px;"></div>
                        </div>
                        <div class="row lh40">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">所属学院</div>
                                <div class="pull-left w90">
                                    <span v-text="item.college_en"></span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">毕业学位</div>
                                <div class="pull-left w90">
                                    <span v-text="item.degree"></span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">申请要求</div>
                                <div class="pull-left w90">
                                    <span v-text="item.applyReq"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="blk-20"></div>

                    <!--自定义-->
                    <div class="schoolMajorCustom" v-for="(item, i) in customObject" :key="'c'+i">
                        <div v-text="item.school_cn"></div>
                        <div class="SchoolTitle"><span>基本信息</span></div>
                        <div class="row lh40">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">学校概述</div>
                                <div class="pull-left w90">
                                    <div v-text="item.school_content"
                                         class="lh20"></div>
                                </div>
                            </div>
                        </div>
                        <div class="SchoolTitle">
                            <span v-text="item.major_cn" class="font16"></span>
                            <div v-text="item.major_en"
                                 style="display:inline-block;font-size:16px;margin-left: 5px;"></div>
                        </div>
                        <div class="row lh40">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">专业概述</div>
                                <div class="pull-left w90">
                                    <span v-text="item.major_content"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row lh40">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">申请要求</div>
                                <div class="pull-left w90">
                                    <span v-text="item.apply_req"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row lh40" v-for="(items, i) in item.custom" :key="'d'+i">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">
                                    <span v-text="items.field_name"></span>
                                </div>
                                <div class="pull-left w90">
                                    <span v-text="items.field_value"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--page5-->

                    <div class="font18 lh50 pl-10 pr-10">能力考评</div>

                    <div class="elementWrap" v-for="(item, i) in Evaluation" :key="'e'+i" style="padding:0 10px;">
                        <div class="row lh40">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <span v-text="item.assessTitle"></span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                            <span v-text="item.assessContent"
                                  class="lh20"></span>
                            </div>
                        </div>
                    </div>

                    <!--page6-->
                    <div class="font18 lh50 pl-10 pr-10">时间规划</div>
                    <div class="elementWrap" v-for="(item,i) in planTime" :key="'f'+i" style="padding:0 10px;">
                        <div class="row lh40">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <span v-text="item.time"></span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <span v-text="item.planContent"></span>
                            </div>
                        </div>
                    </div>

                    <!--page7-->

                    <div class="font18 lh50 pl-10 pr-10">费用预算</div>

                    <div class="elementWrap" v-for="(item,i) in budget" :key="'g'+i" style="padding:0 10px;">
                        <div class="row lh40">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <span v-text="item.item"></span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <span v-text="item.price"></span>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="modal fade" id="modal_loading">
                    <div class="modal-dialog">
                        <div class="modal-content text-center" style="width:260px;margin:0 auto;">
                            <div class="modal-body">
                                <img src="../../../../static/images/loading.gif" alt="">
                                <span>请稍后，正在处理下载文件</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import nation from '@@/json/nation.json'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'PlanView',
  store,
  data () {
    return {
      nation: nation,
      id: '',
      loading: true,
      siteUrl: window.ajaxBaseUrl,
      country: '',
      insInfo: {
        logo: '',
        ins_company_id: '',
        ins_user_id: '',
        institutionName: '',
        institutionPhone: '',
        userName: '',
        wechat: ''
      },
      studentInfo: {
        ins_student_id: '',
        ins_student_name: '',
        ins_student_phone: '',
        ins_student_school: '',
        ins_student_grade: '',
        ins_student_major: '',
        ins_student_go_abroad_time: '',
        ins_student_gpa: '',
        language_score: '',
        academic_score: '',
        ins_student_intention_major: '',
        language_score_type: '',
        academic_score_type: '',
        ins_student_apply_degree: '',
        ins_student_intention_country: []
      },
      schoolInfoTable: [], // 推荐学校
      schoolInfo: [], // 学校及专业
      Evaluation: [], // 能力考评
      planTime: [], // 时间规划
      budget: [], // 费用预算
      customField: [],
      customObject: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id

    self.$nextTick(() => {
      self.getInfo()

      setTimeout(function () {
        $('.fullRightContent').scroll(function () {
          $('.header-wrap').css({top: $(this).scrollTop()})
        })
      }, 3000)
    })
  },
  methods: {
    // 编辑时获取信息
    getInfo () {
      let self = this
      let countryArr = []
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.getRequest('Institution/Plan/planDetail', params).then(res => {
        if (res.status === 1) {
          self.insInfo = res.data.company
          self.studentInfo = res.data.student
          self.schoolInfoTable = res.data.recommend_table
          self.schoolInfo = res.data.recommend
          self.Evaluation = res.data.Evaluation
          self.planTime = res.data.PlanTime
          self.budget = res.data.budget
          self.customObject = res.data.recommend_custom
          res.data.student.ins_student_intention_country.map(item => {
            self.nation.map(items => {
              if (items.id === parseInt(item)) {
                countryArr.push(items.cn)
              }
            })
          })
          self.country = countryArr.join(',')
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
        self.loading = false
      })
    },
    // 下载pdf
    downFile () {
      let self = this
      let countryArr = []
      self.studentInfo.ins_student_intention_country.map(item => {
        self.nation.map(items => {
          if (items.id === parseInt(item)) {
            countryArr.push(items.cn)
          }
        })
      })

      $('#modal_loading').modal({
        backdrop: 'static',
        show: true
      })

      setTimeout(function () {
        self.downLoadPdf(self.studentInfo.ins_student_name + '-' + countryArr.join(',') + '-规划书', '#pdfContent')
        $('#modal_loading').modal('hide')
      }, 500)
    }
  }
}
</script>
<style lang="less">
    #editplanShow{
        position:relative;margin:-25px -15px;

        & .editplanWrap{
            width:820px;margin:0 auto;background:#fff;
        }

        .header-wrap{
            width:100%;height:50px;position:absolute;z-index:10;padding-bottom:10px;left:0;top:0;

            & .header-title{
                height:22px;line-height:22px;position:absolute;padding-left:15px;font-size:18px;font-weight:bold;margin:9px 0;

                &:after{
                    content:'';width:3px;height:22px;display:block;position:absolute;left:0;top:0;background:#428bca;
                }
            }
        }

        & .SchoolTitle{
            line-height:50px;clear:both;padding:15px 0;

            & span{
                font-size:16px;line-height:20px;display:inline-block;position:relative;padding-left:15px;

                &:before{content:'';width:3px;height:20px;display:block;background:#428bca;position:absolute;left:0;top:0;}
            }
        }

        .schoolMajor, .schoolMajorCustom, .elementWrap{
            border-width:1px;border-style:dashed;border-color:#fff;padding:15px 10px;position:relative;

            & > a{
                width:30px;height:30px;display:none;position:absolute;top:4px;background:#428bca;text-align:center;line-height:30px;color:#fff;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;cursor:pointer;z-index:20;

                &.btn-delete{right:4px;}
            }

            & .w10{width:12%;}

            & .w90{width:88%;}
        }
    }
</style>
