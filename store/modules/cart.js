import Vue from "vue";
const state = {
	//购物车数据记得要手动添加isSelect和amount的字段
	cartData:[],
}
const mutations = {
	//添加到购物车
	addToCartData(state,shopItem){
		//1.如果cartData当中数据已经存在,那么对应的视频数量就+1
		//2.如果不存在,则push进去,并添加'isSelect' 和 'amount'字段
		let searchResultItem = state.cartData.find(item => item.id === shopItem.id);
		console.log(searchResultItem);
		if(searchResultItem){
			console.log("执行商品数量+1");
			//商品数据存在
			searchResultItem.amount+=1;//数量+1
		}else{
			//数据不存在
			//先添加字段并设置为响应式字段
			Vue.set(shopItem,"isSelect",true);//设置默认选中
			Vue.set(shopItem,"amount",1);//数量默认设置为1
			state.cartData.push(shopItem);
		}
		
	},
	//修改选中的状态
	changSelect(state,index){
		state.cartData[index].isSelect = !state.cartData[index].isSelect;
	},
	//修改购物车的商品的数量
	changAmount(state,{isAdd,index}){
		if(isAdd){
			//为增加
			state.cartData[index].amount++;
		}else{
			//为减少
			if(state.cartData[index].amount>1){
				state.cartData[index].amount--;
			}else{
				//询问是否删除
				wx.showModal({
					content:"是否删除该商品?",
					success(res){
						if(res.confirm){
							//为确认,则操作删除
							state.cartData.splice(index,1);
						}
					},
				})
			}
		}
	},
	//全选/全不选
	changeSelectAll(state,isSelectAll){
		if(isSelectAll){
			//全选
			state.cartData.forEach(item=>item.isSelect = true);
		}else{
			//全不选
			state.cartData.forEach(item=>item.isSelect = false);
		}
	},
}
const actions = {
	
}
const getters = {
	// 商品总数目
	selectCount(state){
		return state.cartData.reduce((prev,item)=>{
			return prev+=(item.isSelect?item.amount:0);
		},0)
	},
	//计算是否全部选中
	isAllSelect(state){
		return state.cartData.every(item => item.isSelect)
	},
	//计算商品总价格
	totalMoney(state){
		return state.cartData.reduce((prev,item)=>{
				return prev+=(item.isSelect ? item.amount * item.retailPrice : 0 );
		},0)
	},
}
export default {
	state,
	mutations,
	actions,
	getters,
}