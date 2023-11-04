<template>
  <div class="adminPanel">
    <!-- Enlace de router para redirigir a la página de administración de categorías -->
    <router-link :to="{ name: 'AdminCategory' }">
      <button type="button" class="btn btn-primary btn-lg">Crear Categorias</button>
    </router-link>
    
    <!-- Enlace de router para redirigir a la página de administración de productos -->
    <router-link :to="{ name: 'AdminProduct' }">
      <button type="button" class="btn btn-primary btn-lg">Crear Productos</button>
    </router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    // Redirigir a la página de inicio de sesión si no hay un token almacenado en el localStorage
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Signin' });
    }
  }
}
</script>

<style >
.adminPanel {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 110px;

}

.adminPanel button {
  font-size: 30px;
  width: fit-content;
  border-radius: 10px;
  margin: 30px 30px;
}
</style>

