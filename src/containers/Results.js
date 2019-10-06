import React, { Component } from "react";
import "./Results.css";

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      result: {},
      name: ""
    };
  }

  // load results
  componentDidMount() {
    var api =
      "https://printful.com/test-quiz.php?action=submit&quizId=" +
      this.props.testid;
    // add answers
    var r = this.props.results;
    for (var i = 0; i < r.length; i++) {
      api = api + "&answers[]=" + r[i];
    }

    fetch(api)
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          result: result,
          name: this.props.name
        });
      });
  }

  render() {
    return (
      <div className="Results">
        {this.state.isLoaded ? (
          <div className="lander">
            <h1>Thanks {this.state.name}!</h1>
            <p>
              Your responded correctly to {this.state.result.correct} out of{" "}
              {this.state.result.total} questions.
            </p>
          </div>
        ) : (
          <div className="lander">Loading...</div>
        )}
      </div>
    );
  }
}
