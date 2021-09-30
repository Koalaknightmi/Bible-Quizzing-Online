const connectReducer = (state,action) => {
  state.connected = !action.payload
}

export {connectReducer}