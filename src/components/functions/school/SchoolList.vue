<template>
    <div class="container-fluid bgWhite pt-25 pb-25">
        <div id="school" :style="name==='schoollist'?'':'display:none;'">
            <ul class="nav nav-tabs"><!--nav-justified-->
                <li :class="{active:tabActive===1}" @click="setTabs(1)"><a href="javascript:void(0);">查找院校</a></li>
                <li :class="{active:tabActive===2}" @click="setTabs(2)"><a href="javascript:void(0);">查找专业</a></li>
                <li :class="{active:tabActive===3}" @click="setTabs(3)"><a href="javascript:void(0);">我的收藏</a></li>
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
    })
  },
  methods: {
    setTabs (type) {
      let self = this
      self.tabActive = type
      switch (type) {
        case 1:
          self.currentComponent = SchoolListComponent
          break
        case 2:
          self.currentComponent = MajorComponent
          break
        case 3:
          self.currentComponent = CollectionComponent
          break
      }
    }
  },
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
