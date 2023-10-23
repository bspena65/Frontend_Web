<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Tu lista de deseos</h4>
      </div>
    </div>

    <div class="row">
      <div v-for="product of products" :key="product.id"
        class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
        <ProductBox :product="product">
        </ProductBox>
      </div>
    </div>
  </div>
</template>

<script>
// Importa el componente "ProductBox" desde la ruta relativa '../../components/Product/ProductBox'
import ProductBox from '../../components/Product/ProductBox';

export default {
  data() {
    return {
      // Inicializa las variables del componente
      products: null, // Almacena los productos de la lista de deseos
      token: null,   // Almacena el token de autenticación del usuario
    }
  },
  // Define el nombre del componente como 'Product'
  name: 'Product',
  // Registra el componente "ProductBox" como una dependencia de este componente
  components: { ProductBox },
  // Define las propiedades esperadas que se pasan al componente
  props: ["baseURL"],
  methods: {
    // Método para recuperar la lista de deseos del usuario
    fetchWishlist() {
      // Realiza una solicitud GET al servidor para obtener la lista de deseos del usuario
      axios.get(`${this.baseURL}wishlist/${this.token}`)
        .then(data => this.products = data.data)
        .catch(err => console.log(err));
    }
  },
  // El gancho "mounted" se ejecuta cuando el componente está montado
  mounted() {
    // Obtiene el token de autenticación del usuario del almacenamiento local
    this.token = localStorage.getItem('token');
    // Llama al método "fetchWishlist" para recuperar la lista de deseos del usuario
    this.fetchWishlist();
  }
}
</script>


<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
</style>
