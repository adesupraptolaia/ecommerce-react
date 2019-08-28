import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";
import BackHome from "../../BackHome/backhome";

class DetailTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTransaction: [],
      totalBelanja: 0
    };
  }

  componentDidMount = async () => {
    // MENAPILKAN DAFTAR BARANG DI CART
    const req = {
      method: "get",
      url: this.props.host + `/transaction/admin`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("admin-token")
      }
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        self.setState({ listTransaction: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let i in this.state.listTransaction) {
      this.setState({
        totalBelanja:
          this.state.totalBelanja + this.state.listTransaction[i].total_price
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
          <div style={{ overflow: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id Client</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listTransaction.map((item, key) => {
                  return (
                    <tr>
                      <th scope="row">{key + 1}</th>
                      <td>{item.client_id}</td>
                      <td>{item.createdAt}</td>
                      <td> {this.formatRupiah(item.total_price)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            this.props.history.push(
                              `/transaction/detail/admin/${item.id}`
                            );
                          }}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tr>
                <th scope="row">Total</th>
                <td></td>
                <td></td>
                <td>
                  <strong> {this.formatRupiah(this.state.totalBelanja)}</strong>
                </td>
              </tr>
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
)(DetailTransaction);
