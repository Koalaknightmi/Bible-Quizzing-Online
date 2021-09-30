import makePagePrivate from "../../components/privatePage"
import logger from "../../utils/logger"
import ROUTES from '../../static/routes';
import BeginPage from "./BeginPage"
import TypingPage from "./TypingPage"
import EndPage from "./EndPage"
import { useState , useEffect } from "react"
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'

const log = logger(ROUTES.typeQuizzing.logging,"TypeQuizzingPage")
const TypeQuizzingPage = () => {
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  useFirebaseConnect(`userStudyData/${auth.uid}/chapterData/${profile.season}/`)
  useFirebaseConnect(`userStudyData/${auth.uid}/verseData/${profile.season}/`)
  useFirebaseConnect(`userLogData/${auth.uid}`)
  const [page,setPage] = useState(1)
  const [result,setResult] = useState({})
  const onStart = (e) => {
    setPage(page+1)
  }
  const onEnd = (r) => {
    setResult(r)
    setPage(page+1)
  }
  return (
    <div>
      {(page===1&&<BeginPage {...{log,onStart}}/>)}
      {(page===2&&<TypingPage {...{log,onEnd}}/>)}
      {(page===3&&<EndPage {...{log,result}}/>)}
    </div>
  )
}
export default makePagePrivate(TypeQuizzingPage,"typeQuizzing")