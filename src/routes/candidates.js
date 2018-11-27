import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Badge, Menu, Dropdown, Icon, Button, Modal } from "antd";
import AddCandidate from "../components/AddCandidate";
import { FETCH_CANDIDATES } from "../sagas/types";
const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

class Candidates extends Component {
  state = { addCandidatevisible: false };

  showAddCandidateModal = () => {
    this.setState({
      addCandidatevisible: true
    });
  };
  handleCancelAddCandidate = e => {
    this.setState({
      addCandidatevisible: false
    });
  };
  expandedRowRender = () => {
    const columns = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        )
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <span className="table-operation">
            <a href="javascript:;">Pause</a>
            <a href="javascript:;">Stop</a>
            <Dropdown overlay={menu}>
              <a href="javascript:;">
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        )
      }
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56"
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  columns = [
    { title: "first Name", dataIndex: "firstName", key: "firstName" },
    { title: "last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Techs", dataIndex: "techs", key: "techs" },
    { title: "phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "operation",
      render: () => <a href="javascript:;">Publish</a>
    }
  ];

  data = [];
  componentDidMount = () => {
    this.props.getCandidates();
  };
  populate = () => {
    this.props.candidates.forEach(candidate => {
      this.data.push({
        key: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        techs: candidate.techs,
        phoneNumber: candidate.phoneNumber,
        email: candidate.email
      });
    });
  };
  static getDerivedStateFromProps(props, state) {
    if (props.notif.length > 0) {
      state.addCandidatevisible = false;
    }

    return state;
  }

  render() {
    this.populate();
    return (
      <>
        <Button
          onClick={this.showAddCandidateModal}
          icon="user-add"
          type="dashed"
          style={{ marginBottom: "20px" }}
        >
          Add a new candidate
        </Button>
        <Modal
          title="Add a new candidate"
          visible={this.state.addCandidatevisible}
          onCancel={this.handleCancelAddCandidate}
          footer={[]}
        >
          <AddCandidate />
        </Modal>

        <Table
          className="components-table-demo-nested"
          columns={this.columns}
          expandedRowRender={this.expandedRowRender}
          dataSource={this.data}
        />
      </>
    );
  }
}
const mapStateToProps = state => ({
  notif: state.candidateNotif,
  candidates: state.candidates
});

const mapDispatchToProps = dispatch => ({
  getCandidates: () => dispatch({ type: FETCH_CANDIDATES })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Candidates);
