import React, { Component } from "react";
import "./userBarApp.css"
import { Link } from "react-router-dom";

class UserBarApp extends Component {

  render(){
    return(
      <div className="user-bar">
        <div className="user-btn">
          <Link className="user-btn-btn" to="/home">Horn Blog</Link>
        </div>

        <div className="user-btn">
          <Link className="user-btn-btn" to={"/profile/id/"+this.props.userId}>{this.props.userName}</Link>
          <Link className="user-btn-btn" to="/logout">Logout</Link>
        </div>
      </div>
    );
  }
}

export default UserBarApp;