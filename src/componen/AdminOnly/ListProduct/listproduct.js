import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";
import BackHome from "../../BackHome/backhome";

class ListProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: []
    };
  }

  componentDidMount = async () => {
    const req = {
      method: "get",
      url: this.props.host + "/product"
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        self.setState({ listProduct: response.data });
      })
      .catch(function(error) {
        console.log("HAHAHAHAHA", error);
      });
  };

  deleteProduct = async id => {
    const req = {
      method: "delete",
      url: this.props.host + `/product/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("admin-token")
      }
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        alert("Product Berhasil Dihapus");
      })
      .catch(function(error) {
        console.log("HAHAHAHAHA", error);
      });

    const req2 = {
      method: "get",
      url: this.props.host + "/product"
    };
    await axios(req2)
      .then(function(response) {
        self.setState({ listProduct: response.data });
      })
      .catch(function(error) {
        console.log("HAHAHAHAHA", error);
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
    if (localStorage.hasOwnProperty("admin-token")) {
      return (
        <div className="container">
          {this.state.listProduct.map((item, key) => {
            // JIKA HARGA TIDAK DISKON
            if (item.discount === 0) {
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
                              src={item.image}
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
                        <h3 className="title mb-3">{item.name}</h3>
                        {/* HARGA */}
                        <div className="mb-3">
                          {/* HARGA SETELAH DISKON */}
                          <var
                            className="price h3"
                            style={{ color: "#ff5722" }}
                          >
                            <span className="num">
                              {this.formatRupiah(item.price_after_discount)}
                            </span>
                          </var>
                        </div>
                        {/* DESKRIPSI */}
                        <dl>
                          <dt>Description</dt>
                          <dd>
                            <p>{item.description} </p>
                          </dd>
                        </dl>

                        <hr />
                        {/* STOCK dan DISKON */}
                        <div>Diskon : {item.discount}</div>
                        <hr />
                        <div>Stock : {item.stock}</div>
                        <hr />
                        {/* TOMBOL EDIT */}
                        <button
                          onClick={() =>
                            this.props.history.push(`/editproduct/${item.id}`)
                          }
                          className="btn  btn-primary mr-3"
                        >
                          {" "}
                          Edit{" "}
                        </button>
                        {/* TOMBOL HAPUS */}
                        <button
                          onClick={() => this.deleteProduct(item.id)}
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
            } else {
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
                              src={item.image}
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
                        <h3 className="title mb-3">{item.name}</h3>
                        {/* HARGA */}
                        <div className="mb-3">
                          {/* HARGA DISKON */}
                          <var
                            className="price h3"
                            style={{
                              textDecoration: "line-through",
                              color: "#4c4c4c",
                              fontWeight: "300",
                              fontSize: "20px",
                              marginRight: "1rem"
                            }}
                          >
                            <span className="num">
                              {this.formatRupiah(item.price)}
                            </span>
                          </var>
                          {/* HARGA SETELAH DISKON */}
                          <var
                            className="price h3"
                            style={{ color: "#ff5722" }}
                          >
                            <span className="num">
                              {this.formatRupiah(item.price_after_discount)}
                            </span>
                          </var>
                          {/* BESARAN DISKON */}
                          <var
                            style={{
                              color: "white",
                              fontWeight: "300",
                              fontSize: "13px",
                              marginRight: "1rem",
                              backgroundColor: "#d0011b"
                            }}
                          >
                            <span className="num">{item.discount}% OFF</span>
                          </var>
                        </div>
                        {/* DESKRIPSI */}
                        <dl>
                          <dt>Description</dt>
                          <dd>
                            <p>{item.description} </p>
                          </dd>
                        </dl>

                        <hr />

                        {/* STOCK dan DISKON */}
                        <div>Diskon : {item.discount}</div>
                        <hr />
                        <div>Stock : {item.stock}</div>
                        <hr />
                        {/* TOMBOL EDIT */}
                        <button
                          onClick={() =>
                            this.props.history.push(`/editproduct/${item.id}`)
                          }
                          className="btn  btn-primary mr-3"
                        >
                          {" "}
                          Edit{" "}
                        </button>
                        {/* TOMBOL HAPUS */}
                        <button
                          onClick={() => this.deleteProduct(item.id)}
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
            }
          })}
        </div>
      );
    } else {
      return (
        <div>
          <BackHome />;
        </div>
      );
    }
  }
}

export default connect(
  "search, is_login, token, host",
  actions
)(ListProduct);
