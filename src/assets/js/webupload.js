import vueCookie from 'vue-cookies'
import { bytesToSize } from '@~/js/utils'
import layer from 'layui-layer'
import WebUploader from 'webuploader'

/**
 * 图片上传
 * @param assign Vue 要赋值的对象
 * @param options 上传配置参数
 * @调用方法 webupload(self.file_id, {...})
 */
export default function webUpload (assign, options) {
  let config = {
    auto: true,
    swf: '/static/Uploader.swf',
    server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne',
    fileList: {id: '', type: ''}, // 上传显示的列表 id显示的div  type显示图片或文件
    pick: {
      id: '#picker',
      label: '', // 请采用 innerHTML 代替
      innerHTML: '', // 指定按钮文字
      multiple: true // 是否开起同时选择多个文件能力
    },
    resize: false, // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    headers: {token: vueCookie.get('token')},
    accept: {
      title: 'Images', // 文字描述
      extensions: 'gif,jpg,jpeg,bmp,png', // 允许的文件后缀，不带点，多个用逗号分割。
      mimeTypes: 'image/!*' // 多个用逗号分割。
    },
    formData: {},
    fileVal: 'file',
    method: 'POST',
    fileNumLimit: undefined, // 验证文件总数量
    fileSizeLimit: undefined, // 验证文件总大小是否超出限制
    fileSingleSizeLimit: 1024 * 1024 * 2, // 验证单个文件大小是否超出限制
    thumbnail: {width: 150, className: 'image-lg'},
    uploadFinished: undefined, // 所有文件上传结束后触发
    uploadSuccess: undefined, // 上传成功后触发
    error: undefined // 上传报错
  }
  let opts = $.extend({}, config, options)
  // eslint-disable-next-line
  let uploader = new WebUploader.Uploader.create(opts)

  // 显示被添加的图片列表
  if (opts.fileList.id !== '' && opts.fileList.type !== '') {
    uploader.on('fileQueued', function (file) {
      let $li = ''
      let $img = ''
      // 图片列表
      if (opts.fileList.type === 'image') {
        $li = $(
          '<div id="' + file.id + '" class="image-item ' + opts.thumbnail.className + 'fid=""><img><div class="image-panel"><span class="data"></span><a href="javascript:void(0);" class="cancel">删除</a></div><div class="uploadIfy-progress"><div class="uploadIfy-progress-bar"></div></div></div>'
        )
        $img = $li.find('img')

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        let ratio = window.devicePixelRatio || 1
        let thumbnailWidth = opts.thumbnail.width * ratio
        let thumbnailHeight = opts.thumbnail.width * ratio

        uploader.makeThumb(file, function (error, src) {
          if (error) {
            $img.replaceWith('<span>不能预览</span>')
            return
          }
          $img.attr('src', src)
        }, thumbnailWidth, thumbnailHeight)
      }
      // 文件列表
      if (opts.fileList.type === 'file') {
        $li = $('<div class="uploadIfy-queue-item" id="' + file.id + '" fid=""><div class="cancel"><a href="javascript:void(0);">X</a></div><span class="fileName">' + file.name + ' (' + bytesToSize(file.size) + ')</span><span class="data"></span><div class="uploadIfy-progress"><div class="uploadIfy-progress-bar"></div></div></div>')
      }

      // $list为容器jQuery实例
      $(opts.fileList.id).append($li)

      // 删除文件
      $li.on('click', '.cancel', function () {
        let fid = $li.attr('fid')
        uploader.removeFile(file)
        $li.remove()
        console.log(fid)
      })
    })

    uploader.on('uploadComplete', function (file) {
      $('#' + file.id).find('.uploadIfy-progress').fadeOut()
    })
  }

  // 上传文件时进度条
  uploader.on('uploadProgress', function (file, percentage) {
    $('#' + file.id).find('.uploadIfy-progress-bar').width(percentage * 100 + '%')
  })

  // 上传成功
  uploader.on('uploadSuccess', function (file, response) {
    let $this = $('#' + file.id)
    if (opts.uploadSuccess !== undefined && Object.prototype.toString.call(opts.uploadSuccess) === '[object Function]') {
      opts.uploadSuccess(file, response)
    } else {
      $this.find('.image-panel').show() // 显示图片时
      $this.find('.data').text('上传成功')
      $this.attr('fid', response.data.id)
      assign.push(response.data)
    }
  })
  // 所有文件上传结束后触发
  uploader.on('uploadFinished', function () {
    if (opts.uploadFinished !== undefined && Object.prototype.toString.call(opts.uploadFinished) === '[object Function]') {
      opts.uploadFinished()
    }
  })

  // 上传出错时
  uploader.on('uploadError', function (file) {
    $('#' + file.id).find('.data').text('上传出错')
    layer.alert('上传出错')
  })

  // 返回错误信息
  uploader.on('error', function (error) {
    if (Object.prototype.toString.call(opts.error) === '[object Function]') {
      opts.error(error)
    } else {
      if (error === 'F_EXCEED_SIZE') {
        layer.alert('文件超出指定大小', {icon: 2})
      }
      if (error === 'Q_TYPE_DENIED') {
        layer.alert('文件类型不正确！', {icon: 2})
      }
      if (error === 'Q_EXCEED_NUM_LIMIT') {
        layer.alert('文件超出个数！', {icon: 2})
      }
    }
  })
}
setTimeout(function () {
  // 删除编辑时所输出的默认文件
  $(document).on('click', '[id^=EDIT_WU_FILE] .cancel', function () {
    let fid = $(this).parents('[id^=EDIT_WU_FILE]').attr('fid')
    console.log(fid)
  })
}, 1000)
