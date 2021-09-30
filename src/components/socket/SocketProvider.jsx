import { useEffect,useState } from 'react'
import io from 'socket.io-client'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector, useDispatch } from 'react-redux'
import LOG from "../../static/logging"

import SocketContext from "./context"
import logger from "../../utils/logger"
import {connect} from "../../reducers/socket"

const SocketProvider = ({children}) => {
  const [connected,setConnected] = useState(false)
  const socket = io("https://BBQ-api.koalaknightmi.repl.co", {
    autoConnect: false,
    withCredentials: true,
    extraHeaders: {
      "access-control-allow-origin":"https://BBQ-api.koalaknightmi.repl.co"
    }
  })
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const log = logger(LOG.socket.main,"Socket Provider")
  const dispatch = useDispatch()

  useEffect(() => {
    if(isLoaded(auth)&&!isEmpty(auth)&&isLoaded(profile)&&!isEmpty(profile)&&!connected){
      socket.auth = {uid:auth.uid,profile:profile};
      socket.connect();
      log.log(isLoaded(auth)&&!isEmpty(auth)&&isLoaded(profile)&&!isEmpty(profile)&&!connected, "socket init")
      log.log(socket.auth, "socket auth")
    } else {
      socket.auth = null
      socket.disconnect()
      log.log(isLoaded(auth)&&!isEmpty(auth)&&isLoaded(profile)&&!isEmpty(profile)&&!connected, "socket uninit")
      log.log(socket.auth, "socket auth")
    }
    socket.on("connect",()=>{
      dispatch(connect(true))
      log.log("socket connected")
      setConnected(true)
    })
    socket.on("disconnect",(reason)=>{
      dispatch(connect(false))
      log.log("socket disconnected because " + reason)
      setConnected(false)
    })
  },[auth,profile,connected,socket,log,dispatch])

  return (
    <SocketContext.Provider value = {socket}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider