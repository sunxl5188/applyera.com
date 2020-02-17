<template>
    <div>
        <script type="text/plain" id="uEditor" disabled=""></script>
    </div>
</template>

<script>
export default {
  name: 'UeEditor',
  data () {
    return {
      editor: null
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {
      }
    }
  },
  destroyed () { // 实例销毁后调用
    this.editor.destroy()
  },
  mounted () {
    // https://www.jianshu.com/p/2c2c54acf1b9
    this.editor = window.UE.getEditor('uEditor', this.config)
    this.editor.addListener('ready', () => {
      this.editor.setContent(this.value)
    })
    this.editor.addListener('contentChange', () => {
      this.$emit('UeCallback', this.editor.getContent())
    })
  }
}
</script>

<style>
@import '../../../static/js/ueditor/themes/default/_css/ueditor.css';
</style>
