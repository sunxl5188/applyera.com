<template>
    <div>
        <InitApplyNav :state="state" :id="id"/>
        <div class="row form-horizontal">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-3 control-label">选择学生</label>
                    <div class="col-sm-9">
                        <select name="stu_name" class="form-control selectpicker show-tick" data-live-serach="true"
                                data-size="15">
                            <option value="">请选择</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-3 control-label">申请材料</label>
                    <div class="col-sm-9">
                        <select name="stu_name" class="form-control selectpicker show-tick" data-live-serach="true"
                                data-size="15">
                            <option value="">请选择</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="col-sm-3 control-label">申报类型</label>
                    <div class="col-sm-9">
                        <select name="stu_name" class="form-control selectpicker show-tick" data-live-serach="true"
                                data-size="15">
                            <option value="">请选择</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="clearfix text-center">
            <i class="iconfont cded">&#xe610;</i>
            如果该生尚未填写申请资料，请先前往"
            <router-link to="/functions/applyInfo/detail" class="cded">申请资料</router-link>
            "填写
        </div>

        <table class="table table-customize">
            <thead>
            <tr>
                <th><i class="iconfont handPower cded">&#xe622;</i></th>
                <th>院校名称</th>
                <th>专业名称</th>
                <th>专业网址</th>
                <th>申请批次</th>
                <th>可得佣金(元)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><i class="iconfont handPower cded lh38">&#xe61f5;</i></td>
                <td>
                    <div>MIT</div>
                    <div>麻省理工</div>
                </td>
                <td>
                    <div>Accounting</div>
                    <div>会计</div>
                </td>
                <td><a href="javascript:void(0);" target="_blank" class="cded lh34">点击前往</a></td>
                <td>
                    <input type="text" name="name" class="form-control" placeholder="请填写申请批次 (输入框)"/>
                </td>
                <td><span class="lh34">6%</span></td>
            </tr>
            </tbody>
        </table>
        <div class="clearfix text-center">
            <button type="button" class="btn btn-primary">下一页</button>
            <button type="button" class="btn btn-outline-primary ml-20">保存</button>
        </div>

        <div class="tab-content pt-30">
            <div class="tab-pane fade in active">
                <form id="addApplication" class="form-horizontal" autocomplete="off"
                      @submit.prevent="validateBeforeSubmit">
                    <input type="hidden" name="orderId" id="orderId" v-model="orderId"/>
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group form-search">
                                <label><font class="cf00">*</font>关联学生</label>
                                <input type="hidden" name="studentId" id="studentId" :value="studentInfo.id"/>
                                <input type="text" name="nameNumber" class="form-control"
                                       :value="studentInfo.nameNumber"
                                       v-validate="'required'" data-vv-as="学生">
                                <i class="iconfont" data-toggle="modal" data-target="#StudentComponent"
                                   data-backdrop="static" v-if="!orderId" style="top:25px;">&#xe741;</i>
                                <div class="validateTip" v-show="errors.has('nameNumber')">
                                    {{ errors.first('nameNumber') }}
                                </div>
                            </div>
                            <StudentComponent @setStuden="setStuden"/>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label><font class="cf00">*</font>申报类型</label>
                                <select name="applyType" class="form-control"
                                        v-model.number="applyType" @change="schoolList=[]">
                                    <option value="1">本科</option>
                                    <option value="2">硕士</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label>是否已支付</label>
                                <input type="text" name="payStatus" class="form-control" value="否"
                                       v-model="payStatus" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="blk30"></div>
                    <div class="panel panel-default">
                        <div class="panel-heading">01-选择申请资料（必填）</div>
                        <div class="panel-body">
                            <div class="clearfix lh30 pb-15">
                                <i class="iconfont cded">&#xe610;</i>
                                <span>如果该生尚未填写申请资料，请先前往"<router-link to="/functions/applyInfo/detail"
                                                                     class="cded">申请资料</router-link>"填写</span>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="form-group form-search">
                                        <label><font class="cf00">*</font>关联申请资料</label>
                                        <select name="applyId" class="form-control" v-model="applyId"
                                                style="display:inline-block;width:180px;vertical-align: middle;"
                                                v-validate="'required'" data-vv-as="申请资料">
                                            <option value="">请选择</option>
                                            <option :value="item.apply_id" v-for="(item,i) in studentInfo.apply"
                                                    :key="i">
                                                {{item.apply_number}}
                                            </option>
                                        </select>
                                        <span class="div_vm" v-if="Object.keys(studentInfo).length > 0">
                                            <router-link
                                                    :to="{path:'/functions/applyInfo/detail',query:{id:applyId}}"
                                                    class="btn btn-primary" v-if="applyId!==''">查看所选资料
                                            </router-link>
                                        </span>
                                        <div class="validateTip" v-show="errors.has('applyId')">
                                            {{ errors.first('applyId') }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">02-选择院校专业（必填）</div>
                        <div class="panel-body">
                            <table class="table table-bordered table-hover table-text-over table-condensed table-bordered text-center">
                                <thead>
                                <tr>
                                    <th class="text-center w5">
                                        <i class="iconfont cded handPower" data-toggle="modal"
                                           data-backdrop="static" data-target="#schoolMajor">&#xe619;</i>
                                    </th>
                                    <th class="text-center w10">查看所选</th>
                                    <th class="text-center">院校名称</th>
                                    <th class="text-center w20">专业名称</th>
                                    <th class="text-center w20">批次</th>
                                    <th class="text-center w15">申请费用(元)</th>
                                    <th class="text-center w15">可得返佣(元)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,i) in schoolList" :key="i">
                                    <td><i class="iconfont cded handPower" @click="delmajor(i)">&#xe605;</i></td>
                                    <td>
                                        <input type="hidden" name="majorList[]" :value="item.unq_id">
                                        <router-link
                                                :to="{path:'/functions/schoollist/SchollDetail', query:{id:item.school_unq_id,tab:1}}"
                                                class="cded">学校
                                        </router-link>
                                        <router-link
                                                :to="{path:'/functions/schoollist/majordetaila', query:{id:item.unq_id}}"
                                                class="cded ml-5" v-if="item.type===1">专业
                                        </router-link>
                                        <router-link
                                                :to="{path:'/functions/schoollist/majordetailb', query:{id:item.unq_id}}"
                                                class="cded ml-5" v-if="item.type===2">专业
                                        </router-link>
                                    </td>
                                    <td>{{item.schoolname}}</td>
                                    <td>{{item.majorch}}<input type="hidden" name="majorUnqIdList[]"
                                                               id="majorUnqIdList[]" :value="item.unq_id"/></td>
                                    <td>
                                        <select name="majorTermList[]" class="form-control" style="max-width:100%;"
                                                v-model="item.batch_chose">
                                            <option value="">请选择</option>
                                            <option v-for="(v, n) in item.batch" :key="n" :value="v">{{v}}</option>
                                        </select>
                                    </td>
                                    <td>{{item.apply_fee}}</td>
                                    <td>{{item.commission}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading"> 03-上传所需附件（选填）</div>
                        <div class="panel-body">
                            <div class="clearfix" v-if="uploadNeeds">
                                <p>您需要添加的材料有：</p>
                                <p>{{uploadNeeds}}</p>
                            </div>
                            <table class="table table-bordered table-hover table-condensed text-center">
                                <thead>
                                <tr>
                                    <th class="w20 text-center">学生护照附件</th>
                                    <th class="w20 text-center">毕业证书</th>
                                    <th class="w20 text-center">成绩单</th>
                                    <th class="w20 text-center">在读证明</th>
                                    <th class="w20 text-center">学校报告</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <div class="div_vm po_re">
                                            <span id="picker1">上传附件</span>
                                            <input type="hidden" name="uploadPassport" v-model="uploadPassport"/>
                                        </div>
                                        <div id="filepicker1" class="uploadFileList">
                                            <div class="fileItem" :id="'wu_file1_'+i" :fid="item"
                                                 v-for="(item, i) in uploadPassport" :key="i">
                                                <span>{{item}}</span>
                                                <i class="iconfont cancel"
                                                   @click="deleteFile(item, 1)">&#xe7f6;</i>
                                                <div class="uploadProgress"><span style="width:100%;"></span></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="div_vm po_re">
                                            <span id="picker2">上传附件</span>
                                            <input type="hidden" name="uploadGraduation"
                                                   v-model="uploadGraduation"/>
                                        </div>
                                        <div id="filepicker2" class="uploadFileList">
                                            <div class="fileItem" :id="'wu_file2_'+i" :fid="item"
                                                 v-for="(item, i) in uploadGraduation" :key="i">
                                                <span>{{item}}</span>
                                                <i class="iconfont cancel"
                                                   @click="deleteFile(item, 2)">&#xe7f6;</i>
                                                <div class="uploadProgress"><span style="width:100%;"></span></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="div_vm">
                                            <span id="picker3">上传附件</span>
                                            <input type="hidden" name="uploadScore" v-model="uploadScore"/>
                                        </div>
                                        <div id="filepicker3" class="uploadFileList">
                                            <div class="fileItem" :id="'wu_file3_'+i" :fid="item"
                                                 v-for="(item, i) in uploadScore" :key="i">
                                                <span>{{item}}</span>
                                                <i class="iconfont cancel"
                                                   @click="deleteFile(item, 3)">&#xe7f6;</i>
                                                <div class="uploadProgress"><span style="width:100%;"></span></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="div_vm">
                                            <span id="picker4">上传附件</span>
                                            <input type="hidden" name="uploadReading" v-model="uploadReading"/>
                                        </div>
                                        <div id="filepicker4" class="uploadFileList">
                                            <div class="fileItem" :id="'wu_file4_'+i" :fid="item"
                                                 v-for="(item, i) in uploadReading" :key="i">
                                                <span>{{item}}</span>
                                                <i class="iconfont cancel"
                                                   @click="deleteFile(item, 4)">&#xe7f6;</i>
                                                <div class="uploadProgress"><span style="width:100%;"></span></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="div_vm">
                                            <span id="picker5">上传附件</span>
                                            <input type="hidden" name="uploadReport" v-model="uploadReport"/>
                                        </div>
                                        <div id="filepicker5" class="uploadFileList">
                                            <div class="fileItem" :id="'wu_file5_'+i" :fid="item"
                                                 v-for="(item, i) in uploadReport" :key="i">
                                                <span>{{item}}</span>
                                                <i class="iconfont cancel"
                                                   @click="deleteFile(item, 5)">&#xe7f6;</i>
                                                <div class="uploadProgress"><span style="width:100%;"></span></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <table class="table table-bordered table-hover table-condensed text-center">
                                <thead>
                                <tr>
                                    <th class="w20 text-center">简历</th>
                                    <th class="w20 text-center">学位证书</th>
                                    <th class="w20 text-center">财产证明附件</th>
                                    <th class="w20 text-center">附加</th>
                                    <th class="w20 text-center"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <div class="div_vm">
                                            <span id="picker6">上传附件</span>
                                            <input type="hidden" name="uploadResume" v-model="uploadResume"/>
                                        </div>
                                        <div id="filepicker6" class="uploadFileList">
                                            <div class="fileItem" :id="'wu_file6_'+i" :fid="item"
                                                 v-for="(item, i) in uploadResume" :key="i">
                                                <span>{{item}}</span>
                                                <i class="iconfont cancel"
                                                   @click="deleteFile(item, 6)">&#xe7f6;</i>
                                                <div class="uploadProgress"><span style="width:100%;"></span></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="div_vm">
                                            <span id="picker7">上传附件</span>
                                            <input type="hidden" name="uploadDegree" v-model="uploadDegree"/>
                                        </div>
                                        <div id="filepicker7" class="uploadFileList">
                                            <div class="fileItem" :id="'wu_file7_'+i" :fid="item"
                                                 v-for="(item, i) in uploadDegree" :key="i">
                                                <span>{{item}}</span>
                                                <i class="iconfont cancel"
                                                   @click="deleteFile(item, 7)">&#xe7f6;</i>
                                                <div class="uploadProgress"><span style="width:100%;"></span></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="div_vm">
                                            <span id="picker8">上传附件</span>
                                            <input type="hidden" name="uploadProperty" v-model="uploadProperty"/>
                                        </div>
                                        <div id="filepicker8" class="uploadFileList">
                                            <div class="fileItem" :id="'wu_file8_'+i" :fid="item"
                                                 v-for="(item, i) in uploadProperty" :key="i">
                                                <span>{{item}}</span>
                                                <i class="iconfont cancel"
                                                   @click="deleteFile(item, 8)">&#xe7f6;</i>
                                                <div class="uploadProgress"><span style="width:100%;"></span></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="div_vm">
                                            <span id="picker9">上传附件</span>
                                            <input type="hidden" name="uploadOther" v-model="uploadOther"/>
                                        </div>
                                        <div id="filepicker9" class="uploadFileList">
                                            <div class="fileItem" :id="'wu_file9_'+i" :fid="item"
                                                 v-for="(item, i) in uploadOther" :key="i">
                                                <span>{{item}}</span>
                                                <i class="iconfont cancel"
                                                   @click="deleteFile(item, 9)">&#xe7f6;</i>
                                                <div class="uploadProgress"><span style="width:100%;"></span></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>

                            <div class="clearfix" v-if="rcmdNeeds">
                                <p>您需要添加的推荐信有：</p>
                                <p>{{rcmdNeeds}}</p>
                            </div>
                            <table class="table table-bordered table-hover table-condensed text-center">
                                <thead>
                                <tr>
                                    <th class="text-center w5"><i class="iconfont cded handPower"
                                                                  @click="addLetter">&#xe619;</i></th>
                                    <th class="text-center w15">推荐信附件</th>
                                    <th class="text-center w20">推荐人姓名</th>
                                    <th class="text-center w20">推荐人邮箱</th>
                                    <th class="text-center">推荐信指定院校</th>
                                </tr>
                                </thead>
                                <tbody id="table_letter">
                                <tr v-for="(item, i) in letter" :key="i">
                                    <td><i class="iconfont cded lh34 handPower"
                                           @click="delLetter(i)">&#xe605;</i>
                                    </td>
                                    <td>
                                        <div class="div_vm">
                                            <span :id="'uploadRcmdId'+i">上传附件({{item.uploadRcmdPath===''?0:item.uploadRcmdPath.split('|').length}})</span>
                                            <input type="hidden" name="uploadRcmdPath[]"
                                                   v-model="item.uploadRcmdPath" :data-index="i"/>
                                        </div>
                                    </td>
                                    <td><input type="text" name="uploadRcmdName[]" class="form-control"
                                               style="width:100%;" v-model="item.uploadRcmdName"
                                               placeholder="请输入推荐人姓名">
                                    </td>
                                    <td><input type="text" name="uploadRcmdEmail[]" class="form-control"
                                               style="width:100%;"
                                               placeholder="请输入推荐人邮箱" v-model="item.uploadRcmdEmail">
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="text" name="uploadRcmdSchool[]" class="form-control"
                                                   v-model="item.uploadRcmdSchool" placeholder="请选择指定院校"/>

                                            <span class="input-group-addon">
                                                    <div class="dropdown">
                                                    <i id="dropdownMenu1" data-toggle="dropdown"
                                                       class="iconfont handPower">&#xe66b;</i>
                                                    <ul class="dropdown-menu" role="menu"
                                                        aria-labelledby="dropdownMenu1" style="right:0;left:initial;">
                                                        <li v-for="(val, n) in schoolName" :key="n"
                                                            @click="upReSchool(val, i)"><a
                                                                href="javascript:void(0);">{{val}}</a></li>
                                                    </ul>
                                                </div>
                                                </span>

                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">04-院校题目作答（必填）</div>
                        <div class="panel-body">
                            <div class="media">
                                <div class="media-left"><img src="../../../../static/images/011.jpg"
                                                             class="media-object"></div>
                                <div class="media-body">
                                    学校题目：为各个申请院校自主命题题目，请于截止日期前完成答案。<br>
                                    您填写的答案将被直接递交到海外院校，请用英文作答!
                                </div>
                            </div>

                            <div class="blk30"></div>

                            <div class="row">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" v-for="(item, i) in schoolList"
                                     :key="i">
                                    <a data-toggle="tab" :href="'#schoolAns'+i">
                                        <div class="thumbnail">
                                            <i :class="item.last_time === '未开始'?'state state1':'state state3'"></i>
                                            <div class="caption">
                                                <h3 class="textOver">{{item.schoolname}}</h3>
                                                <p>
                                                    专业：{{item.majorch}}<br>
                                                    上次作答时间：{{item.last_time}}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <!--题目开始，如果学校学表为容时，不输出-->
                            <div v-if="schoolList.length > 0">
                                <!--本科题目*************************************************************-->
                                <div v-if="applyType===1">
                                    <div class="tab-content">
                                        <div :class="i===0?'tab-pane fade in active':'tab-pane fade'"
                                             :id="'schoolAns'+i" v-for="(item, i) in schoolList" :key="i">
                                            <input type="hidden" :name="'unqid_answer['+i+']'" :value="item.unq_id"/>
                                            <div v-if="item.qs_list.ps_show===1">
                                                <h4>一、个人陈述</h4>
                                                <div class="clearfix" v-html="item.qs_list.ps"></div>
                                                <div class="clearfix pt-15 pb-15">
                                                    <textarea :name="'ps_answer['+i+']'" class="form-control"
                                                              v-model="item.qs_list.ps_answer"></textarea>
                                                </div>
                                            </div>

                                            <!--写作必选-->
                                            <div v-if="item.qs_list.ws_show===1">
                                                <h4>二、写作</h4>
                                                <div class="clearfix pt-15 pb-15">
                                                    <div class="clearfix" v-html="item.qs_list.ws"></div>
                                                    <div class="clearfix pt-15 pb-15">
                                                        <textarea :name="'ws_answer['+i+']'" class="form-control"
                                                                  v-model="item.qs_list.ws_answer"></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <!--硕士题目*************************************************************-->
                                <div class="tab-content" v-if="applyType===2">
                                    <div :class="i===0?'tab-pane fade in active':'tab-pane fade'" :id="'schoolAns'+i"
                                         v-for="(item, i) in schoolList" :key="i">
                                        <input type="hidden" :name="'unqid_answer['+i+']'" :value="item.unq_id"/>
                                        <div class="clearfix" v-if="item.qs_list.ps_show===1">
                                            <h4>一、个人陈述</h4>
                                            <div class="clearfix" v-html="item.qs_list.ps"></div>
                                            <div class="clearfix pt-15 pb-15">
                                                <textarea :name="'ps_answer['+i+']'" class="form-control"
                                                          v-model="item.qs_list.ps_answer"></textarea>
                                            </div>
                                        </div>
                                        <div class="clearfix" v-if="item.qs_list.ws_show===1">
                                            <h4>二、写作</h4>
                                            <div class="clearfix" v-html="item.qs_list.ws"></div>
                                            <div class="clearfix">
                                                <textarea :name="'ws_answer['+i+']'" class="form-control"
                                                          v-model="item.qs_list.ws_answer"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>

        <SchoolOrMajorComponent :btnHide="btnHide" :applyType="applyType" @getmajorinfo="getmajorinfo"/>
    </div>
</template>

<script>
import '@~/js/VeeValidateConfig'
import InitApplyNav from '@#/functions/initApply/InitApplyNav'
import SchoolOrMajorComponent from '@/components/functions/plan/SchoolOrMajorComponent'
import StudentComponent from '@/components/functions/plan/StudentComponent'
import store from '@/vuex/Store'
import db from '@~/js/request'

let WebUploader = require('@@/js/webuploader/webuploader')

export default {
  name: 'ChooseSchool',
  store,
  data () {
    return {
      goto: -1,
      saveBtn: 1,
      btnHide: true,
      id: '',
      state: [0, 0, 0, 0],
      orderId: '',
      submitStatus: 0, // 是否可支付
      applyType: 1, // 申报类型
      payStatus: '否',
      applyId: '',
      schoolList: [],
      schoolName: [],
      studentInfo: {},
      AUnqIdCheck: {},
      uploadNeeds: '',
      rcmdNeeds: '',
      letter: [], // 推荐信上传
      uploadArr: [
        { id: 'picker1', fid: 'uploadPassport' },
        { id: 'picker2', fid: 'uploadGraduation' },
        { id: 'picker3', fid: 'uploadScore' },
        { id: 'picker4', fid: 'uploadReading' },
        { id: 'picker5', fid: 'uploadReport' },
        { id: 'picker6', fid: 'uploadResume' },
        { id: 'picker7', fid: 'uploadDegree' },
        { id: 'picker8', fid: 'uploadProperty' },
        { id: 'picker9', fid: 'uploadOther' }
      ],
      uploadPassport: [],
      uploadGraduation: [],
      uploadScore: [],
      uploadReading: [],
      uploadReport: [],
      uploadResume: [],
      uploadDegree: [],
      uploadProperty: [],
      uploadOther: []
    }
  },
  computed: {
    token () {
      return store.state.token
    },
    userInfo () {
      return store.state.userInfo
    }
  },
  mounted () {
    let self = this
    self.id = self.$route.query.id || ''
    self.orderId = self.$route.query.id
    self.$nextTick(() => {
      if (self.orderId !== undefined) {
        self.getinfo()
      }
      setTimeout(function () {
        self.createUpload(self.uploadArr)
        if (self.orderId) {
          let arr = []
          $('#table_letter tr').each(function () {
            arr.push({
              id: $(this).find('span').attr('id'),
              fid: $(this).find('input').attr('name')
            })
          })
          self.uploadOne(arr)
          $('#Addapplication2').removeAttr('style')
        }
      }, 1500)
    })
  },
  methods: {
    getinfo () {
      let self = this
      let params = new URLSearchParams()
      params.append('orderId', self.orderId)
      self.loading = true
      db.postRequest('Institution/Apply/orderShow', params).then(res => {
        if (res.status === 1) {
          self.submitStatus = res.data.submitStatus
          self.applyId = res.data.applyId
          self.applyType = res.data.applyType
          self.payStatus = res.data.payStatus
          self.uploadPassport = res.data.uploadPassport ? res.data.uploadPassport.split(',') : []
          self.uploadGraduation = res.data.uploadGraduation ? res.data.uploadGraduation.split(',') : []
          self.uploadScore = res.data.uploadScore ? res.data.uploadScore.split(',') : []
          self.uploadReading = res.data.uploadReading ? res.data.uploadReading.split(',') : []
          self.uploadReport = res.data.uploadReport ? res.data.uploadReport.split(',') : []
          self.uploadResume = res.data.uploadResume ? res.data.uploadResume.split(',') : []
          self.uploadDegree = res.data.uploadDegree ? res.data.uploadDegree.split(',') : []
          self.uploadProperty = res.data.uploadProperty ? res.data.uploadProperty.split(',') : []
          self.uploadOther = res.data.uploadOther ? res.data.uploadOther.split(',') : []
          self.rcmdNeeds = res.data.rcmdNeeds
          self.uploadNeeds = res.data.uploadNeeds
          self.studentInfo = {
            id: res.data.studentId,
            nameNumber: res.data.studentName,
            apply: res.data.apply
          }
          self.schoolList = res.data.majorList
          self.letter = res.data.uploadRcmdList
          let schooArr = []
          self.schoolList.map(item => {
            schooArr.push(item.schoolname)
          })
          self.schoolName = self.uniq(schooArr)
        } else {
          self.layer.alert(res.msg, {
            icon: 2
          })
        }
        self.loading = false
      })
    },
    submitSave () {
      this.validateBeforeSubmit()
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then((result) => {
        let formData = $('#addApplication').serializeArray()
        let params = new URLSearchParams()
        for (let i = 0; i < formData.length; i++) {
          params.append(formData[i]['name'], formData[i]['value'])
        }
        if (result) {
          db.postRequest('Institution/Apply/orderEdit', params).then(res => {
            if (res.status === 1) {
              if (self.orderId === undefined) {
                self.layer.alert(res.msg, {
                  icon: 1
                }, function (i) {
                  self.layer.close(i)
                  self.$router.push('/functions/initApply/ChooseSchool?id=' + res.data)
                  self.orderId = res.data
                  self.goto = -2
                  self.getinfo()
                })
              } else {
                self.layer.alert(res.msg, {
                  icon: 1
                })
                self.getinfo()
              }
            } else {
              self.layer.alert(res.msg, { icon: 2 })
            }
          })
        } else {
          self.layer.msg('必填项没有填写完整！')
        }
      })
    },
    // 选择学校专业回调数据
    getmajorinfo (obj) {
      let self = this
      let temp = []
      let object = {}
      let newArr = self.schoolList
      newArr.push.apply(newArr, obj.recommend)
      for (let i = 0; i < newArr.length; i++) {
        if (!object[newArr[i].unq_id]) {
          temp.push(newArr[i])
          object[newArr[i].unq_id] = true
        }
      }
      self.schoolList = temp
      for (let i = 0; i < obj.recommend.length; i++) {
        self.schoolName.push(obj.recommend[i]['schoolname'])
        self.schoolName = self.uniq(self.schoolName)
      }
      self.getOrderNeed()
    },
    // 删除学校专业列表
    delmajor (i) {
      let self = this
      let arr = []
      self.schoolList.splice(i, 1)
      for (let i = 0; i < self.schoolList.length; i++) {
        arr.push(self.schoolList[i]['schoolname'])
        self.uniq(arr)
      }
      self.schoolName = arr
      self.getOrderNeed()
    },
    getOrderNeed () {
      let self = this
      setTimeout(function () {
        let params = new URLSearchParams()
        params.append('applyType', self.applyType)
        self.schoolList.map((item, i) => {
          params.append('unqIdList[' + i + ']', item['unq_id'])
        })
        db.postRequest('/Institution/Apply/orderNeed', params).then(res => {
          if (res.status === 1) {
            self.uploadNeeds = res.data.list
            self.rcmdNeeds = res.data.rcmd
          } else {
            self.layer.alert(res.msg, {
              icon: 2
            })
          }
        })
      }, 200)
    },
    // 返回学生档案
    setStuden (obj) {
      this.studentInfo = obj
    },
    createUpload (list) {
      let self = this
      for (let i = 0; i < list.length; i++) {
        let uploader = list[i]['id']
        uploader = WebUploader.create({
          auto: true, // 选完文件后，是否自动上传
          swf: 'static/js/webuploader/Uploader.swf', // '/upload/Uploader.swf', // swf文件路径
          server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne', // 文件接收服务端
          fileVal: 'file',
          pick: {
            id: '#' + list[i]['id'],
            multiple: true, // 是否多文件上传 默认false
            label: ''
          }, // 选择文件的按钮。可选
          // 允许选择文件格式。
          accept: {
            title: '',
            extensions: 'pdf',
            mimeTypes: 'application/pdf'
          },
          threads: 1,
          fileNumLimit: undefined, // 限制上传个数
          fileSingleSizeLimit: 1024 * 1024 * 20, // 限制单个上传图片的大小
          formData: { func: 'apply' }, // 上传所需参数
          duplicate: true // 重复上传
        })

        uploader.on('uploadProgress', function (file, percentage) {
          $('#file' + list[i]['id']).find('#' + file.id + ' .uploadProgress span').css({ width: percentage * 100 + '%' })
        })

        uploader.on('uploadSuccess', function (file, res) {
          if (res.status === 1) {
            let $this = $('#' + list[i]['id'])
            if ($this.attr('id') === 'picker1') {
              self.uploadPassport.push(res.data.path)
            }
            if ($this.attr('id') === 'picker2') {
              self.uploadGraduation.push(res.data.path)
            }
            if ($this.attr('id') === 'picker3') {
              self.uploadScore.push(res.data.path)
            }
            if ($this.attr('id') === 'picker4') {
              self.uploadReading.push(res.data.path)
            }
            if ($this.attr('id') === 'picker5') {
              self.uploadReport.push(res.data.path)
            }
            if ($this.attr('id') === 'picker6') {
              self.uploadResume.push(res.data.path)
            }
            if ($this.attr('id') === 'picker7') {
              self.uploadDegree.push(res.data.path)
            }
            if ($this.attr('id') === 'picker8') {
              self.uploadProperty.push(res.data.path)
            }
            if ($this.attr('id') === 'picker9') {
              self.uploadOther.push(res.data.path)
            }
            $('#file' + $this.attr('id')).find('#' + file.id).attr('fid', res.data.path)
          } else {
            self.layer.alert(res.msg, { icon: 2 })
          }
        })
      }
    },
    uploadOne (list) {
      let self = this
      for (let i = 0; i < list.length; i++) {
        let uploader = list[i]['id']
        uploader = WebUploader.create({
          auto: true, // 选完文件后，是否自动上传
          swf: 'static/js/webuploader/Uploader.swf', // '/upload/Uploader.swf', // swf文件路径
          server: window.ajaxBaseUrl + '/Institution/Upload/UploadOne', // 文件接收服务端
          fileVal: 'file',
          pick: {
            id: '#' + list[i]['id'],
            multiple: false, // 是否多文件上传 默认false
            label: ''
          }, // 选择文件的按钮。可选
          // 允许选择文件格式。
          accept: {
            title: '',
            extensions: 'pdf',
            mimeTypes: 'application/pdf'
          },
          threads: 1,
          fileNumLimit: 1, // 限制上传个数
          fileSingleSizeLimit: 1024 * 1024 * 20, // 限制单个上传图片的大小
          formData: { func: 'apply' }, // 上传所需参数
          duplicate: true // 重复上传
        })
        uploader.on('uploadSuccess', function (file, res) {
          if (res.status === 1) {
            let $this = $('#' + list[i]['id'])
            // 推荐信
            if ($this.attr('id').indexOf('uploadRcmd') >= 0) {
              let ii = $this.siblings('input').attr('data-index')
              self.letter[ii]['uploadRcmdPath'] = res.data.path
              $this.find('.webuploader-pick').html('上传附件(1)')
            }
          } else {
            self.layer.alert(res.msg, { icon: 2 })
          }
        })

        uploader.on('error', function (handler) {
          if (handler === 'Q_EXCEED_NUM_LIMIT') {
            self.layer.alert('文件数量超个数，最多上传一个文件', { icon: 2 })
          }
        })
      }
    },
    // 删除已保存附件
    deleteFile (file, i) {
      let self = this
      if (i === 1) {
        self.uploadPassport.map((item, k) => {
          if (item === file) {
            self.uploadPassport.splice(k, 1)
          }
        })
      }

      if (i === 2) {
        self.uploadGraduation.map((item, k) => {
          if (item === file) {
            self.uploadGraduation.splice(k, 1)
          }
        })
      }
      if (i === 3) {
        self.uploadScore.map((item, k) => {
          if (item === file) {
            self.uploadScore.splice(k, 1)
          }
        })
      }
      if (i === 4) {
        self.uploadReading.map((item, k) => {
          if (item === file) {
            self.uploadReading.splice(k, 1)
          }
        })
      }
      if (i === 5) {
        self.uploadReport.map((item, k) => {
          if (item === file) {
            self.uploadReport.splice(k, 1)
          }
        })
      }
      if (i === 6) {
        self.uploadResume.map((item, k) => {
          if (item === file) {
            self.uploadResume.splice(k, 1)
          }
        })
      }
      if (i === 7) {
        self.uploadDegree.map((item, k) => {
          if (item === file) {
            self.uploadDegree.splice(k, 1)
          }
        })
      }
      if (i === 8) {
        self.uploadProperty.map((item, k) => {
          if (item === file) {
            self.uploadProperty.splice(k, 1)
          }
        })
      }
      if (i === 9) {
        self.uploadOther.map((item, k) => {
          if (item === file) {
            self.uploadOther.splice(k, 1)
          }
        })
      }
    },
    uniq (array) {
      let temp = []
      for (let i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) === -1) {
          temp.push(array[i])
        }
      }
      return temp
    },
    // 添加推荐信
    addLetter () {
      let self = this
      let len = $('#table_letter tr').length
      self.letter.push({
        id: len,
        uploadRcmdName: '',
        uploadRcmdEmail: '',
        uploadRcmdSchool: '',
        uploadRcmdPath: ''
      })
      let obj = [
        {
          id: 'uploadRcmdId' + len,
          fid: 'uploadRcmdPath[' + len + ']'
        }
      ]
      setTimeout(function () {
        self.uploadOne(obj)
      }, 300)
    },
    // 删除推荐信
    delLetter (id) {
      for (let i = 0; i < this.letter.length; i++) {
        if (this.letter[i]['id'] === id) {
          this.letter.splice(i, 1)
        }
      }
    },
    checkShow (e) {
      let isCheck = e.currentTarget.checked
      if (isCheck) {
        $(e.currentTarget).parents('.checkbox').siblings('.clearfix').show()
      } else {
        $(e.currentTarget).parents('.checkbox').siblings('.clearfix').hide()
      }
    },
    // 设置推荐信学校加入文本框
    upReSchool (val, i) {
      let self = this
      if (self.letter[i]['uploadRcmdSchool'].indexOf(val) < 0) {
        if (self.letter[i]['uploadRcmdSchool'] === '') {
          self.letter[i]['uploadRcmdSchool'] = val
        } else {
          self.letter[i]['uploadRcmdSchool'] = self.letter[i]['uploadRcmdSchool'] + ',' + val
        }
      }
    },
    submitConfirm () {
      let self = this
      let params = new URLSearchParams()
      params.append('id', self.orderId)
      db.postRequest('Institution/Apply/verifyConfirm', params).then(res => {
        if (res.status === 1) {
          self.submitStatus = 1
        }
        self.layer.alert(res.msg, {
          shadeClose: false
        })
      })
    },
    adminSave () {
      this.$refs.admin.save()
    }
  },
  components: {
    SchoolOrMajorComponent,
    StudentComponent,
    InitApplyNav
  }
}
</script>

<style scoped lang="scss">
.thumbnail {
    & .state {
        width:30px;height:60px;display:block;overflow:hidden;background-image:url(../../../../static/images/001.png); background-repeat:no-repeat;position:absolute;right:15px;top:0;z-index:10;

        &.state1 {
            background-position:0 0;
        }

        &.state2 {
            background-position:-30px 0;
        }

        &.state3 {
            background-position:-60px 0;
        }
    }
}

.table > tbody > tr > td {
    vertical-align:top;
}
</style>
<style lang="scss">
#addApplication {
    & .form-group {margin-left:0;margin-right:0;}

    & .webuploader-pick {
        color:#fff !important;background:#428bca;padding-right:18px;height:34px;line-height:34px;width:120px !important;

        &:after {content:'';}
    }
}
</style>
