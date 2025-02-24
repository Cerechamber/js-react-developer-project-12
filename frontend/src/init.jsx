import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import i18next from 'i18next';
import { ToastContainer } from 'react-toastify';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import AuthProvider from "./contexts/AuthProvider.jsx";
import ToastProvider from "./contexts/ToastProvider.jsx";
import ChatProvider from "./contexts/ChatProvider.jsx";
import resources from './locales/index.js';
import store from "./reducers/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App.jsx";
import { io } from "socket.io-client";

const init = async () => {
const i18n = i18next.createInstance();
await i18n 
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  const socket = io("ws://localhost:5001");

  return (
    <I18nextProvider i18next={i18n}>
    <ToastProvider>
   <Provider store={store}>
      <ChatProvider socket={socket}>
        <BrowserRouter>
          <AuthProvider>
              <App />
          </AuthProvider>
        </BrowserRouter>
      </ChatProvider>
      <ToastContainer />
  </Provider>
  </ToastProvider>
  </I18nextProvider>
  )

}

export default init;

