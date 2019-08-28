import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/invoice.css";
import axios from "axios";
import profile from "../../../img/profile.png";
import BackHomeClient from "../../BackHome/backhomeclient";

class ProfileClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      phone: "",
      address: "",
      listTransaction: [],
      total_transaction: 0
    };
  }

  componentDidMount = async sport => {
    // GET EMAIL CLIENT
    const self = this;
    const req = {
      method: "get",
      url: this.props.host + "/client",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req)
      .then(function(response) {
        self.setState({ email: response.data.email });
      })
      .catch(function(error) {
        console.log("HAHAHAHAHA", error);
      });

    // GET CLIENT DETAILS
    const req2 = {
      method: "get",
      url: this.props.host + "/client/detail",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req2)
      .then(function(response) {
        self.setState({
          fullname: response.data.fullname,
          phone: response.data.phone,
          address: response.data.address
        });
      })
      .catch(function(error) {
        console.log("HAHAHAHAHA", error);
      });

    // GET TRANSACTION
    const req3 = {
      method: "get",
      url: this.props.host + "/transaction",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req3)
      .then(function(response) {
        self.setState({
          listTransaction: response.data
        });
      })
      .catch(function(error) {
        console.log("HAHAHAHAHA", error);
      });

    for (let i in this.state.listTransaction) {
      this.setState({
        total_transaction:
          this.state.total_transaction +
          this.state.listTransaction[i].total_price
      });
    }
  };

  detailTransaction = e => {
    this.props.history.push(`/invoice/${e}`);
  };

  render() {
    if (localStorage.hasOwnProperty("client-token")) {
      return (
        <div className="container">
          <h3>Profile</h3>
          <div className="row justify-content-center">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div>
                <div className="card mb-3">
                  <img
                    src={profile}
                    className="card-img-top"
                    alt="gambar profile"
                    style={{ maxHeight: "250px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name : {this.state.fullname}</h5>
                    <p className="card-text">Email : {this.state.email}</p>
                    <p className="card-text">Phone : {this.state.phone}</p>
                    <p className="card-text">Address : {this.state.address}</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => this.props.history.push("/profile/edit")}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <BackHomeClient />;
    }
  }
}

export default connect(
  "search, is_login, cartProduct, transaction_id, host",
  actions
)(ProfileClient);
