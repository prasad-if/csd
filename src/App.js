import React from 'react';
import './App.css';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-monokai";
import View from './View'

import OpenIcon from '@material-ui/icons/CloudDownload';
import SaveIcon from '@material-ui/icons/CloudDone';
import SaveAsIcon from '@material-ui/icons/CloudUpload';

import Button from '@material-ui/core/Button';
import { Storage } from 'aws-amplify';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';


import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.refName = React.createRef();
    this.process = this.process.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    this.state = {open: false, loading: false, category: "", survey: "", selection: ""};
    //console.log(this.state);
  }

  process(){
    const yaml = this.refName.current.editor.getValue();
    this.props.processYAML(yaml);
  }

  handleKeyDown(e){
    if(e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleChange(e){
    this.setState({
      ...this.state,
      [e.target.id] : e.target.value
    })

    //console.log(this.state);
  }

  handleCancel(){
    this.setState({...this.state, open:false, loading: false, selection:"" });
  }
  
  handleSubmit(){
    //console.log("inside handleSubmit "+this.state);
    if(this.state.selection === "save"){
      this.setState({...this.state, loading: true });
      Storage.put(this.state.category+'/'+this.state.survey+'.yml', this.props.yaml, {
        contentType: 'text/plain'
      })
      .catch(err => console.log(err))
      .then (result => {
          this.setState({...this.state, open:false, loading: false });       
        }
      )
    }
    else{
      this.setState({...this.state, loading: true });
      Storage.get(this.state.category+'/'+this.state.survey+'.yml', {
        contentType: 'text/plain'
      })
      .catch(err => console.log(err))
      .then (result => {
        //console.log(result);
          this.setState({...this.state, open:false, loading: false }); 
          this.props.processURL(result);      
        }
      )
    }
  }

  showDialog(flag){
    this.setState({...this.state, open:true, selection: flag});
  }

  render() {
    return (
      <div className="App" style={{height: this.props.height, width: this.props.width}}>
          <div className="leftpane">
              <div className="topbar">
                <div className="title">
                  <div style={{display:'flex', alignItems:'center'}}>
                    <img src={this.props.logo} alt="Surveykshan" height="40px" style={{padding: '5px'}} />
                  </div>
                  <div >
                    <div style={{color:'white', fontSize:'x-large', paddingLeft:'5px'}}>Surveykshan</div>
                    <div style={{color:'white', fontSize:'small', textAlign:'left', paddingLeft:'5px', paddingBottom:'5px'}}>Create surveys in a jiffy</div>
                  </div>
                </div>
                <div style={{margin:'20px'}}>
                    <Button variant="contained" startIcon={<OpenIcon/>} style={{margin:'10px'}} size="small"
                    onClick={() => this.showDialog('open')}> 
                    Open
                  </Button>
                  <Button variant="contained" startIcon={<SaveIcon/>} style={{margin:'10px'}} size="small"
                  onClick={() => this.showDialog('save')}>                   
                  Save
                  </Button>
                  <Button variant="contained" startIcon={<SaveAsIcon/>} style={{margin:'10px'}} size="small"
                  onClick={() => this.showDialog('save')}> 
                    Save As
                  </Button>
                </div>
              </div>
          <div>
            <AceEditor
              mode="yaml"
              theme="monokai"
              name="ace-editor"
              height="92vh"
              width="50vw"
              fontSize={14}
              focus={true}
              showPrintMargin={false}
              editorProps={{ $blockScrolling: Infinity }}
              ref={this.refName}
              value={this.props.yaml}
              wrapEnabled={true}
              placeholder=""
              onChange={this.process}

            />
          </div>
          </div>
          <div className="rightpane">
            <View {...this.props} editor={true} />
          </div>

          <Dialog open={this.state.open} disableBackdropClick={true}
            onClose={this.handleCancel} PaperComponent={PaperComponent} >
            <DialogTitle 
                style={{ 
                    cursor: 'move', 
                    borderBottom: '1px groove lightgray' 
                }} id="draggable-dialog-title"><b>Please provide the following details</b>
            </DialogTitle>
            <DialogContent>
            <Fade in={this.state.loading} unmountOnExit style={{
                transitionDelay: this.state.loading ? '800ms' : '0ms',
            }}>
                <LinearProgress />
            </Fade>
                <TextField autoFocus key="category" fullWidth id="category" label="Category" 
                    onChange={this.handleChange} value={this.state.category} required/>
                <TextField key="survey" fullWidth id="survey" label="Survey"  
                    onChange={this.handleChange} value={this.state.survey} required
                    onKeyDown={this.handleKeyDown} required />

            </DialogContent>
            <DialogActions>
                <Button className="bbutton" onClick={this.handleCancel} > Cancel </Button>
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
      
    );
  }
}

export default App;
