// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@pinia/nuxt', 'vuetify-nuxt-module'],
  vuetify: {
    moduleOptions: {
      styles: true,
    },
    vuetifyOptions: {
      components: [
        'VApp',
        'VMain',
        'VBtn',
        'VCard',
        'VAppBar',
        'VNavigationDrawer',
        'VListItem',
        'VDivider',
        'VContainer',
        'VRow',
        'VCol',
        'VAlert',
        'VTextField',
      ],
      directives: ['Ripple'],
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['~/assets/css/main.scss', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    apiKey: process.env.API_KEY || '',
    public: {
      apiUrl: process.env.API_URL || 'https://api.api-ninjas.com/v1',
    },
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },
  routeRules: {
    '/api_ninjas/**': {
      proxy: 'https://api.api-ninjas.com/v1/**',
    },
  },
});
