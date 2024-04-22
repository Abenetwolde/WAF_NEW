
import ReactDOM from 'react-dom';

import 'react-lazy-load-image-component/src/effects/black-and-white.css';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { Provider, Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/lib/integration/react';
// scroll bar
// import 'simplebar/src/simplebar.css';
// import 'slick-carousel/slick/slick-theme.css';
// // slick-carousel
// import 'slick-carousel/slick/slick.css';
// import { AuthProvider } from './contexts/Auth0Context';
// import { AuthProvider } from './contexts/FirebaseContext';
// import { AuthProvider } from './contexts/AwsCognitoContext';
//
import App from './App.tsx';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version
// import { AuthProvider } from './contexts/JWTContext';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import store from './app/store.ts';
// import './locales/i18n';
// redux
// import { persistor, store } from './redux/store';
// import reportWebVitals from './reportWebVitals';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// highlight
// import './utils/highlight';










// ----------------------------------------------------------------------

ReactDOM.render(
  <Provider store={store}>
    <SettingsProvider>
      <CollapseDrawerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CollapseDrawerProvider>
    </SettingsProvider>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
