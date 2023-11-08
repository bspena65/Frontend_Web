<template>
  <div class="not-found container">
    <h2>404</h2>
    <h3>Página no encontrada</h3>
    <h5>No te preocupes, vuelve a
      <router-link :to="{ name: 'Home' }">Home</router-link>
    </h5>
  </div>
</template>
