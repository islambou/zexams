import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import React, { lazy, Suspense } from "react";
import Questions from "./routes/questions";
import AddQuestions from "./components/addQuestion";
import Tests from "./routes/tests";
import Login from "./routes/login";
import displayTest from "./routes/displayTest";
import LoginRedirector from "./components/LoginRedirector";
//routes
const Routes = props => {
  const user = props.user;
  console.log(user == true);
  return (
    <>
      <div style={{ marginTop: "50px" }} />
      <Route
        path="/questions/:test?/:testName?"
        component={user._id != undefined ? Questions : LoginRedirector}
      />
      <Route path="/add-question" component={AddQuestions} />
      <Route path="/tests" component={Tests} />
      <Route path="/test/:id?" component={displayTest} />
      <Route path="/login" component={Login} />
    </>
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
