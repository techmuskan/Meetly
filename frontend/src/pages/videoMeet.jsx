import React from 'react'
import '../styles/videoMeet.css'

const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
    "iceServers":[
        {"urls": "stun:stun.l.google.com:19302"}
    ]
}

const videoMeet = () => {

    var sockerRef = useRef();

    let socketIdRef = useRef();

    let localVideoRef = useref();

    let [videoAvailable, setVideoAvailable]  = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo]  = useState();

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModel, setShowModel] = useState();

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([]);

    let [message, SetMessage] = useState("");

    let [newMessage, setNewMessage] = useState(0);

    let [askForUsername, setAskForusername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([]);

    let [videos, setVideos] = useState([]);

    // if(isChrome() === false){

    // }

  return (
    <>
    {askForUsername === true ? <div></div> : <></>}
    </>
  )
}

export default videoMeet
