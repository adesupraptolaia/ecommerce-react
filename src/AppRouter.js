import React, { Component } from "react";
import MainRoute from "./MainRoute.js";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "./store";

import Header1 from "./componen/Header/headerbeforelogin";
import HeaderClient from "./componen/Header/headerclientafterlogin";
import HeaderAdmin from "./componen/Header/headeradminafterlogin";
import Footer from "./componen/Footer/footer";

class Apps extends Component {
  postSignout = () => {
    this.props.postLogout();
    this.props.history.push("/");
  };
  render() {
    if (localStorage.hasOwnProperty("client-token")) {
      return (
        <div className="app">
          <HeaderClient />
          <MainRoute />
          <Footer />
        </div>
      );
    } else if (localStorage.hasOwnProperty("admin-token")) {
      return (
        <div className="app">
          <HeaderAdmin />
          <MainRoute />
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="app">
          <Header1 />
          <MainRoute />
          <Footer />
        </div>
      );
    }
  }
}

export default connect(
  "is_login",
  actions
)(withRouter(Apps));
