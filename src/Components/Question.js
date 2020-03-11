import React, { useContext , useRef } from "react"
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import DetectIcon from '@material-ui/icons/MyLocation';
import CameraIcon from '@material-ui/icons/CameraAlt';
import { Plugins, CameraSource, CameraDirection, CameraResultType} from '@capacitor/core';
import QrReader from 'react-qr-reader';
import { WasmDecoder } from "@impactdk/barcode-scanner";
import { ReactBarcodeScanner } from "@impactdk/react-barcode-scanner";
import UserContext from "./UserContext";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const { Camera } = Plugins;
const { Geolocation } = Plugins;

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      textAlign: 'center',
      fontFamily: 'Noto Serif SC',
      fontSize: 'small',
      flexGrow: 1,
      border: '1px solid'
    },
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


let multiSelectValues = {};

export default function Question(props){

    const { current: decoder } = useRef(WasmDecoder.getInstance("/wasmassets"));
    //const [lang, setLang] = useState('_en');
    const user = useContext(UserContext)
    const lang = user.lang;
    console.log(user)
    const [state, setState] = React.useState({
            rowcount : 1,
            colcount : 1,
            textAlign: 'center',
            addRows : false
    })

    async function getCurrentPosition(qid) {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current', coordinates);

        props.store(qid, [coordinates.coords.latitude, coordinates.coords.longitude]);
    }

    async function takePicture(qid) {
        const image = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl, direction: CameraDirection.Rear, source: CameraSource.Camera,
        });
        console.log(image);
        props.store(qid, image)
    }

    function handleBarcode(qid, barcode) {
        props.answers[qid] = barcode;
    }

    function getTimestamp(qid) {
        props.answers[qid] = new Date().toUTCString();
    }

    function getUniqueNumber(qid) {
        props.answers[qid] = Math.floor(Math.random() * 100000);
    }

    function getUserId(qid) {
        props.answers[qid] = state.user.username;
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

    const [showcamera] = React.useState(false);

    function handleScan(data) {
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

    function addCount(){
        setState({...state, rowcount : state.rowcount+1})
    }

    function saveGrid(id, value){
        const rowid = id.substring(id.indexOf('_row')+4, id.indexOf('_col'))
        const colid = id.substring(id.indexOf('_col')+4)
        let currentVal = props.answers[props.uid];
        if(currentVal === undefined || currentVal === null || currentVal === '')
        {
          currentVal = [];
        }
        if(currentVal[rowid] === undefined || currentVal[rowid] === null || currentVal[rowid] === '')
        {
          currentVal[rowid] = [];
        }
        currentVal[rowid][colid] = value;
        console.log(rowid, colid, currentVal[rowid][colid], currentVal);
        props.store(props.uid, currentVal)
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
        const langOptions = typeof props.question["options"+lang] !== "undefined" && props.question["options"+lang] !== null;

        const vals = hasOptions ? (langOptions? props.question["options"+lang] : props.question.options).map((option) => {
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
          const langOptions = typeof props.question["options"+lang] !== "undefined" && props.question["options"+lang] !== null;

          const vals = (langOptions? props.question["options"+lang] : props.question.options).map((option) => {
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
        const langOptions = typeof props.question["options"+lang] !== "undefined" && props.question["options"+lang] !== null;

        const vals = hasOptions ? (langOptions? props.question["options"+lang] : props.question.options).map((option) => {
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
                <Button variant="outlined" color="primary" startIcon={<CameraIcon/>} onClick={() => takePicture(props.uid)}>
                    Open Camera
                </Button>
            : null }

            <img id="camera image" src={props.answers[props.uid].dataUrl} alt="" width="20%" height="20%" style={{padding: '5px', width: '20%', height: '20%', objectFit:'cover'}} />

            </form>
        );
    }
    else if(props.question.type === 'qrcode'){
        options = (
            <form className={classes.root}>
                <QrReader onError={handleScanError} onScan={handleScan} style={{ width: '100%' }} />
                <p>{props.answers[props.uid]}</p>
            </form>
        );
    }
    else if(props.question.type === 'barcode'){
        options = (
            <form className={classes.root}>

               <ReactBarcodeScanner decoder={decoder} onFindBarcode={handleBarcode} />

            </form>
        );
    }
    else if(props.question.type === 'grid'){

      if(state.rowcount === undefined && props.question.rows.count !== undefined)
      {
           setState({...state, rowcount : props.question.rows.count})
      }

      const colheader = props.question.cols.map((col) => {
          return (
              <StyledTableCell>
                  <div className={classes.paper}>{col.text}</div>
              </StyledTableCell>
          )
      })

      const coldata = (rowid) => {
        return props.question.cols.map((col,j) => {
          const key = props.uid+'_row'+rowid+'_col'+j;

          return (
              <StyledTableCell>

              <Question
                uid={key}
                id={key}
                key={key}
                question={col}
                subquestion={true}
                store={saveGrid}
                answers={props.answers}
                questionLookup={[]}
              />

              </StyledTableCell>
          )
        })
     };

      const rowdata = props.question.rows.count === undefined ? props.question.rows.map((row, i) => {

          return (
              <StyledTableRow nowrap={true} style={{width:'100%'}}>
                <StyledTableCell style={{marginLeft:'0px', paddingLeft:'0px'}}>
                    <div className={classes.paper}>{row.text}</div>
                </StyledTableCell>

                {coldata(i)}
              </StyledTableRow>
          )
      }): Array.from(Array(state.rowcount).keys()).map((i) => {

          return (
              <StyledTableRow>
                <StyledTableCell style={{marginLeft:'0px', paddingLeft:'0px'}}>
                    <div className={classes.paper}>{i+1}</div>
                </StyledTableCell>

                {coldata(i)}

              </StyledTableRow>
          )
      });

      options = (
            <form className={classes.root}>

               <TableContainer component={Paper}>
               <Table className={classes.table} aria-label="customized table">
               <TableHead>
               <TableRow>
                      <StyledTableCell debug> </StyledTableCell>
                      {colheader}
               </TableRow>
               </TableHead>
               <TableBody>
                   {rowdata}

               </TableBody>
               </Table>
               </TableContainer>
               { (props.question.rows.addmore !== 'undefined' && props.question.rows.addmore) ?
               <Button variant="outlined" color="primary" onClick={() => addCount()}>
                   Add Row
               </Button>
               : null
               }

            </form>
        );

    }
    else if(props.question.type === 'hidden'){

        if (props.question.value === 'geolocation')
        {
            getCurrentPosition(props.uid)
        }
        else if (props.question.value === 'timestamp')
        {
            getTimestamp(props.uid)
        }
        else if (props.question.value === 'uniquenumber')
        {
            getUniqueNumber(props.uid)
        }
        else if (props.question.value === 'userid')
        {
            getUserId(props.uid)
        }
        options = (
            <form>
               <input type="hidden" value={props.answers[props.uid]}/>
            </form>
        );
    }

    return (
        <div className="question" style={props.question.type === 'hidden' ? { display:'none'}: {}}>
            <div className="question text" style={props.subquestion !== undefined ? { display:'none'}: {display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                {props.question[`text${lang}`]?props.question[`text${lang}`]:props.question.text}{asterisk}  {chk}
            </div>
            <div className="question help" style={props.subquestion !== undefined ? { display:'none'}: {}}>
                {props.question[`help${lang}`]?props.question[`help${lang}`]:props.question.help}
            </div>
            <div className="question options">
                {options}
            </div>
        </div>
    )
}
