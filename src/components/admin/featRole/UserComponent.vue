<template>
    <div>
        <div class="modal fade bs-example-modal-lg" id="UserComponent">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">关联用户</h4>
                    </div>
                    <div class="modal-body">
                        <div class="clearfix form-inline pb-20">
                            <div class="form-group">
                                <label>用户编号</label>
                                <input type="text" name="user_number" class="form-control" placeholder="请输入"
                                       v-model="user_number">
                            </div>
                            <div class="form-group">
                                <label>用户名</label>
                                <input type="text" name="user_name" class="form-control" placeholder="请输入"
                                       v-model="user_name"/>
                            </div>
                            <button type="button" class="btn btn-primary ml-15" @click="pagechange(1)">搜索</button>
                            <button type="reset" class="btn btn-default ml-15" @click="clearData">清空</button>
                        </div>
                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>用户id</th>
                                <th>用户编号</th>
                                <th>用户名称</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="handPower" v-for="(item,i) in list" :key="i" @click="parentCallback(item)">
                                <td>{{item.id}}</td>
                                <td>{{item.number}}</td>
                                <td>{{item.name}}</td>
                            </tr>
                            <tr v-if="list.length === 0">
                                <td colspan="3" v-html="NoData"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <PagInAction :total="total" :display="display" @pagechange="pagechange"
                                 v-if="list.length > 0"></PagInAction>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
import PagInAction from '@#/shared/PagInAction'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'UserComponent',
  store,
  data () {
    return {
      loading: true,
      user_number: '',
      user_name: '',
      display: 10,
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
    self.pagechange(1)
  },
  methods: {
    pagechange (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('user_number', self.user_number)
      params.append('user_name', self.user_name)
      params.append('page', p)
      self.loading = true
      db.postRequest('Institution/RoleData/choseUser', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
        self.loading = false
      })
    },
    clearData () {
      this.user_number = ''
      this.user_name = ''
      this.pagechange(1)
    },
    parentCallback (obj) {
      this.$emit('UserCallback', obj)
      $('#UserComponent').modal('hide')
    }
  },
  components: {
    PagInAction
  }
}
</script>

<style scoped>

</style>
