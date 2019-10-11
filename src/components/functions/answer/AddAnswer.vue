<template>
    <div>
        <div class="clearfix pb-30">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="headerTitle">题目作答</div>
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
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 bdr-d leftBox">
                <div class="clearfix pb-30">
                    <input type="text" name="title" class="form-control title" placeholder="请输入文书标题"/>
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
                                    <option value="1">本科</option>
                                    <option value="2">硕士</option>
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
                <div class="clearfix lh50 font16 fontB">个人陈述</div>
                <div class="clearfix lh22 pb-15 notebook">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo
                    commodo. Proin sodales pulvinar sic tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo
                    commodo. Proin sodales pulvinar sic tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo
                    commodo. Proin sodales pulvinar sic tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo
                    commodo. Proin sodales pulvinar sic tempor
                </div>
                <div class="clearfix">
                    <textarea name="" class="form-control" placeholder="请用英文作答"></textarea>
                </div>
                <div class="clearfix lh50 font16 fontB">Writing Sample</div>
                <div class="clearfix lh22 pb-15">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
                    bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
                    sodales pulvinar sic tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
                    bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
                    sodales pulvinar sic tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
                    bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
                    sodales pulvinar sic tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
                    bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
                    sodales pulvinar sic tempor
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
                <div class="clearfix pt-15">
                    <ul class="media-list rightMediaList">
                        <div class="mediaItem">
                            <div class="media">
                                <div class="media-left">
                                    <img src="https://via.placeholder.com/30x30/FF5733/ffffff" class="img-circle"/>
                                </div>
                                <div class="media-body">
                                    <div class="media-heading">
                                        <span class="pull-left">SUNNY <span
                                                class="c999 font12">5月12日 14:39</span></span>
                                        <a href="javascript:void(0);" class="pull-right cded">解决</a>
                                    </div>
                                    <div class="clearfix font12 c999 lh20 pb-5 pt-5">"<em>Proin sodales pulvinar sic
                                        tempor.
                                        Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                                        mus.</em>"
                                    </div>
                                    <div class="editBtn">
                                        <a href="javascript:void(0);" class="cded">编辑</a> · <a
                                            href="javascript:void(0);" class="cded">删除</a>
                                    </div>
                                    <div class="clearfix lh20 c999 pb-5 pt-5">这段不是很好，建议用XXXXXSXJSJ</div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <img src="https://via.placeholder.com/30x30/FF5733/ffffff" class="img-circle"/>
                                </div>
                                <div class="media-body">
                                    <div class="clearfix pb-10 pt-5"><span contenteditable="true"
                                                                           data-placeholder="回复"></span></div>
                                    <div class="editBtn">
                                        <button type="button" class="btn btn-primary btn-sm">发布</button>
                                        <button type="button" class="btn btn-default btn-sm ml-10"
                                                @click="cancelannotion($event)">取消
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@@/js/jquery-notebook/jquery.notebook'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'

export default {
  name: 'Detail',
  data () {
    return {}
  },
  beforeDestroy () {
    $('.fullScreen .fullRight').removeAttr('style')
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      $('.selectpicker').selectpicker()
      let lh = $('.leftBox').height() - 35
      let rh = $('.rightMediaList').height()
      if (lh > rh) {
        $('.rightMediaList').height(lh)
      }
      $('.fullScreen .fullRight').css({ position: 'initial' })
      // 点击批注
      $(document).on('click', '.mediaItem .media:eq(0)', function () {
        if (!$(this).parents('.mediaItem').hasClass('stateEdit')) {
          $(this).parents('.mediaItem').addClass('stateEdit')
        }
      })
      $(document).click(function (e) {
        let i = $(e.target)
        if (i.closest('.mediaItem').length === 0) {
          $('.stateEdit').removeClass('stateEdit')
        }
      })
      setTimeout(function () {
        $('.notebook').notebook({
          autoFocus: false,
          placeholder: 'Your text here...',
          mode: 'multiline', // multiline or inline
          // modifiers: ['bold', 'italic', 'underline', 'h1', 'h2', 'ol', 'ul', 'anchor', 'edit']
          modifiers: ['bold', 'italic', 'underline', 'h1', 'h2', 'ol', 'ul', 'anchor', 'span']
        })
        $('.notebook').on('contentChange', function (e) {
          // let content = e.originalEvent.detail.content
          // let did = 'editor-comment-' + e.timeStamp
          // $(e.target).find('span').addClass('comment-extra-inner-span').attr('data-id', did)
          // console.log($('[data-id="editor-comment-' + did + '"]'))
        })
      }, 1000)
    })
  },
  methods: {
    // 取消批注编辑
    cancelannotion (event) {
      let $this = $(event.currentTarget).parents('.mediaItem')
      $this.removeClass('stateEdit')
    }
  },
  components: {}
}
</script>
<style lang="scss">
@import "../../../../static/js/jquery-notebook/jquery.notebook.css";
@import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
</style>
<style scoped lang="scss">
.title {border:none;padding-left:0;padding-right:0;}

.leftBox {position:initial;}

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

.rightMediaList {
    overflow-y:auto;margin-bottom:0;

    & .mediaItem {
        border:1px solid transparent;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;cursor:pointer;

        &:hover {
            border-color:#ddd;
        }

        & .media {
            padding:10px 15px;

            & .media-body {
                & .media-heading {
                    &:after {content:'';display:block;width:100%;height:0;clear:both;overflow:hidden;}

                    & .pull-right {display:none;}
                }

                & .editBtn {display:none;}
            }

            &:last-of-type {display:none;}
        }

        &.stateEdit {
            cursor:auto;border-color:#ddd;

            & .media {
                & .media-body {
                    & .media-heading {
                        & .pull-right {display:initial;}
                    }

                    & .editBtn {display:block;}
                }

                &:last-of-type {display:block;border-top:1px solid #ddd;}
            }
        }
    }
}
</style>
