<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div :style="name==='commission'?'display: block;':'display: none;'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">佣金管理</div>
                    </div>
                </div>
            </div>

            <div class="clearfix" v-if="loading" v-html="LoadingImg()"></div>
            <div class="clearfix" v-if="!loading">
                <div class="row kangbang">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="commissionTip">
                            <div class="pull-left">可提现佣金</div>
                            <div class="pull-right">
                                <div class="lh40 font16">￥{{list.last}}</div>
                                <div class="clearfix lh30 font12">
                                    <router-link to="/functions/commission/withdraw">我要提现</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="commissionTip">
                            <div class="pull-left">预计还可返佣</div>
                            <div class="pull-right">
                                <div class="lh40 font16 textOver">￥{{list.expect}}</div>
                                <div class="clearfix lh30 font12">
                                    <router-link to="/functions/commission/estimate">查看明细</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="commissionTip">
                            <div class="pull-left">累计获得佣金</div>
                            <div class="pull-right">
                                <div class="lh40 font16">￥{{list.total}}</div>
                                <div class="clearfix lh30 font12">
                                    <router-link to="/functions/commission/cumulative">账单明细</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="blk30"></div>

                <div class="commonTitle Landscape">
                    <span class="pull-left">预计返佣列表</span>
                    <router-link to="/functions/commission/estimate" class="pull-right cded">查看更多</router-link>
                </div>
                <div class="row">
                    <table class="table table-customize">
                        <thead>
                        <tr>
                            <th width="20%">学生编号</th>
                            <th width="20%">学生姓名</th>
                            <th width="20%">申报类型</th>
                            <th width="20%">申报结果</th>
                            <th width="20%">预计返佣</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, i) in list.expectList" :key="i">
                            <td class="text-left">{{item.student_number}}</td>
                            <td>{{item.student_name}}</td>
                            <td>{{item.apply_type_name}}</td>
                            <td>{{item.apply_res}}</td>
                            <td>{{item.commission}}</td>
                        </tr>
                        <tr v-if="list.expectList.length === 0">
                            <td colspan="5" v-html="NoData()"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="commonTitle Landscape">
                    <span class="pull-left">佣金账单明细</span>
                    <router-link to="/functions/commission/cumulative" class="pull-right cded">查看更多</router-link>
                </div>

                <div class="row">
                    <table class="table table-customize">
                        <thead>
                        <tr>
                            <th width="20%">账单生成时间</th>
                            <th width="20%">账单类型</th>
                            <th width="20%">金额</th>
                            <th width="20%">账单明细</th>
                            <th width="20%">状态</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, i) in list.detailList" :key="i">
                            <td class="text-left">{{item.created_time}}</td>
                            <td>{{item.type}}</td>
                            <td>
                                <span class="cfad" v-if="item.status==='入账成功'">+ {{item.money}}</span>
                                <span class="c666" v-if="item.status!=='入账成功'">- {{item.money}}</span>
                            </td>
                            <td>{{item.detail.student_name}}-{{item.detail.school_name}}</td>
                            <td>{{item.status}}</td>
                        </tr>
                        <tr v-if="list.detailList.length === 0">
                            <td colspan="5" v-html="NoData()"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Index',
  store,
  data () {
    return {
      name: 'commission',
      loading: true,
      list: {}
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.name = (self.$route.name).toLocaleLowerCase()
    if (self.name === 'commission') {
      self.getInfo()
    }
  },
  methods: {
    getInfo () {
      let self = this
      self.loading = true
      db.getRequest('Institution/Commission/index', {}).then(res => {
        if (res.status === 1) {
          self.list = res.data
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
        self.loading = false
      })
    }
  },
  components: {},
  watch: {
    $route (to, from) {
      this.name = (to.name).toLocaleLowerCase()
      if (this.name === 'commission') {
        this.getInfo()
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .kangbang{
        .commissionTip {
            width:100%;padding:15px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:0 0 5px#ccc;-moz-box-shadow:0 0 5px #ccc;box-shadow:0 0 5px #ccc;position:relative;
            &:after{content:'';display:block;clear:both;}
            & .pull-left{
                width:70px;height:70px;background-color:#5d9bdd;color:#fff;padding:15px 10px 10px 10px;font-size:14px;text-align:center;line-height:20px;position:absolute; left:15px;top:15px;
            }
            & .pull-right{
                width:100%;padding-left:85px;height:70px;
            }
        }
        & > div:nth-of-type(2) .pull-left{background-color:#b5dd9d;}
        & > div:nth-of-type(3) .pull-left{background-color:#8061ef;}
    }
</style>
