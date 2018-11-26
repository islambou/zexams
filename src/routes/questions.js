import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Tooltip, Drawer } from "antd";
import { GET_QUESTIONS, DELETE_QUESTIONS, EDIT_TEST } from "../sagas/types";
import { withRouter } from "react-router-dom";
import AddQuestion from "../components/addQuestion";

export class Questions extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    selectedRows: [],
    visible: false,
    questionToEdit: undefined
  };

  handleChangeTable = (pagination, filters, sorter) => {
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
    let before_questions =
      this.props.getTest(this.props.match.params.test).questions || [];
    let new_questions = [];
    let index_of_question = before_questions.indexOf(q);
    if (index_of_question == -1) new_questions = [...before_questions, q];
    else
      new_questions = before_questions
        .slice(0, index_of_question)
        .concat(before_questions.slice(index_of_question + 1));
    this.props.editTestQuestions({
      id: this.props.match.params.test,
      questions: new_questions,
      test: this.props.match.params.testName
    });
  };
  handleAddRemoveQuestionToTestMultiButton = q => {
    let toBeadded = this.state.selectedRows.map(item => item.key);
    this.props.editTestQuestions({
      id: this.props.match.params.test,
      questions: toBeadded,
      test: this.props.match.params.testName
    });
    this.setState({ selectedRows: [] });
  };
  handleDeleteQuestionButton = q => {
    this.props.deleteQuestions([q]);
  };
  handleEditQuestionButton = q => {
    console.log("setting question to be delited", q);
    this.setState({
      visible: true,
      questionToEdit: q
    });
  };
  onDrawerClose = () => {
    this.setState({
      visible: false,
      questionToEdit: undefined
    });
  };
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
          onClick={() => editHandler()}
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

  forTestActionButton = (changeHandler, questionid) => {
    console.log(this.props.getTest(this.props.match.params.test));
    let before_questions = this.props.getTest(this.props.match.params.test)
      .questions
      ? this.props.getTest(this.props.match.params.test).questions
      : [];

    console.log(before_questions);
    let question_exists = before_questions.indexOf(questionid) != -1;
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
      key: item.id,
      actions: this.props.match.params.test
        ? this.forTestActionButton(
            () => this.handleAddRemoveQuestionToTestButton(item.id),
            item.id
          )
        : this.regularActionButtons(
            () => this.handleEditQuestionButton(item),
            () => this.handleDeleteQuestionButton(item.id)
          )
    }));
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
      onSelect: (record, selected, selectedRows) => {
        this.setState({ selectedRows });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
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
        filters: this.props.categories.map(cat => ({ value: cat, text: cat })),
        onFilter: (category, record) => record.category.indexOf(category) === 0
      },
      {
        title: "Difficulty",
        dataIndex: "difficulty",

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
        <Drawer
          title={`Edit ${(this.state.questionToEdit || {}).id}`}
          width={720}
          placement="right"
          onClose={this.onDrawerClose}
          maskClosable={false}
          visible={this.state.visible}
          style={{
            height: "calc(100% - 55px)",
            overflow: "auto",
            paddingBottom: 53
          }}
        >
          <AddQuestion question={this.state.questionToEdit} />
        </Drawer>
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
  categories: state.categories,
  getTest: id => state.tests.find(el => el.id === id) || {}
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
