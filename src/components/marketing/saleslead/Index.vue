<template>
    <div>
        <div :class="{hidden:name!=='saleslead'}">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">销售线索</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right"></div>
                </div>
            </div>
            <ul class="nav nav-tabs"><!--nav-justified-->
                <li class="active" @click="currentComponent='Tentacle'"><a href="#tabs1" data-toggle="tab">销售触手</a></li>
                <li @click="currentComponent='Follow'"><a href="#tabs2" data-toggle="tab">线索跟进</a></li>
                <li @click="currentComponent='Settlement'"><a href="#tabs3" data-toggle="tab">线索结算</a></li>
            </ul>
            <div class="blk20"></div>
        </div>
        <div class="tab-content">
            <div class="tab-pane fade in active">
                <component :is="currentComponent"></component>
            </div>
        </div>
    </div>
</template>

<script>
import Tentacle from '@#/marketing/saleslead/Tentacle'
import Follow from '@#/marketing/saleslead/Follow'
import Settlement from '@#/marketing/saleslead/Settlement'
export default {
  name: 'Index',
  data () {
    return {
      name: 'saleslead',
      currentComponent: Tentacle
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.name = self.$route.name
      $(document).on('click', '.filter a', function () {
        $(this).siblings('span').html('')
      })
    })
  },
  components: { Tentacle, Follow, Settlement },
  watch: {
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped lang="scss">
.nav.nav-tabs{
    border:none;
    & > li{
        margin-bottom:0;
        & a{background:#fff !important;border:none;}
        &:after{content:'';width:60%;height:2px;background-color:transparent;display:block;position:absolute;left:20%;bottom:0;}
        &.active{
            &:after{background-color:#39f;}
            & a{
                border:none;
            }
        }
    }
}
</style>
