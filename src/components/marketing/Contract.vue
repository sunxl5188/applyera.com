<template>
    <div>
        <div v-show="name==='contract'">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle div_vm">合同管理</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <a href="#" class="c999 ml-10" data-toggle="modal" data-backdrop="static"
                           data-target="#modalaract">
                            <i class="iconfont">&#xe999;</i>
                            <span class="div_vm lh34">如何设置？</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modalaract">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">如何设置</h4>
                        </div>
                        <div class="modal-body">
                            <p>欢迎您使用申学纪电子合同功能，本功能旨在帮助机构及顾问老师将合同签署功能线上化，减少线下合同签署寄送的时间。本功能需与线上支付功能一起开通。</p>
                            <p>STEP 1 上传机构现有的合同</p>
                            <p>STEP 2 在产品管理模块关联相应的合同</p>
                            <p><img src="../../../static/images/u930.jpg" alt="" class="img-responsive"></p>
                            <p>STEP 3 学生在购买服务的时候，关联的合同将被激活。合同签署完成后，顾问老师可以在申学纪后台查看并下载，</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">知道了</button>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="nav nav-tabs"><!--nav-justified-->
                <li :class="{active:tab===1}">
                    <router-link to="/marketing/contract">合同模板</router-link>
                </li>
                <li :class="{active:tab===2}">
                    <router-link to="/marketing/contract/recording">签署记录</router-link>
                </li>
                <span class="pull-right">
                <div id="contractPicker" class="webuploader-btn"><i class="iconfont">&#xe640;</i> 上传合同</div>
            </span>
            </ul>
            <div class="blk-15"></div>
            <table class="table table-customize">
                <thead>
                <tr>
                    <th>合同标题</th>
                    <th>签署次数</th>
                    <th>发布者</th>
                    <th>更新时间
                        <a href="javascript:void(0);"
                           :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                           @click="listSort"></a>
                    </th>
                    <th class="w15"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td>
                        <router-link :to="{path:'/marketing/contract/detail', query:{ id:item.id }}">{{item.yht_name}}
                        </router-link>
                    </td>
                    <td>{{item.sign_count}}</td>
                    <td>{{item.user_name}}</td>
                    <td>{{item.add_time}}</td>
                    <td class="text-center">
                        <a href="#" @click="showContract(item.yht_path)">查看</a>
                        <a href="javascript:void(0);" class="ml-10" @click="downFile(item.yht_path, item.yht_no)">下载</a>
                        <!--<a href="javascript:void(0);" @click="deleteId(item.id)">删除</a>-->
                    </td>
                </tr>
                <tr v-if="loading">
                    <td colspan="5" v-html="LoadingImg"></td>
                </tr>
                <tr v-if="!loading && list.length===0">
                    <td colspan="5" v-html="NoData"></td>
                </tr>
                </tbody>
            </table>
            <Pagination :total="total" :currentPage="current" @pagechange="pageChange"></Pagination>
            <div class="modal fade modalShow" v-if="audit_status===0">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body text-center  pt-50 pb-50">
                            <p>开通线上支付功能需完成实名认证并由申学纪</p>
                            <p>为你开通微信支付商户号，请联系客服开通</p>
                            <div class="clearfix pt-15">
                                <router-link to="/home/company/authDetail" class="btn btn-primary">前往认证</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--查看合同-->
            <div class="modal fade bs-example-modal-lg" id="modal-contract">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">查看合同</h4>
                        </div>
                        <div class="modal-body">
                            <iframe :src="'https://view.officeapps.live.com/op/view.aspx?src='+wordUrl" width="100%"
                                    height="100%" frameborder='0' v-if="wordUrl"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import JsZip from 'jszip'
import saveAs from 'file-saver'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import db from '@~/js/request'
import Pagination from '@#/shared/Pagination'
import * as _ from 'lodash'
import webupload from '@~/js/webupload'

export default {
  name: 'Contract',
  data () {
    return {
      name: 'contract',
      tab: 1,
      loading: true,
      time_sort: 0,
      current: 1,
      total: 0,
      list: [],
      audit_status: 1,
      wordUrl: ''
    }
  },
  mounted () {
    let self = this
    self.name = self.$route.name || ''
    self.$nextTick(() => {
      $('#modal-contract .modal-body').height($(window).height() - 200)
      self.pageChange()
      _.delay(() => {
        webupload({
          assign: self.fid,
          pick: {
            id: '#contractPicker',
            multiple: false
          },
          accept: {
            title: '',
            extensions: 'doc,docx',
            mimeTypes: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          },
          formData: { func: 'yht_temp' },
          uploadSuccess: (file, res) => { },
          uploadFinished: (msg) => {
            if (msg === '') {
              self.layer.alert('上传成功！', { icon: 1 })
            } else {
              self.layer.alert(msg, { icon: 2 })
            }
          },
          error: (e) => {
            if (e === 'Q_TYPE_DENIED') {
              self.layer.alert('文件类型不正确！', { icon: 2 })
            }
            if (e === 'F_EXCEED_SIZE') {
              self.layer.alert('文件大小超过2MB限制！', { icon: 2 })
            }
          }
        })
      }, 10)
    })
  },
  methods: {
    pageChange (page) {
      let self = this
      let p = page || 1
      let params = new URLSearchParams()
      params.append('page', p)
      params.append('time_sort', self.time_sort)
      db.postRequest('/Institution/PayProd/tempList', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.list
          self.total = res.data.total
          self.audit_status = res.data.audit_status
          _.delay(() => {
            if (res.data.audit_status === 0) {
              $('.modalShow').css({
                display: 'block',
                opacity: 1,
                height: $(window).height()
              })
            }
          }, 200)
        } else {
          console.log(res.msg)
        }
        self.current = p
        self.loading = false
      })
    },
    deleteId () {},
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
    showContract (url) {
      let self = this
      self.wordUrl = url
      $('#modal-contract').modal({ backdrop: 'static', show: true })
    },
    downFile (imgUrl, downName) {
      let self = this
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
              saveAs(content, downName + '.zip')
            })
          }
          if (this.status === 404) {
            self.layer.alert('未找到相关文件', { icon: 2 })
          }
        }
        xhr.send()
      } else {
        console.log('浏览器不支持XMLHTTP')
      }
    }
  },
  components: { Pagination },
  watch: {
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped lang="less">
.modal {
    &.modalShow {
        position: absolute;
        background: rgba(0, 0, 0, .5);

        & .modal-dialog {
            position: absolute;
            width: 350px;
            height: 220px;
            left: 50%;
            margin-left: -175px;
            top: 50%;
            margin-top: -80px;
        }
    }
}

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
</style>
