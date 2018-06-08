import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import LoginApp from './login/loginApp.js';
import HomeApp from "./home/homeApp.js"
import ProfileApp from './profile/profileApp.js';

import registerServiceWorker from './registerServiceWorker';

class BlogApp extends Component {
  constructor() {
    super();
    this.state = {
      userId: undefined,
      userName: undefined,
    };
    this.Login = this.Login.bind(this);
    this.Home = this.Home.bind(this);
    this.Profile = this.Profile.bind(this);
    this.NotFound = this.NotFound.bind(this);

    this.loginCallback = this.loginCallback.bind(this);
    this.loginAsGuest = this.loginAsGuest.bind(this);
  }

  Login = () => <LoginApp loginCallback={this.loginCallback} loginAsGuest={this.loginAsGuest}/>
  Home = () => <HomeApp userName={this.state.userName} userId={this.state.userId}/>
  Profile = ({ match }) => <ProfileApp userName={this.state.userName} userId={this.state.userId} match={match}/>
  NotFound = () => <div>404 page not found</div>

  loginCallback(res){
    if(res.status != "unknown"){
      let user = res;
      this.state.userId = res.id;
      this.state.userName = res.name
      this.setState({
        userId: this.state.userId,
        userName: this.state.userName,
      });
      axios.post("/api/login", {user});
    }
  }

  loginAsGuest(){
    let user = {
      id: '0',
      name: "貓",
    };
    this.state.userId = '0';
    this.state.userName = "貓";
    this.setState({
      userId: this.state.userId,
      userName: this.state.userName,      
    })
    axios.post("/api/login", { user });
  }

  render(){

    let BlogRouter;

    if(this.state.userId === undefined ){
      BlogRouter = (
        <Switch>
          <Route path="/" component={this.Login} />
        </Switch>
      );
    }
    else{
      BlogRouter = (<Switch>
        <Route exact path="/" component={this.Home} />
        <Route exact path="/login" component={this.Home} />
        <Route exact path="/home" component={this.Home} />
        <Route exact path="/profile/id/:id" component={this.Profile} />
        <Route exact path="/profile/id/:id/photo/:photoid" component={this.Profile} />
        <Route component={this.NotFound} />
      </Switch>);
    }

    return(
      <div>
        <BrowserRouter>
          {BlogRouter}
        </BrowserRouter>
      </div>
    );   
  }
}

ReactDOM.render(<BlogApp />, document.getElementById('root'));

registerServiceWorker();
