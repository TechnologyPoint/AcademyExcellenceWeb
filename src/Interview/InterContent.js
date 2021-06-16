import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function QuestionHeader(props) {
  const classes = useStyles();
  const [selectedSubject, setSelectedSubject] = React.useState('');
  const [selectedClass, setSelectedClass] = React.useState('');
  const [subjectDetails,setSubjectDetails] = React.useState([]);
  const [subjectData,setSubjectData] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [chapterLoaded, setChapterLoaded] = React.useState(false);
  const [questionSetLoaded, setQuestionSetLoaded] = React.useState(false);
  const [classListLoaded, setClassListLoaded] = React.useState(false);
  const [questionSet, setQuestionSet] = React.useState([]);
  const [subjectList, setSubjectList] = React.useState([]);
  const [chapterList, setChapterList] = React.useState([]);
  const [classList, setClassList] = React.useState([]);
  const [inputSubjectValue, setInputSubjectValue] = React.useState([]);
  const [inputChapterValue, setInputChapterValue] = React.useState([]);
  const [inputQuestionSetValue, setInputQuestionSetValue] = React.useState([]);
  const [inputClassValue, setInputClassValue] = React.useState([]);
  const [selectedChapter, setSelectedChapter] = React.useState([]);
  const [selectedQuestionSet, setSelectedQuestionSet] = React.useState("");
  const loading = loaded && subjectList.length === 0;
  const chapterLoading = chapterLoaded && chapterList.length === 0;
  const questionSetLoading = questionSetLoaded && questionSet != null && questionSet.length === 0;
  const classListLoading = classListLoaded && classList != null && classList.length === 0;
  const [startedExam, setStartedExam] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [previousBoard, setPreviousBoard] = React.useState("");
  const [changeNavigation, setChangeNavigation] = React.useState(false);
  const [readyToCancel, setReadyToCancel] = React.useState(true);
  const [chpterInactive,setChapterInactive] = React.useState(false);
  const options = ['React Js', 'Java', 'Aws','Javascript','J2ee','Spring','Jquery'];



  return (
    <div>
    <FormControl variant="outlined" className={classes.formControl}>
    <Autocomplete
     id="chapter-list"
     style={{ width: 200 }}
     options={options}
     renderInput={(params) => <TextField {...params} label="Select Language" variant="outlined" />}
     />
  </FormControl>

    </div>
  );
}
