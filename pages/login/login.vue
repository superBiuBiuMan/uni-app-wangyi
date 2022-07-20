<template>
	<view class="loginContainer">
		<image class="logo" src="http://yanxuan.nosdn.127.net/39c5e4583753d4c3cb868a64c2c109ea.png" mode=""></image>
		<p class='text'>网易自营，精品生活家居品牌</p>
		<div class="loginMethods">
			<!-- <button class="login wechatLogin" >
				微信登录
			</button> -->
			<!--<button class="login emailLogin">
				邮箱登录
			</button> -->
			<button class="login" @click="getToken">
				加密获取
			</button>
		</div>
		<view>
			<view>获取openid后使用jsonwebtoken加密后返回显示在这里</view>
				<view style="width: 100%;word-break: break-all;">
					{{token}}
				</view>
		</view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";
	export default {
		data() {
			return {
				//显示token在文本框
				token:"",
			}
		},
		methods: {
			//获取token
			getToken(){
				let _this = this;
				wx.login({
					async success(res){
						let code = res.code;//用户登录凭证
						//传给后台
						let token = await request("/getToken",{code});
						//存储token
						wx.setStorageSync("toen",token)
						//显示在容器
						 _this.token = token;
					},
					fail(res){
						wx.showToast({
							title:"获取失败",
							icon:"error"
						})
					}
				});
			},
		}
	}
</script>

<style lang="stylus">
	.loginContainer
		width 100%
		height 100%
		background #F8F8F8
		display flex
		align-items center
		flex-direction column
		.logo
			width 300rpx
			height 100rpx
			margin-top 200rpx
		.text
			font-size 26rpx
			color #666
		.loginMethods
			width 80%
			margin 150rpx auto
			display flex
			justify-content space-around
			.login
				width 240rpx
				height 80rpx
				background #41A863
				color #FFFFFF
				text-align center
				line-height 80rpx
				font-size 26rpx
</style>
