<template>
    <div>
        <div class="modal fade bs-example-modal-lg" id="StudentComponent">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">选择学生档案</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-inline" role="form">

                            <div class="form-group">
                                <label>学生名称</label>
                                <input type="text" class="form-control" name="" placeholder="模糊搜索"
                                       v-model="studentName">
                            </div>
                            <div class="form-group ml-20">
                                <label>联系电话</label>
                                <input type="text" class="form-control" name="" placeholder="" v-model="phone">
                            </div>
                            <button type="button" class="btn btn-primary ml-15" @click="pagechange(1)">搜索</button>
                            <button type="reset" class="btn btn-default ml-15" @click="clearData">清空</button>
                        </form>
                        <div class="blk25"></div>
                        <div class="table-responsive">
                            <table class="table table-hover table-condensed table-bordered table-text-over">
                                <thead>
                                <tr>
                                    <th>学生名称</th>
                                    <th>档案编号</th>
                                    <th>性别</th>
                                    <th>联系电话</th>
                                    <th>创建时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, i) in list" :key="i" class="handPower" @click="studenData(list[i])">
                                    <td>{{item.name}}</td>
                                    <td>{{item.number}}</td>
                                    <td>----</td>
                                    <td>{{item.phone}}</td>
                                    <td>{{item.create_time}}</td>
                                </tr>
                                <tr v-if="list.length === 0">
                                    <td colspan="5" v-html="NoData"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <pagination :total="total" :current-page='current' :display="display"
                                     @pagechange="pagechange"/>
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
  name: 'StudentComponent',
  store,
  data () {
    return {
      studentName: '',
      phone: '',
      total: 0,
      current: 1,
      display: 10,
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
      params.append('name', self.studentName)
      params.append('phone', self.phone)
      params.append('page', p)
      self.loading = true
      db.postRequest('Institution/Plan/getStudent', params).then(res => {
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
      self.studentName = ''
      self.phone = ''
      self.pagechange(1)
    },
    studenData (obj) {
      this.$emit('setStuden', obj)
      $('#StudentComponent').modal('hide')
    }
  },
  components: {pagination}
}
</script>

<style scoped>

</style>
