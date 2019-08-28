import React from "react";
import { Link } from "react-router-dom";

export default class BackHome extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <div className="card">
              <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">DENIED</h4>
                <hr />
                <p className="text-success text-center">
                  Fitur ini hanya tersedia untuk admin
                </p>
                <Link to="/">
                  <button type="submit" className="btn btn-primary btn-block">
                    {" "}
                    Home{" "}
                  </button>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
