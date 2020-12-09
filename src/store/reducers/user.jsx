const initialState = {
  user: []
}

const userConnect = (state = initialState, action) => {
  switch(action.type) {
    case 'USER_LOGIN' :
      return {
        ...state,
        user: action.user
      }
    default: 
      return state;
  }
}

export default userConnect