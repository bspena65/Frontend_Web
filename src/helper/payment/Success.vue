<template>
  <div class="text-center">
    <!-- Spinner de carga visual -->
    <div class="spinner-border" role="status">
      <span class="sr-only">Cargando...</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
        // Construir la URL para agregar una orden con el token y la sesión
        const url = `${this.baseURL}order/add?token=${this.token}&sessionId=${this.sessionId}`;
        
        // Realizar una solicitud POST a la URL
        const response = await axios.post(url);

        // Verificar el código de estado de la respuesta
        if (response.status === 200 || response.status === 201) {
          // Redirigir a la ruta '/order' en caso de éxito
          window.location.href = '/order';
        } else {
         
        }
      } 
    }
  },
}
</script>