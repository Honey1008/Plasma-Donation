const initialState = {
   authError: null
}

export const Auth = (state = initialState, action) => {
   switch(action.type){
      case 'LOGIN_SUCCESSFUL':
         console.log('Login Successful!')
         return{
            ...state,
            authError: null
         }

      case 'LOGIN_ERROR':
         return{
            ...state,
            authError: 'Login Failed!'
         }

      case 'SIGNOUT_SUCCESSFUL':
         console.log('Logged Out Successfully!')
         return state
         
      default:
         return state

   } 
}