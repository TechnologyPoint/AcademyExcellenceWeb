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
import Dropdown from 'react-dropdown';
import '../App.css';

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


export default function ManagedQuestionHeader(props) {
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
  const [addQuestionSetValue , setAddedQuestionSetValue] = React.useState("");
  const [inputValue , setInputValue] = React.useState("");
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
  const options = [
  '1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','20'
];





  const displayConfirmation = () => {
      setOpenConfirmation(true);
  };

    const closeConfirmation = () => {
      setOpenConfirmation(false);
    };

    const closeCancelExamnation = () => {
      setChangeNavigation(false);
      setReadyToCancel(false);
    };

    const cancelExamination = () =>{
       setInputClassValue(null);
       setClassListLoaded(false);
       setSelectedClass(null);
       setSelectedSubject(null);
       setSelectedChapter(null);
       setSelectedQuestionSet(null);
       setAddedQuestionSetValue(null);
       setInputValue('');
       setClassList([]);
       setSubjectDetails([]);
       setChapterList([]);
       setQuestionSet([]);
       setLoaded(false);
       //setClassList({blankLis : []});
       setChangeNavigation(false);
       setReadyToCancel(true);
       setPreviousBoard(props.selectedBoard);
       setInputSubjectValue(null);
       setInputChapterValue(null);
       setInputQuestionSetValue(null);
       setStartedExam(false);
       props.onQuestionSetSelected(false,null);
      };

  const confirmExamStart = () =>{
     setStartedExam(true);
     setOpenConfirmation(false);
     displayQuestionSet();
  }

  const populateChapter = (value) => {

   for(var k in subjectList) {
      if (subjectList[k].id === value.id){
          setChapterList(subjectList[k].chapterList);
          setSelectedSubject(value.id);
      }
   }
  };




  function displayQuestionSet() {
    if (addQuestionSetValue !== null && addQuestionSetValue !== '' && (props.boardHeaderName != "Olympiad")){
      props.onQuestionSetSelected(true,addQuestionSetValue,inputSubjectValue.name,inputChapterValue.name,inputValue);
    }else if(addQuestionSetValue !== null && addQuestionSetValue !== '' ){
      props.onQuestionSetSelected(true,addQuestionSetValue);
    }else{
      props.onQuestionSetSelected(false,addQuestionSetValue)
    }
  }



  const populateQuestionSet = ( value) => {
    if (props.boardHeaderName != "Olympiad") {
    for(var k in chapterList) {
       if (chapterList[k].id === value.id){
           setQuestionSet(chapterList[k].questionset);
           setSelectedChapter(value.id);

       }
    }
  }else{
    //setQuestionSet(['']);
    //setQuestionSetLoaded(false);
    populateSubject();
  }
    //setFormData({headerPopulated: true });
  }

  const addQuestionSet = (value) => {
     console.log(value);
     if(value >= 10){
       setInputValue(value);
       setAddedQuestionSetValue(value);
    }else{
      alert("Please Enter Minimum Question Number 10");
       setAddedQuestionSetValue("");
    }
  }

  const loadClassList = () => {
    setStartedExam(false);
    (async () => {
      if(!classListLoaded){
        setClassListLoaded(true);
      const response = await fetch('https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/getClassList?board=' + props.selectedBoard);
      await sleep(1e3);
      const classListData = await response.json();
      if (classListData.length > 0){
        //console.log(classListData);
        setClassList(classListData);
      }
    }}
  )();
  setClassListLoaded(true);

  }
const selectClass = (classValue) => {
  setSelectedClass(classValue.classId);
  setInputSubjectValue(null);
  setInputChapterValue(null);
  setInputQuestionSetValue(null);
}
const populateSubject = () => {
    setLoaded(true);
    (async () => {
      const response = await fetch('https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/getAllClassDetails?board=' + props.selectedBoard + '&class=' + selectedClass);
      await sleep(1e3);
      const subjectData = await response.json();
      console.log(subjectData);
        setSubjectDetails(subjectData);
        setSubjectList(subjectData[0].subjectList);
        if (props.boardHeaderName === "Olympiad") {
          setSelectedSubject(subjectData[0].subjectList[0].id);
          setInputSubjectValue(subjectData[0].subjectList);
          console.log(subjectData[0].subjectList);
          setQuestionSet(subjectData[0].subjectList[0].questionset);
        }
    })();
}

  React.useEffect(() => {
    if(previousBoard === ""){
      setPreviousBoard(props.selectedBoard);
    }else if (previousBoard != "" && previousBoard !== props.selectedBoard) {
      cancelExamination();
    }
  });

  return (
    <div>
    <FormControl variant="outlined" className={classes.formControl}>
    <Autocomplete
    id="subject-list"
    style={{width: 150}}
    open={classListLoaded}
    onOpen={() => {loadClassList()}}
    disableClearable
    value = {inputClassValue}
    onChange={(event, newValue) => {
        selectClass(newValue);
        setInputClassValue(newValue);
      }}
    onClose={() => {
      setClassListLoaded(false);
    }}
    disabled = {(startedExam && !props.retestStarted) ? true : false}
    getOptionSelected={(classValue, value) => {return classValue.classId === value.classId}}
    getOptionLabel={(classValue) => classValue.className}
    options={classList}
    loading={classListLoading}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Class"
        variant="outlined"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {classListLoading ? <CircularProgress color="inherit" size={10} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />
    )}
  />
  </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
      <Autocomplete
      id="subject-list"
      style={{ width: 150}}
      open={loaded}
      onOpen={() => {
        populateSubject();
      }}
      value={inputSubjectValue}
      disableClearable
      disabled = {(selectedClass === null || selectedClass === '' || (startedExam && !props.retestStarted)) ? true : false  }
      hidden={(props.boardHeaderName === "Olympiad") ? true : false }
      onClose={() => {
        setLoaded(false);
      }}
      onChange={(event, newValue) => {
          populateChapter(newValue);
          setInputChapterValue(null);
          setInputSubjectValue(newValue);
        }}
      getOptionSelected={(subject, value) => {setInputSubjectValue(value); return subject.id === value.id}}
      getOptionLabel={(subject) => subject.name}
      options={subjectList}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Subject"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={10} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    </FormControl>
    <FormControl variant="outlined" className={classes.formControl}>
    <Autocomplete
    id="chapter-list"
    style={{ width: 200 }}
    open={chapterLoaded}
    onOpen={() => {
       populateChapter(selectedSubject);
       setChapterLoaded(true);
    }}
    onClose={() => {
      setChapterLoaded(false);
    }}
    disableClearable
    disabled = {(selectedSubject === null || selectedSubject === ''|| (startedExam && !props.retestStarted)) ? true : false  }
    hidden={(props.boardHeaderName === "Olympiad") ? true : false }
    value = {inputChapterValue}
    onChange={(event, newValue) => {
        populateQuestionSet(newValue);
        setInputQuestionSetValue(null);
        setInputChapterValue(newValue);
      }}
    getOptionSelected={(chapter, value) => { return ((chapter.id === value.id) && selectedSubject != null)}}
    getOptionLabel={(chapter) => chapter.name}
    options={chapterList}
    loading={chapterLoading}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Chapter"
        variant="outlined"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {chapterLoading ? <CircularProgress color="inherit" size={10} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />
    )}
  />
  </FormControl>
  <FormControl variant="outlined" className={classes.formControl}>
    <Autocomplete
     id="chapter-list"
     value={inputValue}
     disabled = {((props.boardHeaderName === "Olympiad" && selectedClass === null || selectedClass === '') || (props.boardHeaderName !== "Olympiad" && selectedChapter === null || selectedChapter === '') || (startedExam && !props.retestStarted)) ? true : false  }
     onChange={(event, newValue) => {
       addQuestionSet(newValue)
       setInputValue(newValue);
     }}
     options={options}
     style={{ width: 200 }}
     renderInput={(params) => <TextField {...params} label="Questions Number" variant="outlined" />}
     />

  </FormControl>
<Button variant="contained" color="primary" onClick = {displayConfirmation} disabled = {((addQuestionSetValue === '' || addQuestionSetValue === null) ||(startedExam)) }>Add Question Set</Button>
<Dialog
    open={openConfirmation}
    onClose={closeConfirmation}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Confirmation - Submission"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">Are you sure to start the examination?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={confirmExamStart} color="primary">Confirm</Button>
      <Button onClick={closeConfirmation} color="primary" autoFocus>Cancel</Button>
    </DialogActions>
  </Dialog>
  <Dialog
      open={changeNavigation}
      onClose={closeCancelExamnation}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-nav-title">{"Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-nav-description">The examination is already in progress. Do you really want to cancel the examination ? </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelExamination} color="primary">Confirm</Button>
        <Button onClick={closeCancelExamnation} color="primary" autoFocus>Cancel</Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}
