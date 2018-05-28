import React, { Component } from "react";
import "./homeApp.css"
import UserBarApp from "../util/userBarApp";

import photo1 from "./photos/ld/1.jpg";
import photo2 from "./photos/ld/2.jpg";
import photo3 from "./photos/ld/3.jpg";
import photo4 from "./photos/ld/4.jpg";
import photo5 from "./photos/ld/5.jpg";
import photo6 from "./photos/ld/6.jpg";
import photo7 from "./photos/ld/7.jpg";
import photo8 from "./photos/ld/8.jpg";
import photo9 from "./photos/ld/9.jpg";
import photo10 from "./photos/ld/10.jpg";
import photo11 from "./photos/ld/11.jpg";
import photo12 from "./photos/ld/12.jpg";
import photo13 from "./photos/ld/13.jpg";
import photo14 from "./photos/ld/14.jpg";
import photo15 from "./photos/ld/15.jpg";
import photo16 from "./photos/ld/16.jpg";
import photo17 from "./photos/ld/17.jpg";
import photo18 from "./photos/ld/18.jpg";
import photo19 from "./photos/ld/19.jpg";
import photo20 from "./photos/ld/20.jpg";
import photo21 from "./photos/ld/21.jpg";
import photo22 from "./photos/ld/22.jpg";
import photo23 from "./photos/ld/23.jpg";
import photo24 from "./photos/ld/24.jpg";
//all the photos are shaped into *400

import photo1_hd from "./photos/1.jpg";
import photo2_hd from "./photos/2.jpg";
import photo3_hd from "./photos/3.jpg";
import photo4_hd from "./photos/4.jpg";
import photo5_hd from "./photos/5.jpg";
import photo6_hd from "./photos/6.jpg";
import photo7_hd from "./photos/7.jpg";
import photo8_hd from "./photos/8.jpg";
import photo9_hd from "./photos/9.jpg";
import photo10_hd from "./photos/10.jpg";
import photo11_hd from "./photos/11.jpg";
import photo12_hd from "./photos/12.jpg";
import photo13_hd from "./photos/13.jpg";
import photo14_hd from "./photos/14.jpg";
import photo15_hd from "./photos/15.jpg";
import photo16_hd from "./photos/16.jpg";
import photo17_hd from "./photos/17.jpg";
import photo18_hd from "./photos/18.jpg";
import photo19_hd from "./photos/19.jpg";
import photo20_hd from "./photos/20.jpg";
import photo21_hd from "./photos/21.jpg";
import photo22_hd from "./photos/22.jpg";
import photo23_hd from "./photos/23.jpg";
import photo24_hd from "./photos/24.jpg";

let photos_hd =[photo1_hd, photo2_hd, photo3_hd, photo4_hd, photo5_hd, photo6_hd, photo7_hd, photo8_hd, photo9_hd, photo10_hd, photo11_hd, photo12,
  photo13_hd, photo14_hd, photo15_hd, photo16_hd, photo17_hd, photo18_hd, photo19_hd, photo20_hd, photo21_hd, photo22_hd, photo23_hd, photo24_hd]

class Img{
  constructor(photoid, photo){
    this.photoid = photoid;
    this.photo = photo;
  }
}

let photos = [new Img(1, photo1), new Img(2, photo2), new Img(3, photo3), new Img(4, photo4), new Img(5, photo5), new Img(6, photo6), new Img(7, photo7), new Img(8, photo8), new Img(9, photo9), new Img(10, photo10), new Img(11, photo11), new Img(12, photo12), new Img(13, photo13), new Img(14, photo14), new Img(15, photo15), new Img(16, photo16), new Img(17, photo17), new Img(18, photo18), new Img(19, photo19), new Img(20, photo20), new Img(21, photo21), new Img(22, photo22), new Img(23, photo23), new Img(24, photo24)]

class HomeApp extends Component {
  constructor() {
    super();
    this.state = {
      imgSelected: undefined,
      overlayStyle: {
        height: "0%",
      },
    };
    this.imgs = [];
    this.imgOnClick = this.imgOnClick.bind(this);
    this.clickEvent = this.clickEvent.bind(this);

    //delete it
    this.imgs = photos;
  }

  imgOnClick(imgSelected){
    this.state.overlayStyle = {
      height: "100%",
    };  
    this.state.imgSelected = photos_hd[parseInt(imgSelected)-1];
    this.setState({
      imgSelected: this.state.imgSelected,
      overlayStyle: this.state.overlayStyle,
    });
    setTimeout(() => window.addEventListener('click', this.clickEvent), 10);
  }
  
  clickEvent(e){
    if (!document.getElementById('imgSelected').contains(e.target)) {
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

    let divs = this.imgs.map((img) => {
      return (
        <div className="home-pic-div">
          <img src={img.photo} onClick={() => {this.imgOnClick(img.photoid)}}></img>
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
            <div className="home-overlay-info-home">
              <img />
              <p>name</p>
            </div>
            <div className="home-overlay-info-content">
              <p>
                送養文/台北市
                「皓皓」男生、橘貓，「卡蘿」女生、玳瑁
                106/03/14（柔柔的孩子）
                送養範圍 #盡量以台北市及新北市為主
                😺親人、親貓，有些膽小但摸摸、熟了可抱！
                ❤️同胎姊弟個性穩定穩定
                ●1歲多●已結紮、體內外驅蟲、快篩全過關
                ●貓目前在「台北市信義區」
                【認養6原則】：1.私訊後填寫問卷 2.預約與貓互動 3.家訪 4.安全措施 5.認養切結書 6.定期回傳貓咪生活照。

                【救援簡要】
                2017年3月8日接獲台北市東湖區愛媽通報的孕媽咪柔柔，志工 @Yueh-Hsiang Wang 、愛媽 Michelle 將她誘捕回並於醫院產檢後安置待產之後移至愛媽 @Yvonne Chen那兒中途，感謝愛媽無微不至的照顧這一家子。
                🐈四個孩子（皓皓、卡蘿、妞妞、哈娜、朵拉）其中已由 中途愛媽Yvonne於斷奶打完預防針後審核送養出「妞妞」、「哈娜」和「朵拉」。
                👉🏼目錢「皓皓」和「卡蘿」移至另一中途持續找家中。
                歡迎預約看貓與其互動。

                有意願者請私訊原po michelle
              </p>
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
