<template>
    <div>
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
        <table class="table bda filter">
            <tbody>
            <tr>
                <td width="10%" class="text-center"><b>添加时间</b></td>
                <td>
                    <a href="javascript:void(0);" class="label label-primary">不限</a>
                    <a href="javascript:void(0);" class="label">本周</a>
                    <a href="javascript:void(0);" class="label">本月</a>
                    <span id="customTime" contenteditable="true" data-placeholder="自定义时间段"></span>
                </td>
            </tr>
            <tr>
                <td width="10%" class="text-center"><b>线索来源</b></td>
                <td>
                    <div class="col-sm-3">
                        <select name="name" class="form-control selectpicker">
                            <option value=""> 请选择销售触手 </option>
                        </select>
                    </div>
                </td>
            </tr>
            <tr>
                <td width="10%" class="text-center"><b>负责顾问</b></td>
                <td>
                    <div class="col-sm-3">
                        <select name="name" class="form-control selectpicker">
                            <option value=""> 请选择负责顾问 </option>
                        </select>
                    </div>
                </td>
            </tr>
            <tr>
                <td width="10%" class="text-center"><b>当前状态</b></td>
                <td>
                    <a href="javascript:void(0);" class="label label-primary">不限</a>
                    <a href="javascript:void(0);" class="label">未跟进</a>
                    <a href="javascript:void(0);" class="label">咨询/回访</a>
                </td>
            </tr>
            </tbody>
        </table>

        <table class="table table-customize">
            <thead>
            <tr>
                <th width="5%"></th>
                <th>学生姓名</th>
                <th>联系电话</th>
                <th>线索来源</th>
                <th>
                    添加时间
                    <a href="javascript:void(0);"
                       :class="time_sort===0?'iconfont sort':(time_sort===1?'iconfont sort up':'iconfont sort down')"
                       @click="listSort"></a>
                </th>
                <th>负责顾问</th>
                <th>当前状态</th>
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
                <td>2019-01-06</td>
                <td>----</td>
                <td>
                    未跟进
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="id[]" value=""></td>
                <td>
                    <router-link to="/" class="cded">学生姓名</router-link>
                </td>
                <td>13111111111</td>
                <td>223</td>
                <td>2019-01-06</td>
                <td>----</td>
                <td>
                    签单/转案 (<a href="javascript:void(0);" class="cded">审核</a>)
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="id[]" value=""></td>
                <td>
                    <router-link to="/" class="cded">学生姓名</router-link>
                </td>
                <td>13111111111</td>
                <td>223</td>
                <td>2019-01-06</td>
                <td>----</td>
                <td>
                    已返佣 (<a href="javascript:void(0);" class="cded">查看明细</a>)
                </td>
            </tr>
            </tbody>
        </table>
        <!--审核线索-->
        <a class="btn btn-primary" data-toggle="modal" data-backdrop="static" data-target="#modal-id">审核线索</a>
        <div class="modal fade bs-example-modal-lg" id="modal-id">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">审核线索</h4>
                    </div>
                    <form action="" method="POST" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                    <div class="modal-body">
                         <div class="pl-15 pr-15">
                             <div class="row">
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                      <div class="form-group">
                                          <label class="col-sm-4 control-label">学生姓名</label>
                                          <div class="col-sm-8 lh34">
                                              李**
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                      <div class="form-group">
                                          <label class="col-sm-4 control-label">负责顾问</label>
                                          <div class="col-sm-8 lh34">
                                              李**
                                          </div>
                                      </div>
                                  </div>
                             </div>
                             <div class="row">
                                 <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                     <div class="form-group">
                                         <label class="col-sm-4 control-label">线索来源</label>
                                         <div class="col-sm-8 lh34">
                                             李**
                                         </div>
                                     </div>
                                 </div>
                                 <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                     <div class="form-group">
                                         <label class="col-sm-4 control-label">审核状态</label>
                                         <div class="col-sm-8 lh34">
                                             李**
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div class="row">
                                 <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                     <div class="form-group">
                                         <label class="col-sm-4 control-label">签单来源</label>
                                         <div class="col-sm-8">
                                             <input type="text" name="" class="form-control" placeholder="请输入"/>
                                         </div>
                                     </div>
                                 </div>
                                 <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                     <div class="form-group">
                                         <label class="col-sm-4 control-label">签单时间</label>
                                         <div class="col-sm-8">
                                             <input type="text" name="" class="form-control" placeholder="请选择"/>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div class="row">
                                 <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                     <div class="form-group">
                                         <label class="col-sm-4 control-label">返佣金额</label>
                                         <div class="col-sm-8">
                                             <input type="text" name="" class="form-control" placeholder="请输入"/>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <!--查看明细-->
        <a class="btn btn-primary" data-toggle="modal" data-backdrop="static" data-target="#modal-id2">查看明细</a>
        <div class="modal fade bs-example-modal-lg" id="modal-id2">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">查看明细</h4>
                    </div>
                    <div class="modal-body">
                        <div class="pl-15 pr-15">
                            <div class="row">
                                 <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">学生姓名</label>
                                        <div class="col-sm-8 lh34">
                                          李**
                                        </div>
                                    </div>
                                 </div>
                                 <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                     <div class="form-group">
                                         <label class="col-sm-4 control-label">负责顾问</label>
                                         <div class="col-sm-8 lh34">
                                             李**
                                         </div>
                                     </div>
                                 </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">线索来源</label>
                                        <div class="col-sm-8 lh34">
                                            李**
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">返佣日期</label>
                                        <div class="col-sm-8 lh34">
                                            2019-10-10 10:10:10
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">签单金额</label>
                                        <div class="col-sm-8 lh34">
                                            ￥200000000
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">签单时间</label>
                                        <div class="col-sm-8 lh34">
                                            2019-10-10 10:10:10
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">收款方</label>
                                        <div class="col-sm-8 lh34">
                                            张**
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">收款帐户</label>
                                        <div class="col-sm-8 lh34">
                                            35346436
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">交易渠道</label>
                                        <div class="col-sm-8 lh34">
                                            支付宝
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">交易附件</label>
                                        <div class="col-sm-8 lh34">
                                            ---
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">交易附言</label>
                                        <div class="col-sm-8 lh20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">确定</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/js/i18n/defaults-zh_CN'
export default {
  name: 'Follow',
  data () {
    return {
      keyword: '',
      time_sort: 0
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      $('.selectpicker').selectpicker()
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
    validateBeforeSubmit () {

    },
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
  }
}
</script>

<style scoped lang="scss">
.filter{
    & tbody tr td{padding-top:10px;padding-bottom:10px;border:none;}
    & tbody tr:first-of-type td{ padding-top:20px;}
    & tbody tr:last-of-type td{ padding-bottom:20px;}
    & .label{
          margin-right:10px;color:#333;
    &.label-primary{color:#fff;}
    }
    & .active{background-color:#39f;color:#fff;line-height:22px;padding-left:.8rem;padding-right:.8rem;-webkit-border-radius:.25em;-moz-border-radius:.25em;border-radius:.25em;}
}
</style>
