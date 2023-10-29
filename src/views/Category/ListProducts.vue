<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">{{ category.categoryName }}</h4>
        <h5>{{ msg }}</h5>
      </div>
    </div>

    <div class="row">
      <img v-show="len == 0" class="img-fluid" src="../../assets/sorry.jpg" alt="Sorry">
       <!-- Iteración sobre los productos de la categoría -->
      <div v-for="product of category.products" :key="product.id"
        class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
        <!-- Componente ProductBox para cada producto -->
        <ProductBox :product="product">
        </ProductBox>
      </div>
    </div>
  </div>
</template>

<!-- Proceso y llamado componente -->
<script>

import ProductBox from '../../components/Product/ProductBox';
export default {
  name: 'ListProducts',
  data() {
    return {
      id: null,
      categoryIndex: null,
      category: {},
      len: 0,
      msg: null
    }
  },
  components: { ProductBox },
  props: ["baseURL", "categories"],
  
}
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

h5 {
  font-family: 'Roboto', sans-serif;
  color: #686868;
  font-weight: 300;
}
</style>
