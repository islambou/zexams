import React, { Component } from "react";
import { connect } from "react-redux";
import { FETCH_USER } from "../sagas/types";

export class Loginform extends Component {
  constructor(props) {
    super(props);
    this.username_input_ref = React.createRef();
    this.password_input_ref = React.createRef();
  }
  handleLoginButton = () => {
    let username = this.username_input_ref.current.value;
    let pass = this.password_input_ref.current.value;
    this.props.sendCreds({ username: username, password: pass });
  };
  render() {
    return (
      <div>
        <div className="container pt-lg-md">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card bg-secondary shadow border-0">
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Sign in</small>
                  </div>
                  <div className="form-group mb-3">
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-single-02" />
                        </span>
                      </div>
                      <input
                        ref={this.username_input_ref}
                        className="form-control"
                        placeholder="Email"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-lock-circle-open" />
                        </span>
                      </div>
                      <input
                        ref={this.password_input_ref}
                        className="form-control"
                        placeholder="Password"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span>Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary my-4"
                      onClick={this.handleLoginButton}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <a href="#" className="text-light">
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="col-6 text-right">
                  <a href="#" className="text-light">
                    <small>Create new account</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  sendCreds: creds => dispatch({ type: FETCH_USER, payload: creds })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loginform);
