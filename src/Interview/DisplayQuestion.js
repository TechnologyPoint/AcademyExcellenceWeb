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

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function QuestionHeader(props) {
  const [questons , setQuestions] = React.useState([]);
  const options = ['React Js', 'Java', 'Aws','Javascript','J2ee','Spring','Jquery'];

  React.useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(res => setQuestions(res))
  })



  return (
    <>
    <div className="manual_class">Display {props.displayData} Question and Answer</div>
    {questons.map(ques =>(
      <div className="manual_question" key={ques.id}> {ques.name} </div>
    ))}
    </>
  );
}
