<template>
    <div>
        <InitApplyNav :state="state" step="step2" :id="id"/>
        <div class="clearfix form-horizontal">
            您申请的学校有：普林斯顿大学，南安普顿大学，奥本大学,普林斯顿大学，南安普顿大学，奥本大学
        </div>
        <div class="clearfix lh30">建议上传附件：</div>
        <div class="clearfix lh24">
                <span class="tipsys mr-10">成绩单<i class="iconfont handPower c999" data-toggle="tooltip"
                                                 data-placement="top"
                                                 title="在读生请提供现有6个学期中英文完整成绩单； 毕业生请提供大学4年完整中英文成绩单）">&#xe999;</i></span>,
            <span class="tipsys mr-10">毕业证书 or 学位证书 or 在读证明<i class="iconfont handPower c999" data-toggle="tooltip"
                                                              data-placement="top"
                                                              title="如已毕业，请提供毕业证书或这位证书，请注意证书要打印在学校的信纸上，有中英文对照且加盖学校公章。如尚未毕业，请提供在读证明，在读证明需要打印在学校的信纸上，有中英文对照且加盖学校公章。">&#xe999;</i></span>,
            <span class="tipsys mr-10">推荐信<i class="iconfont handPower c999" data-toggle="tooltip"
                                             data-placement="top"
                                             title="推荐信请用学校信签纸打印，必须包含推荐人的姓名、电话、邮箱、地址信息、日期，推荐人亲笔签名">&#xe999;</i></span>,
            <span class="tipsys mr-10">语言成绩</span>,
            <span class="tipsys mr-10">护照</span>,
            <span class="tipsys mr-10">材料真实性声明<a :href="siteUrl + '/Public/xls_temp/Declaration_of_Authenticity.doc'"
                                                 target="_blank" class="cded"
                                                 download="Declaration_of_Authenticity">下载</a><i
                    class="iconfont handPower c999" data-toggle="tooltip" data-placement="top"
                    title="用于声明材料的真实性，请下载后打印">&#xe999;</i></span>,
            <span class="tipsys mr-10">个人简历</span>,
            <span class="tipsys mr-10">实习证明或工作证明<i class="iconfont handPower c999" data-toggle="tooltip"
                                                   data-placement="top"
                                                   title="请尽量提供中英文对照的实习证明或工作证明，打印在单位抬头纸上，并加盖上单位公章">&#xe999;</i></span>
            ,
            <span class="tipsys mr-10">奖状及证书<i class="iconfont handPower c999" data-toggle="tooltip"
                                               data-placement="top"
                                               title="如有证书或获奖请上传相关的扫描件，如奖学金，资格证书等。">&#xe999;</i></span>,
            <span class="tipsys mr-10">作品集<i class="iconfont handPower c999" data-toggle="tooltip"
                                             data-placement="top" title="艺术生提供，具体要求根据专业和学校而定">&#xe999;</i></span>,
            <span class="tipsys mr-10">课程列表<i class="iconfont handPower c999" data-toggle="tooltip"
                                              data-placement="top"
                                              title="在校大四学生尽量提供最后一学年的课程列表（module list）">&#xe999;</i></span>
        </div>
        <!--上传列表-->
        <div class="clearfix pb-15 pt-15 pl-45">
            <div class="pull-left">
                <label for="selectAll" class="checkbox">
                    <input type="checkbox" name="all" id="selectAll" value="all"/>
                    全选
                </label>
            </div>
            <div class="pull-right">
                <button type="button" class="btn btn-default ml-10" @click="downfile()">下载</button>
                <button type="button" class="btn btn-default ml-10" @click="delfile()">删除</button>
                <div id="picker">上传</div>
            </div>
        </div>
        <table class="table table-customize">
            <tbody>
            <tr v-for="(item, i) in list" :key="i">
                <td width="5%">
                    <input type="checkbox" name="id[]" :value="item.id"/>
                </td>
                <td>{{item.file_name}}</td>
                <td width="20%" class="bootstrap-select-border-no">
                    <select class="form-control selectpicker show-tick" data-width="fit" v-model="item.file_type"
                            @change="selectSaveType($event, item.id)">
                        <option value="">请关联</option>
                        <option :value="n" v-for="(items, n) in type_mapping" :key="n">{{items}}</option>
                    </select></td>
                <td>{{item.file_size}}</td>
                <td width="18%">{{item.add_time}}</td>
            </tr>
            <tr v-if="loading">
                <td colspan="5" v-html="LoadingImg()"></td>
            </tr>
            <tr v-if="!loading && list.length === 0">
                <td colspan="5" v-html="NoData()"></td>
            </tr>
            </tbody>
        </table>
        <div class="clearfix c999 lh20 font12">
            <div>小贴士：1. 申请材料请尽量上传PDF文件，大小不超过2MB。</div>
            <div style="text-indent:4em;">2. 同一种类文件的中英文（如在读证明，成绩单，实习证明）请务必把中英文合并放在同一个PDF文件里。</div>
        </div>
        <div class="blk20"></div>
        <div class="clearfix text-center">
            <button type="button" class="btn btn-primary">下一页</button>
            <button type="button" class="btn btn-outline-primary ml-20">保存</button>
        </div>
        <div id="fileList" class="hidden"></div>
        <a href="" id="downfile"></a>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import webupload from '@~/js/webupload'
// import db from '@~/js/request'
import InitApplyNav from '@#/functions/initApply/InitApplyNav'

export default {
  name: 'UploadData',
  data () {
    return {
      id: '',
      siteUrl: window.ajaxBaseUrl,
      loading: true,
      list: [],
      state: [0, 0, 0, 0]
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      self.id = self.$route.query.id || ''
      $('[data-toggle="tooltip"]').tooltip()
      $('.selectpicker').selectpicker()
      // *****************************
      setTimeout(function () {
        // 上传
        webupload(self.file_id, {
          fileList: { id: '#fileList', type: 'file' },
          accept: {
            title: '',
            extensions: 'pdf',
            mimeTypes: '*!/!*'
          },
          formData: { u_type: 'apply' },
          uploadFinished: function () {
            self.pageChange()
          },
          error: (e) => {
            if (e === 'Q_TYPE_DENIED' || e === 'F_EXCEED_SIZE') {
              self.layer.alert('请上传PDF格式的文件', { icon: 2 })
            }
          }
        })
      }, 500)
    })
  },
  methods: {
    downfile () {

    },
    delfile () {

    }
  },
  components: {
    InitApplyNav
  },
  watch: {},
  errorCaptured (err, vm, info) {
    console.log(err)
  }
}
</script>

<style lang="scss">
#picker{
    display:inline-block;vertical-align:middle;height:34px;margin-left:10px;
    & .webuploader-pick{
      padding:7px 15px;background-color:#547bbd;color:#fff;height:34px;
        &:before{content:'';}
  }
}
</style>
