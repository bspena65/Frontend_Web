<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Nuestros Productos</h4>
        <router-link id="add-product" :to="{ name: 'AddProduct' }" v-show="$route.name == 'AdminProduct'">
          <button class="btn">Agregar un nuevo Producto</button>
        </router-link>
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
  // Define el nombre del componente como 'Product'
  name: 'Product',
  // Registra el componente "ProductBox" como una dependencia de este componente
  components: { ProductBox },
  // Define las propiedades esperadas que se pasan al componente
  props: ["baseURL", "products"],
  // El gancho "mounted" se ejecuta cuando el componente está montado
  mounted() {
    // Comprueba si el nombre de la ruta actual es 'AdminProduct' y si no hay un token de autenticación en el almacenamiento local
    if (this.$route.name == 'AdminProduct' && !localStorage.getItem('token')) {
      // Redirige al usuario a la página 'Signin'
      this.$router.push({ name: 'Signin' });
    }
  }
}
</script>


<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

#add-product {
  float: right;
  font-weight: 500;
}
</style>
