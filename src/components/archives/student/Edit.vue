<template>
    <div class="bgGray" style="margin:-25px -15px;">
        <div v-if="loading" v-html="LoadingImg"></div>
        <div v-if="!loading">
            <div class="pt-15 pb-15">

                <div class="bgWhite pad-15">
                    <div class="dropdown text-right">
                        <a href="#" id="dropdownMenu1" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-option-vertical c999"></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><a href="#" data-toggle="modal" data-backdrop="static"
                                   data-target="#editStudentInfo">编辑资料</a>
                            </li>
                            <li><a href="#" data-toggle="modal" data-backdrop="static"
                                   data-target="#editConsultant">顾问变更</a>
                            </li>
                            <li><a href="#" v-if="id" @click="deleteData">删除学生</a></li>
                            <li><a href="#" v-if="id" @click="shiftHighSeas">移至公海</a></li>
                        </ul>
                    </div>
                    <div class="clearfix pb-15">
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div class="studentInfo bdr">
                                    <div class="clearfix text-center pb-20 c666">
                                        <span class="userFace">
                                            <i class="iconfont" style="font-size:50px;color:#999;"
                                               v-if="header_info.headimg===''">&#xe646;</i>
                                            <i :class="header_info.headimg" v-if="header_info.headimg!==''">{{header_info.headimg}}</i>
                                        </span>
                                        <p>{{header_info.stu_name}}</p>
                                        <p class="c999">{{header_info.stu_number}}</p>
                                    </div>
                                    <div class="clearfix pl-50">
                                        <div class="clearfix lh26 c999">
                                            <span>学生类型</span>
                                            <span>{{studentType}}</span>
                                        </div>
                                        <div class="clearfix lh26 c999">
                                            <span>当前状态</span><span class="ml-10">
                                            <span>{{statusName}}</span>
                                            </span>
                                        </div>
                                        <div class="clearfix lh26 c999">
                                            <span>负责顾问</span><span class="ml-10">{{header_info.user_name}}</span>
                                        </div>
                                        <div class="clearfix lh26 c999">
                                            <span>创建时间</span><span class="ml-10">{{header_info.create_time}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                                <div class="row">
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>联系微信</p>
                                        <p>{{header_info.stu_wechat || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>联系电话</p>
                                        <p>{{header_info.stu_phone || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>在读学校</p>
                                        <p>{{header_info.reading_school || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>在读年级</p>
                                        <p>{{header_info.reading_grade || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>语言成绩</p>
                                        <p>{{header_info.lang_score_type || '&nbsp;'}}&nbsp;&nbsp;{{header_info.lang_score
                                            || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>学术成绩</p>
                                        <p>{{header_info.acad_score_type || '&nbsp;'}}&nbsp;&nbsp;{{header_info.acad_score
                                            || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>当前专业</p>
                                        <p>{{header_info.reading_major || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>GPA</p>
                                        <p>{{header_info.avg_gpa || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>申请学位</p>
                                        <p>{{header_info.intention_degree || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>出国时间</p>
                                        <p>{{header_info.abroad_time || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>意向专业</p>
                                        <p>{{header_info.intention_major || '&nbsp;'}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>意向国家</p>
                                        <p>{{country || '&nbsp;'}}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <p>备注消息</p>
                                        <p>{{header_info.remark || '&nbsp;'}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="studentTabs">
                    <ul class="nav nav-tabs"><!--nav-justified-->
                        <li class="active"><a href="#tabs1" data-toggle="tab">学生概况</a></li>
                        <li><a href="#tabs2" data-toggle="tab">附件管理</a></li>
                        <li><a href="#tabs4" data-toggle="tab">其他资料</a></li>
                        <li><a href="#tabs3" data-toggle="tab">操作日志</a></li>
                    </ul>
                </div>

                <div class="tab-content">
                    <div class="tab-pane fade in active" id="tabs1">
                        <div class="row">
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <span class="pull-left">留学规划</span>
                                        <span class="pull-right">
                                             <router-link :to="{path:'/functions/plan/edit',query:{sid:id}}">
                                                 <span class="iconfont c999">&#xe73e;</span>
                                             </router-link>
                                         </span>
                                    </div>
                                    <div class="panel-body">
                                        <table class="table" v-if="tab1.plan.length > 0">
                                            <tbody>
                                            <tr v-for="(item,i) in tab1.plan" :key="i">
                                                <td width="20%">{{item.create_time}}</td>
                                                <td width="20%">{{item.ins_student_intention_country}}</td>
                                                <td>
                                                    <router-link
                                                            :to="{path:'/functions/plan/view',query:{id:item.plan_id}}"
                                                            class="cded">{{item.recommend}}
                                                    </router-link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="panel-noData" v-if="tab1.plan.length === 0">
                                            <p class="c999">该学生还没有留学规划</p>
                                            <router-link :to="{path:'/functions/plan/edit',query:{sid:id}}"
                                                         class="cded">点击前往创建
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <span class="pull-left">申请资料</span>
                                        <span class="pull-right">
                                             <router-link :to="{path:'/functions/applyInfo/applyType',query:{sid:id}}">
                                                 <span class="iconfont c999">&#xe73e;</span>
                                             </router-link>
                                         </span>
                                    </div>
                                    <div class="panel-body">
                                        <table class="table" v-if="tab1.material.length > 0">
                                            <tbody>
                                            <tr v-for="(item,i) in tab1.material" :key="i">
                                                <td width="20%">{{item.created_time}}</td>
                                                <td width="20%">{{item.status}}</td>
                                                <td>
                                                    <router-link
                                                            :to="{path:'/functions/applyInfo/detail',query:{id:item.apply_material_id}}"
                                                            class="cded">{{item.apply_num}}
                                                    </router-link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="panel-noData" v-if="tab1.material.length === 0">
                                            <p class="c999">该学生还没有申请资料</p>
                                            <router-link :to="{path:'/functions/applyInfo/applyType',query:{sid:id}}" class="cded">点击前往创建
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <span class="pull-left">文书作答</span>
                                        <span class="pull-right">
                      <div class="dropdown">
                          <span class="iconfont c999 dropdown-toggle handPower" data-toggle="dropdown">&#xe73e;</span>
                            <ul class="dropdown-menu dropdown-menu-right">
                              <li><router-link
                                      :to="{path:'/functions/answer/addAnswer',query:{stuId:id}}">添加文书</router-link></li>
                                <!--<li><a href="#">添加推荐信</a></li>-->
                            </ul>
                      </div>
                   </span>
                                    </div>
                                    <div class="panel-body">
                                        <table class="table">
                                            <tbody>
                                            <tr v-for="(item, i) in tab1.doc" :key="i">
                                                <td width="20%">{{item.created_time}}</td>
                                                <td><router-link :to="{path:'/functions/answer/addAnswer',query:{id:item.id}}" class="cded">{{item.title}}</router-link></td>
                                                <td width="20%">{{item.operator_name}}</td>
                                                <td width="20%">{{item.status}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="panel-noData" v-if="tab1.doc.length === 0">
                                            <p class="c999">该学生还没有文书</p>
                                            <router-link :to="{path:'/functions/answer/addAnswer',query:{stuId:id}}"
                                                         class="cded">点击前往创建文书<!--/推荐信--></router-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <span class="pull-left">发起申请</span>
                                        <span class="pull-right">
                                             <router-link :to="{path:'/functions/initApply/ChooseSchool', query:{sid:id,source:1}}">
                                                 <span class="iconfont c999">&#xe73e;</span>
                                             </router-link>
                                         </span>
                                    </div>
                                    <div class="panel-body">
                                        <table class="table" v-if="tab1.apply.length > 0">
                                            <tbody>
                                            <tr v-for="(item,i) in tab1.apply" :key="i">
                                                <td width="20%">{{item.time}}</td>
                                                <td width="20%">{{item.country}}</td>
                                                <td>
                                                    <router-link
                                                            :to="{path:'/functions/initApply/ChooseSchool',query:{id:item.apply_id,source:1}}"
                                                            class="cded">{{item.school}}
                                                    </router-link>
                                                </td>
                                                <td width="15%">{{item.status}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="panel-noData" v-if="tab1.apply.length === 0">
                                            <p class="c999">该学生还没有申请中的院校</p>
                                            <router-link :to="{path:'/functions/initApply/ChooseSchool', query:{sid:id,source:1}}" class="cded">
                                                点击前往创建
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <span class="pull-left">申请跟踪</span>
                                    </div>
                                    <div class="panel-body">
                                        <table class="table" v-if="tab1.apply_process.length > 0">
                                            <tbody>
                                            <tr v-for="(item,i) in tab1.apply_process" :key="i">
                                                <td width="20%">{{item.country}}</td>
                                                <td>{{item.school_major}}</td>
                                                <td width="25%">
                                                    <router-link to="/functions/track" class="cded">
                                                        {{item.status}}
                                                    </router-link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="panel-noData" v-if="tab1.apply_process.length===0">
                                            <p class="c999">该学生还没有申请中的院校</p>
                                            <router-link to="/functions/track" class="cded">点击前往创建
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="panel panel-default">
                                            <div class="panel-heading clearfix">
                                                <span class="pull-left">佣金概览</span>
                                            </div>
                                            <div class="panel-body">
                                                <table class="table text-center">
                                                    <tbody>
                                                    <tr>
                                                        <td width="50%">
                                                            <p class="font20 cded">{{tab1.commission.estimate}}</p>
                                                            <p class="font12 c666">预计佣金回报（元）</p>
                                                        </td>
                                                        <td>
                                                            <p class="font20 cded">{{tab1.commission.received}}</p>
                                                            <p class="font12 c666">已收到佣金（元）</p>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="panel panel-default">
                                            <div class="panel-heading clearfix">
                                                <span class="pull-left">学生端</span>
                                            </div>
                                            <div class="panel-body" style="height:131px;overflow:hidden;">
                                                <p>登录账号：{{tab1.login_info.stu_num}}</p>
                                                <p>登录密码：{{tab1.login_info.temp_pwd}}</p>
                                                <p style="word-break:break-all; word-wrap:break-word;">
                                                    登录地址：<a
                                                        :href="'http://student.applyera.com/login?cid='+tab1.login_info.c_id"
                                                        target="_blank">http://student.applyera.com/login?cid={{tab1.login_info.c_id}}</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <span class="pull-left">跟进动态</span>
                                        <span class="pull-right">
                                            <!--<span class="iconfont c999 handPower" data-toggle="modal"
                                                  data-target="#dynamicModal" data-backdrop="static">&#xe73e;</span>-->
                                        </span>
                                    </div>
                                    <div class="panel-body">

                                        <ul class="media-list bdb pb-15">
                                            <div class="media" v-for="(item,i) in tab1.follow" :key="i">
                                                <a class="media-left" href="#">
                                                    <img :src="item.head_img || avatarUrl"
                                                         style="width:50px; height:50px;" class="img-circle">
                                                </a>
                                                <div class="media-body">
                                                    <div class="clearfix media-heading">
                                            <span class="pull-left">
                                                <span class="div_vm">{{item.adviser_name}}</span>
                                                <a href="javascript:void(0);"
                                                   class="div_vm ml-10 deleteBtn" @click="deleteFollow(item.id)">删除</a>
                                            </span>
                                                        <span class="pull-right c999">{{item.contact_time}}</span>
                                                    </div>
                                                    <div class="clearfix lh22" v-html="item.contact_content"></div>
                                                    <div class="clearfix font12 c999" v-if="item.next_contact_time">
                                                        设置跟进: {{item.next_contact_time}}
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>

                                        <form action="" method="POST" class="form-horizontal" v-if="id">
                                            <input type="hidden" name="student_id" id="student_id"/>
                                            <div class="form-group">
                                                <div style="margin:15px;height:60px;overflow:auto;overflow-x:hidden;"
                                                     contenteditable="true" data-placeholder="请输入跟进内容，按Enter 发布"
                                                     @keyup.enter="sendFollow" id="contact_content"></div>
                                            </div>

                                            <div class="form-group">
                                                <div class="col-sm-9">
                                                    <span id="next_contact_time" class="handPower" data-placeholder="设置跟进"></span>
                                                    <div class="dropdown" style="display: inline-block;" data-toggle="tooltip" title="跟进重复">
                                                        <i :class="repeat!==0?'iconfont font20 cded':'iconfont font20 c999'"
                                                           style="cursor:pointer;"
                                                           data-toggle="dropdown">&#xe8bf;</i>
                                                        <ul class="dropdown-menu dropdown-menu-right">
                                                            <li @click="setRepeat(item.val, 1)"
                                                                :class="repeat===item.val?'po_re active':'po_re'"
                                                                v-for="(item, i) in repeatArr" :key="i">
                                                                <a href="javascript:void(0);">{{item.title}}</a>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div class="dropdown" style="display: inline-block;" data-toggle="tooltip" title="跟进提醒">
                                                        <i :class="remind!==0?'iconfont font20 cded':'iconfont font20 c999'"
                                                           style="cursor:pointer;"
                                                           data-toggle="dropdown">&#xe6b4;</i>
                                                        <ul class="dropdown-menu dropdown-menu-right">
                                                            <li @click="setRepeat(item.val, 2)"
                                                                :class="remind===item.val?'active':''"
                                                                v-for="(item, i) in remindArr" :key="i">
                                                                <a href="javascript:void(0);">{{item.title}}</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3 text-right">
                                                    <a href="javascript:void(0);" class="cded"
                                                       @click="sendFollow">发布</a>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade bgWhite pad-15" id="tabs2">
                        <div class="clearfix pt-15 pb-25">
                            <div class="pull-left lh34 c999">小贴士: 支持扩展名: rar,zip,doc,docx,pdf,jpg</div>
                            <div class="pull-right">
                                <button type="button" class="btn btn-primary btn-sm upload" @click="uploadStart">上传文件
                                </button>
                                <button type="button" class="btn btn-default btn-sm ml-10" @click="fileDown">下载</button>
                                <button type="button" class="btn btn-default btn-sm ml-10" @click="deletefile">删除
                                </button>
                            </div>
                        </div>
                        <table class="table table-bordered table-customize" id="Enclosure">
                            <thead>
                            <tr>
                                <th>
                                    <label for="EnclosureAll" class="mr-10">
                                      <input type="checkbox" name="EnclosureAll" id="EnclosureAll" value="sAll" style="vertical-align:top;"/>
                                    </label>
                                    <img src="../../../../static/images/007.png" alt="" width="20" class="div_vm">
                                    <span class="div_vm">学生端</span>
                                </th>
                                <th width="20%"></th>
                                <th width="15%"></th>
                                <th width="20%"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, i) in tab3.student" :key="i">
                                <td>
                                    <div class="checkbox">
                                        <label style="padding-left: 0;">
                                            <input type="checkbox" name="fid[]" :value="item.id"/>
                                            {{item.file_name}}
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <select class="form-control selectpicker show-tick" data-size="10"
                                            v-model="item.file_type" @change="editAnnex(item.id, item.file_type)">
                                        <option value="">请选择</option>
                                        <option :value="k" v-for="(items, k) in tab3.type_mapping" :key="k">{{items}}
                                        </option>
                                    </select>
                                </td>
                                <td width="15%">{{item.file_size}}</td>
                                <td width="20%">{{item.add_time}}</td>
                            </tr>
                            <tr v-if="tab3.student.length === 0">
                                <td colspan="4" v-html="NoData"></td>
                            </tr>
                            </tbody>
                        </table>
                        <!--机构端-->
                        <table class="table table-bordered table-customize" id="Enclosure2">
                            <thead>
                            <tr>
                                <th>
                                    <label for="EnclosureAll2" class="mr-10">
                                      <input type="checkbox" name="EnclosureAll" id="EnclosureAll2" value="cAll" style="vertical-align:top;"/>
                                    </label>
                                    <img src="../../../../static/images/007.png" alt="" width="20" class="div_vm">
                                    <span class="div_vm">机构端</span>
                                </th>
                                <th width="20%"></th>
                                <th width="15%"></th>
                                <th width="20%"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, i) in tab3.user" :key="i">
                                <td>
                                    <div class="checkbox">
                                        <label style="padding-left: 0;">
                                            <input type="checkbox" name="fid[]" :value="item.id"/>
                                            {{item.file_name}}
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <select class="form-control selectpicker show-tick" data-size="10"
                                            v-model="item.file_type" @change="editAnnex(item.id, item.file_type)">
                                        <option value="">请选择</option>
                                        <option :value="k" v-for="(items, k) in tab3.type_mapping" :key="k">{{items}}
                                        </option>
                                    </select>
                                </td>
                                <td>{{item.file_size}}</td>
                                <td>{{item.add_time}}</td>
                            </tr>
                            <tr v-if="tab3.user.length === 0">
                                <td colspan="4" v-html="NoData"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade bgWhite pad-15" id="tabs4">
                        <div class="commonTitle">
                            <span>推荐人</span>
                            <span class="pull-right">
                                <i class="iconfont handPower" @click="addReferrer">&#xe73e;</i>
                          </span>
                        </div>
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 mb-15" v-for="(item, i) in tab2.rcmder_list"
                                 :key="i">
                                <div class="studentZL bda pl-25 pr-25 pt-10 pb-10">
                                    <div class="clearfix text-right" style="margin-bottom: -22px;">
                                        <div class="dropdown">
                                            <button class="btn btn-default btn-sm dropdown-toggle" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true">
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a href="javascript:void(0);" @click="editReferrer(item)">编辑</a>
                                                </li>
                                                <li><a href="javascript:void(0);"
                                                       @click="deleteReferrer(item.id)">删除</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="clearfix lh30">{{item.name}}</div>
                                    <div class="clearfix lh30"><span>职位</span> <span>{{item.career}}</span></div>
                                    <div class="clearfix lh30"><span>称谓</span> <span>{{item.title}}</span></div>
                                    <div class="clearfix lh30"><span>关系</span> <span>{{item.relation}}</span></div>
                                    <div class="clearfix lh30"><span>电话</span> <span>{{item.phone}}</span></div>
                                    <div class="clearfix lh30"><span>邮箱</span> <span>{{item.email}}</span></div>
                                    <div class="clearfix lh30"><span>优先级</span> <span>
                                        <span v-if="item.lv === 1">第一推荐人</span>
                                        <span v-if="item.lv === 2">第二推荐人</span>
                                        <span v-if="item.lv === 3">第三推荐人</span>
                                        <span v-if="item.lv === 4">第四推荐人</span>
                                        <span v-if="item.lv === 5">第五推荐人</span>
                                    </span></div>
                                    <div class="clearfix lh30"><span>地址</span>
                                        <span>{{outputCity(item.prov, item.city, item.district)}} {{item.details}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--******************-->
                        <div class="commonTitle">
                            <span>其他联系人</span>
                            <span class="pull-right">
                                <i class="iconfont handPower" @click="addCommon">&#xe73e;</i>
                            </span>
                        </div>
                        <div class="blk-20"></div>
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 mb-15"
                                 v-for="(item,i) in tab2.other_contacts" :key="i">
                                <div class="studentZL bda pl-25 pr-25 pt-10 pb-10">
                                    <div class="clearfix text-right" style="margin-bottom: -22px;">
                                        <div class="dropdown">
                                            <button class="btn btn-default btn-sm dropdown-toggle" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true">
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a href="#" @click="otherContact=tab2['other_contacts'][i]"
                                                       data-toggle="modal" data-backdrop="static"
                                                       data-target="#addContact">编辑</a></li>
                                                <li><a href="javascript:void(0);" @click="deleteContact(item.id)">删除</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="clearfix lh30">{{item.name}}</div>
                                    <div class="clearfix lh30 pt-15"><span>电话</span> <span>{{item.phone}}</span></div>
                                    <div class="clearfix lh30"><span>邮箱</span> <span>{{item.email}}</span></div>
                                    <div class="clearfix lh30"><span>微信</span> <span>{{item.wechat}}</span></div>
                                    <div class="clearfix lh30"><span>联系QQ</span> <span>{{item.qq}}</span></div>
                                    <div class="clearfix lh30"><span>关系</span> <span>{{item.relation}}</span></div>
                                    <div class="clearfix lh30"><span>备注</span> <span>{{item.remark}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="blk-20"></div>
                        <div class="commonTitle">
                            <span>更多信息</span>
                        </div>
                        <div class="blk-20"></div>
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>创建人</label> {{tab2.more_info.creator_name}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>创建时间</label> {{tab2.more_info.creator_time}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>现负责人</label> {{tab2.more_info.adviser_name}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>发起申请数</label> {{tab2.more_info.apply_num}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>收到Offer</label> {{tab2.more_info.offer_num}}
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>学生来源</label>
                                    <div contenteditable="true" data-placeholder="请输入学生来源"
                                         v-text="tab2.more_info.student_source"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade bgWhite pad-15" id="tabs3">
                        <table class="table table-hover table-bordered">
                            <thead>
                            <tr>
                                <th width="15%">操作时间</th>
                                <th width="15%">操作人员</th>
                                <th width="15%">操作类型</th>
                                <th>操作内容</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,i) in tab4" :key="i">
                                <td>{{item.time}}</td>
                                <td>{{item.operator}}</td>
                                <td>{{item.type}}</td>
                                <td>{{item.detail}}</td>
                            </tr>
                            <tr v-if="tab4.length===0">
                                <td colspan="4" v-html="NoData"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div class="po_re">
                <div id="picker" style="position: absolute;left: -999px;z-index: 1;"></div>
            </div>

            <!--顾问变更-->
            <div class="modal fade" id="editConsultant">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">顾问交接</h4>
                        </div>
                        <div class="modal-body">
                            <form action="" method="POST" class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">新负责人</label>
                                    <div class="col-sm-6">
                                        <select name="adviser_id" class="form-control selectpicker" data-size="10"
                                                data-live-search="true" v-model="adviserId">
                                            <option value="">请选择用户</option>
                                            <option :value="item.id" v-for="(item,i) in service_adviser_list" :key="i">
                                                {{item.name}}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <div class="col-sm-10 col-sm-offset-2">
                                        <button type="button" class="btn btn-primary" @click="setConsultant">确定</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!--编辑学生资料-->
            <div class="modal fade bs-example-modal-lg" id="editStudentInfo">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">编辑学生资料</h4>
                        </div>
                        <form action="" id="editStudentInfoForm" method="POST" class="form-horizontal"
                              autocomplete="off" @submit.prevent="validateBeforeSubmitStudentInfo('form1')"
                              data-vv-scope="form1">
                            <input type="hidden" name="stu_id" :value="header_info.stu_id" v-if="header_info.stu_id"/>
                            <input type="hidden" name="is_common" :value="header_info.is_common"
                                   v-if="header_info.is_common === 1"/>
                            <div class="modal-body pl-30 pr-30">
                                <div class="row">
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                        <div class="studentInfo">
                                            <div class="clearfix text-center pb-20 c666">
                                                <span class="userFace">
                                                    <i class="iconfont" style="font-size:50px;color:#999;"
                                                       v-if="header_info.headimg===''">&#xe646;</i>
                                                    <i :class="header_info.headimg" v-if="header_info.headimg!==''">{{header_info.headimg}}</i>
                                                </span>
                                                <p><input type="text" name="stu_name" class="form-control"
                                                          placeholder="请输入学生姓名" v-model="header_info.stu_name"
                                                          v-validate="'required'" data-vv-as="学生姓名"/></p>
                                                <div class="validateTip text-left"
                                                     v-show="errors.has('form1.stu_name')">
                                                    {{ errors.first('form1.stu_name') }}
                                                </div>
                                                <p class="c999">{{header_info.stu_number}}</p>
                                            </div>
                                            <div class="clearfix text-center">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label">学生类型</label>
                                                    <div class="col-sm-8">
                                                        <select name="stu_type" class="form-control selectpicker"
                                                                v-model="header_info.stu_type"
                                                                @change="student_types=student_type[header_info.stu_type-1].stu_type">
                                                            <option value="">请选择</option>
                                                            <option :value="item.id" v-for="(item,i) in student_type"
                                                                    :key="i">
                                                                {{item.stu_type}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label col-sm-4">当前状态</label>
                                                    <div class="col-sm-8">
                                                        <select name="sign_status" class="form-control selectpicker"
                                                                v-model="header_info.sign_status">
                                                            <option :value="item.id" v-for="(item, i) in signStatusArr"
                                                                    :key="i">{{item.status_name}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label col-sm-4">负责顾问</label>
                                                    <div class="col-sm-8 lh34">{{header_info.user_name}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                                        <div class="row editStudentLayer">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>联系微信</label>
                                                    <input type="text" name="stu_wechat" class="form-control"
                                                           placeholder="请输入联系微信" v-model="header_info.stu_wechat">
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>联系电话</label>
                                                    <input type="text" name="stu_phone" class="form-control"
                                                           placeholder="请输入联系电话" v-model="header_info.stu_phone">
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>在读学校</label>
                                                    <input type="text" name="reading_school" class="form-control"
                                                           placeholder="请输入在读学校" v-model="header_info.reading_school">
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>在读年级</label>
                                                    <input type="text" name="reading_grade" class="form-control"
                                                           placeholder="请输入在读年级" v-model="header_info.reading_grade">
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div class="row">
                                                     <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                         <div class="form-group">
                                                             <label>语言成绩</label>
                                                             <select name="lang_score_type" class="form-control selectpicker show-tick" v-model="header_info.lang_score_type">
                                                                 <option value="">请选择</option>
                                                                 <option value="雅思">雅思</option>
                                                                 <option value="托福">托福</option>
                                                                 <option value="PTE">PTE</option>
                                                                 <option value="无">无</option>
                                                             </select>
                                                         </div>
                                                     </div>
                                                     <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                         <div class="form-group">
                                                             <label>&nbsp;</label>
                                                             <input type="text" name="lang_score" class="form-control"
                                                                    placeholder="请输入成绩" v-model="header_info.lang_score">
                                                         </div>
                                                     </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div class="row">
                                                     <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                         <div class="form-group">
                                                             <label>学术成绩</label>
                                                             <select name="acad_score_type" class="form-control selectpicker show-tick" v-model="header_info.acad_score_type">
                                                                 <option value="">请选择</option>
                                                                 <option value="GRE">GRE</option>
                                                                 <option value="GMAT">GMAT</option>
                                                                 <option value="SAT">SAT</option>
                                                                 <option value="ACT">ACT</option>
                                                                 <option value="A-Level">ALevel</option>
                                                                 <option value="O-Level">OLevel</option>
                                                                 <option value="GCSE">GCSE</option>
                                                                 <option value="BTEC">BTEC</option>
                                                                 <option value="IB">IB</option>
                                                                 <option value="高考">高考</option>
                                                                 <option value="无">无</option>
                                                             </select>
                                                         </div>
                                                     </div>
                                                     <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                         <div class="form-group">
                                                             <label>&nbsp;</label>
                                                             <input type="text" name="acad_score" class="form-control"
                                                                    placeholder="请输入成绩" v-model="header_info.acad_score">
                                                         </div>
                                                     </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>当前专业</label>
                                                    <input type="text" name="reading_major" class="form-control"
                                                           placeholder="请输入当前专业" v-model="header_info.reading_major">
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>GPA</label>
                                                    <input type="text" name="avg_gpa" class="form-control"
                                                           placeholder="请输入均分" v-model="header_info.avg_gpa">
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>申请学位</label>
                                                    <div class="clearfix">
                                                        <select name="intention_degree"
                                                                class="form-control selectpicker show-tick"  v-model="header_info.intention_degree">
                                                            <option value="">请选择申请学位</option>
                                                            <option value="本科">本科</option>
                                                            <option value="本科预科">本科预科</option>
                                                            <option value="本硕连读">本硕连读</option>
                                                            <option value="硕士">硕士</option>
                                                            <option value="硕士预科">硕士预科</option>
                                                            <option value="博士">博士</option>
                                                            <option value="硕博连读">硕博连读</option>
                                                            <option value="国际大一">国际大一</option>
                                                            <option value="ESL(语言班)">ESL(语言班)</option>
                                                            <option value="高中">高中</option>
                                                            <option value="初中">初中</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>出国时间</label>
                                                    <input type="text" name="abroad_time" class="form-control"
                                                           placeholder="请输入出国时间" v-model="header_info.abroad_time">
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>意向专业</label>
                                                    <input type="text" name="intention_major" class="form-control"
                                                           placeholder="请输入意向专业" v-model="header_info.intention_major">
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>意向国家</label>
                                                    <div class="clearfix">
                                                        <select name="intention_country[]"
                                                                class="form-control selectpicker show-tick"
                                                                data-size="5"
                                                                multiple
                                                                data-live-search="true"
                                                                v-model="header_info.intention_country">
                                                            <option :value="item.id" v-for="(item,i) in nation"
                                                                    :key="i">
                                                                {{item.cn}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <div class="form-group">
                                                    <label>备注消息</label>
                                                    <textarea name="remark" class="form-control" placeholder="请输入备注信息"
                                                              style="height: 50px;"
                                                              v-model="header_info.remark"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">保存</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!--跟进动态-->
            <div class="modal fade" id="dynamicModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">添加跟进</h4>
                        </div>
                        <div class="modal-body">
                            <form action="" method="POST" id="followForm" class="form-horizontal" autocomplete="off">
                                <input type="hidden" name="student_id" :value="id" v-if="id"/>
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">联系方式</label>
                                            <div class="col-sm-9">
                                                <select name="contact_type" class="form-control">
                                                    <option value="">请选择</option>
                                                    <option value="1">电话</option>
                                                    <option value="2">微信</option>
                                                    <option value="3">QQ</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">联系时间</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="contact_time" class="form-control" id="times2"
                                                       placeholder="请选择联系时间">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <textarea name="contact_content" class="form-control"
                                                          placeholder=""
                                                          style="height:50px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">联系人</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="contact_people" class="form-control"
                                                       placeholder="请输入联系人">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">下次跟进时间</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="next_contact_time" class="form-control"
                                                       id="times3" placeholder="请选择跟进时间">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">跟进状态</label>
                                            <div class="col-sm-9">
                                                <select name="follow_status" class="form-control">
                                                    <option value="">请选择</option>
                                                    <option value="1">已签单</option>
                                                    <option value="2">咨询中</option>
                                                    <option value="3">待回访</option>
                                                    <option value="4">已流失</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="saveFollow">确定</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--新增联系人-->
            <div class="modal fade bs-example-modal-lg" id="addContact">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">新增联系人</h4>
                        </div>
                        <div class="modal-body pl-30 pr-30">
                            <form action="" method="POST" id="contactForm" class="form-horizontal" autocomplete="off">
                                <input type="hidden" name="student_id" :value="id" v-if="id"/>
                                <input type="hidden" name="id" :value="otherContact.id" v-if="otherContact.id"/>
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">联系人姓名</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" name="name"
                                                       v-model="otherContact.name" placeholder="请输入姓名">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">与学生关系</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" name="relation"
                                                       v-model="otherContact.relation"
                                                       placeholder="请输入与学生关系">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">联系电话</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" name="phone"
                                                       v-model="otherContact.phone"
                                                       placeholder="请输入联系电话">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">联系邮箱</label>
                                            <div class="col-sm-8">
                                                <input type="text" name="email" class="form-control"
                                                       v-model="otherContact.email"
                                                       placeholder="请输入联系邮箱"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">联系微信</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" name="wechat"
                                                       v-model="otherContact.wechat"
                                                       placeholder="请输入联系微信">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">联系QQ</label>
                                            <div class="col-sm-8">
                                                <input type="text" name="qq" class="form-control"
                                                       v-model="otherContact.qq"
                                                       placeholder="请输入联系QQ"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">备注</label>
                                            <div class="col-sm-10">
                                                <textarea name="remark" class="form-control"
                                                          v-model="otherContact.remark" style="height:80px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="saveContact">保存</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--添加推荐人-->
            <AddCommend :id="id" :referrer="referrer" @referrerBack="referrerBack"></AddCommend>
            <a href='' target='_blank' id='file_down'></a>
        </div>
    </div>
</template>

<script>
import * as _ from 'lodash'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import '@~/js/VeeValidateConfig'
import AddCommend from '@#/archives/student/AddCommend'
import { bytesToSize } from '../../../assets/js/utils'
import nation from '@@/json/nation.json'
import city from '@@/json/city.json'
import store from '@/vuex/Store'
import db from '@~/js/request'
import webupload from '@~/js/webupload'
require('icheck')

export default {
  name: 'Edit',
  store,
  data () {
    return {
      loading: true,
      nation: nation,
      city: city,
      id: '',
      file_id: [],
      country: '',
      student_types: '',
      adviserId: '',
      studentSource: '',
      header_info: {
        is_common: '',
        abroad_time: '',
        acad_score: '',
        acad_score_type: '',
        avg_gpa: '',
        create_time: '',
        headimg: '',
        intention_country: '',
        intention_degree: '',
        intention_major: '',
        lang_score: '',
        lang_score_type: '',
        reading_grade: '',
        reading_major: '',
        reading_school: '',
        remark: '',
        sign_status: '',
        stu_id: '',
        stu_name: '',
        stu_number: '',
        stu_phone: '',
        stu_type: '',
        stu_wechat: '',
        user_name: ''
      },
      follow_type: {},
      tab1: {},
      tab2: {},
      tab3: {},
      tab4: {},
      student_type: [],
      service_adviser_list: [],
      fid: [],
      signStatusArr: [],
      repeat: 0,
      remind: 0,
      repeatArr: [
        { title: '不重复', val: '0' },
        { title: '每天重复', val: '1' },
        { title: '每周重复', val: '2' },
        { title: '每月重复', val: '3' },
        { title: '每年重复', val: '4' },
        { title: '工作日重复', val: '5' }
      ],
      remindArr: [
        { title: '关闭提醒', val: '0' },
        { title: '开始时提醒', val: '1' },
        { title: '5分钟提醒', val: '2' },
        { title: '15分钟提醒', val: '3' },
        { title: '30分钟提醒', val: '4' },
        { title: '1小时前', val: '5' }
      ],
      otherContact: {
        id: '',
        name: '',
        relation: '',
        phone: '',
        email: '',
        wechat: '',
        qq: '',
        remark: ''
      },
      referrer: {
        id: '',
        career: '',
        title: '',
        relation: '',
        phone: '',
        email: '',
        lv: '',
        prov: '',
        details: '',
        city: '',
        district: '',
        name: ''
      }
    }
  },
  computed: {
    studentType () {
      return _.filter(this.student_type, (item) => item.id === this.header_info.stu_type)[0]['stu_type']
    },
    statusName () {
      return _.filter(this.signStatusArr, (item) => item.id === this.header_info.sign_status)[0]['status_name']
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.getDetail()
    self.$nextTick(() => {
      _.delay(() => {
        $(document).on('focusout', '[contenteditable="true"]', function () {
          let $this = $(this)
          if (self.studentSource === $this.text()) {
            return false
          }
          let params = new URLSearchParams()
          params.append('stu_id', self.id)
          params.append('student_source', $this.text())
          db.postRequest('Institution/Student/stuMoreInfoSave', params).then(res => {
            if (res.status === 1) {
              self.studentSource = $this.text()
            }
          })
        })

        $(document).on('click', '#tabs3 [name="index[]"]', function () {
          if ($(this).is(':checked') === true) {
            self.fid.push($(this).val())
          } else {
            self.fid.map((item, i) => {
              if (item === $(this).val()) {
                self.fid.splice(i, 1)
              }
            })
          }
        })

        $('[data-toggle="tab"]').on('show.bs.tab', function () {
          if ($(this).attr('href') === '#tabs4' && self.id !== '') {
            let params = new URLSearchParams()
            params.append('student_id', self.id)
            db.getRequest('Institution/Student/stuLog', params).then(res => {
              if (res.status === 1) {
                self.tab4 = res.data
              } else {
                self.layer.alert(res.msg, {
                  icon: 2
                })
              }
            })
          }
        })

        // 关闭添加联系人窗口时
        $('#addContact').on('hidden.bs.modal', function () {
          self.otherContact = {
            id: '',
            name: '',
            relation: '',
            phone: '',
            email: '',
            wechat: '',
            qq: '',
            remark: ''
          }
        })
        // 上传
        webupload({
          assign: self.file_id,
          accept: {
            title: '',
            extensions: 'rar,zip,doc,docx,pdf,jpg',
            mimeTypes: '*!/!*'
          },
          formData: { func: 'student_attachment', student_id: self.id },
          uploadSuccess: (file, res) => {
            self.tab3.user.unshift({
              id: res.data.id,
              file_name: res.data.file_name,
              file_size: bytesToSize(res.data.file_size),
              date: res.data.date,
              file_type: '',
              add_time: self.currentTime()
            })
            _.delay(() => {
              $('.selectpicker').selectpicker('refresh')
              self.setIcheck()
            }, 500)
          },
          uploadFinished: (msg) => {
            if (msg === '') {
              self.layer.alert('上传成功！', {icon: 1})
            } else {
              self.layer.alert(msg, {icon: 2})
            }
            self.getDetail()
          },
          error: (e) => {
            if (e === 'Q_TYPE_DENIED') {
              self.layer.alert('文件类型不正确！', { icon: 2 })
            }
            if (e === 'F_EXCEED_SIZE') {
              self.layer.alert('文件大小超过2MB限制！', { icon: 2 })
            }
          }
        })
      }, 1000)
    })
  },
  methods: {
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      db.getRequest('Institution/Student/stuManageDetail', params).then(res => {
        if (res.status === 1) {
          self.header_info = res.data.header_info
          self.follow_type = res.data.follow_type
          self.signStatusArr = res.data.sign_status
          self.tab1 = res.data.tab1
          self.tab2 = res.data.tab2
          self.tab3 = res.data.tab3
          self.tab4 = res.data.tab4
          self.student_type = res.data.student_type
          self.studentSource = res.data.tab2.more_info.student_source
          self.service_adviser_list = res.data.service_adviser
          let countryArr = []
          res.data.header_info.intention_country.map(item => {
            self.nation.map(items => {
              if (items.id === parseInt(item)) {
                countryArr.push(items.cn)
              }
            })
          })
          self.country = countryArr.join(',')
          res.data.student_type.map(item => {
            if (item.id === res.data.header_info.stu_type) {
              self.student_types = item.stu_type
            }
          })
        } else {
          self.layer.alert(res.msg, { icon: 2 })
        }
        self.loading = false
        self.header_info.is_common = parseInt(self.$route.query.isCommon) || 0
        self.$nextTick(() => {
          $('[data-toggle="tooltip"]').tooltip()
          self.laydate.render({
            elem: '#next_contact_time',
            type: 'datetime'
          })
          if (self.id === '') {
            $('#editStudentInfo').modal({
              backdrop: 'static',
              show: true
            })
          }
          $('.selectpicker').selectpicker('refresh')
          self.setIcheck()
        })
      })
    },
    deleteData () {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('student_id[]', self.id)
        db.postRequest('Institution/Student/batchDelStu', params).then(res => {
          if (res.status === 1) {
            self.layer.alert(res.msg, {
              icon: 1
            }, function (k) {
              self.layer.close(k)
              self.$router.push('/archives/student')
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      })
    },
    uploadStart () {
      $('#picker .webuploader-element-invisible').click()
    },
    validateBeforeSubmitStudentInfo (scope) {
      let self = this
      self.$validator.validateAll(scope).then((result) => {
        if (result) {
          let index = self.layer.load('', { shade: 0.3 })
          let formData = $('#editStudentInfoForm').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Student/stuSave', params).then(res => {
            self.layer.close(index)
            if (res.status === 1) {
              self.header_info = res.data
              let countryArr = []
              res.data.intention_country.map(item => {
                self.nation.map(items => {
                  if (items.id === parseInt(item)) {
                    countryArr.push(items.cn)
                  }
                })
              })
              self.country = countryArr.join(',')
              self.layer.alert(res.msg, {icon: 1}, function (i) {
                self.layer.close(i)
                $('#editStudentInfo').modal('hide')
                if (self.id === '') {
                  self.$router.push('/archives/student/edit?id=' + res.data.stu_id)
                  self.id = res.data.stu_id
                  self.$nextTick(() => {
                    $('[data-toggle="tooltip"]').tooltip()
                    self.laydate.render({
                      elem: '#next_contact_time',
                      type: 'datetime'
                    })
                  })
                }
              })
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    saveFollow () {
      let self = this
      let formData = $('#followForm').serializeArray()
      let params = new URLSearchParams()
      formData.map(item => {
        params.append(item.name, item.value)
      })
      db.postRequest('Institution/Student/stuFollowSave', params).then(res => {
        if (res.status === 1) {
          self.tab1.follow = res.data
          self.layer.alert(res.msg, { icon: 1 }, function (i) {
            self.layer.close(i)
            $('#followForm')[0].reset()
            $('#dynamicModal').modal('hide')
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    setConsultant () {
      let self = this
      let advName = $('[name="adviser_id"]').find('option:selected').text().replace('请选择用户', '')
      let params = new URLSearchParams()
      params.append('student_id[]', self.id)
      params.append('adviser_id', self.adviserId)
      self.layer.confirm('是否确定把所选的学生转移至 <b class=\'cf00\'>' + advName + '</b>（选择的用户）？转移成功后，原负责人不能再维护跟进和更新此学生数据。', {
        icon: 3
      }, function (ii) {
        self.layer.close(ii)
        db.postRequest('Institution/Student/batchChangeAdviser', params).then(res => {
          if (res.status === 1) {
            self.service_adviser_list.map(item => {
              if (item.id === self.adviserId) {
                self.header_info.user_name = item.name
              }
            })
            self.layer.alert(res.msg, {
              icon: 1
            }, function (i) {
              self.layer.close(i)
              $('#editConsultant').modal('hide')
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      })
    },
    deleteFollow (id) {
      let self = this
      let params = new URLSearchParams()
      params.append('id', id)
      db.getRequest('Institution/Student/stuFollowDel', params).then(res => {
        if (res.status === 1) {
          self.layer.msg(res.msg)
          self.tab1.follow.map((item, i) => {
            if (item.id === id) {
              self.tab1.follow.splice(i, 1)
            }
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    saveContact () {
      let self = this
      let formData = $('#contactForm').serializeArray()
      let params = new URLSearchParams()
      formData.map(item => {
        params.append(item.name, item.value)
      })
      db.postRequest('Institution/Student/otherContactsAdd', params).then(res => {
        if (res.status === 1) {
          $('#addContact').modal('hide')
          self.layer.alert(res.msg, { icon: 1 }, function (i) {
            self.layer.close(i)
            self.tab2.other_contacts = res.data
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    // 删除联系人
    deleteContact (id) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('student_id', self.id)
        params.append('id[]', id)
        db.postRequest('Institution/Student/batchDelContacts', params).then(res => {
          if (res.status === 1) {
            self.tab2.other_contacts = res.data
            self.layer.alert(res.msg, { icon: 1 }, function (i) {
              self.layer.close(i)
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      })
    },
    fileDown () {
      let self = this
      if (self.fid.length === 0) {
        self.layer.alert('请选择需要操作的ID', { icon: 2 })
        return false
      }
      let url = window.ajaxBaseUrl + '/Institution/Student/archiveDownload?student_id=' + self.id + '&index=' + (self.fid).join(',')
      document.getElementById('file_down').setAttribute('href', url)
      setTimeout(function () {
        document.getElementById('file_down').click()
        self.fid = []
        $('#tabs3 [name="index[]"]').each(function () {
          this.checked = false
        })
      }, 500)
    },
    deletefile () {
      let self = this
      if (self.fid.length === 0) {
        self.layer.alert('请选择需要操作的ID', { icon: 2 })
        return false
      }
      let params = new URLSearchParams()
      params.append('student_id', self.id)
      self.fid.map(item => {
        params.append('index[]', item)
      })
      db.postRequest('Institution/Student/batchDelAttach', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, {icon: 1})
          self.fid = []
          self.getDetail()
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    sendFollow () {
      let self = this
      let params = new URLSearchParams()
      params.append('student_id', self.id)
      params.append('contact_content', $('#contact_content').html())
      params.append('next_contact_time', $('#next_contact_time').html())
      params.append('repeat', self.repeat)
      params.append('remind', self.remind)
      if (self.followContent === '') {
        self.layer.alert('请输入跟进内容！', { icon: 2 })
        return false
      }
      db.postRequest('/Institution/Student/stuFollowSave', params).then(res => {
        if (res.status === 1) {
          self.layer.msg(res.msg)
          self.getFollowList()
          $('#contact_content').html('')
          $('#next_contact_time').html('')
          self.repeat = 0
          self.remind = 0
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    getFollowList () {
      let self = this
      let params = new URLSearchParams()
      params.append('student_id', self.id)
      db.getRequest('/Institution/Student/getFollow', params).then(res => {
        if (res.status === 1) {
          self.tab1.follow = res.data
        } else {
          console.log(res.msg)
        }
      })
    },
    // 移至公海
    shiftHighSeas () {
      let self = this
      let params = new URLSearchParams()
      if (self.id === '') {
        self.layer.alert('非法操作', { icon: 2 })
        return false
      } else {
        params.append('student_id[]', self.id)
      }
      db.postRequest('/Institution/Student/backStudent', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, { icon: 1 }, function (i) {
            self.layer.close(i)
            self.pagechange(self.current)
            self.idArr = []
          })
        } else {
          self.layer.alert(res.msg, { icon: 2 })
        }
      })
    },
    sortNumber (prop) {
      return function (obj1, obj2) {
        let val1 = obj1[prop]
        let val2 = obj2[prop]
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1)
          val2 = Number(val2)
        }
        if (val1 < val2) {
          return 1
        } else if (val1 > val2) {
          return -1
        } else {
          return 0
        }
      }
    },
    setRepeat (val, type) {
      let self = this
      let nextContactTime = $('#next_contact_time').text()
      if (nextContactTime === '') {
        self.layer.alert('请先设置跟进时间', { icon: 2 })
      } else {
        if (type === 1) {
          self.repeat = val
        }
        if (type === 2) {
          self.remind = val
        }
      }
    },
    editAnnex (id, type) {
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('type', type)
      db.postRequest('Institution/Student/relate', params).then(res => {
        console.log(res.msg)
      })
    },
    // 添加其他联系人
    addCommon () {
      $('#contactForm')[0].reset()
      $('#addContact').modal({
        backdrop: 'static',
        show: true
      })
    },
    // 输出省市区名
    outputCity (p, c, a) {
      let self = this
      let porv = ''
      let city = ''
      let area = ''
      self.city.map((item) => {
        if (item.area_id === p) {
          porv = item.title
          item.child.map((items) => {
            if (items.area_id === c) {
              city = items.title
              items.child.map((v) => {
                if (v.area_id === a) {
                  area = v.title
                }
              })
            }
          })
        }
      })
      return porv + city + area
    },
    // 添加推荐人
    addReferrer () {
      let self = this
      self.referrer = {
        id: '',
        career: '',
        title: '',
        relation: '',
        phone: '',
        email: '',
        lv: '',
        prov: '',
        details: '',
        city: '',
        district: '',
        name: ''
      }
      $('#addReferrer').modal({
        backdrop: 'static',
        show: true
      })
    },
    // 修改推荐人
    editReferrer (item) {
      this.referrer = {
        id: item.id,
        career: item.career,
        title: item.title,
        relation: item.relation,
        phone: item.phone,
        email: item.email,
        lv: item.lv,
        prov: item.prov,
        details: item.details,
        city: item.city,
        district: item.district,
        name: item.name
      }
      $('#addReferrer').modal({
        backdrop: 'static',
        show: true
      })
    },
    // 删除推荐人
    deleteReferrer (id) {
      let self = this
      self.layer.confirm('您确定要删除此信息？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('r_id', id)
        params.append('stu_id', self.id)
        db.postRequest('/Institution/Student/rcmderDel', params).then(res => {
          if (res.status === 1) {
            self.tab2.rcmder_list.map((item, i) => {
              if (item.id === id) {
                self.tab2.rcmder_list.splice(i, 1)
              }
            })
            self.layer.alert(res.msg, { icon: 1 }, function (i) {
              self.layer.close(i)
            })
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      })
    },
    // 回调推荐人
    referrerBack (data) {
      let self = this
      self.tab2.rcmder_list = data
    },
    // 设置单、多选样式
    setIcheck () {
      let self = this
      setTimeout(function () {
        $('#Enclosure [type="checkbox"], #Enclosure2 [type="checkbox"]').each(function () {
          $(this).iCheck({
            labelHover: false,
            cursor: true,
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            increaseArea: '20%'
          })
          $(this).on('ifChanged', function (event) {
            let _this = $(event.target)
            let name = _this.attr('name')
            if (name === 'EnclosureAll') {
              if (_this.val() === 'sAll') {
                if (_this.is(':checked') === true) {
                  $('#Enclosure [name="fid[]"]').each(function () {
                    $(this).iCheck('check')
                  })
                } else {
                  $('#Enclosure [name="fid[]"]').each(function () {
                    $(this).iCheck('uncheck')
                  })
                }
              }
              if (_this.val() === 'cAll') {
                if (_this.is(':checked') === true) {
                  $('#Enclosure2 [name="fid[]"]').each(function () {
                    $(this).iCheck('check')
                  })
                } else {
                  $('#Enclosure2 [name="fid[]"]').each(function () {
                    $(this).iCheck('uncheck')
                  })
                }
              }
            } else {
              if (_this.is(':checked') === true) {
                self.fid.push(_this.val())
              } else {
                self.fid.map((item, i) => {
                  if (item === _this.val()) {
                    self.fid.splice(i, 1)
                  }
                })
              }
            }
          })
        })
      }, 500)
    }
  },
  components: {
    AddCommend
  }
}
</script>

<style scoped lang="less">
.modal-lg {width:1000px;}

.studentInfo {
    padding-right:15px;

    & .userFace {
        width:80px;height:80px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;display:block;margin:0 auto 15px auto;border:1px solid #ddd;line-height:80px;

        & > i {
            width:80px;height:80px;display:inline-block;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;
            text-align:center;line-height:80px;font-size:30px;font-style:normal;color:#fff;

            &.A {background-color:#ff6815;}

            &.B {background-color:#ff940c;}

            &.C {background-color:#ffb500;}

            &.D {background-color:#ffdb00;}

            &.E {background-color:#d6cf06;}

            &.F {background-color:#8bc43d;}

            &.G {background-color:#00a350;}

            &.H {background-color:#00a99d;}

            &.I {background-color:#00aff0;}

            &.J {background-color:#0084ce;}

            &.K {background-color:#005fac;}

            &.L {background-color:#bcc3c7;}

            &.M {background-color:#6c7b87;}

            &.N {background-color:#273f50;}

            &.O {background-color:#1e3894;}

            &.P {background-color:#663592;}

            &.Q {background-color:#973290;}

            &.R {background-color:#f93174;}

            &.S {background-color:#fb281a;}

            &.T {background-color:#ff6815;}

            &.U {background-color:#ff940c;}

            &.V {background-color:#ffb500;}

            &.W {background-color:#ffdb00;}

            &.X {background-color:#d6cf06;}

            &.Y {background-color:#8bc43d;}

            &.Z {background-color:#00a350;}
        }
    }
}

#next_contact_time{
    &:empty:before{content:attr(data-placeholder);transition:all 0.4s; cursor:pointer;color:rgba(0, 0, 0, 0.5);}
}

.row {
    display:flex;
    align-items:flex-start;
    flex-wrap:wrap;
}

.form-group {
    & > label {
        padding-left:0;padding-right:0;
    }
}

.editStudentLayer {
    & .form-group {margin-left:0;margin-right:0;}
}

.studentTabs {
    padding:30px 0;

    & > ul {
        border:none;text-align:center;width:600px;margin:0 auto;background-color:#fff;-webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;

        & > li {
            margin:0;

            & > a {
                margin-right:0;border:none;width:150px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;

                &:hover, &:focus {background-color:transparent;border:none;}
            }

            &.active {
                & > a {
                    -webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;background-color:#428bca;color:#fff;
                }
            }
        }
    }
}

.panel.panel-default {
    -webkit-border-radius:0;-moz-border-radius:0;border-radius:0;

    & .panel-heading {
        background-color:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;border:none;position:relative;text-indent:15px;line-height:22px;

        &:before {
            content:'';width:2px;height:16px;position:absolute;left:15px;top:50%;margin-top:-8px;display:block;background-color:#428bca;
        }

        &:after {content:'';display:block;width:100%;height:0;clear:both;float:none;overflow:hidden;}
    }

    & .panel-noData {
        border:1px dashed #ddd;padding:30px;text-align:center;
    }

    & .table {
        & > tbody {
            & > tr {
                & > td {border:none;}
            }
        }
    }
}

.studentZL {
    & > div {
        & > span {
            display:inline-block;float:left;

            &:first-of-type {
                width:20%;
            }

            &:last-of-type {
                width:75%;padding-left:10px;white-space:nowrap;overflow:hidden;-ms-text-overflow:ellipsis;text-overflow:ellipsis;
            }
        }
    }
}

.media-list {
    max-height:500px;overflow-y:auto;

    & .media-heading .pull-left {
        .deleteBtn {display:none;}

        &:hover .deleteBtn {display:inline-block;}
    }
}

#tabs3 {
    & .checkbox {
        margin-bottom:0;margin-top:0;
    }
}
</style>
<style lang="less">
.editStudentLayer {
    .bootstrap-select {
        max-width:100%;display:block;

        & > .dropdown-toggle {
            background-color:#fff !important;max-width:100%;

            &:focus {outline:none !important;}
        }
    }
}
</style>
