import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import QuestionHeader from '../QuestionHeader.js';
import Question from '../Question.js';

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


function Content(props) {
  const { classes } = props;
  const [questionHeaderPopulated, setQuestionHeaderPopulated] = React.useState(false);
  const [questionSet, setQuestionSet] = React.useState(false);

  const populateQuestion =  (changedValue,questionSet) => {
     setQuestionHeaderPopulated(changedValue);
     setQuestionSet(questionSet);
  }
  if(!props.headerPopulated) {
return (
  <Paper className={classes.paper}>
  </Paper>

)
  }
  else{
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
            <QuestionHeader onQuestionSetSelected = {populateQuestion} selectedBoard = {props.selectedBoard} selectedClass = {props.selectedClass}/>
            </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="center">
             <Question questionSet = {questionSet}/>
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
            <QuestionHeader  onQuestionSetSelected = {populateQuestion} selectedBoard = {props.selectedBoard} selectedClass = {props.selectedClass}/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

    </Paper>

  );
}
}
}
Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
