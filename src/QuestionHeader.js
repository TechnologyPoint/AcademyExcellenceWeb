import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function QuestionHeader(props) {
  const classes = useStyles();
  const [selectedSubject, setSelectedSubject] = React.useState('');
  const [subjectDetails,setSubjectDetails] = React.useState([]);
  const [subjectData,setSubjectData] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [chapterLoaded, setChapterLoaded] = React.useState(false);
  const [questionSetLoaded, setQuestionSetLoaded] = React.useState(false);
  const [questionSet, setQuestionSet] = React.useState([]);
  const [subjectList, setSubjectList] = React.useState([]);
  const [chapterList, setChapterList] = React.useState([]);
  const [selectedChapter, setSelectedChapter] = React.useState([]);
  const [selectedQuestionSet, setSelectedQuestionSet] = React.useState([]);

  const loading = loaded && subjectList.length === 0;
  const chapterLoading = chapterLoaded && chapterList.length === 0;
  const questionSetLoading = questionSetLoaded && questionSet != null && questionSet.length === 0;


  const populateChapter = (subject,value) => {
   setSelectedSubject(value.id);
   for(var k in subjectList) {
      if (subjectList[k].id === selectedSubject){
          setChapterList(subjectList[k].chapterList);
      }
   }
  };

  function displayQuestionSet(e) {
    e.preventDefault();
    if (selectedQuestionSet !== null && selectedQuestionSet !== ''){
      props.onQuestionSetSelected(true,selectedQuestionSet);
    }else{
      props.onQuestionSetSelected(false,selectedQuestionSet);

    }
  }

  const populateQuestionSet = (chapter, value) => {
    setSelectedChapter(value.id);
    for(var k in chapterList) {
       if (chapterList[k].id === selectedChapter){
           setQuestionSet(chapterList[k].questionset);
       }
    }
    //setFormData({headerPopulated: true });
  }

  const selectQuestionSet = (question,value) => {
   setSelectedQuestionSet(value.id);
  }

  React.useEffect(() => {
  (async () => {
    if(subjectData != null && subjectData.length === 0){
    const response = await fetch('https://pznmdvakt6.execute-api.ap-south-1.amazonaws.com/dev/getAllClassDetails?board=1');
    await sleep(1e3);
    const subjectData = await response.json();
    if (subjectData.length > 0){
      setSubjectDetails(subjectData);
      setSubjectList(subjectData[0].subjectList);
    }
  }})();
}, [loading]);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
      <Autocomplete
      id="subject-list"
      style={{ width: 200 }}
      open={loaded}
      onOpen={() => {
        setLoaded(true);
      }}
      onClose={() => {
        setLoaded(false);
      }}
      getOptionSelected={(subject, value) => {populateChapter(subject,value); return subject.id === value.id}}
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
       setChapterLoaded(true);
    }}
    onClose={() => {
      setChapterLoaded(false);
    }}
    getOptionSelected={(chapter, value) => { populateQuestionSet(chapter,value); return chapter.id === value.id}}
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
  id="questionSet-list"
  style={{ width: 260 }}
  open={questionSetLoaded}
  onOpen={() => {
     setQuestionSetLoaded(true);
  }}
  onClose={() => {
    setQuestionSetLoaded(false);
  }}
  getOptionSelected={(questionSet, value) => {selectQuestionSet(questionSet,value); return questionSet.id === value.id}}
  getOptionLabel={(questionSet) => questionSet.name}
  options={questionSet}
  loading={questionSetLoading}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Question Set"
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

    <Button variant="contained" color="primary" onClick = {displayQuestionSet}>Start</Button>
    </div>
  );
}
