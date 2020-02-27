import React from "react"
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
//import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DetectIcon from '@material-ui/icons/MyLocation';
import CameraIcon from '@material-ui/icons/CameraAlt';
import SnapIcon from '@material-ui/icons/Camera';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { makeStyles } from '@material-ui/core/styles';
import QrReader from 'react-qr-reader'

const { Camera } = Plugins;
const { Geolocation } = Plugins;

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      textAlign: 'left',
      fontFamily: 'Noto Serif SC',
      fontSize: 'small',
    }
  },
}));

let multiSelectValues = {};

export default function Question(props){

    async function getCurrentPosition(qid) {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current', coordinates);

        putLocation(coordinates, qid);
    }

    async function takePicture1() {
        const image = await Camera.getPhoto({
          resultType: CameraResultType.Uri
        });
        console.log(image);
      }
    

    function onChange(event){
        if(event.target.type === "checkbox"){
            props.store(event.target.name, event.target.checked); 
        }else{
            props.store(event.target.name, event.target.value); 
        }
    }

 
    function onMultiSelect(event, controlName){
        if(typeof multiSelectValues[controlName] == "undefined"){
            multiSelectValues[controlName] = [];
        }

        if(event.target.checked){
            multiSelectValues[controlName].push(event.target.name);
        }
        else{
            multiSelectValues[controlName] = multiSelectValues[controlName].filter(arrayItem => arrayItem !== event.target.name);
        }
        props.store(controlName, multiSelectValues[controlName]); 
    }


    //const [location, setLocation] = React.useState("");
    function getLocation(qid) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => putLocation(position, qid));
        } 
    }

    function putLocation(position, qid){
        //setLocation(position.coords.latitude+","+position.coords.longitude);
        props.store(qid, [position.coords.latitude, position.coords.longitude])
    }

    const [showcamera, setShowcamera] = React.useState(false);
    const [stream, setStream] = React.useState(null);

    function getPicture(){
        var video = document.getElementById('video');

        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                setShowcamera(true);
                setStream(stream);
                video.srcObject = stream;
                video.play();
            }); 
        }
    }

    function takePicture(){
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var video = document.getElementById('video');
        
        context.drawImage(video, 0, 0, 64, 48);

        video.pause();
        video.src = "";
        stream.getTracks().forEach(function(track) {
            track.stop();
          });
          setShowcamera(false);

    }

    function turnoffCamera(){
        var video = document.getElementById('video');
        video.pause();
        video.src = "";
        stream.getTracks().forEach(function(track) {
            track.stop();
          });
          setShowcamera(false);
    }

    function handleScan(data ) {
        if (data) {
            props.answers[props.uid] = data;
        }
    }
    function handleScanError(err) {
        console.error(err);
    }

    function validateConditionGroup(conditionGroup){
        try{
            const conditionArray = conditionGroup.match(/[^\s']+|'([^']*)'/g);

            let result = false;
            let overall = false;
            for(let i=0; conditionArray.length >= i+3; i=i+4){
                result = validateCondition(conditionArray.slice(i, i+3));

                //console.log(result);

                if(i === 0){
                    overall = result;
                }
                else{
                    overall = conditionArray[i+4] === "and" ? (overall && result) : (overall || result);
                }
            }

            return overall;
        }
        catch(error){
            console.log(error);
        }
    }
    function validateCondition(conditionArray){
        let result = false;
        //console.log(conditionArray);
        if(conditionArray[1] === "is" ){
            if(""+props.answers[props.questionLookup[conditionArray[0]]] === conditionArray[2].replace(/'/g, '')){
                result = true;
            }
        }
        
        if(conditionArray[1] === "isnot"){
            if(""+props.answers[props.questionLookup[conditionArray[0]]] !== conditionArray[2].replace(/'/g, '')){
                result = true;
            }
        }
    
        if(conditionArray[1] === "has" ){
            if(props.answers[props.questionLookup[conditionArray[0]]].indexOf(conditionArray[2].replace(/'/g, '')) !== -1){
                result = true;
            }
        }
    
        if(conditionArray[1] === "hasnot"){
            if(props.answers[props.questionLookup[conditionArray[0]]].indexOf(conditionArray[2].replace(/'/g, '')) === -1){
                result = true;
            }
        }

        return result;
    }
    
    const classes = useStyles();
    const asterisk = props.question.mandatory ? <div style={{color:'red'}}>*</div> : null;
    const chk = props.question.type === 'checkbox' ?  
                <Switch 
                    name={props.uid} 
                    onChange={onChange}  
                    color="primary" 
                    checked={props.answers[props.uid] !== "" && props.answers[props.uid]} /> 
                : null;

    if(typeof props.question.condition !== "undefined" &&  
            props.question.condition !== null 
            && props.question.condition !== ""
        )
    {
        if(!validateConditionGroup(props.question.condition)){
            return null;
        }
    }

    let options = null;
    if(props.question.type === 'textbox'){
        options = (
            <form className={classes.root}>
                    <TextField name={props.uid} onChange={onChange} value={props.answers[props.uid]} fullWidth/>
            </form>
        );
    }
    else if(props.question.type === 'textarea'){
        options = (
            <form className={classes.root}>
                    <TextField name={props.uid} multiline row={5} variant="outlined" onChange={onChange} 
                    value={props.answers[props.uid]} fullWidth/>
            </form>
        );
    }
    else if(props.question.type === 'select'){
        const hasOptions = typeof props.question.options !== "undefined" && props.question.options !== null;
        const hasConditionalOptions = typeof props.question.conditionaloptions !== "undefined" && props.question.conditionaloptions !== null;

        const vals = hasOptions ? props.question.options.map((option) => {
            return (<MenuItem value={option} key={option}>{option}</MenuItem>)
        }) : null;

        let conditionalVals = [];
        if(hasConditionalOptions){
            props.question.conditionaloptions.forEach((conditionaloption) => {
                if(validateConditionGroup(conditionaloption.condition)){
                    conditionalVals = conditionalVals.concat(conditionaloption.options.map((option) => {
                        return (<MenuItem value={option} key={option}>{option}</MenuItem>)
                    }));
                }
                
            });
        }

        options = (
            <form className={classes.root}>
                    <Select name={props.uid} autoWidth={false} onChange={onChange} value={props.answers[props.uid]}>
                        {vals}
                        {conditionalVals}
                    </Select>
            </form>
        );
    }
    else if(props.question.type === 'radio'){

        try{
        const vals = props.question.options.map((option) => {
            if(typeof option === 'string'){
                return (<FormControlLabel value={option} key={option} control={<Radio color="primary" />} label={option} />)
            }
            else if(typeof option === 'object'){
                return (<FormControlLabel value={option.value} key={option.key} control={<Radio color="primary" />} label={option.value} />)
            }
            else{
                return null;
            }
        });

        options = (
            <form className={classes.root}>
                    <RadioGroup  name={props.uid} onChange={onChange} value={props.answers[props.uid]}>
                        {vals}
                    </RadioGroup>
            </form>
        );
        }catch(eror){}
    }
    else if(props.question.type === 'multiselect'){
        const hasOptions = typeof props.question.options !== "undefined" && props.question.options !== null;
        const hasConditionalOptions = typeof props.question.conditionaloptions !== "undefined" && props.question.conditionaloptions !== null;

        const vals = hasOptions ? props.question.options.map((option) => {
            return (<FormControlLabel control=
                {
                    <Checkbox 
                    color="primary" 
                    value={option} 
                    name={option}
                    checked={props.answers[props.uid].indexOf(option) !== -1}
                    onChange={(e) => onMultiSelect(e, props.uid)} />
                } label={option} key={option} />)
        }): null;

        let conditionalVals = [];
        if(hasConditionalOptions){
            props.question.conditionaloptions.forEach((conditionaloption) => {
                //console.log("Conditon "+validateConditionGroup(conditionaloption.condition));
                if(validateConditionGroup(conditionaloption.condition)){
                    conditionalVals =  conditionalVals.concat(conditionaloption.options.map((option) => {
                        //console.log("checking option "+option);
                        return (
                            <FormControlLabel control={
                                <Checkbox 
                                color="primary" 
                                value={option} 
                                name={option}
                                checked={props.answers[props.uid].indexOf(option) !== -1}
                                onChange={(e) => onMultiSelect(e, props.uid)} />
                            } 
                            label={option} key={option} />
                        )
                    }));

                    //console.log(oppts.length);
                    //conditionalVals.concat(oppts);
                    //console.log(conditionalVals.length);

                }
                
            });
        }

        //console.log(conditionalVals.length);

        options = (
            <form className={classes.root}>
                    <FormGroup name={props.uid} color="primary">
                        {conditionalVals}
                        {vals}
                    </FormGroup>
            </form>
        );
    }
    else if(props.question.type === 'geolocation'){
        const val = typeof props.answers[props.uid] === 'undefined' || props.answers[props.uid] === null ||
                    props.answers[props.uid] === "" || props.answers[props.uid].length < 2 ? "" : 
                    "["+props.answers[props.uid][0]+", "+props.answers[props.uid][1]+"]"
        options = (
            <form className={classes.root}>
                     <div style={{padding: '10px'}}>{val}</div>
                     <Button variant="outlined" color="primary" startIcon={<DetectIcon/>}
                        onClick={() => getCurrentPosition(props.uid)} >
                        Detect
                    </Button>
            </form>
        );
    }

    else if(props.question.type === 'image'){
        options = (
            <form className={classes.root} >
            {!showcamera ?
                <Button variant="outlined" color="primary" startIcon={<CameraIcon/>} onClick={() => takePicture1()}>
                    Open Camera
                </Button>
            : null }

            <video id="video" width="64" height="48" autoPlay></video>

            <canvas id="canvas" width="64" height="48"></canvas>

            { showcamera ? 
            <div style={{width:'50%', display: 'flex', direction: 'row', justifyContent: 'space-between'}} >
                <Button variant="outlined" color="primary" startIcon={<SnapIcon/>} onClick={takePicture}>
                    Take a picture
                </Button>
                <Button variant="outlined" color="primary" onClick={turnoffCamera} padding="10px">
                    Cancel
                </Button>
            </div>
            : null}
               
            </form>
        );
    }
    else if(props.question.type === 'qrcode'){
        options = (
            <form className={classes.root}>
                <QrReader delay={300} onError={handleScanError} onScan={handleScan} style={{ width: '100%' }} />
                <p>{props.answers[props.uid]}</p>
            </form>
        );
    }
   
    return (
        <div className="question">
            <div className="question text" style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                {props.question.text}{asterisk}  {chk}
            </div>
            <div className="question help">
                {props.question.help}
            </div>
            <div className="question options">
                {options}
            </div>
        </div>
    )
}


