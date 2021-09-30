export default (r,authIsLoaded,authisEmpty,profile,auth,nav) => {
  const loggedIn = (!authisEmpty&&authIsLoaded)
  const admin = (profile.role === "admin" || profile.role === "super-admin")
  const superAdmin = (profile.role === "super-admin")
  if(!r.enabled) return false
  if(!r.navable&&nav) return false
  if(r.permissions){
    console.log(r.permissions.loggedIn&&loggedIn)
    if(r.permissions.loggedIn&&loggedIn) return true;
    if(r.permissions.loggedIn === false&&!loggedIn) return true;
    if(r.permissions.admin&&loggedIn&&admin) return true;
    if(r.permissions.superAdmin&&loggedIn&&superAdmin) return true;
    return false
  } else{
    return true
  }
  return false
}