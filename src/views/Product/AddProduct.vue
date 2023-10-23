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
  data() {
    return {
      id: null,
      categoryId: null,
      name: null,
      description: null,
      imageURL: null,
      price: null
    }
  },
  props: ["baseURL", "products", "categories"],
  methods: {
    async addProduct() {
      // Crear un objeto con los datos del producto que se va a agregar
      const newProduct = {
        id: this.id,
        categoryId: this.categoryId,
        name: this.name,
        description: this.description,
        imageURL: this.imageURL,
        price: this.price
      }

      // Enviar una solicitud POST al servidor para agregar el producto
      await axios({
        method: 'post',
        url: this.baseURL + "product/add",
        data: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          // Emitir un evento para notificar a un componente padre que se ha agregado un producto
          this.$emit("fetchData");
          // Redirigir a una ruta llamada 'AdminProduct' (posiblemente una página de administración)
          this.$router.push({ name: 'AdminProduct' });
          // Mostrar una notificación de éxito utilizando la biblioteca 'swal'
          swal({
            text: "¡Producto agregado exitosamente!",
            icon: "success",
            closeOnClickOutside: false,
          });
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    // Comprobar si no hay un token de autenticación almacenado en el localStorage
    // y redirigir al usuario a la página de inicio de sesión ('Signin') si no hay un token
    if (!localStorage.getItem('token')) {
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
