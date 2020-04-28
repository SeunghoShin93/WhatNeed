import React, { Component } from "react";
import WebcamCapture from "./WebcamCapture";

class Capture extends Component {
    state = {imageSrc:null}
    
    render(){
        return(
            
            <div>

                
                <WebcamCapture>

                </WebcamCapture>
                
            </div>

        );
    }

}


/*
class Capture extends Component {
    state = {imageSrc:null}
    constructor(){
        super();

        this.state = {
            hasMedia: false,
            otherUserId: null
        }

        this.mediaHandler = new WebcamCapture();
    }

    componentWillMount(){
        this.mediaHandler.getPermissions()
            .then((stream) => {
                    this.setState({hasMedia: true});
                    
                    try{
                        this.myVideo.srcObject = stream;
                    }catch(e){
                        this.myVideo.src = URL.createObjectURL(stream);
                    }

                    this.myVideo.play();
                })
            }

    render(){
        return(
            
            <div>

                
                <WebcamCapture>

                </WebcamCapture>
                
            </div>

        );
    }

}
*/
export default Capture;