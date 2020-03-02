import React from 'react'
import { Storage } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import * as surveydata from './niti-ipsos-surveys.json';

class SurveyPicker extends React.Component {
    constructor(props){
      super(props);
      this.state = { surveys : []};

      this.handleClick = this.handleClick.bind(this);

    }

    handleClick(yaml){
        Storage.get(yaml, {
          contentType: 'text/plain'
        })
        .catch(err => console.log(err))
        .then (result => {
            this.props.processURL(result);
          }
        )

    }

    componentDidMount(){

        this.setState({surveys:surveydata.surveys});
    }

    render(){
        const root = {
          width:'80%',
          justify: 'center',
          justifyContent:'space-around',
          display: 'flex',
          flexWrap: 'wrap',
          overflow: 'hidden',
        }
        const list = {
          width: 500,
          height: 450,
        }
        const paper = {
          maxWidth: 400,
          margin: `10px 10px`,
          padding: '10px',
          width: '60%',
          paddingTop:'20px'
        }

        const survys = this.state.surveys.map((surv, i) => {
            return (

                <Paper key={i} style={paper}>
                  <Grid container wrap="nowrap" spacing={1} onClick={() => this.handleClick(surv.yaml)}>
                    <Grid item >
                      <Avatar src={surv.icon}>{surv.category}</Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography noWrap>{surv.name}</Typography>
                    </Grid>
                  </Grid>
              </Paper>
            )
        });

        return (
          <div style={root}>
            <Grid container direction='column' style={list}>
                {survys}
            </Grid>
          </div>
        )

    }
}

export default SurveyPicker;
