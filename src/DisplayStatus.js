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

  const displayConfirmation = () => {
      setOpenConfirmation(true);
    };

    const closeConfirmation = () => {
      setOpenConfirmation(false);
    };


  const confirmExamSubmission = () =>{
     setCompletedExam(true);
  }

  function createData(name, count) {
    return { name, count };
  }

  const rows = [
    createData('Total Question', props.questionList.length),
    createData('Question Answered',props.questionList.length),
    createData('Question Skipped', props.questionList.length),
    createData('Correct Answer', props.questionList.length),
    createData('Wrong Answer', 0),
    createData("Grade", 'Pass')
  ];

  React.useEffect(() => {
  },[])
if(completedExam){
  return (
    <div className={classes.root}>

    <hr/>
      <Typography gutterBottom variant="body1">
          <b>Result</b>
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
   </div>
 );
}
if ((props.currentIndex + 1== props.questionList.length) && !completedExam ) {
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
