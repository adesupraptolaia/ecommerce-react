import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../store";
import "../../Style/css/style.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Your Website 2019
          </p>
        </div>
        {/* <!-- /.container --> */}
      </footer>
    );
  }
}

export default connect(
  "search, is_login",
  actions
)(Footer);
