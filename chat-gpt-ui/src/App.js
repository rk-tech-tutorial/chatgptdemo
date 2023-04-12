// Generate react js as text input and button to send to backend with axios as post request and receive response and show it after the tax input
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputValue, setInputValue] = React.useState('')
  const [promptData, setPromptData] = React.useState('')
  const [imagePrompt, setImagePrompt] = React.useState("")
  const [state, setState] = React.useState({
    express: null
  });
  const [stateImg, setStateImg] = React.useState({
    express: null
  });

  const prompt = [
    "physics teacher",
    "maths teacher",
    "chemistry teacher",
    "biology teacher",
    "linux terminal",
    "windows terminal",
    "mac terminal",
    "linux commands",
    "windows commands",
    "mac commands",
    "tata 4 wheeler sales executive",
    "You are javascript programmer"
  ]

  const setValue = (e) => {
    e.preventDefault();
    setInputValue(e.target.value)
  };
  const setPromptValue = (e) => {
    e.preventDefault();
    setPromptData(e.target.value)
  }

  const callExpress = (e) => {
    e.preventDefault();
    console.log("callExpress", inputValue)
    axios
      .post('http://localhost:3001/api/createCompletion', { message: inputValue, chooseOptions: promptData })
      .then(res => setState({ express: res.data.express }))
      .catch(err => console.log(err));
  }

  const setPrompt = (e) => {
    e.preventDefault();
    setImagePrompt(e.target.value)
  }
  const callExpressImage = (e) => {
    e.preventDefault();
    console.log("callExpressImage", imagePrompt)
    axios
      .post('http://localhost:3001/api/createImage', { message: imagePrompt })
      .then(res => setStateImg({ express: res.data.express }))
      .catch(err => console.log(err));
  }

  // Write a code in witch a image will be download from the backend and show it in the frontend with stream 


  return (
    <div className="App">
      <header className="App-header">
        {/* create text input with form data and one submit button */}
        <form id='form1'>
          {/* Generate a choose option in which user can send */}
          <label>
           Choose Profession: &nbsp;
          <select name="chooseOptions" id="chooseOptions" onChange={setPromptValue}>
            {
              prompt.map((item, index) => <option key={index} value={item}>{item.toUpperCase()}</option>)
            }
          </select>
          </label>
          <br />

          <label>
            Ask Question: &nbsp;
            <input type="text" value={inputValue} id="name" onChange={setValue}  placeholder='Write question here'/>
          </label>
          &nbsp;
          <input type="submit" value="Submit" onClick={callExpress} />
        </form>
        <p>{state.express}</p>

        <br />
        <br />
        <br />

        {/* <form id='form2'>
          <label>
            Add Your Image Prompt get your images:
            <input type="text" value={imagePrompt} id="name" onChange={setPrompt} />
          </label>
          <input type="submit" value="Submit" onClick={callExpressImage} />
        </form> */}

        {/* Iterate Over response and print in a p tag of stateImg hook value with image tag inside p tag */}
        {
          stateImg.express && stateImg.express.map((item, index) => {
            return <p key={index}><img src={item.url} /></p>
          })
        }

      </header>
    </div>
  );
}
export default App;
