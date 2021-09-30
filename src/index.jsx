import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import "./styles/tooltip.css"

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';
import 'firebase/storage';
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import "@fontsource/roboto";

import store from './store';
import App from "./App";
import theme from './styles/theme';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import * as serviceWorker from './serviceWorker';
import { SocketProvider } from "./components/socket"
import { SeasonProvider } from "./components/Season"
import { IsMobleProvider } from "./components/TestMoble"
import profile from "./static/profile"
import uses from "./static/uses"

const rrfConfig = {
  userProfile: "userstesting",
  useFirestoreForProfile: false,
  profileFactory: (user, profileData, firebase) => {
    profile.userName = user.displayName
    profile.email = user.email || user.providerData[0].email
    profile.settings.useColors = uses
    if (user.photoURL) {
      profile.useDefaultImg = false
      profile.profileImgURL = user.photoURL
    }
    if (user.providerData && user.providerData.length) {
      profile.providerData = user.providerData
    }
    console.log(profileData)
    return profile
  }
};

firebase.initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG_JSON));
firebase.firestore();
firebase.firestore().enablePersistence({ synchronizeTabs: true });

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactReduxFirebaseProvider {...rrfProps}>
          <SocketProvider>
            <SeasonProvider>
              <IsMobleProvider>
                <App />
              </IsMobleProvider>
            </SeasonProvider>
          </SocketProvider>
        </ReactReduxFirebaseProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();