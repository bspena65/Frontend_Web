<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-1"></div>
      <div class="col-md-4 col-12">
        <img :src="product.imageURL" :alt="product.name" class="img-fluid" />
      </div>
      <div class="col-md-6 col-12 pt-3 pt-md-0">
        <h4>{{ product.name }}</h4>
        <h6 class="category font-italic">{{ category.categoryName }}</h6>
        <h6 class="font-weight-bold">$ {{ product.price }}</h6>
        <p>
          {{ product.description }}
        </p>

        <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-3 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Cantidad</span>
            </div>
            <input class="form-control" type="number" v-bind:value="quantity" />
          </div>

          <div class="input-group col-md-3 col-4 p-0">
            <button type="button" id="add-to-cart-button" class="btn" @click="addToCart(this.id)">
              añadir al carrito
              <ion-icon name="cart-outline" v-pre></ion-icon>
            </button>
          </div>
        </div>

        <div class="features pt-3">
          <h5><strong>Características</strong></h5>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Officia quas, officiis eius magni error magnam voluptatem</li>
            <li>nesciunt quod! Earum voluptatibus quaerat dolorem doloribus</li>
            <li>molestias ipsum ab, ipsa consectetur laboriosam soluta et</li>
            <li>ut doloremque dolore corrupti, architecto iusto beatae.</li>
          </ul>
        </div>

        <button id="wishlist-button" class="btn mr-3 p-1 py-0" :class="{ product_added_wishlist: isAddedToWishlist }"
          @click="addToWishList(this.id)">
          {{ wishlistString }}
        </button>

        <button id="show-cart-button" type="button" class="btn mr-3 p-1 py-0" @click="listCartItems()">
          Mostrar carrito

          <ion-icon name="cart-outline" v-pre></ion-icon>
        </button>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Inicializa las variables del componente
      product: {},           // Almacena los datos del producto
      category: {},          // Almacena los datos de la categoría del producto
      id: null,              // Almacena el ID del producto actual
      token: null,           // Almacena el token de autenticación del usuario
      isAddedToWishlist: false, // Bandera para controlar si se ha añadido a la lista de deseos
      wishlistString: "Añadir a la lista de deseos", // Etiqueta del botón de lista de deseos
      quantity: 1,           // Almacena la cantidad de productos a agregar al carrito
    };
  },
  // Define las propiedades esperadas que se pasan al componente
  props: ["baseURL", "products", "categories"],
  methods: {
    // Método para agregar un producto a la lista de deseos
    addToWishList(productId) {
      // Realiza una solicitud POST al servidor para añadir a la lista de deseos

      axios
        .post(`${this.baseURL}wishlist/add?token=${this.token}`, {
          id: productId,
        })
        .then(
          (response) => {
            if (response.status == 201) {
              this.isAddedToWishlist = true; // Producto añadido a la lista de deseos

              this.wishlistString = "Añadido a la lista de deseos";
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    // Método para agregar un producto al carrito
    addToCart(productId) {
      if (!this.token) {
        // Si el usuario no está autenticado, muestra un mensaje de error

        swal({
          text: "¡Por favor ingresa primero!",
          icon: "error",
        });
        return;
      }
      // Realiza una solicitud POST al servidor para añadir un producto al carrito

      axios
        .post(`${this.baseURL}cart/add?token=${this.token}`, {
          productId: productId,
          quantity: this.quantity,
        })
        .then(
          (response) => {
            if (response.status == 201) {
              swal({
                text: "Producto añadido al carrito!",
                icon: "success",
                closeOnClickOutside: false,
              });
              // Actualiza la barra de navegación llamando al evento personalizado "fetchData"

              this.$emit("fetchData");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    // Método para ver los elementos del carrito
    listCartItems() {
      // Realiza una solicitud GET al servidor para obtener los elementos del carrito
      axios.get(`${this.baseURL}cart/?token=${this.token}`).then(
        (response) => {
          if (response.status === 200) {
            this.$router.push("/cart"); // Redirige a la página del carrito

          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  // El gancho "mounted" se ejecuta cuando el componente está montado
  mounted() {
    // Obtiene el ID del producto actual a través de los parámetros de ruta
    this.id = this.$route.params.id;
    // Busca el producto en la lista de productos utilizando su ID
    this.product = this.products.find((product) => product.id == this.id);
    // Busca la categoría del producto en la lista de categorías
    this.category = this.categories.find(
      (category) => category.id == this.product.categoryId
    );
    // Obtiene el token de autenticación del usuario del almacenamiento local

    this.token = localStorage.getItem("token");
  },
};
</script>


<style>
.category {
  font-weight: 400;
}

/* Estilos para ocultar los botones de incremento y decremento de los input tipo número en navegadores específicos */

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox 
input[type="number"] {
  -moz-appearance: textfield;
}*/


#add-to-cart-button {
  background-color: #febd69;
}

#wishlist-button {
  background-color: #b9b9b9;
  border-radius: 0;
}

#show-cart-button {
  background-color: #131921;
  color: white;
  border-radius: 0;
}
</style>
