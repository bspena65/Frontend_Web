<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Editar producto</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form v-if="product">
          <div class="form-group">
            <label>Categoria</label>
            <select class="form-control" v-model="product.categoryId" required>
              <option v-for="category of categories" :key="category.id" :value="category.id">{{ category.categoryName }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" v-model="product.name" required>
          </div>
          <div class="form-group">
            <label>Descripcion</label>
            <input type="text" class="form-control" v-model="product.description" required>
          </div>
          <div class="form-group">
            <label>Imagen</label>
            <input type="url" class="form-control" v-model="product.imageURL" required>
          </div>
          <div class="form-group">
            <label>Precio</label>
            <input type="number" class="form-control" v-model="product.price" required>
          </div>
          <button type="button" class="btn btn-primary" @click="editProduct">Guardar</button>
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
      product: null
    }
  },
  props: ["baseURL", "products", "categories"],
  methods: {
    async editProduct() {
      // Enviar una solicitud POST al servidor para actualizar el producto
      axios.post(this.baseURL + "product/update/" + this.id, this.product)
        .then(res => {
          // Emitir un evento para notificar a un componente padre que se ha actualizado el producto
          this.$emit("fetchData");
          // Redirigir al usuario a una ruta llamada 'AdminProduct'
          this.$router.push({ name: 'AdminProduct' });
          // Mostrar una notificación de éxito utilizando la biblioteca 'swal'
          swal({
            text: "¡Producto actualizado exitosamente!",
            icon: "success",
            closeOnClickOutside: false,
          });
        })
        .catch(err => console.log("err", err));
    }
  },
  mounted() {
    // Comprobar si no hay un token de autenticación almacenado en el localStorage
    // y redirigir al usuario a la página de inicio de sesión ('Signin') si no hay un token
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Signin' });
      return;
    }
    
    // Obtener el ID del producto a editar desde los parámetros de la ruta
    this.id = this.$route.params.id;
    
    // Buscar el producto en la lista de productos basado en su ID
    this.product = this.products.find(product => product.id == this.id);
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
