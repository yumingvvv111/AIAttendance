import store from './store'
import Vue from 'vue'
import App from './App'
import client from '@kqtec/graphql-uni-app-client'

// 注册全局modal组件
import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue'
Vue.component('chunLei-modal',chunLeiModal);


Vue.config.productionTip = false;

Vue.prototype.$store = store;
Vue.prototype.$client = client;

var globalInfo = {
	systemInfo: null,
	location: {
		latitude: 0,
		longitude: 0
	}
};

Vue.prototype.globalInfo = globalInfo;

App.mpType = 'app';

var app = null;

// #ifdef APP-PLUS
var alert = plus.nativeUI.alert;
// #endif


uni.getLocation({
    type: 'wgs84',
    success: function (res) {
		globalInfo.location.latitude = res.latitude;
		globalInfo.location.longitude = res.longitude;
    }});


uni.getSystemInfo({
	success: (data) => {
		globalInfo.systemInfo = data;
		console.log(data, 11111111)
	},
	fail: (ex) => {
		console.log('获取系统信息失败')},
	complete: (res) => {
		console.log(res)}
});

//跳转到某一个页面
var navTo = async (url, permission) => {
	let page = url.match(/\/([^\/]+)$/)[1];
	const permissionPages = ['apply'];//todo
	let userInfo = await getUserInfo();
	let hasLogin = !!(userInfo && userInfo.accessToken);
	if (permissionPages.includes(page) && !hasLogin && !permission) {
		url = '/pages/public/login';
	}
	uni.navigateTo({
		url
	})
}



const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: 'userInfo',
			success: (res) => {
				console.log(res);
				if (res.errMsg === "getStorage:ok") {
					resolve(res.data);
				}
			},
			fail: (ex) => {
				resolve(ex.data);
			}
		});
	});
}

const request = async (query, config, handle, fail) => {
	const userInfo = await getUserInfo();
	const token = userInfo && userInfo.accessToken;
	const _headers = (config && config.headers) || {};
	const queryName = config.name || query.match(/(?:query|mutation)([^\{]*)/)[1].trim();
	const client = new app.$client({
		// uri: 'http://127.0.0.1:5001/graphql',
		// uri: 'http://192.168.1.128:5001/graphql',
		// uri: 'http://39.97.224.231:5001/graphql',
		uri: 'http://yumingvvv.thanks.echosite.cn/graphql',
		headers: token ? ({ ...{
				Authorization: "Bearer " + token
			},
			..._headers
		}) : {}
	});
	
	function errorHandler(err){
		let code = (err.data && err.data.errors[0] && err.data.errors[0].extensions.code) || 0;
		let msg = (err.data && err.data.errors[0] && err.data.errors[0].message) || '网络错误';
		if(err.statusCode === 404){
			msg = err.data;
		}else if(code  === 'UNAUTHENTICATED'){
			msg = msg + '，请登录';//fixme
		}
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	}
	
	client.query(query).then(result => {
		console.log(result);
		let statusCode = result.statusCode;
		if (statusCode === 200) {
			let _result = result.data.data[queryName]; //fixme
			let data = _result.data;
			if (_result.code === 200) {	
				if (data) {
					handle(data, _result.message);
				} else {
					alert(_result.message);
				}

			} else {
				app.$api.msg('服务器错误' + _result.message);
				console.log(_result.message);
			}
		} else {
			errorHandler(result);
		}
	}, err => {
		console.log(err);
		errorHandler(err);
	});
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.prototype.$api = {
	msg,
	request,
	prePage
};

Vue.prototype.$util = {
	alert,
	navTo,
	getUserInfo
};

app = new Vue({
	...App
})
app.$mount()
