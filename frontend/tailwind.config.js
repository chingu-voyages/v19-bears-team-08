/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.vue',
      './layouts/**/*.vue',
      './pages/**/*.vue',
    ],
    options: {
      whitelist: [/svg.*/, /fa.*/],
    },
  },
  theme: {
    extend: {
      colors: {
        green: '#13e58c',
        pink: '#e956ae',
      },
    },
  },
  variants: {},
  plugins: [],
};
