<template>
	<view class="cate-list">
		<!-- 轮播图 -->
		<swiper class="swiper-wrapper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="bannerItem in showListData.category.bannerUrlList" :key="bannerItem">
				<view>
						<image class="swiper-pic" :src="bannerItem" ></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 文字描述 -->
		<view class="title">{{showListData.category.name}}</view>
		<view class="desc">{{showListData.category.frontDesc}}</view>
		<!-- 内容列表区域 -->
		<view class="shop-list">
			<view class="shop-item" @click="checkDetail(shopItem)" v-for="shopItem in showListData.itemList" :key="shopItem.id" >
				<!-- 商品图片 -->
				<image class="shop-pic" :src="shopItem.listPicUrl" ></image>
				<view class="shop-desc">
					<!-- 商品名称 -->
					<text class="name common">{{shopItem.name}}</text>
					<!-- 商品价格 -->
					<text class="price common">{{shopItem.retailPrice}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "../../utils/request";
	export default {
		name: '',
		data(){
			return {
				cateListData:[],
			}
		},
		props:["navId"],
		computed:{
			showListData(){
				return this.cateListData.find(item=> item.category.parentId === this.navId) ||{};
			}
		},
		mounted(){
			//获取数据
			this.getCateListData();
		},
		methods:{
			//跳转到商品详情页
			checkDetail(shopItem){
				wx.navigateTo({
					url:"/pages/detail/detail?shopitem="+JSON.stringify(shopItem),
				})
			},
			//请求获取数据
			async getCateListData(){
				let result = await request("/getIndexCateList");
				this.cateListData = result;
			}
		},
		
	}
</script>

<style lang="stylus" scoped>
.cate-list
	.swiper-wrapper
		width: 100%
		.swiper-pic
			width: 100%
			height: 370rpx
	.title
		font-size: 36rpx
		color: #333
		line-height:70rpx
		text-align: center
	.desc
		font-size: 26rpx
		color: #999
		text-align: center
		line-height: 40rpx
	.shop-list
		display: flex
		flex-wrap: wrap
		justify-content: space-around
		// 解决当商品数量为奇数的时候最后一项为居中显示的问题
		&:after
			content:""
			width: 344rpx
		.shop-item
			width: 344rpx
			.shop-pic
				width: 344rpx
				height: 344rpx
			.shop-desc
				.common
					font-size: 26rpx
					line-height: 50rpx
					display: block
				.price
					color: red
					font-weight: bold
					&:before
						content: "¥"
						margin-right: 10rpx
				
</style>
