import React from "react";
import "./App.css";
import Debounce from "./components/Debounce";
import ClassExample from "./components/ClassExample";
import TextInputWithFocusButton from "./components/ReactInterviewQuestions";

function App() {
  return (
    <div className="App">
      {/* <Debounce /> */}
      <TextInputWithFocusButton />
    </div>
  );
}

export default App;
