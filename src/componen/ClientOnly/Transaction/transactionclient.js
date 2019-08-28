import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/invoice.css";
import axios from "axios";
import BackHomeClient from "../../BackHome/backhomeclient";

class TransactionClient extends React.Component {
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

  formatRupiah = num => {
    var p = num.toFixed(2).split(".");
    return (
      "Rp " +
      p[0]
        .split("")
        .reverse()
        .reduce(function(acc, num, i, orig) {
          return num === "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
        }, "") +
      "," +
      p[1]
    );
  };

  render() {
    if (localStorage.hasOwnProperty("client-token")) {
      return (
        <div className="container">
          <h3>Daftar Transaksi</h3>
          <div className="row justify-content-center">
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div>
                <table className="table" style={{ overflow: "auto" }}>
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Tanggal</th>
                      <th scope="col">Total</th>
                      <th scope="col">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.listTransaction.map((item, key) => {
                      return (
                        <tr>
                          <th scope="row">{key + 1}</th>
                          <td>{item.createdAt}</td>
                          <td>{this.formatRupiah(item.total_price)}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => this.detailTransaction(item.id)}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr style={{ color: "red" }}>
                      <th scope="row">
                        <strong>Total</strong>
                      </th>
                      <td></td>
                      <td>
                        {" "}
                        <strong>
                          {this.formatRupiah(this.state.total_transaction)}
                        </strong>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
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
)(TransactionClient);
