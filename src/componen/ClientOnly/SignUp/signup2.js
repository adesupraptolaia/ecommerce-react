import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";

class SignUp2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fullname = React.createRef();
    this.phone = React.createRef();
    this.address = React.createRef();
  }

  handleSubmit = async event => {
    event.preventDefault();
    const self = this;
    const req = {
      method: "post",
      url: this.props.host + "/client/detail",
      data: {
        fullname: this.fullname.current.value,
        phone: this.phone.current.value,
        address: this.address.current.value
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req)
      .then(response => {
        alert(`Selamat datang ${self.fullname.current.value}`);
        self.props.history.push("/");
      })
      .catch(error => console.log("error ", error));
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <div className="card">
              <header className="card-header">
                <h4 className="card-title mt-2">Masukkan Data Diri Anda</h4>
              </header>
              <article className="card-body">
                {/*  */}
                <form onSubmit={this.handleSubmit}>
                  {/* FULLNAME */}
                  <div className="form-group">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      ref={this.fullname}
                      required
                    />
                  </div>
                  {/* NO Ponsel */}
                  <div className="form-group">
                    <label>Nomor Ponsel</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      ref={this.phone}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Alamat</label>
                    <textarea
                      className="form-control"
                      placeholder=""
                      ref={this.address}
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
  "search, is_login, token, host",
  actions
)(SignUp2);
