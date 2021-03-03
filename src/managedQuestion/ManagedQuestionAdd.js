import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropdown from 'react-dropdown';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    padding:'15px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



const ManagedQuestionAdd = (props) =>{
  const classes = useStyles();
  const [questionValue ,setQuestionvalue] = React.useState([]);
  const [inputValue , setInputValue] = React.useState("");
  const [textfiledshow , setTextfieldshow] = React.useState(false);
  const [optionsValue , setOptionsvalue] = React.useState("");
  const [optionArray , setOptionArray] = React.useState([]);



  const createQuestion = ()=>{
    setQuestionvalue([...questionValue,{
      id:questionValue.length,
      questions:inputValue,
      option:optionArray
    }])
    setInputValue("");
    setOptionArray([]);
  }


  const addOptions = ()=>{
    setOptionArray([...optionArray,{
      id:optionArray.length,
      options:optionsValue
    }])
    setOptionsvalue("");
  }

React.useEffect(()=>{
  if(questionValue.length > 0){
    console.log(questionValue);
  }
},[questionValue])




  return(
    <div>
    <div>Total Questions : {props.sendData}</div>
    <div>
    <FormControl className={classes.formControl} noValidate autoComplete="off">
      <TextField
      id="question"
      style={{width:500}}
      label="Enter question"
      variant="outlined"
      value={inputValue}
      onChange={(e)=>{setInputValue(e.target.value)}}/>
    </FormControl>
    <div>
<FormControl className={classes.formControl}>
    <TextField
    id="question"
    style={{width:500}}
    label="Enter Options"
    variant="outlined"
    value={optionsValue}
    onChange={(e)=>{setOptionsvalue(e.target.value)}}
    />
    </FormControl>
    <FormControl className={classes.formControl}>
    <Button variant="contained" color="primary" onClick={addOptions}>Add Options</Button>
    </FormControl>
     </div>
    </div>
    <div>
    <FormControl className={classes.formControl}>
    <Button variant="contained" color="primary" onClick={createQuestion}>click add</Button>
    </FormControl>
    </div>
    </div>
  )
}

export default ManagedQuestionAdd;
