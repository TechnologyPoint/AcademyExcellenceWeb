import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ManagedQuestionHeader from '../managedQuestion/ManagedQuestionHeader.js';
import ManagedQuestionAdd from '../managedQuestion/ManagedQuestionAdd.js';

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
    margin: '40px 16px',
  },
});


function ManagedQuestionContent(props) {
  const { classes } = props;
  const [questionHeaderPopulated, setQuestionHeaderPopulated] = React.useState(false);
  const [questionSet, setQuestionSet] = React.useState(false);
  const [retestStarted, setRetestStarted] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [chapter, setChapter] = React.useState("");
  const [getValue , setGetValue] = React.useState('');
  //console.log(props.boardHeaderName);


  const populateQuestion =  (changedValue,questionSet,subject,chapter,send) => {
     setQuestionHeaderPopulated(changedValue);
     setQuestionSet(questionSet);
     setRetestStarted(false);
     setSubject(subject);
     setChapter(chapter);
     setGetValue(send);
  }

  const startNewExam = () => {
    setQuestionHeaderPopulated(false);
    setRetestStarted(true);
  }

  if(questionHeaderPopulated){
  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
            <ManagedQuestionHeader sendData={props.inputValue} boardHeaderName={props.boardHeaderName} retestStarted = {retestStarted} onQuestionSetSelected = {populateQuestion} selectedBoard = {props.selectedBoard} selectedClass = {props.selectedClass} />
            </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="center">
          <ManagedQuestionAdd sendData={getValue}/>
          </Typography>
        </div>
    </Paper>
  );
}else {
  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
            <ManagedQuestionHeader boardHeaderName={props.boardHeaderName} retestStarted = {retestStarted}  onQuestionSetSelected = {populateQuestion} selectedBoard = {props.selectedBoard} selectedClass = {console.log(props.selectedClass)}/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

    </Paper>

  );
}
}

ManagedQuestionContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManagedQuestionContent);
