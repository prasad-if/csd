import React from 'react';
import TabPanel from './TabPanel'
import Question from './Question'

export default function Section(props) {
    const questions = typeof props.questions !== 'undefined' &&  props.questions !== null ?
    props.questions.map((question, i) => {
      if(question === null){
        return null;
      }
      return (
          <Question
            uid={"s"+props.sectionId+"_q"+i}
            id={typeof question.id !== 'undefined' && question.id !== null && question.id !== "" ? question.id : "s"+props.sectionId+"_q"+i}
            key={"Question "+i}
            question={question}
            store={props.store}
            answers={props.answers}
            questionLookup={props.questionLookup}
            unsubscribe={props.unsubscribe}
            subscribe={props.subscribe}
            submitState={props.submitState}
          />
      )
  }) : [];
    return (
        <TabPanel value={props.value} index={props.index} style={{textColor:'red'}}>
            <div className="surveyform" >
                {questions}
            </div>
        </TabPanel>
    )
}
