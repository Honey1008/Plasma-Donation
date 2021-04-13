const initialState = {
   authError: null
}

export const Auth = (state = initialState, action) => {
   switch(action.type){
      case 'LOGIN_SUCCESSFUL':
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
         return state
         
      default:
         return state

   } 
} 