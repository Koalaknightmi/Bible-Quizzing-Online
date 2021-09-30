import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import testperms from '../../utils/pathPermissions'
import ROUTES from '../../static/routes';

import CircularProgress from '@mui/material/CircularProgress';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const makePagePrivate = (Page,route) => props => {
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const history = useHistory()
  console.log("treste")
  useEffect(() => {
    console.log(isLoaded(auth))
    if(isLoaded(auth)){
      if(!testperms(ROUTES[route],isLoaded(auth),isEmpty(auth),profile,auth)){
        history.push("/wrongPermissionsPage")
      }
    } else{
      return (
        <Dialog aria-labelledby="simple-dialog-title" open={true}>
          <DialogTitle id="simple-dialog-title">LOADING</DialogTitle>
          <CircularProgress color="secondary" />
        </Dialog>
      )
    }
  })

  return (
    <Page {...props}/>
  )
}

export default makePagePrivate