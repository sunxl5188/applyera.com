<template>
    <div>
        <div :class="{hidden:name!=='saleslead'}">
            <div class="po_re">
                <div class="col-sm-4 po_ab" style="right:-15px;top: -60px;">
                    <div class="form-group form-search">
                        <i class="iconfont" style="right: auto;left: 0;">&#xe741;</i>
                        <i class="iconfont handPower clearSearch" autocomplete="off" v-if="keyword" @click="keyword='';pagechange(1)">&#xe7f6;</i>
                        <input type="text" name="keyword" class="form-control"
                               placeholder="搜索所有内容"
                               style="padding-left:30px;" v-model="keyword" @keyup.enter="pagechange(1)">
                    </div>
                </div>
            </div>
            <table class="table bdl bdr bdb filter">
                <tbody>
                <tr>
                    <td width="10%" class="text-center"><b>加入时间</b></td>
                    <td>
                        <a href="javascript:void(0);" class="label label-primary">不限</a>
                        <a href="javascript:void(0);" class="label">本周</a>
                        <a href="javascript:void(0);" class="label">本月</a>
                        <span id="customTime" contenteditable="true" data-placeholder="自定义时间段"></span>
                    </td>
                </tr>
                </tbody>
            </table>
            <table class="table table-customize">
                <thead>
                <tr>
                    <th width="5%"></th>
                    <th>触手姓名</th>
                    <th>联系电话</th>
                    <th>累计线索数</th>
                    <th>签单数</th>
                    <th>
                        加入时间
                        <a href="javascript:void(0);"
                           :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                           @click="listSort"></a>
                    </th>
                    <th width="5%"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="checkbox" name="id[]" value=""></td>
                    <td>
                        <router-link to="/" class="cded">学生姓名</router-link>
                    </td>
                    <td>13111111111</td>
                    <td>223</td>
                    <td>3r3r</td>
                    <td>2019-01-06</td>
                    <td>
                        <div class="dropdown">
                            <a href="javascript:void(0);" data-toggle="dropdown"><i
                                    class="iconfont">&#xe66b;</i></a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><router-link to="/marketing/saleslead/tentacledetail">查看</router-link></li>
                                <li><a href="javascript:void(0);">禁用</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
  name: 'Tentacle',
  data () {
    return {
      name: 'saleslead',
      keyword: '',
      time_sort: 0
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.name = self.$route.name
      self.laydate.render({
        elem: '#customTime',
        type: 'date',
        range: true,
        done: (value) => {

        }
      })
    })
  },
  methods: {
    pagechange (page) {},
    listSort () {
      let self = this
      if (self.time_sort === 0) {
        self.time_sort = 1
      } else if (self.time_sort === 1) {
        self.time_sort = 2
      } else if (self.time_sort === 2) {
        self.time_sort = 1
      }
      self.pagechange()
    }
  },
  watch: {
    $route (to, from) {
      this.name = to.name
    }
  }
}
</script>

<style scoped lang="scss">
.filter{
    & tbody tr td{padding-top:15px;padding-bottom:15px;}
    & .label{
        margin-right:10px;color:#333;
        &.label-primary{color:#fff;}
    }
    & .active{background-color:#39f;color:#fff;line-height:22px;padding-left:.8rem;padding-right:.8rem;-webkit-border-radius:.25em;-moz-border-radius:.25em;border-radius:.25em;}
}
</style>
