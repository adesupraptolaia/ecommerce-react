import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";
import BackHomeClient from "../../BackHome/backhomeclient";

class DetailTransaction extends React.Component {
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
        `/transactiondetail?transaction_id=${this.props.match.params.id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
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
  };

  render() {
    if (localStorage.hasOwnProperty("client-token")) {
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
                      <td>Rp. {item.total_price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <BackHomeClient></BackHomeClient>
        </div>
      );
    }
  }
}

export default connect(
  "search, is_login, token, host",
  actions
)(DetailTransaction);
