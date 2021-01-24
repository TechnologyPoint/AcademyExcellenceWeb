import React from 'react';
import './App.css';


export default function Question(props) {
  const [seconds, setSeconds] = React.useState(0)
  const [minutes, setMinutes] = React.useState(30)



  function updateTime() {
    if (minutes === 0 && seconds === 0) {
      alert("Please Complete The Exam.");
    }
    else {
      if (seconds === 0) {
        setMinutes(minutes => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds => seconds - 1);
      }
    }
  }



  React.useEffect(() => {
    // use set timeout and be confident because updateTime will cause rerender
    // rerender mean re call this effect => then it will be similar to how setinterval works
    // but with easy to understand logic
    const token = setTimeout(updateTime, 1000)

    return function cleanUp() {
      clearTimeout(token);
    }
  })


  return (
    <div>
          <p>Total Question:{props.totalQuestion}</p>
          <p className="timer">Time: {minutes}:{seconds}</p>

    </div>);
}
