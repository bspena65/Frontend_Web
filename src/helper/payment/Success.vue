<template>
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccess',
  props: ["baseURL"],
  data() {
    return {
      token: null,
      sessionId: null
    }
  },
  methods: {
    async saveOrder() {
      try {
        const url = `${this.baseURL}order/add?token=${this.token}&sessionId=${this.sessionId}`;
        const response = await axios.post(url);

        if (response.status === 200 || response.status === 201) {
          window.location.href = '/order';
        } else {
          // Manejar otros códigos de estado
          console.error('Error al realizar el pedido:', response.status, response.statusText);
        }

      } catch (error) {
        console.error('Error en la petición:', error);
      }
    }
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.sessionId = localStorage.getItem("sessionId");
    this.saveOrder()
  }
}
</script>

