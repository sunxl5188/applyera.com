import Vue from "vue"
import Vuex from "vuex"
import Cookies from "vue-cookies"

Vue.use(Vuex)

//state访问状态对象
const state = {
	userInfo: {},
	isLogin: 0,
	token: "",
	msgNum: 0
}
//Mutations修改状态
const mutations = {
	//登录后保存状态
	setUserInfo (state, data) {
		Cookies.set("userInfo", data, data.date)
		Cookies.set("token", data.token, data.date)
		Cookies.set("isLogin", 1, data.date)
		state.userInfo = data
		state.isLogin = 1
		state.token = data.token
	},
	//用户退出登录
	userOut (state) {
		sessionStorage.removeItem("nav")
		sessionStorage.removeItem("navArr")

		Cookies.remove("userInfo")
		Cookies.remove("token")
		Cookies.remove("isLogin")

		state.userInfo = ""
		state.token = ""
		state.isLogin = 0
		state.msgNum = ""
	},
	// 更新消信息条数
	uploadMsg(state, number){
		state.msgNum = number
	}
}
//getters计算过滤操作
const getters = {
	//判断用户是否登录
	checkLogin (state) {
		let isLogin = Cookies.get("isLogin")
		let userInfo = Cookies.get("userInfo")
		let token = Cookies.get("token")
		let msgNum = Cookies.get("msgNum")

		if (isLogin === "1") {
			state.userInfo = userInfo
			state.token = token
			state.isLogin = 1
			state.msgNum = msgNum
		}
		if (isLogin === "0") {
			state.userInfo = ""
			state.token = ""
			state.isLogin = 0
			state.msgNum = ""
		}
		return state.isLogin
	}
}
//actions异步修改状态
const actions = {
	// 用户登录
	login (context, data) {
		context.commit("setUserInfo", data)
	},
	// 退出登录
	logOut (context) {
		context.commit("userOut")
	}
}

/*
//module模块组
const moduleA = {
    state, mutations, getters, actions
}

export default new Vuex.Store({
    modules:{ma:moduleA}
})*/

export default new Vuex.Store({
	state, mutations, getters, actions
})
