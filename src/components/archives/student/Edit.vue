<template>
    <div class="bgGray" style="margin:-25px -15px;">
        <div v-if="loading" v-html="LoadingImg()"></div>
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
                        </ul>
                    </div>
                    <div class="clearfix pb-15">
                        <div class="row">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div class="studentInfo bdr">
                                    <div class="clearfix text-center pb-20 c666">
                                        <span class="userFace"><i class="iconfont font50 c999">&#xe646;</i></span>
                                        <p>{{header_info.stu_name}}</p>
                                        <p class="c999">{{header_info.stu_number}}</p>
                                    </div>
                                    <div class="clearfix pl-50">
                                        <div class="clearfix lh26 c999">
                                            <span>学生类型</span><span class="ml-10">{{student_types}}</span>
                                        </div>
                                        <div class="clearfix lh26 c999">
                                            <span>当前状态</span><span class="ml-10">
                                    <span v-if="header_info.sign_status===1">已签单</span>
                                    <span v-if="header_info.sign_status===2">咨询中</span>
                                    <span v-if="header_info.sign_status===3">待回访</span>
                                    <span v-if="header_info.sign_status===4">已流失</span>
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
                                        <p>{{header_info.stu_wechat || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>联系电话</p>
                                        <p>{{header_info.stu_phone || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>在读学校</p>
                                        <p>{{header_info.reading_school || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>在读年级</p>
                                        <p>{{header_info.reading_grade || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>语言成绩</p>
                                        <p>{{header_info.lang_score_type || "&nbsp;"}}&nbsp;&nbsp;{{header_info.lang_score || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>学术成绩</p>
                                        <p>{{header_info.acad_score_type || "&nbsp;"}}&nbsp;&nbsp;{{header_info.acad_score || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>当前专业</p>
                                        <p>{{header_info.reading_major || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>GPA</p>
                                        <p>{{header_info.avg_gpa || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>申请学位</p>
                                        <p>{{header_info.intention_degree || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>出国时间</p>
                                        <p>{{header_info.abroad_time || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>意向专业</p>
                                        <p>{{header_info.intention_major || "&nbsp;"}}</p>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mb-10">
                                        <p>意向国家</p>
                                        <p>{{country || "&nbsp;"}}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <p>备注消息</p>
                                        <p>{{header_info.remark || "&nbsp;"}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="studentTabs">
                    <ul class="nav nav-tabs"><!--nav-justified-->
                        <li class="active"><a href="#tabs1" data-toggle="tab">学生概况</a></li>
                        <li><a href="#tabs2" data-toggle="tab">学生资料</a></li>
                        <li><a href="#tabs3" data-toggle="tab">附件管理</a></li>
                        <li><a href="#tabs4" data-toggle="tab">操作日志</a></li>
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
                                            <tr v-for="(item, i) in tab1.plan" :key="i">
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
                                             <router-link to="/functions/applyInfo/detail">
                                                 <span class="iconfont c999">&#xe73e;</span>
                                             </router-link>
                                         </span>
                                    </div>
                                    <div class="panel-body">
                                        <table class="table" v-if="tab1.material.length > 0">
                                            <tbody>
                                            <tr v-for="(item, i) in tab1.material" :key="i">
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
                                            <router-link to="/functions/applyInfo/detail" class="cded">点击前往创建
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <span class="pull-left">院校申请</span>
                                        <span class="pull-right">
                                             <router-link to="/functions/initApply/add">
                                                 <span class="iconfont c999">&#xe73e;</span>
                                             </router-link>
                                         </span>
                                    </div>
                                    <div class="panel-body">
                                        <table class="table" v-if="tab1.apply.length > 0">
                                            <tbody>
                                            <tr v-for="(item, i) in tab1.apply" :key="i">
                                                <td width="20%">{{item.time}}</td>
                                                <td width="20%">{{item.country}}</td>
                                                <td>
                                                    <router-link
                                                            :to="{path:'/functions/initApply/add',query:{id:item.apply_id}}"
                                                            class="cded">{{item.school}}
                                                    </router-link>
                                                </td>
                                                <td width="15%">{{item.status}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="panel-noData" v-if="tab1.apply.length === 0">
                                            <p class="c999">该学生还没有院校申请</p>
                                            <router-link to="/functions/initApply/add" class="cded">
                                                点击前往创建
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <span class="pull-left">申请进程</span>
                                    </div>
                                    <div class="panel-body">
                                        <table class="table" v-if="tab1.apply_process.length > 0">
                                            <tbody>
                                            <tr v-for="(item, i) in tab1.apply_process" :key="i">
                                                <td width="20%">{{item.country}}</td>
                                                <td>{{item.school_major}}</td>
                                                <td width="25%">
                                                    <router-link to="/functions/process" class="cded">
                                                        {{item.status}}
                                                    </router-link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="panel-noData" v-if="tab1.apply_process.length===0">
                                            <p class="c999">该学生申请中的院校</p>
                                            <router-link to="/functions/track" class="cded">点击前往创建
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

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
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <span class="pull-left">跟进动态</span>
                                        <span class="pull-right">
                                            <span class="iconfont c999 handPower" data-toggle="modal"
                                                  data-target="#dynamicModal" data-backdrop="static">&#xe73e;</span>
                                        </span>
                                    </div>
                                    <div class="panel-body panel-border-x">
                                        <div :class="item.contact_type===1?'dynamic mobile':(item.contact_type===2)?'dynamic weChat':'dynamic qq'"
                                             v-for="(item, i) in tab1.follow" :key="i">
                                            <div class="clearfix lh22">
                                                <span class="pull-left">联系人：{{item.contact_people}}</span>
                                                <span class="pull-right">
                                                    <i class="iconfont handPower" @click="deleteFollow(item.id)">&#xe7f6;</i>
                                                </span>
                                            </div>
                                            <div class="clearfix lh22">
                                                联系时间：{{item.contact_time}}
                                            </div>
                                            <div class="clearfix lh20 pt-10 pb-10">{{item.contact_content}}</div>
                                            <div class="clearfix lh20">下次跟进时间：{{item.next_contact_time}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bgWhite tab-pane fade pad-15" id="tabs2">
                        <div class="commonTitle">
                            <span>其他联系人</span>
                            <span class="pull-right">
                            <button type="button" class="btn btn-primary btn-sm" data-toggle="modal"
                                    data-backdrop="static"
                                    data-target="#addContact">+ 添加</button>
                            <button type="button" class="btn btn-default btn-sm ml-15"
                                    @click="deleteContact">删除</button>
                        </span>
                        </div>
                        <div class="blk20"></div>
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 mb-15" v-for="(item, i) in tab2.other_contacts" :key="i">
                                <div class="studentZL bda pl-25 pr-25 pt-10 pb-10">
                                    <div class="clearfix text-right" style="margin-bottom: -22px;">
                                        <input type="checkbox" name="id[]" style="margin-top: 0;" :value="item.id">
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
                        <div class="blk20"></div>
                        <div class="commonTitle">
                            <span>更多信息</span>
                        </div>
                        <div class="blk20"></div>
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
                    <div class="bgWhite tab-pane fade pad-15" id="tabs3">
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
                        <table class="table table-bordered">
                            <tbody>
                            <tr v-for="(item, i) in tab3" :key="i">
                                <td>
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name="index[]" :value="i"/>
                                            {{item.file_name}}
                                        </label>
                                    </div>
                                </td>
                                <td width="15%">{{item.file_size|bytesToSize}}</td>
                                <td width="20%">{{item.date}}</td>
                            </tr>
                            <tr v-if="tab3.length === 0">
                                <td colspan="3" v-html="NoData()"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="bgWhite tab-pane fade pad-15" id="tabs4">
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
                            <tr v-for="(item, i) in tab4" :key="i">
                                <td>{{item.time}}</td>
                                <td>{{item.operator}}</td>
                                <td>{{item.type}}</td>
                                <td>{{item.detail}}</td>
                            </tr>
                            <tr v-if="tab4.length===0">
                                <td colspan="4" v-html="NoData()"></td>
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
                                        <select name="adviser_id" class="form-control selectpicker" data-live-search="true" v-model="adviserId">
                                            <option value="">请选择用户</option>
                                            <option :value="item.id" v-for="(item, i) in service_adviser_list" :key="i">
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
                            <div class="modal-body pl-30 pr-30">
                                <div class="row">
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                        <div class="studentInfo">
                                            <div class="clearfix text-center pb-20 c666">
                                                <span class="userFace"><i
                                                        class="iconfont font50 c999">&#xe646;</i></span>
                                                <p><input type="text" name="stu_name" class="form-control"
                                                          placeholder="请输入学生姓名" v-model="header_info.stu_name"
                                                          v-validate="'required'" data-vv-as="学生姓名"/></p>
                                                <div class="validateTip text-left"
                                                     v-show="errors.has('form1.stu_name')">
                                                    {{ errors.first("form1.stu_name") }}
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
                                                            <option :value="item.id" v-for="(item, i) in student_type" :key="i">
                                                                {{item.stu_type}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label col-sm-4">当前状态</label>
                                                    <div class="col-sm-8">
                                                        <select name="sign_status" class="form-control selectpicker"
                                                                v-model.number="header_info.sign_status">
                                                            <option value="">请选择</option>
                                                            <option value="1">已签单</option>
                                                            <option value="2">咨询中</option>
                                                            <option value="3">待回访</option>
                                                            <option value="4">已流失</option>
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
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>语言成绩</label>
                                                    <div class="row">
                                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                                             style="padding-right:5px;">
                                                            <select name="lang_score_type" class="selectpicker"
                                                                    data-width="fit"
                                                                    style="display:inline-block;"
                                                                    v-model="header_info.lang_score_type">
                                                                <option value="">请选择</option>
                                                                <option value="雅思">雅思</option>
                                                                <option value="托福">托福</option>
                                                                <option value="PTE">PTE</option>
                                                                <option value="无">无</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                                             style="padding-left:5px;">
                                                            <input type="text" name="lang_score" class="form-control"
                                                                   placeholder="请输入" v-model="header_info.lang_score">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <div class="form-group">
                                                    <label>学术成绩</label>
                                                    <div class="row">
                                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                                             style="padding-right: 5px;">
                                                            <select name="acad_score_type" class="selectpicker"
                                                                    data-width="fit"
                                                                    style="display:inline-block;"
                                                                    v-model="header_info.acad_score_type">
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
                                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                                             style="padding-left:5px;">
                                                            <input type="text" name="acad_score" class="form-control"
                                                                   placeholder="请输入" v-model="header_info.acad_score">
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
                                                    <select name="intention_degree" class="selectpicker"
                                                            data-width="fit" v-model="header_info.intention_degree">
                                                        <option value="">请选择申请学位</option>
                                                        <option value="本科">本科</option>
                                                        <option value="本科预科">本科预科</option>
                                                        <option value="本硕连读">本硕连读</option>
                                                        <option value="硕士">硕士</option>
                                                        <option value="硕士预科">硕士预科</option>
                                                        <option value="博士">博士</option>
                                                        <option value="硕博连读">硕博连读</option>
                                                        <option value="ESL(语言班)">ESL(语言班)</option>
                                                        <option value="高中">高中</option>
                                                        <option value="初中">初中</option>
                                                    </select>
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
                                                    <select name="intention_country[]" class="selectpicker"
                                                            data-width="fit"
                                                            data-size="2"
                                                            multiple
                                                            data-live-search="true"
                                                            v-model="header_info.intention_country">
                                                        <option :value="item.id" v-for="(item, i) in nation" :key="i">
                                                            {{item.cn}}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <div class="form-group">
                                                    <label>备注消息</label>
                                                    <textarea name="remark" class="form-control" placeholder="请输入备注信息"
                                                              style="height: 50px;" v-model="header_info.remark"></textarea>
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
                                                <input type="text" name="contact_time" class="form-control" id="times2" placeholder="请选择联系时间">

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
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">联系人姓名</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" name="name" placeholder="请输入姓名">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">与学生关系</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" name="relation"
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
                                                       placeholder="请输入联系电话">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">联系邮箱</label>
                                            <div class="col-sm-8">
                                                <input type="text" name="email" class="form-control"
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
                                                       placeholder="请输入联系微信">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label">联系QQ</label>
                                            <div class="col-sm-8">
                                                <input type="text" name="qq" class="form-control"
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
                                                          style="height:80px;"></textarea>
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
            <a href='' target='_blank' id='file_down'></a>
        </div>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import '@~/js/VeeValidateConfig'
import nation from '@@/json/nation.json'
import store from '@/vuex/Store'
import db from '@~/js/request'
let WebUploader = require('@@/js/webuploader/webuploader')

export default {
  name: 'Edit',
  store,
  data () {
    return {
      loading: true,
      nation: nation,
      id: '',
      country: '',
      student_types: '',
      adviserId: '',
      studentSource: '',
      header_info: {
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
      tab3: [],
      tab4: {},
      student_type: [],
      service_adviser_list: [],
      contactId: [],
      fid: []
    }
  },
  computed: {
    token () {
      return store.state.token
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.getDetail()
    self.$nextTick(() => {
      setTimeout(function () {
        self.laydate.render({
          elem: '#times2',
          type: 'datetime'
        })
        self.laydate.render({
          elem: '#times3',
          type: 'datetime'
        })

        $('.selectpicker').selectpicker()
        self.createUpload()

        $(document).on('click', '[name="fid[]"]', function () {
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

        $(document).on('click', '.studentZL input', function () {
          if ($(this).is(':checked') === true) {
            self.contactId.push($(this).val())
          } else {
            self.contactId.map((item, i) => {
              if (item === $(this).val()) {
                self.contactId.splice(i, 1)
              }
            })
          }
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
      }, 1000)
    })
  },
  methods: {
    getDetail () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.getRequest('Institution/Student/stuManageDetail', params).then(res => {
        if (res.status === 1) {
          self.header_info = res.data.header_info
          self.follow_type = res.data.follow_type
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
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
        self.loading = false
        setTimeout(function () {
          if (self.id === '') {
            $('#editStudentInfo').modal('show')
          }
        }, 1000)
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
    createUpload () {
      let self = this
      let uploader = WebUploader.create({
        auto: true,
        swf: 'static/js/webuploader/Uploader.swf',
        server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne',
        fileVal: 'file',
        pick: '#picker',
        file_id: 'file_ids',
        fileSingleSizeLimit: 1024 * 1024 * 20,
        duplicate: true,
        accept: {
          title: '',
          extensions: 'rar,zip,doc,docx,pdf,jpg',
          mimeTypes: '*/*'
        },
        formData: {func: 'student_attachment', student_id: self.id}
      })
      uploader.on('uploadSuccess', function (file, res) {
        self.tab3.push({
          file_name: res.data.file_name,
          file_size: res.data.file_size,
          date: res.data.date
        })
      })
      uploader.on('error', function (handler) {
        if (handler === 'Q_TYPE_DENIED') {
          self.layer.alert('文件类型不正确！', {icon: 2})
        }
      })
    },
    validateBeforeSubmitStudentInfo (scope) {
      let self = this
      let index = self.layer.load('', {shade: 0.3})
      self.$validator.validateAll(scope).then((result) => {
        if (result) {
          let formData = $('#editStudentInfoForm').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('Institution/Student/stuSave', params).then(res => {
            self.layer.close(index)
            if (res.status === 1) {
              self.header_info = res.data
              self.id = res.data.stu_id
              let countryArr = []
              res.data.intention_country.map(item => {
                self.nation.map(items => {
                  if (items.id === parseInt(item)) {
                    countryArr.push(items.cn)
                  }
                })
              })
              self.country = countryArr.join(',')
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
                $('#editStudentInfo').modal('hide')
                if (self.id === '') {
                  self.$router.push('/archives/student/edit?id=' + res.data.stu_id)
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
          self.layer.alert(res.msg, {icon: 1}, function (i) {
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
      self.layer.confirm("是否确定把所选的学生转移至 <b class='cf00'>" + advName + '</b>（选择的用户）？转移成功后，原负责人不能再维护跟进和更新此学生数据。', {
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
          $('#contactForm')[0].reset()
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
            $('#addContact').modal('hide')
            self.tab2.other_contacts = res.data
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    },
    deleteContact () {
      let self = this
      if (self.contactId.length === 0) {
        self.layer.alert('请选择需要操作的ID', {icon: 2})
        return false
      }
      self.layer.confirm('您确定要删除此信息？', {
        icon: 3
      }, function (i) {
        self.layer.close(i)
        let params = new URLSearchParams()
        params.append('student_id', self.id)
        self.contactId.map(item => {
          params.append('id[]', item)
        })
        db.postRequest('Institution/Student/batchDelContacts', params).then(res => {
          if (res.status === 1) {
            self.tab2.other_contacts = res.data
            self.layer.alert(res.msg, {icon: 1}, function (i) {
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
        self.layer.alert('请选择需要操作的ID', {icon: 2})
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
        self.layer.alert('请选择需要操作的ID', {icon: 2})
        return false
      }
      let params = new URLSearchParams()
      params.append('student_id', self.id)
      self.fid.map(item => {
        params.append('index[]', item)
      })
      db.postRequest('Institution/Student/batchDelAttach', params).then(res => {
        if (res.status === 1) {
          self.fid.map(item => {
            self.tab3.splice(item, 1)
          })
          self.fid = []
          $('#tabs3 [name="index[]"]').each(function () {
            this.checked = false
          })
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
          })
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .modal-lg {width:1000px;}
    .studentInfo {
        padding-right:15px;
        & .userFace {
            width:80px;height:80px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;display:block;margin:0 auto 15px auto;border:1px solid #ddd;line-height:80px;
        }
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
        }
        & .panel-noData {
            border:1px dashed #ddd;padding:30px;text-align:center;
        }
        & .panel-border-x {
            position:relative;
            &:before {
                content:'';display:block;width:1px;position:absolute;left:25px;top:15px;bottom:30px;background-color:#ddd;z-index:1;
            }
            & .dynamic {
                background-color:#f1f2f7;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;padding:15px;margin-left:25px;font-size:12px;position:relative;margin-bottom:15px;
                &.weChat {
                    &:before {
                        content:'\e6a8';font-family:"iconfont";font-size:20px;display:block;position:absolute;left:-25px;top:0;color:#5db870;z-index:2;width:20px;height:20px;-webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;background-color:#fff;
                    }
                }
                &.mobile {
                    &:before {
                        content:'\e625';font-family:"iconfont";font-size:14px;text-align:center;line-height:20px;display:block;position:absolute;left:-25px;top:0;color:#fff;z-index:2;width:20px;height:20px;-webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;background-color:#ffa852;
                    }
                }
                &.qq {
                    &:before {
                        content:'\e638';font-family:"iconfont";font-size:20px;display:block;position:absolute;left:-25px;top:0;color:#1296db;z-index:2;width:20px;height:20px;-webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;background-color:#fff;
                    }
                }
            }
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
                    width:25%;
                }
                &:last-of-type {
                    width:75%;padding-left:5px;
                }
            }
        }
    }
</style>
<style lang="scss">
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
