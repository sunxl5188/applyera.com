<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle div_vm">合同管理</div>
                </div>
            </div>
        </div>
        <ul class="nav nav-tabs"><!--nav-justified-->
            <li :class="{active:tab===1}">
                <router-link to="/marketing/contract">合同模板</router-link>
            </li>
            <li :class="{active:tab===2}">
                <router-link to="/marketing/contractRecor">签署记录</router-link>
            </li>
            <span class="pull-right form-inline">
                <div class="form-group form-search">
                    <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                    <i class="iconfont handPower clearSearch" @click="keywords=''"
                       v-if="keywords!==''">&#xe7f6;</i>
                    <input type="text" name="student_name" v-model="keywords" class="form-control"
                           placeholder="请输入学生姓名搜索"
                           style="padding-left:30px;">
                </div>
                <div class="form-group ml-10">
                  <button type="button" class="btn btn-default btn-Collapse" @click="retract()">收起筛选<i
                          class="iconfont">&#xe688;</i>
                  </button>
                </div>
            </span>
        </ul>
        <div class="blk-15"></div>
        <div class="bda clearfix filterFollow mb-15">
            <table class="table filter">
                <tbody>
                <tr>
                    <td width="10%" class="text-center"><b>签署时间</b></td>
                    <td>
                        <a href="javascript:void(0);" :class="{'label-primary':type===1 && end_time === ''}"
                           class="label">不限</a>
                        <a href="javascript:void(0);" :class="{'label-primary':type===2 && end_time === ''}"
                           class="label">本周</a>
                        <a href="javascript:void(0);" :class="{'label-primary':type===3 && end_time === ''}"
                           class="label">本月</a>
                        <a href="javascript:void(0);" :class="{'label-primary':type===3 && end_time === ''}"
                           class="label">本季度</a>
                        <span id="customTime" contenteditable="true" data-placeholder="自定义时间段"
                              :class="type==='' && end_time !== ''?'active':''"></span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="clearfix pt-15 pb-15">
            <span class="pull-left">共有 {{total}} 条记录</span>
            <span class="pull-right">
                <button type="button" class="btn btn-default" @click="batchDown">批量下载</button>
            </span>
        </div>
        <table class="table table-customize">
            <thead>
            <tr>
                <th></th>
                <th>合同标题</th>
                <th>签署者</th>
                <th>签署人联系电话</th>
                <th>
                    签署时间
                    <a href="javascript:void(0);"
                       :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                       @click="listSort"></a>
                </th>
                <th class="w15"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" name="id" id="id+i" value="item.id" class="custom-control-input">
                        <label class="custom-control-label" for="id+i"></label>
                    </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-center">
                    <a href="javascript:void(0);" @click="showContract('2003021740433081')">查看</a>
                    <a href="javascript:void(0);" class="ml-10" @click="downFile(1)">下载</a>
                </td>
            </tr>
            <tr v-if="loading">
                <td colspan="6" v-html="LoadingImg"></td>
            </tr>
            <tr v-if="!loading && list.length===0">
                <td colspan="6" v-html="NoData"></td>
            </tr>
            </tbody>
        </table>
        <Pagination :total="total" :currentPage="current" @pagechange="pageChange"></Pagination>
        <!--查看合同-->
        <div class="modal fade bs-example-modal-lg" id="modal-contract-recor">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">查看合同</h4>
                    </div>
                    <div class="modal-body">
                        <iframe :src="contractUrl" width="100%" height="100%" frameborder='0'></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@#/shared/Pagination'
import db from '@~/js/request'

