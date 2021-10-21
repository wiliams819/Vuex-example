<template>
  <ul>
    <!--en class, se llama al getter como parametro para la clase no hay-->
    <li
    :class="{noHay: $store.getters.noHayProducto(product.id)}"
      @click="selectedProduct(product.title)"
      v-for="product in ProductosEnStock"
      :key="product.id">
      {{ product.title }} - {{ product.price}} - {{ product.inventory}}
      <br>
      <button @click="addToCart(product)" >Carrito</button>
    </li>
  </ul>
</template>

<script>
//se importa de vuex, no de la store
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
//usamos de manera asincrona el created(), usamos un try catch, en donde dentro del try,
//usamos await, hacemos refencia al store, y con dispatch, pasamos el metodo perteneciente a la accion
  async  created (){
      try{
          await this.$store.dispatch('getProducts');

      }catch(error){
          console.error(error);
      } 
    },

 /*
     computed: {
      //propuedad que llamar al getter productosEnStock  para mostrar lo que hay conforme cambia
        products(){
            return this.$store.getters.ProductosEnStock;
        },
    },
 */
//los mapGetters, mapMutation, mapState y mpapAction, es un objeto que hace de enlace entre la informacion de
//los metodos y las propiedades de la store con las del componente, de esta manera se evita crear metodos y propiedades
//locales(dentro del componente).
    computed: {
      //propiedad de vuex, global, conviven ambas en la parte de computed
      ...mapGetters(["ProductosEnStock"]),
      
      //propiedad local
      testing(){
        return null;
      }
    },

/*
    methods:{
//metodo que llama a la accion addProductToCart, pasando como parametro product
      addToCart(product){
        this.$store.dispatch('addProductToCart', product)
      },
//metodo selectedProduct, se hace un commit a la mutacion y se envia product
      selectedProduct(product){
        this.$store.commit('productSelected', product)
      }
    }*/
//uso de mapActions para enlazar acciones de la store
    methods:{
      ...mapActions({
        addToCart: "addProductToCart"
      }),
      ...mapMutations({
        selectedProduct: "productSelected"
      })
    }
}

</script>

<style scoped>
/*clase que se muestra si hay menor que 2 en inventario */
.noHay{
  background: lightpink;
  border: 2px solid tomato;

}
</style>
