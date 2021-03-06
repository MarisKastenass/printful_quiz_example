import React, { Component } from "react";
import "./App.css";
import Routes from "./Routes";

class App extends Component {
  state = {
    name: "",
    testid: null,
    results: []
  };

  // to save username for results
  addUserName = data => {
    this.setState({ name: data });
  };

  // choissen Test id
  addTestId = data => {
    this.setState({ testid: data });
  };

  // save results
  addResults = data => {
    this.setState({ results: data });
  };

  render() {
    const childProps = {
      name: this.state.name,
      testid: this.state.testid,
      results: this.state.results,
      addUserName: this.addUserName,
      addTestId: this.addTestId,
      addResults: this.addResults
    };

    return (
      <div className="App">
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
