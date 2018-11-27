import React from "react";
import { connect } from "react-redux";
import { Alert, notification, Switch } from "antd";
import { SUCCESS, ERROR, INFO } from "../consts/notifications";

class Notifier extends React.Component {
  displayNotifs() {
    let nots = this.props.notifications.map(notif => {
      if (notif.type == INFO)
        return notification["info"]({
          message: "info",
          description: notif.message
        });
      else if (notif.type == SUCCESS)
        return notification["success"]({
          message: "success",
          description: notif.message
        });
      else
        return notification["error"]({
          message: "error",
          description: notif.message
        });
    });
    return nots;
  }

  render() {
    return <div id="notifier">{this.displayNotifs()}</div>;
  }
}
const mapStateToProps = state => ({
  notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier);
