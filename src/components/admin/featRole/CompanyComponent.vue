<template>
    <div>
        <!--所属机构-->
        <div class="modal fade" id="mechanism">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">所属机构</h4>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered table-condensed table-text-over">
                                <thead>
                                <tr>
                                    <th>机构编号</th>
                                    <th>机构名称</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,i) in CompanyList" :key="i" class="handPower" @click="setCompany(item)">
                                    <td>{{item.number}}</td>
                                    <td>{{item.name}}</td>
                                </tr>
                                <tr v-if="CompanyList.length === 0">
                                    <td colspan="2" v-html="NoData"></td>
                                </tr>
                                </tbody>
                            </table>
                            <PagInAction :display="display" :total="total" @pagechange="getCompany"></PagInAction>
                        </div>
                    </div>
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
  name: 'CompanyComponent',
  store,
  data () {
    return {
      display: 10,
      total: 0,
      CompanyList: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.getCompany(1)
  },
  methods: {
    getCompany (p) {
      // 关联所属机构
      let self = this
      let params = new URLSearchParams()
      params.append('page', p)
      db.postRequest('Institution/RoleFunc/getCompany', params).then(res => {
        if (res.status === 1) {
          self.CompanyList = res.data.list
          self.total = res.data.total
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    setCompany (obj) {
      $('#mechanism').modal('hide')
      this.$emit('companyCallback', obj)
    }
  },
  components: {PagInAction}
}
</script>

<style scoped>

</style>
