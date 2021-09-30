import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState }  from 'react';

import ROUTES from '../static/routes';

import uses from "../static/uses"
import profile from '../static/profile'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded } from 'react-redux-firebase'

import Navigation from '../components/Navigation'
const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/Login'))
const WrongPermissionsPagePage = lazy(() => import('../pages/WrongPermissionsPage'))
const TypeQuizzingPage = lazy(() => import('../pages/TypeQuizzingPage'))
const ProfilePage = lazy(() => import('../pages/Profile'))
const EmptyPage = lazy(() => import('../pages/EmptyPage'))
const MemoryVersesPage = lazy(() => import('../pages/MemoryVerses'))
const CopyrightPage = lazy(() => import('../pages/Copyright'))

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const checkAndFill = (obj,obj2) => {
  const obj3 = Object.assign({},obj2)
  for(var i in obj){
    if(obj[i] && typeof(obj[i])==="object"){
      obj3[i] = checkAndFill(obj[i],obj3[i])
    }
    if(!obj3[i]){
      obj3[i] = obj[i]
    }
  }
  return obj3
}

const App = () => {
  const firebase = useFirebase()
  const p = useSelector(state => state.firebase.profile)
  const [pUpdated,setPUpdated] = useState(false)

  useEffect(()=>{
    if(isLoaded(p)&&!pUpdated){
      profile.settings.useColors = uses
      firebase.updateProfile(checkAndFill(profile,p))
      setPUpdated(true)
    }
  },[pUpdated,p])
  return (<Router>
    <div>
      <Navigation/>
      <Toolbar/>
      <Container>
        <Suspense fallback={
          <Dialog aria-labelledby="simple-dialog-title" open={true}>
            <DialogTitle id="simple-dialog-title">LOADING</DialogTitle>
            <CircularProgress color="secondary" />
          </Dialog>
        }>
          <Switch>
            <Route exact path={[ROUTES.home.route,"/"]} component={HomePage}/>
            <Route exact path={ROUTES.typeQuizzing.route} component={TypeQuizzingPage}/>
            <Route exact path={ROUTES.Copyright.route} component={CopyrightPage}/>
            <Route exact path={ROUTES.login.route} component={LoginPage}/>
            <Route exact path={ROUTES.wrongPermissionsPage.route} component={WrongPermissionsPagePage}/>
            <Route path={ROUTES.profile.route} component={ProfilePage}/>
            <Route exact path={ROUTES.memoryVerses.route} component={MemoryVersesPage}/>
            <Route path="/*" component={EmptyPage}/>
          </Switch>
        </Suspense>
      </Container>
    </div>
  </Router>)
};

export default App;