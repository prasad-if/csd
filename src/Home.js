import React from 'react'
import App from './App'
import View from './View'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import logo from './logo.png';
import YAML from "yamljs";
import Login from './Components/Login'
import {Redirect} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {yaml:"", json:"", str: "", err: "", height: window.innerHeight, width: window.innerWidth };
        this.handleResize = this.handleResize.bind(this);
        this.processYAML = this.processYAML.bind(this);
    }

    processYAML(yaml) {
        let json = "";
        try{
            json = YAML.parse(yaml);
            //console.log(JSON.stringify(json));

            this.setState(
            {
                yaml : yaml,
                json : json,
                str  : JSON.stringify(json, undefined, 4),
                err  : ""
            });
        }
        catch(error){
            this.setState({ ...this.state, yaml : yaml, err:error})
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

        try{
            fetch("https://s3.ap-south-1.amazonaws.com/surveykshan.com/Templates/sample.yml")
            .then((r) => r.text())
            .then(text  => {
                //console.log(text);
                //this.setState({ ...this.state, yaml: text});
                this.processYAML(text);
            })
        }
        catch(err){
            console.log(err);
        }
      
    }

    
  handleResize() {
    console.log("Roload")
    this.setState( {...this.state, height: window.innerHeight, width: window.innerWidth });
  };
  
  componentWillUnmount() {
    console.log("Unmount ")
    window.removeEventListener('resize', this.handleResize);
  }



    render() {
        return  (
                <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to='/signin' />
                    </Route>
                    <Route exact path='/signin' render={
                            (props) => <Login {...props} logo={logo} />
                        } 
                    />
                    <Route exact path='/preview' render={
                        (props) => <View 
                                        {...props} 
                                        logo={logo}
                                        height={this.state.height} 
                                        width={this.state.width} 
                                        processYAML={this.processYAML} 
                                        yaml={this.state.yaml}
                                        json={this.state.json}
                                        err={this.state.err}
                                        editor={false}
                                    />} 
                    />
                    <Route path='/editor' render={
                        (props) => <App 
                                    {...props} 
                                    logo={logo} 
                                    height={this.state.height} 
                                    width={this.state.width} 
                                    processYAML={this.processYAML} 
                                    yaml={this.state.yaml}
                                    json={this.state.json}
                                    err={this.state.err}
                                    editor={true}
                                /> }
                    />
                </Switch>
                </BrowserRouter>
        )
        }
}

export default Home;