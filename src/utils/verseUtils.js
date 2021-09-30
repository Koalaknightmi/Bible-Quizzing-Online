const getRefsFromRef = (ref) => {
  let r = ref.split(":")
  let r2 = r[1].split("-")
  let a = []
  for(var i = parseInt(r2[0]);i<=parseInt(r[1])+1;i++){
    a.push(r[0]+":"+i)
  }
  return a
}

const removeFooters = (v) => {
  return v.replace(/(\[[0-9]+\])|[\n\s]+/g,"");
}

const upperCaseChName = (n) => {
  if(n.charAt(0).match(/[0-9]/g)){
    return n.charAt(1).toUpperCase()+" "+n.slice(1)
  } else {
    return n.charAt(0).toUpperCase()+n.slice(1)
  }
}
export {upperCaseChName,removeFooters,getRefsFromRef}