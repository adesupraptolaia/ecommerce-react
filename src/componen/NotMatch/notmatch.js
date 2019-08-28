import React from "react";

class NotMatch extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
            <div className="card">
              <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">NOT MATCH</h4>
                <hr />
                <p className="text-success text-center">
                  Halaman yang anda tuju tidak ada
                </p>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Submit"
                  onClick={() => this.props.history.push("/")}
                >
                  {" "}
                  Home{" "}
                </button>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotMatch;
