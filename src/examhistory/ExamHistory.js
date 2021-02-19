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
import { DataGrid, GridToolbar ,ColDef } from '@material-ui/data-grid';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    '& .resultHeader': {
      backgroundColor: 'gray',
      fontWeight: 'strong',

    }
  }
});


const rows: RowsProp = [
  { "id":"1","objectKey":"sujit.tah@gmail.com/15-02-2021/15-02-2021 17:58:17","user":"sujit.tah@gmail.com","examDate":"15-02-2021","board":"WBBSE","percentage":"58.33","questionSet":"","subject":"Computer","chapter":"Data Storage" }
];

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
  resultHeader:{
    backgroundColor: 'rgba(255, 7, 0, 0.55)',
  }
});



function ExamHistory(props) {
  const { classes } = props;
  const styleClasses = useStyles();

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

  const columns: ColDef[] = [
    { field: 'board', headerName: 'Board', flex: 0.75, headerClassName: 'resultHeader',
    headerAlign: 'center'},
    { field: 'subject', headerName: 'Subject' , flex: 1.2,  headerClassName: 'resultHeader',
    headerAlign: 'center'},
    { field: 'chapter', headerName: 'Chapter' , flex: 1.5,  headerClassName: 'resultHeader',
    headerAlign: 'center'},
    { field: 'questionSet', headerName: 'Question Set', flex: 1.5,  headerClassName: 'resultHeader',
    headerAlign: 'center'},
    { field: 'examDate',  headerName: 'Exam Date', flex: 1,  headerClassName: 'resultHeader',
    headerAlign: 'center'},
    { field: 'percentage',  headerName: 'Percentage', flex: 1,  headerClassName: 'resultHeader',
    headerAlign: 'center'},
    { field: 'objectKey',  headerName: 'View Result', flex: 1, sortable: false,filterable: false, headerClassName: 'resultHeader',
    headerAlign: 'center',
      renderCell: (params: CellParams) => (
          <strong>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => {fetchExamResult(params.value) }}
            >
              Result
            </Button>
          </strong>
        ),
    }

  ];

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
    console.log(props.loggedInUser);
    console.log(examHistoryData);
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
    <div style={{ height: '70%', width: '100%' }} className={styleClasses.root}>
    <DataGrid rows={examHistory} columns={columns} pageSize={4} components={{
        Toolbar: GridToolbar,
    }} />
    <ExamResult objectKey ={objectKey} examResultLoaded = {examResultContentLoaded} startNewExam = {true} questionList = {examResult.questionList} questionAnswer = {examResult.questionAnswer}/>
    </div>
  );
}
}
export default withStyles(styles)(ExamHistory);
