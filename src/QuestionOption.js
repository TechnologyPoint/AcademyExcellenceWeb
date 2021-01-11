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
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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


export default function QuestionOption(props) {
  const [progress, setProgress] = React.useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [questionAnswer,setQuestionAnswer] = React.useState(['Y','45']);
  const [valueBottomNavigation,setBottomNavigation] = React.useState('recents');

  const handleChangeBottomNavigation = (event, newValue) => {
      if (newValue == 'next') {
        setQuestionIndex(questionIndex + 1);
      }
      if (newValue == 'previous') {
        setQuestionIndex(questionIndex - 1);
      }
    };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    questionAnswer[props.questionIndex] = event.target.value;
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //alert(questionAnswer[1]);
    if (value == 'Y') {
      setHelperText('You got it!');
      setError(false);
    } else if (value == 'N') {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
    setProgress()
  };

  return (
    <div className={classes.root}>
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <FormLabel component="legend">{props.questionDtls.question}</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={questionAnswer[props.questionIndex]} onChange={handleRadioChange}>
          <FormControlLabel value={props.questionDtls.options[0].correct} control={<Radio />} label={props.questionDtls.options[0].option} />
          <FormControlLabel value={props.questionDtls.options[1].correct} control={<Radio />} label={props.questionDtls.options[1].option} />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Check Answer
        </Button>
      </FormControl>
    </form>
    </div>

  );
}
