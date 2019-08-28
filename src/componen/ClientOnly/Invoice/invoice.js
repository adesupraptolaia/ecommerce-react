import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/invoice.css";
import axios from "axios";
import BackHomeClient from "../../BackHome/backhomeclient";

class Invoce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
      fullname: "",
      email: "",
      phone: "",
      address: "",
      listTransaction: [],
      listTransactionDetail: [],
      client_id: 0
    };
  }

  componentDidMount = async sport => {
    // MENAPILKAN DAFTAR BARANG DI CART
    const req5 = {
      method: "get",
      url: this.props.host + "/cart",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    const self = this;
    await axios(req5)
      .then(function(response) {
        self.setState({ listCart: response.data });
        self.props.setCart(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    // GET EMAIL CLIENT
    const req = {
      method: "get",
      url: this.props.host + "/client",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req)
      .then(function(response) {
        self.setState({
          email: response.data.email,
          client_id: response.data.id
        });
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
      url: this.props.host + `/transaction/${this.props.match.params.id}`,
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

    // GET TRANSACTION DETAIL
    const req4 = {
      method: "get",
      url:
        this.props.host +
        `/transactiondetail?transaction_id=${this.props.match.params.id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req4)
      .then(function(response) {
        self.setState({
          listTransactionDetail: response.data
        });
      })
      .catch(function(error) {
        console.log("HAHAHAHAHA", error);
      });

    // CEK AUTENTIKASI
    if (
      parseInt(this.state.client_id) !==
      parseInt(this.state.listTransaction.client_id)
    ) {
      alert("Anda Tidak Memiliki Akses");
      this.props.history.push("/");
    }
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
          <div className="row">
            <div className="col-md-6 offset-md-3 main">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      className="img-fluid"
                      alt="Invoce Template"
                      src="http://www.prepbootstrap.com/Content/images/template/productslider/product_004.jpg"
                    />
                  </div>
                  <div className="col-md-8 text-xs-right">
                    <h4 style={{ color: "#F81D2D" }}>
                      <strong>{this.state.fullname}</strong>
                    </h4>
                    <p>Your Address : {this.state.address}</p>
                    <p>Your Phone : {this.state.phone}</p>
                    <p>Your Email : {this.state.email}</p>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12 text-xs-center">
                    <h2>INVOICE</h2>
                    <h5>
                      ID invoice : {Math.floor(Math.random() * 1000000000)}
                    </h5>
                  </div>
                </div>
                <br />
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <h6>Description</h6>
                        </th>
                        <th>
                          <h6>Quantity</h6>
                        </th>
                        <th>
                          <h6>Amount</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.listTransactionDetail.map((item, key) => {
                        return (
                          <tr>
                            <td className="col-md-8">{item.product_name}</td>
                            <td className="col-md-1">{item.qty}</td>
                            <td className="col-md-4">
                              {this.formatRupiah(item.total_price)}{" "}
                            </td>
                          </tr>
                        );
                      })}

                      <tr style={{ color: "#F81D2D" }}>
                        <td className="text-xs-right">
                          <h4>
                            <strong>Total:</strong>
                          </h4>
                        </td>
                        <td></td>
                        <td className="text-xs-left">
                          <h6>
                            <strong>
                              <i className="fa fa-usd" aria-hidden="true" />{" "}
                              {this.formatRupiah(
                                parseInt(this.state.listTransaction.total_price)
                              )}{" "}
                            </strong>
                          </h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <div className="col-md-12">
                    <p>
                      <b>Date : {this.state.listTransaction.createdAt}</b>
                    </p>
                    <br />
                    <p>
                      <b>Signature</b>
                    </p>
                  </div>
                </div>
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
)(Invoce);
