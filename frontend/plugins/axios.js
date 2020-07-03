export default function({ $axios, app }) {
  $axios.interceptors.response.use(
    response => {
      console.log(response.config.url);

      if (process.server) {
        if (response.config.url === '/user/profile') {
          app.context.redirect('/');
          app.$toast.success(`Welcome back, ${response.data.user.name}`);
        }

        if (response.config.url === '/user/login/github') {
          app.context.redirect('/');
          app.$toast.success(`Welcome back, ${response.data.chingu.user.name}`);
        }
      }
      return response;
    },
    error => {
      const {
        response: {
          data: { message },
        },
      } = error;

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
