import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createStyles,withStyles,makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import DisplayResultContent from './DisplayResultContent.js';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '20px 16px',
  },
  table: {
    minWidth: 650,
  },
});

function ExamResult(props) {
  const { classes } = props;
  const [examResult, setExamResult] = React.useState([]);
  const [resultKey, setResultKey] = React.useState("");
  const [examResultLoaded, setExamResultLoaded] = React.useState(false);

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  React.useEffect(() => {
  })


  if(props.objectKey== null || props.objectKey == ''){
    return (
      <div>
        <p> </p>
      </div>
    );
  }
  else{
  if (!props.examResultLoaded){
    return (
      <div>
        <p> Please wait! Result is loading...</p>
        <CircularProgress disableShrink />
      </div>
    );
  }
  if (props.examResultLoaded){
  return (
    <div>
      <Divider />
      <DisplayResultContent startNewExam = {true} questionList = {props.questionList} questionAnswer = {props.questionAnswer}/>
    </div>
  );
}}
}
export default withStyles(styles)(ExamResult);
