<template>
    <div>
        <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-backdrop="static"
                data-target="#BudgetComponent">
            <i class="iconfont font22">&#xe73e;</i>
            <span class="div_vm">添加费用预算</span>
        </button>

        <div class="modal fade bs-example-modal-lg" id="BudgetComponent">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center">选择费用预算</h4>
                    </div>
                    <div class="modal-body">
                        <div class="clearfix">
                            <form action="" method="POST" class="form-inline">
                                <div class="form-group">
                                    <label>档案编号</label>
                                    <input type="text" class="form-control" v-model="number">
                                </div>
                                <div class="form-group ml-20">
                                    <label>费用预算项目</label>
                                    <input type="text" class="form-control" v-model="item">
                                </div>
                                <div class="form-group ml-20">
                                    <button type="button" class="btn btn-primary" @click="pagechange(1)">搜索</button>
                                    <button type="reset" class="btn btn-default ml-20" @click="clearData">清空</button>
                                </div>
                            </form>
                        </div>
                        <div class="blk20"></div>
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered table-condensed table-text-over">
                                <thead>
                                <tr>
                                    <th class="text-center" width="33.3333%">档案编号</th>
                                    <th class="text-center" width="33.3333%">费用预算项目</th>
                                    <th class="text-center" width="33.3333%">金额（元）</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, i) in list" :key="i" class="handPower" @click="budgetCallback(i, 0)">
                                    <td>{{item.number}}</td>
                                    <td>{{item.item}}</td>
                                    <td>{{item.price}}</td>
                                </tr>
                                <tr v-if="list.length === 0">
                                    <td colspan="3" v-html="NoData"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="clearfix pl-40 pr-40">
                        <div class="pull-left w50 pt-20 lh34">
                            <a href="javascript:void(0);" class="cded" @click="budgetCallback(-1, 1)">
                                <i class="iconfont">&#xe73e;</i>
                                <span>添加自定义</span>
                            </a>
                        </div>
                        <div class="pull-right">
                            <pagination :total="total" :current-page='current' @pagechange="pagechange"></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'BudgetComponent',
  store,
  data () {
    return {
      number: '',
      item: '',
      total: 0,
      current: 1,
      list: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    setTimeout(function () {
      self.pagechange(1)
    }, 1000)
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('number', self.number)
      params.append('item', self.item)
      params.append('page', p)
      self.loading = true
      db.postRequest('Institution/Plan/getBudget', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.loading = false
      })
    },
    clearData () {
      let self = this
      self.number = ''
      self.item = ''
      self.pagechange(1)
    },
    budgetCallback (i, custom) {
      let self = this
      let obj = {}
      if (custom === 1) {
        obj = {id: '', number: '', item: '', price: ''}
      } else {
        obj = self.list[i]
      }
      self.$emit('budgetCallbacks', obj)
      $('#BudgetComponent').modal('hide')
    }
  },
  components: {
    pagination
  },
  watch: {}
}
</script>

<style scoped lang="scss">
    .btn {
        &.btn-info {
            background-color:#cee7fb;color:#428bca;border-color:#cee7fb;
            & span {font-size:18px;}
        }
    }
</style>
