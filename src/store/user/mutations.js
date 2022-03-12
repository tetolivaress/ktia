
export con someMutation (state) {
  CHANGE_MONTH (state, payload) {
    state.selectedMonth = payload
  },
  RESET (state) {
    state.expenses = []
  }
}
