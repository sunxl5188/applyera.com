<template>
    <div>
        <div :class="{hidden:name!=='saleslead'}">
            <div class="clearfix pb-15">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">渠道工具</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <a href="#" class="c999" data-toggle="modal" data-backdrop="static" data-target="#modalSalesLeads">
                            <i class="iconfont">&#xe999;</i>
                            <span class="div_vm lh34">如何设置？</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modalSalesLeads">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">如何设置</h4>
                        </div>
                        <div class="modal-body">
                            <p>欢迎您使用申学纪渠道工具功能，生源提供者可直接将生源信息通过该链接提交至贵机构的后台，提交生源的链接可以放置在贵机构的公众号或者直接发送给相关渠道。</p>
                            <p>STEP 1 复制链接</p>
                            <p class="form-inline">
                                <input type="text" name="linkUrl" id="linkUrl" v-model="linkUrl" class="form-control" style="width: 80%;" value="" readonly >
                                <button type="button" class="btn btn-primary copyBtn" data-clipboard-target="#linkUrl" @click="CopyText">复制链接</button>
                            </p>
                            <p>STEP 2 设置链接</p>
                            <p>登录微信公众号后台将链接放置在公众号按钮中，或直接发送给市场人员</p>
                            <p><img src="../../../../static/images/u270.jpg" alt="" class="img-responsive"></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">知道了</button>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="nav nav-tabs"><!--nav-justified-->
                <li :class="{active:tab===1}" @click="setTabs(1)"><a href="javascript:void(0);">线索跟进</a></li>
                <li :class="{active:tab===2}" @click="setTabs(2)"><a href="javascript:void(0);">渠道管理</a></li>
                <li :class="{active:tab===3}" @click="setTabs(3)"><a href="javascript:void(0);">线索结算</a></li>
            </ul>
            <div class="blk-20"></div>
        </div>
        <div class="tab-content">
            <div class="tab-pane fade in active">
                <component :is="currentComponent"></component>
            </div>
        </div>
    </div>
</template>

<script>
import Tentacle from '@#/marketing/saleslead/Tentacle'
import Follow from '@#/marketing/saleslead/Follow'
import Settlement from '@#/marketing/saleslead/Settlement'
import Clipboard from 'clipboard'
import db from '@~/js/request'

export default {
  name: 'Index',
  data () {
    return {
      name: 'saleslead',
      linkUrl: '',
      tab: 1,
      currentComponent: Follow
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.name = self.$route.name
      $(document).on('click', '.filter a', function () {
        $(this).siblings('span').html('')
      })
      // 创建复制按钮
      self.copyBtn = new Clipboard('.copyBtn')
      // 获取弹窗URL地址
      let params = new URLSearchParams()
      db.postRequest('/Institution/SourceSubmit/getUrl', params).then(res => {
        if (res.status === 1) {
          self.linkUrl = res.data.url
        } else {
          console.log(res.msg)
        }
      })
    })
  },
  methods: {
    setTabs (type) {
      let self = this
      switch (type) {
        case 1:
          self.currentComponent = Follow
          break
        case 2:
          self.currentComponent = Tentacle
          break
        case 3:
          self.currentComponent = Settlement
          break
      }
      self.tab = type
    },
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
  },
  components: { Tentacle, Follow, Settlement },
  watch: {
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped lang="less">
.nav.nav-tabs{
    border:none;
    & > li{
        margin-bottom:0;
        & a{background:#fff !important;border:none;}
        &:after{content:'';width:60%;height:2px;background-color:transparent;display:block;position:absolute;left:20%;bottom:0;}
        &.active{
            &:after{background-color:#39f;}
            & a{
                border:none;
            }
        }
    }
}
</style>
