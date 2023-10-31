<template>
  <div id="home">
    <!-- Page Wrapper -->

    <div id="imageCarousel" class="carousel slide" data-ride="carousel">

      <!-- Flecha de navegación izquierda -->
      <a class="carousel-control-prev" href="#imageCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>

      <!-- Flecha de navegación derecha -->
      <a class="carousel-control-next" href="#imageCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>

      <ol class="carousel-indicators">
        <li data-target="#imageCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#imageCarousel" data-slide-to="1"></li>
        <li data-target="#imageCarousel" data-slide-to="2"></li>
        <li data-target="#imageCarousel" data-slide-to="3"></li>
        <li data-target="#imageCarousel" data-slide-to="4"></li>
      </ol>


      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="carousel-image" src="../../assets/HomeEcommerce.png" alt="Imagen 1">
        </div>
        <div class="carousel-item">
          <img class="carousel-image" src="../../assets/Home-Slider-1.png" alt="Imagen 2">
        </div>
        <div class="carousel-item">
          <img class="carousel-image" src="../../assets/Home-Slider-3.png" alt="Imagen 3">
        </div>
        <div class="carousel-item">
          <img class="carousel-image" src="../../assets/Home-Slider-2.png" alt="Imagen 4">
        </div>
        <div class="carousel-item">
          <img class="carousel-image" src="../../assets/Home-Slider-4.png" alt="Imagen 5">
        </div>
      </div>

    </div>


    <div id="start-shopping" class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2 class="pt-3">Categorías principales</h2>
        </div>
      </div>
      <div class="row">
        <div v-for="index in this.category_size" :key="index"
          class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
          <CategoryBox :category="categories[index - 1]">
          </CategoryBox>
        </div>
      </div>
    </div>

    <hr>
    <div class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2 class="pt-3">Productos principales</h2>
        </div>
      </div>
      <div class="row">
        <div v-for="index in this.product_size" :key="index"
          class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
          <ProductBox :product="products[index - 1]">
          </ProductBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "../../components/Product/ProductBox";
import CategoryBox from "../../components/Category/CategoryBox";
export default {
  name: 'Home',
  components: { ProductBox, CategoryBox },
  props: ["baseURL", "products", "categories"],
  data() {
    return {
      category_size: 0,
      product_size: 0
    }
  },
  mounted() {
    this.category_size = this.categories.length;
    this.category_size = Math.min(6, this.category_size);

    this.product_size = this.products.length;
    this.product_size = Math.min(8, this.product_size);

    $(document).ready(function () {
      // Selecciona todas las imágenes del carrusel y establece la misma duración de transición
      $('#imageCarousel .carousel-item').css('transition', '2s');
      $('#imageCarousel').carousel({
        interval: 5000 // Cambia la imagen cada 5 segundos (5000 milisegundos)
      });
    });
  }
}
</script>

<style>
.page-holder {
  min-height: 100vh;
}

.carousel-image {
  width: 100%;
  /* Ancho deseado, puedes usar porcentaje o píxeles */
  height: 480px;
  /* El valor "auto" mantiene la proporción de aspecto */
}


#heading {
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  opacity: 0.8;
  font-family: 'Josefin Sans', sans-serif;
}

#content {
  opacity: 0.9;
}

h2 {
  font-family: 'Josefin Sans', sans-serif;
}
</style>
