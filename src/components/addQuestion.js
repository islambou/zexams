import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { POST_QUESTION, GET_CATEGORIES_s } from "../sagas/types";
import { Input, Checkbox, Icon, Form, Button, Select, InputNumber } from "antd";
import AddQuestionCategoryModal from "./AddQuestionCategoryModal";
const FormItem = Form.Item;
const Option = Select.Option;

export function AddQuestion(props) {
  const DEFAULT_QUESTION_DIF = props.question ? props.question.difficulty : 1;
  const DEFAULT_QUESTION_ANSWER = props.question ? props.question.answers : [];
  const DEFAULT_QUESTION_TEXT = props.question ? props.question.question : "";
  const DEFAULT_QUESTION_CATEGORY = props.question
    ? props.question.category
    : "No category";
  const [question, setQuestion] = useState(DEFAULT_QUESTION_TEXT);
  const [difficulty, setDifficulty] = useState(DEFAULT_QUESTION_DIF);
  const [category, setCategory] = useState(DEFAULT_QUESTION_CATEGORY);
  const [answers, setAnswers] = useState(DEFAULT_QUESTION_ANSWER);
  const [modalVisible, setModalVisibility] = useState(false);

  const { TextArea } = Input;
  console.log(DEFAULT_QUESTION_TEXT);

  useEffect(
    () => {
      setQuestion((props.question || {}).question);
      setCategory((props.question || {}).category);
      setDifficulty((props.question || {}).difficulty);
      setAnswers(props.question ? props.question.answers : []);
    },
    [props.question]
  );

  function handleAddAnswerButton(e) {
    setAnswers([...answers, { answer: "", correct: false }]);
  }
  function handleInputTextChange(e, index) {
    let new_answers = [...answers];
    new_answers[index].answer = e.target.value;
    setAnswers(new_answers);
  }
  function handleCheckBoxChange(e, index) {
    let new_answers = [...answers];
    new_answers[index].correct = e.target.checked;
    setAnswers(new_answers);
  }
  function handleTextAreaChange(e) {
    setQuestion(e.target.value);
  }
  function handleCategoryChange(e) {
    setCategory(e);
  }
  function handleDifficultyNumberChange(e) {
    setDifficulty(e);
  }
  function onRemoveAnswerButtonHandler(e, index) {
    let new_answers = [...answers]
      .slice(0, index)
      .concat([...answers].slice(index + 1));
    setAnswers(new_answers);
  }

  let submitQuestion = () => {
    props.sendQuestion({
      question: question,
      difficulty: difficulty,
      category: category,
      answers: answers
    });
  };

  //for Modal
  function showModal() {
    setModalVisibility(true);
  }

  function handleCancelModal() {
    setModalVisibility(false);
  }

  function handleCreateModal() {
    const form = formReff.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      props.addCategory(values.category);
      form.resetFields();
      setModalVisibility(false);
    });
  }
  var formReff;
  function saveFormRefModal(formRef) {
    formReff = formRef;
  }
  console.log("from questions component => ", props.question);
  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Question</h2>
      <TextArea
        rows={3}
        style={{ marginBottom: "20px" }}
        placeholder="Write a large text here ..."
        value={question}
        onChange={handleTextAreaChange}
      />
      <h3>Question Category</h3>
      <Select
        style={{ width: "32%" }}
        value={category}
        onChange={handleCategoryChange}
      >
        {props.categories.map(cat => (
          <Option value={cat} key={cat}>
            {cat}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        size="small"
        style={{ marginLeft: "20px" }}
        onClick={showModal}
      >
        Add a Category
      </Button>
      <AddQuestionCategoryModal
        wrappedComponentRef={saveFormRefModal}
        visible={modalVisible}
        onCancel={handleCancelModal}
        onCreate={handleCreateModal}
      />
      <div>
        <br />
        <h3>Difficulty</h3>
        <InputNumber
          min={DEFAULT_QUESTION_DIF}
          max={5}
          value={difficulty}
          onChange={handleDifficultyNumberChange}
        />
      </div>
      <div>
        <Button
          type="primary"
          icon="plus-circle"
          onClick={handleAddAnswerButton}
          style={{ margin: "20px 0" }}
          type="dashed"
        >
          Add an answer
        </Button>
      </div>
      {answers.map((answer, index) => (
        <div key={index}>
          <Form layout="inline">
            <FormItem>
              <Checkbox
                className="custom-control-input "
                checked={answer.correct}
                onChange={e => handleCheckBoxChange(e, index)}
              />
            </FormItem>
            <FormItem>
              <Input
                type="text"
                placeholder="..."
                className="form-control-alternative form-control-sm "
                value={answer.answer}
                onChange={e => handleInputTextChange(e, index)}
              />
            </FormItem>
            <FormItem>
              <Icon
                type="delete"
                theme="outlined"
                title="Remove answer"
                onClick={e => onRemoveAnswerButtonHandler(e, index)}
              />
            </FormItem>
          </Form>
        </div>
      ))}

      <Button
        type="primary"
        onClick={submitQuestion}
        icon="plus-circle"
        style={{
          margin: "20px 0",
          display: question !== "" && answers !== [] ? "block" : "none"
        }}
      >
        Submit
      </Button>
    </div>
  );
}

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  sendQuestion: question =>
    dispatch({ type: POST_QUESTION, payload: question }),
  addCategory: cat => dispatch({ type: GET_CATEGORIES_s, payload: [cat] })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuestion);
