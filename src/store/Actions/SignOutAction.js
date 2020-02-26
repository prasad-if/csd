
import { Auth } from 'aws-amplify'

export const signOut  = () => {

    return (dispatch, getState) => {
        Auth.signOut().then(data => {
            dispatch({type : "LOGOUT_SUCCESS", data})
        })
        .catch((err) => {
            dispatch({type:'LOGOUT_FAILED', err});
        })
    }
}