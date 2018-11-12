import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Tooltip } from "antd";
import { GET_QUESTIONS, DELETE_QUESTIONS, EDIT_TEST } from "../sagas/types";
import { withRouter } from "react-router-dom";

export class Questions extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    selectedRows: []
  };

  handleChangeTable = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  handleAddRemoveQuestionToTestButton = q => {
    let before_questions = this.props.getTest(this.props.match.params.test);
    if (before_questions) before_questions = before_questions.questions;
    let new_questions = [];
    console.log(before_questions);
    let index_of_question = before_questions.indexOf(q);
    if (index_of_question == -1) new_questions = [...before_questions, q];
    else
      new_questions = before_questions
        .slice(0, index_of_question)
        .concat(before_questions.slice(index_of_question + 1));
    this.props.editTestQuestions({
      _id: this.props.match.params.test,
      questions: new_questions
    });
  };
  handleAddRemoveQuestionToTestMultiButton = q => {
    let toBeadded = this.state.selectedRows.map(item => item.key);
    this.props.editTestQuestions({
      _id: this.props.match.params.test,
      questions: toBeadded
    });
    this.setState({ selectedRows: [] });
  };
  handleDeleteQuestionButton = q => {
    this.props.deleteQuestions([q]);
  };
  handleEditQuestionButton = q => {};

  handleDeleteMultiButon = () => {
    let toBeDeleted = this.state.selectedRows.map(item => item.key);
    this.props.deleteQuestions(toBeDeleted);
  };
  setDifficultySort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "difficulty"
      }
    });
  };

  regularActionButtons = (editHandler, deleteHandler) => (
    <>
      <Tooltip title="edit question">
        <Button
          type="dashed"
          shape="circle"
          icon="edit"
          onClick={editHandler()}
        />
      </Tooltip>
      <Tooltip title="delete question">
        <Button
          type="dashed"
          shape="circle"
          icon="delete"
          onClick={() => deleteHandler()}
        />
      </Tooltip>
    </>
  );

  forTestActionButton = (changeHandler, question_id) => {
    let before_questions = this.props.getTest(this.props.match.params.test);
    if (before_questions) before_questions = before_questions.questions;
    else return;
    console.log(before_questions, question_id);
    let question_exists = before_questions.indexOf(question_id) != -1;
    console.log("question exists: ", question_exists);
    return (
      <Tooltip
        title={
          question_exists
            ? "Remove this question from the test"
            : "Add this question to the test"
        }
      >
        <Button
          type="dashed"
          shape="circle"
          icon={question_exists ? "close" : "check"}
          onClick={() => changeHandler()}
        />
      </Tooltip>
    );
  };

  contextualActionBarButton = () => {
    if (this.props.match.params.test)
      return (
        <Button
          icon="check"
          disabled={this.state.selectedRows.length == 0}
          onClick={this.handleAddRemoveQuestionToTestMultiButton}
        >
          {"Add " +
            (this.state.selectedRows.length > 0
              ? this.state.selectedRows.length +
                " element" +
                (this.state.selectedRows.length > 1 ? "s" : "")
              : "")}
        </Button>
      );
    return (
      <Button
        icon="delete"
        disabled={this.state.selectedRows.length == 0}
        onClick={this.handleDeleteMultiButon}
      >
        {"Delete " +
          (this.state.selectedRows.length > 0
            ? this.state.selectedRows.length +
              " element" +
              (this.state.selectedRows.length > 1 ? "s" : "")
            : "")}
      </Button>
    );
  };
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};

    const data = this.props.questions.map(item => ({
      ...item,
      key: item._id,
      actions: this.props.match.params.test
        ? this.forTestActionButton(
            () => this.handleAddRemoveQuestionToTestButton(item._id),
            item._id
          )
        : this.regularActionButtons(
            () => this.handleEditQuestionButton(),
            () => this.handleDeleteQuestionButton(item._id)
          )
    }));
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        /*   console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );*/
      },
      onSelect: (record, selected, selectedRows) => {
        //  console.log(record, selected, selectedRows);
        this.setState({ selectedRows });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
        this.setState({ selectedRows });
      }
    };
    const columns = [
      {
        title: "Questions",
        dataIndex: "question"
      },
      {
        title: "Category",
        dataIndex: "category",
        filters: data.map(item => ({
          value: item["category"],
          text: item["category"]
        })),
        onFilter: (category, record) => record.category.indexOf(category) === 0,
        sorter: (a, b) => a.category.length - b.category.length,
        sortOrder: sortedInfo.columnKey === "category" && sortedInfo.order
      },
      {
        title: "Difficulty",
        dataIndex: "difficulty",
        filters: Array.from(new Set(data.map(item => item["difficulty"]))).map(
          item => ({ value: item, text: item })
        ),
        onFilter: (difficulty, record) =>
          record.difficulty.indexOf(difficulty) === 0,

        sorter: (a, b) => a.difficulty - b.difficulty,
        sortOrder: sortedInfo.columnKey === "difficulty" && sortedInfo.order
      },
      {
        title: "Actions",
        dataIndex: "actions"
      }
    ];
    return (
      <>
        <h3>
          {this.props.match.params.test
            ? "Select questions for the test : " +
              this.props.match.params.testName
            : "List of questions"}
        </h3>
        <div style={{ marginBottom: 20 }}>
          {this.contextualActionBarButton()}
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          onChange={this.handleChangeTable}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  getTest: id => state.tests.find(el => el._id === id)
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: () => dispatch({ type: GET_QUESTIONS }),
  deleteQuestions: arr => dispatch({ type: DELETE_QUESTIONS, payload: arr }),
  editTestQuestions: payload => dispatch({ type: EDIT_TEST, payload: payload })
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Questions)
);
