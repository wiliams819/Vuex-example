<template>
    <div>
        <input type="text" placeholder="Selecciona producto" v-model="selectedProduct">
    </div>
</template>

<script>
export default {
    name: 'editProduct',
//para usar vuex y v-model se usa una propiedad computada de doble direccion, es decir, que reciba, en este caso, primero
//un getter y luego mande un nuevo valor, que es un set, se manda la misma propiedad con el nuevo valor
    computed:{
        selectedProduct: {
            get(){
                return this.$store.getters.productselected;
            },
            set(value){
                this.$store.commit('editProdutct', {selectedProduct: value} )
            }
        }
    }
}
</script>