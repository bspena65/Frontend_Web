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