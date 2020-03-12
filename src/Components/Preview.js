import React from 'react';
import ScrollableTabsButtonAuto from './ScrollableTabsButtonAuto'
import { useIndexedDB } from 'react-indexed-db';

export default class Preview extends React.Component{

    constructor(props){
        super(props);

        let mystateObj = {}
        let questionLookup = {}
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
        this.questionLookup = questionLookup;
    }

    submit(){
        console.log("&&& inside submit "+JSON.stringify(this.state))
        const { add } = useIndexedDB('surveys');

        add({survey:this.props.json.survey, answers:this.state}).then(
          event => {
            console.log('ID Generated: ', event);
          },
          error => {
            console.log(error);
          }
        );

        this.props.allowBack(true);
    }

    store(field, value){
        this.setState( {...this.state, [field] : value})
        this.props.allowBack(false);
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
                />
            )
        }
    }
}
