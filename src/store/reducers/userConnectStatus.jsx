const initialState = {
  user: []
}

const userConnectStatus = (state = initialState, action) => {
  switch(action.type) {
    case 'USER_LOGIN' :
      return {
        ...state,
        user: action.user
      }
    case 'USER_LOGOUT' :
      return {
        ...state,
        user: []
      }
    default: 
      return state;
  }
}

export default userConnectStatus