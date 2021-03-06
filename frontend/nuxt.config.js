require('dotenv').config();

export default {
  mode: 'universal',

  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    API_URL: process.env.API_URL,
  },

  head: {
    title: 'Dashboard | Chingu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/Logo.png' }],
  },

  components: true,

  vue: {
    config: {
      devtools: true,
    },
  },

  loading: {
    color: '#13e58c',
  },

  css: ['@/assets/css/tailwind.css'],

  plugins: ['~/plugins/axios.js'],

  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxt/content',
    '@nuxt/components',
    'nuxt-fontawesome',
  ],

  axios: {
    baseURL: process.env.API_URL,
    debug: process.env.NODE_ENV !== 'production',
  },

  auth: {
    localStorage: false,
    resetOnError: false,
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        expires: 1,
      },
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/user/login/local',
            method: 'post',
            propertyName: 'token',
          },
          logout: null,
          user: { url: '/user/profile', method: 'get', propertyName: 'user' },
        },
      },
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        userinfo_endpoint: '/user/login/github',
        scope: ['email', 'user'],
      },
    },
  },

  toast: {
    position: 'bottom-center',
    duration: 7000,
    theme: 'bubble',
    className: 'toasted-msg',
  },

  content: {
    // Options
  },

  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: [
          'faTimes',
          'faBars',
          'faSpinner',
          'faUserCheck',
          'faUserPlus',
          'faUser',
        ],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['faGithub'],
      },
    ],
  },
};
