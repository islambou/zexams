import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Icon,
  Button,
  Modal,
  Tag,
  Spin
} from "antd";
import AddCandidate from "../components/AddCandidate";
import { FETCH_CANDIDATES } from "../sagas/types";
const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

const extendedTableCols = [
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Test", dataIndex: "name", key: "name" },
  { title: "Status", dataIndex: "status", key: "state" },
  { title: "Mark", dataIndex: "upgradeNum", key: "upgradeNum" }
];

class Candidates extends Component {
  state = { addCandidatevisible: false, extendedData: [] };

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
  expandedRowRender(record, index, indent, expended) {
    if (expended) {
      let uid = record.key;
      //get tests of this user
    }
    let data = [
      {
        key: "x",
        date: <Spin />,
        name: "",
        upgradeNum: "",
        state: ""
      }
    ];

    //  console.log(data);
    return (
      <Table columns={extendedTableCols} dataSource={data} pagination={false} />
    );
  }

  columns = [
    { title: "first Name", dataIndex: "firstName", key: "firstName" },
    { title: "last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Techs", dataIndex: "techs", key: "techs" },
    { title: "phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "email", dataIndex: "email", key: "email" },
    { title: "Action", key: "operation" }
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
        operation: <a href="javascript:;">Publish</a>,
        techs: (
          <span>
            {candidate.techs.map(tag => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </span>
        ),
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
