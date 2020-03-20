
import React from 'react';
import Button from '@material-ui/core/Button';

import PlayIcon from '@material-ui/icons/PlayArrow';
import DoneIcon from '@material-ui/icons/Done';
import RepeatIcon from '@material-ui/icons/Repeat';
import PreviousIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';

export default function Navbar(props){
    const viewerStyle = props.editor ? "navbar" : "navbar1";


    function submit(){
        const notready = props.submit();
        if (!notready){
          return
        }
        props.goto(props.current+1);
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
    )
}
