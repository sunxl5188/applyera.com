<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">公告通知详情</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group ml-10">
                        <button type="button" class="btn btn-default" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" v-html="LoadingImg"></div>
        <div v-if="!loading">
            <div class="bdb-d">
                <h4>{{info.title}}</h4>
                <div class="clearfix lh30 c#999 pb-15">
                    <span class="div_vm mr-10">更新时间：{{info.last_time}} </span>
                    <span class="div_vm mr-10">分类:
                        <span v-if="info.type===1">紧急通知</span>
                        <span v-if="info.type===2">申请通知</span>
                        <span v-if="info.type===3">系统消息</span>
                        <span v-if="info.type===4">院校资讯</span>
                    </span>
                    <span class="div_vm mr-10">国家:{{info.country}}</span>
                    <span class="div_vm mr-10">共 {{info.attachment.length}} 个附件</span>
                </div>
            </div>

            <div class="clearfix pt-25 pb-25">
                <div v-html="info.content"></div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="panel-title">
                        <span>附件 ({{info.attachment.length}} 件，共 {{fileSize|bytesToSize}})</span>
                        <a :href="siteUrl+'/Institution/Notice/archiveDownload?id='+id" target="_blank" class="cded ml-10" v-if="info.attachment.length > 0">打包下载</a>
                    </div>
                </div>
                <div class="panel-body">
                    <dl>
                        <dd class="lh26" v-for="(item,i) in info.attachment" :key="i">{{item.name}}<span
                                class="c999">({{item.size|bytesToSize}})</span></dd>
                    </dl>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'MsgDetail',
  store,
  data () {
    return {
      loading: true,
      id: '',
      siteUrl: window.ajaxBaseUrl,
      fileSize: 0,
      info: {}
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    let id = self.$route.query.id || ''
    self.id = id
    if (id !== '') {
      let params = new URLSearchParams()
      params.append('id', id)
      self.loading = true
      db.getRequest('Institution/Notice/notifyDetail', params).then(res => {
        if (res.status === 1) {
          self.info = res.data
          let totalSize = 0
          res.data.attachment.map(item => {
            totalSize += parseFloat(item.size)
          })
          self.fileSize = totalSize

          self.$store.commit('uploadMsg', res.data.notify_count)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
        self.loading = false
      })
    } else {
      self.layer.alert('访问错误！', {
        icon: 2
      }, function (i) {
        self.layer.close(i)
        self.$route.back()
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .panel {
        &.panel-default {
            border:none;
            & .panel-title{
                & > a.cded{color:#428bca;}
            }
            & .panel-body {
                border:1px dashed #dedede;border-top:none;
                & dl {margin-bottom:0;}
            }
        }
    }
</style>
