import { useState, useEffect } from 'react';
import './App.css'
import Message from './Message';

function App() {

  const [currentDate, setCurrentDate] = useState(new Date().toString());

  // store the current state of the light
  const [isLightOn, setIsLightOn] = useState(false);

  // store the current color of the box
  // components can have state variables
  // - useState returns an array with 2 elements
  //   - index 0: the current value of the state variable
  //   - index 1: a function that can change the state
  // - parameter 1: the default value of the state (applied for first render, aka mounting)
  // ie: create a new state with the default value "gray", and make the value
  // available in boxColor, and create a function name setBoxColor that can update the state's 
  // value
  // when React detects that a component's state as change, it re-renders that component
  // I.e: it will call the component function again
  //const [boxColor, setBoxColor] = useState("gray"); // default value only applies for the first render


  let currentTime = null;
  if (isLightOn) {
    currentTime = (<p>Now is {new Date().toString()}</p>);
  }

  // an effect is a "side-effect" (something besides rendering)
  // usually used to interact with other features or technoogy outside of React
  // two arguments:
  // 1. function, (know as the effect function)
  // 2. dependency array --> if the value in the dependcy array changes, the effect is called
  //                         if empty, then it means effect function will be called once after the first render
  useEffect(()=>{
    // intent: call setInterval once when the component renders for the first time
    setInterval(()=>{
      setCurrentDate(new Date().toString())
    }, 1000);
  }, [])


  const switchOn = () => {
    setIsLightOn(true);
  }

  // or use ternary operator -- isLightOn ? "green" : "yellow"
  const getColor = () => {
    if (isLightOn) {
      return "green";
    } else {
      return "gray";
    }
  }
  // the App function will render the JSX to be rendered
  return (
    <>
      {/* Inline styling in CSS */}
      <div style={
        {
          width: "200px",
          height: "200px",
          border: "1px solid black",
          backgroundColor: getColor()
        }
      }>
      </div>

      {/* If the light is off, show the switch on button */}
      {
        isLightOn == false ? <button onClick={switchOn}>Switch On</button> : null
      }


      {
        isLightOn && <button onClick={() => {
          setIsLightOn(false);
        }}>Switch Off</button>
      }


      {currentTime}

      <Message message={`The light is ${isLightOn ? "on" : "off"}`}
        color={isLightOn ? "green" : "red"} />


    </>
  )
}

export default App
