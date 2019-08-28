import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../../store";
import "../../../Style/css/ui.css";
import "../../../Style/css/responsive.css";
import axios from "axios";
import BackHome from "../../BackHome/backhome";

class EditProduct extends React.Component {
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
    this.state = {
      listProduct: []
    };
  }

  componentDidMount = async sport => {
    const self = this;
    const req = {
      method: "get",
      url: `${this.props.host}/product/${this.props.match.params.id}`
    };
    axios(req)
      .then(function(response) {
        self.setState({ listProduct: response.data });
      })
      .catch(function(error) {
        console.log("HAHAHAHAHA", error);
      });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const self = this;
    const req = {
      method: "put",
      url: `${this.props.host}/product/${this.props.match.params.id}`,
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
      .then(function(response) {
        self.props.history.push("/listproduct");
        alert("Product Berhasil Diperbarui");
      })
      .catch(error => console.log("error ", error));
  };

  render() {
    // KHUSUS ADMIN
    if (localStorage.hasOwnProperty("admin-token")) {
      return (
        <div className="container">
          <h3>Edit Barang</h3>
          {/* DETAIL BARANG --- ATAS ----- */}
          <div className="card">
            <div className="row no-gutters">
              {/* KIRI */}
              <div className="col-md-6 col-sm-12 col-xs-12">
                <article className="p-5">
                  {/* NAMA PRODUCT */}
                  <h3 className="title mb-3">{this.state.listProduct.name}</h3>
                  <hr />
                  {/* DETAIL BARANG */}
                  <div>Kategori Barang : {this.state.listProduct.category}</div>
                  <hr />
                  <div>Link Gambar : {this.state.listProduct.image}</div>
                  <hr />
                  <div>
                    Harga Sebelum Diskon : {this.state.listProduct.price}
                  </div>
                  <hr />
                  <div>Diskon : {this.state.listProduct.discount}</div>
                  <hr />
                  <div>Stock : {this.state.listProduct.stock}</div>
                  <hr />
                  {/* DESKRIPSI */}
                  <dl>
                    <dt>Description</dt>
                    <dd>
                      <p>{this.state.listProduct.description} </p>
                    </dd>
                  </dl>
                  {/* TOMBOL */}
                </article>
              </div>
              {/* EDIT BARANG */}

              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div className="card">
                  <header className="card-header">
                    <h4 className="card-title mt-2">
                      Masukkan Perubahan Data Barang
                    </h4>
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
                          defaultValue={this.state.listProduct.name}
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
                          defaultValue={this.state.listProduct.category}
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
                          defaultValue={this.state.listProduct.image}
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
                          defaultValue={this.state.listProduct.price}
                          ref={this.price}
                          required
                        />
                      </div>
                      {/* DISKON */}
                      <div className="form-group">
                        <label>Diskon</label>
                        <input
                          className="form-control"
                          defaultValue={this.state.listProduct.discount}
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
                          placeholder=""
                          defaultValue={this.state.listProduct.stock}
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
                        >
                          {this.state.listProduct.description}
                        </textarea>
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
        </div>
      );
    }
    // JIKA BUKAN ADMIN
    else {
      return (
        <div>
          <BackHome></BackHome>
        </div>
      );
    }
  }
}

export default connect(
  "host",
  actions
)(EditProduct);
