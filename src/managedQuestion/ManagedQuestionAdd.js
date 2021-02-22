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

  const getValue = (event)=>{
    setInputValue(event.target.value);
  }
  const getOption = (event)=>{
    setOptionsvalue(event.target.value);
  }

  const createQuestion = ()=>{
    const createQuestionset = {
      id:Date.now(),
      question:inputValue,
      option:optionsValue
    }
   setQuestionvalue(createQuestionset);
   console.log(questionValue);
  }
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
      onChange={getValue}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
    <Button variant="contained" color="primary" onClick={()=>{setTextfieldshow(true)}}>Add Options</Button>
    { textfiledshow && <TextField
    id="question"
    style={{width:500}}
    label="Enter Options"
    variant="outlined"
    value={optionsValue}
    onChange={getOption}
    />
    }
    </FormControl>


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
