import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		punchList: []
	},
	// getters: {
	// 	isLogin: state => {
	// 		return state.todos.filter(todo => todo.done)
	// 	}
	// },

	actions: {
		updatePunchList({
			dispatch,
			commit
		}, providers) {

			// await dispatch('actionA') // 等待 actionA 完成
			commit('updatePunchList', providers);
		}
	},
	mutations: {
		updatePunchList(state, provider) {
			//todo
			let arr = [];
			if(provider instanceof Array){
				provider.forEach((item, index) => {
					arr.push({
						id: index,
						time: item.time,
						name: '八维',//fixme
						age: item.type,
						hobby: item.result
					});
				});
			}
			
			state.punchList = arr;
		},
		pureLogin(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
		},
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: provider
			})
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		}
	}
})

export default store
