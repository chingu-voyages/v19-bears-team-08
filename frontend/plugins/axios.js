export default function({ $axios, app }) {
  $axios.interceptors.response.use(
    response => {
      // used when a user first clicks through to login with GitHub
      if (process.client) {
        if (response.config.url === '/_auth/oauth/github/authorize') {
          if (response.data.error_description) {
            app.$toast.error(
              `Please log in again, ${response.data.error_description}`
            );
          }
        }
      }

      // used for local logins
      if (response.config.url === '/user/profile') {
        app.context.redirect('/');
        app.$toast.success(`Welcome back, ${response.data.user.local.name}`);
      }

      // used for GitHub logins
      if (response.config.url === '/user/login/github') {
        app.context.redirect('/');
        app.$toast.success(`Welcome back, ${response.data.local.name}`);
      }

      return response;
    },
    error => {
      const {
        response: {
          data: { message },
        },
      } = error;
      if (['/user/profile', '/user/login/github'].includes(error.config.url)) {
        app.$auth.reset();
      }

      // only want to run these during github logins
      if (error.config.url === '/user/login/github') {
        if (process.server) {
          if (message === 'Please verify your account first') {
            // if the user hasn't verified their email we'll redirect them to the notice page
            app.context.redirect('/signup/notice');
          } else {
            app.context.redirect('/login');
          }
        }
        app.$toast.error(message);
      }

      return Promise.reject(new Error(message));
    }
  );
}
