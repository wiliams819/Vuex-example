//esto es un modulo, un archivo javascript en donde tendra las funciones del estado de _products
//de esta manera es mas organizado el store solo llamando a cada modulo
import api from '../api/shop'
import Vue from 'vue'
export default {
    state: {
        _products:[],
        selectedProduct:{}
    },
    mutations:{
        setProduct(state, products){
            state._products = products;
          },
      
      //decremtenamos el objeto _productos, especificamente el inventario
          decrementProductInventory(state, product){
            product.inventory --;
          },
      //al eliminar en el carrito, se agrega al inventario, usamos dos parametros
      //state parq modificar el estado e item, que es el nuevo elemento que ingresa nuevamente
      //usamos producto como constaate, en donde con el metodo find devuelve una promesa de _productos(objeto
      //de arreglos,) para luego agregarlo al item(id del parametro) y usamos el operador de += del
      //para que lo de item y su cantidad, sume a producto y su inventario(producto a _products)
          incrementProductInvetory(state, item){
            const producto = state._products.find(product => product.id === item.id);
            producto.inventory += item.quantity;
          },

          //Vuex y vue model en el ejemplo se usa esta mutacion para agregar un nuevo elemento desde la interfaz
//esto es el get de la propiedad computada
    productSelected(state, product){
        state.selectedProduct = product;
      },
  //al usar vuex con vue model, y teniendo el modo estricto, no se puede enditar el estado desde otro lugar,
  // por lo que, en esta mutacion se recibe la nueva data esto es el set de la propiedad computada
      editProdutct(state, data){
        //buscar el indice del producto
        const index = state._products.findIndex(product => product.id === state.selectedProduct.id)
        //compone el producto en base a las propiedades cambiadas
        const producto = Object.assign({}, state._products[index],data)
        //acatualizar activando la reactividad
        Vue.set(state._products, index, producto)
  
      }
    },
    actions:{

//consultamos una api con una accion, obtenemos los productos, el parametro es un objeto context,
//es un objeto donde tenemos acceso a a toda la store de vuex, pero ahora solo usamos el commit
//ya que necesitamos enviar una mutacion y se hace a traves de commit

//retornamos una promesa, esto por que las acciones pueden ser asincronas. Luego usamos el metodo
//getProducts(metodo de api/shop.js) este devuelve un objeto, entonces, usamos commit(lo que esta 
//como parametro), depues pasamos el metodo que sera la mutacion y pasamos producto otra vez, esto iria
//en el state. por ultimo resolvemos la promesa.
        getProducts({ commit }){
            return new Promise(resolve =>{
              api.getProducts(producto =>{
              commit("setProduct", producto);
              resolve();
            })
          })
        },
            

    
    },
    getters:{
         //usamos el state para evaluar, solo es evaluar por lo que no muestra un cambio y no necesigta mutacion
//retornamos el estado y filtramos productos, esto devuelbe un objeto que es retornado 
//y comparado con el atributo inventory viendo si es mayor que cero que se muestre.
ProductosEnStock(state){
    return state._products.filter(product => {
      return product.inventory > 0;
    })
  },

        //retornamos el producto seleccionado(esta es propiedad de state)
        productselected(state){
            return state.selectedProduct;
          },
        //con metodos revisamos si no hay producto, esto es un getters en forma de funcion se retorna un id, y se compara 
        //que lo que se retornara (id) sea menor a dos en inventario
          noHayProducto(state){
            return id =>{
              return state._products.find(product => product.id === id).inventory <2;
            }
          }

    }
}