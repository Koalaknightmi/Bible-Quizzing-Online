import makePagePrivate from "../../components/privatePage"
import logger from "../../utils/logger"
import ROUTES from '../../static/routes';
import { useState, useEffect, useContext } from "react"
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'
import useVerseData from "../../utils/hooks/useVerseData"
import VerseDisplay from "../../components/VerseDisplay"
import {SeasonContext} from "../../components/Season"

const log = logger(ROUTES.memoryVerses.logging,"memoryVersesPage")

const VersesPage = () => {
  const season = useContext(SeasonContext);
  const {getMemoryVerses} = useVerseData()
  const [display,setDisplay] = useState('both')
  const [chapters,setChapters] = useState("all")
  const [sort,setSort] = useState('ch-v')
  const [verses,setVerses] = useState([])

  useEffect(()=>{
    
  },[getMemoryVerses])

  return (
    <div>
      <div><b>Singles</b></div>
      {!season.loading && Object.keys(getMemoryVerses().singles).map((k)=>(<VerseDisplay key={k} refer={k} footers={false} v={getMemoryVerses().singles[k]}/>))}
      <div><b>Multiples</b></div>
      {!season.loading && Object.keys(getMemoryVerses().multiples).map((k)=>(<VerseDisplay key={k} refer={k} footers={false} multiple={true} v={getMemoryVerses().multiples[k]}/>))}
    </div>
  )
}
export default makePagePrivate(VersesPage,"memoryVerses")