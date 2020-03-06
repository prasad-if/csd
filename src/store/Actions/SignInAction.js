
import { Auth } from 'aws-amplify'

export const signIn  = (params) => {

    return (dispatch, getState) => {
        if(typeof params === 'undefined'){

            Auth.currentAuthenticatedUser().then(data => {
                dispatch({type : "AUTH_SUCCESS", data})
            })
            .catch((err) => {
                dispatch({type:'LOGIN_FAILED', err});
            })
        }
        else{

            Auth.signIn(params.username, params.password).then(data => {
                console.log(data)
                dispatch({type : "LOGIN_SUCCESS", data})
            })
            .catch((err) => {
              console.log(err);
                dispatch({type:'LOGIN_FAILED', err});
            })
        }

    }
}
