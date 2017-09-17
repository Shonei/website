import React, { Component } from 'react';
// import './404.css';

class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="card purple lighten-4">
          <div className="card-content">
            <h1 className="center-align">404</h1>
          </div>
          <div className="card-image">
          </div>
          <div className="card-action">
            <p className="return center-align">Take me back to <a href="/">My awesome creation</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound;