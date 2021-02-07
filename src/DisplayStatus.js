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
import Typography from '@material-ui/core/Typography';



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
  const classes = useStyles();
  const [completedExam, setCompletedExam] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [answeredQuestion, setAnsweredQuestion] = React.useState(0);
  const [correctAnswer, setCorrectAnswer] = React.useState(0);
  const [wrongAnswer, setWrongAnswer] = React.useState(0);
  const [skipAnswer, setSkipAnswer] = React.useState(0);
  const [grade, setGrade] = React.useState("");

  const startNewExam = () => {
    props.startNewExam();
  }

  const displayConfirmation = () => {
      setOpenConfirmation(true);
    };

    const closeConfirmation = () => {
      setOpenConfirmation(false);
    };


  const confirmExamSubmission = () =>{
     setCompletedExam(true);
     props.setExamStatus(true);
     var crctAnswer = 0;
     var totalAnsweredQuestion = 0;
     var wrngAnswer = 0;
     var skippedAnswer = 0;
     for(var k in props.questionAnswer) {
       if(props.questionAnswer[k] != null && props.questionAnswer[k].startsWith("Y")) {
         crctAnswer = crctAnswer + 1;
         totalAnsweredQuestion = totalAnsweredQuestion +1;
        }
       if(props.questionAnswer[k] != null && props.questionAnswer[k].startsWith("N")){
         wrngAnswer = wrngAnswer + 1;
         totalAnsweredQuestion = totalAnsweredQuestion +1;
       }
       if(props.questionAnswer[k] === ''){
         skippedAnswer = skippedAnswer + 1;
       }
     }
     setCorrectAnswer(crctAnswer);
     setWrongAnswer(wrngAnswer);
     setAnsweredQuestion(totalAnsweredQuestion);
     setSkipAnswer(skippedAnswer);
     if (((crctAnswer/props.questionList.length)*100) > 90){
       setGrade("Pass. Excellent!!!");
     }if (((crctAnswer/props.questionList.length)*100) > 80){
       setGrade("Pass.Very Good!!!");
     }if (((crctAnswer/props.questionList.length)*100) > 80){
       setGrade("Pass.Good!!!");
     }else {
       setGrade("Fail");
     }
       fetch('https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/submitExamResult/', {
       method: 'POST',
       headers: {
       Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
       body: JSON.stringify({
         user:props.loggedInUser,
         board:props.boardHeaderName,
         subject:props.subject,
         chapter:props.chapter,
         questionList:props.questionList,
         questionAnswer:props.questionAnswer
       })
     });
    }

  function createData(name, count) {
    return { name, count };
  }

  const rows = [
    createData('Total Question', props.questionList.length),
    createData('Question Answered',answeredQuestion),
    createData('Question Skipped', skipAnswer),
    createData('Correct Answer', correctAnswer),
    createData('Wrong Answer', wrongAnswer),
    createData("Grade", grade)
  ];

  React.useEffect(() => {
  },[])
if(completedExam){
  return (
    <div className={classes.root}>

    <hr/>
      <Typography gutterBottom variant="body1">
          <b>Result</b>

            <p>Please click on "Previous" and "Next" to check the answers</p>

        </Typography>
   <TableContainer component={Paper}>
     <Table className={classes.table} size="small" aria-label="a dense table">
       <TableHead>
       </TableHead>
       <TableBody>
         {rows.map((row) => (
           <TableRow key={row.name}>
             <TableCell component="th" scope="row">
               {row.name}
             </TableCell>
             <TableCell align="right">{row.count}</TableCell>
            </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
   <form>
        <p>Please click on "Previous" and "Next" to check the answers</p>
     <Button variant="outlined" color="primary" className={classes.button} onClick={startNewExam}>Start New Test</Button>
   </form>
   </div>
 );
}
if ((props.currentIndex + 1=== props.questionList.length) && !completedExam ) {
return (
    <div className={classes.root}>
    <form>
      <Button variant="outlined" color="primary" className={classes.button} onClick={displayConfirmation}>Finish Exam</Button>
    </form>
    <Dialog
        open={openConfirmation}
        onClose={closeConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation - Submission"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ary you to submit the examination? You will not be able to edit the answer after submisstion.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmExamSubmission} color="primary">
            Confirm
          </Button>
          <Button onClick={closeConfirmation} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}else{
  return(
  <div className={classes.root}></div>
)
}

}
