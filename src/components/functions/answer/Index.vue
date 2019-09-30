<template>
  <div class="container-fluid bgWhite pt-25 pb-25">
    <div :class="{hidden:name!=='answer'}">
      <div class="clearfix pb-30">
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div class="headerTitle">题目作答</div>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
            <div class="form-group form-search">
              <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
              <i class="iconfont handPower clearSearch" @click="keyword='';pageChange()" v-if="keyword">&#xe7f6;</i>
              <input type="text" name="keywords" v-model="keyword" class="form-control"
                     placeholder="请输入关键字搜索"
                     style="padding-left:30px;"
                     @keyup.enter="pageChange()">
            </div>
            <div class="form-group ml-10">
              <div class="dropdown">
                <button class="btn btn-default filter"
                        type="button" data-toggle="dropdown"></button>
                <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                  <div class="pl-15 pr-15" style="width:180px;">
                    <form action="" method="POST" class="form-horizontal">
                      <div class="form-group">
                        <label>生成日期</label>
                        <input type="text" name="times" class="form-control" placeholder="请选择日期"/>
                      </div>
                      <div class="form-group">
                        <label>负责顾问</label>
                        <select class="form-control">
                          <option value="">请选择</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label>文书类型</label>
                        <select class="form-control">
                          <option value="">请选择</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label>作答状态</label>
                        <select class="form-control">
                          <option value="">请选择</option>
                        </select>
                      </div>
                      <div class="form-group text-center">
                        <button type="reset" class="btn btn-default" @click="clearData">重置
                        </button>
                        <button type="button" class="btn btn-primary ml-10"
                                @click="pageChange()">
                          开始筛选
                        </button>
                      </div>
                    </form>
                  </div>
                </ul>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group ml-10">
                <div class="dropdown">
                  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                          data-toggle="dropdown">
                    <i class="iconfont">&#xe73e;</i>
                    添加
                  </button>
                  <ul class="dropdown-menu dropdown-menu-right">
                    <li><router-link to="/functions/answer/addAnswer">添加文书</router-link></li>
                    <li><router-link to="/functions/answer/addLetter">添加推荐信</router-link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-customize">
        <thead>
        <tr>
          <th>学生姓名</th>
          <th>院校名称</th>
          <th>文书类别</th>
          <th>负责顾问</th>
          <th>作答状态</th>
          <th>
            创建时间
            <a href="javascript:void(0);"
               :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
               @click="listSort"></a>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>颜小龙 (YSL3229850)</td>
          <td>****</td>
          <td>院校文书</td>
          <td>颜小龙</td>
          <td>已完成</td>
          <td>2019-01-06</td>
          <td width="5%">
            <div class="dropdown">
              <a href="javascript:void(0);" data-toggle="dropdown"><i
                  class="iconfont">&#xe66b;</i></a>
              <ul class="dropdown-menu dropdown-menu-right">
                <li>
                  <router-link to="/functions/answer/detail">查看</router-link>
                </li>
                <li><a href="javascript:void(0);">删除</a></li>
              </ul>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <PagInAction :total="total" :current-page="current" @pagechange="pageChange"/>
    </div>
    <router-view />
  </div>
</template>

<script>
import PagInAction from '@#/PagInAction'
import db from '@~/js/request'

export default {
  name: 'Index',
  data () {
    return {
      loading: true,
      name: 'answer',
      keyword: '',
      list: [],
      total: 0,
      current: 1,
      time_sort: 0
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.name = self.$route.name
    })
  },
  methods: {
    pageChange (page) {
      let self = this
      let params = new URLSearchParams()
      params.append('page', page || 1)
      db.postRequest('', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.current = page || 1
      })
    },
    clearData () {
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
    }
  },
  components: { PagInAction },
  watch: {
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped>

</style>
