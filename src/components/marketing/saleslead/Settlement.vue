<template>
  <div>
    <div :class="{hidden:name==='TentacleDetail'}">
      <div class="po_re schoolSearch">
        <input type="text" name="keywords" class="form-control" v-model="keyword" placeholder="搜索所有内容"
               autocomplete="off" @keyup.enter="pageChange()">
        <i class="iconfont handPower clearSearch" @click="keyword='';pageChange()"
           v-if="keyword!==''">&#xe7f6;</i>
        <button type="button" class="btn btn-primary btn-search" @click="pageChange()"></button>
        <button type="button" class="btn btn-default btn-Collapse" @click="retract()">收起筛选<i
            class="iconfont">&#xe688;</i>
        </button>
      </div>
      <div class="bda clearfix filterFollow mb-20">
        <table class="table filter">
          <tbody>
          <tr>
            <td width="10%" class="text-center"><b>结算时间</b></td>
            <td>
              <a href="javascript:void(0);" @click="start_time='';end_time='';type=1;pageChange()"
                 :class="type===1 && end_time === '' ? 'label label-primary' : 'label'">全部</a>
              <a href="javascript:void(0);" @click="start_time='';end_time='';type=2;pageChange()"
                 :class="type===2 && end_time === '' ? 'label label-primary' : 'label'">近三月</a>
              <a href="javascript:void(0);" @click="start_time='';end_time='';type=3;pageChange()"
                 :class="type===3 && end_time === '' ? 'label label-primary' : 'label'">近一年</a>
              <span id="customTime" contenteditable="true" data-placeholder="自定义时间段"
                    :class="type==='' && end_time !== ''?'active':''"></span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <table class="table table-customize">
        <thead>
        <tr>
          <th>触手姓名</th>
          <th>结算金额</th>
          <th>结算明细</th>
          <th>结算时间</th>
          <th>结算凭证</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, i) in list" :key="i" v-if="!loading">
          <td>
            <router-link :to="{path:'/marketing/saleslead/tentacledetail',query:{id:item.u_id}}" class="cded"
                         v-html="highlight(item.from_user, keyword)"></router-link>
          </td>
          <td>{{item.comm_total}}</td>
          <td>
            <span v-for="(items, k) in item.student_list" :key="k">{{items}}</span>
          </td>
          <td>{{item.created_time}}</td>
          <td>
            <a href="javascript:void(0);" v-if="item.is_proof===0" @click="uploadId=item.id;triggerUpload()">上传凭证</a>
            <div v-if="item.is_proof===1">
              <a href="javascript:void(0);" @click="viewPhotos(item.payment_proof)">查看</a>
              <a href="javascript:void(0);" class="ml-10" @click="deletePhoto(item.id)">删除</a>
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
      <div id="picker" style="position: absolute;left: -99999px;">上传凭证</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import WebUploader from '@@/js/webuploader/webuploader'
import PagInAction from '@#/shared/PagInAction'
import db from '@~/js/request'

export default {
  name: 'Settlement',
  data () {
    return {
      loading: true,
      name: '',
      keyword: '',
      type: 1,
      start_time: '',
      end_time: '',
      list: [],
      total: 0,
      current: 1,
      uploadId: ''
    }
  },
  mounted () {
    let self = this
    self.name = self.$route.name
    self.pageChange()
    self.$nextTick(() => {
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
      self.loading = true
      db.postRequest('/Institution/SourceSubmit/cltorCommList', params).then(res => {
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
    createUpload () {
      let self = this
      let uploader = WebUploader.create({
        auto: true,
        swf: 'static/js/webuploader/Uploader.swf',
        server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne',
        fileVal: 'file',
        pick: '#picker',
        file_id: 'file_ids',
        fileSingleSizeLimit: 1024 * 1024 * 20,
        duplicate: true,
        accept: {
          title: '',
          extensions: 'rar,zip,doc,docx,pdf,jpg',
          mimeTypes: '*/*'
        },
        formData: {func: 'comm_proof', fid: self.uploadId}
      })
      uploader.on('uploadSuccess', function () {
      })
      uploader.on('uploadFinished', function () {
        self.layer.alert('上传成功！', {icon: 1})
        self.pageChange(self.current)
      })
      uploader.on('error', function (handler) {
        if (handler === 'Q_TYPE_DENIED') {
          self.layer.alert('文件类型不正确！', {icon: 2})
        }
      })
    },
    triggerUpload () {
      this.createUpload()
      setTimeout(function () {
        $('input.webuploader-element-invisible').trigger('click')
      }, 200)
    },
    viewPhotos (arr) {
      let self = this
      let photo = {data: []}
      arr.map((item, i) => {
        photo.data.push({
          alt: '',
          pid: i,
          src: window.ajaxBaseUrl + item,
          thumb: ''
        })
      })
      self.layer.photos({
        photos: photo,
        anim: 5
      })
    },
    deletePhoto (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.postRequest('/Institution/SourceSubmit/commProofDel', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
            self.pageChange(self.current)
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 展开收起筛选
    retract () {
      let $this = $('.filterFollow')
      if ($this.attr('style') === undefined) {
        $this.height($this.outerHeight())
      }
      if ($this.height() > 0) {
        $this.addClass('hiddenS')
        $('.btn-Collapse').html('展开筛选<i class="iconfont">&#xe630;</i>')
      } else {
        $this.removeClass('hiddenS')
        $('.btn-Collapse').html('收起筛选<i class="iconfont">&#xe688;</i>')
      }
    }
  },
  components: {
    PagInAction
  },
  watch: {
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped lang="scss">
.filterFollow{
  -webkit-transition: all .3s ease 0s;-moz-transition: all .3s ease 0s;-ms-transition: all .3s ease 0s;transition: all .3s ease 0s;
  &.hiddenS{height:1px !important;overflow:hidden;}
  & table{margin-bottom:0;}
}
.filter {
  & tbody tr td {padding-top:10px;padding-bottom:10px;border:none;}

  & .label {
    margin-right:10px;color:#333;font-size:14px;

    &.label-primary {
      color:#fff;

      &:hover, &:focus {background-color:#39f;}
    }
  }

  & .active {background-color:#39f;color:#fff;line-height:22px;padding-left:.8rem;padding-right:.8rem;-webkit-border-radius:.25em;-moz-border-radius:.25em;border-radius:.25em;}
}
</style>
