<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
      <div v-if="loading" v-html="LoadingImg"></div>
      <div v-if="!loading">
        <div class="clearfix pb-30">
          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div class="headerTitle">个人中心</div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right"></div>
          </div>
        </div>

        <div class="row bdb-d pb-25">
          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 bdr">
            <div class="text-center">
              <img :src="list.head_img" alt="" data-toggle="modal"
                   data-backdrop="static"
                   data-target="#userFace" class="img-circle handPower" style="width: 100px;height: 100px;display: inline-block;" v-if="list.head_img!==''">
              <img :src="avatarUrl" data-toggle="modal"
                   data-backdrop="static"
                   data-target="#userFace" class="img-circle handPower" style="width: 100px;height: 100px;display: inline-block;" v-if="list.head_img===''">
              <div class="caption">
                <h4>{{list.user_name}}</h4>
                <p>{{list.role_name}}</p>
                <p>{{list.company_name}}</p>
              </div>
            </div>
          </div>
          <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">微信号</label>
                <div class="col-sm-4 lh34">
                  {{list.wechat_account}}
                </div>
                <div class="col-sm-6 lh34"><a href="#" data-toggle="modal"
                                              data-backdrop="static" data-target="#editUserInfo"
                                              @click="userInfoId=1">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">联系邮箱</label>
                <div class="col-sm-4 lh34">
                  {{list.email}}
                </div>
                <div class="col-sm-6 lh34"><a href="#" data-toggle="modal"
                                              data-backdrop="static" data-target="#editUserInfo"
                                              @click="userInfoId=2">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">联系电话</label>
                <div class="col-sm-4 lh34">
                  {{list.phone}}
                </div>
                <div class="col-sm-6 lh34"><a href="#" data-toggle="modal"
                                              data-backdrop="static" data-target="#editUserInfo"
                                              @click="userInfoId=3">修改</a></div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">联系地址</label>
                <div class="col-sm-4">
                  <div v-html="address" style="padding-top:8px;"></div>
                </div>
                <div class="col-sm-6 lh34"><a href="#" data-toggle="modal"
                                              data-backdrop="static" data-target="#editUserInfo"
                                              @click="userInfoId=5">修改</a></div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="editUserInfo">
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">编辑信息</h4>
              </div>
              <div class="modal-body">
                <div class="form-horizontal">
                  <div class="form-group" v-show="userInfoId===1">
                    <label class="col-sm-2 control-label">微信号</label>
                    <div class="col-sm-6">
                      <input type="text" name="wechat_account" class="form-control" placeholder="请输入微信号"
                             v-model="list.wechat_account">
                    </div>
                    <div class="col-sm-4 lh34"><a href="javascript:void(0);" class="btn btn-primary"
                                                  @click="editSaveInfo(1)">保存</a>
                    </div>
                  </div>
                  <div class="form-group" v-show="userInfoId===2">
                    <label class="col-sm-2 control-label">联系邮箱</label>
                    <div class="col-sm-6">
                      <input type="text" name="email" class="form-control" placeholder="请输入邮箱"
                             v-model="list.email">
                    </div>
                    <div class="col-sm-4 lh34"><a href="javascript:void(0);" class="btn btn-primary"
                                                  @click="editSaveInfo(2)">保存</a>
                    </div>
                  </div>
                  <div class="form-group" v-show="userInfoId===3">
                    <label class="col-sm-2 control-label">联系电话</label>
                    <div class="col-sm-6">
                      <input type="text" name="phone" class="form-control" placeholder="请输入电话"
                             v-model="list.phone">
                    </div>
                    <div class="col-sm-4 lh34"><a href="javascript:void(0);" class="btn btn-primary"
                                                  @click="editSaveInfo(3)">保存</a>
                    </div>
                  </div>
                  <div class="form-group" v-show="userInfoId===5">
                    <label class="col-sm-2 control-label">联系地址</label>
                    <div class="col-sm-10 mycitySelect">
                      <CitySelect
                        :p="list.province_id"
                        :c="list.city_id"
                        :a="list.area_id"
                        @cityCallback="cityCallback" />
                    </div>
                  </div>
                  <div class="form-group" v-show="userInfoId===5">
                    <label class="col-sm-2 control-label"></label>
                    <div class="col-sm-10">
                      <input type="text" name="address" v-model="list.address" class="form-control" placeholder="请输入详细地址" />
                    </div>
                  </div>
                  <div class="form-group text-center" v-show="userInfoId===5">
                    <a href="javascript:void(0);" class="btn btn-primary" @click="editSaveInfo(5)">保存</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="blk-50"></div>

        <div class="row" style="min-width:970px;">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div class="userBox">
              <div class="media">
                <a class="media-left" href="#" style="cursor:auto;">
                  <i class="iconfont font60 cded">&#xe62d;</i>
                </a>
                <div class="media-body">
                  <h4 class="media-heading">手机已验证</h4>
                  <p>{{list.phone}} <a href="#" class="cded ml-10" data-toggle="modal"
                                       data-backdrop="static" data-target="#editMobile"
                                       @click="imgCode(list.phone)">修改手机号</a>
                  </p>
                  <p class="textOver">您可享受手机的登录安全及提醒服务</p>
                </div>
              </div>

            </div>
          </div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div class="userBox">
              <div class="media">
                <a class="media-left" href="#" style="cursor:auto;">
                  <i class="iconfont font60 cded">&#xe660;</i>
                </a>
                <div class="media-body">
                  <h4 class="media-heading cded handPower" data-toggle="modal"
                      data-backdrop="static" data-target="#editPassword" @click="imgCode()">修改密码</h4>
                  <p>可以通过邮箱、手机修改密码</p>
                </div>
              </div>

            </div>
          </div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div class="userBox">
              <div class="media">
                <a class="media-left" href="#" style="cursor:auto;">
                  <i class="iconfont font60 cded">&#xe6a8;</i>
                </a>
                <div class="media-body">
                  <h4 class="media-heading">
                    <a href="javascript:void(0);" @click="weChatShow" v-if="list.is_bind_wx!==1">绑定微信</a>
                    <a href="javascript:void(0);"  v-if="list.is_bind_wx===1">绑定微信</a>
                  </h4>
                  <p>{{list.wechat_account}}
                    <a href="javascript:void(0);" class="cded" @click="ReleaseWeChat" v-if="list.is_bind_wx===1">解除绑定</a>
                  </p>
                  <p class="textOver">绑定后可以通过微信扫码登录</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="modal fade bs-example-modal-lg" id="userFace">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">编辑头像</h4>
              </div>
              <div class="modal-body">
                <ImageCropper ref="cropper" func="head_img" @cropperCallBack="cropperCallBack"></ImageCropper>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="saveImg">保存</button>
              </div>
            </div>
          </div>
        </div>
        <!--修改手机号-->
        <div class="modal fade" id="editMobile">
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">修改手机号</h4>
              </div>
              <div class="modal-body">
                <div class="pl-45 pr-45">
                  <div class="clearfix lh20 cf90">
                    温馨提示：为了您的账号安全，修改手机前请进行安全验证。
                  </div>
                  <ul class="nav nav-tabs nav-justified">
                    <li :class="{active:step>=1}"><a href="#">1.进行安全验证</a></li>
                    <li :class="{active:step>=2}"><a href="#">2.设置新手机</a></li>
                    <li :class="{active:step===3}"><a href="#">3.修改成功</a></li>
                  </ul>
                  <div class="blk-35"></div>

                  <form action="" method="POST" class="form-horizontal" autocomplete="off" v-show="step===1">
                    <div class="form-group">
                      <label class="col-sm-3 control-label">原手机</label>
                      <div class="col-sm-9">
                        <input type="text" name="phone" class="form-control" readonly
                               :value="list.phone">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">验证码</label>
                      <div class="col-sm-9 imageCode">
                        <input type="text" name="code" class="form-control" v-model="imgCodeVal"
                               placeholder="请输入图形验证码">
                        <img :src="imgVerify" alt="" @click="imgCode()" height="34" class="handPower">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">短信验证码</label>
                      <div class="col-sm-9 verify">
                        <input type="text" name="verify_short" v-model="verify_short"
                               class="form-control" placeholder="请输入短信验证码">
                        <button type="button" class="btn btn-default" id="verifyCode1"
                                @click="getVerify('verifyCode1', list.phone)">获取验证码
                        </button>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-sm-12 text-center pt-15">
                        <button type="button" class="btn btn-primary btn-lg w30"
                                @click="verifyShort(1)">
                          确定
                        </button>
                      </div>
                    </div>
                    <div class="blk-30"></div>
                  </form>
                  <!--第二步-->
                  <form action="" method="POST" class="form-horizontal" autocomplete="off" v-show="step===2">
                    <div class="form-group">
                      <label class="col-sm-3 control-label">新手机号</label>
                      <div class="col-sm-9">
                        <input type="text" name="phone" class="form-control" v-model="mobile"
                               placeholder="请输入新手机号">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">验证码</label>
                      <div class="col-sm-9 imageCode">
                        <input type="text" name="code" class="form-control" v-model="imgCodeVal"
                               placeholder="请输入图形验证码">
                        <img :src="imgVerify" alt="" @click="imgCode()" height="34" class="handPower">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">短信验证码</label>
                      <div class="col-sm-9 verify">
                        <input type="text" name="verify_short" v-model="verify_short"
                               class="form-control"
                               placeholder="请输入短信验证码">
                        <button type="button" class="btn btn-default" id="verifyCode2"
                                @click="getVerify('verifyCode2', mobile)">获取验证码
                        </button>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-sm-12 text-center pt-15">
                        <button type="button" class="btn btn-primary btn-lg w30" @click="saveMobile">
                          确定
                        </button>
                      </div>
                    </div>
                    <div class="blk-30"></div>
                  </form>
                  <div class="clearfix text-center" v-show="step===3">
                    <i class="iconfont cded font60">&#xe719;</i>
                    <p class="cded font18 lh40">您的新手机号码设置成功!</p>
                    <div class="clearfix pt-15">
                      <button type="button" class="btn btn-primary btn-lg w30" data-dismiss="modal"
                              @click="step=1">
                        确定
                      </button>
                    </div>
                    <div class="blk-30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--修改密码-->
        <div class="modal fade" id="editPassword">
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">修改密码</h4>
              </div>
              <div class="modal-body">
                <div class="pl-45 pr-45">
                  <div class="clearfix lh20 cf90">
                    温馨提示：为了您的账号安全，修改密码前请进行安全验证。
                  </div>
                  <ul class="nav nav-tabs nav-justified">
                    <li :class="{active:STEP>=1}"><a href="#">1.进行安全验证</a></li>
                    <li :class="{active:STEP>=2}"><a href="#">2.设置新密码</a></li>
                    <li :class="{active:STEP===3}"><a href="#">3.修改成功</a></li>
                  </ul>
                  <div class="blk-35"></div>

                  <form action="" method="POST" class="form-horizontal" autocomplete="off" v-show="STEP===1">
                    <div class="form-group">
                      <label class="col-sm-3 control-label">原手机</label>
                      <div class="col-sm-9">
                        <input type="text" name="phone" class="form-control" readonly
                               :value="list.phone">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">验证码</label>
                      <div class="col-sm-9 imageCode">
                        <input type="text" name="code" class="form-control" v-model="imgCodeVal"
                               placeholder="请输入图形验证码">
                        <img :src="imgVerify" height="34" alt="" @click="imgCode()" class="handPower">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">短信验证码</label>
                      <div class="col-sm-9 verify">
                        <input type="text" name="" class="form-control" v-model="verify_short"
                               placeholder="请输入短信验证码">
                        <button type="button" class="btn btn-default" id="verifyCode3"
                                @click="getVerify('verifyCode3',list.phone)">获取验证码
                        </button>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-sm-12 text-center">
                        <button type="button" class="btn btn-primary" @click="verifyShort(2)">确定
                        </button>
                      </div>
                    </div>
                  </form>

                  <form action="" method="POST" class="form-horizontal" autocomplete="off" v-show="STEP===2">
                    <div class="form-group">
                      <label class="col-sm-3 control-label">新密码</label>
                      <div class="col-sm-9">
                        <input type="password" name="password1" class="form-control"
                               v-model="newPassword" placeholder="请输入新密码">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">确认密码</label>
                      <div class="col-sm-9">
                        <input type="password" name="password2" class="form-control"
                               v-model="confirmPassword" placeholder="请输入确认密码">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-sm-12 text-center">
                        <button type="button" class="btn btn-primary" @click="savePassword">确定</button>
                      </div>
                    </div>
                  </form>

                  <div class="clearfix text-center" v-show="STEP===3">
                    <i class="iconfont cded font60">&#xe719;</i>
                    <p class="cded font18 lh40">您的新登录密码设置成功!</p>
                    <p class="c999">今后将使用新登录密码来登录个人账号，请牢记。</p>
                    <div class="clearfix pt-15">
                      <button type="button" class="btn btn-primary btn-lg w30" data-dismiss="modal"
                              @click="STEP=1">
                        确定
                      </button>
                    </div>
                    <div class="blk-30"></div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <!--微信绑定-->
        <div class="modal fade" id="weChat">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">微信绑定</h4>
                    </div>
                    <div class="modal-body">
                        <div class="text-center" id="login_container" style="height: 350px;overflow: hidden;"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import * as _ from 'lodash'
