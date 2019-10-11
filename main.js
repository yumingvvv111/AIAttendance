import store from './store'
import Vue from 'vue'
import App from './App'
import client from '@kqtec/graphql-uni-app-client'

Vue.config.productionTip = false;

Vue.prototype.$store = store;
Vue.prototype.$client = client;

App.mpType = 'app';

let app = null;

// #ifdef APP-PLUS
	var alert = plus.nativeUI.alert;
// #endif

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
const request = (query, name, handle) => {
	const client = new app.$client({
		// uri: 'http://127.0.0.1:5001/graphql',
		// uri: 'http://192.168.1.128:5001/graphql',
		// uri: 'http://39.97.224.231:5001/graphql',
		uri: 'http://yumingvvv.thanks.echosite.cn/graphql'
	});
	client.query(query, name).then(result => {
		console.log(result);
		let statusCode = result.statusCode;
		if (statusCode === 200) {
			let _result = result.data.data['login'];
			let data = _result.data;
			console.log(_result, 111111);
			if (_result.code === 200) {
				handle(data);
			} else {
				app.$api.msg('服务器错误');
				console.log(_result.message);
			}
		} else {
			app.$api.msg('网络错误');
		}
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
	alert
};

app = new Vue({
	...App
})
app.$mount()
