<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Editar Categoria</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form v-if="category">
          <div class="form-group">
            <label>Nombre de Categoria</label>
            <input type="text" class="form-control" v-model="category.categoryName" required>
          </div>
          <div class="form-group">
            <label>Descripcion</label>
            <input type="text" class="form-control" v-model="category.description" required>
          </div>
          <div class="form-group">
            <label>Imagen</label>
            <input type="url" class="form-control" v-model="category.imageUrl" required>
          </div>
          <button type="button" class="btn btn-primary" @click="editCategory">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: null
    }
  },
  props: ["baseURL", "categories"],
  methods: {
      // Método asincrónico para editar una categoría
      async editCategory() {
        // Eliminar la propiedad "products" del objeto category antes de enviar la solicitud
        delete this.category["products"];

        try {
          // Enviar una solicitud POST para actualizar la categoría en el servidor
          const response = await axios.post(this.baseURL + "category/update/" + this.id, this.category);

          // Manejar la respuesta exitosa
          if (response.status === 200) {
            // Emitir un evento para notificar al componente padre que debe actualizar datos
            this.$emit("fetchData");

            // Redirigir a la página de administración de categorías
            this.$router.push({ name: 'AdminCategory' });

            // Mostrar una notificación de éxito usando la librería SweetAlert2
            swal({
              text: "¡Categoría actualizada correctamente!",
              icon: "success",
              closeOnClickOutside: false,
              timer: 1000, // 1000 milisegundos = 1 segundo
              buttons: false, // Esto quita el botón "OK"
            });
          }
        } catch (error) {
          // Manejar errores en la solicitud
          console.log(error);
        }
      }
    },

  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Signin' });
      return;
    }
    this.id = this.$route.params.id;
    this.category = this.categories.find(category => category.id == this.id);
    console.log('category', this.category);
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
