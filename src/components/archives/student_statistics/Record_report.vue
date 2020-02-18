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
                        <select v-model="adviser" data-live-search="true" @change="getFollowState()"
                                class="form-control selectpicker"
                                style="display:inline-block;width:auto;">
                            <option value="">请选择负责人</option>
                            <option :value="item.id" v-for="(item,i) in adviserArr" :key="i">{{item.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="student_statistics">
                <div class="student_statistics_left">
                    跟进时间：
                </div>
                <div class="student_statistics_right">
                    <a href="javascript:void(0);" :class="{active:created_time===''}"
                       @click="created_time='';getFollowState()">全部</a>
                    <a href="javascript:void(0);" :class="{active:created_time===1}"
                       @click="created_time=1;getFollowState()">本周</a>
                    <a href="javascript:void(0);" :class="{active:created_time===2}"
                       @click="created_time=2;getFollowState()">本月</a>
                    <a href="javascript:void(0);" :class="{active:created_time===3}"
                       @click="created_time=3;getFollowState()">本季度</a>
                    <div contenteditable="true" data-placeholder="自定义时间" id="times"
                         :class="{active:customizeTime}"></div>
                </div>
            </div>
        </div>
        <div class="clearfix text-center pb-25">
            <div class="col-sm-2 col-sm-offset-3">跟进学生数<br>{{header[0]}}</div>
            <div class="col-sm-2">跟进次数<br>{{header[1]}}</div>
            <div class="col-sm-2">发起申请数<br>{{header[2]}}</div>
        </div>
        <div class="MyChartsBody bda">
            <div id="myChartsThree"></div>
        </div>

        <div class="blk30"></div>

        <table class="table table-customize">
            <thead>
            <tr>
                <th>负责人</th>
                <th>跟进学生数</th>
                <th>跟进次数</th>
                <th>填写留学规划(份)</th>
                <th>填写申请资料(份)</th>
                <th>发起院校申请次数</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in list" :key="i">
                <td>{{item.name}}</td>
                <td>{{item.student_count}}</td>
                <td>{{item.follow_count}}</td>
                <td>{{item.plan_count}}</td>
                <td>{{item.material_count}}</td>
                <td>{{item.apply_count}}</td>
            </tr>
            </tbody>
        </table>

        <pagination :total="total" :current-page='current' :display="5" @pagechange="getFollowState"></pagination>

    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import echarts from 'echarts'
import store from '@/vuex/Store'
import db from '@~/js/request'
import pagination from '@#/shared/Pagination'

export default {
  name: 'Record_report',
  store,
  data () {
    return {
      adviser: '',
      created_time: '',
      loading: true,
      header: [0, 0, 0],
      adviserArr: [],
      list: [],
      total: 0,
      current: 1
    }
  },
  computed: {
    token () {
      return store.state.token
    },
    customizeTime () {
      if (this.created_time === '' || this.created_time === 1 || this.created_time === 2 || this.created_time === 3) {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    let self = this
    self.laydate.render({
      elem: '#times',
      type: 'date',
      done: (value) => {
        self.created_time = value
        self.getFollowState()
      }
    })
    self.createChart()
    self.getFollowState()
  },
  methods: {
    getFollowState (p) {
      let self = this
      let params = new URLSearchParams()
      params.append('page', p || 1)
      params.append('adviser', self.adviser)
      params.append('created_time', self.created_time)
      db.postRequest('/Institution/Statistic/followStatistic', params).then(res => {
        if (res.status === 1) {
          self.list = res.data.table
          self.total = res.data.total
          self.adviserArr = res.data.adviser
          self.header = res.data.header
          self.createChart(res.data.chart.legend, res.data.chart.userName, res.data.chart.series)
          setTimeout(function () {
            $('.selectpicker').selectpicker('refresh')
          }, 500)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
        self.current = p || 1
      })
    },
    createChart (legend, userName, series) {
      let options = {
        color: ['#ff9f69', '#ffe168', '#5bc49f', '#32d3eb', '#60acfc', '#4bb1a6'],
        grid: {top: 20, bottom: 80, left: '5%', right: '2%'},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: 10,
          data: legend
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: userName
          }
        ],
        yAxis: [{type: 'value'}],
        series: []
      }

      for (let k in series) {
        options.series.push({
          name: series[k].title,
          type: 'bar',
          barGap: 0,
          data: series[k].data
        })
      }

      let dom = document.getElementById('myChartsThree')
      let myChart = echarts.init(dom)
      if (options && typeof options === 'object') {
        myChart.setOption(options, true)
      }
    }
  },
  components: { pagination }
}
</script>

<style scoped lang="less">
    .student_statistics {
        margin-bottom:15px;

        &:after {content:'';width:100%;height:0;display:block;clear:both;}

        & .student_statistics_left {
            float:left;width:10%;text-align:right;padding-right:10px;line-height:34px;
        }

        & .student_statistics_right {
            float:right;width:90%;padding:5px 0;

            & > a, & > div {
                display:inline-block;margin-right:10px;padding:0 8px;line-height:24px;

                &.active {
                    background-color:#39f;color:#fff;
                }
            }
        }
    }

    .MyChartsBody {
        width:100%;height:450px;

        & #myChartsThree {
            width:100%;height:450px;margin:0 auto;
        }
    }
</style>
