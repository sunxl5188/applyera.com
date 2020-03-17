<template>
    <div class="modal fade" id="sendInfo">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center">请将以下信息复制给学生,学生可以凭账号密码查看</h4>
                </div>
                <div class="modal-body">
                    <div class="clearfix bda pad-15" id="copyContent">
                        <p>登录帐号：{{info.acc}}</p>
                        <p>登录密码： {{info.pwd}}</p>
                        <p>登录地址：{{webSite}}/?cid={{info.cid}}</p>
                    </div>
                    <div class="clearfix text-center pt-20">
                        <button type="button" class="btn btn-primary copyBtn" data-clipboard-target="#copyContent"
                                @click="CopyText">一键复制
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
  name: 'ShareIt',
  data () {
    return {
      webSite: ''
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    let self = this
    let website = window.location.origin
    if (website.indexOf('localhost') >= 0) {
      self.webSite = website
    } else {
      self.webSite = 'https://student.' + website.split('.')[1] + '.' + website.split('.')[2]
    }
    self.$nextTick(() => {
      self.copyBtn = new Clipboard('.copyBtn')
    })
  },
  methods: {
    // 复制文本
    CopyText () {
      let self = this
      let clipboard = self.copyBtn
      clipboard.on('success', function () {
        self.layer.msg('复制成功')
      })
      clipboard.on('error', function () {
        self.layer.msg('复制失败，请手动选择复制！')
      })
    }
  }
}
</script>

<style scoped>

</style>
