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
  data() {
    return {
      cartItems: [],
      token: null,
      totalcost: 0,
    };
  },
  name: 'Cart',
  props: ['baseURL'],
  methods: {
    isDisabled() {
      if (this.cartItems.length === 0) {
        return true;
      }
      return false;
    },
    // fetch all the items in cart
    listCartItems() {
      axios.get(`${this.baseURL}cart/?token=${this.token}`).then(
        (response) => {
          if (response.status == 200) {
            const result = response.data;
            // store cartitems and total price in two variables
            this.cartItems = result.cartItems;
            this.totalcost = result.totalCost;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // go to checkout page
    checkout() {
      this.$router.push({ name: 'Checkout' });
    },
    deleteItem(itemId) {
      axios.delete(`${this.baseURL}cart/delete/${itemId}?token=${this.token}`)
        .then(response => {
          // Manejo de la respuesta exitosa
          if (response.status == 200) {
            this.$router.go(0); // Recargar la página o actualizar la lista de elementos del carrito
          }
          this.$emit('fetchData');
        })
        .catch(error => {
          // Manejo del error
          console.log(error);
        });
    },


    showDetails(productId) {
      this.$router.push({
        name: 'ShowDetails',
        params: { id: productId },
      });
    },

    validateQuantity(cartItem) {
      if (cartItem.quantity < 1) {
        swal("La cantidad mínima es 1.", { icon: "warning" });
        cartItem.quantity = 1;
      } else if (cartItem.quantity > cartItem.product.quantity) {
        swal("La cantidad excede la cantidad disponible.", { icon: "warning" });
        cartItem.quantity = cartItem.product.quantity;
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.listCartItems();
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
