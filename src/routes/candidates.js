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
  Tooltip
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
  { title: "Test", dataIndex: "test", key: "test" },
  {
    title: "Status",
    dataIndex: "state",
    key: "state",
    render: (x, record) => {
      let testStatus;
      if (record.mark == undefined)
        testStatus = <Badge status="warning" text="Not passed yet" />;
      else if (record.mark < 50)
        testStatus = <Badge status="Error" text="Failed" />;
      else testStatus = <Badge status="success" text="Passed" />;
      return testStatus;
    }
  },
  { title: "Mark", dataIndex: "mark", key: "mark" },
  { title: "Date", dataIndex: "date", key: "date" },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: (x, record) => {
      return (
        <Tooltip title="View answers">
          <Button
            type="dashed"
            shape="circle"
            icon="form"
            onClick={() => alert("hi " + record.key)}
          />
        </Tooltip>
      );
    }
  }
];

class Candidates extends Component {
  state = { addCandidatevisible: false, extendedData: {} };

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
  expandedRowRender = (record, index, indent, expended) => {
    let data = [];
    if (expended) {
      let uid = record.key;
      //get tests of this user
      if (!this.state.extendedData[uid])
        fetch(`/user_answers/user/withtitles/${uid}`)
          .then(res => res.json())
          .then(tests => {
            console.log(tests);

            let udata = tests.map(t => {
              return {
                key: t.id,
                date: t.date,
                test: t.test,
                mark: t.mark + "%"
              };
            });
            let olded = this.state.extendedData;
            olded[uid] = udata;
            this.setState({ extendedData: olded });
          });

      data = this.state.extendedData[uid] ? this.state.extendedData[uid] : [];
    }
    return (
      <Table columns={extendedTableCols} dataSource={data} pagination={false} />
    );
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
      render: (x, record) => {
        return (
          <>
            <Tooltip title="view resume">
              <Button
                type="dashed"
                shape="circle"
                icon="file"
                onClick={() => alert("hi " + record.key)}
              />
            </Tooltip>
            <Tooltip title="Assigne tests">
              <Button
                type="dashed"
                shape="circle"
                icon="exception"
                onClick={() => alert("hi " + record.key)}
              />
            </Tooltip>
            <Tooltip title="Delete candidate">
              <Button
                type="dashed"
                shape="circle"
                icon="form"
                onClick={() => alert("hi " + record.key)}
              />
            </Tooltip>
          </>
        );
      }
    }
  ];

  data = [];
  componentDidMount = () => {
    this.props.getCandidates();
  };
  populate = () => {
    this.data = [];
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
