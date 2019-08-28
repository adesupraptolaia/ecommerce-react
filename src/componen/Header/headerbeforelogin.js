import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../store";
import "../../Style/css/ui.css";
import "../../Style/css/responsive.css";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";

class Header1 extends React.Component {
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
                <Link className="nav-link" to="#">
                  Contact
                </Link>
              </li>

              <li className="nav-item border border-primary rounded ml-2">
                <Link className="nav-link" to="/signin">
                  Masuk
                </Link>
              </li>
              <li className="nav-item border border-primary rounded ml-2">
                <Link className="nav-link" to="/signup/1">
                  Daftar
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
  "search, is_login",
  actions
)(Header1);
