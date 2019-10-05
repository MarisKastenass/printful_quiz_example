import React, { Component } from "react";
import { Button, Progress } from "antd";
import "antd/dist/antd.css";
import "./Questions.css";

export default class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      items: [],
      questionsid: 0,
      answers: [],
      results: [],
      progress: 0,
      disablednext: true,
      color: []
    };
  }

  componentDidMount() {
    var api =
      "https://printful.com/test-quiz.php?action=questions&quizId=" +
      this.props.testid;
    fetch(api)
      .then(res => res.json())
      .then(result => {
        this.saveQuestions(result, 0);
      });
  }

  saveQuestions(items, nr) {
    if (+items.length > nr) {
      var api =
        "https://printful.com/test-quiz.php?action=answers&quizId=" +
        this.props.testid +
        "&questionId=" +
        items[nr].id;
      fetch(api)
        .then(res => res.json())
        .then(result => {
          var color = this.setColorBlue(result);
          this.setState({
            isLoaded: true,
            items: items,
            answers: result,
            questionsid: nr,
            color: color
          });
        });
    }
  }

  nextButton = async e => {
    e.preventDefault();
    var vquestionsid = +this.state.questionsid + 1;
    var p = +(+vquestionsid / +this.state.items.length) * 100;
    this.setState({
      progress: p,
      disablednext: true
    });
    if (+vquestionsid < +this.state.items.length) {
      this.saveQuestions(this.state.items, vquestionsid);
    } else {
      this.props.addResults(this.state.results);
      this.props.history.push("/results");
    }
  };

  saveAnswer(e) {
    var color = this.setColorBlue(this.state.answers);
    color[e] = "red";
    var r = this.state.results;
    r[this.state.questionsid] = e;
    this.setState({
      results: r,
      disablednext: false,
      color: color
    });
  }

  setColorBlue(data) {
    var color = [];
    for (var i = 0; i < data.length; i++) {
      color[data.id] = "blue";
    }
    return color;
  }

  render() {
    return (
      <div className="Questions">
        {this.state.isLoaded ? (
          <div className="lander">
            <h1>{this.state.items[this.state.questionsid].title}</h1>
            <div className="answers1">
              {this.state.answers.map(item => (
                <Button
                  type="primary"
                  key={item.id}
                  style={{
                    width: 300,
                    height: 100,
                    marginRight: "150px",
                    marginLeft: "150px",
                    marginTop: "20px",
                    backgroundColor: this.state.color[item.id]
                  }}
                  onClick={() => this.saveAnswer(item.id)}
                >
                  {item.title}
                </Button>
              ))}
            </div>
            <div className="progress">
              <Progress percent={this.state.progress} />
            </div>
            <div className="button">
              <Button
                type="primary"
                key="next"
                disabled={this.state.disablednext}
                style={{ width: 100 }}
                onClick={this.nextButton}
              >
                next
              </Button>
            </div>
          </div>
        ) : (
          <div className="lander">Loading...</div>
        )}
      </div>
    );
  }
}
