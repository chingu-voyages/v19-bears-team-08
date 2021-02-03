import { Context } from '@nuxt/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default function ({ $axios, redirect }: NuxtAxiosInstance & Context) {
  $axios.interceptors.response.use(
    response => response,
    error => {
      const { message } = error.response.data;

      // custom routing for specific auth errors
      const msgVerify = `Please verify your account first`;
      const msgNoChingu = `An account was not found with the email that's associated with the provided Github account`;
      if (message === msgVerify) redirect('/signup/notice');
      if (message === msgNoChingu) redirect('/login/github/not-chingu');

      return Promise.reject(new Error(message));
    }
  );
}
