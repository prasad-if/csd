import React, {setState} from 'react'
import Preview from './Components/Preview';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from './store/Actions/SignInAction'
import SurveyPicker from './Components/SurveyPicker';
import Menu from './Components/Menu';
import './App.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Snackbar from '@material-ui/core/Snackbar';


class View extends React.Component {
    constructor(props){
      super(props);
      this.state = { surveys : [], syncFlag : true, showError: false};

      this.allowBack = this.allowBack.bind(this);
      this.handleErrorClose = this.handleErrorClose.bind(this);
    }
    componentDidMount(){
      this.props.signIn();
    }

    allowBack(bool){
      this.setState({ ...this.state, syncFlag : bool});
    }

    handleErrorClose(){
      this.setState({ ...this.state, showError : false});
    }



    render() {
      const backToListing = () => {
        if(this.state.syncFlag){
          this.props.processYAML("");
        }
        else{
          this.setState({ ...this.state, showError: true});
        }
      }

      console.log(this.props.user.username);
      if(this.props.editor === false && (typeof this.props.user.username === 'undefined' ||
        this.props.user.username === null ||
        this.props.user.username === "" )){

        return (
            <Redirect to='/signin' />
        )
    }

       return  (
        <div >
            <div className="topbar">
                  <div style={{float:'left', height:'50px', display:'flex', flexDirection:'row', alignItems:'center'}}>
                    { this.props.editor === false && this.props.json !== null && this.props.json !== "" ?
                      <ArrowBackIosIcon height='40px' style={{paddingLeft: '5px', cursor: 'pointer'}} onClick={backToListing} />
                      : null }
                    <img src={
                      (typeof this.props.json !== 'undefined' && this.props.json !== null && this.props.json !== ""  &&
                      typeof this.props.json.survey  !== 'undefined' &&
                      typeof this.props.json.survey.logo !== 'undefined' &&
                      this.props.json.survey.logo !== null &&
                      this.props.json.survey.logo !== "" ) ? this.props.json.survey.logo : this.props.logo
                    } alt="Surveykshan" height='40px' style={{padding: '5px', objectFit:'cover'}} />
                  </div>
                    <div style={{color:'white', fontSize:'medium', float: 'left'}}>
                      { (typeof this.props.json !== 'undefined' && this.props.json !== null && this.props.json !== "" &&
                        typeof this.props.json.survey  !== 'undefined' &&
                        typeof this.props.json.survey.title !== 'undefined' &&
                        this.props.json.survey.title !== null &&
                        this.props.json.survey.title !== "" ) ? this.props.json.survey.title  : "Surveykshan"

                      }
                    </div>
                    <div style={{float:'right', paddingRight: 30, color:'white', fontSize:'small', alignItems:'right', align:'right'}}>
                         <Menu/>
                    </div>

            </div>
              {typeof this.props.json !== 'undefined' && this.props.json !== null && this.props.json !== "" ?
                <Preview json={this.props.json} setNav={this.setNav} editor={this.props.editor} allowBack={this.allowBack}/>
              : typeof this.props.err !== 'undefined' && this.props.err !== null && this.props.err !== "" ?
                <div style={{color:'red'}}>Error: {this.props.err.message} at line number {this.props.err.parsedLine}  </div>
              : this.props.editor === false && typeof this.props.user.username !== 'undefined' && this.props.user.username !== null && this.props.user.username !== "" ?
                <SurveyPicker processURL={this.props.processURL}/>
              : null}
          
          <Snackbar 
                open={this.state.showError} 
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                autoHideDuration={6000} 
                message="Survey is in progress. Cannot go back without submitting the responses."
                onClose={this.handleErrorClose}
          >

          </Snackbar>
          </div>
       )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
          signIn: () => dispatch(signIn()),
      }
}


const mapStateToProps = state => {
  return {
    user: state.signIn.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
