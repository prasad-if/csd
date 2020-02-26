import React from 'react';
import './App.css';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-monokai";
import View from './View'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.refName = React.createRef();
    this.process = this.process.bind(this);
  }

  process(){
    const yaml = this.refName.current.editor.getValue();
    this.props.processYAML(yaml);
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
      </div>
      
    );
  }
}

export default App;
