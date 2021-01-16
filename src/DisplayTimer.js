import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import './App.css';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  root: {
    width: '100%',
  },
  section2: {
    margin: theme.spacing(2),
  }
}));

export default function Question(props) {
  const [seconds, setSeconds] = React.useState(0)
  const [minutes, setMinutes] = React.useState(30)



  function updateTime() {
    if (minutes == 0 && seconds == 0) {
      alert("Please Complete The Exam.");
    }
    else {
      if (seconds == 0) {
        setMinutes(minutes => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds => seconds - 1);
      }
    }
  }



  React.useEffect(() => {
    // use set timeout and be confident because updateTime will cause rerender
    // rerender mean re call this effect => then it will be similar to how setinterval works
    // but with easy to understand logic
    const token = setTimeout(updateTime, 1000)

    return function cleanUp() {
      clearTimeout(token);
    }
  })


  return (<p className="timer">
Time: {minutes}:{seconds}
</p>);
}
