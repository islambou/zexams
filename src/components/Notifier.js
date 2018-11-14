import React from "react";
import { connect } from "react-redux";
import { Alert, notification, Switch } from "antd";
import { SUCCESS, ERROR, INFO } from "../consts/notifications";
function Notifier(props) {
  return (
    <div id="notifier">
      {props.notifications.map(notif => {
        let type = "info";
        if (notif.type == SUCCESS) type = "success";
        if (notif.type == ERROR) type = "error";
        return notification[type]({
          message: notif.type == SUCCESS ? "success" : "error",
          description: notif.message
        });
      })}
    </div>
  );
}
const mapStateToProps = state => ({
  notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier);
