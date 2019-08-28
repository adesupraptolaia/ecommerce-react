import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";

class SignUp1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
    this.email = React.createRef();
    this.retype_password = React.createRef();
  }

  handleSubmit = async event => {
    event.preventDefault();
    // if password not match
    if (this.password.current.value !== this.retype_password.current.value) {
      return alert("Your Password Not Match");
    }

    // register new user
    const req = {
      method: "post",
      url: this.props.host + "/client",
      data: {
        username: this.username.current.value,
        password: this.password.current.value,
        email: this.email.current.value
      }
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        if (response.data.status === "please input another username") {
          return alert("Please Input Another Username");
        } else {
          localStorage.setItem("client-id", response.data.id);
        }
      })
      .catch(error => console.log(error));

    // get token for new user
    const req2 = {
      method: "post",
      url: this.props.host + "/token",
      data: {
        username: this.username.current.value,
        password: this.password.current.value
      }
    };
    await axios(req2)
      .then(function(response) {
        if (response.data.token !== "") {
          localStorage.setItem("client-token", response.data.token);
          self.props.history.push("/signup/2");
        }
      })
      .catch(() => alert("Username or Password FALSE"));
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <div className="card">
              <header className="card-header">
                <h4 className="card-title mt-2">Daftar</h4>
              </header>
              <article className="card-body">
                {/*  */}
                <form onSubmit={this.handleSubmit}>
                  {/* USERNAME */}
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      ref={this.username}
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                      ref={this.password}
                      required
                    />
                  </div>
                  {/* Confirm Password */}
                  <div className="form-group">
                    <label>Retype Your Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                      ref={this.retype_password}
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder=""
                      ref={this.email}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      value="Submit"
                    >
                      {" "}
                      Submit{" "}
                    </button>
                  </div>
                  <small className="text-muted">
                    By clicking the 'Submit' button, you confirm that you accept
                    our <br /> Terms of use and Privacy Policy.
                  </small>
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
)(SignUp1);
