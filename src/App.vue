<template>
 

  <router-view :baseURL="baseURL">

  </router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      baseURL: "http://localhost:8080/"
    };
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
