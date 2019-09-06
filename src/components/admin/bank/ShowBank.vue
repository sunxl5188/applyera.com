<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">银行档案</div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">

                    <div class="form-group ml-10">
                        <router-link :to="{path:'/admin/bank/editbank',query:{id:list.id}}" class="btn btn-default"><i
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
            <form method="POST" id="addForm" class="form-horizontal" autocomplete="off"
                  @click.prevent="validateBeforeSubmit">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">银行编号</label>
                            <div class="col-sm-8 lh34" v-text="list.number"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label"><font class="cf00">*</font>银行名称</label>
                            <div class="col-sm-8 lh34" v-text="list.name"></div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="col-sm-4 control-label">状态</label>
                            <div class="col-sm-8 lh34">{{list.status === 1 ? "启用":"禁用"}}</div>
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
                </div>

            </form>
        </div>

    </div>
</template>

<script>
import db from '@~/js/request'
import store from '@/vuex/Store'

export default {
  name: 'ShowBank',
  data () {
    return {
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
    let id = self.$route.query.id
    self.$nextTick(() => {
      setTimeout(function () {
        db.getRequest('Institution/Bank/detail', {id: id}).then(res => {
          if (res.status === 1) {
            self.list = res.data
          }
        })
      }, 500)
    })
  }
}
</script>

<style scoped>

</style>
