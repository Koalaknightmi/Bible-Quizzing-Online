import logger from "../../utils/logger"
import { useState, useEffect } from "react"
import useVerseData from "../../utils/hooks/useVerseData"
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'
import blanks from "../../static/blanks"

const checkRemove = (uses,blanksobj) => {
  if(uses>=blanks[blanksobj.lvl].start&&uses<=blanks[blanksobj.lvl].end){
    return true
  }
  return false
}

const Into = React.memo(({uses,p1,p2,word,col}) => (
  <>
    <Tooltip placement="top" interactive style={{color:col}} title={
        <>
          <Typography color="inherit">Uses: {uses}</Typography>
        </>
      }>
      <span>{p1}{word}</span>
    </Tooltip>
    {p2}
  </>
))

const DisplayUsesAndFooters = React.memo(({verse,refer,overrides}) => {
  const settings = useSelector(state => state.firebase.profile.settings)
  const {getUseClass,getUses,getFooter} = useVerseData()
  const [intoWords,setIntoWords] = useState(false)
  const [rendered,setRendered] = useState(false)
  useEffect(()=>{
    if(!rendered&&verse.length > 20){
      let intoWords2 = verse.match(/(?<!\w[’'-])\b(?![’'-]\w)(\w+)(?<!\w[’'-])\b(?![’'-]\w)/g)
      let punctuation = verse.split(/(?:\w|['’-]\w)+/g)
      for(var i in intoWords2){
        if(!intoWords2[i].match(/[0-9]/g)){
          if(settings.useColor&&!overrides.color){
            let wC = getUseClass(intoWords2[i])
            if(wC){
              if(i==="0"){
                intoWords2[i] = (<>
                  <Into 
                    uses={getUses(intoWords2[i])} 
                    p1={punctuation[0]}
                    p2={punctuation[parseInt(i)+1].replace(/\[/g," ")}
                    word={intoWords2[i]}
                    col={wC.color}
                  />
                </>)
              } else {
                intoWords2[i] = (<>
                  <Into 
                    uses={getUses(intoWords2[i])} 
                    p1={""}
                    p2={punctuation[parseInt(i)+1].replace(/\[/g," ")}
                    word={intoWords2[i]}
                    col={wC.color}
                  />
                </>)
              }
            }
          } else {
            if(i==="0"){
              intoWords2[i] = punctuation[0] + intoWords2[i] + punctuation[parseInt(i)+1].replace(/\[/g," ")
            } else {
              intoWords2[i] = intoWords2[i] + punctuation[parseInt(i)+1].replace(/\[/g," ")
            }
          }
        } else {
          punctuation[parseInt(i)+1] = punctuation[parseInt(i)+1].replace(/\]/g," ")
          if(settings.useTooltips&&settings.useFooter&&!overrides.footnotes){
            intoWords2[i] = (<Tooltip placement="top" interactive style={{color:"blue"}} title={
              <>
                <Typography color="inherit">Footnote: {getFooter(refer,intoWords2[i])}</Typography>
              </>
            }><span>{" ["+intoWords2[i]+"] "}</span></Tooltip>)
          } else {
            intoWords2[i] = ""
          }
        }
      }
      setIntoWords(intoWords2)
      setRendered(true)
    }
  },[intoWords,rendered,verse])
  
  return (<>
    {!rendered && verse}
    {intoWords && intoWords.map((w,i)=>(
      <span key={i}>
        {w}
      </span>
    ))}
  </>)
})

export default DisplayUsesAndFooters