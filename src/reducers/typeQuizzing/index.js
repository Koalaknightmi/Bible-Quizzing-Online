import { createSlice } from '@reduxjs/toolkit'
import initialStates from "../../static/initialStates"
import {
  setChaptersR,
  clearChaptersR,
  toggleRangeR,
  setRangeR
} from "../chapterSelect"

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
  initialState:{...initialStates.typeQuizzing,rangeVal:initialStates.rangeVal},
  reducers:{
    setChapters:setChaptersR,
    clearChapters:clearChaptersR,
    changePrompt:changePromptR,
    changeType:changeTypeR,
    changefirstLetter:changefirstLetterR,
    toggleRange:toggleRangeR,
    setRange:setRangeR,
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
  setRange,
  changeCompetePreset,
  toggleCompeting,
  toggleJustMemory
} = typeQuizzingReducer.actions;
export default typeQuizzingReducer.reducer;