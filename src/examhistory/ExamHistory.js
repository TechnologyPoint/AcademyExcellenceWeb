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
  React.useEffect(() => {
  (async () => {
    if(examHistory != null && examHistory.length === 0){
    const response = await fetch("https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/GetExamResultHistory?user=" + props.loggedInUser );
    await sleep(1e3);
    const examHistoryData = await response.json();
    console.log(props.loggedInUser);
    console.log(examHistoryData);
    setExamHistoryChecked(true);
    if (examHistoryData.length > 0){
      setExamHistory(examHistoryData);

    }
  }})();
  }, [examResultLoaded]);

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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Board</StyledTableCell>
            <StyledTableCell align="right">Subject</StyledTableCell>
            <StyledTableCell align="right">Chapter</StyledTableCell>
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
              <StyledTableCell align="right">{row.examDate}</StyledTableCell>
              <StyledTableCell align="right">{row.percentage}</StyledTableCell>
              <StyledTableCell align="right">
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                  >
                    Result
                </Link>
                </StyledTableCell>
            </StyledTableRow >
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}
export default withStyles(styles)(ExamHistory);
