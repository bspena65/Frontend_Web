<template>
    <button @click="toggleLanguage">
      {{ currentLanguage === 'en' ? 'Español' : 'English' }}
    </button>
  </template>
  
  <script>
  export default {
    name: 'LanguageSwitcher',
    data() {
      return {
        currentLanguage: this.$i18n.locale
      };
    },
    methods: {
      toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
        this.$i18n.locale = this.currentLanguage;
      }
    }
  };
  </script>
  