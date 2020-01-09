import Vue from 'vue'
import * as _ from 'lodash'
import nation from '@@/json/nation.json'
import vueCookie from 'vue-cookies'

Vue.prototype.LoadingImg = '<div class="clearfix text-center Loading"><i></i><span>数据加载中...</span></div>'
Vue.prototype.NoData = '<div class="clearfix text-center"><i class="iconfont font26">&#xe6d8;</i><div>暂无数据</div></div>'

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

Vue.prototype.countdown = function (objName, wait) {
  let $this = this
  let _this = document.getElementById(objName)
  let date = new Date()
  date.setTime(date.getTime() + wait * 1000)
  if (_this) {
    if (parseInt(vueCookie.get(_this.id)) >= 0) {
      wait = parseInt(vueCookie.get(_this.id))
      vueCookie.set(_this.id, wait - 1, {expires: date})
    } else {
      vueCookie.set(_this.id, wait - 1, {expires: date})
    }
    if (parseInt(vueCookie.get(_this.id)) < 0) {
      vueCookie.remove(_this.id)
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
        $this.countdown(objName, wait)
      },
      1000)
    }
  } else {
    let cTime = setInterval(function () {
      if (wait > 0) {
        wait--
        vueCookie.set(objName, wait, {expires: date})
      } else {
        vueCookie.remove(objName)
        clearInterval(cTime)
      }
    }, 1000)
  }
}

Vue.prototype.highlight = function (str, keys) {
  let string = ''
  let re = new RegExp('' + keys + '', 'gi')
  if (str && keys) {
    string = str.replace(re, function (word) {
      return "<span class='cf90'>" + word + '</span>'
    })
  } else {
    string = str
  }
  return string
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
