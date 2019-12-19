<template>
    <div>
        <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-backdrop="static"
                data-target="#AddEvaluation">
            <i class="iconfont font22">&#xe73e;</i>
            <span class="div_vm">添加考评内容</span>
        </button>
        <div class="modal fade bs-example-modal-lg" id="AddEvaluation">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center">选择能力考评</h4>
                    </div>
                    <div class="modal-body">
                        <div class="clearfix">
                            <form action="" method="POST" class="form-inline">
                                <div class="form-group">
                                    <label>档案编号</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group ml-20">
                                    <label>考评标题</label>
                                    <input type="text" class="form-control">
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
                                    <th class="text-center w15">档案编号</th>
                                    <th class="text-center w15">考评标题</th>
                                    <th class="text-center">考评建议内容</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, i) in list" :key="i" class="handPower" @click="evaluaCallback(i)">
                                    <td>{{item.number}}</td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.content}}</td>
                                </tr>
                                <tr v-if="list.length === 0">
                                    <td colspan="3" v-html="NoData"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="clearfix">
                            <span class="pull-left pt-20 pb-20">
                                <a href="javascript:void(0);" class="cded lh34" @click="evaluaCallback()">找不到合适的? 点击添加自定义</a></span>
                            <div class="pull-right">
                                <PagInAction :total="total" :current-page='current' @pagechange="pagechange"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PagInAction from '@#/shared/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'EvaluationComponent',
  store,
  data () {
    return {
      id: 1,
      number: '',
      title: '',
      list: [],
      total: 0,
      current: 1
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
      params.append('title', self.title)
      params.append('page', p)
      db.postRequest('Institution/Plan/getAssess', params).then(res => {
        if (res.status === 1) {
          self.total = res.data.total
          self.list = res.data.list
        } else {
          console.log(res.msg)
        }
      })
    },
    clearData () {
      let self = this
      self.number = ''
      self.title = ''
      self.pagechange(1)
    },
    evaluaCallback (i) {
      let self = this
      if (i === undefined) {
        self.$emit('evaluaCallbacks', {
          id: self.id + 1,
          number: '',
          title: '',
          content: ''
        })
      } else {
        this.$emit('evaluaCallbacks', this.list[i])
      }
      $('#AddEvaluation').modal('hide')
    }
  },
  components: {PagInAction},
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
