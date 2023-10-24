<template>
  <div class="container">



    <!--    Logo Div-->
    <div class="row">
      <div class="col-12 text-center pt-3">
        <router-link :to="{ name: 'Home' }">
          <img id="logo" src="../../assets/LogoFinal.png" />
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signin-div" class="flex-item border">
          <h2 class="pt-4 pl-4">Iniciar Secion</h2>
          <form ref="signinForm" @submit="signin" class="pt-4 pl-4 pr-4">
            <div class="form-group">
              <label>Correo</label>
              <input type="email" class="form-control" autocomplete v-model="email" required />
            </div>
            <div class="form-group">
              <label>Contraseña</label>
              <input type="password" class="form-control" v-model="password" required />
            </div>
            <small class="form-text text-muted">Al continuar, aceptas las Condiciones de uso de Sports Store y
              Aviso de Privacidad.</small>
            <button type="submit" class="btn btn-primary mt-2 py-0">
              Iniciar
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
            </button>

            <div v-if="loggedIn">
              <br><br><button @click="logout">Logout</button><br><br>
              <label> Usuario: {{ user.name }} </label><br>
              <label> Email: {{ user.email }} </label><br>
              <img :src="user.picture" />
            </div>
            <div class="p" v-else>
              <GoogleLogin :callback="callback" prompt />
            </div>

          </form>



          <hr />
          <small class="form-text text-muted pt-2 pl-4 text-center">¿Nuevo en Sports Store?</small>
          <p class="text-center">
            <router-link :to="{ name: 'Signup' }" class="btn btn-dark text-center mx-auto px-5 py-1 mb-2">Cree su cuenta
              aqui</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { decodeCredential, googleLogout } from 'vue3-google-login';
import {dataG} from './datag'
export default {
  name: "Signin",
  props: ["baseURL"],
  data() {
    return {
      email: null,
      password: null,
      loading: null,

      loggedIn: false,
      user: null,

      callback: (response) => {
    // Este callback se activará cuando el usuario seleccione o inicie sesión
    // en su cuenta de Google desde la ventana emergente.
    console.log("Manejar la respuesta", response);
    
    
}

        // Redirigir a la página de inicio
        //this.$router.push({ name: 'Home' });

        this.password = dataG.pass 
        this.email = dataG.mail

        //console.log(this.email);

        this.$nextTick(() => {
          this.$refs.signinForm.dispatchEvent(new Event("submit"));
        });

      },

    };
  },
  methods: {
    async signin(e) {
      e.preventDefault();
      this.loading = true;

      const user = {
        email: this.email,
        password: this.password,
      };

      await axios
        .post(`${this.baseURL}user/signIn`, user)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          document.cookie = "token=" + res.data.token;

          this.$emit("fetchData");
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          swal({
            text: "¡Error en credenciales, verifique e intente de nuevo!",
            icon: "error",
            closeOnClickOutside: false,
            timer: 2000, // 3000 milisegundos = 3 segundos
            buttons: false, // Esto quita el botón "OK"
          });
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    logout() {
      googleLogout();
      this.loggedIn = false;
    },

  },
  mounted() {
    this.loading = false;
  },

};
</script>

<style scoped>
.btn-dark {
  background-color: #e7e9ec;
  color: #000;
  font-size: smaller;
  border-radius: 0;
  border-color: #adb1b8;
  margin-top: 3px;
  width: 50%;
  display: block;
}

.btn-primary {
  background-color: #0c5564;
  color: rgb(255, 249, 249);
  border-color: #0c5564;
  border-radius: 0;
  width: 50%;
  margin: 0 auto;
  display: block;
}

#logo {
  width: 200px;
  margin-bottom: -20px;
}

@media only screen and (min-width: 992px) {
  #signin-div {
    width: 40%;
  }
}
.p{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
