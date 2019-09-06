<template>
    <div id="editplan" class="bgGray">
        <div class="editplanWrap">
            <div class="pad30" v-if="loading" v-html="LoadingImg()"></div>
            <div v-if="!loading">
                <div class="header-wrap bgGray">
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="header-title"><span>留学规划</span></div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center lh36 c999">
                            <div v-if="studentInfo.ins_student_name && studentInfo.ins_student_apply_degree && studentInfo.ins_student_intention_major">
                                {{studentInfo.ins_student_name}}
                                {{"-"+studentInfo.ins_student_apply_degree}}
                                {{"-"+studentInfo.ins_student_intention_major}}
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-right">
                            <button type="button" class="btn btn-default ml-10" @click="submitSave"><i
                                    class="iconfont">&#xe637;</i>保存
                            </button>
                            <a href="javascript:void(0);" class="btn btn-default ml-10" @click="$router.back()">
                                <i class="iconfont">&#xe64f;</i>
                                <span>返回</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div style="height:50px;"></div>
                <div class="pad-30" id="ElementContent">
                    <input type="hidden" name="id" v-if="id" :value="id"/>
                    <!--page1-->
                    <div class="row pb-25">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <img :src="insInfo.logo"
                                 style="max-height:80px;max-width:200px;display: block;">
                        </div>
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <input type="hidden" name="ins_company_id" :value="insInfo.ins_company_id"/>
                            <input type="hidden" name="ins_user_id" :value="insInfo.ins_user_id"/>
                            <div class="row lh40">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="pull-left w30">机构名称</div>
                                    <div class="pull-left w70">
                                            <span contenteditable="true" data-placeholder="请输入机构名称"
                                                  data-name="institutionName"
                                                  v-text="insInfo.institutionName"></span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="pull-left w30">联系电话</div>
                                    <div class="pull-left w70">
                                            <span contenteditable="true" data-placeholder="请输入联系电话"
                                                  data-name="institutionPhone"
                                                  v-text="insInfo.institutionPhone"></span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="pull-left w30">负责顾问</div>
                                    <div class="pull-left w70">
                                            <span contenteditable="true" data-placeholder="请输入负责顾问" data-name="userName"
                                                  v-text="insInfo.userName"></span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="pull-left w30">联系微信</div>
                                    <div class="pull-left w70">
                                            <span contenteditable="true" data-placeholder="请输入联系微信" data-name="wechat"
                                                  v-text="insInfo.wechat"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--page2-->
                    <div>
                        <div class="font18 lh50">基本信息</div>
                        <div class="row lh40">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>学生姓名</span></div>
                                <div class="pull-left w70">
                                    <span contenteditable="true" data-placeholder="请选择学生学生" data-name="ins_student_name"
                                          data-toggle="modal"
                                          data-backdrop="static" data-target="#StudentComponent"
                                          v-text="studentInfo.ins_student_name"></span>
                                    <input type="hidden" name="ins_student_id" :value="studentInfo.ins_student_id"/>
                                    <StudentComponent @setStuden="setStuden"/>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>联系电话</span></div>
                                <div class="pull-left w70">
                                    <span contenteditable="true" data-placeholder="请输入联系电话"
                                          data-name="ins_student_phone"
                                          v-text="studentInfo.ins_student_phone"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>在读学校</span></div>
                                <div class="pull-left w70">
                                    <div contenteditable="true" data-placeholder="请输入在读学校"
                                         data-name="ins_student_school"
                                         v-text="studentInfo.ins_student_school"></div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>在读年级</span></div>
                                <div class="pull-left w70">
                                <span contenteditable="true" data-placeholder="请输入在读年级" data-name="ins_student_grade"
                                      v-text="studentInfo.ins_student_grade"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>当前专业</span></div>
                                <div class="pull-left w70">
                                <span contenteditable="true" data-placeholder="请输入当前专业" data-name="ins_student_major"
                                      v-text="studentInfo.ins_student_major"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>出国时间</span></div>
                                <div class="pull-left w70">
                                <span contenteditable="true" data-placeholder="请输入出国时间"
                                      data-name="ins_student_go_abroad_time"
                                      v-text="studentInfo.ins_student_go_abroad_time"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>GPA</span></div>
                                <div class="pull-left w70">
                                <span contenteditable="true" data-placeholder="请输入均分" data-name="ins_student_gpa"
                                      v-text="studentInfo.ins_student_gpa"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>语言成绩</span></div>
                                <div class="pull-left w70">
                                    <div class="pull-left w40">
                                        <select name="language_score_type" class="selectpicker" data-width="fit"
                                                style="display:inline-block;"
                                                v-model="studentInfo.language_score_type">
                                            <option value="">请选择</option>
                                            <option value="雅思">雅思</option>
                                            <option value="托福">托福</option>
                                            <option value="PTE">PTE</option>
                                            <option value="无">无</option>
                                        </select>
                                    </div>
                                    <div class="pull-left w60">
                                    <span contenteditable="true" data-placeholder="请输入语言成绩" data-name="language_score"
                                          v-text="studentInfo.language_score"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>学术成绩</span></div>
                                <div class="pull-left w70">
                                    <div class="pull-left w40">
                                        <select name="academic_score_type" class="selectpicker" data-width="fit"
                                                style="display:inline-block;"
                                                v-model="studentInfo.academic_score_type">
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
                                    <div class="pull-left w60">
                                        <span contenteditable="true" data-placeholder="请输入学术成绩"
                                              data-name="academic_score"
                                              v-text="studentInfo.academic_score"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>申请学位</span></div>
                                <div class="pull-left w70">
                                    <select name="ins_student_apply_degree" class="selectpicker" data-width="fit"
                                            v-model="studentInfo.ins_student_apply_degree"
                                            @change="setApplyType($event.target.value)">
                                        <option value="">请选择</option>
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
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>意向国家</span></div>
                                <div class="pull-left w70">
                                    <select name="ins_student_intention_country" class="selectpicker"
                                            data-width="fit"
                                            data-size="5"
                                            multiple
                                            data-live-search="true"
                                            v-model="studentInfo.ins_student_intention_country">
                                        <option :value="item.id" v-for="(item,i) in nation" :key="i">
                                            {{item.cn}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w30"><span>意向专业</span></div>
                                <div class="pull-left w70">
                                <span contenteditable="true" data-placeholder="请输入意向专业"
                                      data-name="ins_student_intention_major"
                                      v-text="studentInfo.ins_student_intention_major"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--page3-->
                    <div>
                        <div class="font18 lh50">推荐院校</div>
                        <div class="table-responsive" v-if="schoolInfoTable.length > 0">
                            <table class="table table-hover table-bordered table-condensed text-center">
                                <thead>
                                <tr>
                                    <th class="text-center w5"></th>
                                    <th class="text-center w10">国家</th>
                                    <th class="text-center w25">学校名称</th>
                                    <th class="text-center w25">专业名称</th>
                                    <th class="text-center">截止时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, i) in schoolInfoTable" :key="i">
                                    <td>{{item.ranking}} <input type="hidden" name="recommend_table[ranking][]"
                                                                :value="item.ranking"/></td>
                                    <td>{{item.country}}<input type="hidden" name="recommend_table[country][]"
                                                               :value="item.country"/></td>
                                    <td>
                                        <div class="lh18">{{item.school_en}}</div>
                                        <div class="lh18">{{item.school}}</div>
                                        <input type="hidden" name="recommend_table[school_en][]"
                                               :value="item.school_en"/>
                                        <input type="hidden" name="recommend_table[school][]" :value="item.school"/>
                                    </td>
                                    <td>
                                        <div class="lh18">{{item.major_en}}</div>
                                        <div class="lh18">{{item.major}}</div>
                                        <input type="hidden" name="recommend_table[major_en][]" :value="item.major_en"/>
                                        <input type="hidden" name="recommend_table[major][]" :value="item.major"/>
                                    </td>
                                    <td class="text-left">
                                        <input type="hidden" name="recommend_table[time_table][]"
                                               :value="item.time_table"/>
                                        <select class="form-control" name="recommend_table[time_select][]">
                                            <option :value="items" v-for="(items, k) in item.time_table" :key="k">
                                                {{items}}
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="button" class="btn btn-block btn-info" data-target="#schoolMajor"
                                @click="viewSchoolModal">
                            <i class="iconfont font22">&#xe73e;</i>
                            <span class="div_vm">添加学校及专业</span>
                        </button>
                    </div>

                    <!--page4-->

                    <div class="font18 lh50">院校及专业详情</div>

                    <div class="schoolMajor" v-for="(item,i) in schoolInfo" :key="i">
                        <a href="javascript:void(0);" class="btn-delete"
                           @click="schoolInfo.splice(i,1);schoolInfoTable.splice(i,1)"><i
                                class="iconfont">&#xe656;</i></a>
                        <input type="hidden" name="recommend[type][]" :value="item.type"/>
                        <input type="hidden" name="recommend[unq_id][]" :value="item.unq_id"/>
                        <div contenteditable="true" data-placeholder="请输入大学名称" data-name="recommend[schoolname][]"
                             class="lh40 font18"
                             v-text="item.schoolname"></div>
                        <div class="SchoolTitle"><span>基本信息</span></div>
                        <div class="row lh40">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">成立年份</div>
                                <div class="pull-left w65">
                                        <span contenteditable="true" data-placeholder="请输入成立年份"
                                              data-name="recommend[year][]"
                                              v-text="item.year"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">学校形式</div>
                                <div class="pull-left w65">
                                        <span contenteditable="true" data-placeholder="请输入学校形式"
                                              data-name="recommend[typech][]"
                                              v-text="item.typech"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">学制</div>
                                <div class="pull-left w65">
                                        <span contenteditable="true" data-placeholder="请输入学制"
                                              data-name="recommend[systemch][]" v-text="item.systemch"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">录取率</div>
                                <div class="pull-left w65">
                                        <span contenteditable="true" data-placeholder="请输入录取率"
                                              data-name="recommend[acceptancerate][]"
                                              v-text="item.acceptancerate"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">师生比</div>
                                <div class="pull-left w65">
                                        <span contenteditable="true" data-placeholder="请输入师生比"
                                              data-name="recommend[tsscale][]"
                                              v-text="item.tsscale"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">学生人数</div>
                                <div class="pull-left w65">
                                        <span contenteditable="true" data-placeholder="请输入学生人数"
                                              data-name="recommend[stdnum][]"
                                              v-text="item.stdnum"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">国际生比率</div>
                                <div class="pull-left w65">
                                        <span contenteditable="true" data-placeholder="请输入国际生比率"
                                              data-name="recommend[stdscale][]"
                                              v-text="item.stdscale"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">毕业率</div>
                                <div class="pull-left w65">
                                        <span contenteditable="true" data-placeholder="请输入毕业率"
                                              data-name="recommend[graduationrate][]"
                                              v-text="item.graduationrate"></span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div class="pull-left w35">就业率</div>
                                <div class="pull-left w65">
                                        <span contenteditable="true" data-placeholder="请输入就业率"
                                              data-name="recommend[empolymentrate][]"
                                              v-text="item.empolymentrate"></span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <span>学校概述</span>
                                <div contenteditable="true" data-placeholder="请输入学校概述"
                                     data-name="recommend[introduction][]" v-text="item.introduction"
                                     class="lh20"></div>
                            </div>
                        </div>
                        <div class="SchoolTitle">
                        <span contenteditable="true" data-placeholder="请输入" data-name="recommend[majoren][]"
                              v-text="item.majoren" class="font16"></span>
                            <div contenteditable="true" data-placeholder="请输入" data-name="recommend[majorch][]"
                                 v-text="item.majorch"
                                 style="display:inline-block;font-size:16px;margin-left: 5px;"></div>
                        </div>
                        <div class="row lh40">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">所属学院</div>
                                <div class="pull-left w90">
                                        <span contenteditable="true" data-placeholder="请输入所属学院"
                                              data-name="recommend[college_en][]" v-text="item.college_en"></span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">毕业学位</div>
                                <div class="pull-left w90">
                                        <span contenteditable="true" data-placeholder="请输入毕业学位"
                                              data-name="recommend[degree][]"
                                              v-text="item.degree"></span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">申请要求</div>
                                <div class="pull-left w90">
                                        <span contenteditable="true"
                                              data-placeholder="请输入申请要求,雅思6.5 托福 6.2 雅思6.5 托福 6.2 雅思6.5 托福 6.2"
                                              data-name="recommend[applyReq][]" v-text="item.applyReq"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="blk20"></div>
                    <button type="button" class="btn btn-block btn-info" data-target="#schoolMajor"
                            @click="viewSchoolModal">
                        <i class="iconfont font22">&#xe73e;</i>
                        <span class="div_vm">添加学校及专业</span>
                    </button>

                    <SchoolOrMajorComponent :applyType="applyType" :btnHide="true" ref="schoolMajor"
                                            @getmajorinfo="getmajorinfo"></SchoolOrMajorComponent>

                    <!--自定义-->
                    <div class="schoolMajorCustom" v-for="(item, i) in customObject" :key="i">
                        <a href="javascript:void(0);" class="btn-delete" @click="customObject.splice(i, 1)"><i
                                class="iconfont">&#xe656;</i></a>
                        <div contenteditable="true" data-placeholder="请输入大学名称" data-name="custom[school_cn][]"
                             class="lh40 font18"
                             v-text="item.school_cn"></div>
                        <div class="SchoolTitle"><span>基本信息</span></div>
                        <div class="row lh40">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">学校概述</div>
                                <div class="pull-left w90">
                                    <div contenteditable="true" data-placeholder="请输入学校概述"
                                         data-name="custom[school_content][]" v-text="item.school_content"
                                         class="lh20"></div>
                                </div>
                            </div>
                        </div>
                        <div class="SchoolTitle">
                        <span contenteditable="true" data-placeholder="请输入专业英文名" data-name="custom[major_cn][]"
                              v-text="item.major_cn" class="font16"></span>
                            <div contenteditable="true" data-placeholder="请输入专业中文名" data-name="custom[major_en][]"
                                 v-text="item.major_en"
                                 style="display:inline-block;font-size:16px;margin-left: 5px;"></div>
                        </div>
                        <div class="row lh40">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">专业概述</div>
                                <div class="pull-left w90">
                                        <span contenteditable="true"
                                              data-placeholder="请输入专业概述"
                                              data-name="custom[major_content][]" v-text="item.major_content"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row lh40">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">申请要求</div>
                                <div class="pull-left w90">
                                        <span contenteditable="true"
                                              data-placeholder="请输入申请要求,雅思6.5 托福 6.2 雅思6.5 托福 6.2 雅思6.5 托福 6.2"
                                              data-name="custom[apply_req][]" v-text="item.apply_req"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row lh40" v-for="(items, k) in item.custom" :key="k">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="pull-left w10">
                                        <span contenteditable="true" data-placeholder="请输入字段名"
                                              data-name="custom[custom][field_name][]" v-text="items.field_name"></span>
                                </div>
                                <div class="pull-left w90">
                                        <span contenteditable="true" data-placeholder="请输入字段内容"
                                              data-name="custom[custom][field_value][]"
                                              v-text="items.field_value"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--page5-->

                    <div class="font18 lh50">能力考评</div>

                    <div class="elementWrap" v-for="(item,i) in Evaluation" :key="i" style="padding:0">
                        <a href="javascript:void(0);" class="btn-delete" @click="Evaluation.splice(i, 1)"><i
                                class="iconfont">&#xe656;</i></a>
                        <div class="row lh40">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                            <span contenteditable="true" data-placeholder="请填写考评标题"
                                  data-name="Evaluation[assessTitle][]"
                                  v-text="item.assessTitle"></span>
                            </div>
                            <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                            <span contenteditable="true" data-placeholder="请填写考评内容"
                                  data-name="Evaluation[assessContent][]" v-text="item.assessContent"
                                  class="lh20"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="blk20"></div>
                        <EvaluationComponent @evaluaCallbacks="evaluaCallbacks"></EvaluationComponent>
                    </div>

                    <!--page6-->
                    <div class="font18 lh50">时间规划</div>
                    <div class="elementWrap" v-for="(item,i) in planTime" :key="i" style="padding:0;">
                        <a href="javascript:void(0);" class="btn-delete" @click="planTime.splice(i, 1)"><i
                                class="iconfont">&#xe656;</i></a>
                        <div class="row lh40">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <span contenteditable="true" data-placeholder="请输入时间规划" data-name="planTime[time][]"
                                      class="times1" v-text="item.time"></span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <span contenteditable="true" data-placeholder="请输入规划详情" data-name="planTime[planContent][]"
                                  v-text="item.planContent"></span>
                            </div>
                        </div>
                    </div>
                    <div class="blk20"></div>
                    <button type="button" class="btn btn-block" data-backdrop="static" data-target="addBtn"
                            @click="addPlanTime">
                        <i class="iconfont font22">&#xe73e;</i>
                        <span class="div_vm">添加时间规划</span>
                    </button>

                    <!--page7-->

                    <div class="font18 lh50">费用预算</div>

                    <div class="elementWrap" v-for="(item,i) in budget" :key="i" style="padding:0;">
                        <a href="javascript:void(0);" class="btn-delete" @click="budget.splice(i, 1)"><i
                                class="iconfont">&#xe656;</i></a>
                        <div class="row lh40">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <span contenteditable="true" data-placeholder="请输入费用名称" data-name="budget[item][]"
                                  v-text="item.item"></span>
                            </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <span contenteditable="true" data-placeholder="请输入费用金额" data-name="budget[price][]"
                                  v-text="item.price"></span>
                            </div>
                        </div>
                    </div>
                    <div class="blk20"></div>
                    <BudgetComponent @budgetCallbacks="budgetCallbacks"/>
                </div>
                <!--添加自定义学校-->
                <div class="modal fade" id="addCustom">
                    <div class="modal-dialog">
                        <div class="modal-content" style="width:650px;padding-right:20px;">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;
                                </button>
                                <h4 class="modal-title">添加自定义学校</h4>
                            </div>
                            <div class="modal-body">
                                <form action="" method="POST" id="addCustomForm" class="form-horizontal">
                                    <div class="row mb-15">
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label">学校英文名</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" name="school_cn"
                                                           placeholder="请输入学校英文名">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label">学校中文名</label>
                                                <div class="col-sm-8">
                                                    <input type="text" name="school_en" class="form-control"
                                                           placeholder="请输入学校中文名">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-15">
                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">学校概述</label>
                                                <div class="col-sm-10">
                                                    <input type="text" name="school_content" class="form-control"
                                                           placeholder="请输入学校概述，帮助学生更好的了解学校">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-15">
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label">专业英文名</label>
                                                <div class="col-sm-8">
                                                    <input type="text" name="major_en" class="form-control"
                                                           placeholder="请输入专业英文名">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label">专业中文名</label>
                                                <div class="col-sm-8">
                                                    <input type="text" name="major_cn" class="form-control"
                                                           placeholder="请输入专业中文名">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-15">
                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">专业概述</label>
                                                <div class="col-sm-10">
                                                    <input type="text" name="major_content" class="form-control"
                                                           placeholder="请输入专业概述">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-15">
                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">申请要求</label>
                                                <div class="col-sm-10">
                                                    <input type="text" name="apply_req" class="form-control"
                                                           placeholder="请输入申请要求，如雅思6分，SAT1030">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-15 customField" v-for="(item,i) in customField" :key="i">
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                            <input type="text" class="form-control"
                                                   :name="'custom['+i+'][\'field_name\']'"
                                                   placeholder="字段名"
                                                   style="width: 100%;">
                                        </div>
                                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                            <input type="text" class="form-control"
                                                   :name="'custom['+i+'][\'field_value\']'"
                                                   placeholder="字段内容"
                                                   style="width: 100%;">
                                        </div>
                                    </div>

                                    <a href="javascript:void(0);" @click="addCustomField">
                                        <i class="iconfont cded">&#xe619;</i>
                                        <span>自定义字段</span>
                                    </a>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="saveCustom">保存</button>
                                <button type="button" class="btn btn-default ml-20" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="modal_loading">
                    <div class="modal-dialog">
                        <div class="modal-content text-center" style="width:260px;margin:0 auto;">
                            <div class="modal-body">
                                <img src="../../../../static/images/loading.gif" alt="">
                                <span>请稍后，正在处理下载文件</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import nation from '@@/json/nation.json'
