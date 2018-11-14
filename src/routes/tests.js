import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Skeleton, Switch, Card, Icon, Tooltip, Modal } from "antd";
import CreateTest from "../components/CreateTest";
import { Redirect } from "react-router";
import { POST_TEST, DELETE_TESTS } from "../sagas/types";
import { Link } from "react-router-dom";
const { Meta } = Card;
const ME = POST_TEST;
export class Tests extends Component {
  state = {
    loading: false,
    addTEstoMdalVisible: false,
    redirect: false
  };

  //for Modal
  showAddTestModal = () => {
    this.setState({ addTEstModalVisible: true });
  };

  handleCancelModal = () => {
    this.setState({ addTEstModalVisible: false });
  };

  handleCreate = () => {
    console.log(this.refs);
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.props.addNEwTEst(values);
      this.setState({ addedTestName: values.test });
    });
  };

  saveFormRefModal = formRef => {
    this.formRef = formRef;
  };
  componentDidUpdate() {
    let notifs = this.props.notifs;
    let notesForMe = notifs.filter(
      obj => (obj.owner = ME && obj.test == this.state.addedTestName)
    );
    if (notesForMe[0]) {
      this.setState({
        addTEstoMdalVisible: false,
        redirect: true,
        redirectTo: notesForMe[0].testId
      });
    }
  }

  confirmDialog = (testName, testID) => {
    let props = this.props;
    Modal.confirm({
      title: "Are you sure you want to delete this test : " + testName,
      okText: "confirm",
      cancelText: "cancel",
      onOk() {
        props.deleteTest([testID]);
      }
    });
  };
  render() {
    const { loading } = this.state;
    if (this.state.redirect) {
      return (
        <Redirect
          to={
            "/questions/" +
            this.state.redirectTo +
            "/" +
            this.state.addedTestName
          }
        />
      );
    }
    return (
      <div>
        <CreateTest
          wrappedComponentRef={this.saveFormRefModal}
          visible={this.state.addTEstModalVisible}
          onCancel={this.handleCancelModal}
          onCreate={this.handleCreate}
        />
        <Button type="dashed" icon="plus" onClick={this.showAddTestModal}>
          Add a new test
        </Button>
        <div>
          {this.props.tests.map(test => (
            <Card
              style={{
                width: 300,
                marginTop: 16,
                marginRight: 16,
                display: "inline-block"
              }}
              actions={[
                <Tooltip title="Edit questions">
                  <Link to={"/questions/" + test._id + "/" + test.test}>
                    <Icon type="edit" style={{ fontSize: "16px" }} />
                  </Link>
                </Tooltip>,
                <Tooltip title="Delete Test">
                  <Icon
                    type="delete"
                    onClick={() => this.confirmDialog(test.test, test._id)}
                  />
                </Tooltip>,
                <Tooltip title="See the Test">
                  <Link to={"/test/" + test._id}>
                    <Icon type="thunderbolt" style={{ fontSize: "16px" }} />
                  </Link>
                </Tooltip>
              ]}
            >
              <Skeleton loading={loading} avatar active>
                <Meta title={test.test} />
              </Skeleton>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifs: state.testsNotifs,
  tests: state.tests
});

const mapDispatchToProps = dispatch => ({
  addNEwTEst: payload => dispatch({ type: POST_TEST, payload: payload }),
  deleteTest: payload => dispatch({ type: DELETE_TESTS, payload: payload })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tests);
