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

function Login(props){
    const [state, setState] = React.useState({
        username : "",
        password : "",
        newpassword: "",
        loginError: "",
        loading: false
    })

    const {getCurrentSession} = props;
    React.useEffect(() => {
        getCurrentSession();
    });
    
    React.useEffect(() => {
        Hub.listen('auth', (data) => {
          const { payload } = data
           if(payload.event === 'signIn_failure'){
            setState({...state, username : "", password: "", newpassword: "",
            loginError: "Invalid Email Address & Password combination. ",
            loading: false})
           }
        })
      }, [props, state])
    
    function handleKeyDown(e){
        if(e.keyCode === 13) {
            handleLogin();
        }
    }

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
        setState({...state, username : "", password: "", newpassword: "", loginError: "", loading: false})
    }
    
    function changePassword(){
        const loggedUser = Auth.completeNewPassword(props.user, state.newpassword);
        console.log(loggedUser);
    }
    
    function handleLogin(){
        if(state.username.trim() === "" || state.password.trim() === "" ){
            setState({...state, loginError:"Email Address and Password cannot be blank"});
        }
        else{
            props.signIn(state);
            setState({...state, loading: true, loginError:""});
        }
    }

    console.log(props.user);

    if(typeof props.user.username !== 'undefined' && props.user.username !== null){
        return (
            <Redirect to='/preview' />
        )
    }

    const newp = typeof props.challenge !== 'undefined' && 
                    props.challenge === "NEW_PASSWORD_REQUIRED" ;
    
    const label = newp ? 'Change Password' : 'Login';

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
                {newp ? 
                    <TextField fullWidth id="newpassword" label="New Password" type="password"                
                    autoComplete="new-password" onChange={handleChange} value={state.newpassword} required 
                    onKeyDown={handleKeyDownPwd}/>
                : 
                    [<TextField autoFocus key="username" fullWidth id="username" label="Email Address" type="email" 
                        autoComplete="username" onChange={handleChange} value={state.username} required/>,
                    <TextField fullWidth key="password" id="password" label="Password" type="password"                
                        autoComplete="current-password" onChange={handleChange} value={state.password} 
                        onKeyDown={handleKeyDown} required />] 
                }
                
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
                            onClick={newp ? changePassword : handleLogin} 
                            color="primary" 
                            style={{margin: '20px'}}
                        > 
                            {label}
                        </Button>
                </div>
            </div>
        </div>
    )
} 


const mapDispatchToProps = (dispatch) => {
    return {
            signIn: (state) => dispatch(signIn(state)),
            getCurrentSession: () => dispatch(signIn())
        }
  }    
  
  const mapStateToProps = state => {
    return {
      user: state.signIn.user,
      challenge: state.signIn.user.challengeName
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login);