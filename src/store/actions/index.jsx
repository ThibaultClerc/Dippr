export const loginUser = (user) => {
  return {
    type: 'USER_LOGIN',
    user
  }
}

export const logoutUser = () => {
  return {
    type: 'USER_LOGOUT'
  }
}

export const newQuery = (query) => {
  return {
    type: 'NEW_QUERY',
    query
  }
}