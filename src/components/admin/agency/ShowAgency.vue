<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">中介机构</div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">

                    <div class="form-group ml-10">
                        <router-link :to="{path:'/admin/agency/editagency', query:{id: list.id}}" class="btn btn-default"><i
                                class="iconfont">&#xe60f;</i> 编辑
                        </router-link>
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
            <form method="POST" class="form-horizontal" autocomplete="off">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">机构编号</label>
                            <div class="col-sm-8 lh34" v-text="list.number"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>机构名称</label>
                            <div class="col-sm-8 lh34" v-text="list.name"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>电话</label>
                            <div class="col-sm-8 lh34" v-text="list.phone"></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">邮箱</label>
                            <div class="col-sm-8 lh34" v-text="list.email"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">佣金比例(%)</label>
                            <div class="col-sm-8 lh34" v-text="list.commission_rate"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">公司/工作室</label>
                            <div class="col-sm-8 lh34" v-text="list.type === 1 ? '公司': '工作室'"></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">已获佣金总额(元)</label>
                            <div class="col-sm-8 lh34" v-text="list.commission_total"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">可提佣金(元)</label>
                            <div class="col-sm-8 lh34" v-text="list.commission_withdraw"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">状态</label>
                            <div class="col-sm-8 lh34" v-text="list.statusStr"></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">创建时间</label>
                            <div class="col-sm-8 lh34" v-text="list.create_time"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">最高账号数量</label>
                            <div class="col-sm-8 lh34"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">有效期至</label>
                            <div class="col-sm-8 lh34"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">套餐名</label>
                            <div class="col-sm-8 lh34"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">地址</label>
                            <div class="col-sm-8 lh34" v-text="prov + city + area + ' ' +list.address"></div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-1 control-label">备注信息</label>
                    <div class="col-sm-11 lh34" v-text="list.remark"></div>
                </div>

                <div class="blk30"></div>

                <ul class="nav nav-tabs"><!--nav-justified-->
                    <li role="presentation" class="active"><a href="#ShowAgency1" data-toggle="tab">财务信息</a></li>
                    <li role="presentation"><a href="#ShowAgency2" data-toggle="tab">附件管理</a></li>
                    <li role="presentation"><a href="#ShowAgency3" data-toggle="tab">上传LOGO</a></li>
                </ul>
                <div class="tab-content pt-15">
                    <div class="tab-pane fade in active" id="ShowAgency1">
                        <div class="clearfix form-inline pb-15">
                            <span>银行账户名称</span> {{list.bank_account}}
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered table-customize">
                                <thead>
                                <tr>
                                    <th width="15%"><font class="cf00">*</font>开户银行</th>
                                    <th width="25%"><font class="cf00">*</font>银行卡号</th>
                                    <th><font class="cf00">*</font>银行卡开户行信息</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(banks, i) in oldBank" :key="i" class="bankList">
                                    <td>
                                        {{banks.name}}
                                    </td>
                                    <td>
                                        {{banks.card_num}}
                                    </td>
                                    <td>
                                        {{banks.card_info}}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="ShowAgency2">
                        <div class="panel-group" id="accordion">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <span class="font16 div_vm mr-10">营业执照</span>
                                        <a class="ml-10 div_vm" data-toggle="collapse" data-parent="#accordion"
                                           href="#collapseOne">
                                            <span>收起</span>
                                            <i class="iconfont">&#xe61f;</i>
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseOne" class="panel-collapse collapse in">
                                    <div class="panel-body">
                                        <div class="clearfix fileList" v-for="(item,i) in picList" :key="i">
                                    <span style="display: inline-block;width: 25%;">
                                        <i class="iconfont">&#xe602;</i>
                                        <span style="vertical-align: middle;display: inline-block;width: 85%;overflow: hidden;-ms-text-overflow: ellipsis;text-overflow: ellipsis;">{{item.file_name}}</span>
                                    </span>
                                            <span style="display: none;">
                                        <a :href="baseUrl + item.path" target="_blank" class="ml-15"><i
                                                class="iconfont">&#xe631;</i>预览</a>
                                    </span>
                                        </div>
                                        <div class="clearfix" v-if="picList.length===0" v-html="NoData()"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="ShowAgency3">
                        <div class="clearfix" v-if="LOGO.path">
                            <a href="#" class="thumbnail" style="max-width: 200px;">
                                <img :src="'//'+LOGO.path" alt="">
                            </a>
                        </div>
                    </div>

                </div>

            </form>
        </div>

    </div>
</template>

<script>
import AgencyTabs from '@/components/admin/agency/AgencyTabs'
import city from '@@/js/cityjsonNew.json'
import db from '@~/js/request'
import store from '@/vuex/Store'
let citylist = city.citylist

export default {
  name: 'ShowAgency',
  store,
  data () {
    return {
      baseUrl: window.ajaxBaseUrl,
      list: {},
      loading: true,
      provId: '',
      cityId: '',
      areaId: '',
      oldBank: [],
      picList: []
    }
  },
  computed: {
    token () {
      return store.state.token
    },
    prov () {
      let self = this
      let title = ''
      let I = self.provId ? self.provId : 0
      for (let i = 0; i < citylist.length; i++) {
        if (citylist[i]['area_id'] === I) {
          title = citylist[i]['title']
          self.pIndex = i
        }
      }
      return title
    },
    city () {
      let self = this
      let title = ''
      let I = self.cityId ? self.cityId : 0
      if (self.pIndex) {
        let data = citylist[self.pIndex]['child']
        for (let i = 0; i < data.length; i++) {
          if (data[i]['area_id'] === I) {
            title = data[i]['title']
            self.cIndex = i
          }
        }
      }
      return title
    },
    area () {
      let self = this
      let title = ''
      let I = self.areaId ? self.areaId : 0
      if (self.cIndex) {
        let data = citylist[self.pIndex]['child'][self.cIndex]['child']
        for (let i = 0; i < data.length; i++) {
          if (data[i]['area_id'] === I) {
            title = data[i]['title']
          }
        }
      }
      return title
    }
  },
  mounted () {
    let self = this
    let id = self.$route.query.id
    self.$nextTick(() => {
      setTimeout(function () {
        db.getRequest('Institution/Company/detail', {
          id: id
        }).then(res => {
          if (res.status === 1) {
            self.list = res.data
            self.provId = res.data.province_id
            self.cityId = res.data.city_id
            self.areaId = res.data.area_id
            self.oldBank = res.data.bank_cards
            self.picList = res.data.uploads
            self.LOGO = res.data.logo
          } else {
            self.layer.alert(res.msg, {icon: 2})
          }
          self.loading = false
        })
      }, 500)
    })
  },
  methods: {},
  components: {
    AgencyTabs
  }
}
</script>

<style scoped>

</style>
