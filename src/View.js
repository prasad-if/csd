import React, {setState} from 'react'
import Preview from './Components/Preview';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from './store/Actions/SignInAction'
import SurveyPicker from './Components/SurveyPicker';
import Menu from './Components/Menu';
import './App.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

class View extends React.Component {
    constructor(props){
      super(props);
      this.state = { surveys : [], open:false, stale: false};
      this.isStale = this.isStale.bind(this)
      this.handleCancel = this.handleCancel.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
      this.props.signIn();
    }

    isStale(status){
      this.setState( {...this.state, stale: status})
    }

    handleCancel(){
      this.setState({...this.state, open:false});
    }

    handleSubmit(){
      this.props.processYAML("");
      this.setState({...this.state, open:false});
    }

    render() {
      const backToListing = () => {
        if(this.state.stale)
        {
          this.setState( {...this.state, open: true})
        }
        else{
          this.props.processYAML("");
        }
      }

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
                <Preview json={this.props.json} setNav={this.setNav} editor={this.props.editor} isStale={this.isStale}/>
              : typeof this.props.err !== 'undefined' && this.props.err !== null && this.props.err !== "" ?
                <div style={{color:'red'}}>Error: {this.props.err.message} at line number {this.props.err.parsedLine}  </div>
              : this.props.editor === false && typeof this.props.user.username !== 'undefined' && this.props.user.username !== null && this.props.user.username !== "" ?
                <SurveyPicker processURL={this.props.processURL}/>
              : null}

              <Dialog open={this.state.open} disableBackdropClick={true}
                onClose={this.handleCancel} PaperComponent={PaperComponent} >
                <DialogTitle
                    style={{
                        cursor: 'move',
                        borderBottom: '1px groove lightgray'
                    }} id="draggable-dialog-title"><b>The current questionnaire is not saved !!</b>
                </DialogTitle>
                <DialogContent>
                <Fade in={this.state.loading} unmountOnExit style={{
                    transitionDelay: this.state.loading ? '800ms' : '0ms',
                }}>
                    <LinearProgress />
                </Fade>
                    <Paper>
                     Moving out of the page will lose the data. Are you sure you want to go back ?
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button className="bbutton" onClick={this.handleCancel}> Cancel </Button>
                    <Button
                        className="bbutton"
                        onClick={this.handleSubmit}
                        style={{
                            color:'white',
                            backgroundColor:'rgb(74, 119, 229)',
                            width:'auto'
                        }}
                    > Done </Button>
                </DialogActions>
            </Dialog>
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
