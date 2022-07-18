<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	/*每个页面公共css */
	/* 引入iconfont字体图标 */
	@import url("static/iconfont/iconfont.styl");
	page
		width 100
		height 100
</style>
