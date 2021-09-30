import {useContext, useState, useEffect} from "react"
import {SeasonContext} from "../../components/Season"
import {useSelector} from 'react-redux'
import typeQuizzingTypes from "../../static/typeQuizzingTypes"

const useVerses = (st) => {
  let material = []
  const season = useContext(SeasonContext)
  const chapters = useSelector((state) => state[st].chapters)
  const range = useSelector((state) => state[st].range)
  const rangeVal = useSelector((state) => state[st].rangeVal)
  const type = useSelector((state) => state[st].type)
  const [verses,setVerses] = useState([])
  const [updated,setUpdated] = useState(true)
  const [uverses,setUVerses] = useState([])

  const newVerse = function (c,j){
    this.ref = c.ref.replace(/([0-9]+)/g," $1")+":"+(Number(j)+1)
    this.verse = c.verse.replace(/(\[[0-9]+\])/g,"")
    this.o = 0
    this.intoWords = this.verse.split(/(?<!\w[’'-])\b(?![’'-]\w)/g)
    this.intoChars = this.verse.split("")
    this.punctuation = this.verse.split(/(?:\w|['’-]\w)+/g)
    for(var l in this.intoWords){
      if(!this.intoWords[l].match(/(?:\w|['’-]\w)+/g)){
        this.intoWords.splice(l,1)
      }
    }
  }

  const setVerseO = (v) => {
    let newVerses = [...verses]
    newVerses[v].o++
    typeQuizzingTypes[type].sortIt(newVerses)
    setVerses(newVerses)
    setUpdated(false)
  }

  useEffect(()=>{
    if(!updated){
      let newVerses = [...verses]
      setVerses(typeQuizzingTypes[type].sortIt(verses))
      setUpdated(true)
      console.log("updated")
      console.log(verses)
    }
  },[updated])

  useEffect(()=>{
    let s = season.season.season
    let skeys = Object.keys(s)
    let runs = 0;
    let start = 0;
    let end = 0;
    console.log(range)
    if(range){
      for(var i = skeys.indexOf(rangeVal.startingChapter.val);i <= skeys.indexOf(rangeVal.endingChapter.val);i++){
        console.log(runs + skeys.indexOf(rangeVal.startingChapter.val),skeys.indexOf(rangeVal.endingChapter.val)+1)
        console.log(rangeVal)
        if(runs === 0){
          start = rangeVal.startingVerse.val - 1
        }
        if(runs + skeys.indexOf(rangeVal.startingChapter.val)+1 === skeys.indexOf(rangeVal.endingChapter.val)+1){//change this 
          end = rangeVal.endingVerse.val - 1
        } else {
          end = s[skeys[i]].verses.length - 1
        }
        console.log(end)
        for(var j = start;j <= end;j++){
          if(s[skeys[i]].verses[j].replace(/(\[[0-9]+\])/g,"").replace(/\s/g,"")===""){
            continue;
          }  
          material.push(new newVerse({
            ref:skeys[i],
            verse:s[skeys[i]].verses[j]
          },j))
        }
        runs++
      }
      material = typeQuizzingTypes[type].sortIt(material)
    } else{
      for(var i in chapters){
        for(var j in s[chapters[i]].verses){
          if(s[chapters[i]].verses[j].replace(/(\[[0-9]+\])/g,"").replace(/\s/g,"")===""){
            continue;
          }
          material.push(new newVerse({
            ref:chapters[i],
            verse:s[chapters[i]].verses[j]
          },j))
        }
      }
      material = typeQuizzingTypes[type].sortIt(material)
      console.log(material)
    }
    setVerses(material)
  },[])



  return [verses,setVerseO]
}
  
export default useVerses