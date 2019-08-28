import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../store";
import "../../Style/css/ui.css";
import "../../Style/css/responsive.css";
import axios from "axios";
import { Link } from "react-router-dom";
import outOfStock from "../../img/habis.png";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.number = React.createRef();
    this.state = {
      listProduct: [],
      number: 1
    };
  }

  componentDidMount = async () => {
    const self = this;
    const req = {
      method: "get",
      url: this.props.host + `/product/${this.props.match.params.id}`
    };
    axios(req)
      .then(function(response) {
        self.setState({ listProduct: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    // UPDATE DATA CART
    const req2 = {
      method: "get",
      url: this.props.host + "/cart",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req2)
      .then(function(response) {
        self.props.setCart(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleNumber = e => {
    this.setState({ number: e.target.value });
  };

  buyNow = async () => {
    const self = this;
    const req = {
      method: "post",
      url: this.props.host + "/cart",
      data: {
        product_id: this.props.match.params.id,
        qty: this.state.number
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req)
      .then(function(response) {
        if (response.data.status === "Stock not enough") {
          alert("Stock Barang Tidak Cukup");
        } else {
          self.props.history.push("/cart");
        }
      })
      .catch(error => alert(error));
  };

  addToCart = async () => {
    // TAMBAHKAN BARANG KE CART
    const self = this;
    const req = {
      method: "post",
      url: this.props.host + "/cart",
      data: {
        product_id: this.props.match.params.id,
        qty: this.state.number
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req)
      .then(function(response) {
        if (response.data.status === "Stock not enough") {
          alert("Stock Barang Tidak Cukup");
        } else {
          alert("Barang Berhasil Ditambahkan");
        }
      })
      .catch(error => alert(error));

    // INPUT DATA CART KE GLOBAL STATE
    const req2 = {
      method: "get",
      url: this.props.host + "/cart",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req2)
      .then(function(response) {
        self.props.setCart(response.data);
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
    if (parseInt(this.state.listProduct.stock) === 0) {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
              <img src={outOfStock} className="card-img-top" alt="Habis" />
              <div className="card-body">
                <h5 className="card-title">KOSONG</h5>
                <p className="card-text">
                  Mohon Maaf Stock Barang Baru Saja Habis
                </p>
                <Link to="/" className="btn btn-primary">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.listProduct.discount === 0) {
      return (
        <div className="container">
          <h1>PRODUCT DETAIL</h1>
          <div className="card">
            <div className="row no-gutters">
              {/* KIRI */}
              <aside className="col-sm-4 border-right">
                <article className="gallery-wrap">
                  <div className="img-big-wrap">
                    <div>
                      {/* GAMBAR */}
                      <img
                        src={this.state.listProduct.image}
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
                  <h3 className="title mb-3">{this.state.listProduct.name}</h3>
                  {/* HARGA */}
                  <div className="mb-3">
                    {/* HARGA SETELAH DISKON */}
                    <var
                      className="price h3"
                      style={{ color: "#ff5722", fontWeight: "600" }}
                    >
                      <span className="num">
                        {this.formatRupiah(
                          this.state.listProduct.price_after_discount
                        )}
                      </span>
                    </var>
                  </div>
                  {/* DESKRIPSI */}
                  <dl>
                    <dt>Description</dt>
                    <dd>
                      <p>{this.state.listProduct.description} </p>
                    </dd>
                  </dl>

                  <hr />
                  {/* JUMLAH BARANG YANG INGIN DIBELI */}
                  <div className="row justify-content-between">
                    <div className="col-4">Jumlah</div>
                    <div className="col-4">
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        defaultValue="1"
                        onChange={this.handleNumber}
                      ></input>
                    </div>
                  </div>
                  <hr />
                  {/* TOTAL HARGA BARANG */}
                  <div className="row justify-content-between">
                    <div className="col-4">SubTotal</div>
                    <div className="col-4">
                      <strong>
                        {this.formatRupiah(
                          this.state.listProduct.price_after_discount *
                            this.state.number
                        )}
                      </strong>
                    </div>
                  </div>
                  <hr />

                  {/* TOMBOL */}
                  <button
                    onClick={() => this.buyNow()}
                    className="btn  btn-primary mr-3"
                  >
                    {" "}
                    Buy now{" "}
                  </button>
                  <button
                    onClick={() => this.addToCart()}
                    className="btn  btn-primary"
                  >
                    {" "}
                    Add to Cart{" "}
                  </button>
                </article>
              </aside>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Detail Product</h1>
          <div className="card">
            <div className="row no-gutters">
              {/* KIRI */}
              <aside className="col-sm-4 border-right">
                <article className="gallery-wrap">
                  <div className="img-big-wrap">
                    <div>
                      {/* GAMBAR */}
                      <img
                        src={this.state.listProduct.image}
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
                  <h3 className="title mb-3">{this.state.listProduct.name}</h3>
                  {/* HARGA */}
                  <div className="mb-3">
                    {/* HARGA SEBELUM DISKON */}
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
                        {this.formatRupiah(
                          parseInt(this.state.listProduct.price)
                        )}
                      </span>
                    </var>
                    {/* HARGA SETELAH DISKON */}
                    <var className="price h3" style={{ color: "#ff5722" }}>
                      <span className="num">
                        {this.formatRupiah(
                          parseInt(this.state.listProduct.price_after_discount)
                        )}
                      </span>
                    </var>
                    {/* BESARAN DISKON */}
                    <var
                      className="price h3"
                      style={{
                        color: "white",
                        fontWeight: "300",
                        fontSize: "13px",
                        marginRight: "1rem",
                        backgroundColor: "#d0011b"
                      }}
                    >
                      <span className="num">
                        {this.state.listProduct.discount}% OFF
                      </span>
                    </var>
                  </div>
                  {/* DESKRIPSI */}

                  <dl>
                    <dt>Description</dt>
                    <dd>
                      <p>{this.state.listProduct.description} </p>
                    </dd>
                  </dl>

                  <hr />
                  {/* JUMLAH BARANG YANG INGIN DIBELI */}
                  <div className="row justify-content-between">
                    <div className="col-4">Jumlah</div>
                    <div className="col-4">
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        defaultValue="1"
                        onChange={this.handleNumber}
                      ></input>
                    </div>
                  </div>
                  <hr />
                  {/* TOTAL HARGA BARANG */}
                  <div className="row justify-content-between">
                    <div className="col-4">SubTotal</div>
                    <div className="col-4">
                      <strong>
                        {this.formatRupiah(
                          this.state.listProduct.price_after_discount *
                            this.state.number
                        )}
                      </strong>
                    </div>
                  </div>
                  <hr />

                  {/* TOMBOL */}
                  <button
                    onClick={() => this.buyNow()}
                    className="btn  btn-primary mr-3"
                  >
                    {" "}
                    Buy now{" "}
                  </button>
                  <button
                    onClick={() => this.addToCart()}
                    className="btn  btn-primary"
                  >
                    {" "}
                    Add to Cart{" "}
                  </button>
                </article>
              </aside>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  "cartProduct, is_login, host",
  actions
)(Product);
