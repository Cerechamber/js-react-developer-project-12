import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import resources from './locales/index.js';
import store from "./reducers/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App.jsx";

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

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <I18nextProvider i18next={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </Provider>,
);


/*
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';

const app = async () => {
  const socketInstance = io();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init(socketInstance));
};

app();
*/

/*
import i18next from 'i18next';
import * as leoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import { SockeIoProvider } from './contexts/SocketContext.jsx';

const init = async (socketInstance) => {
  const i18n = i18next.createInstance();
  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NODE_ENV,
  };

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: localStorage.language ? localStorage.language : 'ru',
    });

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <SockeIoProvider socket={socketInstance}>
            <I18nextProvider i18n={i18n}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </I18nextProvider>
          </SockeIoProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>

  );
};

export default init;
*/