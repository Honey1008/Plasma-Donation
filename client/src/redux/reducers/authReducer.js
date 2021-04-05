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
         break;

      case 'LOGIN_ERROR':
         return{
            ...state,
            authError: 'Login Failed!'
         }
         break;

      case 'SIGNOUT_SUCCESSFUL':
         console.log('Logged Out Successfully!')
         return state
         break;
         
      default:
         return state

   } 
}