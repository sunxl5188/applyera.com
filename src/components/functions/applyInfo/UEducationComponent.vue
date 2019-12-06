<template>
    <div>
        <form id="EducationForm" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
            <!--****************************************************-->
            <input type="hidden" name="education_type" id="education_type" value="1"/>
            <!--推荐人-->
            <div class="clearfix lh34 mb-15 bdb">
                <h4>
                    <b>推荐人</b>
                    <span class="font14 c999">(建议您至少添加一位学术推荐人)</span>
                    <button type="button" class="btn btn-primary btn-sm" @click="addReCommend">新增推荐人</button>
                </h4>
            </div>
            <div class="clearfix" v-for="(item, i) in education.rcmder" :key="'tjr'+i">
                <input type="hidden" :name="'rcmder[id]['+i+']'" :value="item.id" />
                <div class="clearfix pt-10 pb-10 mb-10 text-right bdb" v-if="i > 0">
                    <button type="button" class="btn btn-default btn-sm" @click="delRecommend(i)">删除</button>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>推荐人姓名 <font class="cf00">*</font></label>
                            <input type="text" :name="'rcmder[name]['+i+']'" v-model="item.name" class="form-control" placeholder="请用英文输入推荐人姓名" v-validate="'required|ens'" data-vv-as="推荐人姓名">
                            <div class="validateTip" v-show="errors.has('rcmder[name]['+i+']')">
                                {{ errors.first('rcmder[name]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>推荐人职位 <font class="cf00">*</font></label>
                            <input type="text" :name="'rcmder[career]['+i+']'" v-model="item.career" class="form-control" placeholder="请用英文或拼音输入推荐人的职位名称" v-validate="'required|ens'" data-vv-as="推荐人职位">
                            <div class="validateTip" v-show="errors.has('rcmder[career]['+i+']')">
                                {{ errors.first('rcmder[career]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>推荐人称谓 <font class="cf00">*</font></label>
                            <select :name="'rcmder[title]['+i+']'" v-model="item.title" class="form-control selectpicker show-tick" v-validate="'required'" data-vv-as="推荐人称谓">
                                <option value="">请选择</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                                <option value="Mr">Mr</option>
                            </select>
                            <div class="validateTip" v-show="errors.has('rcmder[title]['+i+']')">
                                {{ errors.first('rcmder[title]['+i+']') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>与我的关系 <font class="cf00">*</font></label>
                            <input type="text" :name="'rcmder[relation]['+i+']'" v-model="item.relation" class="form-control" placeholder="请用英文或拼音输入推荐人与您的关系，如：Teacher" v-validate="'required|ens'" data-vv-as="与我的关系">
                            <div class="validateTip" v-show="errors.has('rcmder[relation]['+i+']')">
                                {{ errors.first('rcmder[relation]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>联系电话 <font class="cf00">*</font></label>
                            <input type="text" :name="'rcmder[phone]['+i+']'" v-model="item.phone" class="form-control" placeholder="请输入联系电话" v-validate="'required'" data-vv-as="联系电话">
                            <div class="validateTip" v-show="errors.has('rcmder[phone]['+i+']')">
                                {{ errors.first('rcmder[phone]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>联系邮箱</label>
                            <input type="text" :name="'rcmder[email]['+i+']'" v-model="item.email" class="form-control" placeholder="请输入联系邮箱">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>推荐人优先级
                                <i class="iconfont c999 handPower" title="若学校只要求一个推荐人，我们提交优先级靠前的推荐人" data-toggle="tooltip" data-placement="top">&#xe999;</i>
                                <font class="cf00">*</font>
                            </label>
                            <select :name="'rcmder[lv]['+i+']'" v-model="item.lv" class="form-control selectpicker show-tick" v-validate="'required'" data-vv-as="推荐人优先级">
                                <option value="">请选择</option>
                                <option value="1">第一推荐人</option>
                                <option value="2">第二推荐人</option>
                                <option value="3">第三推荐人</option>
                                <option value="4">第四推荐人</option>
                                <option value="5">第五推荐人</option>
                            </select>
                            <div class="validateTip" v-show="errors.has('rcmder[lv]['+i+']')">
                                {{ errors.first('rcmder[lv]['+i+']') }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <div class="form-group">
                            <label>详细地址 <font class="cf00">*</font></label>
                            <div class="form-inline" id="citys">
                                <CitySelect
                                        :p="item.prov"
                                        :c="item.city"
                                        :a="item.district"
                                        :pName="'rcmder[prov]['+i+']'"
                                        :cName="'rcmder[city]['+i+']'"
                                        :aName="'rcmder[district]['+i+']'"
                                        @cityCallback="cityCallback"/>
                                <input type="hidden" :name="'ReDer[prov]['+i+']'" :value="item.prov" v-validate="'required'" data-vv-as="省" />
                                <input type="hidden" :name="'ReDer[city]['+i+']'" :value="item.city" v-validate="'required'" data-vv-as="市" />
                                <input type="hidden" :name="'ReDer[district]['+i+']'" :value="item.district" v-validate="'required'" data-vv-as="区" />
                                <input type="text" :name="'rcmder[details]['+i+']'" v-model="item.details" class="form-control" placeholder="请用英文或拼音输入推荐人地址" v-validate="'required'" data-vv-as="详细地址">
                                <div class="validateTip" v-show="errors.has('ReDer[prov]['+i+']')">
                                    {{ errors.first('ReDer[prov]['+i+']') }}
                                </div>
                                <div class="validateTip" v-show="errors.has('ReDer[city]['+i+']')">
                                    {{ errors.first('ReDer[city]['+i+']') }}
                                </div>
                                <div class="validateTip" v-show="errors.has('ReDer[district]['+i+']')">
                                    {{ errors.first('ReDer[district]['+i+']') }}
                                </div>
                                <div class="validateTip" v-show="errors.has('rcmder[details]['+i+']')">
                                    {{ errors.first('rcmder[details]['+i+']') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--高中信息-->
            <div class="clearfix lh34 mb-15 bdb"><h4><b>高中信息</b></h4></div>

            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>高中名称 <font class="cf00">*</font></label>
                        <input type="text" name="highschool_name" class="form-control" placeholder="请用英文输入高中名称"
                               v-validate="'required|ens'" data-vv-as="高中名称" v-model="education.highschool_name">
                        <div class="validateTip" v-show="errors.has('highschool_name')">
                            {{ errors.first("highschool_name") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>就读时间 <font class="cf00">*</font></label>
                        <input type="text" name="highschool_enter_time" data-name="highschool_enter_time"
                               class="form-control times"
                               placeholder="请输入学时间"
                               v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="就读时间"
                               v-model="education.highschool_enter_time">
                        <div class="validateTip" v-show="errors.has('highschool_enter_time')">
                            {{ errors.first("highschool_enter_time") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>是否为寄宿学校 <font class="cf00">*</font></label>
                        <div class="checkbox">
                            <label style="padding-left: 0;">
                                <input type="radio" name="is_highschool_boarding" value="1"
                                       v-model="education.is_highschool_boarding"> 是
                            </label>
                            <label>
                                <input type="radio" name="is_highschool_boarding" value="2"
                                       v-model="education.is_highschool_boarding"> 否
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>我没有从该校毕业</label>
                        <div class="checkbox" style="display:inline-block;">
                            <label>
                                <input type="checkbox" name="is_not_graduated" value="1" data-obj="education"
                                       data-name="is_not_graduated"
                                       v-model="education.is_not_graduated" @change="showTimeC">&nbsp;
                            </label>
                        </div>
                        <div class="row" v-if="education.is_not_graduated">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label>离开时间</label>
                                    <input type="text" name="not_graduated_leaved" data-name="not_graduated_leaved"
                                           class="form-control times"
                                           placeholder="请选择离开时间" v-validate="'required|date_format:yyyy-MM-dd'"
                                           data-vv-as="时间" v-model="education.not_graduated_leaved">
                                    <div class="validateTip" v-show="errors.has('not_graduated_leaved')">
                                        {{ errors.first("not_graduated_leaved") }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <div class="form-group">
                                    <label>请说明原因</label>
                                    <input type="text" name="not_graduated_reason" class="form-control"
                                           placeholder="请用英文说明没有从该校毕业的原因" v-validate="'required|en'"
                                           data-vv-as="原因" v-model="education.not_graduated_reason">
                                    <div class="validateTip" v-show="errors.has('not_graduated_reason')">
                                        {{ errors.first("not_graduated_reason") }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>实际毕业时间与原计划毕业时间有变</label>
                        <div class="checkbox" style="display:inline-block;">
                            <label>
                                <input type="checkbox" name="is_graduated_plan" value="1" data-obj="education"
                                       data-name="is_graduated_plan"
                                       v-model="education.is_graduated_plan">&nbsp;
                            </label>
                        </div>
                        <div class="row" v-if="education.is_graduated_plan">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label>变化原因</label>
                                    <div class="checkbox">
                                        <label style="padding-left: 0;">
                                            <input type="radio" name="graduated_plan_reason" value="1"
                                                   v-model="education.graduated_plan_reason">
                                            曾经或将提前毕业
                                        </label>
                                        <label>
                                            <input type="radio" name="graduated_plan_reason" value="2"
                                                   v-model="education.graduated_plan_reason"> 曾经或推迟毕业
                                        </label>
                                        <label>
                                            <input type="radio" name="graduated_plan_reason" value="3"
                                                   v-model="education.graduated_plan_reason">
                                            曾经或将休假(病假等)
                                        </label>
                                        <label>
                                            <input type="radio" name="graduated_plan_reason" value="4"
                                                   v-model="education.graduated_plan_reason"> 曾经或将休学一年
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="form-group">
                                    <label>请详细说明变化情况及原因</label>
                                    <textarea type="text" name="graduated_plan_detail" class="form-control"
                                              placeholder="请输入详细变化情况及原因（英文）" v-validate="'required|ens'"
                                              data-vv-as="原因" v-model="education.graduated_plan_detail"></textarea>
                                    <div class="validateTip" v-show="errors.has('graduated_plan_detail')">
                                        {{ errors.first("graduated_plan_detail") }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix lh34 font16 bdb mb-15">在校成绩</div>
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>年级人数 <font class="cf00">*</font></label>
                        <input type="text" name="grade_num" class="form-control" placeholder="请输入年级人数"
                               v-validate="'required|integer'" data-vv-as="人数" v-model="education.grade_num">
                        <div class="validateTip" v-show="errors.has('grade_num')">
                            {{ errors.first("grade_num") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>年级排名 <span class="cf999 font12">成绩单上有此信息，才需填写</span></label>
                        <input type="text" name="grade_ranking" class="form-control" placeholder=""
                               v-model="education.grade_ranking">
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>累计GPA</label>
                        <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <input type="text" name="gpa" class="form-control" placeholder="请输入累计GPA"
                                       v-model="education.gpa">
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <select name="point" class="form-control selectpicker" v-model="education.point">
                                    <option value="">选择绩点标准</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>GPA是否加权</label>
                        <div class="checkbox">
                            <label style="padding-left: 0;">
                                <input type="radio" name="gpa_import" value="1" v-model="education.gpa_import"> 是
                            </label>
                            <label>
                                <input type="radio" name="gpa_import" value="0" v-model="education.gpa_import"> 否
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix lh34 font16 bdb mb-15">升学顾问/班主任</div>
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>姓名 <font class="cf00">*</font></label>
                        <input type="text" name="teacher_name" class="form-control" placeholder="请输入中文姓名，如：李雷"
                               v-validate="'required|zh'" data-vv-as="姓名" v-model="education.teacher_name">
                        <div class="validateTip" v-show="errors.has('teacher_name')">
                            {{ errors.first("teacher_name") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>姓（拼音） <font class="cf00">*</font></label>
                        <input type="text" name="teacher_last_name" class="form-control" placeholder="请输入姓的拼音，如：Li"
                               v-validate="'required|en'" data-vv-as="姓" v-model="education.teacher_last_name">
                        <div class="validateTip" v-show="errors.has('teacher_last_name')">
                            {{ errors.first("teacher_last_name") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>名（拼音） <font class="cf00">*</font></label>
                        <input type="text" name="teacher_first_name" class="form-control"
                               placeholder="请输入名的拼音，如：Lei" v-validate="'required|en'" data-vv-as="名"
                               v-model="education.teacher_first_name">
                        <div class="validateTip" v-show="errors.has('teacher_first_name')">
                            {{ errors.first("teacher_first_name") }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>职位 <font class="cf00">*</font></label>
                        <input type="text" name="teacher_position" class="form-control" placeholder="请用英文输入担任职位"
                               v-validate="'required|en:请用英文输入担任职位'" data-vv-as="职位"
                               v-model="education.teacher_position">
                        <div class="validateTip" v-show="errors.has('teacher_position')">
                            {{ errors.first("teacher_position") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>邮箱<font class="cf00">*</font></label>
                        <input type="text" name="teacher_email" class="form-control" placeholder="请输入邮箱"
                               v-validate="'required|email'" data-vv-as="邮箱" v-model="education.teacher_email">
                        <div class="validateTip" v-show="errors.has('teacher_email')">
                            {{ errors.first("teacher_email") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>移动电话<font class="cf00">*</font></label>
                        <input type="text" name="teacher_phone" class="form-control" placeholder="请输入电话"
                               v-validate="'required|mobile'" data-vv-as="电话" v-model="education.teacher_phone">
                        <div class="validateTip" v-show="errors.has('teacher_phone')">
                            {{ errors.first("teacher_phone") }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix lh34 font16 bdb mb-15">高中课程 <span
                    class="c999 font12">（请添加最近一学年的高中课程，课程信息请保证与高中成绩单一致）</span>
            </div>
            <div class="row" v-for="(item, i) in education.course" :key="i">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>课程名称({{i+1}}) <font class="cf00">*</font> <a href="javascript:void(0);"
                                                                            class="cf00 ml-30"
                                                                            @click="delHighSchool(i)"
                                                                            v-if="i>0">删除</a></label>
                        <input type="text" :name="'course[name]['+i+']'" class="form-control"
                               placeholder="请输入英文输入课程全称"
                               v-validate="'required|en'" data-vv-as="名称" v-model="item.name">
                        <div class="validateTip" v-show="errors.has('course[name]['+i+']')">
                            {{ errors.first("course[name]["+i+"]") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>学制 <font class="cf00">*</font></label>
                        <select :name="'course[plan]['+i+']'" class="form-control selectpicker" v-validate="'required'"
                                data-vv-as="学制" v-model="item.plan">
                            <option value="">请选择课程计划</option>
                            <option value="Semester">学期制</option>
                            <option value="Trimester">三学期制</option>
                            <option value="Quarter">学季制</option>
                        </select>
                        <div class="validateTip" v-show="errors.has('course[plan]['+i+']')">
                            {{ errors.first("course[plan]["+i+"]") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>&nbsp;</label>
                        <select :name="'course[type]['+i+']'" class="form-control selectpicker" v-model="item.type">
                            <option value="">请选择课程种类</option>
                            <option value="Accelerated">Accelerated</option>
                            <option value="AP">AP</option>
                            <option value="AICE">AICE</option>
                            <option value="Dual_Enrollment">Dual_Enrollment</option>
                            <option value="IB">IB</option>
                            <option value="Regents">Regents</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="clearfix text-right lh34"><a href="javascript:void(0);" class="cded"
                                                     @click="addHighSchool($event)">+ 继续添加高中课程</a></div>

            <div class="clearfix lh34 font16 bdb mb-15">课外活动</div>

            <div class="clearfix activity" v-for="(item, i) in education.activity" :key="'a'+i">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>活动名称({{i+1}}) <a href="javascript:void(0);" class="cf00 ml-30"
                                                    @click="delActivity(i)" v-if="i>0">删除</a></label>
                            <input type="text" :name="'activity[name]['+i+']'" class="form-control"
                                   placeholder="请输入活动名称"
                                   v-model="item.name">
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>担任职务</label>
                            <input type="text" :name="'activity[position]['+i+']'" class="form-control"
                                   placeholder="请输入英文担任职务"
                                   v-model="item.position">
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>参与年级</label>
                            <select :name="'activity[grade]['+i+']'" class="form-control selectpicker"
                                    v-model="item.grade">
                                <option value="">请选择</option>
                                <option value="1">初三</option>
                                <option value="2">高一</option>
                                <option value="3">高二</option>
                                <option value="4">高三</option>
                                <option value="5">高三以后</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>活动时间</label>
                            <input type="text" :name="'activity[time]['+i+']'" :data-name="'activity|time|'+i"
                                   class="form-control times"
                                   placeholder="请输入活动时间" v-model="item.time">
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>花费时间</label>
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <input type="text" :name="'activity[hour]['+i+']'" class="form-control"
                                           placeholder="" style="width:50%;display: inline-block;"
                                           v-model="item.hour">
                                    <span class="div_vm lh34">小时/周</span>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <input type="text" :name="'activity[week]['+i+']'" class="form-control"
                                           placeholder="" style="width:50%;display: inline-block;"
                                           v-model="item.week">
                                    <span class="div_vm lh34">星期/年</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <label>是否想在大学继续对加此类活动</label>
                            <div class="checkbox">
                                <label style="padding-left: 0;">
                                    <input type="radio" :name="'activity[join]['+i+']'" value="1"
                                           v-model="item.join"> 是
                                </label>
                                <label>
                                    <input type="radio" :name="'activity[join]['+i+']'" value="2"
                                           v-model="item.join"> 否
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>活动说明与取得成就</label>
                            <textarea :name="'activity[detail]['+i+']'" class="form-control"
                                      placeholder="请用英文和数字填写活动说明与取得成就" v-model="item.detail"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix text-right lh34"><a href="javascript:void(0);" class="cded"
                                                     @click="addActivity()">+ 继续添加课外活动</a></div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>我在其他高中就读过 </label><span class="c999 font12">(初中信息也请在此项添加)</span>
                        <div class="checkbox" style="display:inline-block;">
                            <label>
                                <input type="checkbox" name="is_other_school" data-obj="education"
                                       data-name="is_other_school" v-model="education.is_other_school"
                                       @change="showTimeC">&nbsp;
                            </label>
                        </div>
                        <div v-if="education.is_other_school">
                            <div class="otherSchoolList" v-for="(item, i) in education.other_school" :key="i">
                                <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>学校名称({{i+1}}) <font class="cf00">*</font> <a
                                                    href="javascript:void(0);" class="cf00 ml-30"
                                                    @click="delOtherSchool(i)" v-if="i>0">删除</a></label>
                                            <input type="text" :name="'other_school[name]['+i+']'"
                                                   class="form-control" placeholder="请输入学校名称"
                                                   v-validate="'required|alpha_dash'" data-vv-as="学校名称"
                                                   v-model="item.name">
                                            <div class="validateTip"
                                                 v-show="errors.has('other_school[name]['+i+']')">
                                                {{ errors.first("other_school[name]["+i+"]") }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>就读时间 <font class="cf00">*</font></label>
                                            <input type="text" :name="'other_school[time]['+i+']'"
                                                   :data-name="'other_school|time|'+i"
                                                   class="form-control times" placeholder="请输入就读时间"
                                                   v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="就读时间"
                                                   v-model="item.time">
                                            <div class="validateTip"
                                                 v-show="errors.has('other_school[time]['+i+']')">
                                                {{ errors.first("other_school[time]["+i+"]") }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>学历 <font class="cf00">*</font></label>
                                            <div class="checkbox">
                                                <label style="padding-left: 0;">
                                                    <input type="radio" :name="'other_school[degree]['+i+']'"
                                                           value="1" v-model="item.degree"> 高中
                                                </label>
                                                <label>
                                                    <input type="radio" :name="'other_school[degree]['+i+']'"
                                                           value="2" v-model="item.degree"> 初中
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div class="form-group">
                                            <label>请说明从该校离开的原因 <font class="cf00">*</font></label>
                                            <textarea :name="'other_school[reason]['+i+']'" class="form-control"
                                                      placeholder="请用英文说明从该校离开的原因" v-validate="'required|ens'"
                                                      data-vv-as="原因" v-model="item.reason"></textarea>
                                            <div class="validateTip"
                                                 v-show="errors.has('other_school[reason]['+i+']')">
                                                {{ errors.first("other_school[reason]["+i+"]") }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix text-right lh34"><a href="javascript:void(0);" class="cded"
                                                                     @click="addOtherSchool">+ 继续添加其他高中/初中信息</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>我有上过大学课程 </label><span class="font12 c999">(包括大学的Summer Program)</span>
                        <div class="checkbox" style="display:inline-block;">
                            <label>
                                <input type="checkbox" name="is_study_university" data-obj="education"
                                       data-name="is_study_university"
                                       v-model="education.is_study_university" @change="showTimeC">&nbsp;
                            </label>
                        </div>
                        <div v-if="education.is_study_university">
                            <div class="studyUniversityList" v-for="(item, i) in education.study_university" :key="i">
                                <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>学校名称({{i+1}}) <font class="cf00">*</font> <a
                                                    href="javascript:void(0);" class="cf00 ml-30"
                                                    @click="delStudyUniversity(i)" v-if="i>0">删除</a></label>
                                            <input type="text" :name="'study_university[schoolName]['+i+']'"
                                                   class="form-control" placeholder="请输入学校名称，如Beijing University"
                                                   v-validate="'required|ens'" data-vv-as="学校名称"
                                                   v-model="item.schoolName">
                                            <div class="validateTip"
                                                 v-show="errors.has('study_university[schoolName]['+i+']')">
                                                {{ errors.first("study_university[schoolName]["+i+"]") }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>课程时间 <font class="cf00">*</font></label>
                                            <input type="text" :name="'study_university[time]['+i+']'"
                                                   :data-name="'study_university|time|'+i"
                                                   class="form-control times" placeholder="请选择课程时间"
                                                   v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="就读时间"
                                                   v-model="item.time">
                                            <div class="validateTip"
                                                 v-show="errors.has('study_university[time]['+i+']')">
                                                {{ errors.first("study_university[time]["+i+"]") }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>课程名称 <font class="cf00">*</font></label>
                                            <input type="text" :name="'study_university[courseName]['+i+']'"
                                                   class="form-control" placeholder="请用英文输入课程名称"
                                                   v-validate="'required|ens'" data-vv-as="课程名称"
                                                   v-model="item.courseName">
                                            <div class="validateTip"
                                                 v-show="errors.has('study_university[courseName]['+i+']')">
                                                {{ errors.first("study_university[courseName]["+i+"]") }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>学分</label>
                                            <input type="text" :name="'study_university[point]['+i+']'"
                                                   class="form-control" placeholder="请输入学分"
                                                   v-validate="'required|integer'" data-vv-as="学分"
                                                   v-model="item.point">
                                            <div class="validateTip"
                                                 v-show="errors.has('study_university[point]['+i+']')">
                                                {{ errors.first("study_university[point]["+i+"]") }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                        <div class="form-group">
                                            <label>课程类型</label>
                                            <div class="checkbox">
                                                <label style="padding-left: 0;">
                                                    <input type="radio" :name="'study_university[type]['+i+']'"
                                                           value="1" v-model="item.type"> 高中双学分课程
                                                </label>
                                                <label>
                                                    <input type="radio" :name="'study_university[type]['+i+']'"
                                                           value="2" v-model="item.type"> 夏校项目
                                                </label>
                                                <label>
                                                    <input type="radio" :name="'study_university[type]['+i+']'"
                                                           value="3" v-model="item.type"> 大学学分
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix text-right lh34"><a href="javascript:void(0);" class="cded"
                                                                     @click="addStudyUniversity">+ 继续添加大学课程经历</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                        <label>我有获得过奖项荣誉 </label><span class="font12 c999">(请添加所获得奖项 不超过5个)</span>
                        <div class="checkbox" style="display:inline-block;">
                            <label>
                                <input type="checkbox" name="is_honor" data-obj="education" data-name="is_honor"
                                       v-model="education.is_honor">&nbsp;
                            </label>
                        </div>
                        <div v-if="education.is_honor">
                            <div class="HonorList" v-for="(item, i) in education.honor" :key="i">
                                <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>奖项荣誉({{i+1}}) <font class="cf00">*</font> <a
                                                    href="javascript:void(0);" class="cf00 ml-30"
                                                    @click="delHonor(i)" v-if="i>0">删除</a></label>
                                            <input type="text" :name="'honor[name]['+i+']'"
                                                   class="form-control" placeholder="请输入奖项荣誉名称"
                                                   v-validate="'required|ens'" data-vv-as="名称" v-model="item.name">
                                            <div class="validateTip"
                                                 v-show="errors.has('honor[name]['+i+']')">
                                                {{ errors.first("honor[name]["+i+"]") }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>获奖信息</label>
                                            <select :name="'honor[grade]['+i+']'" class="form-control selectpicker"
                                                    v-model="item.grade">
                                                <option value="">请选择获奖年级</option>
                                                <option value="1">初三</option>
                                                <option value="2">高一</option>
                                                <option value="3">高二</option>
                                                <option value="4">高三</option>
                                                <option value="5">高三以后</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>&nbsp;</label>
                                            <select :name="'honor[honorLv]['+i+']'" class="form-control selectpicker"
                                                    v-model="item.honorLv">
                                                <option value="">请选择获奖等级</option>
                                                <option value="1">校级荣誉</option>
                                                <option value="2">市级/省级荣誉</option>
                                                <option value="3">国家级荣誉</option>
                                                <option value="4">国际级荣誉</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix text-right lh34"><a href="javascript:void(0);" class="cded"
                                                                     @click="addHonor">+ 继续添加奖项荣誉</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="clearfix lh34 font16 bdb mb-15">职业规划</div>
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>职业兴趣 <font class="cf00">*</font></label>
                        <select name="career_interest" class="form-control selectpicker" data-live-search="true" data-size="15" v-validate="'required'"
                                data-vv-as="职业兴趣" v-model="education.career_interest">
                            <option value="">请选择职业兴趣</option>
                            <option :value="item.id" v-for="(item,i) in career" :key="i">{{item.cn}}</option>
                        </select>
                        <div class="validateTip" v-show="errors.has('career_interest')">
                            {{ errors.first("career_interest") }}
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label>您计划获得的最高学历 <font class="cf00">*</font></label>
                        <select name="career_planing" class="form-control selectpicker" v-validate="'required'"
                                data-vv-as="最高学历" v-model="education.career_planing">
                            <option value="">请选择学历</option>
                            <option :value="item.id" v-for="(item,i) in degree" :key="i">{{item.cn}}</option>
                        </select>
                        <div class="validateTip" v-show="errors.has('career_planing')">
                            {{ errors.first("career_planing") }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix text-center pt-35 pb-15">
                <button type="button" class="btn btn-primary btn-lg" style="width: 200px;">下一页</button>
                <button type="button" class="btn btn-outline-primary btn-lg ml-20" style="width: 200px;">保存</button>
            </div>
        </form>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import CitySelect from '@#/shared/CitySelect'
import career from '@@/json/career.json'
import degree from '@@/json/degree.json'
require('icheck')

export default {
  name: 'UEducationComponent',
  props: {
    education: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      career: career,
      degree: degree,
      defaultRe: {
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
      },
      ReIndex: ''
    }
  },
  mounted () {
    let self = this
    self.showTimeC()
    self.RefreshSelect()
    self.setIcheck()
    self.$nextTick(() => {
      $(document).on('change', '#citys select', function () {
        self.ReIndex = $(this).attr('name').match(/[0-9]+/)[0]
      })
    })
  },
  methods: {
    showTimeC () {
      let self = this
      setTimeout(function () {
        $('#EducationForm .times').each(function (index, element) {
          let manes = element.getAttribute('data-name').split('|')
          if (manes.length > 1) {
            self.laydate.render({
              elem: element,
              done (value1) {
                self.education[manes[0]][manes[2]][manes[1]] = value1
              }
            })
          } else {
            self.laydate.render({
              elem: element,
              done (value1) {
                self.education[element.getAttribute('name')] = value1
              }
            })
          }
        })
      }, 800)
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        let formData = $('#EducationForm').serializeArray()
        self.$emit('EducationCallback', result, formData)
      })
    },
    // 添加高中
    addHighSchool () {
      let self = this
      self.education.course.push({
        name: '',
        plan: '',
        type: ''
      })
      self.RefreshSelect()
    },
    // 删除高中课程
    delHighSchool (i) {
      this.education.course.splice(i, 1)
    },
    // 添加活动
    addActivity () {
      let self = this
      self.education.activity.push({
        join: 1,
        grade: ''
      })
      self.showTimeC()
      self.RefreshSelect()
      self.setIcheck()
    },
    // 删除活动
    delActivity (i) {
      this.education.activity.splice(i, 1)
    },
    // 添加其他高中
    addOtherSchool () {
      let self = this
      self.education.other_school.push({
        degree: 1
      })
      self.showTimeC()
      self.setIcheck()
    },
    // 删除其他高中
    delOtherSchool (i) {
      this.education.other_school.splice(i, 1)
    },
    // 添加我有上过大学课程
    addStudyUniversity () {
      let self = this
      self.education.study_university.push({
        type: 1
      })
      self.showTimeC()
      self.setIcheck()
    },
    // 删除我有上过大学课程
    delStudyUniversity (i) {
      this.education.study_university.splice(i, 1)
    },
    // 添加奖项荣誉
    addHonor () {
      let self = this
      self.education.honor.push({
        honorLv: '',
        grade: ''
      })
      self.RefreshSelect()
    },
    // 删除奖项荣誉
    delHonor (i) {
      this.education.honor.splice(i, 1)
    },
    RefreshSelect () {
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh')
      }, 200)
    },
    // 设置单、多选样式
    setIcheck () {
      let self = this
      setTimeout(function () {
        $('#EducationForm [type="checkbox"]').each(function () {
          $(this).iCheck({
            labelHover: false,
            cursor: true,
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            increaseArea: '20%'
          })
          $(this).on('ifChanged', function (event) {
            let obj = $(event.currentTarget).attr('data-obj')
            let thisName = $(event.currentTarget).attr('data-name')
            if (thisName !== undefined) {
              self[obj][thisName] = event.currentTarget.checked ? 1 : ''
              self.RefreshSelect()
              self.showTimeC()
            }
            if (thisName === 'is_graduated_plan' || thisName === 'is_other_school' || thisName === 'is_study_university') {
              self.setIcheck()
            }
          })
        })
        $('#EducationForm [type="radio"]').each(function () {
          $(this).iCheck({
            labelHover: false,
            cursor: true,
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            increaseArea: '20%'
          })
        })
      }, 500)
    },
    cityCallback (data) {
      let self = this
      setTimeout(function () {
        let i = self.ReIndex
        self.education.rcmder[i]['prov'] = data.province
        self.education.rcmder[i]['city'] = data.city
        self.education.rcmder[i]['district'] = data.area
      }, 100)
    },
    addReCommend () {
      this.education.rcmder.push(this.defaultRe)
    },
    delRecommend (i) {
      this.education.rcmder.splice(i, 1)
    }
  },
  components: {
    CitySelect
  }
}
</script>

<style scoped lang="scss">
.form-group {margin-left:0 !important;margin-right:0 !important;}
</style>
