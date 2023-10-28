<template>
  <nav class="navbar navbar-expand-lg mynav">

    <div class="logo">

      <!--Logo-->
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
        <img id="logo" src="../../assets/Logo1.1.png" />
      </router-link>

      <!--    Burger Button-->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>


    <div class="navcolumn">
      <div class="search">

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!--      Search Bar-->
          <form class="form-inline ml-auto mr-auto">
            <div class="input-group">
              <input size="90" type="text" class="form-control" :placeholder="$t('message.options.placeholder')" aria-label="Username"
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
        </div>
        <LanguageSwitcher class="lenguaje"> </LanguageSwitcher>

      </div>

      <div class="enlace">
        <ul class="navbar-nav ml-auto">

          <li class="nav-item">

            <!-- Enlace de navegación a la ruta con nombre 'Home' -->
            <router-link class="nav-link text-light" :to="{ name: 'Home' }">{{ $t('message.options.start') }}</router-link>

            <!-- Enlace de navegación a la ruta con nombre 'Product' -->
            <router-link class="nav-link text-light" :to="{ name: 'Product' }">{{ $t('message.options.product') }}</router-link>

            <!-- Enlace de navegación a la ruta con nombre 'Category' -->
            <router-link class="nav-link text-light" :to="{ name: 'Category' }">{{ $t('message.options.category') }}</router-link>

            <!-- Enlace para ir a la página "Deseos" si el usuario no está autenticado (token no existe) -->
            <router-link class="nav-link text-light" v-if="!token" :to="{ name: 'Signin' }">{{ $t('message.options.wishes') }}</router-link>

            <!-- Enlace para ir a la página "Deseos" si el usuario está autenticado (token existe) -->
            <router-link class="nav-link text-light" v-else :to="{ name: 'Wishlist' }">{{ $t('message.options.wishes') }}</router-link>

            <!-- Enlace para ir a la página "Admin" si el usuario está autenticado y tiene acceso de administrador (isLoggedIn es verdadero) -->
            <router-link class="nav-link text-light" v-if="token" :to="{ name: 'Admin' }">{{ $t('message.options.admin') }}</router-link>

            <!-- Enlace para ir a la página "Iniciar Sesión" si el usuario no está autenticado (token no existe) -->
            <router-link class="nav-link text-light" v-if="!token" :to="{ name: 'Signin' }">{{ $t('message.options.signin') }}</router-link>

            <!-- Enlace para ir a la página "Registrarse" si el usuario no está autenticado (token no existe) -->
            <router-link class="nav-link text-light" v-if="!token" :to="{ name: 'Signup' }">{{ $t('message.options.signup') }}</router-link>

            <!-- Enlace para cerrar la sesión del usuario si está autenticado (token existe) -->
            <a class="nav-link text-light" v-if="token" href="#" @click="signout">{{ $t('message.options.signoff') }}</a>
            <router-link class="nav-link text-light" :to="{ name: 'Order' }">{{ $t('message.options.orders') }}</router-link>
          </li>

          <li class="nav-item">
            <div id="cart">
              <span id="nav-cart-count">{{ cartCount }}</span>
              <router-link class="text-light" :to="{ name: 'Cart' }"><i class="fa fa-shopping-cart" style="font-size:36px"></i></router-link>
            </div>
          </li>

        </ul>
      </div>
    </div>

  </nav>
</template>

<script>
import LanguageSwitcher from '../Home/LanguageSwitcher.vue'
export default {
  name: "Navbar",
  props: ["cartCount"],
  components:{
  LanguageSwitcher
  },
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

      // Eliminar el token del almacenamiento local
      localStorage.removeItem("token");

      // Establecer la propiedad 'token' en null
      this.token = null;

      // Emitir un evento para restablecer el contador del carrito (si está implementado)
      this.$emit("resetCartCount");

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
  display: flex;
  flex-direction: row;  /* Cambia la dirección a columna */
  justify-content: space-evenly;
  align-items: center;  /* Centra los elementos verticalmente */
}

.search{
  display: flex;
  flex-direction: row;  /* Cambia la dirección a columna */
  justify-content: space-evenly;
  align-items: center;  /* Centra los elementos verticalmente */
}

.lenguaje{
  margin-left: 30px;
}

#logo {
  width: 200px;
  margin: 20px auto;   /*Espaciado alrededor del logo */

  /*margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 20px;
  margin-right: 180px;*/
}


.navcolumn {
  display: flex;
  flex-direction: column;/* Cambia la dirección a columna */
  align-items: center;/* Centra los elementos verticalmente */
}

.enlace {
  margin-top: 20px;  /* Espaciado entre el logo y los enlaces */
}

.nav-link {
  color: rgba(255, 255, 255);
  margin-right: 15px;
  font-weight: bold;
  font-size: 15px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px; /* Aumenta el ancho para acomodar el contenido */
  height: 22px; /* Aumenta el alto para acomodar el contenido */
  font-size: 20px;
  position: absolute;
  top: -5px; /* Ajusta la posición vertical */
  right: -5px; /* Ajusta la posición horizontal */
}

#cart {
  position: relative;
  display: flex;  /* Mantén el estilo del carrito como una fila */
  align-items: center;  /* Centra verticalmente el icono del carrito */
}

#cart i {
  font-size: 36px;  /* Restaura el estilo del icono del carrito */
  color: white;  /* Cambia el color del icono del carrito si es necesario */

}


</style>

