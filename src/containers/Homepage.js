import React, { Component } from "react";
import { Input, Button, Select } from "antd";
import "antd/dist/antd.css";
import "./Homepage.css";
const { Option } = Select;

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      items: [],
      name: "",
      testid: null
    };
  }

  // load quizzes
  componentDidMount() {
    fetch("https://printful.com/test-quiz.php?action=quizzes")
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          items: result
        });
      });
  }

  // start button
  start = async e => {
    e.preventDefault();
    // save global parametrs
    if (this.state.name === "") {
      alert("Please enter name!");
      return;
    }
    if (this.state.testid === null) {
      alert("Please chooses one of the tests!");
      return;
    }
    this.props.addUserName(this.state.name);
    this.props.addTestId(this.state.testid);
    // go to next page
    this.props.history.push("/questions");
  };

  render() {
    return (
      <div className="Homepage">
        <h1>Technical task</h1>
        {this.state.isLoaded ? (
          <div className="lander">
            <div className="name">
              <Input
                style={{ width: 200 }}
                placeholder="Enter your name"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="select">
              <Select
                style={{ width: 200 }}
                placeholder="Choose test"
                value={this.state.testid}
                onChange={e => this.setState({ testid: e })}
              >
                {this.state.items.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="button">
              <Button
                type="primary"
                style={{ width: 100 }}
                onClick={this.start}
              >
                Start
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
