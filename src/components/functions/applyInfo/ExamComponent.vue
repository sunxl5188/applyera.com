<template>
    <div>
        <div v-if="!loading">
            <div class="clearfix pb-30">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="headerTitle">申请资料</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 form-inline text-right">
                        <div class="form-group ml-10">
                            <button type="button" class="btn btn-default" @click="$router.back()"><i class="iconfont">&#xe64f;</i>
                                返回
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <HeaderNav :id="id" :tabStatus="tabStatus"></HeaderNav>
            <form id="ExamForm" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>学生有语言成绩(雅思/托福)</label>
                            <span class="checkbox" style="display: inline-block;">
                              <label>
                                  <input type="checkbox" name="is_language_score" data-obj="exam" data-name="is_language_score" value="1"
                                         v-model="exam.is_language_score"> &nbsp;
                              </label>
                          </span>
                            <div class="pt-15" v-if="exam.is_language_score">
                                <!--托福-->
                                <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>考试类别</label>
                                            <select name="language_score[type]" class="form-control selectpicker"
                                                    v-model.number="exam.language_score['type']">
                                                <option value="1">托福</option>
                                                <option value="2">雅思</option>
                                                <option value="3">PTE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>考试时间</label>
                                            <input type="text" name="language_score[exam_time]"
                                                   data-name="language_score|exam_time" class="form-control times"
                                                   placeholder="请选择考试时间" v-validate="'required'" data-vv-as="时间"
                                                   v-model="exam.language_score['exam_time']">
                                            <div class="validateTip" v-show="errors.has('language_score[exam_time]')">
                                                {{ errors.first("language_score[exam_time]") }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="form-group">
                                            <label>总分</label>
                                            <input type="text" name="language_score[total_score]" class="form-control"
                                                   placeholder="请输入成绩满分120分"
                                                   v-validate={required:true,regex:/^120$|(^[1-9][0-9])$|^([1-9]){1}$|^[1][0-1][0-9]{1}$/}
                                                   data-vv-as="总分" v-if="languageScore===1"
                                                   v-model="exam.language_score['total_score']">
                                            <input type="text" name="language_score[total_score]" class="form-control"
                                                   placeholder="请输入成绩，满分9分"
                                                   v-validate={required:true,regex:/^([1-9]){1}$|^([1-9].[1-9])$/}
                                                   data-vv-as="总分" v-if="languageScore===2"
                                                   v-model="exam.language_score['total_score']">
                                            <input type="text" name="toefl[total_score]" class="form-control"
                                                   placeholder="请输入成绩,满分90分"
                                                   v-validate={required:true,regex:/^90$|^[1-8][0-9]$|^[1-9]$/}
                                                   data-vv-as="总分" v-if="languageScore===3"
                                                   v-model="exam.language_score['total_score']">
                                            <div class="validateTip" v-show="errors.has('language_score[total_score]')">
                                                {{ errors.first("language_score[total_score]") }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div class="form-group">
                                                    <label>听</label>
                                                    <input type="text" name="language_score[listen]" class="form-control"
                                                           placeholder="请输入分数，满分30分"
                                                           v-validate="{required:true,regex:/^30$|(^[1-2][0-9])$|^([1-9]){1}$/}"
                                                           data-vv-as="听" v-if="languageScore ===1"
                                                           v-model="exam.language_score['listen']">
                                                    <input type="text" name="toefl[listen]" class="form-control"
                                                           placeholder="请输入成绩，满分9分"
                                                           v-validate="{required:true,regex:/^([1-9]){1}$|^([1-9].[1-9])$/}"
                                                           data-vv-as="听" v-if="languageScore ===2"
                                                           v-model="exam.language_score['listen']">
                                                    <input type="text" name="toefl[listen]" class="form-control"
                                                           placeholder="请输入成绩,满分90分"
                                                           v-validate="{required:true,regex:/^90$|^[1-8][0-9]$|^[1-9]$/}"
                                                           data-vv-as="听" v-if="languageScore ===3"
                                                           v-model="exam.language_score['listen']">
                                                    <div class="validateTip" v-show="errors.has('language_score[listen]')">
                                                        {{ errors.first("language_score[listen]") }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div class="form-group">
                                                    <label>说</label>
                                                    <input type="text" name="language_score[speak]" class="form-control"
                                                           placeholder="请输入分数，满分30分"
                                                           v-validate="{required:true,regex:/^30$|(^[1-2][0-9])$|^([1-9]){1}$/}"
                                                           data-vv-as="说" v-if="languageScore===1"
                                                           v-model="exam.language_score['speak']">
                                                    <input type="text" name="toefl[speak]" class="form-control"
                                                           placeholder="请输入成绩，满分9分"
                                                           v-validate="{required:true,regex:/^([1-9]){1}$|^([1-9].[1-9])$/}"
                                                           data-vv-as="说" v-if="languageScore===2"
                                                           v-model="exam.language_score['speak']">
                                                    <input type="text" name="toefl[speak]" class="form-control"
                                                           placeholder="请输入成绩,满分90分"
                                                           v-validate="{required:true,regex:/^90$|^[1-8][0-9]$|^[1-9]$/}"
                                                           data-vv-as="说" v-if="languageScore===3"
                                                           v-model="exam.language_score['speak']">
                                                    <div class="validateTip" v-show="errors.has('language_score[speak]')">
                                                        {{ errors.first("language_score[speak]") }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div class="form-group">
                                                    <label>读</label>
                                                    <input type="text" name="language_score[read]" class="form-control"
                                                           placeholder="请输入分数，满分30分"
                                                           v-validate="{required:true,regex:/^30$|(^[1-2][0-9])$|^([1-9]){1}$/}"
                                                           data-vv-as="读" v-if="languageScore===1"
                                                           v-model="exam.language_score['read']">
                                                    <input type="text" name="toefl[read]" class="form-control"
                                                           placeholder="请输入成绩，满分9分"
                                                           v-validate="{required:true,regex:/^([1-9]){1}$|^([1-9].[1-9])$/}"
                                                           data-vv-as="读" v-if="languageScore===2"
                                                           v-model="exam.language_score['read']">
                                                    <input type="text" name="toefl[read]" class="form-control"
                                                           placeholder="请输入成绩,满分90分"
                                                           v-validate="{required:true,regex:/^90$|^[1-8][0-9]$|^[1-9]$/}"
                                                           data-vv-as="读" v-if="languageScore===3"
                                                           v-model="exam.language_score['read']">
                                                    <div class="validateTip" v-show="errors.has('language_score[read]')">
                                                        {{ errors.first("language_score[read]") }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <div class="form-group">
                                                    <label>写</label>
                                                    <input type="text" name="language_score[write]" class="form-control"
                                                           placeholder="请输入分数，满分30分"
                                                           v-validate="{required:true,regex:/^30$|(^[1-2][0-9])$|^([1-9]){1}$/}"
                                                           data-vv-as="写" v-if="languageScore===1"
                                                           v-model="exam.language_score['write']">
                                                    <input type="text" name="toefl[write]" class="form-control"
                                                           placeholder="请输入成绩，满分9分"
                                                           v-validate="{required:true,regex:/^([1-9]){1}$|^([1-9].[1-9])$/}"
                                                           data-vv-as="写" v-if="languageScore===2"
                                                           v-model="exam.language_score['write']">
                                                    <input type="text" name="toefl[write]" class="form-control"
                                                           placeholder="请输入成绩,满分90分"
                                                           v-validate="{required:true,regex:/^90$|^[1-8][0-9]$|^[1-9]$/}"
                                                           data-vv-as="写" v-if="languageScore===3"
                                                           v-model="exam.language_score['write']">
                                                    <div class="validateTip" v-show="errors.has('language_score[write]')">
                                                        {{ errors.first("language_score[write]") }}
                                                    </div>
                                                </div>
                                            </div>
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
                            <label>学生有学术成绩(GRE/GMAT/SAT/ACT/A-Level/O-Level等)</label>
                            <span class="checkbox" style="display: inline-block;margin-left: 20px;">
                              <label>
                                  <input type="checkbox" name="is_academic_score" data-obj="exam" data-name="is_academic_score" v-model="exam.is_academic_score"
                                         @change="showTimeD"> &nbsp;
                              </label>
                          </span>

                            <div class="pt-15" v-if="exam.is_academic_score">
                                <!--GRE-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.gre" :key="'gre'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label><a href="javascript:void(0);" class="cded ml-15"
                                                                      @click="delElement('gre',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder="" value="GRE"
                                                       readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'gre[exam_time]['+i+']'"
                                                       :data-name="'gre|exam_time|'+i"
                                                       class="form-control times"
                                                       placeholder="请选择考试时间" v-validate="'required|date_format:yyyy-MM-dd'"
                                                       data-vv-as="考试时间" v-model="item.exam_time">
                                                <div class="validateTip" v-show="errors.has('gre[exam_time]['+i+']')">
                                                    {{ errors.first("gre[exam_time]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>总分</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre[total_score]['+i+']'"
                                                               class="form-control"
                                                               placeholder="请输入成绩满分340"
                                                               v-validate="{required:true,regex:/^340$|^([1-3][0-3][0-9])$|^([1-2][0-9][0-9])$|^([1-9][0-9])$|^[1-9]$/}"
                                                               data-vv-as="总分" v-model="item.total_score">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gre[total_score]['+i+']')">
                                                            {{ errors.first("gre[total_score]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre[total_score_percent]['+i+']'"
                                                               class="form-control"
                                                               placeholder="请输入百分比" v-validate="'required|max_value:100'"
                                                               data-vv-as="百分比" v-model="item.total_score_percent">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gre[total_score_percent]['+i+']')">
                                                            {{ errors.first("gre[total_score_percent]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Verbal</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre[verbal]['+i+']'" class="form-control"
                                                               placeholder="请输入成绩满分170"
                                                               v-validate="'required|max_value:170'"
                                                               data-vv-as="满分" v-model="item.verbal">
                                                        <div class="validateTip" v-show="errors.has('gre[verbal]['+i+']')">
                                                            {{ errors.first("gre[verbal]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre[verbal_percent]['+i+']'"
                                                               class="form-control"
                                                               placeholder="请输入百分比" v-validate="'required|max_value:100'"
                                                               data-vv-as="百分比" v-model="item.verbal_percent">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gre[verbal_percent]['+i+']')">
                                                            {{ errors.first("gre[verbal_percent]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Quantitative</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre[quantitative]['+i+']'"
                                                               class="form-control"
                                                               placeholder="请输入成绩满分170"
                                                               v-validate="'required|max_value:170'"
                                                               data-vv-as="成绩" v-model="item.quantitative">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gre[quantitative]['+i+']')">
                                                            {{ errors.first("gre[quantitative]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre[quantitative_percent]['+i+']'"
                                                               class="form-control" placeholder="请输入百分比"
                                                               v-validate="'required|max_value:100'" data-vv-as="百分比"
                                                               v-model="item.quantitative_percent">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gre[quantitative_percent]['+i+']')">
                                                            {{ errors.first("gre[quantitative_percent]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Analytical Writing</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre[analytical_writing]['+i+']'"
                                                               class="form-control" placeholder="请输入成绩满分6"
                                                               v-validate="'required|max_value:6'"
                                                               data-vv-as="成绩" v-model="item.analytical_writing">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gre[analytical_writing]['+i+']')">
                                                            {{ errors.first("gre[analytical_writing]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre[analytical_writing_percent]['+i+']'"
                                                               class="form-control" placeholder="请输入百分比"
                                                               v-validate="'required|max_value:100'" data-vv-as="百分比"
                                                               v-model="item.analytical_writing_percent">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gre[analytical_writing_percent]['+i+']')">
                                                            {{ errors.first("gre[analytical_writing_percent]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--GRE Subject-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.gre_subject" :key="'gresb'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label><a href="javascript:void(0);" class="cded ml-15"
                                                                      @click="delElement('gre_subject',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="GRE Subject" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试科目</label>
                                                <input type="text" :name="'gre_subject[exam_subject]['+i+']'"
                                                       class="form-control"
                                                       placeholder="请用英文输入考试科目" v-validate="'required|ens'"
                                                       data-vv-as="考试科目" v-model="item.exam_subject">
                                                <div class="validateTip"
                                                     v-show="errors.has('gre_subject[exam_subject]['+i+']')">
                                                    {{ errors.first("gre_subject[exam_subject]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>注册ID</label>
                                                <input type="text" :name="'gre_subject[register_id]['+i+']'"
                                                       class="form-control"
                                                       placeholder="请输入您的注册ID" v-validate="'required|alpha_num'"
                                                       data-vv-as="注册ID" v-model="item.register_id">
                                                <div class="validateTip"
                                                     v-show="errors.has('gre_subject[register_id]['+i+']')">
                                                    {{ errors.first("gre_subject[register_id]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'gre_subject[exam_time]['+i+']'"
                                                       :data-name="'gre_subject|exam_time|'+i"
                                                       class="form-control times"
                                                       placeholder="请选择考试时间" v-validate="'required|date_format:yyyy-MM-dd'"
                                                       data-vv-as="考试时间" v-model="item.exam_time">
                                                <div class="validateTip"
                                                     v-show="errors.has('gre_subject[exam_time]['+i+']')">
                                                    {{ errors.first("gre_subject[exam_time]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                            <div class="form-group">
                                                <label>考试成绩</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre_subject[score]['+i+']'"
                                                               class="form-control"
                                                               placeholder="请输入成绩满分990"
                                                               v-validate="{required:true,regex:/^(990|900)$|^[1-9][1-8][0-9]$|^[1-8][0-9]{2}$|^[1-9][0-9]$|^[1-9]$/}"
                                                               data-vv-as="考试成绩" v-model="item.score">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gre_subject[score]['+i+']')">
                                                            {{ errors.first("gre_subject[score]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gre_subject[score_percent]['+i+']'"
                                                               class="form-control" placeholder="请输入百分比"
                                                               v-validate="'required|max_value:100'" data-vv-as="百分比"
                                                               v-model="item.score_percent">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gre_subject[score_percent]['+i+']')">
                                                            {{ errors.first("gre_subject[score_percent]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--GMAT-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.gmat" :key="'gmat'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label><a href="javascript:void(0);" class="cded ml-15"
                                                                      @click="delElement('gmat',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder="" value="GMAT"
                                                       readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'gmat[exam_time]['+i+']'"
                                                       :data-name="'gmat|exam_time|'+i"
                                                       class="form-control times"
                                                       placeholder="请选择考试时间" v-validate="'required|date_format:yyyy-MM-dd'"
                                                       data-vv-as="考试时间" v-model="item.exam_time">
                                                <div class="validateTip" v-show="errors.has('gmat[exam_time]['+i+']')">
                                                    {{ errors.first("gmat[exam_time]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>总分</label>
                                                <input type="text" :name="'gmat[total_score]['+i+']'" class="form-control"
                                                       placeholder="请输入成绩满分800" v-validate="'required|max_value:800'"
                                                       data-vv-as="总分" v-model="item.total_score">
                                                <div class="validateTip" v-show="errors.has('gmat[total_score]['+i+']')">
                                                    {{ errors.first("gmat[total_score]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Verbal</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gmat[verbal]['+i+']'"
                                                               class="form-control"
                                                               placeholder="请输入成绩满分60" v-validate="'required|max_value:60'"
                                                               data-vv-as="成绩分" v-model="item.verbal">
                                                        <div class="validateTip" v-show="errors.has('gmat[verbal]['+i+']')">
                                                            {{ errors.first("gmat[verbal]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gmat[verbal_percent]['+i+']'"
                                                               class="form-control"
                                                               placeholder="请输入百分比" v-validate="'required|max_value:100'"
                                                               data-vv-as="百分比" v-model="item.verbal_percent">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gmat[verbal_percent]['+i+']')">
                                                            {{ errors.first("gmat[verbal_percent]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Quantitative</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gmat[quantitative]['+i+']'"
                                                               class="form-control"
                                                               placeholder="请输入成绩满分60" v-validate="'required|max_value:60'"
                                                               data-vv-as="成绩分" v-model="item.quantitative">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gmat[quantitative]['+i+']')">
                                                            {{ errors.first("gmat[quantitative]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gmat[quantitative_percent]['+i+']'"
                                                               class="form-control" placeholder="请输入百分比"
                                                               v-validate="'required|max_value:100'" data-vv-as="百分比"
                                                               v-model="item.quantitative_percent">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gmat[quantitative_percent]['+i+']')">
                                                            {{ errors.first("gmat[quantitative_percent]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Analytical Writing</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gmat[analytical_writing]['+i+']'"
                                                               class="form-control" placeholder="请输入成绩满分6"
                                                               v-validate="'required|max_value:6'" data-vv-as="成绩分"
                                                               v-model="item.analytical_writing">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gmat[analytical_writing]['+i+']')">
                                                            {{ errors.first("gmat[analytical_writing]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gmat[analytical_writing_percent]['+i+']'"
                                                               class="form-control" placeholder="请输入百分比"
                                                               v-validate="'required|max_value:100'" data-vv-as="百分比"
                                                               v-model="item.analytical_writing_percent">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gmat[analytical_writing_percent]['+i+']')">
                                                            {{ errors.first("gmat[analytical_writing_percent]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Integrated Reasoning</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'gmat[integrated_reasoning]['+i+']'"
                                                               class="form-control" placeholder="请输入成绩满分8"
                                                               v-validate="'required|max_value:8'" data-vv-as="成绩分"
                                                               v-model="item.integrated_reasoning">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gmat[integrated_reasoning]['+i+']')">
                                                            {{ errors.first("gmat[integrated_reasoning]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text"
                                                               :name="'gmat[integrated_reasoning_percent]['+i+']'"
                                                               class="form-control" placeholder="请输入百分比"
                                                               v-validate="'required|max_value:100'" data-vv-as="百分比"
                                                               v-model="item.integrated_reasoning_percent">
                                                        <div class="validateTip"
                                                             v-show="errors.has('gmat[integrated_reasoning_percent]['+i+']')">
                                                            {{ errors.first("gmat[integrated_reasoning_percent]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--SAT-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.sat" :key="'sat'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label> <a href="javascript:void(0);" class="cded ml-15"
                                                                       @click="delElement('sat',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="SAT" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'sat[exam_time]['+i+']'"
                                                       :data-name="'sat|exam_time|'+i"
                                                       class="form-control times" placeholder="请选择考试时间"
                                                       v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="考试时间"
                                                       v-model="item.exam_time">
                                                <div class="validateTip" v-show="errors.has('sat[exam_time]['+i+']')">
                                                    {{ errors.first("sat[exam_time]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>总分</label>
                                                <input type="text" :name="'sat[total_score]['+i+']'" class="form-control"
                                                       placeholder="请输入总成绩" v-validate="'required|max_value:1600'"
                                                       data-vv-as="总成绩" v-model="item.total_score">
                                                <div class="validateTip" v-show="errors.has('sat[total_score]['+i+']')">
                                                    {{ errors.first("sat[total_score]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Evidence-based Reading and Writing</label>
                                                <input type="text" :name="'sat[evidence]['+i+']'" class="form-control"
                                                       placeholder="请输入询证阅读与写作成绩" v-validate="'required|max_value:800'"
                                                       data-vv-as="成绩" v-model="item.evidence">
                                                <div class="validateTip" v-show="errors.has('sat[evidence]['+i+']')">
                                                    {{ errors.first("sat[evidence]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Math</label>
                                                <input type="text" :name="'sat[math]['+i+']'" class="form-control"
                                                       placeholder="请输入数学成绩" v-validate="'required|max_value:800'"
                                                       data-vv-as="成绩" v-model="item.math">
                                                <div class="validateTip" v-show="errors.has('sat[math]['+i+']')">
                                                    {{ errors.first("sat[math]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--SAT Subject-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.sat_subject" :key="'satsb'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label> <a href="javascript:void(0);" class="cded ml-15"
                                                                       @click="delElement('sat_subject',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="SAT Subject" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Subject</label>
                                                <input type="text" :name="'sat_subject[subject]['+i+']'"
                                                       class="form-control"
                                                       placeholder="请输入英文科目名称" v-validate="'required|ens'" data-vv-as="名称"
                                                       v-model="item.subject">
                                                <div class="validateTip" v-show="errors.has('sat_subject[subject]['+i+']')">
                                                    {{ errors.first("sat_subject[subject]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试成绩</label>
                                                <input type="text" :name="'sat_subject[score]['+i+']'" class="form-control"
                                                       placeholder="请输入考试成绩" v-validate="'required|max_value:800'"
                                                       data-vv-as="成绩" v-model="item.score">
                                                <div class="validateTip" v-show="errors.has('sat_subject[score]['+i+']')">
                                                    {{ errors.first("sat_subject[score]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'sat_subject[exam_time]['+i+']'"
                                                       :data-name="'sat_subject|exam_time|'+i"
                                                       class="form-control times" placeholder="请选择考试时间"
                                                       v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="考试时间"
                                                       v-model="item.exam_time">
                                                <div class="validateTip"
                                                     v-show="errors.has('sat_subject[exam_time]['+i+']')">
                                                    {{ errors.first("sat_subject[exam_time]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--高考-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.college_enter_exam" :key="'gk'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label> <a href="javascript:void(0);" class="cded ml-15"
                                                                       @click="delElement('college_enter_exam',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="高考" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'college_enter_exam[exam_time]['+i+']'"
                                                       :data-name="'college_enter_exam|exam_time|'+i"
                                                       class="form-control times" placeholder="请选择考试时间"
                                                       v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="考试时间"
                                                       v-model="item.exam_time">
                                                <div class="validateTip"
                                                     v-show="errors.has('college_enter_exam[exam_time]['+i+']')">
                                                    {{ errors.first("college_enter_exam[exam_time]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>总分</label>
                                                <input type="text" :name="'college_enter_exam[total_score]['+i+']'"
                                                       class="form-control"
                                                       placeholder="请输入高考总分" v-validate="'required|max_value:750'"
                                                       data-vv-as="总分" v-model="item.total_score">
                                                <div class="validateTip"
                                                     v-show="errors.has('college_enter_exam[total_score]['+i+']')">
                                                    {{ errors.first("college_enter_exam[total_score]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>语文</label>
                                                <input type="text" :name="'college_enter_exam[chinese]['+i+']'"
                                                       class="form-control"
                                                       placeholder="请输入语文分" v-validate="'required|max_value:150'"
                                                       data-vv-as="语文" v-model="item.chinese">
                                                <div class="validateTip"
                                                     v-show="errors.has('college_enter_exam[chinese]['+i+']')">
                                                    {{ errors.first("college_enter_exam[chinese]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>数学</label>
                                                <input type="text" :name="'college_enter_exam[math]['+i+']'"
                                                       class="form-control"
                                                       placeholder="请输入数学分" v-validate="'required|max_value:150'"
                                                       data-vv-as="数学" v-model="item.math">
                                                <div class="validateTip"
                                                     v-show="errors.has('college_enter_exam[math]['+i+']')">
                                                    {{ errors.first("college_enter_exam[math]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>英语</label>
                                                <input type="text" :name="'college_enter_exam[english]['+i+']'"
                                                       class="form-control"
                                                       placeholder="请输入英语分" v-validate="'required|max_value:150'"
                                                       data-vv-as="英语" v-model="item.english">
                                                <div class="validateTip"
                                                     v-show="errors.has('college_enter_exam[english]['+i+']')">
                                                    {{ errors.first("college_enter_exam[english]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>综合</label>
                                                <input type="text" :name="'college_enter_exam[comprehensive]['+i+']'"
                                                       class="form-control"
                                                       placeholder="请输入综合分" v-validate="'required|max_value:300'"
                                                       data-vv-as="名称" v-model="item.comprehensive">
                                                <div class="validateTip"
                                                     v-show="errors.has('college_enter_exam[comprehensive]['+i+']')">
                                                    {{ errors.first("college_enter_exam[comprehensive]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--ACT-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.act" :key="'act'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label> <a href="javascript:void(0);" class="cded ml-15"
                                                                       @click="delElement('act',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="ACT" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'act[exam_time]['+i+']'"
                                                       :data-name="'act|exam_time|'+i"
                                                       class="form-control times" placeholder="请选择考试时间"
                                                       v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="考试时间"
                                                       v-model="item.exam_time">
                                                <div class="validateTip" v-show="errors.has('act[exam_time]['+i+']')">
                                                    {{ errors.first("act[exam_time]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>ACT Composite</label>
                                                <input type="text" :name="'act[act_composite]['+i+']'" class="form-control"
                                                       placeholder="请输入ACT Composite" v-validate="'required|integer'"
                                                       data-vv-as="总分" v-model="item.act_composite">
                                                <div class="validateTip" v-show="errors.has('act[act_composite]['+i+']')">
                                                    {{ errors.first("act[act_composite]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>ACT English</label>
                                                <input type="text" :name="'act[act_english]['+i+']'" class="form-control"
                                                       placeholder="请输入ACT English" v-validate="'required|integer'"
                                                       data-vv-as="ACT English" v-model="item.act_english">
                                                <div class="validateTip" v-show="errors.has('act[act_english]['+i+']')">
                                                    {{ errors.first("act[act_english]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>ACT Math</label>
                                                <input type="text" :name="'act[act_math]['+i+']'" class="form-control"
                                                       placeholder="请输入ACT Math" v-validate="'required|integer'"
                                                       data-vv-as="ACT Math" v-model="item.act_math">
                                                <div class="validateTip" v-show="errors.has('act[act_math]['+i+']')">
                                                    {{ errors.first("act[act_math]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>ACT Reading</label>
                                                <input type="text" :name="'act[act_reading]['+i+']'" class="form-control"
                                                       placeholder="请输入ACT Reading" v-validate="'required|integer'"
                                                       data-vv-as="ACT Reading" v-model="item.act_reading">
                                                <div class="validateTip" v-show="errors.has('act[act_reading]['+i+']')">
                                                    {{ errors.first("act[act_reading]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--A-Level-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.a_level" :key="'al'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label> <a href="javascript:void(0);" class="cded ml-15"
                                                                       @click="delElement('a_level',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="A-Level" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>A-Level Subject</label>
                                                <input type="text" :name="'a_level[subject]['+i+']'" class="form-control"
                                                       placeholder="请输入英文科目名" v-model="item.subject">
                                            </div>
                                        </div>

                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试成绩</label>
                                                <select :name="'a_level[score]['+i+']'" class="form-control selectpicker"
                                                        v-model="item.score">
                                                    <option value="6">A:80-100</option>
                                                    <option value="5">B:70-80</option>
                                                    <option value="4">C:60-70</option>
                                                    <option value="3">D:50-60</option>
                                                    <option value="2">E:40-50</option>
                                                    <option value="1">U:40</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'a_level[exam_time]['+i+']'"
                                                       :data-name="'a_level|exam_time|'+i"
                                                       class="form-control times"
                                                       placeholder="请选择考试时间" v-model="item.exam_time">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--O-Level-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.o_level" :key="'ol'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label> <a href="javascript:void(0);" class="cded ml-15"
                                                                       @click="delElement('o_level',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="O-Level" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>O-Level Subject</label>
                                                <input type="text" :name="'o_level[subject]['+i+']'" class="form-control"
                                                       placeholder="请输入英文科目名" v-model="item.subject">
                                            </div>
                                        </div>

                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试成绩</label>
                                                <select :name="'o_level[score]['+i+']'" class="form-control selectpicker"
                                                        v-model="item.score">
                                                    <option value="1">A1=1 分</option>
                                                    <option value="2">A2=2 分</option>
                                                    <option value="3">B3=3 分</option>
                                                    <option value="4">B4=4 分</option>
                                                    <option value="5">C5=5 分</option>
                                                    <option value="6">C6=6 分</option>
                                                    <option value="7">D7=7 分</option>
                                                    <option value="8">D8=8 分</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'o_level[exam_time]['+i+']'"
                                                       :data-name="'o_level|exam_time'+i"
                                                       class="form-control times"
                                                       placeholder="请选择考试时间" v-model="item.exam_time">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--GCSE-->
                                <div class="clearfix elementList" v-for="(item, i) in exam.gcse" :key="'gcse'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label> <a href="javascript:void(0);" class="cded ml-15"
                                                                       @click="delElement('gcse',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="GCSE" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>GCSE Subject</label>
                                                <input type="text" :name="'gcse[subject]['+i+']'" class="form-control"
                                                       placeholder="请输入英文科目名" v-model="item.subject">
                                            </div>
                                        </div>

                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试成绩</label>
                                                <input type="text" :name="'gcse[score]['+i+']'" class="form-control"
                                                       placeholder="请输入考试成绩" v-model="item.score">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'gcse[exam_time]['+i+']'"
                                                       :data-name="'gcse|exam_time|'+i"
                                                       class="form-control times"
                                                       placeholder="请选择考试时间" v-model="item.exam_time">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--BTEC--->
                                <div class="clearfix elementList" v-for="(item, i) in exam.btec" :key="'btse'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label> <a href="javascript:void(0);" class="cded ml-15"
                                                                       @click="delElement('btec',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="BTEC" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>BTEC Subject</label>
                                                <input type="text" :name="'btec[subject]['+i+']'" class="form-control"
                                                       placeholder="请输入英文科目名" v-model="item.subject">
                                            </div>
                                        </div>

                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试成绩</label>
                                                <select :name="'btec[score]['+i+']'" class="form-control selectpicker"
                                                        v-model="item.score">
                                                    <option value="3">Distinction（优异）</option>
                                                    <option value="2">qMerit（良好）</option>
                                                    <option value="1">Pass（合格）</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'btec[exam_time]['+i+']'"
                                                       :data-name="'btec|exam_time|'+i"
                                                       class="form-control times"
                                                       placeholder="请选择考试时间" v-model="item.exam_time">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--IB--->
                                <div class="clearfix elementList" v-for="(item, i) in exam.ib" :key="'ib'+i">
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试类别</label> <a href="javascript:void(0);" class="cded ml-15"
                                                                       @click="delElement('ib',i)">删除</a>
                                                <input type="text" name="" class="form-control" placeholder=""
                                                       value="IB" readonly>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>考试时间</label>
                                                <input type="text" :name="'ib[exam_time]['+i+']'"
                                                       :data-name="'ib|exam_time|'+i" class="form-control times"
                                                       placeholder="请选择考试时间" v-model="item.exam_time">
                                            </div>
                                        </div>

                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>总成绩</label>
                                                <input type="text" :name="'ib[total_score]['+i+']'" class="form-control"
                                                       placeholder="请输入总成绩，满分45分" v-validate="'required|max_value:45'"
                                                       data-vv-as="总成绩" v-model="item.total_score">
                                                <div class="validateTip" v-show="errors.has('ib[total_score]['+i+']')">
                                                    {{ errors.first("ib[total_score]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>单科成绩</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_name1]['+i+']'"
                                                               class="form-control" placeholder="请输入英文科目名"
                                                               v-validate="'required|ens'" data-vv-as="科目名"
                                                               v-model="item.single_name1">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_name1]['+i+']')">
                                                            {{ errors.first("ib[single_name1]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_score1]['+i+']'"
                                                               class="form-control" placeholder="请输入成绩,满分7分"
                                                               v-validate="'required|max_value:7'" data-vv-as="成绩"
                                                               v-model="item.single_score1">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_score1]['+i+']')">
                                                            {{ errors.first("ib[single_score1]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>单科成绩</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_name2]['+i+']'"
                                                               class="form-control" placeholder="请输入英文科目名"
                                                               v-validate="'required|ens'" data-vv-as="科目名"
                                                               v-model="item.single_name2">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_name2]['+i+']')">
                                                            {{ errors.first("ib[single_name2]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_score2]['+i+']'"
                                                               class="form-control" placeholder="请输入成绩,满分7分"
                                                               v-validate="'required|max_value:7'" data-vv-as="成绩"
                                                               v-model="item.single_score2">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_score2]['+i+']')">
                                                            {{ errors.first("ib[single_score2]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>单科成绩</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_name3]['+i+']'"
                                                               class="form-control" placeholder="请输入英文科目名"
                                                               v-validate="'required|ens'" data-vv-as="科目名"
                                                               v-model="item.single_name3">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_name3]['+i+']')">
                                                            {{ errors.first("ib[single_name3]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_score3]['+i+']'"
                                                               class="form-control" placeholder="请输入成绩,满分7分"
                                                               v-validate="'required|max_value:7'" data-vv-as="成绩"
                                                               v-model="item.single_score3">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_score3]['+i+']')">
                                                            {{ errors.first("ib[single_score3]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>单科成绩</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_name4]['+i+']'"
                                                               class="form-control" placeholder="请输入英文科目名"
                                                               v-validate="'required|ens'" data-vv-as="科目名"
                                                               v-model="item.single_name4">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_name4]['+i+']')">
                                                            {{ errors.first("ib[single_name4]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_score4]['+i+']'"
                                                               class="form-control" placeholder="请输入成绩,满分7分"
                                                               v-validate="'required|max_value:7'" data-vv-as="成绩"
                                                               v-model="item.single_score4">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_score4]['+i+']')">
                                                            {{ errors.first("ib[single_score4]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>单科成绩</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_name5]['+i+']'"
                                                               class="form-control" placeholder="请输入英文科目名"
                                                               v-validate="'required|ens'" data-vv-as="科目名"
                                                               v-model="item.single_name5">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_name5]['+i+']')">
                                                            {{ errors.first("ib[single_name5]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_score5]['+i+']'"
                                                               class="form-control" placeholder="请输入成绩,满分7分"
                                                               v-validate="'required|max_value:7'" data-vv-as="成绩"
                                                               v-model="item.single_score5">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_score5]['+i+']')">
                                                            {{ errors.first("ib[single_score5]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>单科成绩</label>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_name6]['+i+']'"
                                                               class="form-control" placeholder="请输入英文科目名"
                                                               v-validate="'required|ens'" data-vv-as="科目名"
                                                               v-model="item.single_name6">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_name6]['+i+']')">
                                                            {{ errors.first("ib[single_name6]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                        <input type="text" :name="'ib[single_score6]['+i+']'"
                                                               class="form-control" placeholder="请输入成绩,满分7分"
                                                               v-validate="'required|max_value:7'" data-vv-as="成绩"
                                                               v-model="item.single_score6">
                                                        <div class="validateTip"
                                                             v-show="errors.has('ib[single_score6]['+i+']')">
                                                            {{ errors.first("ib[single_score6]["+i+"]") }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Theory of Knowledge</label>
                                                <input type="text" :name="'ib[theory]['+i+']'" class="form-control"
                                                       placeholder="请输入成绩,满分3分" v-validate="'required|max_value:3'"
                                                       data-vv-as="Theory of Knowledge" v-model="item.theory">
                                                <div class="validateTip" v-show="errors.has('ib[theory]['+i+']')">
                                                    {{ errors.first("ib[theory]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row form-inline pt-30">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <select class="form-control addType selectpicker">
                                            <option value="gre">GRE</option>
                                            <option value="gre_subject">GRE Subject</option>
                                            <option value="gmat">GMAT</option>

                                            <option value="sat">SAT</option>
                                            <option value="sat_subject">SAT Subject</option>
                                            <option value="college_enter_exam">高考</option>
                                            <option value="act">ACT</option>

                                            <option value="a_level">A-Level</option>
                                            <option value="o_level">O-Level</option>
                                            <option value="gcse">GCSE</option>
                                            <option value="btec">BTEC</option>
                                            <option value="ib">IB</option>
                                        </select>
                                        <button type="button" class="btn btn-primary ml-10" @click="addElement">添加考试信息
                                        </button>
                                    </div>
                                </div>
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
        <div v-if="loading" v-html="LoadingImg()"></div>
    </div>
</template>

<script>
import HeaderNav from '@/components/functions/applyInfo/HeaderNav'
import '@~/js/VeeValidateConfig'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import db from '@~/js/request'
require('icheck')

export default {
  name: 'ExamComponent',
  data () {
    return {
      id: '',
      loading: true,
      tabStatus: [0, 0, 0, 0],
      languageScore: 1,
      exam: {
        is_language_score: true,
        language_score: {type: 1, exam_time: '', total_score: '', listen: '', speak: '', read: '', write: ''},
        is_academic_score: true,
        gre: [],
        gre_subject: [],
        gmat: [],
        sat: [],
        sat_subject: [],
        college_enter_exam: [],
        act: [],
        a_level: [],
        o_level: [],
        gcse: [],
        btec: [],
        ib: []
      }
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.$nextTick(() => {
      if (self.id) {
        let self = this
        let params = new URLSearchParams()
        params.append('id', self.id)
        db.getRequest('/Institution/ApplyMaterial/editExam', params).then(res => {
          if (res.status === 1) {
            self.showTimeD()
            self.RefreshSelect()
            self.setIcheck()
          } else {
            console.log(res.msg)
          }
        })
      }
    })
  },
  methods: {
    showTimeD () {
      let self = this
      setTimeout(function () {
        $('#ExamForm .times').each(function () {
          let name1 = $(this).attr('data-name').split('|')[0]
          let name2 = $(this).attr('data-name').split('|')[1]
          let name3 = $(this).attr('data-name').split('|')[2]
          if (name3 === undefined) {
            self.laydate.render({
              elem: this,
              done (vals) {
                self.exam[name1][name2] = vals
              }
            })
          } else {
            self.laydate.render({
              elem: this,
              done (vals) {
                self.exam[name1][name3][name2] = vals
              }
            })
          }
        })
      }, 800)
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        let formData = $('#ExamForm').serializeArray()
        self.$emit('ExamCallback', result, formData)
      })
    },
    addElement () {
      let self = this
      let types = $('.addType option:selected').val()
      self.exam[types].push({})
      self.showTimeD()
      self.RefreshSelect()
    },
    delElement (name, i) {
      this.exam[name].splice(i, 1)
    },
    RefreshSelect () {
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh')
      }, 500)
    },
    // 设置单、多选样式
    setIcheck () {
      let self = this
      setTimeout(function () {
        $('#ExamForm [type="checkbox"]').each(function () {
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
              self.showTimeD()
            }
          })
        })
        $('#ExamForm [type="radio"]').each(function () {
          $(this).iCheck({
            labelHover: false,
            cursor: true,
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            increaseArea: '20%'
          })
        })
      }, 500)
    }
  },
  components: {
    HeaderNav
  }
}
</script>

<style scoped lang="scss">
.form-group {margin-left:0 !important;margin-right:0 !important;}
</style>
