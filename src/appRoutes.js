import React from "react";

import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import Login from "./routes/login";
import LoginRedirector from "./components/redirectors/LoginRedirector";
import HomeRedirector from "./components/redirectors/HomeRedirector";
import ErrorBoundary from "./components/ErrorBoundary";

//routes
const Routes = props => {
  const user = props.user;
  return (
    <ErrorBoundary>
      <div style={{ marginTop: "50px" }} />
      <Route
        path="/login"
        component={user.username == undefined ? Login : HomeRedirector}
      />
    </ErrorBoundary>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Routes)
);
