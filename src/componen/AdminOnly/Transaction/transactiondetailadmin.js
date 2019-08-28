import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";
import BackHome from "../../BackHome/backhome";

class DetailTransactionAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTransactionDetail: [],
      totalBelanja: 0
    };
  }

  componentDidMount = async () => {
    // MENAPILKAN DAFTAR BARANG DI CART
    const req = {
      method: "get",
      url:
        this.props.host +
        `/transactiondetail/admin?transaction_id=${this.props.match.params.id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("admin-token")
      }
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        self.setState({ listTransactionDetail: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let i in this.state.listTransactionDetail) {
      this.setState({
        totalBelanja:
          this.state.totalBelanja +
          this.state.listTransactionDetail[i].total_price
      });
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
    if (localStorage.hasOwnProperty("admin-token")) {
      return (
        <div className="container">
          <h1>Tabel Transaksi</h1>
          <div>
            <table className="table" style={{ overflow: "auto" }}>
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listTransactionDetail.map((item, key) => {
                  return (
                    <tr>
                      <th scope="row">{key + 1}</th>
                      <td>{item.product_name}</td>
                      <td>{item.qty}</td>
                      <td>{this.formatRupiah(item.total_price)}</td>
                    </tr>
                  );
                })}
                <tr>
                  <th scope="row">Total</th>
                  <td></td>
                  <td></td>
                  <td>
                    <strong>
                      {" "}
                      {this.formatRupiah(this.state.totalBelanja)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <BackHome></BackHome>
        </div>
      );
    }
  }
}

export default connect(
  "search, is_login, token, host",
  actions
)(DetailTransactionAdmin);
