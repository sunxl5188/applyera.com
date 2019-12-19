<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">返佣明细</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group ml-10">
                        <div class="dropdown">
                            <button :class="studentNo || studentName || type ?'btn btn-primary filter':'btn btn-default filter'" type="button" data-toggle="dropdown"></button>
                            <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                <div class="pl-15 pr-15" style="width:180px;">
                                    <form action="" method="POST" class="form-horizontal">
                                        <div class="form-group">
                                            <label>学生编号</label>
                                            <input type="text" class="form-control" name="studentNo" placeholder="请输入学生编号" v-model="studentNo">
                                        </div>
                                        <div class="form-group">
                                            <label>学生姓名</label>
                                            <input type="text" class="form-control" name="studentName" placeholder="请输入学生姓名" v-model="studentName">
                                        </div>
                                        <div class="form-group">
                                            <label>申报类型</label>
                                            <select name="type" class="form-control" v-model.number="type">
                                                <option value="">全部</option>
                                                <option value="1">本科</option>
                                                <option value="2">硕士</option>
                                            </select>
                                        </div>
                                        <div class="form-group text-center">
                                            <button type="reset" class="btn btn-default" @click="clearData">重置
                                            </button>
                                            <button type="button" class="btn btn-primary ml-10" @click="pagechange()">
                                                开始筛选
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="refresh"><i class="iconfont">&#xe64e;</i> 刷新
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

        <table class="table table-customize">
            <thead>
            <tr>
                <th>姓名(学生编号)</th>
                <th>申报类型</th>
                <th>申请结果</th>
                <th>预计返佣</th>
                <th>查看过程明细</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in list" :key="i">
                <td>{{item.student}}</td>
                <td>{{item.apply_type_name}}</td>
                <td>{{item.apply_res}}</td>
                <td>{{item.commission}}</td>
                <td>
                    <router-link :to="{path:'/functions/track',query:{studentName:item.student_name,studentNum:item.student_number}}" class="cded">查看过程明细</router-link>
                </td>
            </tr>
            <tr v-if="loading">
                <td colspan="5" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="!loading && list.length===0">
                <td colspan="5" v-html="NoData"></td>
            </tr>
            </tbody>
            <tfoot>
            <tr v-if="list.length>0">
                <td colspan="5" class="text-right">预计返佣合计：<span class="cf00">{{expectation}}</span></td>
            </tr>
            </tfoot>
        </table>
        <PagInAction :total="total" @pagechange="pagechange"></PagInAction>
    </div>
</template>

<script>
import PagInAction from '@#/shared/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Estimate',
  store,
  data () {
    return {
      loading: true,
      studentNo: '',
      studentName: '',
      type: '',
      list: [],
      total: 0,
      expectation: ''
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.pagechange(1)
    })
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('studentNo', self.studentNo)
      params.append('studentName', self.studentName)
      params.append('type', self.type)
      params.append('page', p)
      self.loading = true
      db.postRequest('Institution/Commission/expectationList', params).then(res => {
        if (res.status === 1) {
          self.total = res.data.total
          self.list = res.data.list
          self.expectation = res.data.expectation
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
        self.loading = false
      })
    },
    clearData () {
      this.studentNo = ''
      this.studentName = ''
      this.type = 1
      this.pagechange(1)
    }
  },
  components: {
    PagInAction
  }
}
</script>

<style scoped>

</style>
