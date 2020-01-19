//封装接口api
const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
var request = (url, data) => {
    var _url = API_BASE_URL + url;
    return new Promise((resolve, reject) => {
        mui.ajax(_url,{
	data:data,
	dataType:'json',//服务器返回json格式数据
	type:'post',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	headers:{'Content-Type':'application/json'},	              
	success:function(data){
		//服务器返回响应，根据响应结果，分析是否登录成功；
		console.log(data)
	},
	error:function(xhr,type,errorThrown){
		//异常处理；
		console.log(type);
	}
});
    });
}
var getBaaner = function(data) {
        return request('/banner', data);
    }
return getBaaner;
