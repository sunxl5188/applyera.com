<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div v-if="loading" v-html="LoadingImg()"></div>

        <div v-if="!loading">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">我的企业</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right"></div>
                </div>
            </div>

            <div class="clearfix bdb pb-15">
                <ul class="media-list">
                    <div class="media">
                        <div class="media-left">
                            <a href="#" data-toggle="modal" data-backdrop="static" data-target="#CompanyImage">
                                <img :src="list.logo + '?id=' + Math.random() " alt="" style="max-width:260px;min-width:200px;"
                                     v-if="list.logo!==''">
                                <img src="http://placehold.it/260x110" alt="" style="max-width:260px;min-width:200px;"
                                     v-if="list.logo===''">
                            </a>
                        </div>
                        <div class="media-body pl-15">
                            <h4 class="media-heading cded">{{list.name}}</h4>
                            <div class="lh30">公司类别：<span v-if="list.type===1">公司</span><span
                                    v-if="list.type===2">工作室</span></div>
                            <div class="lh30">企业ID：{{list.number}}</div>
                            <div class="lh30">创建时间：{{list.create_time}}</div>
                        </div>
                    </div>
                </ul>
            </div>

            <div class="blk30"></div>

            <div class="clearfix">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 bdr form-horizontal">
                        <div class="commonTitle">基本信息</div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">企业简称</label>
                            <div class="col-sm-6 lh34">
                                {{list.short_name}}
                            </div>
                            <div class="col-sm-4 lh34"><a href="#" data-toggle="modal" data-backdrop="static"
                                                          data-target="#editCompany" @click="type=1">修改</a></div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">英文名称</label>
                            <div class="col-sm-6 lh34">
                                {{list.english_name}}
                            </div>
                            <div class="col-sm-4 lh34"><a href="#" data-toggle="modal" data-backdrop="static"
                                                          data-target="#editCompany" @click="type=2">修改</a></div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">公司电话</label>
                            <div class="col-sm-6 lh34">
                                {{list.phone}}
                            </div>
                            <div class="col-sm-4 lh34"><a href="#" data-toggle="modal" data-backdrop="static"
                                                          data-target="#editCompany" @click="type=3">修改</a></div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">联系邮箱</label>
                            <div class="col-sm-6 lh34">
                                {{list.email}}
                            </div>
                            <div class="col-sm-4 lh34"><a href="#" data-toggle="modal" data-backdrop="static"
                                                          data-target="#editCompany" @click="type=4">修改</a></div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">联系地址</label>
                            <div class="col-sm-6 lh34">
                                {{list.address}}
                            </div>
                            <div class="col-sm-4 lh34"><a href="#" data-toggle="modal" data-backdrop="static"
                                                          data-target="#editCompany" @click="type=5">修改</a></div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">上传附件</label>
                            <div class="col-sm-6 lh34">
                                <i class="iconfont">&#xe635;</i>
                                <span v-if="list.is_uploads===1">
                                    <a :href="url +'/Institution/Company/archiveDownload?id='+list.id"
                                       class="cded ml-15" target="_blank">下载</a>
                                    <a href="javascript:void(0);" class="cded ml-15" @click="viewImage(list.uploads)">查看</a>
                                </span>
                                <span v-if="list.is_uploads===0">
                                    <a href="javascript:void(0);" class="c999">下载</a>
                                    <a href="javascript:void(0);" class="c999">查看</a>
                                </span>
                            </div>
                            <div class="col-sm-4"></div>
                        </div>

                        <!--弹窗-->
                        <div class="modal fade" id="editCompany">
                            <div class="modal-dialog ">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                            &times;
                                        </button>
                                        <h4 class="modal-title">编辑</h4>
                                    </div>
                                    <div class="modal-body">

                                        <form action="" method="POST" class="form-horizontal">

                                            <div class="form-group" v-show="type===1">
                                                <label class="col-sm-2 control-label">企业简称</label>
                                                <div class="col-sm-6">
                                                    <input type="text" name="short_name" v-model="list.short_name"
                                                           class="form-control"
                                                           placeholder="请输入企业简称">
                                                </div>
                                                <div class="col-sm-4 lh34"><a href="javascript:void(0);"
                                                                              class="btn btn-primary"
                                                                              @click="editCompany()">保存</a></div>
                                            </div>
                                            <div class="form-group" v-show="type===2">
                                                <label class="col-sm-2 control-label">英文名称</label>
                                                <div class="col-sm-6">
                                                    <input type="text" name="english_name" v-model="list.english_name"
                                                           class="form-control"
                                                           placeholder="请输入英文名称">
                                                </div>
                                                <div class="col-sm-4 lh34"><a href="javascript:void(0);"
                                                                              class="btn btn-primary"
                                                                              @click="editCompany()">保存</a></div>
                                            </div>
                                            <div class="form-group" v-show="type===3">
                                                <label class="col-sm-2 control-label">公司电话</label>
                                                <div class="col-sm-6">
                                                    <input type="text" name="phone" v-model="list.phone"
                                                           class="form-control"
                                                           placeholder="请输入公司电话">
                                                </div>
                                                <div class="col-sm-4 lh34"><a href="javascript:void(0);"
                                                                              class="btn btn-primary"
                                                                              @click="editCompany()">保存</a></div>
                                            </div>
                                            <div class="form-group" v-show="type===4">
                                                <label class="col-sm-2 control-label">联系邮箱</label>
                                                <div class="col-sm-6">
                                                    <input type="text" name="email" v-model="list.email"
                                                           class="form-control"
                                                           placeholder="请输入联系邮箱">
                                                </div>
                                                <div class="col-sm-4 lh34"><a href="javascript:void(0);"
                                                                              class="btn btn-primary"
                                                                              @click="editCompany()">保存</a></div>
                                            </div>
                                            <div class="form-group" v-show="type===5">
                                                <label class="col-sm-2 control-label">联系地址</label>
                                                <div class="col-sm-6">
                                                    <input type="text" name="address" v-model="list.address"
                                                           class="form-control"
                                                           placeholder="请输入联系地址">
                                                </div>
                                                <div class="col-sm-4 lh34"><a href="javascript:void(0);"
                                                                              class="btn btn-primary"
                                                                              @click="editCompany()">保存</a></div>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-horizontal pl-35">
                        <div class="commonTitle">银行信息</div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">账户名称</label>
                            <div class="col-sm-6 lh34">{{list.banks_account}}</div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">开户行</label>
                            <div class="col-sm-6 lh34">{{list.banks_card_info}}</div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">银行账号</label>
                            <div class="col-sm-6 lh34">{{list.banks_card_num}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade bs-example-modal-lg" id="CompanyImage">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">编辑头像</h4>
                    </div>
                    <div class="modal-body">
                        <ImageCropper ref="cropper" func="logo"
                                      @cropperCallBack="cropperCallBack"></ImageCropper>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveImg">保存</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Enterprise',
  store,
  data () {
    return {
      loading: true,
      type: 1,
      url: window.ajaxBaseUrl,
      list: {}
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.getCompany()
  },
  methods: {
    getCompany () {
      let self = this
      db.getRequest('Institution/Company/myCompany', {}).then(res => {
        if (res.status === 1) {
          self.list = res.data
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
        self.loading = false
      })
    },
    viewImage (arr) {
      let self = this
      let imgList = []
      arr.map((item, i) => {
        imgList.push({
          'alt': '',
          'pid': i,
          'src': '//' + item.path,
          'thumb': ''
        })
      })
      let data = {
        'title': '',
        'start': 0,
        'data': imgList
      }
      self.layer.photos({
        photos: data
      })
    },
    cropperCallBack (data) {
      this.list.logo = data.path + '?id=' + Math.random()
      let userInfo = this.$cookies.get('userInfo')
      userInfo.logo = data.path + '?id=' + Math.random()
      this.$store.commit('setUserInfo', userInfo)
      $('#CompanyImage').modal('hide')
    },
    saveImg () {
      this.$refs.cropper.uploadFile()
    },
    editCompany () {
      let self = this
      let params = new URLSearchParams()
      params.append('short_name', self.list.short_name)
      params.append('english_name', self.list.english_name)
      params.append('phone', self.list.phone)
      params.append('email', self.list.email)
      params.append('address', self.list.address)
      db.postRequest('Institution/Company/editCompanyInfo', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            $('#editCompany').modal('hide')
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
  components: {ImageCropper}
}
</script>

<style scoped>

</style>
