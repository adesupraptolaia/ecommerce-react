import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
    this.email = React.createRef();
  }

  handleSubmit = async event => {
    event.preventDefault();

    const req = {
      method: "post",
      url: this.props.host + "/token/admin",
      data: {
        username: this.username.current.value,
        password: this.password.current.value,
        email: this.email.current.value
      }
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        if (response.data.token !== "") {
          localStorage.setItem("admin-token", response.data.token);
          self.props.history.push("/");
        }
      })
      .catch(() => alert("Username or Password or Email FALSE"));
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <div className="card">
              <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">
                  Login as Admin
                </h4>
                <hr />
                <p className="text-success text-center">
                  Silahkan masukkan username, password, dan email
                </p>
                <form onSubmit={this.handleSubmit}>
                  {/* INPUT USERNAME */}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-user" />{" "}
                        </span>
                      </div>
                      <input
                        name=""
                        className="form-control"
                        placeholder="Username"
                        type="text"
                        ref={this.username}
                      />
                    </div>
                  </div>

                  {/* INPUT EMAIL */}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-lock" />{" "}
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Email Address"
                        type="email"
                        ref={this.email}
                      />
                    </div>
                  </div>

                  {/* INPUT PASSWORD */}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-lock" />{" "}
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="******"
                        type="password"
                        ref={this.password}
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      value="Submit"
                    >
                      {" "}
                      Login{" "}
                    </button>
                  </div>
                </form>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "search, is_login, host",
  actions
)(Login);
