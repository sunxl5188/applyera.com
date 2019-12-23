<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">数据范围</div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="submitForm()"><i
                                class="iconfont">&#xe637;</i> 保存
                        </button>
                    </div>

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>

                </div>

            </div>
        </div>

        <div v-if="loading" v-html="LoadingImg"></div>
        <div v-if="!loading">
            <form action="" id="addFanweiForm" method="POST" class="form-horizontal"
                  @submit.prevent="validateBeforeSubmit">
                <input type="hidden" name="id" id="id" v-if="id" v-model="id"/>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>范围编号</label>
                                <input type="text" name="range_num" class="form-control" placeholder=""
                                       v-model="range_num"
                                       readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label><font class="cf00">*</font>范围名称</label>
                                <input type="text" name="range_name" class="form-control" placeholder=""
                                       v-model="range_name" v-validate="'required'" data-vv-as="范围名称">
                                <div class="validateTip" v-show="errors.has('range_name')">
                                    {{ errors.first("range_name") }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label><font class="cf00">*</font>范围对象</label>
                                <select name="range_table" class="form-control" v-model="range_table"
                                        v-validate="'required'" data-vv-as="范围对象">
                                    <option value="">请选择</option>
                                    <option :value="key" v-for="(item,key) in range_table_List" :key="key">{{item.name}}</option>
                                </select>
                                <div class="validateTip" v-show="errors.has('range_table')">
                                    {{ errors.first("range_table") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>状态</label>
                                <input type="text" name="status" class="form-control" placeholder="" readonly
                                       :value="status|state">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>创建时间</label>
                                <input type="text" name="created_time" class="form-control times" placeholder="请选择"
                                       v-model="created_time">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="blk30"></div>
                <ul class="nav nav-tabs"><!--nav-justified-->
                    <li role="presentation" class="active"><a href="javascript:void(0);">范围明细</a></li>
                </ul>
                <div class="tab-content pt-30">
                    <div class="tab-pane fade in active">
                        <div class="table-responsive">
                            <table class="table table-hover table-text-over table-condensed table-bordered text-center">
                                <thead>
                                <tr>
                                    <th class="text-center w5">
                                        <i class="iconfont handPower cded" @click="addItem">&#xe622;</i>
                                    </th>
                                    <th class="text-center">条件字段</th>
                                    <th class="text-center">条件符号</th>
                                    <th class="text-center">条件值</th>
                                    <th class="text-center">前后关联符号</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(its,i) in conditionList" :key="i" v-if="range_table!==''">
                                    <td><i class="iconfont handPower cded"
                                           @click="conditionList.splice(i,1)">&#xe61f5;</i></td>
                                    <td>
                                        <select name="detail_list[field][]" class="form-control"
                                                v-model="its.field">
                                            <option value="">请选择</option>
                                            <option :value="key"
                                                    v-for="(item, key) in range_table_List[range_table]['field']" :key="key">
                                                {{item}}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <select name="detail_list[conditions][]" class="form-control"
                                                v-model="its.conditions">
                                            <option value="">请选择</option>
                                            <option :value="key" v-for="(item,key) in conditions" :key="key">{{item}}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" name="detail_list[value][]" class="form-control"
                                               v-model="its.value"/>
                                    </td>
                                    <td>
                                        <select name="detail_list[relation][]" class="form-control"
                                                v-model="its.relation">
                                            <option value="">请选择</option>
                                            <option :value="key" v-for="(item,key) in relation" :key="key">{{item}}</option>
                                        </select>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Detail',
  store,
  data () {
    return {
      loading: true,
      id: '',
      range_num: '',
      range_name: '',
      range_table: '',
      status: 1,
      created_time: '',
      conditionList: [],
      range_table_List: {},
      conditions: {}, // 条件符号
      relation: {}// 前后关联符号
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.getInfo()
    setTimeout(function () {
      self.laydate.render({
        elem: '.times',
        type: 'datetime',
        done: (value) => {
          self.created_time = value
        }
      })
    }, 1000)
  },
  methods: {
    getInfo () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.postRequest('Institution/RoleData/rangeDetail', params).then(res => {
        if (res.status === 1) {
          self.range_num = res.data.data.range_num
          self.range_name = res.data.data.range_name
          self.range_table = res.data.data.range_table
          self.status = res.data.data.status
          self.created_time = res.data.data.created_time

          self.conditionList = res.data.data.detail_list

          self.range_table_List = res.data.chose.obj
          self.conditions = res.data.chose.conditions
          self.relation = res.data.chose.relation
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    addItem () {
      let self = this
      if (self.range_table === '') {
        self.layer.alert('请先选择范围对象', {icon: 2})
        return false
      }
      self.conditionList.push({conditions: '', field: '', relation: '', value: ''})
    },
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#addFanweiForm').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/RoleData/rangeSave', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/admin/range')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    }
  },
  components: {pagination}
}
</script>

<style scoped>

</style>
