<template>
    <div>
        <HeaderNav :id="id" :studentId="studentId" :educationType="educationType" :tabStatus="tabStatus"></HeaderNav>
        <div v-if="loading" v-html="LoadingImg"></div>
        <div v-if="!loading">
            <form action="" method="POST" class="form-horizontal" id="addApply" @submit.prevent="validateBeforeSubmit">
                <input type="hidden" name="id" id="id" :value="id" v-if="id!==''"/>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>姓名 <font class="cf00">*</font></label>
                                <input type="text" name="full_name" class="form-control"
                                       placeholder="请输入中文姓名，如：李雷" v-validate="'required|zh'" data-vv-as="姓名"
                                       v-model="personal.full_name">
                                <div class="validateTip" v-show="errors.has('full_name')">
                                    {{ errors.first("full_name") }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>姓(拼音) <font class="cf00">*</font></label>
                                <input type="text" name="last_name" class="form-control"
                                       placeholder="请输入姓的拼音，如：Li" v-validate="'required|en'" data-vv-as="姓(拼音)"
                                       v-model="personal.last_name">
                                <div class="validateTip" v-show="errors.has('last_name')">
                                    {{ errors.first("last_name") }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>名(拼音) <font class="cf00">*</font></label>
                                <input type="text" name="first_name" class="form-control"
                                       placeholder="请输入名的拼音，如：Lei" v-validate="'required|en'"
                                       data-vv-as="名(拼音)" v-model="personal.first_name">
                                <div class="validateTip" v-show="errors.has('first_name')">
                                    {{ errors.first("first_name") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="pr-15">
                                        <div class="form-group">
                                            <label>曾用名</label>
                                            <select name="is_old_name" class="form-control selectpicker"
                                                    v-model.number="personal.is_old_name">
                                                <option value="0">否</option>
                                                <option value="1">是</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                     v-if="personal.is_old_name === 1">
                                    <div class="pl-15">
                                        <div class="form-group">
                                            <label>&nbsp;</label>
                                            <input type="text" name="old_name" class="form-control"
                                                   placeholder="请输入曾用名拼音" v-validate="'required|en'"
                                                   data-vv-as="曾用名" v-model="personal.old_name">
                                            <div class="validateTip" v-show="errors.has('old_name')">
                                                {{ errors.first("old_name") }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>性别 <font class="cf00">*</font></label>
                                <div class="checkbox">
                                    <label for="sex1">
                                        <input type="radio" name="sex" id="sex1" value="1"
                                               v-model="personal.sex"> 男
                                    </label>
                                    <label for="sex2">
                                        <input type="radio" name="sex" id="sex2" value="2"
                                               v-model="personal.sex"> 女
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>婚姻状态 <font class="cf00">*</font></label>
                                <div class="checkbox">
                                    <label>
                                        <input type="radio" name="is_married" value="1"
                                               v-model.number="personal.is_married"> 已婚
                                    </label>
                                    <label>
                                        <input type="radio" name="is_married" value="2"
                                               v-model.number="personal.is_married"> 未婚
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>出生日期 <font class="cf00">*</font></label>
                                <input type="text" name="birthday" class="form-control times"
                                       placeholder="请选择您的出生日期"
                                       v-validate="'required|date_format:yyyy-MM-dd'" data-vv-as="出生日期"
                                       v-model="personal.birthday">
                                <div class="validateTip" v-show="errors.has('birthday')">
                                    {{ errors.first("birthday") }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>邮箱 <font class="cf00">*</font></label>
                                <input type="text" name="email" class="form-control" placeholder="请输入您的邮箱"
                                       v-validate="'required|email'" v-model="personal.email">
                                <div class="validateTip" v-show="errors.has('email')">
                                    {{ errors.first("email") }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>移动电话 <font class="cf00">*</font></label>
                                <input type="text" name="phone" class="form-control" placeholder="请输入您的联系电话"
                                       v-validate="'required|mobile'" v-model="personal.phone">
                                <div class="validateTip" v-show="errors.has('phone')">
                                    {{ errors.first("phone") }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>国籍 <font class="cf00">*</font></label>
                                <select name="nationality" class="form-control selectpicker" data-live-search="true" data-size="10"
                                        v-validate="'required'"
                                        data-vv-as="国籍" v-model="personal.nationality">
                                    <option value="">请选择</option>
                                    <option :value="item.id" v-for="(item,i) in nation" :key="i">
                                        {{item.cn}}
                                    </option>
                                </select>
                                <div class="validateTip" v-show="errors.has('nationality')">
                                    {{ errors.first("nationality") }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>护照号 <font class="cf00">*</font></label>
                                <input type="text" name="passport_id" class="form-control" placeholder="请输入护照号"
                                       v-validate="'required|pa'" data-vv-as="护照号"
                                       v-model="personal.passport_id">
                                <div class="validateTip" v-show="errors.has('passport_id')">
                                    {{ errors.first("passport_id") }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>出生地 <font class="cf00">*</font></label>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 bornArea">
                                        <CitySelect :p="personal.birth_province"
                                                    :c="personal.birth_city"
                                                    pName="birth_province"
                                                    cName="birth_city"
                                                    :aDisplay="false"
                                                    @cityCallback="cityCallback"/>

                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <input type="hidden" name="birth_province_code"
                                               v-model="personal.birth_province"
                                               v-validate="'required'"
                                               data-vv-as="出生省份"/>
                                        <div class="validateTip" v-show="errors.has('birth_province_code')">
                                            {{ errors.first("birth_province_code") }}
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <input type="hidden" name="birth_city_code"
                                               v-model="personal.birth_city"
                                               v-validate="'required'"
                                               data-vv-as="出生市区"/>
                                        <div class="validateTip" v-show="errors.has('birth_city_code')">
                                            {{ errors.first("birth_city_code") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clearfix lh34">
                    <b class="font14">擅长语言</b>
                    <font class="cf00">*</font>
                    <span>熟练程度（多选）</span>
                </div>

                <div class="clearfix" v-for="(item,i) in personal.language" :key="i">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="form-group">
                            <select :name="'language[name]['+i+']'" class="form-control selectpicker"
                                    v-validate="'required'"
                                    data-vv-as="语言" v-model="item.name" data-size="10" data-live-search="true">
                                <option value="">请选择</option>
                                <option :value="items.id" v-for="(items,k) in lang" :key="k">
                                    {{items.cn}}
                                </option>
                            </select>
                            <div class="validateTip" v-show="errors.has('language[name]['+i+']')">
                                {{ errors.first("language[name]["+i+"]") }}
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <div class="checkbox pull-left">
                            <label>
                                <input type="checkbox" :name="'language[type][' + i + '][]'" value="母语"
                                       v-model="item.type"> 母语
                            </label>
                            <label>
                                <input type="checkbox" :name="'language[type][' + i + '][]'" value="精通口语"
                                       v-model="item.type"> 精通口语
                            </label>
                            <label>
                                <input type="checkbox" :name="'language[type][' + i + '][]'" value="精通写作"
                                       v-model="item.type"> 精通写作
                            </label>
                            <label>
                                <input type="checkbox" :name="'language[type][' + i + '][]'" value="精通阅读"
                                       v-model="item.type"> 精通阅读
                            </label>
                            <label>
                                <input type="checkbox" :name="'language[type][' + i + '][]'" value="家庭用语"
                                       v-model="item.type"> 家庭用语
                            </label>
                        </div>
                        <div class="pull-right">
                            <i class="iconfont handPower lh34 cded" v-if="i === 0" @click="addLanguage()">&#xe622;</i>
                            <i class="iconfont handPower lh34 cf00" v-if="i !== 0"
                               @click="delLanguage(i)">&#xe61f5;</i>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>详细地址 <font class="cf00">*</font></label>
                            <div class="row form-inline">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 addressInline">

                                    <CitySelect :p="personal.address_province"
                                                :c="personal.address_city"
                                                :a="personal.address_area"
                                                pName="address_province"
                                                cName="address_city"
                                                aName="address_area"
                                                @cityCallback="cityCallback1"/>

                                    <input type="hidden" name="address_province_code"
                                           v-model="personal.address_province"
                                           v-validate="'required'" data-vv-as="省"/>
                                    <input type="hidden" name="address_city_code"
                                           v-model="personal.address_city"
                                           v-validate="'required'" data-vv-as="市"/>
                                    <input type="hidden" name="address_area_code"
                                           v-model="personal.address_area"
                                           v-validate="'required'" data-vv-as="区"/>
                                    <input type="text" name="address_detail" class="form-control"
                                           style="min-width:260px;" v-validate="'required'"
                                           data-vv-as="详细地址" placeholder="请用拼音填写详细地址"
                                           v-model="personal.address_detail">
                                    <div class="clearfix">
                                        <div class="validateTip" v-show="errors.has('address_province_code')">
                                            {{ errors.first("address_province_code") }}
                                        </div>
                                        <div class="validateTip" v-show="errors.has('address_city_code')">
                                            {{ errors.first("address_city_code") }}
                                        </div>
                                        <div class="validateTip" v-show="errors.has('address_area_code')">
                                            {{ errors.first("address_area_code") }}
                                        </div>
                                        <div class="validateTip" v-show="errors.has('address_detail')">
                                            {{ errors.first("address_detail") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>永久居住地</label>
                            <div class="checkbox" style="display:inline-block;">
                                <label>
                                    <input type="checkbox" name="live_not_same" data-obj="personal"
                                           data-name="live_not_same"
                                           v-model="personal.live_not_same">
                                    与邮寄地址不一致
                                </label>
                            </div>
                            <div class="row form-inline" v-if="personal.live_not_same">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 addressInline">

                                    <CitySelect :p="personal.live_province"
                                                :c="personal.live_city"
                                                :a="personal.live_area"
                                                pName="live_province"
                                                cName="live_city"
                                                aName="live_area"
                                                @cityCallback="cityCallback2"/>

                                    <input type="hidden" name="live_province_code"
                                           v-model="personal.live_province"
                                           v-validate="'required'" data-vv-as="省"/>
                                    <input type="hidden" name="live_city_code" v-model="personal.live_city"
                                           v-validate="'required'" data-vv-as="市"/>
                                    <input type="hidden" name="live_area_code" v-model="personal.live_area"
                                           v-validate="'required'" data-vv-as="区"/>

                                    <input type="text" name="live_detail" class="form-control"
                                           style="min-width:260px;" v-validate="'required'"
                                           data-vv-as="详细地址" placeholder="请用拼音填写详细地址"
                                           v-model="personal.live_detail">
                                    <div class="clearfix">
                                        <div class="validateTip" v-show="errors.has('live_province_code')">
                                            {{ errors.first("live_province_code") }}
                                        </div>
                                        <div class="validateTip" v-show="errors.has('live_city_code')">
                                            {{ errors.first("live_city_code") }}
                                        </div>
                                        <div class="validateTip" v-show="errors.has('live_area_code')">
                                            {{ errors.first("live_area_code") }}
                                        </div>
                                        <div class="validateTip" v-show="errors.has('live_detail')">
                                            {{ errors.first("live_detail") }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>我在美国/英国/加拿大/澳洲居住过</label>
                            <div class="checkbox" style="display:inline-block;">
                                <label>
                                    <input type="checkbox" name="foreign_live_is" data-obj="personal"
                                           data-name="foreign_live_is"
                                           v-model="personal.foreign_live_is">&nbsp;
                                </label>
                            </div>
                            <div class="row" v-if="personal.foreign_live_is">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>国家</label>
                                            <select name="foreign_live_country"
                                                    class="form-control selectpicker" data-live-search="true" data-size="15"
                                                    v-model="personal.foreign_live_country">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="(item,i) in nation" :key="i">
                                                    {{item.cn}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>居住时长</label>
                                            <select name="foreign_live_time" class="form-control selectpicker"
                                                    v-model="personal.foreign_live_time">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="(item,i) in liveTime" :key="i">
                                                    {{item.cn}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>居住原因</label>
                                            <input type="text" name="foreign_live_reason" class="form-control"
                                                   placeholder="请用英文填写居住原因"
                                                   v-model="personal.foreign_live_reason">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>我有美国/英国/加拿大/澳洲的身份</label>
                            <div class="checkbox" style="display:inline-block;">
                                <label>
                                    <input type="checkbox" name="foreign_identity_is"
                                           data-obj="personal" data-name="foreign_identity_is"
                                           v-model="personal.foreign_identity_is">&nbsp;
                                </label>
                            </div>
                            <div class="row" v-if="personal.foreign_identity_is">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>国家</label>
                                            <select name="foreign_identity_country"
                                                    class="form-control selectpicker" data-live-search="true" data-size="15"
                                                    v-model="personal.foreign_identity_country">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="(item,i) in nation" :key="i">
                                                    {{item.cn}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>身份类型</label>
                                            <select name="foreign_identity_type"
                                                    class="form-control selectpicker"
                                                    v-model="personal.foreign_identity_type">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="(item,i) in idType" :key="i">
                                                    {{item.cn}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>证件ID</label>
                                            <input type="text" name="foreign_identity_id" class="form-control"
                                                   placeholder="请输入证件ID"
                                                   v-model="personal.foreign_identity_id">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>我有双重国籍</label>
                            <div class="checkbox" style="display:inline-block;">
                                <label>
                                    <input type="checkbox" name="dual_nationality_is"
                                           data-obj="personal" data-name="dual_nationality_is"
                                           v-model="personal.dual_nationality_is">&nbsp;
                                </label>
                            </div>
                            <div class="row" v-if="personal.dual_nationality_is">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>国家</label>
                                            <select name="dual_nationality_country"
                                                    class="form-control selectpicker" data-live-search="true" data-size="15"
                                                    v-model="personal.dual_nationality_country">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="(item,i) in nation" :key="i">
                                                    {{item.cn}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>证件ID</label>
                                            <input type="text" name="dual_nationality_id" class="form-control"
                                                   placeholder="请输入证件ID"
                                                   v-model="personal.dual_nationality_id">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>我有美国/英国/加拿大/澳洲的签证</label>
                            <div class="checkbox" style="display:inline-block;">
                                <label>
                                    <input type="checkbox" name="visa_is" data-obj="personal"
                                           data-name="visa_is"
                                           v-model="personal.visa_is"
                                           @change="showTimes()">&nbsp;
                                </label>
                            </div>
                            <div class="clearfix" v-if="personal.visa_is">
                                <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>国家</label>
                                                <select name="visa_country" class="form-control selectpicker"
                                                        v-model.number="personal.visa_country"
                                                        @change="RefreshSelect()">
                                                    <option value="">请选择</option>
                                                    <option value="7">澳大利亚</option>
                                                    <option value="27">加拿大</option>
                                                    <option value="163">英国</option>
                                                    <option value="164">美国</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>签证类型</label>
                                                <select name="visa_type" class="form-control selectpicker"
                                                        v-model="personal.visa_type">
                                                    <option value="">请选择</option>
                                                    <option :value="item.val"
                                                            v-for="(item,i) in visaType[personal.visa_country]" :key="i">
                                                        {{item.txt}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>签证号</label>
                                                <input type="text" name="visa_id" class="form-control"
                                                       placeholder="请输入签证号" v-model="personal.visa_id">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>保证方</label>
                                                <input type="text" name="visa_guarantor" class="form-control"
                                                       placeholder="请输入保证方"
                                                       v-model="personal.visa_guarantor">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>签证发放时间</label>
                                                <input type="text" name="visa_time" class="form-control times"
                                                       placeholder="请选择" v-model="personal.visa_time">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label>工作背景</label>
                            <div class="checkbox" style="display:inline-block;">
                                <label>
                                    <input type="checkbox" name="is_work_exp" data-obj="personal"
                                           data-name="is_work_exp"
                                           v-model="personal.is_work_exp"
                                           @change="showTimes()">
                                    我有工作经验(包含实习/兼职/全职)
                                </label>
                            </div>

                            <div class="clearfix" v-if="personal.is_work_exp">
                                <div class="clearfix WorkExpList"
                                     v-for="(item,i) in personal.work_experience" :key="i" :data-id="i">
                                    <div class="clearfix lh34 bdb mb-15">
                                        <b class="pull-left">工作背景({{i+1}})</b>
                                        <a href="javascript:void(0);" class="pull-right cf00 lh34"
                                           v-if="i>0" @click="delWorkExp(i)">删除</a>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>岗位名称</label>
                                                    <input type="text" :name="'work_exp[jobs]['+i+']'"
                                                           class="form-control"
                                                           placeholder="请用英文输入岗位全称，如：Accountant"
                                                           v-validate="'required|alpha'" data-vv-as="岗位全称"
                                                           v-model="item.jobs">

                                                    <div class="validateTip"
                                                         v-show='errors.has("work_exp[jobs]["+i+"]")'>
                                                        {{ errors.first("work_exp[jobs]["+i+"]") }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>工作类型</label>
                                                    <select :name="'work_exp[type]['+i+']'"
                                                            class="form-control selectpicker"
                                                            v-validate="'required'" data-vv-as="工作类型"
                                                            v-model="item.type">
                                                        <option value="">请选择</option>
                                                        <option :value="items.en" v-for="(items,k) in workType" :key="k">
                                                            {{items.cn}}
                                                        </option>
                                                    </select>
                                                    <div class="validateTip"
                                                         v-show='errors.has("work_exp[type]["+i+"]")'>
                                                        {{ errors.first("work_exp[type]["+i+"]") }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>工作性质</label>
                                                    <select :name="'work_exp[nature]['+i+']'"
                                                            class="form-control selectpicker"
                                                            v-validate="'required'" data-vv-as="工作性质"
                                                            v-model="item.nature">
                                                        <option value="">请选择</option>
                                                        <option :value="items.en" v-for="(items,k) in workNature" :key="k">
                                                            {{items.cn}}
                                                        </option>
                                                    </select>
                                                    <div class="validateTip"
                                                         v-show='errors.has("work_exp[nature]["+i+"]")'>
                                                        {{ errors.first("work_exp[nature]["+i+"]") }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>在职状态</label>
                                                    <div class="checkbox">
                                                        <label style="padding-left:0;">
                                                            <input type="radio"
                                                                   :name="'work_exp[status]['+i+']'"
                                                                   value="employed"
                                                                   v-model="item.status"> 在职
                                                        </label>
                                                        <label>
                                                            <input type="radio"
                                                                   :name="'work_exp[status]['+i+']'"
                                                                   value="unemployed"
                                                                   v-model="item.status"> 离职
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>单位名称</label>
                                                    <input type="text" :name="'work_exp[name]['+i+']'"
                                                           class="form-control"
                                                           placeholder="请用英文或拼音输入单位名称"
                                                           v-validate="'required|ens'"
                                                           data-vv-as="单位名称" v-model="item.name">
                                                    <div class="validateTip"
                                                         v-show='errors.has("work_exp[name]["+i+"]")'>
                                                        {{ errors.first("work_exp[name]["+i+"]") }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>就职起止时间</label>
                                                    <input type="text" :name="'work_exp[time]['+i+']'"
                                                           class="form-control month"
                                                           placeholder="请选择就职起止时间" v-validate="'required'"
                                                           data-vv-as="就职起止时间" v-model="item.time">
                                                    <div class="validateTip"
                                                         v-show='errors.has("work_exp[time]["+i+"]")'>
                                                        {{ errors.first("work_exp[time]["+i+"]") }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>单位所在地</label>
                                                    <div class="row">
                                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 bornArea">
                                                            <CitySelect :p="item.prov"
                                                                        :c="item.city"
                                                                        :pName="'work_exp[prov]['+i+']'"
                                                                        :cName="'work_exp[city]['+i+']'"
                                                                        :aDisplay="false"
                                                                        @cityCallback="cityCallback3"/>
                                                            <input type="hidden"
                                                                   :name="'work_exp[prov_code]['+i+']'"
                                                                   v-model="item.prov" v-validate="'required'"
                                                                   data-vv-as="单位所在省"/>
                                                            <input type="hidden"
                                                                   :name="'work_exp[city_code]['+i+']'"
                                                                   v-model="item.city" v-validate="'required'"
                                                                   data-vv-as="单位所在市"/>
                                                            <div class="validateTip"
                                                                 v-show='errors.has("work_exp[prov_code]["+i+"]")'>
                                                                {{ errors.first("work_exp[prov_code]["+i+"]") }}
                                                            </div>
                                                            <div class="validateTip"
                                                                 v-show='errors.has("work_exp[city_code]["+i+"]")'>
                                                                {{ errors.first("work_exp[city_code]["+i+"]") }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>工作时长</label>
                                                    <div class="row">
                                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div class="input-group">
                                                                <input type="text"
                                                                       :name="'work_exp[hours]['+i+']'"
                                                                       class="form-control" placeholder="请输入"
                                                                       aria-describedby="basic-addon1"
                                                                       v-validate="'required|integer'"
                                                                       data-vv-as="小时" v-model="item.hours">
                                                                <span class="input-group-addon"
                                                                      id="basic-addon1">小时/周</span>
                                                            </div>
                                                            <div class="validateTip"
                                                                 v-show='errors.has("work_exp[hours]["+i+"]")'>
                                                                {{ errors.first("work_exp[hours]["+i+"]") }}
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div class="input-group">
                                                                <input type="text"
                                                                       :name="'work_exp[weeks]['+i+']'"
                                                                       class="form-control" placeholder="请输入"
                                                                       aria-describedby="basic-addon1"
                                                                       v-validate="'required|integer'"
                                                                       data-vv-as="周" v-model="item.weeks">
                                                                <span class="input-group-addon"
                                                                      id="basic-addon2">共几周</span>
                                                            </div>
                                                            <div class="validateTip"
                                                                 v-show='errors.has("work_exp[weeks]["+i+"]")'>
                                                                {{ errors.first("work_exp[weeks]["+i+"]") }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix">
                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <div class="form-group">
                                                <label>职业概述</label>
                                                <textarea :name="'work_exp[describe]['+i+']'"
                                                          class="form-control"
                                                          placeholder="请用英文输入职位概述"
                                                          v-validate="'required|ens'"
                                                          data-vv-as="职业概述"
                                                          v-model="item.describe"></textarea>
                                                <div class="validateTip"
                                                     v-show='errors.has("work_exp[describe]["+i+"]")'>
                                                    {{ errors.first("work_exp[describe]["+i+"]") }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="clearfix text-right lh34">
                                    <a href="javascript:void(0);" class="cded" @click="addWorkExp">+
                                        继续添加工作经验</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix text-center pt-35 pb-15">
                    <button type="submit" class="btn btn-primary btn-lg" style="width:200px;">下一页</button>
                    <button type="button" class="btn btn-outline-primary btn-lg ml-20" style="width:200px;" @click="saveCurrent">保存</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'
import lang from '@@/json/language'
import nation from '@@/json/nation'
import liveTime from '@@/json/liveTime'
import idType from '@@/json/idType'
import visaType from '@@/json/visaType'
import workType from '@@/json/workType'
import workNature from '@@/json/workNature'
import HeaderNav from '@#/functions/applyInfo/HeaderNav'
import FamilyComponent from '@#/functions/applyInfo/FamilyComponent'
import UEducationComponent from '@#/functions/applyInfo/UEducationComponent'
import MEducationComponent from '@#/functions/applyInfo/MEducationComponent'
import ExamComponent from '@#/functions/applyInfo/ExamComponent'
import CitySelect from '@#/shared/CitySelect'
import '@~/js/VeeValidateConfig'
import store from '@/vuex/Store'
import db from '@~/js/request'
require('icheck')

export default {
  name: 'detail',
  store,
  data () {
    return {
      id: '',
      tabStatus: [0, 0, 0, 0],
      loading: true,
      studentId: '',
      studentNumber: '',
      lang: lang, // 语言JSON
      nation: nation, // 国家
      liveTime: liveTime, // 居住时长
      idType: idType, // 身份类型
      visaType: visaType, // 签证类型
      workType: workType, // 工作类型
      workNature: workNature, // 工作性质
      EducationComponent: UEducationComponent,
      educationType: 1,
      personal: {
        sex: 1,
        is_married: 2,
        is_old_name: 0,
        is_work_exp: '',
        live_not_same: '',
        foreign_live_is: '',
        foreign_identity_is: '',
        dual_nationality_is: '',
        birth_province: '',
        birth_city: '',
        visa_is: '',
        full_name: '',
        last_name: '',
        first_name: '',
        birthday: '',
        email: '',
        phone: '',
        nationality: '',
        passport_id: '',
        language: [{name: '', type: []}],
        foreign_live_country: '',
        foreign_live_time: '',
        foreign_identity_country: '',
        foreign_identity_type: '',
        dual_nationality_country: '',
        visa_country: '',
        visa_type: '',
        work_experience: [{
          jobs: '',
          type: '',
          nature: '',
          status: 'employed',
          name: '',
          time: '',
          prov: '',
          city: '',
          hours: '',
          weeks: '',
          describe: ''
        }]
      }
    }
  },
  mounted () {
    let self = this
    let id = parseInt(self.$route.query.id) || ''
    if (id === '' || Math.floor(id) !== id) {
      self.layer.alert('非法操作', {icon: 2})
      return false
    }
    self.$nextTick(() => {
      self.showTimes()
      // *******************************
      if (id !== undefined) {
        self.id = id
        self.getStudentInfo(id)
      } else {
        self.loading = false
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh')
          self.setIcheck()
        }, 1000)
      }
    })
  },
  methods: {
    // 显示日期
    showTimes () {
      let self = this
      setTimeout(function () {
        $('#addApply .times').each(function (index, element) {
          let names = element.name
          self.laydate.render({
            elem: this,
            done (v) {
              self.personal[names] = v
            }
          })
        })
        $('#addApply .month').each(function (index, element) {
          self.laydate.render({
            elem: this,
            range: true,
            done (value) {
              self.personal.work_experience[index]['time'] = value
            }
          })
        })
      }, 1500)
    },
    // 如果是修改,获取数据信息
    getStudentInfo (id) {
      let self = this
      let params = new URLSearchParams()
      self.loading = true
      params.append('id', id)
      db.getRequest('/Institution/ApplyMaterial/editPersonal', params).then(res => {
        if (res.status === 1) {
          self.personal = res.data
          self.educationType = res.data.education_type
          self.studentId = res.data.student_id
          self.studentNumber = res.data.student_number
          self.tabStatus = res.data.tab_status
        } else {
          console.log(res.msg)
        }
        self.loading = false
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh')
          self.setIcheck()
        }, 1000)
      })
    },
    // 获取学生ID
    getStudent (obj) {
      this.studentId = obj.id
      this.studentNumber = obj.name + '(' + obj.number + ')'
    },
    validateBeforeSubmit () {
      let self = this
      if (self.studentId === '') {
        self.layer.alert('请先关联学生', {
          icon: 2
        })
        return false
      }
      let formData = $('#addApply').serializeArray()
      let params = new URLSearchParams()
      params.append('student_id', self.studentId)
      for (let i = 0; i < formData.length; i++) {
        params.append(formData[i]['name'], formData[i]['value'])
      }
      params.append('verify', 1)
      self.$validator.validateAll().then((result) => {
        if (result) {
          db.postRequest('/Institution/ApplyMaterial/savePersonal', params).then(res => {
            if (res.status === 1) {
              self.$router.push('/functions/applyInfo/family?id=' + self.id)
            } else {
              self.layer.alert(res.msg)
            }
          })
        } else {
          self.layer.alert('信息没有填写完整！', {icon: 2})
        }
      })
    },
    // 下一页保存
    saveCurrent () {
      let self = this
      if (self.studentNumber === '' && self.studentId === '') {
        self.layer.alert('请先关联学生', {icon: 2})
        return false
      }
      if (self.educationType === '') {
        self.layer.alert('请选择申报类型', {icon: 2})
        return false
      }
      let formData = $('#addApply').serializeArray()
      let params = new URLSearchParams()
      formData.map(item => {
        params.append(item.name, item.value)
      })
      db.postRequest('/Institution/ApplyMaterial/savePersonal', params).then(res => {
        if (res.status === 1) {
          self.layer.alert(res.msg, {icon: 1}, function (i) {
            self.layer.close(i)
          })
        } else {
          self.layer.alert(res.msg, {icon: 2})
        }
      })
    },
    // 添加语言*******************************
    addLanguage () {
      this.personal.language.push({name: ''})
      this.RefreshSelect()
      this.setIcheck()
    },
    // 删除语言
    delLanguage (i) {
      this.personal.language.splice(i, 1)
    },
    // 添加工作背景
    addWorkExp () {
      let self = this
      self.personal.work_experience.push({
        jobs: '',
        type: '',
        nature: '',
        status: 'employed',
        name: '',
        time: '',
        prov: '',
        city: '',
        hours: '',
        weeks: '',
        describe: ''
      })
      self.showTimes()
      self.RefreshSelect()
    },
    // 删除工作背景
    delWorkExp (i) {
      this.personal.work_experience.splice(i, 1)
    },
    RefreshSelect () {
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh')
      }, 200)
    },
    // 回调省市区 -出生日期
    cityCallback (data) {
      this.personal.birth_province = data.province
      this.personal.birth_city = data.city
    },
    // 回调省市区 -详细地址
    cityCallback1 (data) {
      this.personal.address_province = data.province
      this.personal.address_city = data.city
      this.personal.address_area = data.area
    },
    // 回调省市区 -永久居住地
    cityCallback2 (data) {
      this.personal.live_province = data.province
      this.personal.live_city = data.city
      this.personal.live_area = data.area
    },
    cityCallback3 (data) {
      let i = parseInt($(event.target).parents('.WorkExpList').attr('data-id'))
      this.personal.work_experience[i].prov = data.province
      this.personal.work_experience[i].city = data.city
    },
    // 设置单、多选样式
    setIcheck () {
      let self = this
      setTimeout(function () {
        $('#addApply [type="checkbox"]').each(function () {
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
              self.showTimes()
            }
            if (thisName === 'is_work_exp') {
              self.setIcheck()
            }
          })
        })
        $('#addApply [type="radio"]').each(function () {
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
    HeaderNav,
    FamilyComponent,
    UEducationComponent,
    MEducationComponent,
    ExamComponent,
    CitySelect
  }
}
</script>

<style lang="scss">
    #addApply {
        & .bornArea {
            & .form-inline {
                & .bootstrap-select {
                    width:48% !important;
                }
            }

        }

        & .addressInline {
            & .form-inline {display:inline-block !important;}
        }
    }

</style>
