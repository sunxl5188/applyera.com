<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle div_vm">产品管理</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group">
                        <div class="form-group">
                            <button type="button" class="btn btn-default" @click="validateBeforeSubmit">
                                <i class="iconfont">&#xe637;</i>
                                保存
                            </button>
                        </div>
                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default" @click="$router.back()">
                                <i class="iconfont">&#xe64f;</i>
                                返回
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form action="" id="productFormData" method="POST" class="form-horizontal"
              @submit.prevent="validateBeforeSubmit">
            <input type="hidden" name="id" :value="id" v-if="id"/>
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">所属国家</label>
                        <div class="col-sm-8">
                            <select name="country" class="form-control selectpicker show-tick" data-size="10"
                                    data-live-search="true" v-model="info.country" v-validate="'required'"
                                    data-vv-as="所属国家">
                                <option value="">请选择</option>
                                <option :value="item.id" v-for="(item, i) in nation" :key="i">{{item.cn}}</option>
                            </select>
                            <div class="validateTip" v-show="errors.has('country')">
                                {{ errors.first('country') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">产品名称</label>
                        <div class="col-sm-8">
                            <input name="name" type="text" class="form-control" v-model="info.prod_name"
                                   placeholder="请输入新品名称(不超过20个字)" maxlength="20" v-validate="'required|max:20'"
                                   data-vv-as="产品名称">
                            <div class="validateTip" v-show="errors.has('name')">
                                {{ errors.first('name') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">产品价格</label>
                        <div class="col-sm-8">
                            <input type="text" name="fee" class="form-control" v-model="info.fee_cny"
                                   placeholder="请输入产品价格" maxlength="8" v-validate="'required|money|max:8'"
                                   data-vv-as="产品价格"/>
                            <div class="validateTip" v-show="errors.has('fee')">
                                {{ errors.first('fee') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label class="col-sm-1 control-label" style="width: 11.2%;">产品介绍</label>
                        <div class="col-sm-11" style="width: 88.8%;">
                            <textarea name="intro" class="form-control" v-model="info.prod_intro"
                                      placeholder="请输入产品介绍"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label class="col-sm-1 control-label" style="width: 11.2%;">
                            是否需要<br>签署合同
                        </label>
                        <div class="col-sm-11" style="width: 88.8%;">
                            <div class="custom-radio-box">
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" name="yht_status"  class="custom-control-input" id="yht_status1" :value=1 v-model="info.yht_status" :checked="info.yht_status===1">
                                    <label class="custom-control-label" for="yht_status1">需要</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline ml-15">
                                    <input type="radio" name="yht_status" class="custom-control-input" id="yht_status2" :value=0 v-model="info.yht_status" :checked="info.yht_status===0">
                                    <label class="custom-control-label" for="yht_status2">不需要</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-show="info.yht_status===1">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label class="col-sm-1 control-label" style="width: 11.2%;">
                            关联合同
                        </label>
                        <div class="col-sm-3">
                            <select name="yht_id" v-model="info.yht_id" class="form-control selectpicker show-tick" data-size="10" data-width="fit" data-live-search="true">
                                <option value="">请选择该产品需要签署的合同</option>
                                <option :value="item.yht_id" v-for="(item, i) in info.yht_list" :key="i" >{{item.yht_name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import nation from '@@/json/nation.json'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import '@~/js/VeeValidateConfig'
import db from '@~/js/request'

export default {
  name: 'ProductDetail',
  data () {
    return {
      nation: nation,
      id: '',
      info: {
        country: '',
        fee_cny: '',
        id: '',
        prod_intro: '',
        prod_name: '',
        yht_id: '',
        yht_status: 0,
        yht_list: []
      }
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.$nextTick(() => {
      if (self.id !== '') {
        self.getDetail(self.id)
      } else {
        $('.selectpicker').selectpicker('refresh')
      }
    })
  },
  methods: {
    getDetail (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.postRequest('/Institution/PayProd/edit', params).then(res => {
        if (res.status === 1) {
          self.info = res.data
          self.$nextTick(() => {
            $('.selectpicker').selectpicker('refresh')
          })
        } else {
          console.log(res.msg)
        }
      })
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          let formData = $('#productFormData').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('/Institution/PayProd/save', params).then(res => {
            if (res.status === 1) {
              if (self.id === '') {
                self.$emit('pageChange')
              }
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/marketing/product')
              })
            } else {
              self.layer.alert(res.msg, {icon: 2})
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
