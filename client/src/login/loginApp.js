import React, { Component } from "react";
import "./loginApp.css"
import FacebookLogin from 'react-facebook-login';

class LoginApp extends Component {
  render() {
    return (
      <div className="login-background">
        <div className="login-layer">
          <div className="login-block">
            <p>HornBLOG</p>
            <FacebookLogin
              appId="2130551010499780"
              autoLoad={true}
              fields="name,email,picture"
              callback={this.props.loginCallback} />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginApp;
