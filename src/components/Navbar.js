import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

export class Navbar extends Component {
  state = {
    current: "candidates"
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="candidates">
          <Link to="/candidates">
            <Icon type="user" />
            Candidates
          </Link>
        </Menu.Item>
        <Menu.Item key="questions">
          <Link to="/questions">
            <Icon type="question" />
            Questions
          </Link>
        </Menu.Item>
        <Menu.Item key="add-question">
          <Link to="/add-question">
            <Icon type="plus-circle" />
            Add a Questions
          </Link>
        </Menu.Item>
        <Menu.Item key="tests">
          <Link to="/tests">
            <Icon type="exception" />
            Tests
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
