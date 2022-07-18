const state = {
	indexData:{},//主页数据
}
import request from "@/utils/request";
const mutations = {
	//设置主页数据
	setIndexData(state,indexData){
		state.indexData = indexData;
	}
}
const actions = {
	//请求获取主页数据
	async getIndexData( { commit } ){
		let result = await request("/getIndexData");
		commit("setIndexData",result);
	}
}
const getters = {
	
}
export default {
	state,
	mutations,
	actions,
	getters,
}