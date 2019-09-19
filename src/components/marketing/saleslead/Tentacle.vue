<template>
    <div>
        <div :class="{hidden:name!=='saleslead'}">
            <div class="po_re">
                <div class="col-sm-4 po_ab" style="right:-15px;top: -60px;">
                    <div class="form-group form-search">
                        <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                        <i class="iconfont handPower clearSearch" autocomplete="off" v-if="keyword" @click="keyword='';pageChange()">&#xe7f6;</i>
                        <input type="text" name="keyword" class="form-control"
                               placeholder="搜索所有内容"
                               style="padding-left:30px;" v-model="keyword" @keyup.enter="pageChange()">
                    </div>
                </div>
            </div>
            <table class="table bdl bdr bdb filter">
                <tbody>
                <tr>
                    <td width="10%" class="text-center"><b>加入时间</b></td>
                    <td>
                        <a href="javascript:void(0);" @click="start_time='';end_time='';type=1;pageChange()" :class="type===1 && end_time === '' ? 'label label-primary' : 'label'">全部</a>
                        <a href="javascript:void(0);" @click="start_time='';end_time='';type=2;pageChange()" :class="type===2 && end_time === '' ? 'label label-primary' : 'label'">近三月</a>
                        <a href="javascript:void(0);" @click="start_time='';end_time='';type=3;pageChange()" :class="type===3 && end_time === '' ? 'label label-primary' : 'label'">近一年</a>
                        <span id="customTime" contenteditable="true" data-placeholder="自定义时间段" :class="type==='' && end_time !== ''?'active':''"></span>
                    </td>
                </tr>
                </tbody>
            </table>
            <table class="table table-customize">
                <thead>
                <tr>
                    <th width="5%"></th>
                    <th>触手姓名</th>
                    <th>联系电话</th>
                    <th>累计线索数</th>
                    <th>签单数</th>
                    <th>
                        加入时间
                        <a href="javascript:void(0);"
                           :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                           @click="listSort"></a>
                    </th>
                    <th width="5%"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in list" :key="i" v-if="!loading">
                    <td><input type="checkbox" name="id[]" value=""></td>
                    <td>
                        <router-link :to="{path:'/marketing/saleslead/tentacledetail',query:{id:item.id}}" class="cded" v-html="highlight(item.name, keyword)"></router-link>
                    </td>
                    <td>{{item.phone}}</td>
                    <td>{{item.s_total}}</td>
                    <td>{{item.s_count}}</td>
                    <td>{{item.created_time}}</td>
                    <td>
                        <div class="dropdown">
                            <a href="javascript:void(0);" data-toggle="dropdown"><i
                                    class="iconfont">&#xe66b;</i></a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><router-link :to="{path:'/marketing/saleslead/tentacledetail',query:{id:item.id}}">查看</router-link></li>
                                <li><a href="javascript:void(0);" @click="setState(item.id, 2)" v-if="item.status===1">禁用</a></li>
                                <li><a href="javascript:void(0);" @click="setState(item.id, 1)" v-if="item.status===2">启用</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr v-if="loading">
                    <td colspan="7" v-html="LoadingImg()"></td>
                </tr>
                <tr v-if="!loading && list.length === 0">
                    <td colspan="7" v-html="NoData()"></td>
                </tr>
                </tbody>
            </table>
            <PagInAction :total="total" :current-page="current" @pagechange="pageChange"></PagInAction>
        </div>
        <router-view />
    </div>
</template>

<script>
import PagInAction from '@#/PagInAction'
import db from '@~/js/request'
export default {
  name: 'Tentacle',
  data () {
    return {
      name: 'saleslead',
      loading: true,
      keyword: '',
      type: 1,
      start_time: '',
      end_time: '',
      time_sort: 0,
      list: [],
      total: 0,
      current: 1
    }
  },
  mounted () {
    let self = this
    self.pageChange()
    self.$nextTick(() => {
      self.name = self.$route.name
      self.laydate.render({
        elem: '#customTime',
        type: 'date',
        range: true,
        done: (value) => {
          let date = value.split(' - ')
          self.start_time = date[0]
          self.end_time = date[1]
          self.type = ''
          self.pageChange()
        }
      })
    })
  },
  methods: {
    pageChange (page) {
      let self = this
      let params = new URLSearchParams()
      params.append('page', page || 1)
      params.append('keywords', self.keyword)
      params.append('type', self.type)
      params.append('start_time', self.start_time)
      params.append('end_time', self.end_time)
      params.append('time_sort', self.time_sort)
      self.loading = true
      db.postRequest('/Institution/SourceSubmit/cltorList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.current = page || 1
        self.loading = false
      })
    },
    listSort () {
      let self = this
      if (self.time_sort === 0) {
        self.time_sort = 1
      } else if (self.time_sort === 1) {
        self.time_sort = 2
      } else if (self.time_sort === 2) {
        self.time_sort = 1
      }
      self.pageChange()
    },
    setState (id, state) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('state', state)
      db.postRequest('/Institution/SourceSubmit/cltorIce', params).then(res => {
        if (res.status === 1) {
          self.list.map((item, i) => {
            if (item.id === id) {
              self.list[i]['status'] = state
            }
          })
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    }
  },
  components: {
    PagInAction
  },
  watch: {
    $route (to, from) {
      this.name = to.name
      if (this.name === 'saleslead') {
        this.pageChange(this.current)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filter{
    & tbody tr td{padding-top:15px;padding-bottom:15px;}
    & .label{
        margin-right:10px;color:#333;
        &.label-primary{
            color:#fff;
            &:hover,&:focus{background-color:#39f;}
        }
    }
    & .active{background-color:#39f;color:#fff;line-height:22px;padding-left:.8rem;padding-right:.8rem;-webkit-border-radius:.25em;-moz-border-radius:.25em;border-radius:.25em;}
}
</style>
