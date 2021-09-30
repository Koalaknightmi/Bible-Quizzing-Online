import { createSlice } from '@reduxjs/toolkit'
import initialStates from "../../static/initialStates"
import {connectReducer} from "./reducers"
import {connectSelector} from "./selectors"

const socketReducer = createSlice({
  name:"socket",
  initialState:initialStates.socket,
  reducers:{
    connect:connectReducer,
  }
});

export const { connect } = socketReducer.actions;
export {connectSelector}
export default socketReducer.reducer;