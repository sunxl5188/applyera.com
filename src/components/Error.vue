<template>
    <div class="text-center pt-80 pb-80">
        <div class="blk-50"></div>
        <div class="clearfix"><img src="../../static/images/404.png" alt=""></div>
        <div class="clearfix pt-40">
            <h4>糟糕！您访问的页面找不到啦！程序猿小哥哥正在赶来..</h4>
            <p class="c999">Oops! We can't find the page you're looking for. We suggest that you return to the previous page,</p>
        </div>
        <div class="clearfix pt-30 pb-50">
            <button type="button" class="btn btn-primary" @click="history">返回上一页 ></button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Error',
  methods: {
    history () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
</style>
