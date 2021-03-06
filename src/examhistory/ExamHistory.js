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
  const [examResult, setExamResult] = React.useState([]);
  const [resultKey, setResultKey] = React.useState("");
  const [examResultContentLoaded, setExamResultContentLoaded] = React.useState(false);

  const examResultLoaded = examHistory.length === 0;

  const columns: ColDef[] = [
    { field: 'board', headerName: 'Board', width: 150, headerClassName: 'resultHeader'},
    { field: 'subject', headerName: 'Subject' , width: 200,  headerClassName: 'resultHeader'},
    { field: 'chapter', headerName: 'Chapter' , width: 200,  headerClassName: 'resultHeader'},
    { field: 'questionSet', headerName: 'Question Set', width: 175,  headerClassName: 'resultHeader'},
    { field: 'examDate',  headerName: 'Exam Date', width: 200,  headerClassName: 'resultHeader'},
    { field: 'percentage',  headerName: 'Percentage', width: 150,  headerClassName: 'resultHeader'},
    { field: 'objectKey',  headerName: 'View Result', width: 150, sortable: false,filterable: false, headerClassName: 'resultHeader',
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
   console.log(resultKey);
   setObjectKey(resultKey);
   setExamResultContentLoaded(false);
   setExamResult([]);
   (async () => {
   const response = await fetch("https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/getExamHistoryContent?objectKey=" + resultKey );
   await sleep(1e3);
   const examResultData = await response.json();
   console.log(examResultData);
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
    <div style={{ height: '70%', width: '100%' }} className={styleClasses.root}>
    <p> Please scroll right and left to check full details</p>
    <DataGrid rows={examHistory} density ="compact" columns={columns} pageSize={4}  components={{
        Toolbar: GridToolbar,
    }} />
    <ExamResult objectKey ={objectKey} examResultLoaded = {examResultContentLoaded} startNewExam = {true} questionList = {examResult.questionList} questionAnswer = {examResult.questionAnswer}/>
    </div>
  );
}
}
export default withStyles(styles)(ExamHistory);
