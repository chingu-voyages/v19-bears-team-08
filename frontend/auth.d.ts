import 'vue';
import '@nuxt/types';
import type {
  Auth,
  ModuleOptions,
  RecursivePartial,
} from '@nuxtjs/auth-next/dist/index';
import { UserType } from './types/User';

// export * from '@nuxtjs/auth-next';

interface CustomUserAuth extends Auth {
  user: UserType;
}

declare module '@nuxt/types' {
  interface Context {
    $auth: CustomUserAuth;
  }
  interface NuxtAppOptions {
    $auth: CustomUserAuth;
  }

  interface Configuration {
    auth?: RecursivePartial<ModuleOptions>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: CustomUserAuth;
  }
}

declare module 'vue/types/options' {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  interface ComponentOptions<V> {
    auth?: true | false | 'guest';
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  interface Store<S> {
    $auth: CustomUserAuth;
  }
}
