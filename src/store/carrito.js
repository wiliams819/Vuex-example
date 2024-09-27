//esto es un modulo, un archivo javascript en donde tendra las funciones del estado de carrito
//de esta manera es mas organizado el store solo llamando a cada modulo
export default {
    state: {
        carrito: [],
    },
    mutations:{
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


//se elimina el elemento dentro del carrito con splice, este metodo verifica si,
//existe un elemento lo elimina, si no, lo agrega, para esto, pasamos el indice
//que es el elemento a eliminar, y uno, que es la cantidad de elemntos que debe borrar
    removeProductFromCart(state, index){
     state.carrito.splice(index, 1)
     },


//Esto es en caso hipotetico, la api tiene un metodo y se usa para hacer la compra, entonces
//despues de hacer la compra el carrito se vacia, por lo que es un arreglo vacio
    vaciarCarrito(state){
        state.carrito = [];
      },
    },
    actions:{
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
    },
  
  
  
  //accion para remover productos del carrito, context para crear los eventos de mutacion e index para
  //saber que elemento es el que se debe eliminar, en la constate RMproduct contiene el indice 
  //del elemento del carrito dentro del estado
    removeProductFromCart(context, index){
      const RMproduct = context.state.carrito[index];
  
      //eliminar del carrito
      context.commit('removeProductFromCart', index);
      //restaurar el inventario
      context.commit('incrementProductInvetory', RMproduct);
    },
},

    getters:{


//creamos un getter para que este revisando el cambio en el estado, esto para restar o sumar
// y que se reflejen los cambios

//retornmos el estado de carrito mediante map(crea un nuevo arreglo con los resultados de la funcion
// especificada dentro del mismo, en este caso la funcion es item) dentro de item, creamos 
//la constante product que sera igual al state._products usando el metodo find, que devuelve una promesa
//con el primer elemento que cumpla la funcion en este caso que el id obtenido sea igual al id del item
//luego se retorna, en title: el product.title (product es la constante) asi como en precio
//solo en cantidad no, por que el items(del carrito) tiene la cantidad
    productsOnCart(state, getters, rootState){
        return state.carrito.map( items =>{
         const product = rootState._products._products.find(product => product.id === items.id)
          return {
            titulo: product.title,
            precio: product.price,
            cantidad: items.quantity
          }
        })
      },


//con este getter sumamos los precios para tener un total en tiempo real, getters es para
//acceder a los mismos getters, ya que productsOnCart es el que tiene la cantidad de items agregados
//al carro, y se usa el metodo reduce, este metodo reduce cada elemento de un array y devuelve un unico
//valor, es por eso que current es lo que tiene que hacer, en este caso sumar el precio mas la cantidad de
//y la suma, de todo eso estara en total.s
      cartTotal(state, getters){
        return getters.productsOnCart.reduce((total, current) => total + current.precio + current.cantidad, 0)
      },
    }
}