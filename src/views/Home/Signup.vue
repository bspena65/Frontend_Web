<template>
  <div class="container">
    <!--    Logo Div-->
    <div class="row">
      <div class="col-12 text-center pt-3">
        <router-link :to="{ name: 'Home' }">
          <img id="logo" src="../../assets/Logo1.1.png" />
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signup-div" class="flex-item border">
          <h2 class="pt-4 pl-4">Crear Cuenta</h2>
          <form @submit="signup" class="pt-4 pl-4 pr-4">
            <div class="form-group">
              <label>Correo electronico</label>
              <input type="email" name="email" class="form-control" v-model="email" required />
            </div>
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label>Apellido</label>
                  <input type="name" name="firstName" class="form-control" v-model="firstName" required />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Nombre</label>
                  <input type="name" name="lastName"  class="form-control" v-model="lastName" required />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Contraseña</label>
              <input type="password" class="form-control"  name="password" v-model="password" required />
            </div>
            <div class="form-group">
              <label>Confirmar Contraseña</label>
              <input type="password" class="form-control" v-model="passwordConfirm" required />
            </div>
            <button type="submit" class="btn btn-primary mt-2 py-0">
              Crear Cuenta
            </button>
          </form>
          <hr />
          <small class="form-text text-muted pt-2 pl-4 text-center">¿Ya tienes una cuenta?</small>
          <p class="text-center">
            <router-link class="btn btn-dark text-center mx-auto px-5 py-1 mb-2" :to="{ name: 'Signin' }">Inicia Sesion
              aqui</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  props: ["baseURL"],
  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      passwordConfirm: null,
    };
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      // if the password matches
      if (this.password === this.passwordConfirm) {
        // make the post body
        const user = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
        };

        await axios
          .post(`${this.baseURL}user/signup`, user)
          .then(() => {
            this.$router.replace("/");
            swal({
              text: "Registro de usuario exitoso. Por favor Iniciar sesión",
              icon: "success",
              closeOnClickOutside: false,
              timer: 2000, // 3000 milisegundos = 3 segundos
              buttons: false, // Esto quita el botón "OK"
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        swal({
          text: "¡Error! Las contraseñas no coinciden",
          icon: "error",
          closeOnClickOutside: false,
          timer: 2000, // 3000 milisegundos = 3 segundos
          buttons: false, // Esto quita el botón "OK"
        });
      }
    },
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
  color: rgb(255, 255, 255);
  border-color: #0c5564;
  border-radius: 3px;
  width: 50%;
  margin: 0 auto;
  display: block;
}

#logo {
  width: 200px;
  margin-bottom: -20px;

}

@media only screen and (min-width: 992px) {
  #signup-div {
    width: 40%;
  }
}
</style>
