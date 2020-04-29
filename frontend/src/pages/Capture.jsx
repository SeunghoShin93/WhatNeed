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
    }

    componentDidMount() {
      // getting access to webcam
      const video = this.videoRef.current;
      const constraints = { video: true }
      navigator.mediaDevices.getUserMedia(constraints).then(
        (stream) => { video.srcObject = stream;
                      this.videoTracks = stream.getVideoTracks();
        })
    }
    /*
    componentWillUnmount(){
      this.videoTracks.forEach(function(track){track.stop()});
    }
    */
    fileUpload(img){
      const url = 'http://52.79.161.164:8000/face_detection/';
      const formData = this.toBlob(img);
  
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
    capture(){
       // var context = this.snapshotCanvas.getContext('2d');
       // context.drawImage(this.player, 0, 0, this.snapshotCanvas.width,this.snapshotCanvas.height);
        //const imageSrc = webcamRef.current.getScreenshot();
        //alert(this.player);

        let player = document.getElementById('player');
        let snapshotCanvas = document.getElementById('snapshot');
        let videoTracks;

        var context = snapshotCanvas.getContext('2d');
        context.drawImage(player, 0, 0, snapshotCanvas.width,snapshotCanvas.height);

        //store.dispatch({ type: "imgSrc", imageSrc: imageSrc });
        let imageSrc = snapshotCanvas.toDataURL("image/jpg");
  
        this.fileUpload(imageSrc).then((response)=>{
            if(cnt === 3 || flag === false){ //인식불가 -> Unknown으로
                console.log('UNKNOwN');
                history.push('/Main');
                  // 유저 정보 초기화...
                return;
              }
              //menu로 넘어갔을 때 userInfo가 undefined면 전체메뉴만, 아니면 회원 이름, 추천 메뉴 등
      
              if(response.status === 500){ // 인식 불가, 재촬영 해야함.
                  //재촬영 플래그 둬서 재활영 실패 시 단골 아닌걸로~
              }else{ //인식 됨
                  cnt++;
                  //로직을 뭘로할까?
                  //1. 3가지 아이템을 state에 저장,
                  //2. input text에 index 넣어줌. 갱신은 useEffect? 그럼 또 뭔가 안 맞을거 같은데..
                  //3. 버튼 누를 때 마다 cnt 늘어남
                  //cnt가 4면 그냥 넘겨~
                store.dispatch({type:'user', userInfo:response.data[0].fields.username});
                getItem(response.data[0].pk).then((res)=>{
                  console.log(res.data);
      
                  store.dispatch({type:'items', items:res.data});
                });
                
                history.push('/Menu');  
                //최근 4개, 자주 2개
                //백에서 못 찾으면, db경로
                //해당 fields를 리턴.. 
                console.log(response.data);
                console.log(response.data[0].fields.username);
              }      
        });
      }

    render() {
      return (

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

            <video 
              id = "player"
              ref={this.videoRef}
              autoPlay
              style={{height:"80%", width:"60%"}}
            />

            <canvas id = "snapshot" style={{width:"1280px", height:"720px", display:"none"}}></canvas>    
        </div>

        <div>

          <img src={captureSelf} alt="촬영버튼"  onClick={this.capture.bind(this)}
              style={{
                width:'70%',
                height:'70%',
                marginLeft: 'auto', marginTop:'10%' }} />

        </div>

    </div>

    
    </div>

   </div>


      
    )
    }
  }


export default Capture;