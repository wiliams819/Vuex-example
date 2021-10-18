<template>
    <div>
        <h1>Carrito</h1>
        <li v-for="item in carritoItem" :key="item.id">{{item.titulo}} -- ({{item.cantidad}})</li>
    </div>
</template>

<script>
export default {
    name: 'carrito',
    computed: {
        //creamos una propiedad computada, para llamar al getter
        carritoItem(){
            return this.$store.getters.productsOnCart;
    }
  }
}
</script>