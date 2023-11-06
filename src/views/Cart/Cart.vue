<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Carrito de compras</h3>
      </div>
    </div>
    <!-- bucle sobre todos los artículos del carrito y mostrar uno por uno-->
    <div v-for="cartItem in cartItems" :key="cartItem.product.id" class="row mt-2 pt-3 justify-content-around">
      <div class="col-2"></div>
      <!-- mostrar imagen -->
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <router-link :to="{ name: 'ShowDetails', params: { id: cartItem.product.id } }">
          <img v-bind:src="cartItem.product.imageURL" class="w-100 card-img-top embed-responsive-item" />
        </router-link>
      </div>
      <!-- mostrar nombre del producto, cantidad y precio -->
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <!-- Título del producto como enlace de router -->
          <h6 class="card-title">
            <router-link :to="{ name: 'ShowDetails', params: { id: cartItem.product.id } }">
              {{ cartItem.product.name }}
            </router-link>
          </h6>

          <!-- Precio del producto por unidad -->
          <p id="item-price" class="mb-0 font-weight-bold">
            $ {{ cartItem.product.price }} per unit
          </p>

          <!-- Cantidad de productos con entrada de usuario -->
          <p id="item-quantity" class="mb-0">
            Cantidad :
            <!-- Entrada de usuario vinculada al modelo de datos 'cartItem.quantity' -->
            <input size="1" class="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0"
              v-model="cartItem.quantity" @change="validateQuantity(cartItem)" />


          </p>
          <p id="item-total-price" class="mb-0">
            Precio Total:
            <span class="font-weight-bold">
              $ {{ cartItem.product.price * cartItem.quantity }}</span>
          </p>
          <br /><a href="#" class="text-right" @click="deleteItem(cartItem.id)">Eliminar del carrito</a>
        </div>
      </div>
      <div class="col-2"></div>
      <div class="col-12">
        <hr />
      </div>
    </div>

    <!-- mostrar precio total -->
    <div class="total-cost pt-2 text-right">
      <h5>Total : $ {{ totalcost.toFixed(2) }}</h5>
      <button :disabled="isDisabled()" type="button" class="btn btn-primary confirm" @click="checkout">
        Confirmar Orden
      </button>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  // Datos del componente
  data() {
    return {
      cartItems: [],  // Array para almacenar los elementos del carrito
      token: null,     // Token para la autenticación del usuario
      totalcost: 0,    // Variable para almacenar el costo total del carrito
    };
  },
  // Nombre del componente
  name: 'Cart',
  // Propiedad que se espera recibir desde el componente padre
  props: ['baseURL'],

  // Métodos del componente
  methods: {
    // Método para determinar si el botón debe estar deshabilitado
    isDisabled() {
      // Si la longitud del array de cartItems es igual a cero, el botón está deshabilitado
      if (this.cartItems.length === 0) {
        return true;
      }
      // Si hay elementos en el carrito, el botón está habilitado
      return false;
    },

    // Método para obtener todos los elementos en el carrito
    listCartItems() {
      axios.get(`${this.baseURL}cart/?token=${this.token}`).then(
        (response) => {
          if (response.status == 200) {
            const result = response.data;
            // Almacena cartItems y el costo total en dos variables
            this.cartItems = result.cartItems;
            this.totalcost = result.totalCost;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

   

    // Método para mostrar detalles de un producto por su ID
    showDetails(productId) {
      this.$router.push({
        name: 'ShowDetails',
        params: { id: productId },
      });
    },

  
  // Método que se ejecuta después de que el componente se ha montado en el DOM
  mounted() {
    this.token = localStorage.getItem('token'); // Obtener el token del localStorage
    this.listCartItems(); // Obtener y mostrar los elementos del carrito
  },
};
</script>


<style scoped>
h4,
h5 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

.embed-responsive .card-img-top {
  object-fit: cover;
}

#item-price {
  color: #232f3e;
}

#item-quantity {
  float: left;
}

#item-total-price {
  float: right;
}

.confirm {
  font-weight: bold;
  font-size: larger;
}
</style>
