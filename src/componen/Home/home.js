import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../store";
import "../../Style/css/style.css";
import axios from "axios";
import soldout from "../../img/soldout.png";
import { Link } from "react-router-dom";

class Home extends React.Component {
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

  kategori = async e => {
    const self = this;
    const req = {
      method: "get",
      url: this.props.host + `/product?category=${e}`
    };
    await axios(req)
      .then(function(response) {
        self.setState({ listProduct: response.data });
      })
      .catch(function(error) {
        console.log("HAHAHAHAHA", error);
      });
  };

  wishlist = async e => {
    const req = {
      method: "post",
      url: this.props.host + "/wishlist",
      data: { product_id: `${e}` },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("client-token")
      }
    };
    await axios(req)
      .then(function(response) {
        alert("Product Berhasil Ditambahkan");
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
    return (
      <div>
        <div className="container-fluid bg-light">
          {/* CAROUSEL */}
          <div className="row justify-content-center bg-dark">
            <div className="col-12">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active bg-1" />
                  <div className="carousel-item bg-2">=</div>
                  <div className="carousel-item bg-3" />
                </div>
                <Link
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </Link>
                <Link
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </Link>
              </div>
            </div>
          </div>

          {/* END CAROUSEL */}

          <div className="container">
            <div className="row">
              {/*SIDE LEFT  */}

              <div className="col-lg-3">
                <h1 className="my-4">Hai Phone</h1>
                <div className="list-group">
                  <Link
                    onClick={() => this.componentDidMount()}
                    className="list-group-item"
                  >
                    Semua Product
                  </Link>
                  <Link
                    onClick={() => this.kategori("iphone")}
                    className="list-group-item"
                  >
                    I-phone
                  </Link>
                  <Link
                    onClick={() => this.kategori("samsung")}
                    className="list-group-item"
                  >
                    Samsung
                  </Link>
                  <Link
                    onClick={() => this.kategori("xiaomi")}
                    className="list-group-item"
                  >
                    Xiaomi
                  </Link>
                  <Link
                    onClick={() => this.kategori("oppo")}
                    className="list-group-item"
                  >
                    Oppo
                  </Link>
                </div>
              </div>

              {/* SIDE RIGHT */}
              <div className="col-lg-9">
                <div className="row style_featured">
                  {/* START ITERASI */}
                  {this.state.listProduct.map((item, key) => {
                    // JIKA HARGA TIDAK DISKON
                    if (item.discount === 0) {
                      return (
                        <div className="col-md-4 mt-2">
                          <div>
                            {/* GAMBAR */}
                            <img
                              src={item.stock === 0 ? soldout : item.image}
                              alt={item.name}
                              className="img-rounded img-thumbnail"
                              style={{ minHeight: "250px" }}
                            />
                            {/* NAMA PRODUCT */}
                            <h3
                              style={{
                                textAlign: "left",

                                fontSize: "18px",
                                fontWeight: "600",
                                lineHeight: "19px",
                                overflow: "hidden",
                                color: "#4c4c4c"
                              }}
                            >
                              {item.name}
                            </h3>
                            {/* HARGA SETELAH DISKON */}
                            <p
                              style={{
                                display: "block",
                                textAlign: "left",
                                fontSize: "15px",
                                fontWeight: "600",
                                color: "#ff5722",
                                marginTop: "23px"
                              }}
                            >
                              <span
                                className="fa fa-info-circle"
                                style={{ textDecoration: "line-through" }}
                              />{" "}
                              {this.formatRupiah(item.price_after_discount)}
                            </p>

                            {/* TOMBOL DETAIL */}

                            <Link
                              onClick={() =>
                                this.props.history.push(`/product/${item.id}`)
                              }
                              className="btn btn-primary"
                              title="More"
                            >
                              Details »
                            </Link>
                            {/* TOMBOL WISHLIST */}

                            <button
                              onClick={() => this.wishlist(item.id)}
                              className="btn btn-primary"
                              title="More"
                            >
                              Add to Wishlist»
                            </button>
                          </div>
                        </div>
                      );
                    }
                    // JIKA HARGA DISKON
                    else {
                      return (
                        <div className="col-md-4 mt-2">
                          <div>
                            {/* GAMBAR */}
                            <img
                              style={{ minHeight: "250px" }}
                              src={item.stock === 0 ? soldout : item.image}
                              alt={item.name}
                              className="img-rounded img-thumbnail"
                            />
                            {/* NAMA PRODUCT */}
                            <h3
                              style={{
                                display: "block",
                                textAlign: "left",
                                fontSize: "18px",
                                fontWeight: "600",
                                lineHeight: "19px",
                                overflow: "hidden",
                                color: "#4c4c4c"
                              }}
                            >
                              {item.name}
                            </h3>
                            {/* HARGA SEBELUM DISKON */}

                            <p
                              style={{
                                display: "block",
                                textAlign: "left",
                                fontSize: "14px",
                                fontWeight: "300",
                                color: "#929292",
                                textDecoration: "line-through",
                                marginTop: "23px"
                              }}
                            >
                              <span className="fa fa-info-circle" />
                              {this.formatRupiah(item.price)}
                            </p>

                            {/* HARGA SETELAH DISKON */}
                            <p
                              style={{
                                display: "block",
                                textAlign: "left",
                                fontSize: "15px",
                                fontWeight: "600",
                                color: "#ff5722",
                                marginTop: "-10px"
                              }}
                            >
                              <span
                                className="fa fa-info-circle"
                                style={{ textDecoration: "line-through" }}
                              />
                              {this.formatRupiah(item.price_after_discount)}
                              <var
                                style={{
                                  color: "white",
                                  fontWeight: "300",
                                  fontSize: "13px",
                                  marginRight: "1rem",
                                  backgroundColor: "#d0011b"
                                }}
                              >
                                <span className="num">
                                  {item.discount}% OFF
                                </span>
                              </var>
                            </p>
                            {/* TOMBOL DETAIL */}
                            <Link
                              onClick={() =>
                                this.props.history.push(`/product/${item.id}`)
                              }
                              className="btn btn-primary"
                              title="More"
                            >
                              Details »
                            </Link>
                            {/* TOMBOL WISHLIST */}

                            <button
                              onClick={() => this.wishlist(item.id)}
                              className="btn btn-primary"
                              title="More"
                            >
                              Add to Wishlist»
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
                  {/* END ITERSI */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "search, is_login, cartProduct, host",
  actions
)(Home);
