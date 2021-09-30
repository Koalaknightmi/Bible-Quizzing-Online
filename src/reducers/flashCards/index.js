import { createSlice } from '@reduxjs/toolkit'
import initialStates from "../../static/initialStates"
import {
  setChaptersR,
  clearChaptersR,
  toggleRangeR,
  setRangeR
} from "../chapterSelect"

const toggleByYourselfR = (state,action) => {
  state.byYourself = !state.byYourself
}
const toggleRandomR = (state,action) => {
  if(!state.random){
    state.type = 1
  } else {
    state.type = 0
  }
  state.random = !state.random
}
const toggleJustMemoryR = (state,action) => {
  state.justMemory = !state.justMemory
}
const toggleReferenceToVerseR = (state,action) => {
  state.referenceToVerse = !state.referenceToVerse
}

const flashCardsReducer = createSlice({
  name:"flashCards",
  initialState:{...initialStates.flashCards,rangeVal:initialStates.rangeVal},
  reducers:{
    setChapters:setChaptersR,
    clearChapters:clearChaptersR,
    toggleRange:toggleRangeR,
    setRange:setRangeR,
    toggleRandom:toggleRandomR,
    toggleByYourself:toggleByYourselfR,
    toggleJustMemory:toggleJustMemoryR,
    toggleReferenceToVerse:toggleReferenceToVerseR
  }
});

export const {
  setChapters,
  clearChapters,
  toggleByYourself,
  toggleRange,
  setStartChapter,
  setEndChapter,
  setStartVerse,
  setEndVerse,
  toggleRandom,
  toggleJustMemory,
  toggleReferenceToVerse
} = flashCardsReducer.actions;
export default flashCardsReducer.reducer;