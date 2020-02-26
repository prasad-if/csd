const initialState = {
    loginError: null,
    user : {}
}

const SignInReducer = (state = initialState, action) => {
    switch(action.type){
        case 'AUTH_SUCCESS':
            const newstate1 = {...state, loginError:'', user: action.data};
            return newstate1;

        case 'LOGIN_SUCCESS':
            const newstate = {...state, loginError:'', user: action.data};
            return newstate

        case 'LOGIN_FAILED':
            return {...state, loginError: 'Invalid Email Address & Password combination. '}

        default:
           return state  
    }
}

export default SignInReducer