import SchoolOrMajorComponent from '@/components/functions/plan/SchoolOrMajorComponent'
import EvaluationComponent from '@/components/functions/plan/EvaluationComponent'
import BudgetComponent from '@/components/functions/plan/BudgetComponent'
import StudentComponent from '@/components/functions/plan/StudentComponent'
import store from '@/vuex/Store'
import db from '@~/js/request'

export default {
  name: 'Edit',
  store,
  data () {
    return {
      nation: nation,
      defaultVal: '',
      id: '',
      sid: '',
      loading: true,
      applyType: -1,
      insInfo: {
        logo: '',
        ins_company_id: '',
        ins_user_id: '',
        institutionName: '',
        institutionPhone: '',
        userName: '',
        wechat: ''
      },
      studentInfo: {
        ins_student_id: '',
        ins_student_name: '',
        ins_student_phone: '',
        ins_student_school: '',
        ins_student_grade: '',
        ins_student_major: '',
        ins_student_go_abroad_time: '',
        ins_student_gpa: '',
        language_score: '',
        academic_score: '',
        ins_student_intention_major: '',
        language_score_type: '',
        academic_score_type: '',
        ins_student_apply_degree: '',
        ins_student_intention_country: []
      },
      schoolInfoTable: [], // 推荐学校
      schoolInfo: [], // 学校及专业
      Evaluation: [], // 能力考评
      planTime: [], // 时间规划
      budget: [], // 费用预算
      customField: [],
      customObject: []
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
    self.sid = self.$route.query.sid || ''
    self.$nextTick(() => {
      if (self.id !== '') {
        self.getInfo()
      } else {
        // 获取机构信息
        let params = new URLSearchParams()
        params.append('sid', self.sid)
        self.loading = true
        db.getRequest('Institution/Plan/getCompanyInfo', params).then(res => {
          if (res.status === 1) {
            self.insInfo = res.data.company
            if (res.data.student !== null) {
              self.studentInfo = res.data.student
              self.setApplyType(res.data.student.ins_student_apply_degree)
            }
          } else {
            console.log(res.msg)
          }
          self.loading = false
        })
      }

      setTimeout(function () {
        $('.selectpicker').selectpicker()
        self.setShowTime()

        $('.fullRightContent').scroll(function () {
          $('.header-wrap').css({top: $(this).scrollTop()})
        })

        $('[contenteditable="true"]').focusin(function () {
          let val = $(this).text()
          self.defaultVal = val
        })
        $('[contenteditable="true"]').focusout(function () {
          let val = $(this).text()
          if (self.defaultVal !== val && self.id) {
            self.submitSave('focusout')
          }
        })
      }, 3000)
    })
  },
  methods: {
    // 编辑时获取信息
    getInfo () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.id)
      self.loading = true
      db.getRequest('Institution/Plan/planDetail', params).then(res => {
        if (res.status === 1) {
          self.insInfo = res.data.company
          self.studentInfo = res.data.student
          self.schoolInfoTable = res.data.recommend_table
          self.schoolInfo = res.data.recommend
          self.Evaluation = res.data.Evaluation
          self.planTime = res.data.PlanTime
          self.budget = res.data.budget
          self.customObject = res.data.recommend_custom
          self.setApplyType(res.data.student.ins_student_apply_degree)
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
        self.loading = false
      })
    },
    // 添加时间规划
    addPlanTime () {
      let self = this
      self.planTime.push({time: '', planContent: ''})
      setTimeout(function () {
        self.setShowTime()
      }, 200)
    },
    delPlanTime (event, index) {
      event.path[2].remove()
      // self.planTime.splice(index, 1)
    },
    // 删除院校及专业
    schoolDelete (id) {
      let self = this
      for (let i = 0; i < self.schoolInfo.length; i++) {
        if (self.schoolInfo[i]['unq_id'] === id) {
          self.schoolInfo.splice(i, 1)
        }
      }
    },
    // 删除考评
    EvaluationDelete (id) {
      let self = this
      for (let i = 0; i < self.Evaluation.length; i++) {
        if (self.Evaluation[i]['id'] === id) {
          self.Evaluation.splice(i, 1)
        }
      }
    },
    // 删除费用预算
    delBudget (id) {
      let self = this
      for (let i = 0; i < self.budget.length; i++) {
        if (self.budget[i]['id'] === id) {
          self.budget.splice(i, 1)
        }
      }
    },
    // 设置显示日期插件
    setShowTime () {
      let self = this
      $('.times').each(function (index, element) {
        self.laydate.render({
          elem: element,
          type: 'date'
        })
      })
      $('.times1').each(function (index, element) {
        self.laydate.render({
          elem: element,
          type: 'date',
          range: true
        })
      })
    },
    // 提交保存
    submitSave (state) {
      let self = this
      let params = new URLSearchParams()
      $('#ElementContent [contenteditable="true"]').each(function () {
        params.append($(this).attr('data-name'), $(this).text())
      })
      $('#ElementContent input[type="hidden"]').each(function () {
        params.append($(this).attr('name'), $(this).val())
      })
      $('#ElementContent select.selectpicker').each(function () {
        if ($(this).attr('name') === 'ins_student_intention_country') {
          params.append('ins_student_intention_country', $(this).val())
        } else {
          params.append($(this).attr('name'), $(this).find('option:selected').val())
        }
      })

      $('[name="recommend_table[time_select][]"]').each(function () {
        params.append('recommend_table[time_select][]', $(this).val())
      })
      db.postRequest('/Institution/Plan/planEdit', params).then(res => {
        if (res.status === 1) {
          if (self.id === '') {
            self.layer.alert('保存成功', {icon: 1}, function (i) {
              self.layer.close(i)
              self.$router.push('/functions/plan/view?id=' + res.data)
            })
          } else {
            if (state !== 'focusout') {
              self.layer.alert('保存成功', {icon: 1}, function (i) {
                self.layer.close(i)
                self.$router.push('/functions/plan/view?id=' + self.id)
              })
            }
          }
        } else {
          self.layer.alert(res.msg, {
            shadeClose: false
          })
        }
      })
    },
    // 返回学校及专业信息
    getmajorinfo (obj) {
      if (obj.recommend[0].type === '') {
        $('#addCustom').modal('show')
      } else {
        this.schoolInfo.push.apply(this.schoolInfo, obj.recommend)
        this.schoolInfoTable.push.apply(this.schoolInfoTable, obj.recommend_table)
      }
    },
    // 费用预算回调
    budgetCallbacks (obj) {
      let self = this
      /* for (let i = 0; i < self.budget.length; i++) {
                  if (self.budget[i]['id'] === obj.id) {
                    return false
                  }
                } */
      self.budget.push(obj)
    },
    // 考评内容回调
    evaluaCallbacks (obj) {
      let self = this
      /* for (let i = 0; i < self.Evaluation.length; i++) {
                  if (self.Evaluation[i]['id'] === obj.id && obj.number !== '') {
                    return false
                  }
                } */
      self.Evaluation.push({
        assessId: obj.id,
        assessNumber: obj.number,
        assessTitle: obj.title,
        assessContent: obj.content
      })
    },
    sortUp (i, t) {
      let self = this
      // 学校专业
      if (t === 1) {
        let arr = self.schoolInfo[i]
        self.schoolInfo.splice(i, 1)
        self.schoolInfo.splice(i - 1, 0, arr)
        $('.addSchoolInfoList').each(function (index, element) {
          $(this).find('textarea')[0].value = self.schoolInfo[index]['introduction']
          $(this).find('textarea')[1].value = self.schoolInfo[index]['majorintro']
          $(this).find('textarea')[2].value = self.schoolInfo[index]['applyReq']
        })
      }
      // 考评
      if (t === 2) {
        let arr = self.Evaluation[i]
        self.Evaluation.splice(i, 1)
        self.Evaluation.splice(i - 1, 0, arr)
        $('.EvaluationList textarea').each(function (index, element) {
          $(this).val(self.Evaluation[index]['content'])
        })
      }
    },
    sortDown (i, t) {
      let self = this
      if (t === 1) {
        let arr = self.schoolInfo[i]
        self.schoolInfo.splice(i, 1)
        self.schoolInfo.splice(i + 1, 0, arr)
        $('.addSchoolInfoList').each(function (index, element) {
          $(this).find('textarea')[0].value = self.schoolInfo[index]['introduction']
          $(this).find('textarea')[1].value = self.schoolInfo[index]['majorintro']
          $(this).find('textarea')[2].value = self.schoolInfo[index]['applyReq']
        })
      }
      if (t === 2) {
        let arr = self.Evaluation[i]
        self.Evaluation.splice(i, 1)
        self.Evaluation.splice(i + 1, 0, arr)
        $('.EvaluationList textarea').each(function (index, element) {
          $(this).val(self.Evaluation[index]['content'])
        })
      }
    },
    // 回调学生档案
    setStuden (obj) {
      this.studentInfo.ins_student_id = obj.id
      this.studentInfo['ins_student_name'] = obj.name
      this.studentInfo.ins_student_phone = obj.phone
    },
    // 自定义字段
    addCustomField () {
      this.customField.push($('.customField').length)
    },
    // 保存自定义学校
    saveCustom () {
      let self = this
      let obj = {custom: []}
      let arr = []
      let arr2 = []
      let formData = $('#addCustomForm').serializeArray()
      formData.map(item => {
        if ((item.name).indexOf('field_name') >= 0 || (item.name).indexOf('field_value') >= 0) {
          if ((item.name).indexOf('field_name') >= 0) {
            arr.push(item.value)
          }
          if ((item.name).indexOf('field_value') >= 0) {
            arr2.push(item.value)
          }
        } else {
          obj[item.name] = item.value
        }
      })
      arr.map((item, i) => {
        obj['custom'].push({field_name: item, field_value: arr2[i]})
      })
      self.customObject.push(obj)
      self.customField = []
      $('#addCustom').modal('hide')
    },
    // 判断申请学位
    setApplyType (event) {
      let self = this
      if (event === '本科' || event === '本科预科' || event === '本硕连读') {
        self.applyType = 1
      } else if (event === '硕士' || event === '硕士预科' || event === '硕博连读') {
        self.applyType = 2
      } else {
        self.applyType = 0
      }
      self.schoolInfo = []
      self.schoolInfoTable = []
    },
    // 弹出学校与专业窗口
    viewSchoolModal () {
      let self = this
      if (self.applyType === -1) {
        self.layer.alert('请选择申请学位', {icon: 2})
        return false
      }
      if (self.applyType === 1 || self.applyType === 2) {
        $('#schoolMajor').modal('show')
      }
      if (self.applyType === 0) {
        self.$refs.schoolMajor.customData()
      }
    }
  },
  components: {
    EvaluationComponent, SchoolOrMajorComponent, BudgetComponent, StudentComponent
  }
}
</script>
<style lang="scss">
    #editplan{
        position:relative;margin:-25px -15px;

        & #ElementContent{box-shadow:0 0 3px #ddd;}

        .bootstrap-select{
            vertical-align:middle;line-height:initial;margin-top:-3px;

            & > .dropdown-toggle{
                border-color:#fff !important;background-color:#fff !important;max-width:120px;padding:0;

                &:focus{outline:none !important;}
            }
        }

        .filter-option-inner-inner{word-break:break-all; word-wrap:break-word;white-space:initial;}

        [data-target="#schoolMajor"],
        [data-target="#AddEvaluation"],
        [data-target="#BudgetComponent"],
        [data-target="addBtn"]{
            padding:0;height:34px;line-height:34px;border:1px dashed #dedede;background-color:transparent;

            & i{color:#999;font-size:18px;}

            & span{color:#999;font-size:14px;}
        }

        & .editplanWrap{
            width:820px;margin:0 auto;background:#fff;
        }

        .header-wrap{
            width:100%;height:50px;position:absolute;z-index:10;padding-bottom:10px;left:0;top:0;

            & .header-title{
                height:22px;line-height:22px;position:absolute;padding-left:15px;font-size:18px;font-weight:bold;margin:9px 0;

                &:after{
                    content:'';width:3px;height:22px;display:block;position:absolute;left:0;top:0;background:#428bca;
                }
            }
        }

        & .SchoolTitle{
            line-height:50px;clear:both;padding:15px 0;

            & span{
                font-size:16px;line-height:20px;display:inline-block;position:relative;padding-left:15px;

                &:before{content:'';width:3px;height:20px;display:block;background:#428bca;position:absolute;left:0;top:0;}
            }
        }

        .schoolMajor, .schoolMajorCustom, .elementWrap{
            border-width:1px;border-style:dashed;border-color:#fff;padding:15px 10px;position:relative;

            &:hover{
                border-color:#428bca;

                & > a{display:block;}
            }

            & > a{
                width:30px;height:30px;display:none;position:absolute;top:4px;background:#428bca;text-align:center;line-height:30px;color:#fff;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;cursor:pointer;z-index:20;

                &.btn-delete{right:4px;}
            }

            & .w10{width:12%;}

            & .w90{width:88%;}
        }
    }
</style>
