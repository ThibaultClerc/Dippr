const initialState = {
  query: ""
}

const searchQuery = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_QUERY' :
      return {
        ...state,
        query: action.query
      }
    default: 
      return state;
  }
}

export default searchQuery