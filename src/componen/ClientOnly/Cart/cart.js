import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";
import BackHomeClient from "../../BackHome/backhomeclient";

class ListCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCart: [],
      totalBelanja: 0
    };
  }

  componentDidMount = async () => {
    // MENAPILKAN DAFTAR BARANG DI CART
    const req = {
      method: "get",
      url: this.props.host + "/cart",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        self.setState({ listCart: response.data });
        self.props.setCart(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let i in this.state.listCart) {
      this.setState({
        totalBelanja: this.state.totalBelanja + this.state.listCart[i].price
      });
    }
  };

  deleteProduct = async id => {
    // DELETE PRODUCT DI CART
    const req = {
      method: "delete",
      url: this.props.host + `/cart/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        alert("Product Berhasil Dihapus");
      })
      .catch(function(error) {
        console.log(error);
      });

    // MENGINPUT ULANG CART PRODUCT DI GLOBAL STATE
    const req2 = {
      method: "get",
      url: this.props.host + "/cart",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req2)
      .then(function(response) {
        self.setState({ listCart: response.data });
        self.props.setCart(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    // HITUNG ULANG TOTAL BELANJA
    this.setState({ totalBelanja: 0 });
    for (let i in this.state.listCart) {
      this.setState({
        totalBelanja: this.state.totalBelanja + this.state.listCart[i].price
      });
    }
  };

  checkOut = async () => {
    const self = this;
    const req = {
      method: "post",
      url: this.props.host + "/transaction",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req)
      .then(function(response) {
        if (response.data.status === "Habis") {
          alert("Salah satu Barang baru saja habis");
        } else {
          self.props.history.push(`/invoice/${response.data.id}`);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
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
      if (this.props.cartProduct.length === 0) {
        return (
          <div>
            <h1 style={{ textAlign: "center" }}>
              Tidak Ada Barang yang Ditampilkan
            </h1>
          </div>
        );
      } else {
        return (
          <div className="container">
            <h1>Keranjang</h1>
            {this.state.listCart.map((item, key) => {
              return (
                <div className="card mt-3">
                  <div className="row no-gutters">
                    {/* KIRI */}
                    <aside className="col-sm-4 border-right">
                      <article className="gallery-wrap">
                        <div className="img-big-wrap">
                          <div>
                            {/* GAMBAR */}
                            <img
                              src={item.product_image}
                              style={{
                                width: "100%",
                                height: "100%",
                                maxHeight: "450px",
                                maxWidth: "550px"
                              }}
                              alt="product gambar"
                            />
                          </div>
                        </div>
                      </article>
                    </aside>
                    {/* KANAN */}
                    <aside className="col-sm-8">
                      <article className="p-5">
                        {/* NAMA PRODUCT */}
                        <h3 className="title mb-3">{item.product_name}</h3>
                        {/* HARGA */}
                        <hr />
                        Harga Satuan :
                        <var
                          className="price"
                          style={{ color: "blue", fontSize: "medium" }}
                        >
                          <span className="num">
                            {this.formatRupiah(item.price / item.qty)}
                          </span>
                        </var>
                        <hr />
                        Banyak Barang :
                        <var
                          className="price"
                          style={{ color: "blue", fontSize: "medium" }}
                        >
                          <span className="num">{item.qty}</span>
                        </var>
                        <hr />
                        SubTotal :
                        <var
                          className="price"
                          style={{ color: "blue", fontSize: "medium" }}
                        >
                          <span className="num">
                            {this.formatRupiah(item.price)}
                          </span>
                        </var>
                        <hr />
                        {/* TOMBOL HAPUS */}
                        <button
                          onClick={() => this.deleteProduct(item.cart_id)}
                          className="btn  btn-primary"
                        >
                          {" "}
                          Delete{" "}
                        </button>
                      </article>
                    </aside>
                  </div>
                </div>
              );
            })}
            <div className="row justify-content-between">
              <div className="col-5">
                <h4 style={{ textAlign: "left" }}>Total:</h4>
              </div>
              <div className="col-5">
                <h4 style={{ textAlign: "right", color: "red" }}>
                  {this.formatRupiah(this.state.totalBelanja)}
                </h4>
              </div>
            </div>
            <div className="row justify-content-end">
              <button
                onClick={() => this.checkOut()}
                type="button"
                className="btn btn-primary"
              >
                Check Out
              </button>
            </div>
          </div>
        );
      }
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
  "search, is_login, cartProduct, host",
  actions
)(ListCart);
