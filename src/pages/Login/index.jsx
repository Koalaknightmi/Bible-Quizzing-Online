import ROUTES from '../../static/routes';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logger from "../../utils/logger"

const LoginPage = () => {
  const firebase = useFirebase()
  const history = useHistory()
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const log = logger(ROUTES.login.logging,"LoginPage")
  const signInConfig = {
    signInFlow: 'popup',
    signInOptions:[
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true
      }
      ],
    signInSuccessUrl: ROUTES.home.route,
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        firebase.handleRedirectResult(authResult).then(() => {
          log.log(authResult)
          history.push(redirectUrl);
        });
        return false;
      },
    },
  }
  
  return(
    <div>
      <h1>Login Page</h1>
      <p>The Login Page is accessible by every signed in user.</p>
      {(isEmpty(auth) && <StyledFirebaseAuth uiConfig={signInConfig} firebaseAuth={firebase.auth()} />)}
        {
          !isLoaded(auth)
          ? <span>Loading...</span>
          : isEmpty(auth)
            ? <span>Not Authed</span>
            : <pre>{JSON.stringify(auth, null, 2)}</pre>
        }

        <div>{JSON.stringify(profile, null, 2)}</div>
    </div>
  )
};

export default LoginPage