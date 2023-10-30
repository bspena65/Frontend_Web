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
}