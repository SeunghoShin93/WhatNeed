import React, { Component } from "react";
import Webcam from "react-webcam";
import { Redirect,useHistory } from "react-router-dom";
import store from "../store";
import axios, { post } from 'axios';

import What_need_logo from '../assets/images/What_need_logo.png';
import captureSelf from '../assets/images/captureSelf.JPG';
import What_need_myself from '../assets/images/What_need.jpg';
class MediaHandler{
    getPermissions(){
        return new Promise((res, rej) =>{
            navigator.mediaDevices.getUserMedia({video:true})
                .then((stream)=>{
                    resolve(stream);
                }).catch(err => {
                    throw new Error(`Unable to fetch stream ${err}`);
                })
        });
    }
}
  export default WebcamCapture;