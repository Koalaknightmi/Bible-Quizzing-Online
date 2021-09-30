const converMinToMSec = (m) => {
  return m * 60
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const typeQuizzingTypes = [
  {
    type:"quote",
    defaultTime:0,
    countUp:true,
    sortIt:(verses) => verses
  },
  {
    type:"random verses",
    defaultTime:converMinToMSec(5),
    countUp:false,
    sortIt:(verses)=>{
      console.log(verses)
      let a = [...verses]
      shuffleArray(a)
      a.sort((a,b)=>{
        return a.o - b.o
      })
      console.log(a)
      return a
    }
  },
]

export default typeQuizzingTypes