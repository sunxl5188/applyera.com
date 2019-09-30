<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">文书作答</div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                    <div class="form-group">
                        <button type="button" class="btn btn-default ml-10"><i class="iconfont">&#xe62c;</i> 分享</button>
                        <button type="button" class="btn btn-default ml-10"><i class="iconfont">&#xe637;</i> 保存</button>
                        <button type="button" class="btn btn-default ml-10"><i class="iconfont">&#xe64d;</i> 提交</button>
                        <button type="button" class="btn btn-default ml-10" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                            返回
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 bdr-d">
                <div class="clearfix pb-30">
                    <input type="text" name="title" class="form-control title" placeholder="请输入推荐信标题"/>
                </div>
                <table class="table">
                    <tbody>
                    <tr>
                        <td class="w20 text-center bgGray">学生姓名</td>
                        <td>
                            <div class="col-sm-6">
                                <select name="" class="form-control selectpicker show-tick">
                                    <option value="">请选择</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">申报类型</td>
                        <td>
                            <div class="col-sm-6">
                                <select name="" class="form-control selectpicker show-tick">
                                    <option value="">请选择</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">申请学校</td>
                        <td>
                            <div class="col-sm-6">
                                <select name="" class="form-control selectpicker show-tick">
                                    <option value="">请选择</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">申请专业</td>
                        <td>
                            <div class="col-sm-6">
                                <select name="" class="form-control selectpicker show-tick">
                                    <option value="">请选择</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="font16 fontB clearfix lh50">推荐人信息</div>
                <table class="table">
                    <tbody>
                    <tr>
                        <td class="w20 text-center bgGray">姓名</td>
                        <td>
                            <input type="text" class="form-control" placeholder="请输入推荐人姓名"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">联系电话</td>
                        <td>
                            <input type="text" class="form-control" placeholder="请输入推荐人联系电话"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">联系邮箱</td>
                        <td>
                            <input type="text" class="form-control" placeholder="请输入推荐人联系邮箱"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">工作职位</td>
                        <td>
                            <input type="text" class="form-control" placeholder="请输入推荐人的职位"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="w20 text-center bgGray">工作单位</td>
                        <td>
                            <input type="text" class="form-control" placeholder="请输入推荐人工作单位"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="clearfix">
                    <textarea class="form-control" placeholder="请用英文输入推荐信正文"></textarea>
                </div>
                <div class="clearfix bda-d lh34 text-center mt-15">
                    <a href="javascript:void(0);" class="c999" @click="addLetter()">
                        <i class="iconfont">&#xe73e;</i>
                        添加推荐信
                    </a>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="dropdown">
                    <a href="javascript:void(0);" data-toggle="dropdown">
                        批注记录
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="#">批注记录</a></li>
                        <li><a href="#">操作记录</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'

export default {
  name: 'AddLetter',
  data () {
    return {
      letterArr: []
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      $('.selectpicker').selectpicker()
    })
  },
  methods: {
    // 添加推荐信
    addLetter () {
    }
  }
}
</script>

<style scoped lang="scss">
.title {border:none;padding-left:0;padding-right:0;}

.table {
    & tbody {
        & tr {
            & td {
                &:first-of-type {border-top:none;}

                &:last-of-type {border-right:1px solid #ddd;}
            }

            &:last-of-type {
                & td {
                    &:last-of-type {border-bottom:1px solid #ddd;}
                }
            }
        }
    }
}
</style>
