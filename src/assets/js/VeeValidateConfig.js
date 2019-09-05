import Vue from 'vue'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'

// 加载中文提示
Validator.localize('zh_CN', zhCN)

// 自定义错误提示
const dictionary = {
  zh_CN: {
    messages: {
      required: (name) => `${name}不能为空!`
    },
    attributes: {
      name: '必填项',
      username: '账号',
      password: '密码',
      email: '邮箱地址',
      qq: 'QQ',
      idCard: '身份证',
      mobile: '手机号',
      phone: '手机号',
      money: '数字',
      date: '日期',
      sex: '性别',
      commission_rate: '佣金比例',
      id_number: '身份证'
    },
    custom: {}
  }
}
Validator.localize(dictionary)

// 字段特定的自定义消息
const dict = {
  custom: {
    email: {
      required: '邮箱地址不能为空'
    }
  }
}

Validator.localize('zh_CN', dict)

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 200,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'zh_CN',
  validity: false
}

// 自定义规则
// QQ号
Validator.extend('qq', {
  'getMessage': (field, args) => `${args}` || `请输入正确的${field}`,
  'validate': value => {
    return /^[1-9][0-9]{4,14}$/.test(value)
  }
})
// 手机号
Validator.extend('mobile', {
  'getMessage': (field, args) => `${args}` || `请输入正确的${field}!`,
  'validate': value => value.length === 11 && /^1[3-9][0-9]{9}$/.test(value)
})
// 18位或带X身份证号
Validator.extend('idCard', {
  'getMessage': (field, args) => `${args}` || `请输入18位正确的${field}`,
  'validate': value => /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/.test(value)
})
// 正整数或带两位小数验证货币
Validator.extend('money', {
  'getMessage': (field, args) => `${args}` || `${field}格式不正确，请输入正确的数字`,
  'validate': value => /^[1-9]\d*\.\d{2}|^0\.\d[1-9]{1}|^0\.[1-9][\d]{1}|^[1-9]\d*$/.test(value)
})
// 日期 YYYY/MM/DD
Validator.extend('date', {
  'getMessage': (field, args) => `${args}` || `${field}格式不正确`,
  'validate': value => /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(-|\/)(((0[13578]|1[02])(-|\/)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02(-|\/)(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))(-|\/)02(-|\/)29)$/.test(value)
})

// 验证是否中文
Validator.extend('zh', {
  'getMessage': (field, args) => `${args}` || `${field}格式不正确`,
  'validate': value => /^[\u4E00-\u9FA5\uf900-\ufa2d]{1,}$/.test(value)
})
// 验证是否英文
Validator.extend('en', {
  'getMessage': (field, args) => `${args}` || `${field}格式不正确`,
  'validate': value => /^[a-zA-Z]{1,}$/.test(value)
})
// 验证护照
Validator.extend('pa', {
  'getMessage': (field, args) => `${args}` || `${field}格式不正确`,
  'validate': value => /(^[a-zA-Z]{1})([0-9]{8})$|(^[a-zA-Z]{2})([0-9]{7})$/.test(value)
})
// 验证钱
Validator.extend('money', {
  'getMessage': (field, args) => `${args}` || `${field}格式不正确`,
  'validate': value => /^[1-9]\d+\.([0-9]{2})$|^[1-9]\d+$|^[1-9]$|^[1-9]\.(\d{2})|^0\.(\d{2})/.test(value)
})

// 验证英文内容
Validator.extend('ens', {
  'getMessage': (field, args) => `${args}` || `${field}格式不正确`,
  'validate': value => /^(?![0-9_])(?!.*?_$)[a-zA-Z0-9_,.\s-()?!;:\-@$%*&#%+=']{1,}$/.test(value)
})

// 验证正数与正浮点数
Validator.extend('nb', {
  'getMessage': (field, args) => `${args}` || `${field}格式不正确`,
  'validate': value => /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$|[1-9]\d*$/.test(value)
})

Vue.use(VeeValidate, config)
