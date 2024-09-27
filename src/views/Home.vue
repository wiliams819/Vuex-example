<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
   <productList /> 
   <carrito/>
   <edit/>
  </div>
</template>

<script>
import productList from '../components/productList.vue';
import carrito from '../components/carrito.vue'
import edit from '../components/editProduct.vue'
export default {
  name: 'Home',
  components: {
    productList,
    carrito,
    edit
  }
}
</script>
