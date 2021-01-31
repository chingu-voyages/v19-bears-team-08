require('dotenv').config();

export default {
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

  plugins: ['~/plugins/axios.ts'],

  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
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
    resetOnError: true,
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login/github/redirect',
      home: '/',
    },
    strategies: {
      local: {
        token: { property: 'token', maxAge: 1800 },
        user: { property: 'user' },
        endpoints: {
          login: { url: '/user/login/local', method: 'post' },
          logout: false,
          user: { url: '/user/profile', method: 'get' },
        },
      },
      github: {
        scheme: 'oauth2',
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        endpoints: {
          authorization: 'https://github.com/login/oauth/authorize',
          token: 'https://github.com/login/oauth/access_token',
          userInfo: 'http://localhost:4000/api/user/login/github',
        },
        redirectUri: 'http://localhost:3000/login/github/redirect',
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
          'faExclamationCircle',
          'faCode',
          'faTrashAlt',
          'faExternalLinkAlt',
        ],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['faGithub'],
      },
    ],
  },

  build: {
    transpile: [/^vue-intersect/],
  },
};
