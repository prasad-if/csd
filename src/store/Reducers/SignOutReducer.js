const initialState = {}

const SignOutReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGOUT_SUCCESS':
            return {...state, logoutError: '', user : {}};

        case 'LOGOUT_FAILED':
            console.log("Logout failed")
            return {...state, logoutError: 'Logout failed. Please try again. '}

        default:
           return state  
    }
}

export default SignOutReducer