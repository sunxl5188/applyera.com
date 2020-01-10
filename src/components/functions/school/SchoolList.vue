<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div id="school" :style="name==='schoollist'?'':'display:none;'">
            <ul class="nav nav-tabs"><!--nav-justified-->
                <li :class="{active:tabActive===''||tabActive===1}" @click="tabActive=1"><router-link to="/functions/schoollist?tabActive=1" exact>查找院校</router-link></li>
                <li :class="{active:tabActive===2}" @click="tabActive=2"><router-link to="/functions/schoollist?tabActive=2" exact>查找专业</router-link></li>
                <li :class="{active:tabActive===3}" @click="tabActive=3"><router-link to="/functions/schoollist?tabActive=3" exact>我的收藏</router-link></li>
            </ul>
            <div class="tab-content mt-15">
                <keep-alive include="SchoolListComponent,MajorComponent">
                    <component :is="currentComponent"></component>
                </keep-alive>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import SchoolListComponent from '@#/functions/school/SchoolListComponent'
import MajorComponent from '@#/functions/school/MajorComponent'
import CollectionComponent from '@#/functions/school/CollectionComponent'
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
      tabActive: ''
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
    self.tabActive = self.$route.query.tabActive || ''
    self.$nextTick(() => {
      if (self.tabActive === '' || self.tabActive === 1) {
        self.currentComponent = SchoolListComponent
      }
    })
  },
  methods: {},
  components: {
    SchoolListComponent,
    MajorComponent,
    CollectionComponent
  },
  watch: {
    tabActive () {
      switch (this.tabActive) {
        case 2:
          this.currentComponent = MajorComponent
          break
        case 3:
          this.currentComponent = CollectionComponent
          break
        default:
          this.currentComponent = SchoolListComponent
      }
    },
    $route (to, form) {
      this.name = (to.name).toLocaleLowerCase()
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
