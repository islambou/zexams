import React from "react";
import { connect } from "react-redux";
import { Alert, notification } from "antd";
function Notifier(props) {
  return (
    <div id="notifier">
      {props.notifications.map(notif =>
        notification[notif.type == 1 ? "success" : "error"]({
          message: notif.type == 1 ? "success" : "error",
          description: notif.message
        })
      )}
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
