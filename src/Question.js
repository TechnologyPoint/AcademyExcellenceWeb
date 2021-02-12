import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DisplayStatus from './DisplayStatus.js';
import DisplayTimer from './DisplayTimer.js';


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
  activeClass:{
    color:'green',
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function Question(props) {
  const [progress, setProgress] = React.useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [questionAnswer,setQuestionAnswer] = React.useState(['']);
  const [questionDetails, setQuestionDetails] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [examCompleted,setExamCompleted] = React.useState(false);
  const [add, setAdd] = React.useState('');

  const totalTime = (questionDetails.length) * 3;
  console.log(props.questionSet);
  console.log(questionDetails.length);
  console.log(questionAnswer.length);
  console.log(questionIndex);
  console.log(questionAnswer);
  console.log(questionAnswer[questionIndex]);
  console.log(questionDetails[questionIndex]);


  const populateExamCompleteStatus =  (examStatus) => {
     setExamCompleted(examStatus);
     showAnswerStatus(questionAnswer[questionIndex]);
  }
  const startNewExam = () => {
    props.startNewExam();
  }

React.useEffect(() => {
  fetch("https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/getQuestionSet?questionSet=" + props.questionSet)
    .then(res => res.json())
    .then(
      (result) => {
        setQuestionDetails(result.questionList);
        setIsLoaded(true);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(false);
        alert(error);
        alert("https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/getQuestionSet?questionSet=" + props.questionSet);
      }
    )
},[])


  const prevNextQuestion = (event, newValue) => {
    var curIndex = questionIndex;
      if (newValue === 'next') {
        if (questionIndex + 1 < questionDetails.length){
          setQuestionIndex(questionIndex + 1);
          curIndex = questionIndex + 1;
        }
      }
      if (newValue === 'previous') {
        if (questionIndex > 0){
          setQuestionIndex(questionIndex - 1);
          curIndex = questionIndex - 1;
        }
      }
      if (questionAnswer.length === questionIndex) {
        questionAnswer[questionIndex] = '';
        alert("ok");
      }
      if(examCompleted){
      showAnswerStatus(questionAnswer[curIndex]);
    }
    };

  const selectAnswer = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
    questionAnswer[questionIndex] = event.target.value;
    setQuestionAnswer(questionAnswer)
    var answered = 0;
    for (var i = 0; i<questionAnswer.length ; i++){
      if (questionAnswer[i] !== ''){
        answered = answered + 1;
      }
    }
    setProgress((answered/questionDetails.length)*100);

  };

  const showAnswerStatus = (value) => {
      if (value != null && value.startsWith("Y")) {
        setHelperText('Correct!');
        setError(false);
        setAdd(classes.activeClass);
      } else if (value != null && value.startsWith("N")) {
        setHelperText('Sorry, wrong answer!');
        setError(true);
      } else {
        setHelperText('Please select an option.');
        setError(true);
      }
   };

  if (!isLoaded) {
       return <div>Loading...</div>;
     } else {
    return (
    <div className={classes.root}>
    <DisplayTimer totalTime={totalTime} totalQuestion = {questionDetails.length}/>
    <LinearProgressWithLabel value={progress} />
    <form>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <FormLabel component="legend">Q{questionIndex + 1}. {questionDetails[questionIndex].question}</FormLabel>
        <RadioGroup  aria-label="quiz" name="quiz" value={questionAnswer[questionIndex]} onChange={selectAnswer}>
        {questionDetails[questionIndex].options.map(({ id, correct,option }) => (
        <React.Fragment key={id}>
          <FormControlLabel value={correct + id} control={<Radio disabled = {examCompleted}/>} label={option} />
          </React.Fragment>
        ))}
        </RadioGroup>
        <FormHelperText className={add}>{helperText}</FormHelperText>
        <DisplayStatus subject = {props.subject} chapter = {props.chapter} boardHeaderName={props.selectedBoard} loggedInUser = {props.loggedInUser} startNewExam = {startNewExam} questionList = {questionDetails} currentIndex = {questionIndex} questionAnswer = {questionAnswer} setExamStatus = {populateExamCompleteStatus}/>
      </FormControl>

    </form>
    <BottomNavigation value={value} onChange={prevNextQuestion} className={classes.root} showLabels>
        <BottomNavigationAction label="Previous" value="previous" icon={<ArrowBackIosIcon />}/>
        <BottomNavigationAction label="Next" value="next" icon={<ArrowForwardIosIcon />} />
      </BottomNavigation>
    </div>
  );
}
}
