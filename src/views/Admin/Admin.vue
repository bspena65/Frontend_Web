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

