
import { Auth } from 'aws-amplify'

export const signIn  = (params) => {
    console.log("Inside signin "+params)
    return (dispatch, getState) => {
        if(typeof params === 'undefined'){
            console.log("Inside undefined")

            Auth.currentAuthenticatedUser().then(data => {
                dispatch({type : "AUTH_SUCCESS", data})
            })
            .catch((err) => {
                dispatch({type:'LOGIN_FAILED', err});
            })
        }
        else{
            console.log("Inside else")

            Auth.signIn(params.username, params.password).then(data => {
                dispatch({type : "LOGIN_SUCCESS", data})
            })
            .catch((err) => {
                dispatch({type:'LOGIN_FAILED', err});
            })
        }
        
    }
}