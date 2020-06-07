export default function({ $axios, app }) {
  $axios.interceptors.response.use(
    response => response,
    error => {
      const {
        response: {
          data: { message },
        },
      } = error;

      app.$toast.error(message);
      return Promise.reject(error);
    }
  );
}
