<template>
  <div class="adminPanel">
    <router-link :to="{ name: 'AdminCategory' }">
      <button type="button" class="btn btn-primary btn-lg">Crear Categorias</button>
    </router-link>
    <router-link :to="{ name: 'AdminProduct' }">
      <button type="button" class="btn btn-primary btn-lg">Crear Productos</button>
    </router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Signin' });
    }
  }
}
</script>

