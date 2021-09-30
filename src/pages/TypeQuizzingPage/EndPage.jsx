import {useState,useEffect,useContext} from "react"
import {useFirestore,useFirebaseConnect,useFirebase,isLoaded} from 'react-redux-firebase'
import {useSelector} from 'react-redux'
import {SeasonContext} from "../../components/Season"
import calcTypeScore from "../../utils/calcTypeScore"
import ROUTES from '../../static/routes';

const EndPage = ({result,log}) =>{
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const firstLetter = useSelector((state) => state.typeQuizzing.firstLetter)
  const season = useContext(SeasonContext)
  const firestore = useFirestore()
  const firebase = useFirebase()
  const userLogData = useSelector(state => state.firebase.data.userLogData[auth.uid])
  const userVerseData = useSelector(state => state.firebase.data.userStudyData[auth.uid].verseData[profile.season])
  const userChapterData = useSelector(state => state.firebase.data.userStudyData[auth.uid].chapterData[profile.season])
  const [stored,setStored] = useState(false)
  //console.log(result,userVerseData)
  const getChName = (ref) => {
    return ref.split(":")[0]
  }

  useEffect(()=>{
    let updateVerseData = {...userVerseData}
    let updateChapterData = {...userChapterData}
    let updateLogData = {...userLogData}
    //result.verseData.push(result.currentVerse)
    let s = season.season.season
    let skeys = Object.keys(s)
    let chs = []
    let stored = false
    if(!stored&&isLoaded(auth)&&auth.uid!==undefined){
      stored = true
      console.log(JSON.parse(JSON.stringify({
          ...result,
          uid:auth.uid
        })),ROUTES.typeQuizzing.dataname)
      firestore.collection(ROUTES.typeQuizzing.dataname)
        .add({
          ...result,
          uid:auth.uid
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          for(var i in result.verseData){
            let verdata = result.verseData[i]
            console.log(verdata)
            let ref = verdata.ref.split(":")
            if(!updateVerseData[ref[0]]){
              updateVerseData[ref[0]] = []
            }
            if(!updateVerseData[ref[0]][ref[1]]){
              updateVerseData[ref[0]][ref[1]] = {
                correct:0,
                times:[],
                incorrect:0,
                quizzed:0,
                sessions:{},
                timeTaken:0
              }
            }
            let updata = updateVerseData[ref[0]][ref[1]]
            updateVerseData[ref[0]][ref[1]] = {
              correct: updata.correct + verdata.correct,
              incorrect: updata.incorrect + verdata.incorrect,
              times: [...updata.times, verdata.timeFinished],
              quizzed: updata.quizzed + 1,
              sessions: {
                ...updata.sessions,
                [verdata.timeFinished]:{
                  id:docRef.id,
                  verseId:i
                }
              },
              timeTaken: updata.timeTaken + verdata.timeTaken
            }
            if(!updateChapterData[ref[0]]){
              updateChapterData[ref[0]] = {
                correct:0,
                times:[],
                incorrect:0,
                quizzed:0,
                sessions:{},
                timeTaken:0
              }
            }
            updateChapterData[ref[0]] = {
              correct:updateChapterData[ref[0]].correct + verdata.correct,
              times: !chs.includes(ref[0]) ? [...updateChapterData[ref[0]].times, verdata.timeFinished] : updateChapterData[ref[0]].times,
              incorrect:updateChapterData[ref[0]].incorrect + verdata.incorrect,
              quizzed:updateChapterData[ref[0]].quizzed + 1,
              sessions: !chs.includes(ref[0]) ? {
                ...updateChapterData[ref[0]].sessions,
                [verdata.timeFinished]:docRef.id
              } : updateChapterData[ref[0]].sessions,
              timeTaken:updateChapterData[ref[0]].timeTaken + verdata.timeTaken
            }
            chs.push(ref[0])
          }
          console.log(updateVerseData)
          console.log(updateChapterData)
          firebase.database().ref(`userStudyData${firstLetter ? "FirstLetter" : "FullType"}/${auth.uid}/verseData/${profile.season}/`).update(updateVerseData)
          firebase.database().ref(`userStudyData${firstLetter ? "FirstLetter" : "FullType"}/${auth.uid}/chapterData/${profile.season}/`).update(updateChapterData)
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    }
  },[auth])

  return (
    <>
    {JSON.stringify(result)}
    </>
  )
}

export default EndPage