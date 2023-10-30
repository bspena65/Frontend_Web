<template>
    <!-- Elemento contenedor con centrado de texto -->
    <div class="text-center">
        <!-- Indicador de carga (spinner) en rojo -->
        <div class="spinner-grow text-danger" role="status">
            <!-- Texto para lectores de pantalla -->
            <span class="sr-only">Cargando...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FailedPayment',
    mounted() {
        // Elimina el identificador de sesión almacenado en el localStorage
        localStorage.removeItem("sessionId");

        // Redirige a la ruta '/order'
        window.location.href = '/order';
    }
}
</script>
