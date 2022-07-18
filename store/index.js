import Vuex from "vuex";
import Vue from "vue";
import home from "./modules/home";
import cart from "./modules/cart";
Vue.use(Vuex);

export default new Vuex.Store({
		modules:{
			home,
			cart,
		}
});