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

        <div class="clearfix">
            <form method="POST" class="form-horizontal" id="addForm" autocomplete="off"
                  @submit.prevent="validateBeforeSubmit">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">机构编号</label>
                            <div class="col-sm-8">
                                <input type="text" name="number" class="form-control" placeholder=""
                                       :value="number" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>机构名称</label>
                            <div class="col-sm-8">
                                <input type="text" name="name" class="form-control" placeholder=""
                                       v-validate="'required'"/>
                                <div class="validateTip" v-show="errors.has('name')">
                                    {{ errors.first("name") }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>电话</label>
                            <div class="col-sm-8">
                                <input type="text" name="phone" class="form-control" placeholder="请输入信息"
                                       v-validate="'required|mobile'"/>
                                <div class="validateTip" v-show="errors.has('phone')">
                                    {{ errors.first("phone") }}
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
                                <input type="text" name="email" class="form-control" placeholder=""/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">佣金比例(%)</label>
                            <div class="col-sm-8">
                                <input type="text" name="commission_rate" class="form-control" placeholder=""/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">公司/工作室</label>
                            <div class="col-sm-8">
                                <select name="type" class="form-control selectpicker show-tick" @change="typeChange($event)">
                                    <option value="1">公司</option>
                                    <option value="2">工作室</option>
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
                                       value="0" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">可提佣金(元)</label>
                            <div class="col-sm-8">
                                <input type="text" name="commission_withdraw" class="form-control" placeholder=""
                                       value="0" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">状态</label>
                            <div class="col-sm-8">
                                <input type="text" name="statusStr" class="form-control" value="启用" placeholder=""
                                       readonly/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">创建时间</label>
                            <div class="col-sm-8">
                                <input type="text" name="create_time" class="form-control" placeholder=""
                                       :value="time" readonly/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">最高账号数量</label>
                            <div class="col-sm-8">
                                <input type="text" name="" class="form-control" placeholder="请输入">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">有效期至</label>
                            <div class="col-sm-8">
                                <input type="text" name="" id="times" class="form-control" placeholder="请选择">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">套餐名</label>
                            <div class="col-sm-8">
                                <input type="text" name="" class="form-control" placeholder="请输入">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-1 control-label">地址</label>
                    <div class="col-sm-11 addressInline">
                        <CitySelect pName='province_id' cName='area_id' aName='area_id' @cityCallback="cityCallback"></CitySelect>
                        <input type="text" name="address" class="form-control" placeholder="详细地址" style="display:inline-block;width:auto;vertical-align: middle;min-width:260px;">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-1 control-label">备注信息</label>
                    <div class="col-sm-11">
                        <textarea name="remark" cols="45" rows="5" class="form-control"></textarea>
                    </div>
                </div>

                <div class="blk30"></div>

                <AgencyTabs :type="type" :picList="picList" :oldBank="oldBank" :logo="logo" ref="agencyTabs"
                            @setChildForm="setChildForm"/>

            </form>
        </div>

    </div>
</template>

<script>
import CitySelect from '@#/shared/CitySelect'
import AgencyTabs from '@#/admin/agency/AgencyTabs'
import '@~/js/VeeValidateConfig'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'AddAgency',
  store,
  data () {
    return {
      number: '',
      type: 1,
      pIndex: 0,
      cIndex: 0,
      childForm: false,
      picList: [],
      oldBank: [],
      logo: ''
    }
  },
  computed: {
    token () {
      return store.state.token
    },
    time () {
      return this.currentTime()
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.laydate.render({
        elem: '#times',
        type: 'datetime',
        done: (value) => {
        }
      })
    })
    setTimeout(function () {
      db.getRequest('Institution/Company/getNumber', {}).then(res => {
        if (res.status === 1) {
          self.number = res.data
        }
      })
    }, 500)
    setTimeout(function () {
      $('.selectpicker').selectpicker()
    }, 1000)
  },
  methods: {
    cityChange (obj, ty) {
      let self = this
      for (let i = 0; i < obj.target.length; i++) {
        if (obj.target[i].selected) {
          if (ty === 1) {
            self.pIndex = i - 1
          }
          if (ty === 2) {
            self.cIndex = i - 1
          }
        }
      }
    },
    submitForm () {
      let self = this
      self.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      // 执行子组件方法
      self.$refs.agencyTabs.validateSubmit()
      self.$validator.validateAll().then((result) => {
        if (result && self.childForm) {
          let formData = $('#addForm').serializeArray()
          let params = new URLSearchParams()
          formData.push.apply(formData, self.childFormData)
          for (let i = 0; i < formData.length; i++) {
            params.append(formData[i]['name'], formData[i]['value'])
          }
          db.postRequest('Institution/Company/add', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (e) {
                self.layer.close(e)
                self.$router.push('/archives/agency/')
              })
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    setChildForm (params, childFormData) {
      this.childForm = params
      this.childFormData = childFormData
    },
    typeChange (obj) {
      let self = this
      for (let i = 0; i < obj.target.length; i++) {
        if (obj.target[i].selected) {
          self.type = parseInt(obj.target[i].value)
        }
      }
    },
    cityCallback (data) {

    }
  },
  components: {
    CitySelect, AgencyTabs
  }
}
</script>

<style scoped lang="scss">
.addressInline > div{display:inline-block !important;}
</style>
