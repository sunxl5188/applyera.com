<template>
    <div class="container">
        <div class="blk-50"></div>
        <div class="login">
            <form action="" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit"
                  autocomplete="off">
                <div class="form-group">
                    <label class="col-sm-3 control-label">登录账号</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" name="username" placeholder="请输入账号" v-model="username"
                               v-validate="'required'">
                        <div class="validateTip" v-show="errors.has('username')">
                            {{ errors.first('username') }}
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label">登录密码</label>
                    <div class="col-sm-9">
                        <input type="password" class="form-control" name="password" placeholder="请输入账号"
                               v-model="password"
                               v-validate="'required'">
                        <div class="validateTip" v-show="errors.has('password')">
                            {{ errors.first('password') }}
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-9 col-sm-offset-3">
                        <button type="submit" class="btn btn-primary" :disabled="isClick">登录</button>
                        <button type="reset" class="btn btn-default ml-20">重置</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import '@~/js/VeeValidateConfig'
  import request from '@~/js/request'
  import { mapActions } from 'vuex'
  import store from '@/vuex/Store'

  let db = new request()
  export default {
    name: 'Login',
    store,
    data () {
      return {
        username: '',
        password: '',
        isClick: false
      }
    },
    computed: {
      token () {
        return this.$store.state.token
      }
    },
    mounted () {
      let self = this
    },
    methods: {
      ...mapActions(['login']),
      validateBeforeSubmit () {
        let self = this
        self.isClick = true
        self.$validator.validateAll().then((result) => {
          if (result) {
            let params = new URLSearchParams()
            params.append('account', self.username)
            params.append('pwd', self.password)
            db.postRequest('Institution/Login/index', params).then(res => {
              if (res.status === 1) {
                self.layer.msg(res.msg)
                self.$store.dispatch('login', res.data)
                self.$router.push('/')
              } else {
                self.layer.alert(res.msg)
              }
            })
          }
          self.isClick = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
