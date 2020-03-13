import React from 'react';
import ScrollableTabsButtonAuto from './ScrollableTabsButtonAuto'
import { useIndexedDB } from 'react-indexed-db';

export default class Preview extends React.Component{

    constructor(props){
        super(props);

        let mystateObj = {}
        let questionLookup = {}
        let subscribers = new Map()
        this.props.json.survey.sections.forEach((section, i) => {
            if(typeof section.questions !== "undefined" && section.questions !== null){
                section.questions.forEach((question, j) => {
                    mystateObj["s"+i+"_q"+j] = "";
                    if(typeof question.id !== 'undefined' && question.id !== null && question.id !== ""){
                        questionLookup[question.id] = "s"+i+"_q"+j;
                    }
                })
            }
        });

        this.state = mystateObj;
        this.store = this.store.bind(this);
        this.submit = this.submit.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.lookup = this.lookup.bind(this);
        this.questionLookup = questionLookup;
        this.questionpub = subscribers;
    }

    submit(){
        console.log("&&& inside submit "+JSON.stringify(this.state))
        const { add } = useIndexedDB('surveys');

        add({survey:this.props.json.survey, answers:this.state}).then(
          event => {
            console.log('ID Generated: ', event);
            this.props.isStale(false)
          },
          error => {
            console.log(error);
          }
        );

    }

    lookup(uid){
       return this.state[uid]
    }

    store(field, value){
        this.props.isStale(true)
        this.setState( {...this.state, [field] : value}, this.publish)
    }

    publish()
    {
      this.questionpub.forEach( (subscriber) => {
        subscriber()
      });
    }

    subscribe(uid, subscriber)
    {
      //console.log('registered', uid, this.questionpub)
      if(subscriber && this.questionpub)
      {
        this.questionpub.set(uid, subscriber);
      }
    }

    render(){
        if(typeof this.props.json.survey === 'undefined'){
            return (<div style={{color:'red'}}>Error: <b>survey</b> object is missing </div>);
        }
        else if(typeof this.props.json.survey.id === 'undefined'){
            return (<div style={{color:'red'}}>Error: <b>survey id</b> is missing </div>);
        }
        else if(this.props.json.survey.id === null){
            return (<div style={{color:'red'}}>Error: <b>survey id</b> is blank </div>);
        }
        else if(typeof this.props.json.survey.version === 'undefined'){
            return (<div style={{color:'red'}}>Error: <b>survey version</b> is missing </div>);
        }
        else if(this.props.json.survey.version === null){
            return (<div style={{color:'red'}}>Error: <b>survey version</b> is blank </div>);
        }
    /*  else if(typeof props.json.survey.sections === 'undefined'){
            return (<div style={{color:'red'}}>Error: <b>sections </b>object is missing </div>);
        } */
        else{
            return (
                <ScrollableTabsButtonAuto
                    survey={this.props.json.survey}
                    store={this.store}
                    answers={this.state}
                    questionLookup={this.questionLookup}
                    editor={this.props.editor}
                    submit={this.submit}
                    subscribe={this.subscribe}
                    lookup={this.lookup}
                />
            )
        }
    }
}
