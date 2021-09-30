import makePagePrivate from "../../components/privatePage"
import logger from "../../utils/logger"
import ROUTES from '../../static/routes';
import { useState , useEffect } from "react"
import { useSelector } from 'react-redux'
import { useFirebaseConnect, useFirestoreConnect, useFirebase, isEmpty } from 'react-redux-firebase'
import { useParams } from "react-router-dom";
const limit = 10
const log = logger(ROUTES.profile.logging,"Profile")
import defProfileImage from '../../images/user default image BBQO.png'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import usestyle from './style'

const userImageCheck = (profile,firebase) => {
  var storage = firebase.storage
  if(profile.useDefaultImg){
    return defProfileImage
  } else if (profile.useCustomImg){
    return false
  } else {
    return profile.profileImgURL
  }
}

const ProfileDataWrappper = ({uid,profile}) => {
  const firebase = useFirebase()
  const [imgUrl,setImgUrl] = useState(false)
  const [imgLoading,setImgLoading] = useState(true)
  const [last10TQLoading,setLast10TQLoading] = useState(true)
  const classes = usestyle()

  useFirebaseConnect({
    path: `userStudyData/${uid}/chapterData/${profile.season}/`,
    storeAs: uid + "_chapter_study_data"
  })
  useFirebaseConnect({
    path: `userStudyData/${uid}/verseData/${profile.season}/`,
    storeAs: uid + "_verse_study_data"
  })
  useFirestoreConnect([
    { 
      collection: ROUTES.typeQuizzing.dataname,
      where: [
        ['uid', '==', uid]
      ],
      storeAs:uid + "_last_"+limit+"_typequizzing_Scores",
      limit:limit
    } // or 'todos'
  ])
  const last10tq = useSelector(
    ({ firestore: { data } }) => data[uid + "_last_"+limit+"_typequizzing_Scores"]
  )

  useEffect(()=>{
    let img = userImageCheck(profile,firebase)
    if(img){
      setImgUrl(img)
      setImgLoading(false)
    } else {
      const ref = storage.ref(`images/users/${uid}/.png`);
      ref.getDownloadURL().then(function(url)                             {
        setImgLoading(false)
        setImgUrl(url)
      }).catch(function(error) {
        console.error(error);
      });
    }
  },[])

  useEffect(()=>{
    if(last10tq&&last10TQLoading){
      setLast10TQLoading(false)
    }
  },[last10tq])

  return <>
    <Paper className={classes.beginPagePaper}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={3}>
          {(!imgLoading && <img src = {imgUrl} width = "200"/>)}
        </Grid>
        <Grid item xs={12} sm={9}>
          <h1>{profile.userName}</h1>
        </Grid>
      </Grid>
      {(!last10TQLoading && 
        <div style={{ height: 400, width: '100%' }}>
          
        </div>
      )}
    </Paper>
  </>;
}

const Profile = () => {
  let { uid } = useParams();
  const auth = useSelector(state => state.firebase.auth)
  const currentProfile = useSelector(state => state.firebase.profile)
  const [profileDataRecived,setProfileDataRecived] = useState(false)
  const [profileNotFound,setProfileNotFound] = useState(false)

  useFirestoreConnect([
    { 
      collection: "userstesting",
      doc:  uid
    } // or 'todos'
  ])

  const profile = useSelector(
    ({ firestore: { data } }) => data.userstesting && data.userstesting[uid]
  )

  useEffect(()=>{
    if(!profileDataRecived&&profile){
      setProfileDataRecived(true)
    }
    if(profile===null&&uid!==":uid"){
      setProfileNotFound(true)
    } else if(!isEmpty(currentProfile)) {
      setProfileDataRecived(true)
    }
    log.log(profile,profileDataRecived)
  },[profile,profileDataRecived])

  return (
    <div>
       {(profileDataRecived && <ProfileDataWrappper uid = {uid === ":uid" ? auth.uid : uid} profile = {uid === ":uid" ? currentProfile : profile} />)}
       {(profileNotFound && <h1>Sorry This Profile Does Not Exist :(</h1>)}
    </div>
  )
}

export default makePagePrivate(Profile,"profile")