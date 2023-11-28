import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import vue3GoogleLogin from 'vue3-google-login'

import swal from 'sweetalert'

//using axios as a global object
window.axios = require('axios')

import { createI18n } from 'vue-i18n';

import en from './locales/en';
import es from './locales/es';

// Define los mensajes de idiomas
const messages = {
  en,
  es
};

// Crea la instancia i18n
const i18n = createI18n({
  legacy: false, // debes usar `legacy: false` para vue-i18n versión 9+
  locale: 'es', // establece el idioma por defecto
  fallbackLocale: 'es', // establece el idioma de respaldo
  messages, // establece los mensajes de traducción
});

const app = createApp(App);
app.use(router);
app.use(i18n); // Usa vue-i18n

app.use(vue3GoogleLogin, {
  clientId: '344478746020-qs8c5d77nlcre272g2had4m5v6pjej41.apps.googleusercontent.com'
})

app.mount('#app');

