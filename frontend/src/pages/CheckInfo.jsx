import React, { Component } from "react";
import store from "../store";
import axios, { post } from 'axios';
import What_need_logo from '../assets/images/What_need_logo.png';
import captureSelf from '../assets/images/captureSelf.JPG';
import What_need_myself from '../assets/images/What_need.jpg';
import Button from "@material-ui/core/Button";



class CheckInfo extends Component {
    constructor(props) {
      super(props);
      this.history = props.history;
      this.videoRef = React.createRef()

    }
    //cnt; flag; usersInfo; userIdx;
    componentDidMount() {
      // getting access to webcam
    }
    
    componentWillUnmount(){
      //this.videoTracks.forEach(function(track){track.stop()});
    }
    
  
    getItem(userInfo){
        const url = 'http://52.79.161.164:8001/getItem/';
        let formData = new FormData();
        formData.append('pk', userInfo);
    
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData,config)
    }

    goMenu(pk, name){
        if(pk !== undefined){
            this.getItem(pk).then((res)=>{
                console.log(res.data);
                let userInfo = {id:pk, name:name};
                store.dispatch({type:'user', userInfo});
                store.dispatch({type:'items', items:res.data});
                this.history.push('/Menu');
            });
        }else{
            this.history.push('/Menu');
        }
      }
    render() {
        let list = store.getState().usersList;

        console.log(list);
        const usersList = list.map((user) => (
            <Button style={{
                background: 'linear-gradient(0deg, #9234, #9198e5)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                margin: '10px'
            }}
          variant="contained" color="Secondary" size="large" onClick={this.goMenu.bind(this, user.pk, user.fields.username)}>{user.fields.username}</Button>
        ));
      
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
          {/* <div className="youtubevideowrapper">

            <div className="youtubevideowrapperdiv youtubevideowrapperdiv16-9blind">
            </div>
          </div> */}

          <div style={{ pointerEvents: "none" }}>
                <img id="preview" src={store.getState().imageSrc} />
              </div>
          <div style={{margin : "50px"}}>
                {usersList}
                <br />
                <Button styles={{margin: "inherit"}} variant="contained" size="large" onClick={this.goMenu.bind(this, undefined, undefined)}>바로 시작</Button>
              </div>
        </div>
      );
    }
  }


export default CheckInfo;
