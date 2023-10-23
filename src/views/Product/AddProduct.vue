<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Agregar nuevo Producto</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form>
          <div class="form-group">
            <label>Categoria</label>
            <select class="form-control" v-model="categoryId" required>
              <option v-for="category of categories" :key="category.id" :value="category.id">{{ category.categoryName }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" v-model="name" required>
          </div>
          <div class="form-group">
            <label>Descripcion</label>
            <input type="text" class="form-control" v-model="description" required>
          </div>
          <div class="form-group">
            <label>Imagen</label>
            <input type="url" class="form-control" v-model="imageURL" required>
          </div>
          <div class="form-group">
            <label>Pecio</label>
            <input type="number" class="form-control" v-model="price" required>
          </div>
          <button type="button" class="btn btn-primary" @click="addProduct">Crear Producto</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  // Define el componente Vue
  data() {
    return {
      // Inicializa variables para los datos del nuevo producto
      id: null,
      categoryId: null,
      name: null,
      description: null,
      imageURL: null,
      price: null
    }
  },
  // Define las propiedades esperadas que se pasan al componente
  props: ["baseURL", "products", "categories"],
  methods: {
    // Define el método "addProduct"
    async addProduct() {
      // Crea un objeto "newProduct" con los datos del nuevo producto
      const newProduct = {
        id: this.id,
        categoryId: this.categoryId,
        name: this.name,
        description: this.description,
        imageURL: this.imageURL,
        price: this.price
      }

      // Realiza una solicitud POST para agregar el nuevo producto al servidor
      await axios({
        method: 'post',
        url: this.baseURL + "product/add",
        data: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          // Emite un evento personalizado "fetchData" para notificar al padre
          this.$emit("fetchData");
          // Redirige al usuario a la página 'AdminProduct'
          this.$router.push({ name: 'AdminProduct' });
          // Muestra un mensaje de éxito utilizando SweetAlert2
          swal({
            text: "¡Producto agregado exitosamente!",
            icon: "success",
            closeOnClickOutside: false,
          });
        })
        .catch(err => console.log(err));
    }
  },
  // El gancho "mounted" se ejecuta cuando el componente está montado
  mounted() {
    // Comprueba si no hay un token de autenticación en el almacenamiento local
    if (!localStorage.getItem('token')) {
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
</style>
