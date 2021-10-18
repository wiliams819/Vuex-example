<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
   <productList /> 
   <carrito/>
  </div>
</template>

<script>
import productList from '../components/productList.vue';
import carrito from '../components/carrito.vue'
export default {
  name: 'Home',
  components: {
    productList,
    carrito
  }
}
</script>
