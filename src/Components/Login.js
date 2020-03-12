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

function Login(props){

    const [state, setState] = React.useState({
        username : "prasad@ideafactors.com",
        password : "testing@1234",
        newpassword: "",
        loginError: "",
        loading: false,
        user: {},
        userlang: props.lang
    })

    const {getCurrentSession} = props;
    const {add, update } = useIndexedDB('user');

    React.useEffect(() => {
        getCurrentSession();
    });

    React.useEffect(() => {
        Hub.listen('auth', (data) => {
            console.log(payload.event);
          const { payload } = data
           if(payload.event === 'signIn_failure'){
             console.log('login failure')
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
        Auth.completeNewPassword(props.user, state.newpassword);
    }

    function handleLogin(){

        console.log( props.username , props.lang, state.username, state.lang)

        if(state.username.trim() === "" || state.password.trim() === "" ){
            setState({...state, loginError:"Email Address and Password cannot be blank"});
        }
        else{
            props.signIn(state);
            console.log(props.lang)
            setState({...state, loading: true, loginError:"", lang:props.userlang});

            if( props.username === '' ){
                add({id:0, username: state.username.trim(), lang: '_en'}).then( resp => {}, err =>{console.log(err);})
            } else if (props.username !== state.username.trim() ){
                update({id:0, username: state.username.trim(), lang: '_en'}).then( resp => {}, err =>{console.log(err);})
            }

        }
    }

     const newp = typeof props.challenge !== 'undefined' &&
                    props.challenge === "NEW_PASSWORD_REQUIRED" ;
    if(newp){
        console.log("Redirecting");
        return (
            <Redirect to='/changepassword' />
        )
    }
    else if(typeof props.user.username !== 'undefined' && props.user.username !== null){
        return (
            <Redirect to='/preview' />
        )
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
                    <TextField autoFocus key="username" fullWidth id="username" label="Email Address" type="email"
                        autoComplete="username" onChange={handleChange} value={state.username} required/>
                    <TextField fullWidth key="password" id="password" label="Password" type="password"
                        autoComplete="current-password" onChange={handleChange} value={state.password}
                        onKeyDown={handleKeyDown} required />
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
                            onClick={handleLogin}
                            color="primary"
                            style={{margin: '20px'}}
                        >
                            Login
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
      userlang: state.signIn.userlang,
      challenge: state.signIn.user.challengeName
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Login);
