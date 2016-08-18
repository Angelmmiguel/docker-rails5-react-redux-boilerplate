// Main reducer of the application

// Initial state
const initialState = {
  title: 'React'
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TITLE_FULFILLED':
      return Object.assign({}, state, { title: action.payload });
    default:
      return state;
  }
}

// Export the reducer
export default reducer;
