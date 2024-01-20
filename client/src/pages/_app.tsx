import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import type { AppProps } from 'next/app'
import {store,persistor} from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'


export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return (
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <Component {...pageProps} />
    <ToastContainer/>
  </PersistGate>
</Provider>)
}
