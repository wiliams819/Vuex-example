import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/shop'
import carrito from './carrito'
import product from './_products'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  modules: {
    carrito,
    product
  },

  state: {
    
     checkout: false, 
  },
  mutations: {
    checkoutError(state, error){
      state.checkout = error;
    },



  },




  actions: {



  //checkout
  checkout({commit, state}){
    api.buyProducts(state.carrito.carrito, () => {
      //vaciar carrito
        commit('vaciarCarrito')
      //establcer qeu no hay errores,
      commit('checkoutError',false)
    },()=>{
      commit('checkoutError', true)
    })
  }

},


  getters:{},
  

})
