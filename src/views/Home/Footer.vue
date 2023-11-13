<template>
  <footer>
    <div class="container pt-5">
      <div class="row1">
        <div class="col-md-3 col-6">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold pb-2">Conózcanos</li>
            <li><a class="footer-link font-weight-light" href="#">Quiénes somos</a></li>
            <li><a class="footer-link font-weight-light" href="#">Aplicación Android</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">Aplicación iOS</a><br></li>
          </ul>
        </div>

        <div class="col-md-3 col-6">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold">Conéctese con nosotros</li>
            <li><a class="footer-link font-weight-light" href="#">Facebook</a></li>
            <li><a class="footer-link font-weight-light" href="#">Twitter</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">Instagram</a><br></li>
          </ul>
        </div>


        <div class="col-md-3 col-5">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold">Déjenos ayudarle</li>
            <li><a class="footer-link font-weight-light" href="#">Centro de devoluciones</a></li>
            <li><a class="footer-link font-weight-light" href="#">100% de protección en la compra</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">Ayuda</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">Descarga de aplicacion</a><br></li>
          </ul>
        </div>

        <div class="col-md-3 col-5">
            <img id="logo" src="../../assets/Logo1.1.png" />
        </div>
      </div>

    
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>
footer {
  margin-top: 100px;
  background-color: #0c5564;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}
.row1{
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;  /* Cambia la dirección a columna */
  justify-content: space-evenly;
  align-items: center;  /* Centra los elementos verticalmente */
}

li {
  padding-left: 10px;
  padding-bottom: 10px;
  display: flex;

  justify-content: center;
}

a {
  text-decoration: none;
}

.footer-link {
  color: #ffffff !important;
}

#logo {
  width: 180px;
}
</style>
