export default function({ $axios }) {
  $axios.interceptors.response.use(
    response => response,
    error => {
      const {
        response: {
          data: { message },
        },
      } = error;

      return Promise.reject(new Error(message));
    }
  );
}
