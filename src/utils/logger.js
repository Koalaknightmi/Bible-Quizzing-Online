const logger = (isDebug = true,name = "none") => {

  let debug = {}

  if (import.meta.env.VITE_LOGGING && isDebug) {
    for (let m in console)
      if (typeof console[m] == 'function')
        debug[m] = console[m].bind(window.console, name.toString()+": ")
  }else{
    for (let m in console)
      if (typeof console[m] == 'function')
        debug[m] = () => {}
  }
  return debug
}

export default logger