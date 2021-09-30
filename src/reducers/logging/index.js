import { createSlice } from '@reduxjs/toolkit'
import initialStates from "../../static/initialStates"

const setChaptersR = (state,action) => {
  state.chapters = action.payload
  state.range = false
}
const clearChaptersR = (state,action) => {
  state.chapters.splice(0,state.chapters.length)
}
const toggleRangeR = (state,action) => {
  state.range = !state.range
}
const setStartChapterR = (state,action) => {
  if(state.rangeVal.startingChapter === ""&&state.rangeVal.endingChapter === ""){
    state.rangeVal.endingChapter = action.payload
  }
  state.rangeVal.startingChapter = action.payload
  state.range = true
}
const setEndChapterR = (state,action) => {
  if(state.rangeVal.startingChapter === ""&&state.rangeVal.endingChapter === ""){
    state.rangeVal.startingChapter === action.payload
  }
  state.rangeVal.endingChapter = action.payload
  state.range = true
}
const setStartVerseR = (state,action) => {
  state.rangeVal.startingVerse = action.payload
  state.range = true
}
const setEndVerseR = (state,action) => {
  state.rangeVal.endingVerse = action.payload
  state.range = true
}
const changePromptR = (state,action) => {
  state.prompt = !state.prompt
}
const changeTypeR = (state,action) => {
  state.type = action.payload
}
const changeCompetePresetR = (state,action) => {
  state.competePreset = action.payload
}
const changefirstLetterR = (state,action) => {
  state.firstLetter = !state.firstLetter
}
const toggleCompetingR = (state,action) => {
  state.compete = !state.compete
}
const toggleJustMemoryR = (state,action) => {
  state.justMemory = !state.justMemory
}

const typeQuizzingReducer = createSlice({
  name:"typeQuizzing",
  initialState:initialStates.typeQuizzing,
  reducers:{
    setChapters:setChaptersR,
    clearChapters:clearChaptersR,
    changePrompt:changePromptR,
    changeType:changeTypeR,
    changefirstLetter:changefirstLetterR,
    toggleRange:toggleRangeR,
    setStartChapter:setStartChapterR,
    setEndChapter:setEndChapterR,
    setStartVerse:setStartVerseR,
    setEndVerse:setEndVerseR,
    changeCompetePreset:changeCompetePresetR,
    toggleCompeting:toggleCompetingR,
    toggleJustMemory:toggleJustMemoryR
  }
});

export const {
  setChapters,
  clearChapters,
  changePrompt,
  changeType,
  changefirstLetter,
  toggleRange,
  setStartChapter,
  setEndChapter,
  setStartVerse,
  setEndVerse,
  changeCompetePreset,
  toggleCompeting,
  toggleJustMemory
} = typeQuizzingReducer.actions;
export default typeQuizzingReducer.reducer;