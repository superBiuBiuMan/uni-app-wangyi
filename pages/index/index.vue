<template>
	<view class="index-container">
		<!-- 头部 -->
		<view class="header-container">
			<image class="logo" src="../../static/images/logo.png"></image>
			<!-- 搜索框 -->
			<view class="search">
				<i class="iconfont icon-sousuo"></i>
				<input class="search-input" placeholder="搜索内容在这里" placeholder-class="search-placeholder">
			</view>
			<button class="btn">将军大人</button>
		</view>
		<!-- 头部导航 -->
		<scroll-view class="scroll-container" scroll-x="true" enable-flex >
			<view class="scroll-item" :class="{active:navIndex === -1}" @click="changNav(-1)" >
					推荐
				</view>
				<view class="scroll-item" :class="{active:navIndex === index}" @click="changNav(index)" v-for="(item,index) in kongKongList" :key="item.L1Id">
					{{item.text}}
				</view>
		</scroll-view>
		<!-- 轮播图 -->
		<Recommend></Recommend>
		
	</view>
</template>

<script>
import request from "../../utils/request";
import {mapState,mapActions} from "vuex";
// 自定义组件
import Recommend from "@/components/Recommend/Recommend.vue";
export default {
	components:{
		Recommend,
	},
	data() {
		return {
			navIndex:-1,//头部导航默认显示数据项
		};
	},
	computed:{
		//映射vuex当中数据
		...mapState({
			indexData: state => state.home.indexData,
		}),
		// 头部导航
		kongKongList(){
			//链式操作符
			return this.indexData.kingKongModule?.kingKongList;
		}
	},
	mounted(){
		//获取主页数据
		this.getIndexData();
	},
	methods:{
		// 映射vuex当中方法
		...mapActions(["getIndexData"]),
		//改变nav索引
		changNav(newIndex){
			this.navIndex = newIndex;
		},
	}
}
</script>

<style lang="stylus">
// 头部
.header-container
	display: flex
	padding: 10rpx 0 
	.logo
		width: 140rpx
		height: 40rpx
		margin: 10rpx 20rpx
	.search
		width: 420rpx
		height: 60rpx
		background: #eee
		position: relative
		.iconfont
			position: absolute
			left: 10rpx
			font-size: 30rpx
			top: 17rpx
		.search-input
			width: 370rpx
			margin-left: 50rpx
			height: 60rpx
			box-sizing: border-box
			.search-placeholder
				font-size: 26rpx
	.btn
		width: 144rpx
		height: 60rpx
		font-size: 24rpx
		padding: 0 4rpx
		margin: 0 4rpx


//防止折叠
//头部导航
// 头部导航
.scroll-container
	white-space: nowrap
	.scroll-item
		display: inline-block
		width: 140rpx
		height: 80rpx
		line-height: 80rpx
		text-align: center
		font-size: 26rpx
		&.active
			border-bottom: 1rpx solid #bb2c08
.test{
	font-size: 0
}
</style>
