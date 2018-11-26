import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Loginform from "./loginform";
export class Navbar extends Component {
  state = {
    current: "mail",
    showLoginModalVisible: false
  };

  //for Modal
  showLoginModal = () => {
    this.setState({
      showLoginModalVisible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      showLoginModalVisible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      showLoginModalVisible: false
    });
  };

  //--------------------------------------
  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    console.log(this.props.user);
    return (
      <>
        <Modal
          title="Login"
          visible={
            this.state.showLoginModalVisible &&
            this.props.user.username == undefined
          }
          footer={[]}
        >
          <Loginform />
        </Modal>

        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="Item1">
            <Link to="/Item1">
              <Icon type="question" />
              Item 1
            </Link>
          </Menu.Item>

          <Menu.Item key="Item2">
            <Link to="/Item2">
              <Icon type="question" />
              Item 2
            </Link>
          </Menu.Item>

          <Menu.Item key="Item3">
            <Link to="/Item3">
              <Icon type="question" />
              Item 3
            </Link>
          </Menu.Item>

          <Menu.Item key="Item4">
            <Link to="/Item1">
              <Icon type="question" />
              Item 4
            </Link>
          </Menu.Item>
          {this.props.user.username ? (
            ""
          ) : (
            <Menu.Item style={{ float: "right" }}>
              <Button
                type="primary"
                icon="unlock"
                onClick={this.showLoginModal}
              >
                Login
              </Button>
            </Menu.Item>
          )}
        </Menu>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
