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
  return(
    <div>
    <div>Total Questions : {props.sendData}</div>
    <FormControl className={classes.formControl} noValidate autoComplete="off">
      <TextField
      id="outlined-basic"
      style={{width:500}}
      label="Enter question"
      variant="outlined" />
    </FormControl>
    </div>
  )
}

export default ManagedQuestionAdd;
