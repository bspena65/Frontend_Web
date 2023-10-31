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
      // Inicializa el objeto "product" como nulo
      product: null
    }
  },
  // Define las propiedades esperadas que se pasan al componente
  props: ["baseURL", "products", "categories"],
  methods: {
    // Define el método "editProduct"
    async editProduct() {
      // Realiza una solicitud POST para actualizar el producto en el servidor
      axios.post(this.baseURL + "product/update/" + this.id, this.product)
        .then(res => {
          // Emite un evento personalizado "fetchData" para notificar al padre
          this.$emit("fetchData");
          // Redirige al usuario a la página 'AdminProduct'
          this.$router.push({ name: 'AdminProduct' });
          // Muestra un mensaje de éxito utilizando SweetAlert2

          swal({
            text: "¡Producto actualizado exitosamente!",
            icon: "success",
            closeOnClickOutside: false,
            timer: 1000, // 3000 milisegundos = 3 segundos
            buttons: false, // Esto quita el botón "OK"
          });
        })
        .catch(err => console.log("err", err));
    }
  },
  // El gancho "mounted" se ejecuta cuando el componente está montado
  mounted() {
    // Comprueba si no hay un token de autenticación en el almacenamiento local
    if (!localStorage.getItem('token')) {
      // Redirige al usuario a la página 'Signin' y termina la ejecución
      this.$router.push({ name: 'Signin' });
      return;
    }
    // Obtiene el valor del parámetro de ruta llamado 'id'
    this.id = this.$route.params.id;
    // Busca el producto con el 'id' en la lista de productos

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
