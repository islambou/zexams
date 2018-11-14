import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class LoginRedirector extends Component {
  render() {
    console.log("redirect to login");
    return <Redirect to="/login" />;
  }
}
