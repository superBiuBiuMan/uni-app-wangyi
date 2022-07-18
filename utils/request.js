// 配置项
import config from "./config";

export default (url, data = {}, method = "get") => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.host + url,
			data,
			method,
			success: (res) => {
				//返回数据
				resolve(res.data);
			},
			fail: (reason) => {
				//返回错误原因并执行catch
				reject(reason);
			}
		})
	})
}
