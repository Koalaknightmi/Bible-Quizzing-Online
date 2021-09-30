import { useEffect,useState } from 'react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector, useDispatch } from 'react-redux'
import LOG from "../../static/logging"

import SeasonContext from "./context"
import logger from "../../utils/logger"

const SeasonProvider = ({children}) => {
  const profile = useSelector(state => state.firebase.profile)
  const auth = useSelector(state => state.firebase.auth)
  const log = logger(LOG.season.main,"Season Provider")
  const dispatch = useDispatch()
  const [season,setSeason] = useState({season:{conversions:{},season:{},dictionary:{},memory:{}},loading:true,err:false})
  const [loading,setLoading] = useState(true)
  const [err,setErr] = useState(false)  
  useEffect(() => {
    if(isLoaded(auth)&&!isEmpty(auth)&&isLoaded(profile)&&!isEmpty(profile)&&loading){
      fetch("https://bbq-api.koalaknightmi.repl.co/season/"+profile.settings.season,{
        headers: {'Content-Type': 'application/json'}
      }).then(res => {
            if(res.status >= 400) {
                throw new Error("Server responds with error!");
            }
            log.log(res)
            return res.json();
          })
          .then(season => {
            for(var i in season.conversions){
              season.conversions[i][0] = [new RegExp(season.conversions[i][0],"i"),season.conversions[i][0]]
              season.conversions[i][1] = [new RegExp(season.conversions[i][1],"i"),season.conversions[i][1]]
            }
            return season
          })
          .then(season => {
            setSeason(season)
            setLoading(false)
            log.log(season)
          })
          .catch(err => {
            log.error(err)
            setErr(true)
            setLoading(false)
          });
    }
    log.log(season)
  },[auth,profile,season,log,dispatch,loading,err])

  return (
    <SeasonContext.Provider value = {{season,loading,err}}>
      {children}
    </SeasonContext.Provider>
  )
}

export default SeasonProvider