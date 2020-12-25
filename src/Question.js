import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const questionList = [
  {
    id: 'Q1',
    class:'Class 1',
    subject:'Mathmatics',
    board:'WBBSE',
    question:'Please  find the correct answer 10 + 2 = ? ',
    options: [
      {
        id: '1',
        option: '12',
        correct: 'Y',
      },
      {
        id: '2',
        option: '20',
        correct: 'N',
      },
    ],
  },
  {
    id: 'Q2',
    class:'Class 1',
    subject:'Mathmatics',
    board:'WBBSE',
    question:'Please  find the correct answer 10 + 5 = ? ',
    options: [
      {
        id: '1',
        option: '10',
        correct: 'N',
      },
      {
        id: '2',
        option: '15',
        correct: 'Y',
      }
    ],
  },
  {
    id: 'Q3',
    class:'Class 1',
    subject:'Mathmatics',
    board:'WBBSE',
    question:'Please  find the correct answer 25 + 5 = ? ',
    options: [
      {
        id: '1',
        option: '30',
        correct: 'Y',
      },
      {
        id: '2',
        option: '15',
        correct: 'N',
      }
    ],
  }
];


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

export default function Question() {
  const [progress, setProgress] = React.useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [questionAnswer,setQuestionAnswer] = React.useState(['']);

  const prevNextQuestion = (event, newValue) => {
      if (newValue === 'next') {
        if (questionIndex + 1 < questionList.length){
          setQuestionIndex(questionIndex + 1);
        }
      }
      if (newValue === 'previous') {
        if (questionIndex > 0){
          setQuestionIndex(questionIndex - 1);
        }
      }
      if (questionAnswer.length === questionIndex) {
        questionAnswer[questionIndex] = '';
      }

    };

  const selectAnswer = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
    questionAnswer[questionIndex] = event.target.value;
    setQuestionAnswer(questionAnswer);
    var answered = 0;
    for (var i = 0; i<questionAnswer.length ; i++){
      if (questionAnswer[i] !== ''){
        answered = answered + 1;
      }
    }
    setProgress((answered/questionList.length)*100);

  };

  const checkAnswer = (event) => {
    event.preventDefault();
    if (value === 'Y') {
      setHelperText('Correct!');
      setError(false);
    } else if (value === 'N') {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  return (
    <div className={classes.root}>
    <LinearProgressWithLabel value={progress} />

    <form onSubmit={checkAnswer}>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <FormLabel component="legend">{questionList[questionIndex].question}</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={questionAnswer[questionIndex]} onChange={selectAnswer}>
          <FormControlLabel value={questionList[questionIndex].options[0].correct} control={<Radio />} label={questionList[questionIndex].options[0].option} />
          <FormControlLabel value={questionList[questionIndex].options[1].correct} control={<Radio />} label={questionList[questionIndex].options[1].option} />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Check Answer
        </Button>
      </FormControl>
    </form>
      <BottomNavigation value={value} onChange={prevNextQuestion} className={classes.root}>
        <BottomNavigationAction label="Previous" value="previous" icon={<ArrowBackIosIcon />}/>
        <BottomNavigationAction label="Next" value="next" icon={<ArrowForwardIosIcon />} />
      </BottomNavigation>

    </div>

  );
}
