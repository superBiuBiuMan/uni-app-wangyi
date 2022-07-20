<template>
	<view class="category-container">
			<!-- 头部搜索区 -->
			<view class="search-wrapper">
					<view class="search">搜索商品</view>
			</view>
			<!-- 内容展示区 -->
			<view class="show-wrapper">
				<!-- 左侧导航 -->
				<view class="left-wrapper">
					<scroll-view class="item-list" enable-flex scroll-y >
						<view
							class="item"
							:class="{active:navIndex === index}"
							v-for="(item,index) in categoryList"
							:key="item.id" @click="changNavIndex(index)">
							<text class="item-title">{{item.name}}</text>
						</view>
					</scroll-view>
				</view>
				<!-- 右侧数据展示 -->
				<view class="right-wrapper">
					<scroll-view class="item-list" enable-flex scroll-y="true">
						<image class="item-image" :src="navIndexData.imgUrl"></image>
						<!-- 图片文字数据 -->
						<view class="item-wrapper">
							<view class="item" v-for="item in navIndexData.subCateList" :key="item.id">
								<image class="item-pic" :src="item.wapBannerUrl"></image>
								<text class="item-title">{{item.name}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";
	export default {
		data() {
			return {
				categoryList:{},//分类页数据
				navIndex:0,//左侧导航的数据
			};
		},
		computed:{
			//对应的导航对应的显示数据
			navIndexData(){
				return this.categoryList[this.navIndex];
			}
		},
		mounted(){
			//获取分类页数据
			this.getCategoryData();
		},
		methods:{
			//改变NavIndex
			changNavIndex(newIndex){
					this.navIndex = newIndex;
			},
			//请求分类页数据
			async getCategoryData(){
				//发送
				let result = await request("/getCategoryData");
				this.categoryList = result;
			}
		}
	}
</script>

<style lang="stylus">
.category-container
	// 搜索框
	.search-wrapper
		padding: 10rpx 0
		.search
			height: 60rpx
			line-height: 60rpx
			width: 92%
			background-color: #eee
			font-size: 28rpx
			text-align: center
			// view容器居中
			margin: 0 auto
			border-radius: 8rpx





	//内容展示
	.show-wrapper
		width: 100%
		display: flex
		border-top: 1rpx solid #eee
		font-size: 28rpx
		text-align: center
		// 左侧
		.left-wrapper
			border-right: 1rpx solid #eee
			width: 20%
			.item-list
				display: flex
				flex-direction: column
				//动态计算高度
				height: calc(100vh - 82rpx);
				.item
					height: 80rpx
					line-height: 80rpx
					position: relative
					&.active:before
						position: absolute
						left: 4rpx
						top: 10rpx
						content: ""
						width: 4rpx
						height: 60rpx
						background-color: #be3f13
		// 右侧
		.right-wrapper
			width: 80%
			.item-list
				//动态计算高度
				height: calc(100vh - 82rpx);
				.item-image
					width: 530rpx
					height: 190rpx
					margin: 10rpx auto
					display: block
				.item-wrapper
					display: flex
					flex-wrap: wrap
					.item
						width: 33.333%
						// 图片
						.item-pic
							height: 144rpx
							width: 90%
						// 文字
						.item-title
							font-size: 24rpx
.text
	font-size: 0
</style>
