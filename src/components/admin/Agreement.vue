<template>
    <div>
        <div v-show="name==='agreement'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">服务协议</div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group form-search">
                            <i class="iconfont" style="right:auto;left:0;">&#xe741;</i>
                            <i class="iconfont handPower clearSearch" @click="keywords=''" v-if="keywords">&#xe7f6;</i>
                            <input type="text" name="keywords" v-model="keywords" class="form-control"
                                   placeholder="搜索"
                                   style="padding-left:30px;">
                        </div>
                    </div>

                </div>
            </div>
            <table class="table table-customize">
                <thead>
                <tr>
                    <th>协议标题</th>
                    <th class="w25">更新时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td>
                        <router-link :to="{path:'/admin/agreement/detail',query:{id:item.id}}"><span
                                v-html="highlight(item.title,keywords)"></span></router-link>
                    </td>
                    <td>{{item.add_time}}</td>
                </tr>
                <tr v-if="loading">
                    <td colspan="2" v-html="LoadingImg"></td>
                </tr>
                <tr v-if="!loading && list.length===0">
                    <td colspan="2" v-html="NoData"></td>
                </tr>
                </tbody>
            </table>
            <Pagination :total="total" :currentPage="current" @pagechange="pageChange"></Pagination>
        </div>
        <router-view />
    </div>
</template>

<script>
import * as _ from 'lodash'
import Pagination from '@#/shared/Pagination'
import db from '@~/js/request'
export default {
  name: 'Agreement',
  data () {
    return {
      loading: true,
      name: 'agreement',
      keywords: '',
      list: [],
      current: 1,
      total: 0
    }
  },
  created () {
    this.debouncePagechange = _.debounce(this.pageChange, 1000)
  },
  mounted () {
    let self = this
    self.name = self.$route.name
    self.$nextTick(() => {
      self.pageChange()
    })
  },
  methods: {
    pageChange (page) {
      let self = this
      let p = page || 1
      let params = new URLSearchParams()
      params.append('page', p)
      db.postRequest('/Institution/Service/lists', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.current = p
        self.loading = false
      })
    }
  },
  components: { Pagination },
  watch: {
    $route (to, from) {
      let self = this
      self.name = to.name
      if (to.name === 'agreement') {
        self.pageChange(self.current)
      }
    },
    keywords () {
      this.debouncePagechange()
    }
  }
}
</script>

<style scoped>

</style>
