import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import {
  Steps,
  Icon,
  message,
  Button,
  Skeleton,
  Checkbox,
  Card,
  Progress
} from "antd";
import { GET_QUESTIONS } from "../sagas/types";
import array from "lodash/array";
const Step = Steps.Step;

export class displayTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: [],
      checked: [],
      mark: -1
    };
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.fetch_test_data(this.props.match.params.id);
    }
  };
  async fetch_test_data(testID) {
    let fetchData = await fetch("/tests/" + testID);
    let testData = await fetchData.json();

    let questionPromesses = [];

    testData.questions.forEach(el => {
      questionPromesses.push(fetch("/questions/" + el));
    });

    var questionsFromServerResponses = await Promise.all(questionPromesses);
    let questionJsonsPromesses = await questionsFromServerResponses.map(el =>
      el.json()
    );
    let questionsFromServer = await Promise.all(questionJsonsPromesses);
    console.log(questionsFromServer);

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
          question.id,
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
    //prepare answers payload
    let user_answers = [];
    this.state.checked.forEach(el => {
      let ques = el.split("-")[0];
      let ans = el.split("-")[1];
      let q_ind = array.findIndex(user_answers, { question: ques });
      if (q_ind === -1) {
        user_answers.push({ question: ques, answers: [ans] });
      } else {
        user_answers[q_ind].answers.push(ans);
      }
    });
    message.info("Answers are submitted !!");
    let res = await fetch("/user_answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        test: this.props.match.params.id,
        answers: user_answers
      })
    });
    if (res.status == 200) {
      res.json().then(v => {
        this.setState({ mark: v });
      });
    } else {
      message.error("Somthing went wrong !");
    }
  };
  render() {
    if (this.state.mark > -1) {
      return (
        <div style={{ textAlign: "center" }}>
          <Progress type="circle" percent={this.state.mark} />
          <h2 style={{ marginTop: "20px" }}>
            You scored {this.state.mark}% on this test
          </h2>
        </div>
      );
    }
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
