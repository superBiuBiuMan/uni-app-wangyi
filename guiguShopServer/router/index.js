const Router = require("koa-router");
const fly = require("flyio");
const jwt = require("jsonwebtoken");
//1.生成路由实例
const router = new Router();

// const indexData = require("../datas/index.json");
// console.log(indexData);
//2.定义路由
// router.get("/test",(ctx)=>{
// 	ctx.body = "测试数据返回";
// });

//index主页的接口
router.get("/getIndexData", (ctx) => {
	// 读取数据
		//如果不设置'utf8'的话好像就是buffer流
	// let indexData = fs.readFileSync(path.resolve(__dirname, "../datas/index.json"), "utf8");
	indexData = require("../datas/index.json");
	// console.log(typeof indexData);//字符串
	// indexData = JSON.parse(indexData); //转换为JSON
	// console.log(typeof indexData);//object
	ctx.body = indexData;
})
// 分类页
router.get("/getCategoryData",(ctx)=>{
	//读取分类页数据
	// let categoryData = fs.readFileSync(path.resolve(__dirname,"../datas/categoryDatas.json"),"utf-8")
	const categoryData = require("../datas/categoryDatas.json");
	ctx.body = categoryData
})


router.get("/getIndexCateList",(ctx)=>{
	// let categoryData = fs.readFileSync(path.resolve(__dirname,"../datas/indexCateList.json"),"utf-8")
	const categoryData = require("../datas/indexCateList.json");
	// console.log(typeof categoryData);
	ctx.body = categoryData;
})

//获取openid并加密
router.get("/getToken",async (ctx)=>{
	//接收用户code参数
	let js_code = ctx.query.code;
	let appid = "wxeb1214001e29fca1";
	let secret = "自己的Appsecret";
	try {
		let result = await fly.get("https://api.weixin.qq.com/sns/jscode2session", {
			appid,
			secret,
			js_code,
			grant_type: "authorization_code",
		});
		let openid = JSON.parse(result.data).openid;//获取openid;
		//对openid进行加密
		let token = jwt.sign({
			openid,
			name:"李白的师傅李黑-随机名",
			age:1000
		},"superBiuBiu");
		ctx.body = token;//返回token
	} catch (error) {
		console.log(error);
	}

})

module.exports = router;
