function isMobile() {
  if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    try{ document.createEvent("TouchEvent"); return true; }
    catch(e){ return false; }    
  } else{
    return false
  }
}

const IsMobleContext = React.createContext(isMobile)

const IsMobleProvider = ({children}) => (
  <IsMobleContext.Provider value = {isMobile()}>
    {children}
  </IsMobleContext.Provider>
)

export default IsMobleContext
export {IsMobleProvider}