import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import { signIn } from '../store/Actions/SignInAction'
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Hub } from 'aws-amplify'
import { useIndexedDB } from 'react-indexed-db';

function ChangePassword(props){

    const {getCurrentSession} = props;
    React.useEffect(() => {
        getCurrentSession();
    });

    const [state, setState] = React.useState({
        newpassword: "",
        loginError: "",
        loading: false,
    })

    function handleKeyDownPwd(e){
        if(e.keyCode === 13) {
            changePassword();
        }
    }

    function handleChange(e){
        setState({
            ...state,
            [e.target.id] : e.target.value
        })
    }

    function handleCancel(){
        setState({...state, newpassword: "", loginError: "", loading: false})
    }

    function changePassword(){
        console.log(props.user);
        Auth.completeNewPassword(props.user, state.newpassword);
    }

    return (
        <div className="centered">
            <div>
                <img src={props.logo} alt="Surveykshan" height="100px" />
            </div>
            <div>
                Surveykshan
            </div>
            <div style={{color:'red', fontSize: 'small', padding: '10px'}}>{state.loginError}</div>

            <div style={{padding:'50px'}}>
                    <TextField fullWidth id="newpassword" label="New Password" type="password"
                    autoComplete="new-password" onChange={handleChange} value={state.newpassword} required
                    onKeyDown={handleKeyDownPwd}/>
               
                <div style={{width: '100%'}}>
                    <Fade in={state.loading} unmountOnExit style={{
                        transitionDelay: state.loading ? '800ms' : '0ms',
                    }}>
                        <LinearProgress />
                    </Fade>
                </div>
            </div>

            <div style={{paddingTop: '5px'}}>
                <div style={{display: 'flex', flexDirection: 'row', }}>
                        <Button variant="outlined" onClick={handleCancel} color="primary" style={{margin: '20px'}}> Cancel </Button>
                        <Button
                            variant="contained"
                            onClick={changePassword}
                            color="primary"
                            style={{margin: '20px'}}
                        >
                            Change Password
                        </Button>
                </div>
            </div>
        </div>

    )
}


const mapDispatchToProps = (dispatch) => {
    return {
            getCurrentSession: () => dispatch(signIn())
        }
  }

  const mapStateToProps = state => {
      console.log(state);
    return {
      user: state.signIn.user,
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);

