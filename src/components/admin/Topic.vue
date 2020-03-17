<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">题目更新</div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group form-search">
                        <i class="iconfont" style="right:auto;left:0;">&#xe741;</i>
                        <i class="iconfont handPower clearSearch" @click="keywords=''" v-if="keywords">&#xe7f6;</i>
                        <input type="text" name="keywords" v-model="keywords" class="form-control"
                               placeholder="搜索"
                               style="padding-left:30px;"
                               @keyup.enter="pageChange()">
                    </div>
                    <div class="form-group ml-10">
                        <div class="dropdown">
                            <button class="btn btn-default filter" type="button" data-toggle="dropdown"></button>
                            <ul class="dropdown-menu dropdown-menu-right filterOption" style="padding:15px 20px;">
                                <div class="pl-15 pr-15" style="width:180px;">
                                    <form action="" method="POST" class="form-horizontal">
                                        <div class="form-group hidden">
                                            <label>用户名称</label>
                                            <input type="text" class="form-control" placeholder="请输入信息"/>
                                        </div>
                                        <div class="form-group text-center">
                                            <button type="reset" class="btn btn-default" @click="clearData">重置
                                            </button>
                                            <button type="button" class="btn btn-primary ml-10"
                                                    @click="pageChange">
                                                开始筛选
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default">更新</button>
                    </div>
                </div>

            </div>
        </div>
        <table class="table table-hover table-customize">
            <thead>
            <tr>
                <th class="w5"></th>
                <th>更新类型</th>
                <th>更新内容</th>
                <th>更新顾问</th>
                <th>更新机构</th>
                <th>状态</th>
                <th>更新时间</th>
                <th class="w5"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in list" :key="i">
                <td>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" name="id[]" :id="'id'+i" :value="item.id" class="custom-control-input">
                    <label class="custom-control-label" :for="'id'+i">&nbsp;</label>
                  </div>
                </td>
                <td>
                    {{item.is_custom===0?'题目更新':'自定义更新'}}
                </td>
                <td>
                    <a href="#" class="cded" @click="updataLayer(item)">
                        {{item.school_name+','+item.major_name}}
                    </a>
                </td>
                <td>{{item.user_name}}</td>
                <td>{{item.company_name}}</td>
                <td>已更新</td>
                <td>{{item.created_time}}</td>
                <td class="text-center">
                    <div class="dropdown">
                        <a href="javascript:void(0);" data-toggle="dropdown"><i class="iconfont">&#xe66b;</i></a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><a href="#" @click="updataLayer(item)">查看</a></li>
                            <li><a href="#" @click="updataId(item.id)">更新</a></li>
                            <li><a href="#" @click="deleteId(item.id)">删除</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
            <tr v-if="loading">
                <td colspan="8" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="!loading && list.length===0">
                <td colspan="8" v-html="NoData"></td>
            </tr>
            </tbody>
        </table>
        <pagination :total="total" :currentPage="current" @pagechange="pageChange"></pagination>
        <!--弹窗-->
        <div class="modal fade bs-example-modal-lg" id="modalTopic">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">更新详情</h4>
                    </div>
                    <div class="modal-body">
                        <div class="pl-50 pr-50">
                            <form action="" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                                <div class="form-inline">
                                    <div class="mb-15">
                                        <div class="form-group">
                                            <label>学校名</label>
                                            <span>{{upData.school_name}}</span>
                                        </div>
                                    </div>
                                    <div class="mb-15">
                                        <div class="form-group">
                                            <label>专业名</label>
                                            <span>{{upData.major_name}}</span>
                                        </div>
                                    </div>
                                    <div class="mb-15">
                                        <div class="form-group">
                                            <label>学校链接</label>
                                            <span><a href="javascript:void(0);" target="_blank" class="cded">点击前往</a></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>个人陈述</label>
                                    <textarea name="" class="form-control" placeholder=""></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Writing Sample</label>
                                    <textarea name="" class="form-control" placeholder=""></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">更新</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import Pagination from '@#/shared/Pagination'
import db from '@~/js/request'

export default {
  name: 'Topic',
  data () {
    return {
      loading: true,
      keywords: '',
      total: 0,
      current: 1,
      list: [],
      idArr: [],
      upData: {
        id: '',
        major_name: '',
        school_name: ''
      }
    }
  },
  created () {
    this.debouncedPagechange = _.debounce(this.pageChange, 1000)
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.pageChange()
      $(document).on('click', '[name="id[]"]', function () {
        let val = $(this).val()
        let isCheck = $(this).is(':checked')
        if (isCheck) {
          self.idArr.push(val)
        } else {
          self.idArr.map((item, i) => {
            if (item === val) {
              self.idArr.splice(i, 1)
            }
          })
        }
      })
    })
  },
  methods: {
    pageChange (page) {
      let self = this
      let p = page || 1
      let params = new URLSearchParams()
      self.loading = true
      params.append('page', p)
      db.postRequest('/Institution/Document/admCheckList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
        } else {
          console.log(res.msg)
        }
        self.current = p
        self.loading = false
      })
    },
    clearData () {

    },
    updataId (id) {

    },
    updataLayer (data) {
      this.upData = data
      _.delay(function () {
        $('#modalTopic').modal({
          backdrop: 'static',
          show: true
        })
      }, 300)
    },
    validateBeforeSubmit () {},
    deleteId (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.postRequest('', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, {icon: 1})
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    }
  },
  components: { Pagination },
  watch: {
    keywords () {
      this.debouncedPagechange()
    }
  }
}
</script>

<style scoped>

</style>
