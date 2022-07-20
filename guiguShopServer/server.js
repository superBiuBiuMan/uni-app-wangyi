const Koa = require("koa");


//1.生成应用实例
const app = new Koa();
const router = require("./router/index");


//2.使用路由中间件 - 中间件就是在所有请求之前进行拦截捕捉处理
app.use(router.routes());


//最后监听端口
app.listen("3001",(error)=>{
	if(error){
		console.log(error);
		return;
	}
	console.log("服务器启动成功");
	console.log("服务器地址:xxxxxx:3031");
});