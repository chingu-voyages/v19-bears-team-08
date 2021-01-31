import { Context } from '@nuxt/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default function ({ $axios, app }: NuxtAxiosInstance & Context) {
  $axios.interceptors.response.use(
    response => response,
    error => {
      const {
        response: {
          data: { message },
        },
      } = error;
      const msgVerify = `Please verify your account first`;
      const msgNoChingu = `An account was not found with the email that's associated with the provided Github account`;
      if (message === msgVerify) app.context.redirect('/signup/notice');
      if (message === msgNoChingu)
        app.context.redirect('/login/github/not-chingu');

      return Promise.reject(new Error(message));
    }
  );
}
