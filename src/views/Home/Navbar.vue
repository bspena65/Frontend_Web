<template>
  <nav class="navbar navbar-expand-lg mynav">
    <!--Logo-->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img id="logo" src="../../assets/Logo1.1.png" />
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
          <a class="nav-link text-light dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Cuentas
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- Enlace para ir a la página "Deseos" si el usuario no está autenticado (token no existe) -->
            <router-link class="dropdown-item" v-if="!token" :to="{ name: 'Signin' }">Deseos</router-link>

            <!-- Enlace para ir a la página "Deseos" si el usuario está autenticado (token existe) -->
            <router-link class="dropdown-item" v-else :to="{ name: 'Wishlist' }">Deseos</router-link>

            <!-- Enlace para ir a la página "Admin" si el usuario está autenticado y tiene acceso de administrador (isLoggedIn es verdadero) -->
            <router-link class="dropdown-item" v-if="token " :to="{ name: 'Admin' }">Admin</router-link>

            <!-- Enlace para ir a la página "Iniciar Sesión" si el usuario no está autenticado (token no existe) -->
            <router-link class="dropdown-item" v-if="!token" :to="{ name: 'Signin' }">Iniciar Sesión</router-link>

            <!-- Enlace para ir a la página "Registrarse" si el usuario no está autenticado (token no existe) -->
            <router-link class="dropdown-item" v-if="!token" :to="{ name: 'Signup' }">Registrarse</router-link>

            <!-- Enlace para cerrar la sesión del usuario si está autenticado (token existe) -->
            <a class="dropdown-item" v-if="token" href="#" @click="signout">Cerrar Sesión</a>
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
import swal from 'sweetalert';
export default {
  name: "Navbar",
  props: ["cartCount"],
  data() {
    return {
      token: null,
    };
  },
methods: {
  signout() {
    // Mostrar un cuadro de diálogo SweetAlert2 para confirmar la acción
    swal({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar la sesión?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
    })
    .then((userConfirmed) => {
      if (userConfirmed) {
        // El usuario ha confirmado, proceder con el cierre de sesión
        localStorage.removeItem("token");
        this.token = null;
        this.$emit("resetCartCount");
        this.$router.push({ name: "Home" });
        swal({
          text: "Cierre de sesión exitoso",
          icon: "success",
          closeOnClickOutside: false,
        });
      } else {
        // El usuario ha cancelado la acción, No es necesario hacer nada en este caso
      }
    });
  },
},
  mounted() {
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
