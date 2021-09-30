import logger from "../../utils/logger"
import { useState, useEffect } from "react"
import useVerseData from "../../utils/hooks/useVerseData"
import displayRef from "./displayRef"
import DisplayUsesAndFooters from "./DisplayUsesAndFooters"

//const log = logger(ROUTES.memoryVerses.logging,"memoryVersesPage")
const VerseDisplay = ({v,refer,unique,multiple,footnotes,headers,blanks,prompt}) => {
  const {getVerseByRef} = useVerseData()
  const [verse,setVerse] = useState("")
  
  useEffect(()=>{
    if(v===""){
      if(multiple){
        let a = ""
        let r = getRefsFromRef(refer)
        for(var i in r){
          let v2 = getVerseByRef(r[i])
         // let u = unique ? displayUses(v2) : getVerseByRef(v2)
         // let f = footnotes ? displayFooters(u) : removeFooters(u)
          a += v2
        }
        setVerse(a)
      } else{
        let v2 = getVerseByRef(refer)
        //let u = unique ? displayUses(v2) : v2
        //let f = footnotes ? displayFooters(u) : removeFooters(u)
        setVerse(v2)
      }
    } else {
      //let v2 = getVerseByRef(refer)
      //let u = unique ? displayUses(v) : v
      //let f = footnotes ? displayFooters(u) : removeFooters(u)
      setVerse(v)
    }
    
  },[])

  return (
    <div>
      <b>{displayRef(refer,true)}</b>
      {(verse.length > 20 && <DisplayUsesAndFooters overrides = {{footnotes,headers,blanks,prompt}} refer = {refer} verse={verse}/>)}
    </div>
  )
}
export default VerseDisplay