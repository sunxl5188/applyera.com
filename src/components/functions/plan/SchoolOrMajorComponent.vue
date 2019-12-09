<template>
    <div>
        <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-backdrop="static"
                data-target="#schoolMajor" v-show="!btnHide">
            <i class="iconfont font22">&#xe73e;</i>
            <span class="div_vm">添加学校及专业</span>
        </button>

        <div class="modal fade bs-example-modal-lg" id="schoolMajor">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-body">
                        <ul class="nav nav-tabs"><!--nav-justified-->
                            <li role="presentation" class="active"><a href="#schoolMajor1" data-toggle="tab">快速选择</a>
                            </li>
                            <li role="presentation"><a href="#schoolMajor2" data-toggle="tab">本次已选</a></li>
                        </ul>
                        <div class="tab-content pt-20">
                            <div class="tab-pane fade in active" id="schoolMajor1">
                                <div class="row">
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                        <div class="pl-15 pr-15">
                                            <div class="form-horizontal">
                                                <div class="form-group form-search">
                                                    <i class="iconfont" @click="getSchool(1)">&#xe618;</i>
                                                    <i class="iconfont handPower clearSearch"
                                                       @click="keywords='';getSchool()" v-if="keywords!==''"
                                                       style="right:35px;width:20px;">&#xe7f6;</i>
                                                    <input type="text" class="form-control" name="keywords"
                                                           v-model="keywords" placeholder="请输入学校名称"
                                                           @keyup.enter="getSchool(1)">
                                                </div>

                                                <div class="form-group">
                                                    <label>国家</label>
                                                    <select name="country" class="form-control selectpicker"
                                                            v-model="country">
                                                        <option value="美国" selected>美国</option>
                                                        <option value="英国">英国</option>
                                                        <option value="澳大利亚">澳大利亚</option>
                                                        <option value="加拿大">加拿大</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label>排名</label>
                                                    <select name="ranking" class="form-control selectpicker"
                                                            v-model="ranking">
                                                        <option value="不限" selected>不限</option>
                                                        <option value="1-20">1-20</option>
                                                        <option value="21-40">21-40</option>
                                                        <option value="41-60">41-60</option>
                                                        <option value="61-80">61-80</option>
                                                        <option value="81-100">81-100</option>
                                                        <option value="101-150">101-150</option>
                                                        <option value="150-9999">150以上</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>专业类型</label>
                                                    <select name="majorArea" class="form-control selectpicker"
                                                            v-model="majorArea">
                                                        <option value="不限" selected>不限</option>
                                                        <option value="商科与管理">商科与管理</option>
                                                        <option value="会计金融与经济">会计金融与经济</option>
                                                        <option value="人文与社会科学">人文与社会科学</option>
                                                        <option value="自然与应用科学">自然与应用科学</option>
                                                        <option value="工程学">工程学</option>
                                                        <option value="建筑与艺术">建筑与艺术</option>
                                                        <option value="医学">医学</option>
                                                        <option value="待定">待定</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>学费</label>
                                                    <select name="tuition" class="form-control selectpicker"
                                                            v-model="tuition">
                                                        <option value="不限" selected>不限</option>
                                                        <option value="0-15">15万以下</option>
                                                        <option value="15-20">15-20万</option>
                                                        <option value="20-25">20-25万</option>
                                                        <option value="25-30">25-30万</option>
                                                        <option value="30-35">30-35万</option>
                                                        <option value="35-9999">35万以上</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <div class="text-center">
                                                        <button type="button" class="btn btn-primary"
                                                                @click="getSchool()">搜索
                                                        </button>
                                                        <button type="reset" class="btn btn-default ml-15"
                                                                @click="clearData">条件重置
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                        <div class="list-group schoolList bda noData" v-if="isSchoolList">
                                            <span class="c999 font16">没有找到符合<br>条件的学校哦！</span>
                                        </div>
                                        <ul class="list-group schoolList bda" v-if="!isSchoolList">
                                            <li v-for="(item, i) in schoolList" :key="i" @click="unqId = item.unq_id;getMajorList()"
                                                class="list-group-item textOver" :title="item.schoolname">
                                                {{item.schoolname}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="list-group-box bda fillet-8">
                                            <div class="list-group pl-15 pr-15">
                                                <div class="clearfix form-search bdb  pl-15 pr-15"
                                                     style="margin:0 -15px;">
                                                    <input type="text" name="name" class="form-control input-lg"
                                                           style="border:none;" placeholder="请输入专业名称"
                                                           autocomplete="off" v-model="KEYWORDS"
                                                           @keyup.enter="getMajorList()">
                                                    <i class="iconfont handPower clearSearch"
                                                       @click="KEYWORDS='';getMajorList()" v-if="KEYWORDS!==''"
                                                       style="right:35px;top:6px;width:20px;">&#xe7f6;</i>
                                                    <i class="iconfont" @click="getMajorList()"
                                                       style="top: 7px;">&#xe618;</i>
                                                </div>
                                                <div class="clearfix lh50 bdb  pl-15 pr-15" style="margin:0 -15px;">
                                                    <span class="pull-left font16">专业数据较多请选择展示:</span>
                                                    <span class="pull-right font16" v-if="unqId">
                                                        <span class="cded" v-if="applyType===1">本科</span>
                                                        <span class="cded" v-if="applyType===2">硕士</span>
                                                    </span>
                                                </div>

                                                <div class="row bdb" v-for="(item, i) in majorArr" :key="i">
                                                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                                        <div class="checkbox" :data-id="item.unq_id">
                                                            <label>
                                                                <input type="checkbox" name="unq_id"
                                                                       @click="setSelectId($event,item)"/>
                                                                <div class="font12">{{item.majoren}}</div>
                                                                <div>{{item.majorch}}</div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center lh40">
                                                        <i class="iconfont cded handPower"
                                                           @click="modalMajor(item.unq_id)">&#xe631;</i>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="schoolMajor2">
                                <div class="list-group pl-15 pr-15 bda fillet-8">
                                    <div class="row bdb" v-for="(item, i) in ActiveArr" :key="i">
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" checked @click="ActiveArr.splice(i, 1)">
                                                    <div class="font12">{{item.majoren}}</div>
                                                    <div>{{item.majorch}}</div>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 lh40">
                                            {{item.collagech}}
                                        </div>
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center lh40">
                                            <i class="iconfont cded handPower" data-toggle="modal"
                                               data-backdrop="static"
                                               data-target="#majorDate">&#xe631;</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="javascript:void(0);" class="cded" @click="customData">找不到合适的？点击添加自定义</a>
                        <button type="button" class="btn btn-default ml-15" data-dismiss="modal"
                                @click="ActiveArr=[];unqId=''">取消
                        </button>
                        <button type="button" class="btn btn-primary ml-15" :disabled="ActiveArr.length===0?true:false"
                                @click="parentData">
                            确定(已选:{{ActiveArr.length}})
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div>

        <div class="modal fade" id="majorDate">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content" v-if="Object.keys(majorDateInfo).length>0">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <dl>
                            <dt>{{majorDateInfo.schoolname_en}}</dt>
                            <dd>学校排名：{{majorDateInfo.ranking}}</dd>
                            <dd>学校地址：{{majorDateInfo.position}}</dd>
                            <dt class="cded">{{majorDateInfo.majoren}}</dt>
                            <dd v-if="applyType===2">学位名称：{{majorDateInfo.degree_name}}</dd>
                            <dd>所属学院：{{majorDateInfo.collagech}}</dd>
                            <dd>
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        预计佣金：{{majorDateInfo.commission}}
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        申请费用：{{majorDateInfo.apply_fee}}
                                    </div>
                                </div>
                            </dd>
                            <dd>
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        托福成绩：{{majorDateInfo.toefl}}
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        雅思成绩：{{majorDateInfo.ielts}}
                                    </div>
                                </div>
                            </dd>
                            <dd v-if="applyType===1">
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        STA成绩：{{majorDateInfo.sat}}
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        ACT成绩：{{majorDateInfo.act}}
                                    </div>
                                </div>
                            </dd>
                            <dd v-if="applyType===2">
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        GRE：{{majorDateInfo.gre}}
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        GMAT：{{majorDateInfo.gmat}}
                                    </div>
                                </div>
                            </dd>
                            <dd>申请时间：{{majorDateInfo.apply_time}}</dd>
                        </dl>
                        <div class="lh22">专业简介：{{majorDateInfo.majorintro}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'SchoolOrMajorComponent',
  store,
  props: {
    btnHide: {
      type: Boolean,
      default: false
    },
    applyType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      keywords: '',
      KEYWORDS: '',
      country: '美国',
      ranking: '不限',
      tuition: '不限',
      majorArea: '不限',
      unqId: '',
      schoolList: [],
      isSchoolList: false,
      majorArr: [],
      ActiveArr: [],
      majorDateInfo: {
        act: '',
        apply_fee: '',
        apply_time: '',
        collagech: '',
        commission: '',
        degree_name: '',
        gmat: '',
        gre: '',
        ielts: '',
        majorch: '',
        majoren: '',
        majorintro: '',
        position: '',
        ranking: '',
        sat: '',
        schoolname: '',
        schoolname_en: '',
        toefl: ''
      }
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      $('#majorDate').on('show.bs.modal', function () {
        $('#majorDate').css({'z-index': '9999999999'})
      })
      $('#schoolMajor').on('hidden.bs.modal', function () {
        self.schoolList = ''
        self.majorArr = ''
      })
      $('.selectpicker').selectpicker('refresh')
    })
    $(document).on('click', '.schoolList li', function () {
      $(this).siblings('li').removeClass('active').end().addClass('active')
    })
  },
  methods: {
    getMajorList (clear) {
      let self = this
      let params = new URLSearchParams()
      params.append('schoolUnqId', self.unqId)
      params.append('keywords', self.KEYWORDS)
      params.append('type', self.applyType)
      if (clear === 1) {
        self.ActiveArr = []
      }
      self.majorArr = []
      db.postRequest('Institution/Plan/majorList', params).then(res => {
        if (res.status === 1) {
          self.majorArr = res.data
          $('[data-id] input').each(function () {
            $(this)[0].checked = false
          })
        } else {
          console.log(res.msg)
        }
      })
    },
    // 获取学校列表
    getSchool (type) {
      let self = this
      if (type === 1 && self.keywords === '') {
        self.layer.alert('请输入关键字后搜索！', {
          shadeClose: false
        })
        return false
      }
      let params = new URLSearchParams()
      params.append('keywords', self.keywords)
      params.append('country', self.country)
      params.append('ranking', self.ranking)
      params.append('tuition', self.tuition)
      params.append('majorArea', self.majorArea)
      db.postRequest('Institution/Plan/searchSchool', params).then(res => {
        if (res.status === 1) {
          self.schoolList = res.data
          if (res.data.length === 0) {
            self.isSchoolList = true
          } else {
            self.isSchoolList = false
          }
        } else {
          console.log(res.msg)
        }
      })
    },
    clearData () {
      let self = this
      self.keywords = ''
      self.country = '美国'
      self.ranking = '不限'
      self.tuition = '不限'
      self.majorArea = '不限'
    },
    setSelectId (ev, obj) {
      let self = this
      let boole = ev.target.checked
      if (boole) {
        self.ActiveArr.push(obj)
      } else {
        self.ActiveArr.map((item, i) => {
          if (obj.id === item.id) {
            self.ActiveArr.splice(i, 1)
          }
        })
      }
    },
    parentData () {
      let self = this
      $('#schoolMajor').modal('hide')
      let params = new URLSearchParams()
      params.append('type', self.applyType)
      for (let i = 0; i < self.ActiveArr.length; i++) {
        params.append('majorUnqIds[' + i + ']', self.ActiveArr[i]['unq_id'])
      }
      db.postRequest('Institution/Plan/getRecommendInfo', params).then(res => {
        if (res.status === 1) {
          self.ActiveArr = []
          self.unqId = ''
          self.$emit('getmajorinfo', res.data)
          $('#schoolMajor').modal('hide')
        } else {
          console.log(res.msg)
        }
      })
    },
    customData () {
      let obj = {
        recommend: [{
          applyReq: '',
          englishname: '',
          majorch: '',
          majoren: '',
          majorintro: '',
          position: '',
          ranking: '',
          school_unq_id: '',
          schoolname: '',
          introduction: '',
          unq_id: '',
          type: ''
        }],
        recommend_table: []
      }
      self.ActiveArr = []
      this.$emit('getmajorinfo', obj)
      $('#schoolMajor').modal('hide')
    },
    modalMajor (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('majorUnqId', id)
      params.append('type', self.applyType)
      db.postRequest('/Institution/Plan/getMajorPreview', params).then(res => {
        if (res.status === 1) {
          self.majorDateInfo = res.data
          setTimeout(function () {
            $('#majorDate').modal('show')
          }, 10)
        } else {
          console.log(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .btn{
        &.btn-info{
            background-color:#cee7fb;color:#428bca;border-color:#cee7fb;

            & span{font-size:18px;}
        }
    }

    .list-group{
        &.schoolList{
            height:400px;overflow-y:auto;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;

            & .list-group-item{
                height:48px;font-size:18px;cursor:pointer;border-left:none;border-right:none;display:block;

                &:first-of-type{
                    border-top:none;
                }

                &.active{
                    &:after{
                        content:'\e689';display:block;width:48px;height:48px;line-height:48px;position:absolute;right:0;top:0;font-family:"iconfont";text-align:center;
                    }
                }
            }

            &.noData{
                display:flex;
                display:-webkit-flex;
                flex-direction:row; /*指定了弹性容器中子元素的排列方式*/
                justify-content:center; /*设置弹性盒子元素在主轴（横轴）方向上的对齐方式。*/
                align-items:center; /*设置弹性盒子元素在侧轴（纵轴）方向上的对齐方式*/
                order:1; /*设置弹性盒子的子元素排列顺序。*/
                flex:1; /*设置弹性盒子的子元素如何分配空间。*/
            }
        }
    }

    .list-group-box{
        height:400px;overflow-y:auto;

        & .list-group{
        }
    }

    #schoolMajor2{
        & .list-group{
            & > div.bdb{
                &:last-of-type{
                    border-bottom:none !important;
                }
            }
        }
    }

    #majorDate{
        & .modal-body{
            dt{line-height:35px;}

            dd{line-height:30px;}
        }
    }
</style>
