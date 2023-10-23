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
import ProductBox from '../../components/Product/ProductBox';

export default {
  data() {
    return {
      products: null,  // Almacena la lista de productos en la lista de deseos
      token: null      // Almacena el token de autenticación del usuario
    }
  },
  name: 'Product',
  components: { ProductBox },
  props: ["baseURL"],
  methods: {
    fetchWishlist() {
      // Realiza una solicitud GET al servidor para obtener los productos en la lista de deseos
      axios.get(`${this.baseURL}wishlist/${this.token}`)
        .then(data => this.products = data.data)
        .catch(err => console.log(err));
    }
  },
  mounted() {
    // Obtiene el token de autenticación del usuario desde el localStorage
    this.token = localStorage.getItem('token');
    // Llama al método fetchWishlist para obtener y mostrar los productos en la lista de deseos
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
