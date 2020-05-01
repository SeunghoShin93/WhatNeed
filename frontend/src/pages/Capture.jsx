import React, { Component } from "react";


import store from "../store";
import axios, { post } from 'axios';

import What_need_logo from '../assets/images/What_need_logo.png';
import captureSelf from '../assets/images/captureSelf.JPG';
import What_need_myself from '../assets/images/What_need.jpg';


class Capture extends Component {
    constructor(props) {
      super(props);
      this.history = props.history;
      this.videoRef = React.createRef()

      this.state={
        flag: false,
        usersInfo:[{}]
      };
    }
    cnt;
    //cnt; flag; usersInfo; userIdx;
    componentDidMount() {
      // getting access to webcam
      const video = this.videoRef.current;
      const constraints = { video: true }
      navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => { video.srcObject = stream;
                      this.videoTracks = stream.getVideoTracks();
       })
       this.cnt = 0;
    }
    
    componentWillUnmount(){
      this.videoTracks.forEach(function(track){track.stop()});
    }
    
    fileUpload(img){
      const url = '/whatneed/face_detection/';
      const formData = img;
  
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      return post(url, formData,config)
    }
 
    toBlob(url){
  
      const re = new RegExp('.(gif|jpg|jpeg|tiff|png|ico)$', 'i')      
      let name = (/[^(/|\\)]*$/).exec(url)[0]
      let type = re.test(name) ? re.exec(name)[0].replace('.', '') : 'jpg'
  
      let dataUrl = url.split(',')[1];
      let byteString = atob(dataUrl);
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
  
      for(let i = 0; i < byteString.length;i++){
        ia[i]= byteString.charCodeAt(i);
      }
      let blob = new Blob([ab], {type: 'image/'+type})
      let formData = new FormData();
      let blobUrl = URL.createObjectURL(blob);
      console.log(blob);
      console.log(blobUrl);
      //alert(blob.url)
      formData.append('imgSrc', blob);
  
      return formData;
    }

    setValue(id, value){
        this.setState(()=>{
            return {id: value}
        });
        //console.log(this.state.id);
    }
    capture(){
        let player = document.getElementById('player');
        let snapshotCanvas = document.getElementById('snapshot');
        snapshotCanvas.width = 480;
        snapshotCanvas.height = 360;
        let videoTracks;

        var context = snapshotCanvas.getContext('2d');
        context.drawImage(player, 0, 0, snapshotCanvas.width,snapshotCanvas.height);

        let imageSrc = snapshotCanvas.toDataURL("image/jpg");
        let img = this.toBlob(imageSrc);
        store.dispatch({ type: "imgSrc", imageSrc: imageSrc });
        
        this.fileUpload(img)
        .then((response)=>{
            let userList = [{}];

            if(response.data.length >= 3){
                userList = response.data.slice(0,3);
            }else{
                userList = response.data;
            }
              store.dispatch({type:'usersList', usersList:userList});
              this.history.push('/Check');
            
        })
        .catch((error)=>{//인식 불가 전체 메뉴로 이동
            console.log(error.status);
            if(this.cnt === 2){
                //this.cnt = 0;
                this.history.push("/Menu");
                return;
            }
            this.cnt++;
            this.capture();
      /*
            if(error.status === 500){ 
                console.log("파업!")
                //this.cnt++;

            }*/

        });
      }
 
    render() {
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
              marginBottom: "10%",
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
              {/* //제목 가리는 하단 div */}
              <div style={{ pointerEvents: "none" }}>
                <video
                  id="player"
                  ref={this.videoRef}
                  autoPlay
                  style={{ width: "100%", height: "100%" }}
                />

                <canvas id="snapshot" style={{ display: "none" }}></canvas>
              </div>

              <div>
                <img
                  src={captureSelf}
                  alt="촬영버튼"
                  onClick={this.capture.bind(this)}
                  style={{
                    width: "70%",
                    height: "70%",
                    marginLeft: "auto",
                    marginTop: "10%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }


export default Capture;
