import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

     paper: {
       padding: theme.spacing(2),
       textAlign: 'center',
     },

}));

export default function GridComp(props){
    const [state, setState] = React.useState({
        rowcount : 1,
        colcount : 1,
        addRows : false
    })
    const classes = useStyles();

    function addCount(){
        setState({...state, rowcount : state.rowcount+1})
    }

    const colheader = props.question.cols.map((col) => {
        return (
            <Grid item xs={1}>
                <Paper className={classes.paper}>{col.text}</Paper>
            </Grid>
        )
    })

    // TODO yet to make question work
    const coldata = props.question.cols.map((col) => {
        return (
            <Grid item xs={1}>test</Grid>
        )
    });

    const rowdata = typeof props.question.rows.count === 'undefined' ? props.question.rows.map((row) => {
        //setState({...state, colcount : props.question.cols.length})
        return (
            <div>
                <Grid item xs={1}>
                  <Paper className={classes.paper}>{row.text}</Paper>
                </Grid>
                {coldata}
            </div>
        )
    })
    : () => {
        state.addRows = true;
        let rows = [];
        for (let i = 0; i < state.rowcount; i++) {
            //rows.push(<Grid item xs={1}><Paper className={classes.paper}>{i}</Paper></Grid>,{coldata});
        }
        return rows
    };

    return (
 	      <Grid container spacing={3}>
            <Grid item xs={1}>
                <Paper className={classes.paper}></Paper>
            </Grid>
            {colheader}
            {rowdata}
            {state.addRows ?
                <Button variant="outlined" color="primary" onClick={() => addCount()}>
                    Add Row
                </Button>
            : null }
        </Grid>
    )

}
