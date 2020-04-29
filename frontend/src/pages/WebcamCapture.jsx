import React, { Component } from "react";
import Webcam from "react-webcam";
import { Redirect,useHistory } from "react-router-dom";
import store from "../store";
import axios, { post } from 'axios';

import What_need_logo from '../assets/images/What_need_logo.png';
import captureSelf from '../assets/images/captureSelf.JPG';
import What_need_myself from '../assets/images/What_need.jpg';


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  
  
const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  
  let history = useHistory();
  
  const fileUpload = (img) => {
    const url = 'http://52.79.161.164:8000/face_detection/';
    const formData = toBlob(img);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData,config)
  }

  const toBlob = (url) => {

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
    console.log(blob)
    //alert(blob.url)
    formData.append('imgSrc', blob);

    return formData;
  }
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      //alert(imageSrc);
      store.dispatch({ type: "imgSrc", imageSrc: imageSrc });


      fileUpload(imageSrc).then((response)=>{
        //response가 -1 일 때 노 판별 그래서 다시 한번 캡처 불러와야함
        //10 카운트가 넘으면 종료하고 인식 불가 메시지를 넣어...
        if(response.data === -1){
        //  alert("인식 실패");
          return;
        }

        
        
        history.push('/Main');
        console.log(response.data);
      });
      
      /*
      fetch('http://52.79.161.164:8000/face_detection/',{    
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({'imgSrc': imageSrc})
        }).then((response) => {
          //alert(response.status)
          if(response.status === 404){ //서버 닫혀 있거나 없을 때 처리
            console.log('UNKNOwN');
            alert(imageSrc);
            history.push('/Main');
            //<Redirect to="/Menu" Component={Menu} />
            
          }else if(response.status === 200){ //정상
            
          }
        })*/
        /*
        .then(response => response.json())
        .then((data) => {
          if (data === undefined) return console.log('UNKNOwN')
          else{
            alert("Hi, user");
          }
        });
          */
    
    },
    [webcamRef]
  );

  return (
    <>

          <div style={{textAlign:"center",border: "none"}}>
                <div  style={{
                    top: "0px",
                    backgroundColor: "#FFFFFF",//"#F5F5F7",
                    width: "101%",//"100%",
                    height: "10%",
                    left:"-1px",
                    maxHeight: "240px",
                    minHeight: "53px",
                    zIndex: "99999",
                    border: "none",
                    display:"inline-block"
                    ,marginTop:"5%",
                    marginBottom:"10%"
                    }}
                    >
                    <img src={What_need_logo} alt="왓니로고" 
                     
                     style={{ 
                        height: "100%",
                        width:"20%",
                        
                        marginBottom:"0%" }} />

                    <img src={What_need_myself} alt="왓니문구" 
                     
                     style={{ 
                         width:"60%",
                        height: "100%",
                        marginLeft:"10%",
                        textAlign:"center-botton" }} />

                </div>
                <div class="youtubevideowrapper">   
    
    {/* 영상 한 묶음. 영상이 연속으로 있을 경우 이 묶음을 더 추가하면 됨 */}
    
            
            <div class="youtubevideowrapperdiv youtubevideowrapperdiv16-9blind" 
            
         
            >

            {/* //제목 가리는 하단 div */}
                <div style={{pointerEvents: "none"}}>

                <Webcam
                  audio={false}
                  height={"100%"}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={"100%"}
                  videoConstraints={videoConstraints}
                />
                    
                </div>

                <div>

                  <img src={captureSelf} alt="촬영버튼"  onClick={capture}
                      style={{
                        width:'70%',
                        height:'70%',
                        marginLeft: 'auto', marginTop:'10%' }} />

                </div>

            </div>

            
            </div>

           </div>
    
    </>
  );
};

export default WebcamCapture;

  // https://www.npmjs.com/package/react-webcam
  