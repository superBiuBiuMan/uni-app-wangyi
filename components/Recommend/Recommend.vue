<template>
  <view class="recommend-container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true"  :duration="1000">
			<swiper-item  class="swiper-item">
				<view>
					<image src="https://yanxuan.nosdn.127.net/3eb266fa72ab034f04fccec8172c7925.jpg?quality=75&type=webp&imageView" class="pic"></image>
				</view>
			</swiper-item>
			<swiper-item  class="swiper-item">
				<view>
					<image src="https://yanxuan.nosdn.127.net/4b504a0d564b950574fc9aed91173a86.jpg?type=webp&imageView&quality=75&thumbnail=750x0" class="pic"></image>
				</view>
			</swiper-item>
			<swiper-item  class="swiper-item">
				<view>
					<image src="https://yanxuan.nosdn.127.net/dfd547899cfb9d9d420f738f93947452.jpg?type=webp&imageView&quality=75&thumbnail=750x0" class="pic"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 三个图标区域 -->
		<view class="assure-list">
			<view class="assure-item" v-for="(item,index) in indexData.policyDescList" :key="index">
				<image class="pic" :src="item.icon"></image>
				<text class="content">{{item.desc}}</text>
			</view>
		</view>
		<!-- 十个图表区域 -->
		<view class="kingkong-list" v-if="kongKongList">
			<view class="kingkong-item" v-for="item in kongKongList" :key="item.L1Id">
				<!-- 图片 -->
				<image class="kingkong-pic" :src="item.picUrl"></image>
				<!-- 文本 -->
				<text class="kingkong-title">{{item.text}}</text>
			</view>
		</view>
		<!-- 分类区 -->
		<view class="category" v-for="(item,index) in indexData.categoryModule" :key="index">
			<image class="category-show" :src="item.titlePicUrl" ></image>
			<scroll-view class="category-list" scroll-x="true" enable-flex="true">
				<view class="category-item" v-for="itemlist in item.itemList" :key="itemlist.id">
					<image class="pic" :src="itemlist.showPicUrl" ></image>
					<text class="title">{{itemlist.name}}</text>
				</view>
				<view class="category-item last">
					查看更多>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: '',
	computed:{
		...mapState({
			indexData:state => state.home.indexData,
		}),
		// 十个图表区域的数据
		kongKongList(){
			//链式操作符
			return this.indexData.kingKongModule?.kingKongList;
		}
	}
}
</script>

<style lang="stylus" scoped>
.recommend-container
	.swiper-item
		width: 100%
		height: 350rpx
		.pic
			width: 100%
			height: 350rpx
	// 十个图标
	.assure-list
		display: flex
		justify-content: space-around
		margin: 20rpx 0;
		.assure-item
			.pic
				width: 32rpx
				height: 32rpx
				vertical-align: middle
			.content
				font-size: 24rpx
				vertical-align: middle
				margin-left: 10rpx
	.kingkong-list
		display: flex
		align-items: center
		flex-wrap: wrap
		.kingkong-item
			width: 20%
			display: flex
			flex-direction: column
			margin-bottom: 10rpx
			.kingkong-pic
				width: 110rpx
				height: 110rpx
			.kingkong-title
				font-size: 26rpx

//防止折叠
	.category
		margin: 5rpx 0;
			// 第一张图片
		.category-show
			width: 100%
			height: 370rpx
			//滚动区域
		.category-list
			display: flex
			height: 300rpx
			//每一个item项目
			.category-item
				width: 200rpx
				text-align: center
				flex-shrink: 0
				margin: 0 6rpx
				//最后一个item
				&.last
					width: 200rpx
					height: 200rpx
					background-color: #eee
					font-size: 28rpx
					text-align: center
					line-height: 200rpx
				.pic
					width: 200rpx
					height: 200rpx
					background-color: #eee
					
				.title
					font-size: 26rpx
					// 设置超出二行文本显示省略号
					white-space: pre-wrap
					text-overflow: ellipsis
					display: -webkit-box
					-webkit-line-clamp: 2
					-webkit-box-orient: vertical
					overflow: hidden
.test
	font-size: 0
</style>