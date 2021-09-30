const calc = (state) => {
  return state.correct * 10 - state.incorrect * 5 - state.skips * 20
}

export default calc