import React, { Component, Fragment } from "react";
import "./App.css";
import Routes from "./Routes";

class App extends Component {
  state = {
    isHomepage: true,
    questions: false,
    isResults: false
  };

  render() {
    const childProps = {
      isHomepage: this.state.isHomepage,
      questions: this.state.questions
    };

    return (
      <div className="App">
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
