import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";
import BackHome from "../../BackHome/backhome";

class InputProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = React.createRef();
    this.description = React.createRef();
    this.category = React.createRef();
    this.image = React.createRef();
    this.price = React.createRef();
    this.discount = React.createRef();
    this.stock = React.createRef();
  }

  handleSubmit = async event => {
    event.preventDefault();

    const self = this;
    const req = {
      method: "post",
      url: this.props.host + "/product",
      data: {
        name: this.name.current.value,
        description: this.description.current.value,
        category: this.category.current.value,
        image: this.image.current.value,
        price: parseInt(this.price.current.value),
        discount: parseInt(this.discount.current.value),
        stock: parseInt(this.stock.current.value)
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("admin-token")
      }
    };
    await axios(req)
      .then(response => {
        self.props.history.push("/");
        alert(`Product Berhasil Ditambahkan`);
      })
      .catch(error => console.log("error ", error));
  };

  render() {
    // KHUSUS ADMIN
    if (localStorage.hasOwnProperty("admin-token")) {
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
              <div className="card">
                <header className="card-header">
                  <h4 className="card-title mt-2">Masukkan Data Barang</h4>
                </header>
                <article className="card-body">
                  {/*  */}
                  <form onSubmit={this.handleSubmit}>
                    {/* NAME */}
                    <div className="form-group">
                      <label>Nama Barang</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        ref={this.name}
                        required
                      />
                    </div>
                    {/* KATEGORY */}
                    <div className="form-group">
                      <label>Kategori</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        ref={this.category}
                        required
                      />
                    </div>
                    {/* LINK IMAGE */}
                    <div className="form-group">
                      <label>Link Gambar</label>
                      <input
                        className="form-control"
                        placeholder=""
                        ref={this.image}
                        required
                      />
                    </div>
                    {/* HARGA */}
                    <div className="form-group">
                      <label>Harga</label>
                      <input
                        className="form-control"
                        placeholder=""
                        ref={this.price}
                        required
                      />
                    </div>
                    {/* DISKON */}
                    <div className="form-group">
                      <label>Diskon</label>
                      <input
                        className="form-control"
                        defaultValue="0"
                        placeholder=""
                        ref={this.discount}
                        required
                      />
                    </div>
                    {/* STOCK */}
                    <div className="form-group">
                      <label>Stock</label>
                      <input
                        className="form-control"
                        defaultValue="1"
                        placeholder=""
                        ref={this.stock}
                        required
                      />
                    </div>
                    {/* DESKRIPSI */}
                    <div className="form-group">
                      <label>Deskripsi</label>
                      <textarea
                        className="form-control"
                        placeholder=""
                        ref={this.description}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        value="Submit"
                      >
                        {" "}
                        Submit{" "}
                      </button>
                    </div>
                    <small className="text-muted">
                      By clicking the 'Submit' button, you confirm that you
                      accept our <br /> Terms of use and Privacy Policy.
                    </small>
                  </form>
                </article>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // JIKA BUKAN ADMIN
    else {
      return (
        <div>
          <BackHome />
        </div>
      );
    }
  }
}

export default connect(
  "search, is_login, token, host",
  actions
)(InputProduct);
