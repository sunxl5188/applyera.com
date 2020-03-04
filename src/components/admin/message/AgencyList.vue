<template>
    <div>
        <div class="modal fade" id="messageJG">
            <div class="modal-dialog">
                <div class="modal-content modal-lg">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">选择机构</h4>
                    </div>
                    <div class="modal-body">
                        <div class="pad-20">
                            <form action="" method="post" role="form" class="form-inline">
                                <div class="form-group">
                                    <label>机构编号</label>
                                    <input type="text" name="number" v-model="number" class="form-control"
                                           placeholder="请输入">
                                </div>
                                <div class="form-group">
                                    <label>机构名</label>
                                    <input type="text" name="name" v-model="name" class="form-control"
                                           placeholder="请输入">
                                </div>

                                <button type="button" class="btn btn-primary ml-15" @click="pagechange">搜索</button>
                                <button type="reset" class="btn btn-default ml-15" @click="clearData">清空</button>
                            </form>
                            <div class="blk-20"></div>
                            <table class="table table-condensed table-hover table-bordered">
                                <thead>
                                <tr>
                                    <th width="15%">用户id</th>
                                    <th>机构编号</th>
                                    <th>机构名称</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,i) in list" :key="i" class="handPower" @click="setCompany(item)">
                                    <td>{{item.id}}</td>
                                    <td>{{item.number}}</td>
                                    <td>{{item.name}}</td>
                                </tr>
                                <tr v-if="list.length === 0">
                                    <td colspan="3" v-html="NoData"></td>
                                </tr>
                                </tbody>
                            </table>
                            <pagination :total="total" @pagechange="pagechange"></pagination>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
import pagination from '@#/shared/Pagination'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'AgencyList',
  store,
  data () {
    return {
      number: '',
      name: '',
      total: 0,
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
    self.pagechange()
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('page', p || 1)
      params.append('number', self.number)
      params.append('name', self.name)
      db.postRequest('Institution/Notice/getCompany', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    clearData () {
      this.number = ''
      this.name = ''
      this.pagechange()
    },
    setCompany (item) {
      this.$emit('AgencyCallback', item)
      $('#messageJG').modal('hide')
    }
  },
  components: {pagination}
}
</script>

<style scoped>

</style>
