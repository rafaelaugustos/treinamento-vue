import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const Store = new Vuex.Store({
	actions,
	getters,
	modules,
	mutations,
	state,
})

const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

for (const namespace in modules) {
	const module = modules[namespace]

	try {
		hasKey(module, 'actions') &&
			hasKey(module.actions, 'INIT') &&
			Store.dispatch(`${namespace}/INIT`)
	} catch (e) {
		console.log(namespace, e)
	}
}

export default Store
