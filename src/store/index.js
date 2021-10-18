import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     _products:[],
     carrito: []
  },
  mutations: {
    setProduct(state, products){
      state._products = products;
    },
//incrementamos el estado en cantidad
    incrementProductQuantity(state , item){
    item.quantity ++;
    },
//agregamos producto al estado, en el objeto carrito, con esto hacemos un push para forzar 
//lo agregado, creado dos campos cada vez que llegue un nuevo elemento
//id, que sera el producto y su id
// y la cantidad, que sera uno como incial, si hubiera mas, se suma con la mutacion de arriba
    addProductToCart(state,product){
      state.carrito.push({
        id: product.id,
        quantity: 1
      });
    },
//decremtenamos el objeto _productos, especificamente el inventario
    decrementProductInventory(state, product){
      product.inventory --;
    }
  },

//consultamos una api con una accion, obtenemos los productos, el parametro es un objeto context,
//es un objeto donde tenemos acceso a a toda la store de vuex, pero ahora solo usamos el commit
//ya que necesitamos enviar una mutacion y se hace a traves de commitment

//retornamos una promesa, esto por que las acciones pueden ser asincronas. Luego usamos el metodo
//getProducts(metodo de api/shop.js) este devuelve un objeto, entonces, usamos commit(lo que esta 
//como parametro), depues pasamos el metodo que sera la mutacion y pasamos producto otra vez, esto iria
//en el state. por ultimo resolvemos la promesa.
  actions: {
      getProducts({ commit }){
        return new Promise(resolve =>{
          api.getProducts(producto =>{
          commit("setProduct", producto);
          resolve();
        })
      })
    },
//accion de carrito, para agregar, context para hacer commit, y product que es el state
    addProductToCart(context,product){
      //preguntar si hay algo en inventario de ese producto, si es igual a cero retornar
      if(product.inventory === 0)return;

      //existe ya en el carrito

//creamos una constante, que tendra lo que tiene el carrito,el metodo find devuelve el primer valor
//del primer elemento dentro del array que cumpla con eso, devolviendo una promesa, es por eso que
//comparamos respuesta con el product.id para que sean iguales, en dado caso ya exista
//context.state.carrito es algo que se entiene, pues entramos al estado y al objeto carrito
      const item = context.state.carrito.find(item => item.id === product.id)

//si se tiene algo, item lo tendra, por lo que va dentro del if
      if(item){
      //si es asi, añadir uno mas a la compra
//hacemos un commit a la mutacion con su nombre, usando context.commit, y pasamos item, pues ese
//tiene el resultado de si carrito o no tiene algo, si lo tiene la mutacion aumenta el resultado
      context.commit('incrementProductQuantity' , item)
      }else{
      //si no es asi, añaidr el producto al carrito

//si fuera falso, es decir, que no haya nada, encontes pasamos product, pues ese tiene el nuevo elemento
//que sera agregado, siempre el nombre de la mutacion y luego el elemento que ira, en este caso
// el producto
      context.commit('addProductToCart', product)
      }

      //restar al inventario de ese producto

//sin importar si hay o no, se resta el producto a _products por lo que va el nombre de la mutacion
// y el producto que sera restado
      context.commit('decrementProductInventory', product)
    }
  },
//usamos el state para evaluar, solo es evaluar por lo que no muestra un cambio y no necesigta mutacion
//retornamos el estado y filtramos productos, esto devuelbe un objeto que es retornado 
//y comparado con el atributo inventory viendo si es mayor que cero que se muestre.
  getters:{
    ProductosEnStock(state){
      return state._products.filter(product => {
        return product.inventory > 0;
      })
    },
//creamos un getter para que este revisando el cambio en el estado, esto para restar o sumar
// y que se reflejen los cambios

//retornmos el estado de carrito mediante map(crea un nuevo arreglo con los resultados de la funcion
// especificada dentro del mismo, en este caso la funcion es item) dentro de item, creamos 
//la constante product que sera igual al state._products usando el metodo find, que devuelve una promesa
//con el primer elemento que cumpla la funcion en este caso que el id obtenido sea igual al id del item


//luego se retorna, en title: el product.title (product es la constante) asi como en precio
//solo en cantidad no, por que el items(del carrito) tienee la cantidad
    productsOnCart(state){
      return state.carrito.map( items =>{
        const product = state._products.find(product => product.id === items.id)

        return {
          titulo: product.title,
          precio: product.price,
          cantidad: items.quantity
        }
      })
    }
  },
  modules: {
  },

})
