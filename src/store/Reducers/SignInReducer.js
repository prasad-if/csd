const initialState = {
    loginError: null,
    user : {},
    userlang: "_en"
}

const SignInReducer = (state = initialState, action) => {
    switch(action.type){
        case 'AUTH_SUCCESS':
        case 'LOGIN_SUCCESS':
            return {...state, loginError:'', user: action.data, userlang: "_en"};
        case 'LOGIN_FAILED':
            return {...state, loginError: 'Invalid Email Address & Password combination. '}
        default:
           return state
    }
}

export default SignInReducer
