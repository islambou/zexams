import React, { lazy, Suspense } from "react";

import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";
import Questions from "./routes/questions";
import Candidates from "./routes/candidates";
import AddQuestions from "./components/addQuestion";
import Tests from "./routes/tests";
import Login from "./routes/login";
import displayTest from "./routes/displayTest";
import LoginRedirector from "./components/redirectors/LoginRedirector";
import HomeRedirector from "./components/redirectors/HomeRedirector";
//routes
const Routes = props => {
  const user = props.user;
  return (
    <ErrorBoundary>
      <div style={{ marginTop: "50px" }} />
      <Route
        path="/questions/:test?/:testName?"
        component={user.username != undefined ? Questions : LoginRedirector}
      />
      <Route
        path="/add-question"
        component={user.username != undefined ? AddQuestions : LoginRedirector}
      />
      <Route
        path="/candidates"
        component={user.username != undefined ? Candidates : Candidates}
      />
      <Route
        path="/tests"
        component={user.username != undefined ? Tests : LoginRedirector}
      />
      <Route
        path="/test/:id?"
        component={user.username != undefined ? displayTest : LoginRedirector}
      />
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
