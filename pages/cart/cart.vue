<template>
	<view class="cartContainer">
		<view class="title">购物车</view>
<!-- 		<view class="header">
			<text>30天无忧退货</text>
			<text>48小时快速退货</text>
			<text>满99元免邮费</text>
		</view>
		<view class="contentContainer">
			<image class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" mode=""></image>
			<button @click="toLogin">登录</button>
			<view class="addMore">去添加点什么吧</view>
		</view>
		 -->
		<template v-if="cartData.length!=0">
			<!-- 购物车列表 -->
			<view class="cartList">
				<!-- 展示购物车列表 -->
				<view class="cartItem" v-for="(cartItem,index) in cartData" :key="cartItem.id">
					<text class='iconfont icon-xuanzhong' :class="{selected:cartItem.isSelect}" @click="selectItem(index)"></text>
					<view class="shopItem">
						<image class="shopImg" :src="cartItem.listPicUrl"></image>
						<view class="shopInfo">
							<text>{{cartItem.name}}</text>
							<text class="price">￥{{cartItem.retailPrice}}</text>
						</view>
					</view>
					<!-- 控制数量 -->
					<view class="countCtrl">
						<text class="del" @click="isAdd(false,index)"> - </text>
						<text class="count"> {{cartItem.amount}} </text>
						<text class="add" @click="isAdd(true,index)"> + </text>
					</view>
				</view>
			</view>
			<!-- 底部下单 -->
			<view class="cartFooter">
				<text class='iconfont icon-xuanzhong' :class="{selected:isAllSelect}" @click="selectAll(!isAllSelect)"></text>
				<text class="allSelected" >已选 {{selectCount}}</text>
				<view class="right">
					<text class="totalPrice">合计: ￥{{totalMoney}}</text>
					<text class="preOrder">下单</text>
				</view>
			</view>
	</template>
	
	<template v-else>
		<image class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" mode=""></image>
				<view class="hint">购物车还是空的，赶紧去购物吧</view>
	</template>

	
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from "vuex";
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState({
				cartData:state => state.cart.cartData,
			}),
			...mapGetters(["isAllSelect","totalMoney","selectCount"]),
		},
		methods:{
			...mapMutations(["changSelect","changAmount","changeSelectAll"]),
			//购物车商品全选/全不选
			selectAll(afterState){
				this.changeSelectAll(afterState);
			},
			//购物车商品数量增加删除
			isAdd(isAdd,index){
				//直接传递给vuex,vuex进行操作
				this.changAmount({isAdd,index});
			},
			//选中商品
			selectItem(index){
				this.changSelect(index);
			}
		}
	}
</script>

<style lang="stylus">
	/* iconfont 公共样式 */
	.cartImg
		display block
		width 248upx
		height 248upx
		margin 300upx auto 50upx

	.cartContainer
		position relative
		background #f4f4f4
		height 100%
		.title
			font-size 32upx
			line-height 80upx
			margin-left 30upx
		.header
			display flex
			background #eee
			text
				width 33.333%
				height 80upx
				line-height 80upx
				text-align center
				font-size 26upx
		.contentContainer
			
			button
				width 480upx
				height 92upx
				background #DD1A21
				color #fff
				font-size 32upx
				line-height 92upx
			.addMore
				text-align center
				font-size 26upx
				color #7f7f7f
				line-height 60rpx
		.cartList
			.cartItem
				position relative
				display flex
				height 172upx
				background #fff
				margin-top 20upx
				padding 20upx
				.iconfont
					font-size 40upx
					line-height 172upx
					margin 0 40upx
					color #999
					&.selected
						color: #BB2C08
				.shopItem
					display flex 
					.shopImg
						width 172upx
						height 172upx
						background #eee
					.shopInfo
						font-size 28upx
						display flex
						flex-direction column
						margin-left 20upx
						text
							line-height 60upx
						.price
							color: #BB2C08
				.countCtrl
					position absolute
					right 20upx
					bottom 30upx
					text
						display inline-block
						width 60upx
						height 50upx
						text-align center
						line-height 50upx
						border 1upx solid #EEEEEE
						&:nth-child(2)
							border none
							border-top 1upx solid #EEEEEE
							border-bottom 1upx solid #EEEEEE
		.cartFooter
			position absolute
			display flex	
			bottom 2rpx
			height 96upx
			line-height 96upx
			width 100%
			background #fff
			font-size 30upx
			.iconfont
				font-size 40upx
				margin 0 20upx
				color: #999
				&.selected
					color: #BB2C08
			.right 
				height 96upx
				position absolute
				right 0
				.totalPrice
					display inline-block
					height 96upx
					line-height 96upx
				.preOrder
					display inline-block
					background #DD1A21
					width 225upx
					height 96upx
					line-height 96upx
					text-align center
					font-size 28upx
					color #fff
					margin-left 30upx
		.hint
			text-align center
			font-size 28upx
					
</style>
