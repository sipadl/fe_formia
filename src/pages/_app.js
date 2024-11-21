import { Provider } from 'react-redux';
import store from '../store'; // Import store yang telah dibuat

function MyApp({ Component, pageProps }) {
  return (
    // Membungkus aplikasi dengan Provider untuk menghubungkan Redux store
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
