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
                  <label>Nombre</label>
                  <input type="name" name="Name" class="form-control" v-model="name" required />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Apellido</label>
                  <input type="name" name="lastName" class="form-control" v-model="lastName" required />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Contraseña</label>
              <input type="password" class="form-control" name="password" v-model="password" required />
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
      name: null,
      lastName: null,
      password: null,
      passwordConfirm: null,
    };
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      if (this.password === this.passwordConfirm) {
        const user = {
          email: this.email,
          name: this.name,
          lastName: this.lastName,
          password: this.password,
        };


        await axios.post(`${this.baseURL}user/signup`, user)
          .then(() => {
            this.$router.replace("/");
            swal({
              text: "Registro de usuario exitoso. Por favor Iniciar sesión",
              icon: "success",
              closeOnClickOutside: false,
              timer: 2000,
              buttons: false,
            });
          })
          .catch((err) => {
            // Aquí manejas el error específico para un usuario ya registrado
            if (err.response && err.response.status === 409) {
              swal({
                text: "El correo electrónico ya está registrado.",
                icon: "warning",
                closeOnClickOutside: false,
                timer: 2000,
                buttons: false,
              });
            } else {
              // Manejo de otros tipos de errores
              swal({
                text: "Ocurrió un error al registrar el usuario.",
                icon: "error",
                closeOnClickOutside: false,
                timer: 2000,
                buttons: false,
              });
            }
          });
      } else {
        swal({
          text: "¡Error! Las contraseñas no coinciden",
          icon: "error",
          closeOnClickOutside: false,
          timer: 2000,
          buttons: false,
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
