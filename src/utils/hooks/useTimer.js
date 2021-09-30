import {useState, useEffect} from "react"

const useTimer = () => {
  const [time,setTime] = useState(0)
  useEffect(()=>{
    console.log(time)
    let timer = window.setInterval(()=>{
      setTime(t => {
        return t+1
      })
    },1000)
    return () => clearInterval(timer)
  },[])
  return time
}

export default useTimer

export const toMinSec = (t) => {
  return Math.floor(t/60) + ":"+ ((t % 60 >= 10) ? (t % 60) : ("0" + (t % 60)))
}