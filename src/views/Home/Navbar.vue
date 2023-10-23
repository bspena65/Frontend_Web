<template>
  <nav class="navbar navbar-expand-lg mynav">
    <!--Logo-->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img id="logo" src="../assets/Logo1.1.png" />
    </router-link>

    <!--    Burger Button-->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!--      Search Bar-->
      <form class="form-inline ml-auto mr-auto">
        <div class="input-group">
          <input size="90" type="text" class="form-control" placeholder="¿Que estas buscando?" aria-label="Username"
            aria-describedby="basic-addon1" />
          <div class="input-group-prepend">
            <span class="input-group-text" id="search-button-navbar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                viewBox="0 0 16 16">
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
          </div>
        </div>
      </form>

      <!--      DropDowns-->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link text-light dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Navegar
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link class="dropdown-item" :to="{ name: 'Home' }">Inicio</router-link>
            <router-link class="dropdown-item" :to="{ name: 'Product' }">Producto</router-link>
            <router-link class="dropdown-item" :to="{ name: 'Category' }">Categoria</router-link>
          </div>
        </li>

        <li class="nav-item dropdown">
          <!-- Este es un elemento de la lista en la barra de navegación con una clase "dropdown" -->
          <a class="nav-link text-light dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Cuentas
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- Si no hay un token (es decir, el usuario no está autenticado) -->
            <router-link class="dropdown-item" v-if="!token" :to="{ name: 'Signin' }">Deseos</router-link>
            
            <!-- Muestra un enlace que lleva a la página "Signin" (inicio de sesión) -->
            <!-- Si hay un token (el usuario está autenticado) -->
            <router-link class="dropdown-item" v-else :to="{ name: 'Wishlist' }">Deseos</router-link>
            
            <!-- Muestra un enlace que lleva a la página "Wishlist" (lista de deseos) -->
            <!-- Si hay un token (el usuario está autenticado) -->
            <router-link class="dropdown-item" v-if="token" :to="{ name: 'Admin' }">Admin</router-link>
            
            <!-- Muestra un enlace que lleva a la página "Admin" (página de administración) -->
            <!-- Si no hay un token (es decir, el usuario no está autenticado) -->
            <router-link class="dropdown-item" v-if="!token" :to="{ name: 'Signin' }">Iniciar Sesión</router-link>
            
            <!-- Muestra un enlace que lleva a la página "Signin" (inicio de sesión) -->
            <!-- Si no hay un token (es decir, el usuario no está autenticado) -->
            <router-link class="dropdown-item" v-if="!token" :to="{ name: 'Signup' }">Registrarse</router-link>
            
            <!-- Muestra un enlace que lleva a la página "Signup" (registro) -->
            <!-- Si hay un token (el usuario está autenticado) -->
            <a class="dropdown-item" v-if="token" href="#" @click="signout">Cerrar Sesión</a>
            <!-- Muestra un enlace que ejecuta la función "signout" al hacer clic, lo que permite al usuario cerrar sesión -->
          </div>
        </li>


        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{ name: 'Order' }">Ordenes</router-link>
        </li>
        <li class="nav-item">
          <div id="cart">
            <span id="nav-cart-count">{{ cartCount }}</span>
            <router-link class="text-light" :to="{ name: 'Cart' }"><i class="fa fa-shopping-cart"
                style="font-size:36px"></i></router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
// Exporta el componente Vue como el componente predeterminado de este módulo
export default {
  // Define el nombre del componente
  name: "Navbar",
  // Declara las propiedades que este componente espera recibir
  props: ["cartCount"],
  // Inicia la sección de datos locales del componente
  data() {
    return {
      // Inicializa un campo de datos llamado "token" con el valor null
      token: null,
    };
  },
  // Comienza la sección de métodos del componente
  methods: {
    // Define un método llamado "signout" que se ejecuta cuando el usuario cierra sesión
    signout() {
      // Elimina la clave "token" del almacenamiento local del navegador
      localStorage.removeItem("token");
      // Establece la variable de datos "token" en null
      this.token = null;
      // Emite un evento personalizado llamado "resetCartCount"
      this.$emit("resetCartCount");
      // Navega a la ruta con nombre "Home" utilizando el enrutador Vue
      this.$router.push({ name: "Home" });
      // Muestra un cuadro de diálogo con un mensaje de éxito
      swal({
        text: "Cierre de sesión exitoso",
        icon: "success",
        closeOnClickOutside: false,
      });
    },
  },
  // El gancho "mounted" se ejecuta cuando el componente se ha montado en el DOM
  mounted() {
    // Obtiene el valor de la clave "token" del almacenamiento local del navegador
    // y lo asigna a la variable de datos "token" del componente
    this.token = localStorage.getItem("token");
  },
};
</script>


<style scoped>
.mynav {
  background-color: #0c5564;

}

#logo {
  width: 150px;
  margin-left: 10px;
  margin-right: 10px;
}


.nav-link {
  color: rgba(255, 255, 255);
}

#search-button-navbar {
  background-color: #81afb8;
  border-color: #0d1a1d;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}

#nav-cart-count {
  background-color: rgb(67, 102, 197);
  color: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  font-size: 15px;
  margin-left: 10px;
}

#cart {
  position: relative;
}
</style>
