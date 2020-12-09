export const loginUser = (user) => {
  console.log("je suis dans l'action loginUser")
  return {
    type: 'USER_LOGIN',
    user
  }
}