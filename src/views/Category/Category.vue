<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Nuestras Categorías</h4>
        <router-link id="add-category" :to="{ name: 'AddCategory' }" v-show="$route.name == 'AdminCategory'">
          <button class="btn">Agregar una nueva categoria</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div v-for="category of categories" :key="category.id"
        class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
        <CategoryBox :category="category">
        </CategoryBox>
      </div>
    </div>
  </div>
</template>

<script>
// Importa el componente CategoryBox desde la ruta proporcionada
import CategoryBox from '../../components/Category/CategoryBox';

export default {
  // Nombre del componente
  name: 'Category',

  // Componentes que se utilizan en este componente
  components: { CategoryBox },

  // Propiedades que se esperan recibir desde el componente padre
  props: ["baseURL", "categories"],

  // Método que se ejecuta después de que el componente se ha montado en el DOM
  mounted() {
    // Verifica si la ruta actual es 'AdminCategory' y si no hay un token en el localStorage
    if (this.$route.name == 'AdminCategory' && !localStorage.getItem('token')) {
      // Redirige a la página de inicio de sesión ('Signin') si no hay un token y la ruta es 'AdminCategory'
      this.$router.push({ name: 'Signin' });
    }
  }
}
</script>

