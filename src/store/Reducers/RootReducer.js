import {combineReducers} from 'redux'
import SignInReducer from './SignInReducer'
import SignOutReducer from './SignOutReducer'

const AppReducer = combineReducers({
    signIn: SignInReducer,
    signOut: SignOutReducer,
})

const RootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined
      }
    return AppReducer(state, action)
  }

export default RootReducer