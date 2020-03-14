import React from 'react';
import ScrollableTabsButtonAuto from './ScrollableTabsButtonAuto'
import { useIndexedDB } from 'react-indexed-db';

export default class Preview extends React.Component{

    constructor(props){
        super(props);

        let mystateObj = {}
        let questionLookup = {}
        let subscribers = new Map()
        let invalidquestions = []
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
        this.unsubscribe = this.unsubscribe.bind(this);
        this.lookup = this.lookup.bind(this);
        this.questionLookup = questionLookup;
        this.questionpub = subscribers;
        this.invalidquestions = invalidquestions;
        this.showsnack = false;
    }

    submit(){
        //console.log("&&& inside submit "+JSON.stringify(this.state))

        const goodtogo = this.props.json.survey.sections.every( (section, i) =>{
           section.questions.every( (quest, j) => {
              const uid = 's'+i+'_q'+j
              if ( (this.state[uid] == undefined || this.state[uid] == '') && (quest.mandatory && quest.mandatory != undefined && quest.mandatory == true) && this.invalidquestions.indexOf(uid) == -1)
              {
                console.log(uid, this.state[uid])
                return false
              }
              return true
           })
        })

        console.log(goodtogo)

        if(!goodtogo){
          this.showsnack = true;
          return false
        }

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
        return true
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
      if(subscriber)
      {
        this.questionpub.set(uid, subscriber);
      }
    }

    unsubscribe(uid, valid)
    {
      if(valid && this.invalidquestions.indexOf(uid) == -1)
      {
        this.invalidquestions.push(uid);
      }else if (!valid && this.invalidquestions.indexOf(uid) != -1){
        this.invalidquestions.splice(this.invalidquestions.indexOf(uid));
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
              <div>
                <ScrollableTabsButtonAuto
                    survey={this.props.json.survey}
                    store={this.store}
                    answers={this.state}
                    questionLookup={this.questionLookup}
                    editor={this.props.editor}
                    submit={this.submit}
                    subscribe={this.subscribe}
                    unsubscribe={this.unsubscribe}
                    lookup={this.lookup}
                />
              </div>
            )
        }
    }
}
