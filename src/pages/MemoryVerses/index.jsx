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
  const {getMemoryVerses,getPrompts} = useVerseData()
  const [display,setDisplay] = useState('both')
  const [chapters,setChapters] = useState("all")
  const [sort,setSort] = useState('ch-v')
  const [verses,setVerses] = useState([])
  const [loaded,setLoaded] = useState(false)

  useEffect(()=>{
    if(!season.loading&&!loaded){
      console.log("hi there")
      //console.log(JSON.stringify(getPrompts())) only works with old memory verse data
      setVerses(getMemoryVerses())
      setLoaded(true)
      console.log(verses)
    }
  },[season])

  return (
    <div>
      <div><b>Singles</b></div>
      {!season.loading && verses.singles && verses.singles.map((k)=>(<VerseDisplay key={k.ref} refer={k.ref} headers={false} unique={true} footnotes={false} multiple={false} v={k.verse}/>))}
      <div><b>Multiples</b></div>
      {!season.loading && verses.multiples && verses.multiples.map((k)=>(<VerseDisplay key={k.ref} refer={k.ref} headers={false} unique={true} footnotes={false} multiple={true} v={k.verse}/>))}
    </div>
  )
}
export default makePagePrivate(VersesPage,"memoryVerses")