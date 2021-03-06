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
import ExamResult from './ExamResult';
import Button from '@material-ui/core/Button';


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

function ExamHistory(props) {
  const { classes } = props;
  const [examHistory, setExamHistory] = React.useState([]);
  const [examHistoryChecked, setExamHistoryChecked] = React.useState(false);
  const [objectKey, setObjectKey] = React.useState("");
  const [examResult1, setExamResult1] = React.useState(
    {"user":"sujit.tah@gmail.com","board":"WBBSE","subject":"Mathmatics","chapter":"Addition","questionList":[{"id":"1","question":"You have 15 chocolates. Your father has given 20 more chocolates. How many total chocolates you will have?","options":[{"id":"1","option":"35","correct":"Y"},{"id":"2","option":"36","correct":"N"}]},{"id":"2","question":"You have 16 balls and your sister has given another 12 balls. How many total balls you will have ?","options":[{"id":"1","option":"27","correct":"N"},{"id":"2","option":"28","correct":"Y"}]},{"id":"3","question":"You have 10 flowers. Your sister has taken 8 flowers from you. Your brother has given 12 flowers more. How many total flowers you will have?","options":[{"id":"1","option":"15","correct":"N"},{"id":"2","option":"14","correct":"Y"}]},{"id":"4","question":"You have 5 bats. Your father has given another 4 bats to you. How many total bats you will have?","options":[{"id":"1","option":"9","correct":"Y"},{"id":"2","option":"8","correct":"N"}]},{"id":"5","question":"You have 25 flowers. Your sister has taken 18 flowers from you. Your brother has given 12 flowers more. How many total flowers you will have?","options":[{"id":"1","option":"19","correct":"Y"},{"id":"2","option":"18","correct":"N"}]},{"id":"6","question":"You have 35 chocolates. Your father has given 20 more chocolates. How many total chocolates you will have?","options":[{"id":"1","option":"54","correct":"N"},{"id":"2","option":"55","correct":"Y"}]},{"id":"7","question":"You have 25 flowers. Your sister has given 18 flowers to you. Your brother has given 12 flowers more. How many total flowers you will have?","options":[{"id":"1","option":"54","correct":"N"},{"id":"2","option":"55","correct":"Y"}]},{"id":"8","question":"You have 50 flowers. Your sister has given 20 flowers to you. Your brother has given 30 flowers more. How many total flowers you will have?","options":[{"id":"1","option":"90","correct":"N"},{"id":"2","option":"100","correct":"Y"}]},{"id":"9","question":"You have 50 flowers. Your sister has given 20 flowers to you. Your brother has taken 30 flowers from you. How many total flowers you will have?","options":[{"id":"1","option":"45","correct":"N"},{"id":"2","option":"40","correct":"Y"}]},{"id":"10","question":"You have 50 flowers. Your sister has given 20 flowers to you. Your brother has taken 20 flowers from you. How many total flowers you will have?","options":[{"id":"1","option":"50","correct":"Y"},{"id":"2","option":"40","correct":"N"}]},{"id":"11","question":"You have 50 flowers. Your sister has given 20 flowers to you. Your brother has taken 50 flowers from you. How many total flowers you will have?","options":[{"id":"1","option":"20","correct":"Y"},{"id":"2","option":"30","correct":"N"}]},{"id":"12","question":"You have 100 flowers. Your sister has given 20 flowers to you. Your brother has taken 50 flowers from you. How many total flowers you will have?","options":[{"id":"1","option":"60","correct":"N"},{"id":"2","option":"70","correct":"Y"}]}]}
  );
  const [examResult, setExamResult] = React.useState([]);
  const [resultKey, setResultKey] = React.useState("");
  const [examResultContentLoaded, setExamResultContentLoaded] = React.useState(false);

  const examResultLoaded = examHistory.length === 0;

  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }),
  )(TableCell);

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }),
  )(TableRow);

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

 const examHistoryNeedToCheck = (needToCheck)=> {
   setExamHistoryChecked(needToCheck)
 }

 const fetchExamResult = (resultKey) => {
   alert("here i am");
   setObjectKey(resultKey);
   setExamResultContentLoaded(false);
   setExamResult([]);
   (async () => {
   const response = await fetch("https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/getExamHistoryContent?objectKey=" + resultKey );
   await sleep(1e3);
   const examResultData = await response.json();
   setExamResult(examResultData);
   setExamResultContentLoaded(true);
 })();
 }

  React.useEffect(() => {
  (async () => {
    if(examHistory != null && examHistory.length === 0){
    const response = await fetch("https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/GetExamResultHistory?user=" + props.loggedInUser );
    await sleep(1e3);
    const examHistoryData = await response.json();
    setExamHistoryChecked(true);
    if (examHistoryData.length > 0){
      setExamHistory(examHistoryData);

    }
  }})();
  }, [examResultLoaded]);

  const preventDefault = (key) => {
    setObjectKey(key)
   }
  if (examHistoryChecked  && examHistory.length === 0){
    return (
      <div>
        <p> You have not appeared any knowlendege test till now!</p>
      </div>
    )
  }
  if (!examHistoryChecked){
    return (
      <div>
        <p> Please wait! Result is loading...</p>
        <CircularProgress disableShrink />
      </div>
    );
  }
  if (examHistory.length > 0){
  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Board</StyledTableCell>
            <StyledTableCell align="right">Subject</StyledTableCell>
            <StyledTableCell align="right">Chapter</StyledTableCell>
            <StyledTableCell align="right">Question Set</StyledTableCell>
            <StyledTableCell align="right">Exam Date</StyledTableCell>
            <StyledTableCell align="right">Percentage</StyledTableCell>
            <StyledTableCell align="right">View Result</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {examHistory.map((row) => (
            <StyledTableRow  key={row.board}>
              <StyledTableCell component="th" scope="row">
                {row.board}
              </StyledTableCell>
              <StyledTableCell align="right">{row.subject}</StyledTableCell>
              <StyledTableCell align="right">{row.chapter}</StyledTableCell>
              <StyledTableCell align="right">{row.questionSet}</StyledTableCell>
              <StyledTableCell align="right">{row.examDate}</StyledTableCell>
              <StyledTableCell align="right">{row.percentage}</StyledTableCell>
              <StyledTableCell align="right">
              <Button onClick={() => {fetchExamResult(row.objectKey) }}>Answer Sheet</Button>
                  </StyledTableCell>
            </StyledTableRow >
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ExamResult objectKey ={objectKey} examResultLoaded = {examResultContentLoaded} startNewExam = {true} questionList = {examResult.questionList} questionAnswer = {examResult.questionAnswer}/>
    </div>
  );
}
}
export default withStyles(styles)(ExamHistory);
