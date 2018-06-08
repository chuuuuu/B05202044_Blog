import React, { Component } from "react";
import "./profileApp.css"
import UserBarApp from "../util/userBarApp";
import axios from "axios";
import profile from "./adorable-animal-cat-20787_ld.jpg";
import { read } from "fs";
import { Link } from "react-router-dom";
class ProfileApp extends Component {
    constructor() {
    super();
    this.state = {
      name: "loading",
      imgs: [],
      imgSelected: undefined,
      selectedId: "",
      selectedName: "",
      overlayStyle: {
        height: "0%",
      },
      uploadStage: "uploadImg",
      uploadImg: "#",
    };
    this.imgOnClick = this.imgOnClick.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.post = this.post.bind(this);
    this.postForm = undefined;
    this.imgUrl = "";
    //delete it
  }

  componentWillMount(){
    if (this.props.match.params.id == 0){}
    axios
      .get("/api/profile/" + this.props.match.params.id)
      .then((res) => {
        console.log(res);
        this.state.imgs = res.data.imgs;
        this.state.name = res.data.name;
        this.setState({
          imgs: this.state.imgs,
          name: this.state.name,
        })
      }
    );
  }

  imgOnClick(imgSelected, pid){
    axios
      .get("/api/photo/"+pid)
      .then((res)=>{
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

  uploadImg(e){
    let reader = new FileReader();
    this.state.uploadStage = "uploadContent";
    this.state.uploadImg = e.target.files[0];

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      this.imgUrl = reader.result;

      this.setState({
        uploadStage: this.state.uploadStage,
        uploadImg: this.state.uploadImg,
      })
    }

  }

  post(e){
    let postBlock = document.getElementById("postBlock");
    var file = new FormData();
    file.append("photo", this.state.uploadImg);
    file.append("content", postBlock.innerHTML);
    const config = {
      headers: { 
        'content-type': 'multipart/form-data',
      }
    }

    axios
      .post("/api/upload/" + this.props.match.params.id, file, config)
      .then((res)=>{
        this.state.imgs.unshift({
          photo: res.data.imgPath,
          pid: res.data.pid,
        });
        this.setState({
          uploadStage: "uploadImg",
        })
      }
    )
  }

  render() {
    let divs = this.state.imgs.map((img) => {
      return (
        <div className="profile-pic-div">
          <img src={"/small/"+img.photo} onClick={() => { this.imgOnClick(img.photo, img.pid) }}></img>
        </div>
      )
    })

    let postBtn;
    if(this.props.match.params.id == this.props.userId){
      if(this.state.uploadStage == "uploadImg"){
        postBtn = (<div className="post-block">
          <label className="post-btn-div">
            <div className="post-btn" >
              <input type="file" onChange={this.uploadImg} />
              <i></i>Post Something New!
          </div>
          </label>
        </div>);        
      }
      else if(this.state.uploadStage == "uploadContent"){
        postBtn = (
          <div>
            <div className="post-block">
              <label className="post-block-label">
                <div>
                  <input type="file" onChange={this.uploadImg} />
                  <i></i>              <img src={this.imgUrl} />

                </div>
              </label>
              <div className="post-content-div">
                <div className="post-content-bar">
                  Write Something!
                </div>
                <div id="postBlock" className="post-content" contentEditable="true" />
              </div>
            </div>
            <div className="post-submit-block" onClick={this.post}>
              <div>
                POST IT!
              </div>
            </div>
          </div>
        );        
      }
    }

    return (
      <div className="profile">
        <div className="profile-overlay" style={this.state.overlayStyle}>
          <div id="imgSelected" className="profile-overlay-img-div">
            <img src={this.state.imgSelected} />
          </div>
          <div id="imgInfo" className="profile-overlay-info-div">
            <div className="profile-overlay-info-profile">
              <div className="profile-overlay-info-profile-div">
                  <img src={profile} />
              </div>
              <div className="profile-overlay-info-profile-name">                             
                <Link to={"/profile/id/" + this.state.selectedId} >{this.state.selectedName}</Link>
              </div>
            </div>
            <div className="profile-overlay-info-content">
              <div>
                <div id="textSelected"/>
              </div>
            </div>
          </div>
        </div>

        <UserBarApp userName={this.props.userName} userId={this.props.userId}/>

        <div className="profile-main">
          <div className="profile-info-block">
            <div className="profile-profile">
              <img src={profile}/>
            </div>
            <div className="profile-info">
              <p id="id">{this.state.name}</p>
            </div>
          </div>

          {postBtn}

          <div className="profile-background">
            {divs}
          </div>
          
        </div>
      </div>
    );
  }
}

// const mystyle = {
//     width: "100px",
// }
export default ProfileApp;
