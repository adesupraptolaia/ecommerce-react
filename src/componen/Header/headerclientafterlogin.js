import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../store";
import "../../Style/css/ui.css";
import "../../Style/css/responsive.css";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import cart from "../../img/cart.png";

class Header2 extends React.Component {
  signOut = () => {
    alert("Anda telah Logout");
    localStorage.removeItem("client-token");
    localStorage.removeItem("client-id");
    localStorage.removeItem("transaction-id");
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="logo"
              width="50px"
              style={{ marginRight: "10px" }}
            />
            Hai Phone
          </Link>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Beranda
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <img src={cart} alt="keranjang"></img>(
                  {this.props.cartProduct.length})
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile/client">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transaction/client">
                  History
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
                  Wishlist
                </Link>
              </li>
              <li
                className="nav-item border border-primary rounded ml-2"
                onClick={() => this.signOut()}
              >
                <Link className="nav-link" to="/">
                  Keluar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  "search, is_login, cartProduct",
  actions
)(Header2);
