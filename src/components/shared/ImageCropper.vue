<template>
    <div>
        <div class="clearfix pb-25 pl-50">
            <label class="uploadBtn" for="uploads">
                <input type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="uploadImg($event)">
                选择文件上传
            </label>
        </div>

        <div class="row">
            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 pl-50">
                <div class="img-container">
                    <img id="image" :src="fileName" v-if="fileName">
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="avatar-preview preview-lg"></div>
                <div class="avatar-preview preview-md"></div>
                <div class="avatar-preview preview-sm"></div>
            </div>
        </div>
        <div class="blk30"></div>
    </div>
</template>

<script>
import store from '@/vuex/Store'
import db from '@~/js/request'
require('@@/js/cropper/cropper')
export default {
  name: 'ImageCropper',
  store,
  data () {
    return {
      fileName: '',
      fileBlob: '',
      axis: {},
      imagesW: 0,
      imagesH: 0
    }
  },
  props: ['func'],
  computed: {
    token () {
      return store.state.token
    }
  },
  methods: {
    // 上传图片（点击上传按钮）
    uploadImg (e) {
      let self = this
      let data
      // 上传图片
      let file = e.target.files[0]
      self.fileBlob = file
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        self.layer.alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种', {icon: 2})
        return false
      }
      let reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        let img = new Image()
        img.src = data
        img.onload = function () {
          self.imagesW = this.width
          self.imagesH = this.height
        }
        self.fileName = data
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)

      self.startCropper()
    },
    uploadFile () {
      let self = this
      let params = new FormData()
      params.append('func', self.func)
      params.append('file', self.fileBlob)
      params.append('axis', JSON.stringify(self.axis))
      if (self.imagesW > 2000 || self.imagesH > 2000) {
        self.layer.alert('图片宽度与高度已超出2000PX,设缩小图片尺寸后上传', {icon: 2})
        return false
      }
      db.postRequest('Institution/Upload/uploadOne', params).then(res => {
        if (res.status === 1) {
          self.$emit('cropperCallBack', res.data)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    startCropper () {
      let self = this
      $('.img-container img').cropper('destroy')
      setTimeout(function () {
        let option = {
          aspectRatio: 2 / 2,
          minContainerWidth: 150,
          minContainerHeight: 150,
          preview: '.avatar-preview',
          crop: function (event) {
            self.axis = {'x1': event.detail.x, 'x2': event.detail.x + event.detail.width, 'y1': event.detail.y, 'y2': event.detail.y + event.detail.height}
          }
        }
        if (self.func === 'logo') {
          option.aspectRatio = 16 / 9
        }
        $('#image').cropper(option)
      }, 600)
    }
  }
}
</script>
<style lang="css">
    @import "../../../static/js/cropper/cropper.css";
</style>
<style scoped lang="scss">
    .uploadBtn{
        background-color:#fff;border:1px solid #ccc;position:relative;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;padding:6px 15px;cursor:pointer;

        & input{filter:Alpha(Opacity=0); opacity:0;position:absolute;left:0;top:0;z-index:1;}
    }

    .img-container{
        width:100%;height:350px;text-align:center;
        background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');

        & > img{max-width:100%;max-height:100%;}
    }

    /*----------------*/
    .avatar-preview{
        float:none;border:1px solid #eee;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;overflow:hidden;margin-bottom:15px;
        background-color:#f4f4f4;

        &.preview-lg{width:150px;height:150px;}

        &.preview-md{width:100px;height:100px;}

        &.preview-sm{width:50px;height:50px;}

        & img{width:100%;height:100%;}
    }
</style>
