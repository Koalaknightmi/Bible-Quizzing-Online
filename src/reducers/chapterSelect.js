const setChaptersR = (state,action) => {
  state.chapters = action.payload
  state.range = false
}
const clearChaptersR = (state,action) => {
  state.chapters.splice(0,state.chapters.length);
}
const toggleRangeR = (state,action) => {
  state.range = !state.range;
}
const setRangeR = (state,action) => {
  if(!state.rangeVal.endingChapter.hasBeenChanged&&action.payload.obj==="startingChapter"){
    state.rangeVal.endingChapter.val = action.payload.val;
  }
  if(!state.rangeVal.startingChapter.hasBeenChanged&&action.payload.obj==="endingChapter"){
    state.rangeVal.startingChapter.val = action.payload.val;
  }
  if(!state.rangeVal.endingVerse.hasBeenChanged&&action.payload.obj.includes("Chapter")){
    state.rangeVal.endingVerse.val = action.payload.lastVerse;
  }
  if(!state.rangeVal.startingVerse.hasBeenChanged&&action.payload.obj.includes("Chapter")){
    state.rangeVal.startingVerse.val = 1;
    state.rangeVal.startingVerse.hasBeenChanged = true;
  }
  state.rangeVal[action.payload.obj].val = action.payload.val
  state.rangeVal[action.payload.obj].hasBeenChanged = true;
  state.range = true
}

export {
  setChaptersR,
  clearChaptersR,
  toggleRangeR,
  setRangeR
}