import React from 'react'
import App from './App'
import Dashboard from './Dashboard'
import View from './View'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import logo from './logo.png';
import YAML from "yamljs";
import Login from './Components/Login'
import {Redirect} from 'react-router-dom';
import { UserProvider } from "./Components/UserContext";
import { useIndexedDB } from 'react-indexed-db';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {yaml:"", json:"", str: "", err: "", height: window.innerHeight, width: window.innerWidth, username: "", lang: "_en" };
        this.handleResize = this.handleResize.bind(this);
        this.processYAML = this.processYAML.bind(this);
        this.processURL = this.processURL.bind(this);
    }

    processYAML(survey) {

            let json = "";
            try{
                json = YAML.parse(survey);

                this.setState(
                {
                    yaml : survey,
                    json : json,
                    str  : JSON.stringify(json, undefined, 4),
                    err  : ""
                });

                console.log(this.state)
            }
            catch(error){
                this.setState({ ...this.state, yaml : survey, err:error})
            }
    }

    processURL(url){

      const { getAll } = useIndexedDB('conf');
      getAll().then( confFiles => {
          const dbentry = confFiles.filter( conf => conf.id === url);
          if(dbentry.length > 0)
          {
              this.processYAML(dbentry[0].text);
          }
      }, err => {
          console.log(err);
      })

    }

    processS3URL(url){
      console.log(url)
      fetch(url)
             .then((r) => r.text())
             .then(text  => {
                 this.processYAML(text);
                 console.log(text);
                 console.log(this);
                 try{
                     this.processYAML(text);
                     console.log(text)
                 }
                 catch(error){
                     console.log(error);
                 }

             })

    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        const { getByID } = useIndexedDB('user');
        getByID(0).then( user => {
            if(user){
              this.setState({ ...this.state, username: user.username, lang: user.lang});
            }
            else{
              this.setState({ ...this.state, username: '', lang: user.lang});
            }
        }, event => { console.log(event)});

    }


  handleResize() {
    this.setState( {...this.state, height: window.innerHeight, width: window.innerWidth });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
        const user = { username: this.state.username, lang: this.state.lang };

        return  (
                <UserProvider value={user}>
                <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to='/signin' />
                    </Route>
                    <Route exact path='/signin' render={
                            (props) => <Login {...this.state} logo={logo} />
                        }
                    />
                    <Route exact path='/preview' render={
                        (props) => <View
                                        {...this.state}
                                        logo={logo}
                                        height={this.state.height}
                                        width={this.state.width}
                                        processYAML={this.processYAML}
                                        processURL={this.processURL}
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
                                    processURL={this.processS3URL}
                                    yaml={this.state.yaml}
                                    json={this.state.json}
                                    err={this.state.err}
                                    editor={true}
                                /> }
                    />
                    <Route path='/dashboard' render={
                        (props) => <Dashboard
                                    {...props}
                                    logo={logo}
                                    height={this.state.height}
                                    width={this.state.width}
                                    processYAML={this.processYAML}
                                    processURL={this.processS3URL}
                                    yaml={this.state.yaml}
                                    json={this.state.json}
                                    err={this.state.err}
                                    editor={true}
                                /> }
                    />
                </Switch>
                </BrowserRouter>
                </UserProvider>
        )
        }
}

export default Home;
