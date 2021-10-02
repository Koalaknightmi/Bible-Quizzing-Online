import {useContext} from "react"
import {SeasonContext} from "../../components/Season"
import {upperCaseChName} from "../verseUtils"
import {useSelector} from 'react-redux'
//import uses from "../../static/uses"

const useVerseData = () => {
  const season = useContext(SeasonContext);
  const settings = useSelector(state => state.firebase.profile.settings)
  const s = season.season.season;
  const m = season.season.memory;
  const d = season.season.dictionary;
  const c = season.season.conversions;

  const abrTofull = (ref) => {
    let r = ref
    for(var i in c){
      r = r.replace(c[i][0][0],c[i][1][1])
    }
    return r
  }

  const convertToAbr = (r) => {
    r = r.replace(" ","")
    for(var i in c){
      r = r.replace(c[i][1][0],c[i][0][1])
    }
    return r
  }
  
  const getFooter = (ref,key) => {
    const r = ref.split(":");
    let r2 = r[0].replace(" ","")
    if(r2.length<5){
      r2 = abrTofull(r2)
    }
    return s[r2].footers[key]
  }

  const getVerseByRef = (ref) => {
    const r = ref.split(":");
    let r2 = r[0].replace(" ","")
    if(r2.length<4){
      r2 = abrTofull(r2)
    }
    return s[r2].verses[parseInt(r[1])-1];
  }

  const getMemoryVerses = () => {
    let a = [];
    let m2 = "", r1, r2, r3, r4;
    for(var i in m.singles){
      a.push({ref:m.singles[i].ref,verse:getVerseByRef(m.singles[i].ref),prompt:m.singles[i].prompt})
    }
    for(var i in m.multiples){
      m2 = ""
      r1 = m.multiples[i].ref.split("-")
      r2 = parseInt(r1[1])
      r3 = r1[0].split(":")
      r4 = parseInt(r3[1])
      for(var j = r4; j <= r2; j++){
        m2 += getVerseByRef(r3[0]+":"+j)
      }
      a.push({verse:m2,ref:m.multiples[i].ref,prompt:m.multiples[i].prompt})
    }
    return a
  }

  const checkIfMem = (ref) => {
    ref = convertToAbr(ref)
    let singFilter = m.singles.filter((vData) => vData.ref === ref)
    if(singFilter.length === 1){
      return true
    } else {
      for(var i in m.multiples){
        if(m.multiples[i].ref.includes(ref)){
          return true
        }
      }
    }
    return false
  }

  const getUses = (word) => {
    return d[word.toLowerCase()].length
  }

  const getUseClass = (word) => {
    let u = getUses(word)
    for(var i in settings.useColors){
      if(u>=settings.useColors[i].start&&u<=settings.useColors[i].end){
        return settings.useColors[i]
      }
    }
    return null
  }

  const checkPrompt = (vs) => {
    vs = vs.sort(function(a, b) {
      var ta = a.prompt.toUpperCase();
      var tb = b.prompt.toUpperCase();
      return (ta < tb) ? -1 : (ta > tb) ? 1 : 0;
    })
    let updated = []
    let changed = false
    for(var i in vs){
      let f = vs.filter((word) => word.prompt.toUpperCase() === vs[i].prompt.toUpperCase())
      let u = Object.assign({},vs[i])
      if(f.length>1){
        changed = true
        u.prompt = vs[i].prompt+" "+vs[i].intoWords[vs[i].prompt.split(" ").length]
        updated.push(u)
      } else {
        updated.push(u)
      }
    }
    if(changed){
      return checkPrompt(updated)
    }
    for(var i in updated){
      updated[i] = {ref:updated[i].key,prompt:updated[i].prompt}
    }
    return updated
  }

  const getPrompts = () => {
    let mem = getMemoryVerses()
    for(var j in mem){
      for(var i in mem[j]){
        let w = mem[j][i].match(/(?<!\w[’'-])\b(?![’'-]\w)(\w+)(?<!\w[’'-])\b(?![’'-]\w)/g)
        let r = i.split(":")
        let ch = parseInt(r[0].split(/[a-zA-Z]/g)[1])
        let v = parseInt(r[1].split("-")[0])
        mem[j][i] = {intoWords:w, prompt:w[0], key:i}
      }
      mem[j] = Object.values(mem[j]).sort(function(a, b) {
        var ta = a.prompt.toUpperCase();
        var tb = b.prompt.toUpperCase();
        return (ta < tb) ? -1 : (ta > tb) ? 1 : 0;
      })
      mem[j] = checkPrompt(mem[j])
    }
    return mem
  }

  return {
    abrTofull,
    convertToAbr,
    getVerseByRef,
    getMemoryVerses,
    checkIfMem,
    getUses,
    getUseClass,
    getFooter,
    getPrompts
  }
}

export default useVerseData