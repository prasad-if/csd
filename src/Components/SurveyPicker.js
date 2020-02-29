import React from 'react'
import { Storage } from 'aws-amplify';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


class SurveyPicker extends React.Component {
    constructor(props){
      super(props);
      this.state = { surveys : []};

      this.handleClick = this.handleClick.bind(this);

    }

    handleClick(category, survey){
        Storage.get(category+'/'+survey+'.yml', {
          contentType: 'text/plain'
        })
        .catch(err => console.log(err))
        .then (result => {
            this.props.processURL(result);      
          }
        )

    }

    componentDidMount(){
        Storage.list('')
        .then(result => {
            const surveys = result.map((entry) => {
            return { 
                    category:entry.key.substring(0, entry.key.indexOf('/')), 
                    survey: entry.key.substring(entry.key.indexOf('/')+1, entry.key.indexOf('.'))
                };
            });
            
            this.setState({surveys:surveys});

        })
        .catch(err => console.log(err));     
    }

    render(){
        const survys = this.state.surveys.map((surv, i) => {
            return (
                <div  key={i} style={{paddingTop:'20px'}}>  
                <Button variant="outlined" color="primary" key={i} 
                    onClick={() => this.handleClick(surv.category, surv.survey)}>
                    {surv.category} > {surv.survey} 
                </Button>
                </div>
            )
        });

        return (
            <div style={{width:'100%', height: '100vh', display:'flex', justifyContent:'space-around', flexWrap:'wrap'}} >
                {survys}
            </div>        
        )
        

    }
}

export default SurveyPicker;