export default {
  name: 'Contaract-recor',
  data () {
    return {
      loading: true,
      appId: '',
      appKey: '',
      tab: 2,
      keywords: '',
      type: '',
      start_time: '',
      end_time: '',
      time_sort: 0,
      list: [],
      total: 0,
      current: 1,
      contractUrl: ''
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      $('#modal-contract-recor .modal-body').height($(window).height() - 200)
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
      let p = page || 1
      let params = new URLSearchParams()
      params.append('page', p)
      db.postRequest('', params).then(res => {
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
    retract () {},
    listSort () {
      let self = this
      if (self.time_sort === 0) {
        self.time_sort = 1
      } else if (self.time_sort === 1) {
        self.time_sort = 2
      } else if (self.time_sort === 2) {
        self.time_sort = 1
      }
      self.pageChange(self.current)
    },
    showContract (contractId) {
      let self = this
      db.postRequest('/Institution/Yht/getYhtConfig', {}).then(res => {
        if (res.status === 1) {
          self.appId = res.data.appId
          self.appKey = res.data.appKey
          // 初始化YHT
          /*eslint-disable*/
          YHT.init(self.appId, self.tokenUnableListener)
          YHT.queryContract(function successFun (url) {
            self.contractUrl = url
            $('#modal-contract-recor').modal({ backdrop: 'static', show: true })
          }, function (error) {
            self.layer.alert(error, { icon: 2 })
          }, contractId)
        } else {
          console.log(res.msg)
        }
      })
    },
    tokenUnableListener (obj) {
      let self = this
      $.ajax({
        type: 'POST',
        url: 'https://api.yunhetong.com/api/auth/login',
        cache: false,
        dataType: 'json',
        data: JSON.stringify({
          'appId': self.appId,
          'appKey': self.appKey
        }), // 第三方获取token需要的参数
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        },
        success: function (data, textStatus, request) {
          /*eslint-disable*/
          YHT.setToken(request.getResponseHeader('token'))
          YHT.do(obj)
        },
        error: function (data) {
          console.log(data)
        }
      })
    },
    downFile (imgUrl) {
      let xhr
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        /*eslint-disable*/
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
      if (xhr != null) {
        xhr.open('get', imgUrl, true)
        xhr.responseType = 'blob'
        xhr.onload = function () {
          if (this.status === 200) {
            let fineUrl = this.responseURL
            let fileName = fineUrl.substr(fineUrl.lastIndexOf('/') + 1, fineUrl.length)
            let zip = new JsZip()
            zip.file(fileName, this.response)
            zip.generateAsync({ type: 'blob' })
            .then(function (content) {
              saveAs(content, 'download.zip')
            })
          }
        }
        xhr.send()
      } else {
        console.log('浏览器不支持XMLHTTP')
      }
    },
    batchDown () {

    }
  },
  components: { Pagination },
  watch: {}
}
</script>

<style scoped lang="less">
.nav.nav-tabs {
    border: none;

    & > li {
        margin-bottom: 0;

        & a {
            background: #fff !important;
            border: none;
        }

        &:after {
            content: '';
            width: 60%;
            height: 2px;
            background-color: transparent;
            display: block;
            position: absolute;
            left: 20%;
            bottom: 0;
        }

        &.active {
            &:after {
                background-color: #39f;
            }

            & a {
                border: none;
            }
        }
    }
}

.filter {
    margin-bottom: 0;

    & tbody tr td {
        padding-top: 10px;
        padding-bottom: 10px;
        border: none;
    }

    & tbody tr:first-of-type td {
        padding-top: 20px;
    }

    & tbody tr:last-of-type td {
        padding-bottom: 20px;
    }

    & .label {
        margin-right: 10px;
        color: #333;
        font-size: 14px;

        &.label-primary {
            color: #fff;

            &:hover, &:focus {
                background-color: #39f;
            }
        }
    }

    #customTime {
        &:before {
            color: #333;
            cursor: pointer;
        }
    }

    & .active {
        background-color: #39f;
        color: #fff;
        line-height: 22px;
        padding-left: .8rem;
        padding-right: .8rem;
        -webkit-border-radius: .25em;
        -moz-border-radius: .25em;
        border-radius: .25em;
    }
}
</style>
