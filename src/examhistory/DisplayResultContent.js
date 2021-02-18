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
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';


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


export default function Question(props) {
  const [progress, setProgress] = React.useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [questionAnswer,setQuestionAnswer] = React.useState(props.questionAnswer);
  const [questionDetails, setQuestionDetails] = React.useState(props.questionList);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [examCompleted,setExamCompleted] = React.useState(false);
  const [add, setAdd] = React.useState('');
  const [answerImage,setAnswerImage] = React.useState("");

  const populateExamCompleteStatus =  (examStatus) => {
     setExamCompleted(examStatus);
     showAnswerStatus(questionAnswer[questionIndex]);
  }
  const startNewExam = () => {
    props.startNewExam();
  }

React.useEffect(() => {
  if(answerImage == null || answerImage == ""){
    showAnswerStatus(questionAnswer[questionIndex]);
  }
})


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
      }
      showAnswerStatus(questionAnswer[curIndex]);

    };

  const showAnswerStatus = (value) => {
    setAnswerImage("");
      if (value != null && value.startsWith("Y")) {
        setHelperText('Correct.');
        setAnswerImage("/static/image/checked.jpg");
        setError(false);
        setAdd(classes.activeClass);
      } else if (value != null && value.startsWith("N")) {
        setHelperText('Wrong.');
        setAnswerImage("/static/image/incorrect.jpg");
        setError(true);
      } else {
        setAnswerImage("/static/image/incorrect.jpg");
        setHelperText('Skipped.');
        setError(true);
      }
   };

  if (!isLoaded) {
       return <div>Loading...</div>;
     } else {
    return (
    <div className={classes.root}>
    <form>
    <p>Total Question:{questionDetails.length}</p>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <FormLabel component="legend">Q{questionIndex + 1}. {questionDetails[questionIndex].question}</FormLabel>
        <RadioGroup  aria-label="quiz" name="quiz" value={questionAnswer[questionIndex]}>
        {questionDetails[questionIndex].options.map(({ id, correct,option }) => (
        <React.Fragment key={id}>
          <FormControlLabel value={correct + id} control={<Radio disabled = {true}/>} label={option} />
          </React.Fragment>
        ))}
        </RadioGroup>
          <Avatar variant = "circle" src={answerImage} alt="Correct" >{helperText} </Avatar>
      </FormControl>

    <BottomNavigation value={value} onChange={prevNextQuestion} className={classes.root} showLabels>
        <BottomNavigationAction label="Previous" value="previous" icon={<ArrowBackIosIcon />}/>
        <BottomNavigationAction label="Next" value="next" icon={<ArrowForwardIosIcon />} />
      </BottomNavigation>
          </form>
    </div>
  );
}
}
