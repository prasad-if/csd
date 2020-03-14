
import React from 'react';
import Button from '@material-ui/core/Button';

import PlayIcon from '@material-ui/icons/PlayArrow';
import DoneIcon from '@material-ui/icons/Done';
import RepeatIcon from '@material-ui/icons/Repeat';
import PreviousIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Navbar(props){
    const viewerStyle = props.editor ? "navbar" : "navbar1";
    const [state, setState] = React.useState({
        showsnack: false
    })

    const { showsnack } = state;

    function submit(){
        console.log("### inside submit ");
        const notready = props.submit();
        console.log("On submit ", notready)
        if (!notready)
        {
          setState({...state, showsnack: true}, opensnackbar())
          opensnackbar()
          console.log(state.showsnack)
          return
        }
        props.goto(props.current+1);
    }
    function opensnackbar(){
      console.log('in open', state.showsnack)
      setState({...state, showsnack: true})
    }
    function closeSnack(){
      console.log('invoked close')
      setState({...state, showsnack: false})
    }

    if(props.current === 0){
        return (
            <div className={viewerStyle}>
                <Button variant="outlined" color="primary" endIcon={<PlayIcon/>}
                    onClick={() => props.goto(props.current+1)}>
                    Start
                </Button>
            </div>
        )
    }
    else if(props.current === props.total - 2){
        return (
            <div className={viewerStyle}>
            <Button variant="outlined" color="primary" startIcon={<PreviousIcon/>}
                onClick={() => props.goto(props.current-1)} >
                Previous
            </Button>
            <Button variant="outlined" color="primary" startIcon={<DoneIcon/>}
                onClick={submit}>
                Submit
            </Button>
            </div>
        )
    }
    else if(props.current === props.total - 1){
        return (
            <div className={viewerStyle}>
            <Button variant="outlined" color="primary" startIcon={<RepeatIcon/>}
                onClick={() => props.goto(0)}>
                Repeat survey
            </Button>
            </div>
        )
    }

    return (
        <div>
        <div className={viewerStyle}>
            <Button variant="outlined" color="primary" startIcon={<PreviousIcon/>}
                onClick={() => props.goto(props.current-1)} >
                Previous
            </Button>
            <Button variant="outlined" color="primary" endIcon={<NextIcon/>}
                onClick={() => props.goto(props.current+1)} >
                Next
            </Button>
        </div>
        <Snackbar open={showsnack} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={closeSnack}>
          <Alert severity="warning" onClose={closeSnack}>
              Please fill all mandatory questions before submission!
         </Alert>
        </Snackbar>
        </div>
    )
}
