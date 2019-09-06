<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">操作用户</div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">

                    <div class="form-group ml-10">
                        <router-link :to="{path:'/admin/user/edituser', query:{id: list.id}}" class="btn btn-default"><i
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

        <div class="clearfix">
            <div class="clearfix lh24 text-center" v-if="loading">数据加载中...</div>
            <div class="clearfix" v-if="Object.keys(list).length > 0">
                <form class="form-horizontal">
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">用户编号</label>
                                <div class="col-sm-8 lh34">{{list.number}}</div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label class="col-sm-4 control-label"><font class="cf00">*</font>用户名称</label>
                                <div class="col-sm-8 lh34">{{list.name}}</div>
                            </div>
                        </div>

                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label class="col-sm-4 control-label"><font class="cf00">*</font>所属机构</label>
                                <div class="col-sm-8 lh34">{{companys}}</div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">移动电话</label>
                                <div class="col-sm-8 lh34">{{list.phone}}</div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">邮箱</label>
                                <div class="col-sm-8 lh34">{{list.email}}</div>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">状态</label>
                                <div class="col-sm-8 lh34">{{list.status|state}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">创建时间</label>
                                <div class="col-sm-8 lh34">{{list.created_time}}</div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'ShowUser',
  data () {
    return {
      list: {},
      loading: true,
      companys: ''
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    let id = self.$route.query.id
    self.$nextTick(() => {
      setTimeout(function () {
        db.getRequest('Institution/User/detail', {
          id: id
        }).then(res => {
          if (res.status === 1) {
            self.list = res.data
            res.data.companys.map(item => {
              if (item.id === res.data.ins_company_id) {
                self.companys = item.name
              }
            })
          } else {
            self.layer.alert(res.msg, {icon: 2})
          }
          self.loading = false
        })
      }, 500)
    })
  }
}
</script>

<style scoped>

</style>
