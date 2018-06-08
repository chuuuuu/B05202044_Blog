import React, { Component } from "react";
import "./homeApp.css"
import UserBarApp from "../util/userBarApp";
import profile from "./adorable-animal-cat-20787_ld.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
class HomeApp extends Component {
  constructor() {
    super();
    this.state = {
      imgs: [],
      imgSelected: undefined,
      selectedId: "",
      selectedName: "",
      overlayStyle: {
        height: "0%",
      },
    };
    this.imgs = [];
    this.imgOnClick = this.imgOnClick.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
  }

  componentWillMount() {
    axios
      .get("/api/home")
      .then((res) => {
        this.state.imgs = res.data.imgs;
        this.setState({
          imgs: this.state.imgs,
        })
      }
      );
  }

  imgOnClick(imgSelected, pid){
    axios
      .get("/api/photo/" + pid)
      .then((res) => {
        this.state.overlayStyle = {
          height: "100%",
        };
        this.state.imgSelected = "/" + imgSelected;

        document.getElementById("textSelected").innerHTML = res.data.content;
        this.state.selectedId = res.data.id;
        this.state.selectedName = res.data.name;

        this.setState({
          imgSelected: this.state.imgSelected,
          overlayStyle: this.state.overlayStyle,
        });
        setTimeout(() => window.addEventListener('click', this.clickEvent), 10);
      })
  }
  
  clickEvent(e){
    if (!document.getElementById('imgSelected').contains(e.target) && !document.getElementById('imgInfo').contains(e.target)) {
      // not click the image
      this.state.overlayStyle = {
        height: "0%",
      };
      this.setState({
        overlayStyle: this.state.overlayStyle,
      });
      setTimeout(() => window.removeEventListener("click", this.clickEvent), 10);
    }
 }

  render() {
    let divs = this.state.imgs.map((img) => {
      return (
        <div className="profile-pic-div">
          <img src={"/small/" + img.photo} onClick={() => { this.imgOnClick(img.photo, img.pid) }}></img>
        </div>
      )
    })

    return (
      <div className="home">
        <div className="home-overlay" style={this.state.overlayStyle}>
          <div id="imgSelected" className="home-overlay-img-div">
            <img src={this.state.imgSelected} />
          </div>
          <div id="imgInfo" className="home-overlay-info-div">
            <div className="profile-overlay-info-profile">
              <div className="profile-overlay-info-profile-div">
                <img src={profile} />
              </div>
              <div className="profile-overlay-info-profile-name">
                <Link to={"/profile/id/" + this.state.selectedId} >{this.state.selectedName}</Link>
              </div>
            </div>
            <div className="home-overlay-info-content">
              <div>
                <div id="textSelected" />
              </div>
            </div>
          </div>
        </div>

        <UserBarApp userName={this.props.userName} userId={this.props.userId}/>
        <div className="home-background">
          {divs}
        </div>
      </div>
    );
  }
}

// const mystyle = {
//     width: "100px",
// }
export default HomeApp;
