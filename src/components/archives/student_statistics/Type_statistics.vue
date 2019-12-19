<template>
    <div>
        <div class="blk15"></div>
        <div class="clearfix">
            <div class="student_statistics">
                <div class="student_statistics_left">
                    跟进负责人：
                </div>
                <div class="student_statistics_right" style="padding: 0;">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <select class="form-control selectpicker" data-live-search="true" v-model="adviser" @change="getTypeStudent()"
                                style="display:inline-block;width:auto;">
                            <option value="">请选择负责人</option>
                            <option :value="item.id" v-for="(item,i) in adviserArr" :key="i">{{item.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="student_statistics">
                <div class="student_statistics_left">
                    跟进状态：
                </div>
                <div class="student_statistics_right">
                    <a href="javascript:void(0);" :class="{active:sign_type===''}"
                       @click="sign_type='';getTypeStudent()">全部</a>
                    <a href="javascript:void(0);" :class="{active:sign_type===item.id}"
                       @click="sign_type=item.id;getTypeStudent()"
                       v-for="(item,i) in status" :key="i">{{item.status_name}}</a>
                </div>
            </div>
        </div>

        <div class="MyChartsBody bda">
            <div id="myChartsTow"></div>
        </div>

        <div class="blk30"></div>

        <table class="table table-customize">
            <thead>
            <tr>
                <th v-for="(item, i) in list.title" :key="i">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in list.data" :key="i">
                <td v-for="(items, k) in item" :key="k">{{items}}</td>
            </tr>
            <tr v-if="list.length===0">
                <td colspan="6" v-html="NoData"></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import echarts from 'echarts'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Type_statistics',
  store,
  data () {
    return {
      adviser: '',
      sign_type: '',
      list: {title: [], data: []},
      adviserArr: [],
      status: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.getTypeStudent()
  },
  methods: {
    getTypeStudent () {
      let self = this
      let params = new URLSearchParams()
      setTimeout(function () {
        params.append('adviser', self.adviser)
        params.append('sign_type', self.sign_type)
        db.postRequest('Institution/Statistic/studentTypeStatistic', params).then(res => {
          if (res.status === 1) {
            self.list.title = res.data.table_fields
            self.list.data = res.data.table
            self.adviserArr = res.data.adviser
            self.status = res.data.status
            self.createChart(res.data.chart)
            setTimeout(function () {
              $('.selectpicker').selectpicker('refresh')
            }, 500)
          } else {
            console.log(res.msg)
          }
        })
      }, 300)
    },
    createChart (data) {
      let options = {
        color: data.colors, // ["#ff9f69", "#ffe168", "#5bc49f", "#32d3eb", "#60acfc", "#4bb1a6"]
        grid: {top: 20, bottom: 80, left: '5%', right: '2%'},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: 10,
          data: []
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: data.title
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      }

      data.data.map((item, i) => {
        options.legend.data.push(item.title)
        options.series.push({
          name: item.title,
          type: 'bar',
          barGap: 0,
          data: item.data
        })
      })

      let dom = document.getElementById('myChartsTow')
      let myChart = echarts.init(dom)
      if (options && typeof options === 'object') {
        myChart.setOption(options, true)
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .student_statistics {
        margin-bottom:15px;

        &:after {content:'';width:100%;height:0;display:block;clear:both;}

        & .student_statistics_left {
            float:left;width:10%;text-align:right;padding-right:10px;line-height:34px;
        }

        & .student_statistics_right {
            float:right;width:90%;padding:5px 0;

            & > a {
                display:inline-block;margin-right:10px;padding:0 8px;line-height:24px;

                &.active {
                    background-color:#39f;color:#fff;
                }
            }
        }
    }

    .MyChartsBody {
        width:100%;height:450px;

        & #myChartsTow {
            width:100%;height:450px;margin:0 auto;
        }
    }
</style>
