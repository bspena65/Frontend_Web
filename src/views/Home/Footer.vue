<template>
  <footer>
    <div class="container pt-5">
      <div class="row1">
        <div class="col-md-3 col-6">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold pb-2">{{ $t('message.options.f1') }}</li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.f2') }}</a></li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.f3') }}</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.f4') }}</a><br></li>
          </ul>
        </div>

        <div class="col-md-3 col-6">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold">{{ $t('message.options.f5') }}</li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.f6') }}</a></li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.f7') }}</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.f8') }}</a><br></li>
          </ul>
        </div>


        <div class="col-md-3 col-5">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold">{{ $t('message.options.f9') }}</li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.f10') }}</a></li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.11') }}</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.f12') }}</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">{{ $t('message.options.f13') }}</a><br></li>
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
