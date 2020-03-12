import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import * as surveydata from './niti-ipsos-surveys.json';
import { SyncAllConfFiles } from './Util';

class SurveyPicker extends React.Component {
    constructor(props){
      super(props);
      this.state = { surveys : []};

      this.handleClick = this.handleClick.bind(this);

    }

    handleClick(yaml){
        this.props.processURL(yaml)
    }

    componentDidMount(){
        this.setState({surveys:surveydata.surveys});
        SyncAllConfFiles();
    }

    render(){
        
        const list = {
          width: '100%',
          height: '95vh',
          border: '1px solid green',
          display:'flex',
          flexDirection:'row',
          justifyContent: 'center',
          overflowY: 'scroll',
          padding: '30px'
        }
        const paper = {
          maxWidth: '50%',
          margin: `10px 10px`,
          padding: '10px',
          width: '100%',
          paddingTop:'20px',
        }

        const survys = this.state.surveys.map((surv, i) => {
            return (

                <Paper key={i} style={paper}>
                  <Grid container spacing={1} style={{cursor:'pointer'}} onClick={() => this.handleClick(surv.yaml)}>
                    <Grid item >
                      <Avatar src={surv.icon}>{surv.category}</Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography>{surv.name}</Typography>
                    </Grid>
                  </Grid>
              </Paper>

            )
        });

        return (
            <Grid container direction='column' style={list}>
                {survys}
            </Grid>
        )

    }
}

export default SurveyPicker;
