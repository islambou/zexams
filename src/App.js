import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Notifier from "./components/Notifier";
import AppRoutes from "./appRoutes";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
export default class App extends Component {
  render() {
    const { Content } = Layout;
    return (
      <Provider store={store}>
        <Router>
          <>
            <Notifier />
            <Navbar />
            <Content style={{ padding: "0 50px" }}>
              <AppRoutes className="container" />
            </Content>
          </>
        </Router>
      </Provider>
    );
  }
}
