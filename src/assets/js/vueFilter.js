import Vue from 'vue'
import * as _ from 'lodash'
import nation from '@@/json/nation.json'
import vueCookie from 'vue-cookies'

Vue.prototype.LoadingImg = '<div class="clearfix text-center Loading"><i></i><span>数据加载中...</span></div>'
Vue.prototype.NoData = '<div class="clearfix text-center"><i class="iconfont font26">&#xe6d8;</i><div>暂无数据</div></div>'
Vue.prototype.avatarUrl = window.location.host.indexOf('localhost') >= 0 ? '/static/images/defaultface.png' : '/manage/static/images/defaultface.png'

Vue.prototype.currentTime = function (type) {
  let date = new Date()
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let HH = date.getHours()
  let MM = date.getMinutes()
  let SS = date.getSeconds()
  M = M < 10 ? '0' + M : M
  D = D < 10 ? '0' + D : D
  HH = HH < 10 ? '0' + HH : HH
  MM = MM < 10 ? '0' + MM : MM
  SS = SS < 10 ? '0' + SS : SS
  switch (type) {
    case 1:
      return Y + '-' + M + '-' + D + ' ' + HH + ':' + MM + ':' + SS
    default:
      return Y + '-' + M + '-' + D
  }
}

Vue.prototype.countdownInit = function (objName) {
  let self = this
  let dateBegin = vueCookie.get(objName + '-expires')
  if (dateBegin) {
    let dateEnd = new Date()
    let dateDiff = dateBegin - dateEnd.getTime()
    let leave1 = dateDiff % (24 * 3600 * 1000)
    let leave2 = leave1 % (3600 * 1000)
    // let minutes = Math.floor(leave2 / (60 * 1000)) 分
    let leave3 = leave2 % (60 * 1000)
    let seconds = Math.round(leave3 / 1000) // 秒
    if (seconds > 0) {
      self.countdown(objName, seconds)
    } else {
      vueCookie.remove(objName + '-expires')
    }
  }
}

Vue.prototype.countdown = function (objName, wait) {
  let self = this
  let _this = document.getElementById(objName)
  let date = new Date()
  date.setTime(date.getTime() + (wait + 1) * 1000)
  if (vueCookie.get(objName + '-expires') === null) {
    vueCookie.set(objName + '-expires', new Date(date).getTime())
  }
  if (_this) {
    if (wait >= 0) {
      vueCookie.set(objName, wait - 1, date)
    } else {
      vueCookie.set(objName, wait - 1, date)
    }
    if (wait <= 0) {
      vueCookie.remove(objName)
      vueCookie.remove(objName + '-expires')
    }
    if (wait === 0) {
      _this.innerHTML = '重获验证码'
      _this.classList.remove('disabled')
      _this.removeAttribute('disabled')
    } else {
      _this.innerHTML = wait + '秒后重新获取'
      _this.classList.add('disabled')
      _this.setAttribute('disabled', true)
      wait--
      setTimeout(function () {
        self.countdown(objName, wait)
      }, 1000)
    }
  }
}

Vue.prototype.highlight = function (str, keys) {
  if (keys) {
    return str.replace(new RegExp(keys, 'ig'), (matchedTxt) => '<font style="color:#f90;">' + matchedTxt + '</font>')
  } else {
    return str
  }
}

Vue.prototype.cutString = (strings, k) => {
  if (strings == null) return false
  let reg = /<[^>]*>/
  let len = 0
  let str = strings.replace(reg, strings)
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  if (len > k) {
    return strings.substr(0, k) + '...'
  } else {
    return strings
  }
}

Vue.prototype.checkNumber = (event, len) => {
  if (event.target.value) {
    let str = event.target.value.replace(/[^\d]/g, '')
    event.target.value = str.substr(0, len)
  }
}

Vue.prototype.fileSuffix = (name) => {
  return (name.substring(name.lastIndexOf('.') + 1)).toLocaleLowerCase()
}

Vue.filter('state', function (i) {
  let text = ''
  switch (i) {
    case 0:
      text = '初始'
      break
    case 1:
      text = '启用'
      break
    case 2:
      text = '停用'
      break
    default:
      text = '-'
  }
  return text
})

Vue.filter('bytesToSize', function (bytes) {
  if (bytes === 0) return '0 B'
  let k = 1024
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  let sz = (bytes / Math.pow(k, i)).toFixed(2)
  return sz + ' ' + sizes[i]
})

Vue.filter('keepNum', (v, i) => {
  let val = Number(v)
  return val.toFixed(i)
})

Vue.filter('cutString', (strings, k) => {
  if (strings == null) return false
  let reg = /<[^>]*>/
  let len = 0
  let str = strings.replace(reg, strings)
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  if (len > k) {
    return strings.substr(0, k) + '...'
  } else {
    return strings
  }
})

Vue.filter('countryActive', (value) => {
  let resArr = _.filter(nation, (item) => item.id === parseInt(value))
  return resArr[0]['cn']
})

Vue.filter('plusXin', function (str, frontLen, endLen) {
  let len = str.length - frontLen - endLen
  let xin = ''
  for (let i = 0; i < len; i++) {
    xin += '*'
  }
  return str.substr(0, frontLen) + xin + str.substr(str.length - endLen)
})

Vue.filter('dCreateTime', (value, format) => {
  let D = new Date(value)
  let o = {
    'M+': D.getMonth() + 1,
    'd+': D.getDate(),
    'h+': D.getHours(),
    'm+': D.getMinutes(),
    's+': D.getSeconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (D.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return format
  }
})
