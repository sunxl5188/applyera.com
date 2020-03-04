<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">中介机构</div>
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

        <div class="clearfix lh24 text-center" v-if="loading">数据加载中...</div>
        <div class="clearfix" v-if="Object.keys(list).length > 0">
            <form method="POST" id="editForm" class="form-horizontal" autocomplete="off"
                  @submit.prevent="validateBeforeSubmit">
                <input type="hidden" name="id" id="id" :value="list.id"/>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">机构编号</label>
                            <div class="col-sm-8">
                                <input type="text" name="number" class="form-control" placeholder=""
                                       v-model="list.number" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>机构名称</label>
                            <div class="col-sm-8">
                                <input type="text" name="name" class="form-control" placeholder=""
                                       v-model="list.name"
                                       v-validate="'required'"/>
                                <div class="validateTip" v-show="errors.has('name')">
                                    {{ errors.first('name') }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>电话</label>
                            <div class="col-sm-8">
                                <input type="text" name="phone" class="form-control" placeholder="请输入信息"
                                       v-model="list.phone"
                                       v-validate="'required|mobile'"/>
                                <div class="validateTip" v-show="errors.has('phone')">
                                    {{ errors.first('phone') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">邮箱</label>
                            <div class="col-sm-8">
                                <input type="text" name="email" class="form-control" placeholder=""
                                       v-model="list.email"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">佣金比例(%)</label>
                            <div class="col-sm-8">
                                <input type="text" name="commission_rate" class="form-control" placeholder=""
                                       v-model="list.commission_rate"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">公司/工作室</label>
                            <div class="col-sm-8">
                                <select name="type" class="form-control selectpicker show-tick"
                                        @change="typeChange($event)">
                                    <option value="1" :selected="type===1">公司</option>
                                    <option value="2" :selected="type===2">工作室</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">已获佣金总额(元)</label>
                            <div class="col-sm-8">
                                <input type="text" name="commission_total" class="form-control" placeholder=""
                                       v-model="list.commission_total"
                                       value="0" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">可提佣金(元)</label>
                            <div class="col-sm-8">
                                <input type="text" name="commission_withdraw" class="form-control" placeholder=""
                                       value="0" readonly v-model="list.commission_withdraw"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">状态</label>
                            <div class="col-sm-8">
                                <input type="text" name="statusStr" class="form-control" value="启用" placeholder=""
                                       readonly v-model="list.statusStr"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">创建时间</label>
                            <div class="col-sm-8">
                                <input type="text" name="create_time" class="form-control" placeholder="" readonly
                                       v-model="list.create_time"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">最高账号数量</label>
                            <div class="col-sm-8">
                                <input type="text" name="max_account" v-model="max_account" class="form-control"
                                       placeholder="请输入">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">有效期至</label>
                            <div class="col-sm-8">
                                <input type="text" name="service_deadline" v-model="service_deadline" id="times"
                                       class="form-control" placeholder="请选择">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">套餐名</label>
                            <div class="col-sm-8">
                                <input type="text" name="service_type" v-model="service_type" class="form-control"
                                       placeholder="请输入">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-1 control-label">地址</label>
                    <div class="col-sm-11 addressInline">
                        <CitySelect :p="list.province_id" :c="list.city_id" :a="list.area_id" pName='province_id'
                                    cName='area_id' aName='area_id' @cityCallback="cityCallback"></CitySelect>
                        <input type="text" name="address" class="form-control" placeholder="详细地址"
                               style="display:inline-block;width:auto;vertical-align: middle;min-width:260px;"
                               v-model="list.address">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-1 control-label">备注信息</label>
                    <div class="col-sm-11">
                            <textarea name="remark" cols="45" rows="5" class="form-control"
                                      v-model="list.remark"></textarea>
                    </div>
                </div>

                <div class="blk-30"></div>

                <AgencyTabs :type="type" :oldBank="oldBank" :picList="picList" :logo="logo"
                            :bank_account="bank_account" ref="agencyTabs"
                            @setChildForm="setChildForm"/>

            </form>
        </div>

    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import CitySelect from '@#/shared/CitySelect'
import AgencyTabs from '@/components/admin/agency/AgencyTabs'
import db from '@~/js/request'
import store from '@/vuex/Store'

export default {
  name: 'EditAgency',
  store,
  data () {
    return {
      list: {},
      loading: true,
      pIndex: 0,
      cIndex: 0,
      type: 1,
      oldBank: [],
      picList: [],
      logo: {},
      bank_account: '',
      max_account: '',
      service_deadline: '',
      service_type: ''
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    let id = self.$route.query.id
    self.$nextTick(() => {
      setTimeout(function () {
        let params = new URLSearchParams()
        params.append('id', id)
        db.getRequest('Institution/Company/detail', params).then(res => {
          if (res.status === 1) {
            self.list = res.data
            self.oldBank = res.data.bank_cards
            self.type = res.data.type
            self.picList = res.data.uploads
            self.logo = res.data.logo
            self.bank_account = res.data.bank_account
            self.max_account = res.data.max_account
            self.service_deadline = res.data.service_deadline
            self.service_type = res.data.service_type
          } else {
            self.layer.alert(res.msg, { icon: 2 })
          }
          self.loading = false
          setTimeout(function () {
            $('.selectpicker').selectpicker()
            self.laydate.render({
              elem: '#times',
              type: 'datetime',
              done: (value) => {
                self.service_deadline = value
              }
            })
          }, 200)
        })
      }, 500)
    })
  },
  methods: {
    cityChange (obj, ty) {
      let self = this
      self.selectedCustom = true
      for (let i = 0; i < obj.target.length; i++) {
        if (obj.target[i].selected) {
          if (ty === 1) {
            self.pIndex = i - 1
            self.list.province_id = obj.target[i].value
          }
          if (ty === 2) {
            self.cIndex = i - 1
            self.list.city_id = obj.target[i].value
          }
          if (ty === 3) {
            self.list.area_id = obj.target[i].value
          }
        }
      }
    },
    typeChange (obj) {
      let self = this
      for (let i = 0; i < obj.target.length; i++) {
        if (obj.target[i].selected) {
          self.type = parseInt(obj.target[i].value)
        }
      }
    },
    submitForm () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$refs.agencyTabs.validateSubmit()
      self.$validator.validateAll().then((result) => {
        if (result && self.childForm) {
          let formData = $('#editForm').serializeArray()
          let params = new URLSearchParams()
          formData.push.apply(formData, self.childFormData)
          for (let i = 0; i < formData.length; i++) {
            params.append(formData[i]['name'], formData[i]['value'])
          }
          db.postRequest('Institution/Company/edit', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {icon: 1}, function (e) {
                self.layer.close(e)
                self.$router.push('/admin/agency')
              })
            } else {
              self.layer.alert(res.msg, { icon: 2 })
            }
          })
        }
      })
    },
    setChildForm (params, childFormData) {
      this.childForm = params
      this.childFormData = childFormData
    },
    cityCallback (data) {}
  },
  components: {
    CitySelect, AgencyTabs
  }
}
</script>

<style scoped lang="less">
.addressInline > div {display:inline-block !important;}
</style>
