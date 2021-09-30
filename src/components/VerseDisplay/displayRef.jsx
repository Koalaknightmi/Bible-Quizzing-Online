import logger from "../../utils/logger"
import { useState, useEffect } from "react"
import useVerseData from "../../utils/hooks/useVerseData"
import {upperCaseChName,getRefsFromRef} from "../../utils/verseUtils"
import { useSelector } from 'react-redux'

const displayRef = (ref,mem) =>{
  const settings = useSelector(state => state.firebase.profile.settings)
  const {convertToAbr,abrTofull,checkIfMem} = useVerseData()
  let r1 = ref.split(/[0-9]+:/g)[0]
  let r2 = ref.split(/[a-z]+|[A-Z]+/g)[1]
  let mem2 = checkIfMem(ref)
  let full = abrTofull(r1)
  let up = upperCaseChName(full)
  if(mem.mem&&mem2){
    ref = <span className={mem.className}>{up} {r2}</span>
  } else{
    ref = <span> {up} {r2}</span>
  }
  return ref
}

export default displayRef