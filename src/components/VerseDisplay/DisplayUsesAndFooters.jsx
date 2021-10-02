import logger from "../../utils/logger"
import { useState, useEffect } from "react"
import useVerseData from "../../utils/hooks/useVerseData"
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'
import blanks from "../../static/blanks"
import { css } from '@emotion/react';

const checkRemove = (uses,blanksobj) => {
  if(!blanksobj) return false
  if(uses>=blanks[blanksobj.lvl-1].start&&uses<=blanks[blanksobj.lvl-1].end){
    return true
  }
  return false
}

const WordInTooltip = React.forwardRef(function MyComponent(props, ref) {
  if(props.prompt2 === "true"){
     return(<>
     {props.p1}
     <span 
      {...props}
      ref={ref}
      style={
          {
            "fontWeight":"bold",
            "color":props.col,
            "textDecoration":"underline"
          }
        }>
      {!checkRemove(props.uses,props.overrides.blanks) ? props.word : props.word.replace(/\w/g,"_")}
    </span>
    </>)
  }
  return(<>
     {props.p1}
     <span 
      {...props}
      ref={ref}
      style={
          {
            "color":props.col
          }
        }>
      {!checkRemove(props.uses,props.overrides.blanks) ? props.word : props.word.replace(/\w/g,"_")}
    </span>
    </>)
});

const Into = (props) => {
  return (
  <span>
    <Tooltip placement="top" title={
        <>
          <Typography color="inherit">Uses: {props.uses}</Typography>
        </>
      }>
      <WordInTooltip {...props}/>
      </Tooltip>
    {props.p2}
  </span>)
}

const FootNumber = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <span style={{"color":"blue"}} {...props} ref={ref}>{" ["+props.text+"] "}</span>
});

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
        i = parseInt(i)
        if(!intoWords2[i].match(/[0-9]/g)){
          if(settings.useColor&&!overrides.color){
            let wC = getUseClass(intoWords2[i])
            let prompt2 = overrides.prompt ? (i < overrides.prompt.length) : false
            if(wC){
              if(i===0){
                intoWords2[i] = (<>
                  <Into 
                    uses={getUses(intoWords2[i])} 
                    p1={punctuation[0]}
                    p2={punctuation[i+1].replace(/\[/g," ")}
                    word={intoWords2[i]}
                    col={wC.color}
                    prompt2={prompt2.toString()}
                    overrides = {overrides}
                  />
                </>)
              } else {
                intoWords2[i] = (<>
                  <Into 
                    uses={getUses(intoWords2[i])} 
                    p1={""}
                    p2={punctuation[i+1].replace(/\[/g," ")}
                    word={intoWords2[i]}
                    col={wC.color}
                    prompt2={prompt2.toString()}
                    overrides = {overrides}
                  />
                </>)
              }
            }
          } else {
            if(i==="0"){
              intoWords2[i] = punctuation[0] + intoWords2[i] + punctuation[i+1].replace(/\[/g," ")
            } else {
              intoWords2[i] = intoWords2[i] + punctuation[i+1].replace(/\[/g," ")
            }
          }
        } else {
          punctuation[i+1] = punctuation[i+1].replace(/\]/g," ")
          if(settings.useTooltips&&settings.useFooter&&!overrides.footnotes){
            intoWords2[i] = (<Tooltip placement="top"
             title={
              <>
                <Typography color="inherit">Footnote: {getFooter(refer,intoWords2[i])}</Typography>
              </>
            }>
              <FootNumber text = {intoWords2[i]}/>
            </Tooltip>)
          } else {
            intoWords2[i] = ""
          }
        }
      }
      setIntoWords(intoWords2)
      setRendered(true)
    }
  },[intoWords,rendered,verse])
  //{!rendered && verse}
  return (<>
    {intoWords && intoWords.map((w,i)=>{
      return (
      <span key={i}>
        {w}
      </span>
    )})}
  </>) 
})

export default DisplayUsesAndFooters