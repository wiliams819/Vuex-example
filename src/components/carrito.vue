<template>
    <div>
        <h1>Carrito</h1>
        <li v-for="(item,$index ) in carritoItem" :key="item.id">{{item.titulo}} -- ({{item.cantidad}})
            <button @click="removeItem($index)">X</button>
        </li>
        <button v-if="carritoItem.length" @click="checkout">Comprar</button>
        <hr>
        <h3>Total: {{cartTotal}}</h3>

        <article v-if="$store.state.checkout">
            <p>Error procesando los productos...</p>
        </article>
    </div>
</template>

<script>
import {currency} from '../currency'

export default {
    name: 'carrito',
    computed: {
        //creamos una propiedad computada, para llamar al getter
        carritoItem(){
            return this.$store.getters.productsOnCart;
    },
//propiedad para mostar el total, se usa concurrency, un arcivo para sumplifiacar los numeros a
//formato de moneda, el getter es un parametro y la "Q" es otro, es es para el simbolo de moneda
    cartTotal(){
        return currency(this.$store.getters.cartTotal, "Q");
    }
  },
  methods: {
//metodo para eliminar un item del carrito, se llama a la accion removeProductFromCart y el indice
//que es el argumento que recibe la accion para poder procesarse
      removeItem(index){
          return this.$store.dispatch('removeProductFromCart', index)
      },
//metodo supuesto, de que la accion fue correcta o hubo un error
      checkout(){
          this.$store.dispatch('checkout')
      }
  }
}
</script>