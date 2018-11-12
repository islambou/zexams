import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Steps, Icon, message, Button, Skeleton, Checkbox, Card } from "antd";
import { GET_QUESTIONS } from "../sagas/types";
import array from "lodash/array";
const Step = Steps.Step;

export class displayTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: [],
      checked: []
    };
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.fetch_test_data(this.props.match.params.id);
    }
  };
  async fetch_test_data(testID) {
    let fetchData = await fetch("/test/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([testID])
    });
    let testData = await fetchData.json();

    let fetchQuestions = await fetch("/question/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(testData.find(el => el._id === testID).questions)
    });
    var questionsFromServer = await fetchQuestions.json();

    let questionSteps = questionsFromServer.map((el, index) => ({
      ques: el
    }));
    this.setState({ steps: questionSteps });
  }

  onAnswerCheck = (e, questionIndex, answerIndex) => {
    if (e.target.checked) {
      let checked = this.state.checked;
      checked.push(`${questionIndex}-${answerIndex}`);
      this.setState({
        checked
      });
    } else {
      let ind = this.state.checked.indexOf(`${questionIndex}-${answerIndex}`);
      let newChecked = this.state.checked
        .slice(0, ind)
        .concat(this.state.checked.slice(ind + 1));
      this.setState({
        checked: newChecked
      });
    }
  };

  print_answersOfQuestion = (asnwers, questionIndex, checkedArray) => {
    console.log("print answersOfQuestion called");
    return asnwers.map((ans, index) => (
      <div className="questionAnswers" key={"qa" + index}>
        <Checkbox
          onChange={e => this.onAnswerCheck(e, questionIndex, index)}
          checked={checkedArray.indexOf(`${questionIndex}-${index}`) !== -1}
        >
          {ans.answer}
        </Checkbox>
      </div>
    ));
  };
  printQuestion = (question, questionIndex, checkedArray) => {
    let questionBody = question.question;
    return (
      <Card type="inner" title={questionBody} style={{ margin: "40px 0" }}>
        {this.print_answersOfQuestion(
          question.answers,
          question._id,
          checkedArray
        )}
      </Card>
    );
  };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleDoneButtonClick = async () => {
    let res = await fetch("submit_answers/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.checked)
    });

    res
      .json()
      .then(v => {
        message.success("Answers are submitted !");
      })
      .catch(e => {
        message.error("Somthing went wrong !");
      });
  };
  render() {
    if (!this.props.match.params.id)
      return (
        <h1 style={{ textAlign: "center" }}>
          <Icon
            type="frown"
            style={{
              margin: "auto",
              display: "inline-block",
              fontSize: "200px"
            }}
          />
          <br />
          No test found !!
        </h1>
      );
    if (this.state.steps.length == 0) return <Skeleton />;
    const { current } = this.state;
    let steps = this.state.steps;
    return (
      <div>
        <Steps current={current}>
          {steps.map((item, index) => (
            <Step title={item.title} key={"s" + index} />
          ))}
        </Steps>
        <div className="steps-content">
          {this.printQuestion(steps[current].ques, current, this.state.checked)}
        </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={this.handleDoneButtonClick}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getQuestions: payload => dispatch({ type: GET_QUESTIONS, payload: payload })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(displayTest);
