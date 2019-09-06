<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div id="school" :style="name==='schoollist'?'':'display:none;'">
            <ul class="nav nav-tabs"><!--nav-justified-->
                <li :class="{active:tabActive===1}"><a href="#tabs1" data-toggle="tab">查找院校</a></li>
                <li :class="{active:tabActive===2}"><a href="#tabs2" data-toggle="tab">查找专业</a></li>
                <li :class="{active:tabActive===3}"><a href="#tabs3" data-toggle="tab">我的收藏</a></li>
            </ul>
            <div class="tab-content mt-15">
                <div class="tab-pane fade in active">
                    <component :is="currentComponent"></component>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import SchoolListComponent from '@/components/functions/school/SchoolListComponent'
import MajorComponent from '@/components/functions/school/MajorComponent'
import CollectionComponent from '@/components/functions/school/CollectionComponent'
import store from '@/vuex/Store'

export default {
  name: 'SchoolList',
  store,
  data () {
    return {
      name: 'schoollist',
      currentComponent: '',
      schoolComponent: '',
      majorComponent: '',
      collection: '',
      tabActive: 1
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.name = (self.$route.name).toLocaleLowerCase()
    self.$nextTick(() => {
      if (self.name === 'schoollist') {
        self.currentComponent = SchoolListComponent
      }
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if (e.target.getAttribute('href') === '#tabs1') {
          self.currentComponent = SchoolListComponent
          self.tabActive = 1
        }
        if (e.target.getAttribute('href') === '#tabs2') {
          self.currentComponent = MajorComponent
          self.tabActive = 2
        }
        if (e.target.getAttribute('href') === '#tabs3') {
          self.currentComponent = CollectionComponent
          self.tabActive = 3
        }
      })
    })
  },
  methods: {},
  components: {
    SchoolListComponent,
    MajorComponent,
    CollectionComponent
  },
  watch: {
    $route (to, form) {
      this.name = (to.name).toLocaleLowerCase()
      if (this.name === 'schoollist') {
        this.currentComponent = SchoolListComponent
        this.tabActive = 1
      }
    }
  }
}
</script>

<style scoped lang="scss">
    #school{
        & .nav{
            &.nav-tabs{
                border-bottom:none;

                & > li{
                    margin-right:30px;

                    & > a{
                        border-width:2px;
                        padding:5px 0;

                        &:hover{
                            background-color:#fff;
                            border-color:transparent;
                        }
                    }

                    &.active{
                        margin-bottom:0;

                        & > a{
                            border-top-color:transparent;
                            border-left-color:transparent;
                            border-right-color:transparent;
                            border-bottom-color:#428bca;
                        }
                    }
                }
            }
        }
    }
</style>