import CitySelect from './shared/CitySelect'
import cityJson from '@@/json/city'
import ImageCropper from '@#/shared/ImageCropper'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'User',
  store,
  data () {
    return {
      loading: true,
      userInfoId: '',
      cityJson: cityJson,
      address: '',
      list: {
        wechat_account: '',
        head_img: '',
        user_name: '',
        useryxl: '',
        company_name: '',
        email: '',
        phone: '',
        birthday: '',
        province_id: '',
        city_id: '',
        area_id: '',
        address: ''
      },
      imgVerify: '',
      step: 1,
      STEP: 1,
      imgCodeVal: '',
      mobile: '',
      verify_short: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.getUserInfo()
    self.$nextTick(() => {
      self.laydate.render({
        elem: '#times',
        type: 'date',
        done: (value) => {
          self.list.birthday = value
        }
      })
      _.delay(() => {
        self.countdownInit('verifyCode1')
        self.countdownInit('verifyCode2')
        self.countdownInit('verifyCode3')
      }, 1500)
    })
  },
  methods: {
    getUserInfo () {
      let self = this
      self.loading = true
      db.getRequest('Institution/User/myInfo', {}).then(res => {
        if (res.status === 1) {
          self.list = res.data
          self.handelSelect(res.data.province_id, res.data.city_id, res.data.area_id)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
        self.loading = false
      })
    },
    saveImg () {
      this.$refs.cropper.uploadFile()
    },
    handelSelect (pid, cid, aid) {
      let self = this
      let cityName = ''
      self.cityJson.map((item) => {
        if (item.area_id === pid) {
          cityName = item.title
          item.child.map((items) => {
            if (items.area_id === cid) {
              cityName += '-' + items.title
              items.child.map((areas) => {
                if (areas.area_id === aid) {
                  cityName += '-' + areas.title
                }
              })
            }
          })
        }
        self.address = cityName + '<br>' + self.list.address
      })
    },
    cropperCallBack (data) {
      this.list.head_img = data + '?id=' + Math.random()
      let userInfo = this.$cookies.get('userInfo')
      userInfo.headphoto = this.list.head_img
      this.$store.commit('setUserInfo', userInfo)
      $('#userFace').modal('hide')
    },
    editSaveInfo (type) {
      let self = this
      let params = new URLSearchParams()
      if (type === 1) {
        params.append('wechat_account', self.list.wechat_account)
      }
      if (type === 2) {
        params.append('email', self.list.email)
      }
      if (type === 3) {
        params.append('phone', self.list.phone)
      }
      if (type === 5) {
        params.append('province_id', self.list.province_id)
        params.append('city_id', self.list.city_id)
        params.append('area_id', self.list.area_id)
        params.append('address', self.list.address)
      }
      db.postRequest('Institution/User/myInfoEditAjax', params).then(res => {
        if (res.status === 1) {
          if (type === 5) {
            self.handelSelect(self.list.province_id, self.list.city_id, self.list.area_id)
          }
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
            $('#editUserInfo').modal('hide')
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    imgCode () {
      let self = this
      db.postRequest('Institution/User/getVerifyImg', {}).then(res => {
        if (res.status === 1) {
          self.imgVerify = res.data
        } else {
          console.log('获取图形验证码失败')
        }
      })
    },
    ReleaseWeChat () {
      let self = this
      self.layer.confirm('是否确认解绑该微信？', {icon: 3}, function (i) {
        self.layer.close(i)
        db.getRequest('Institution/User/unBindWx', {}).then(res => {
          if (res.status === 1) {
            self.list.is_bind_wx = 0
            self.layer.alert(res.msg, {icon: 1}, function (i) {
              self.layer.close(i)
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      })
    },
    // 发送短信验证码
    getVerify (id, phone) {
      let self = this
      let type = (id === 'verifyCode1' || id === 'verifyCode2') ? 1 : 2
      if (phone === '') {
        self.layer.alert('请输入手机号码', {icon: 2})
        return false
      }
      if (!/^1[3-9][0-9]{9}$/.test(phone)) {
        self.layer.alert('手机号码格式不正确', {icon: 2})
        return false
      }
      if (self.imgCodeVal === '' || self.imgCodeVal.length < 4) {
        self.layer.alert('请输入四位图形验证码', {icon: 2})
        return false
      }
      let params = new URLSearchParams()
      params.append('type', type)
      params.append('phone', phone)
      params.append('code', self.imgCodeVal)
      db.postRequest('Institution/User/checkVerifyImg', params).then(res => {
        if (res.status === 1) {
          self.countdown(id, 60)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 验证短信是否正确
    verifyShort (type) {
      let self = this
      let params = new URLSearchParams()
      params.append('phone', self.list.phone)
      params.append('verify_code', self.verify_short)
      params.append('type', type)
      db.postRequest('Institution/User/checkVerifyCode', params).then(res => {
        if (res.status === 1) {
          self.imgCode()
          self.imgCodeVal = ''
          self.verify_short = ''
          if (type === 1) {
            self.step = 2
          } else {
            self.STEP = 2
          }
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 保存新手机号
    saveMobile () {
      let self = this
      let params = new URLSearchParams()
      params.append('new_phone', self.mobile)
      params.append('verify_code', self.verify_short)
      db.postRequest('Institution/User/updatePhone', params).then(res => {
        if (res.status === 1) {
          self.list.phone = self.mobile
          self.verify_short = ''
          self.imgCodeVal = ''
          self.step = 3
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 保存修改新密码
    savePassword () {
      let self = this
      let params = new URLSearchParams()
      params.append('new_pwd', self.newPassword)
      params.append('confirm_pwd', self.confirmPassword)
      db.postRequest('Institution/User/updatePassword', params).then(res => {
        if (res.status === 1) {
          self.verify_short = ''
          self.imgCodeVal = ''
          self.newPassword = ''
          self.confirmPassword = ''
          self.STEP = 3
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 回调省市区
    cityCallback (data) {
      this.list.province_id = data.province
      this.list.city_id = data.city
      this.list.area_id = data.area
    },
    // 显示微信绑定弹窗
    weChatShow () {
      let self = this
      self.WXcode()
      $('#weChat').modal({ backdrop: 'static', show: true })
    },
    // 微信登录
    WXcode () {
      let state = new Date().getTime()
      /*eslint-disable*/
      new WxLogin({
        self_redirect: false, // true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri，false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。默认为 false。
        id: 'login_container', // 第三方页面显示二维码的容器id
        appid: 'wxebd64df32b9e4bd0', // 应用唯一标识，在微信开放平台提交应用审核通过后获得
        scope: 'snsapi_login', // 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
        redirect_uri: 'https://www.applyera.com/wechat', // 重定向地址，需要进行UrlEncode
        state: state, // 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
        style: 'black', // 提供"black"、"white"可选，默认为黑色文字描述。详见文档底部FAQ
        href: 'https://www.applyoversea.com/Public/css/jgdweixin.css'// 自定义样式链接，第三方可根据实际需求覆盖默认样式。详见文档底部FAQ
      })
    }
  },
  components: {ImageCropper, CitySelect}
}
</script>

<style scoped lang="less">
.userBox {
    box-shadow:1px 1px 5px #ddd;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:25px;height:140px;
    & .media-body {
        & .media-heading {margin-bottom:15px;color:#39f;}
        & p {margin-bottom:5px;}
    }

}
.nav-tabs.nav-justified {
    & > li {
        position:relative;
        &:after {content:'';width:100%;height:5px;display:block;overflow:hidden;position:absolute;left:0;bottom:-5px;background-color:#e6e6e6;z-index:1;}
        &:before {content:'';width:14px;height:14px;display:block;overflow:hidden;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;background-color:#e6e6e6;border:3px solid #f7f7f7;position:absolute;left:50%;margin-left:-7px;bottom:-5px;z-index:2;}
        & > a {
            border:none !important;line-height:2;cursor:auto;
            &:hover, &:focus {background-color:transparent;}
        }
        &.active {
            &:after {background-color:#39f;}
            &:before {background-color:#39f;}
            & > a {color:#39f;}
        }
    }
}
.imageCode {
    position:relative;
    & input {padding-right:150px;}
    & img {position:absolute;right:15px;top:0;z-index:2;-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0;}
}
.verify {
    position:relative;
    & input {padding-right:200px;}
    & button {position:absolute;right:15px;top:0;z-index:2;-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0;background-color:#e6e6e6;}
}
</style>
<style lang="less">
.mycitySelect{
  & .form-inline{display:block !important;width:100%;}
  & .bootstrap-select{
    width:32.4% !important;
  }
}
</style>
