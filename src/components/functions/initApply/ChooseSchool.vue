<template>
    <div>
        <InitApplyNav :state="state" :id="id"/>
        <form id="schoolApply" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
            <input type="hidden" name="id" :value="id" v-if="id" />
            <div class="row form-horizontal">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">选择学生</label>
                        <div class="col-sm-8">
                            <select name="student_id" class="form-control selectpicker show-tick" data-live-search="true"
                                    data-size="15" v-model="studentId" @change="getMaterial(studentId)">
                                <option value="">请选择</option>
                                <option :value="item.id" v-for="(item, i) in studentList" :key="i">{{item.stu_name}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">申请材料</label>
                        <div class="col-sm-8">
                            <select name="apply_id" class="form-control selectpicker show-tick" data-live-serach="true"
                                    data-size="15" v-model="materialId">
                                <option value="">请选择</option>
                                <option :value="item.id" v-for="(item, i) in materialList" :key="i">
                                    {{item.apply_num}}({{item.apply_type}})
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">申报类型</label>
                        <div class="col-sm-8">
                            <select name="apply_type" class="form-control selectpicker show-tick" data-live-serach="true"
                                    data-size="15" v-model="applyType">
                                <option value="">请选择</option>
                                <option value="1">本科</option>
                                <option value="2">硕士</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="clearfix font12 text-center">
                    <i class="iconfont cded">&#xe610;</i>
                    如果该生尚未填写申请资料，请先前往"
                    <router-link to="/functions/applyInfo/detail" class="cded">申请资料</router-link>
                    "填写
                </div>
            </div>
            <div class="blk30"></div>
            <table class="table table-customize schoolList">
                <thead>
                <tr>
                    <th class="w5">
                        <i class="iconfont handPower cded" @click="addSchool">&#xe622;</i>
                    </th>
                    <th class="w20"><span class="pl-15">院校名称</span></th>
                    <th class="w20"><span class="pl-15">专业名称</span></th>
                    <th class="w15">专业网址</th>
                    <th class="w25"><span class="pl-10">申请批次</span></th>
                    <th><span class="pl-10">可得佣金</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in schoolArr" :key="i">
                    <td><i class="iconfont handPower cded lh38" @click="deleteSchool(i)">&#xe61f5;</i></td>
                    <td>
                        <div v-show="item.school_unq_id !== 'custom'" class="bootstrapSelectBorderNone">
                            <select name="major_list[school_unq_id][]" class="form-control selectpicker show-tick"
                                    data-size="10" data-live-search="true" data-width="190px"
                                    v-model="item.school_unq_id"
                                    @change="getMajorList(i, applyType, item.school_unq_id)">
                                <option value="">请选择</option>
                                <option value="custom">自定义学校</option>
                                <option :value="items.unq_id" v-for="(items, k) in schoolList" :key="k">
                                    {{items.school_name_cn}}({{items.school_name}})
                                </option>
                            </select>
                        </div>
                        <input type="text" name="major_list[school_name][]" class="form-control"
                               placeholder="请输入自定义学校名称" v-model="item.school_name"
                               v-show="item.school_unq_id === 'custom'">
                    </td>
                    <td>
                        <div v-show="item.major_unq_id !== 'custom'" class="bootstrapSelectBorderNone">
                            <select name="major_list[major_unq_id][]" class="form-control selectpicker show-tick"
                                    data-size="10" data-live-search="true" data-width="190px"
                                    v-model="item.major_unq_id" @change="getBatch(i, applyType, item.major_unq_id)">
                                <option value="">请选择</option>
                                <option value="custom">自定义专业</option>
                                <option :value="items.unq_id" v-for="(items, k) in item.majorList" :key="k">
                                    {{items.major_cn}}({{items.major_en}})
                                </option>
                            </select>
                        </div>
                        <input type="text" name="major_list[major_name][]" class="form-control" placeholder="请输入自定义专业名称"
                               v-model="item.major_name" v-show="item.major_unq_id === 'custom'">
                    </td>
                    <td>
                        <input type="hidden" name="major_list[major_website][]" v-model="item.major_website" />
                        <a :href="item.major_website" target="_blank" class="cded lh34" v-if="item.major_unq_id !=='custom'">点击前往</a>
                        <span v-if="item.major_unq_id === 'custom'" class="c999">
                            <input type="text" name="name" class="form-control" v-model="item.major_website" placeholder="请输入专业网址" />
                        </span>
                    </td>
                    <td>
                        <input type="text" name="major_list[term][]" class="form-control" placeholder="请填写申请批次"
                               v-model="item.term" :list="'term'+i" autocomplete="off" />
                        <datalist :id="'term'+i">
                            <option :value="items" v-for="(items, i) in item.batchList" :key="i"></option>
                        </datalist>
                    </td>
                    <td>
                        <span class="lh34">
                            <input type="text" name="major_list[comm][]" class="form-control" v-model="item.comm"
                                   readonly />
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="clearfix text-center">
                <button type="button" class="btn btn-default" @click="nextPage">下一页</button>
                <button type="submit" class="btn btn-primary ml-20">保存</button>
            </div>
        </form>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import InitApplyNav from '@#/functions/initApply/InitApplyNav'
import db from '@~/js/request'

export default {
  name: 'ChooseSchool',
  data () {
    return {
      id: '',
      loading: true,
      state: [0, 0, 0, 0],
      schoolList: [],
      studentList: [],
      materialList: [],
      // --------------------
      studentId: '',
      materialId: '',
      applyType: 1,
      applyEmail: '',
      schoolArr: [{
        school_unq_id: '',
        school_name: '',
        major_unq_id: '',
        major_name: '',
        major_website: '',
        term: '',
        comm: '',
        majorList: [],
        batchList: []
      }]
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.$nextTick(() => {
      self.getSchoolList()
      if (self.id !== '') {
        self.getDetail(self.id)
      }
    })
  },
  methods: {
    // 获取学校与学生列表
    getSchoolList () {
      let self = this
      self.loading = true
      db.postRequest('Institution/Apply/choseSchool', {}).then(res => {
        if (res.status === 1) {
          self.schoolList = res.data.school_list
          self.studentList = res.data.student_list
        } else {
          console.log(res.msg)
        }
        $('.selectpicker').selectpicker()
        self.loading = false
      })
    },
    // 获取编辑信息
    getDetail (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.postRequest('/Institution/Apply/choseSchoolEdit', params).then(res => {
        if (res.status === 1) {
          self.getMaterial(res.data.student_id)
          self.studentId = res.data.student_id
          self.materialId = res.data.apply_id
          self.applyEmail = res.data.apply_email
          self.applyType = res.data.apply_type
          self.schoolArr = res.data.major_list
          res.data.major_list.map((item, i) => {
            self.getMajorList(i, res.data.apply_type, item.school_unq_id, 'edit')
            self.getBatch(i, res.data.apply_type, item.major_unq_id, 'edit')
          })
        } else {
          console.log(res.msg)
        }
        self.reSelect()
      })
    },
    // 重置select下拉框
    reSelect () {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh')
      }, 300)
    },
    // 获取申请材料列表
    getMaterial (id) {
      let self = this
      let params = new URLSearchParams()
      self.materialId = ''
      if (id === '') {
        self.materialList = []
        self.reSelect()
      }
      params.append('student_id', id)
      db.postRequest('Institution/Apply/materialsList', params).then(res => {
        if (res.status === 1) {
          self.materialList = res.data
        } else {
          console.log(res.msg)
        }
        self.reSelect()
      })
    },
    // 获取专业列表
    getMajorList (i, applyType, schoolId, type) {
      let self = this
      let params = new URLSearchParams()
      if (type !== 'edit') {
        self.schoolArr[i].major_unq_id = ''
        self.schoolArr[i].major_website = ''
        self.schoolArr[i].comm = ''
        self.schoolArr[i].major_name = ''
      }
      if (applyType === '') {
        self.schoolArr[i].school_unq_id = ''
        self.reSelect()
        self.layer.alert('请选择申报类型', {icon: 2})
        return false
      }
      if (schoolId === 'custom') {
        return false
      }
      params.append('apply_type', applyType)
      params.append('school_unq_id', schoolId)
      db.postRequest('Institution/Apply/majorList', params).then(res => {
        if (res.status === 1) {
          self.schoolArr[i].majorList = res.data
        } else {
          console.log(res.msg)
        }
        self.reSelect()
      })
    },
    // 获取批次列表
    getBatch (i, applyType, majorId, type) {
      let self = this
      let params = new URLSearchParams()
      if (type !== 'edit') {
        self.schoolArr[i].batchList = []
        self.schoolArr[i].term = ''
        self.schoolArr[i].major_website = ''
        self.schoolArr[i].comm = ''
      }
      if (applyType === '') {
        self.layer.alert('请选择申报类型', {icon: 2})
        return false
      }
      if (majorId === 'custom') {
        return false
      }
      self.schoolArr[i].majorList.map((item) => {
        if (item.unq_id === majorId) {
          self.schoolArr[i].major_website = item.major_website
          self.schoolArr[i].comm = item.comm
        }
      })
      params.append('apply_type', applyType)
      params.append('major_unq_id', majorId)
      db.postRequest('Institution/Apply/termList', params).then(res => {
        if (res.status === 1) {
          self.schoolArr[i].batchList = res.data
        } else {
          console.log(res.msg)
        }
      })
    },
    // 添加学校列表
    addSchool () {
      this.schoolArr.push({
        school_unq_id: '',
        school_name: '',
        major_unq_id: '',
        major_name: '',
        major_website: '',
        term: '',
        comm: '',
        majorList: [],
        batchList: []
      })
      this.reSelect()
    },
    // 删除学校列表
    deleteSchool (i) {
      this.schoolArr.splice(i, 1)
    },
    // 保存数据
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#schoolApply').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Apply/choseSchoolSave', params).then(res => {
            if (res.status === 1) {
              if (!self.id) {
                self.id = res.data
                self.$router.push('/functions/initApply/ChooseSchool?id=' + res.data)
              }
              self.layer.alert(res.msg, {icon: 1})
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    // 下一页
    nextPage () {
      let self = this
      let formData = $('#schoolApply').serializeArray()
      let params = new URLSearchParams()
      formData.map(item => {
        params.append(item.name, item.value)
      })
      db.postRequest('Institution/Apply/choseSchoolSave', params).then(res => {
        if (res.status === 1) {
          if (self.id) {
            self.$router.push('/functions/initApply/UploadData?id=' + self.id)
          } else {
            self.$router.push('/functions/initApply/UploadData?id=' + res.data)
          }
        }
      })
    }
  },
  components: {
    InitApplyNav
  }
}
</script>

<style scoped lang="scss">
.thumbnail {
    & .state {
        width:30px;height:60px;display:block;overflow:hidden;background-image:url(../../../../static/images/001.png); background-repeat:no-repeat;position:absolute;right:15px;top:0;z-index:10;

        &.state1 {
            background-position:0 0;
        }

        &.state2 {
            background-position:-30px 0;
        }

        &.state3 {
            background-position:-60px 0;
        }
    }
}

.table > tbody > tr > td {
    vertical-align:top;
}
.schoolList{
    [type="text"]{border:none;background-color:transparent !important;}
}
</style>
