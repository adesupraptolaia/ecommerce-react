import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";
import BackHomeClient from "../../BackHome/backhomeclient";

class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listWishlist: []
    };
  }

  componentDidMount = async () => {
    // MENAPILKAN DAFTAR BARANG DI Wishlist
    const req = {
      method: "get",
      url: this.props.host + "/wishlist",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        self.setState({ listWishlist: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  deleteProduct = async id => {
    // DELETE PRODUCT DI CART
    const req = {
      method: "delete",
      url: this.props.host + `/wishlist/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req)
      .then(function(response) {
        alert("Product Berhasil Dihapus");
      })
      .catch(function(error) {
        console.log(error);
      });

    // MEMPERBARUI LIST BARANG
    const req2 = {
      method: "get",
      url: this.props.host + "/wishlist",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    const self = this;
    await axios(req2)
      .then(function(response) {
        self.setState({ listWishlist: response.data });
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
      if (this.state.listWishlist.length === 0) {
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
            <h1>Wishlist</h1>
            {this.state.listWishlist.map((item, key) => {
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
                        Harga :
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
                          onClick={() => this.deleteProduct(item.id)}
                          className="btn  btn-primary"
                        >
                          {" "}
                          Delete{" "}
                        </button>
                        {/* TOMBOL DETAIL */}
                        <button
                          onClick={() =>
                            this.props.history.push(
                              `/product/${item.product_id}`
                            )
                          }
                          className="btn  btn-primary"
                        >
                          {" "}
                          Detail{" "}
                        </button>
                      </article>
                    </aside>
                  </div>
                </div>
              );
            })}
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
)(Wishlist);
