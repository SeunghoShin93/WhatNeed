import React, { Component,Fragment } from "react";
//import ReactPlayer from 'react-player'
import "../css/youtube.css";
//import Iframe from 'react-iframe'

import What_need_logo from '../assets/images/What_need_logo.png';

import start from '../assets/images/start.JPG';
import What_need_myself from '../assets/images/What_need.jpg';

import {Link} from 'react-router-dom';


class Home extends Component {
    render(){
        return (
          <div style={{ textAlign: "center", border: "none" }}>
            <div
              style={{
                top: "0px",
                backgroundColor: "#FFFFFF", //"#F5F5F7",
                width: "101%", //"100%",
                height: "10%",
                left: "-1px",
                maxHeight: "240px",
                minHeight: "53px",
                zIndex: "99999",
                border: "none",
                display: "inline-block",
                marginTop: "5%",
              }}
            >
              <img
                src={What_need_logo}
                alt="왓니로고"
                style={{
                  height: "100%",
                  width: "20%",

                  marginBottom: "0%",
                }}
              />

              <img
                src={What_need_myself}
                alt="왓니문구"
                style={{
                  width: "60%",
                  height: "100%",
                  marginLeft: "10%",
                  textAlign: "center-botton",
                }}
              />
            </div>
            <div className="youtubevideowrapper">
              {/* 영상 한 묶음. 영상이 연속으로 있을 경우 이 묶음을 더 추가하면 됨 */}

              <div className="youtubevideowrapperdiv youtubevideowrapperdiv16-9blind">
                {/* 제목 가리는 상단 div */}
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    backgroundColor: "#FFFFFF", //"#F5F5F7",
                    width: "101%", //"100%",
                    height: "20%",
                    left: "-1px",
                    maxHeight: "240px",
                    minHeight: "53px",
                    zIndex: "99999",
                    border: "none",
                  }}
                ></div>

                {/* 제목 가리는 상단 div */}

                {/* 제목 가리는 하단 div */}

                <div
                  style={{
                    position: "absolute",
                    bottom: "-5px",
                    left: "-1px",
                    backgroundColor: "#FFFFFF", //"#F5F5F7",
                    width: "101%",
                    height: "16.5%",
                    maxHeight: "120px",
                    minHeight: "53px",
                    zIndex: "99999",
                    border: "none",
                  }}
                ></div>

                {/* //제목 가리는 하단 div */}
                <div 
                // style={{ pointerEvents: "none" }}
                >
                  <iframe
                    id="iframe_youtube"
                    // src="https://www.youtube.com/embed/ELUxkF-ZH9Q?version=2&loop=1&playlist=ELUxkF-ZH9Q&controls=0&rel=0&autoplay=1&modestbranding=1"
                    src="https://www.youtube.com/embed/mKB-Tsih3Zo?version=2&loop=1&playlist=mKB-Tsih3Zo&controls=0&rel=0&autoplay=1&modestbranding=1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; loop;"
                    allowFullScreen
                    style={{
                      overflow: "hidden",
                      overflowX: "hidden",
                      overflowY: "hidden",
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      right: "0px",
                      bottom: "0px",
                    }}
                  ></iframe>
                  {/*}    
                    <Iframe width="560" height="315" src="https://www.youtube.com/embed/ELUxkF-ZH9Q?version=2&loop=1&playlist=ELUxkF-ZH9Q&controls=0&rel=0&autoplay=1&modestbranding=1" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; loop" allowfullscreen>
                    </Iframe>
                    {*/}
                </div>
              </div>
              <Link to="/Capture">
                <div>
                  <img
                    src={start}
                    alt="시작버튼"
                    onClick={this.goMenu}
                    style={{
                      width: "70%",
                      height: "70%",
                      marginLeft: "auto",
                      marginTop: "0%",
                    }}
                  />
                </div>
              </Link>
            </div>
          </div>
        );
    }

}

export default Home;
