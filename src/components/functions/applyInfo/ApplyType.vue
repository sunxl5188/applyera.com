<template>
    <div id="applyType">
        <div class="modal fade" id="modalApplyType">
            <div class="modal-dialog">
                <form action="" id="applyTypeData" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="$router.back()">&times;</button>
                            <h4 class="modal-title">关联学生与类型</h4>
                        </div>
                        <div class="modal-body">
                            <div style="width: 300px;margin:0 auto;">
                                <div class="form-group">
                                    <label>关联学生</label>
                                    <select name="student_id" class="form-control selectpicker show-tick" data-size="10"
                                            data-live-search="true" v-model="studentId" v-validate="'required'" data-vv-as="学生">
                                        <option value="">请选择学生</option>
                                        <option :value="item.id" v-for="(item, i) in list" :key="i">{{item.stu_name}}</option>
                                    </select>
                                    <div class="validateTip" v-show="errors.has('student_id')">
                                        {{ errors.first('student_id') }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>申报类型</label>
                                    <select name="apply_type" class="form-control selectpicker show-tick" data-size="10" v-model.number="educationType" v-validate="'required'" data-vv-as="申报类型">
                                        <option value="">请选择类型</option>
                                        <option value="1">申请本科</option>
                                        <option value="2">申请硕士</option>
                                    </select>
                                    <div class="validateTip" v-show="errors.has('apply_type')">
                                        {{ errors.first('apply_type') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" @click="$router.back()">取消</button>
                            <button type="submit" class="btn btn-primary">保存</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import '@~/js/VeeValidateConfig'
import db from '@~/js/request'

export default {
  name: 'ApplyType',
  data () {
    return {
      studentId: '',
      educationType: '',
      list: []
    }
  },
  mounted () {
    let self = this
    self.setSelect()
    self.$nextTick(() => {
      $('#applyType').height($(window).height() - 150)
      let params = new URLSearchParams()
      db.postRequest('/Institution/Apply/studentList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data
          self.$nextTick(() => {
            self.setSelect()
            $('#modalApplyType').modal({
              backdrop: 'static',
              show: true
            })
          })
        } else {
          console.log(res.msg)
        }
      })
    })
  },
  methods: {
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#applyTypeData').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('/Institution/ApplyMaterial/saveMain', params).then(res => {
            if (res.status === 1) {
              $('#modalApplyType').modal('hide')
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/functions/applyInfo/detail?id=' + res.data.apply_id)
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    },
    setSelect () {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh')
      }, 300)
    }
  }
}
</script>

<style scoped>

</style>
