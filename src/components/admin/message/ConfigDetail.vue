<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">消息配置</div>
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

        <div v-if="loading" v-html="LoadingImg()"></div>
        <div v-if="!loading">
            <form action="" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                <input type="hidden" name="id" :value="id" v-if="id!==''"/>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>消息编号</label>
                                <input type="text" name="" :value="list.msg_num" class="form-control" placeholder=""
                                       readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>档案状态</label>
                                <input type="text" name="" class="form-control" placeholder=""
                                       :value="list.status|state"
                                       readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>创建时间</label>
                                <input type="text" name="" class="form-control" placeholder=""
                                       :value="list.created_time"
                                       readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label><font class="cf00">*</font> 消息类型</label>
                                <select name="msg_type" class="form-control" v-validate="'required'" data-vv-as="消息类型"
                                        v-model="list.msg_type" @change="setTitleOr">
                                    <option value="">请选择</option>
                                    <option :value="key" v-for="(item, key) in msg_type_list" :key="key">
                                        {{item.val}}
                                    </option>
                                </select>
                                <div class="validateTip" v-show="errors.has('msg_type')">
                                    {{ errors.first("msg_type") }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label><font class="cf00">*</font>触发策略</label>
                                <select name="trigger_type" v-model="list.trigger_type" class="form-control"
                                        v-validate="'required'" data-vv-as="触发策略">
                                    <option value="">请选择</option>
                                    <option :value="key" v-for="(item, key) in trigger_type_list" :key="key">
                                        {{item}}
                                    </option>
                                </select>
                                <div class="validateTip" v-show="errors.has('trigger_type')">
                                    {{ errors.first("trigger_type") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label><font class="cf00">*</font> 消息标题</label>
                            <input type="text" name="msg_title" class="form-control" placeholder=""
                                   v-model="list.msg_title"
                                   v-validate="'required'" data-vv-as="消息标题">
                            <div class="validateTip" v-show="errors.has('msg_title')">
                                {{ errors.first("msg_title") }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label><font class="cf00">*</font> 接收对象</label>
                            <input type="text" name="receiver" class="form-control" placeholder="请输入信息"
                                   v-model="list.receiver"
                                   v-validate="'required'" data-vv-as="接收对象">
                            <div class="validateTip" v-show="errors.has('receiver')">
                                {{ errors.first("receiver") }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>业务描述</label>
                            <textarea class="form-control w100" name="msg_content" v-model="list.msg_content"
                                      placeholder="申学纪工作人员上传完院校回执，通过系统消息的形式告知中介机构。"></textarea>
                        </div>
                    </div>
                </div>

                <!--*****************************************-->

                <ul class="nav nav-tabs"><!--nav-justified-->
                    <li role="presentation" class="active"><a href="#tabs1" data-toggle="tab">触发条件</a></li>
                    <li role="presentation"><a href="#tabs2" data-toggle="tab">关联机构</a></li>
                </ul>
                <div class="tab-content pt-15">
                    <div class="tab-pane fade in active" id="tabs1">
                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th width="6%" class="text-center"><i class="iconfont cded handPower"
                                                                      @click="addCondition">&#xe622;</i></th>
                                <th width="18.8%">业务对象</th>
                                <th width="18.8%">条件字段</th>
                                <th width="18.8%">条件符号</th>
                                <th width="18.8%">条件值</th>
                                <th width="18.8%">前后关联符号</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, i) in list.trigger_condition" :key="i">
                                <td class="text-center">
                                    <i class="iconfont cded handPower" @click="delCondition(i)">&#xe61f5;</i>
                                </td>
                                <td>
                                    <select name="trigger_condition[obj][]" class="form-control" v-model="item.obj">
                                        <option value="">请选择</option>
                                        <option :value="key" v-for="(item, key) in tc" :key="key">{{item.name}}</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="trigger_condition[field][]" class="form-control" v-model="item.field"
                                            v-if="item.obj!==''">
                                        <option value="">请选择</option>
                                        <option :value="key" v-for="(item, key) in tc[item.obj].field" :key="key">{{item}}</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="trigger_condition[condition][]" class="form-control"
                                            v-model="item.condition"
                                            v-if="item.obj!==''">
                                        <option value="">请选择</option>
                                        <option :value="key" v-for="(item, key) in tc[item.obj].condition" :key="key">{{item}}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <select name="trigger_condition[value][]" class="form-control" v-model="item.value"
                                            v-if="item.obj!==''">
                                        <option value="">请选择</option>
                                        <option :value="key" v-for="(item, key) in tc[item.obj].value" :key="key">{{item}}</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="trigger_condition[relation][]" class="form-control"
                                            v-model="item.relation"
                                            v-if="item.obj!==''">
                                        <option value="">请选择</option>
                                        <option :value="key" v-for="(item, key) in tc[item.obj].realation" :key="key">{{item}}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="tabs2">
                        <table class="table table-bordered table-hover text-center">
                            <thead>
                            <tr>
                                <th class="text-center" width="5%">
                                    <i class="iconfont cded handPower" @click="addCompany">&#xe622;</i>
                                </th>
                                <th class="text-center" width="31%">机构编号</th>
                                <th class="text-center" width="31%">机构名称</th>
                                <th class="text-center">关联时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, i) in companyArr" :key="i">
                                <td>
                                    <i class="iconfont cded handPower" @click="delCompany(i)">&#xe61f5;</i>
                                    <input type="hidden" name="company_id_arr[]" :value="item.id"/>
                                </td>
                                <td>
                                    <div class="form-group form-search" style="margin-bottom: 0;">
                                        <i class="iconfont handPower" data-toggle="modal" data-backdrop="static"
                                           data-target="#messageJG" @click="companyindex = i">&#xe741;</i>
                                        <input type="text" name="" :value="item.number" class="form-control"
                                               placeholder="">
                                    </div>
                                </td>
                                <td>{{item.name}}</td>
                                <td>{{item.create_time}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </form>
        </div>
        <AgencyList @AgencyCallback="AgencyCallback"></AgencyList>
    </div>
</template>

<script>
import AgencyList from '@/components/admin/message/AgencyList'
import '@~/js/VeeValidateConfig'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'ConfigDetail',
  store,
  data () {
    return {
      loading: true,
      id: '',
      list: {},
      msg_type_list: {},
      tc: {},
      trigger_type_list: {},
      companyArr: [],
      companyindex: 0
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
    self.getDetail()
  },
  methods: {
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.postRequest('Institution/Msg/detail', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.data
          self.msg_type_list = res.data.msg_type_list
          self.tc = res.data.tc
          self.trigger_type_list = res.data.trigger_type_list
          self.companyArr = res.data.data.insMsgCompany
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('.form-horizontal').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Msg/detailSave', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/admin/message/config')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    },
    addCondition () {
      this.list.trigger_condition.push({
        obj: '', field: '', condition: '', value: '', relation: ''
      })
    },
    delCondition (index) {
      this.list.trigger_condition.splice(index, 1)
    },
    addCompany () {
      this.companyArr.push({'id': '', 'number': '', 'name': '', 'create_time': ''})
    },
    delCompany (i) {
      this.companyArr.splice(i, 1)
    },
    AgencyCallback (item) {
      this.companyArr[this.companyindex]['id'] = item.id
      this.companyArr[this.companyindex]['number'] = item.number
      this.companyArr[this.companyindex]['name'] = item.name
      this.companyArr[this.companyindex]['create_time'] = item.create_time
    },
    setTitleOr () {
      let i = this.list.msg_type
      if (i === '') {
        this.list.msg_title = ''
        this.list.receiver = ''
      } else {
        this.list.msg_title = this.msg_type_list[i]['list']['title']
        this.list.receiver = this.msg_type_list[i]['list']['receiver']
      }
    }
  },
  components: {AgencyList}
}
</script>

<style scoped lang="scss">

</style>
