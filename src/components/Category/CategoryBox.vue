<template>
  <div class="card h-100 w-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img class="card-img-top embed-responsive-item" :src="category.imageUrl" alt="Category Image" />
    </div>

    
  </div>
</template>

<script>
export default {
  name: "CategoryBox",
  props: ["category"],
  methods: {
    listProducts() {
      // Navega a la ruta "ListProducts" con el parámetro "id" igual al ID de la categoría actual
      this.$router.push({
        name: "ListProducts",
        params: { id: this.category.id },
      });
    },
  },
};
</script>


<style scoped>
.embed-responsive .card-img-top {
  object-fit: cover;
}

a {
  text-decoration: none;
}

.card-title {
  color: #484848;
  font-size: 1.1rem;
  font-weight: 400;
}

.card-title:hover {
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
}

#edit-category {
  float: right;
}
</style>
