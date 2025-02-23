import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import AuthProvider from "./contexts/authProvider.jsx";
import resources from './locales/index.js';
import store from "./reducers/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App.jsx";
import ChatProvider from "./contexts/ChatProvider.jsx";
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
   <Provider store={store}>
    <BrowserRouter>
      <ChatProvider socket={socket}>
        <I18nextProvider i18next={i18n}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </ChatProvider>
    </BrowserRouter>
  </Provider>
  )

}

export default init;

