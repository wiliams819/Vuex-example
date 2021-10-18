<template>
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ product.price | currency }} - {{ product.inventory}}
      <br>
      <button @click="addToCart(product)" >Carrito</button>
    </li>
  </ul>
</template>

<script>
//importamos el archivo con la api falsa

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

 
    computed: {
        products(){
            return this.$store.getters.ProductosEnStock;
        }
    },
    methods:{
      addToCart(product){
        this.$store.dispatch('addProductToCart', product)
      }
    }
}
</script>