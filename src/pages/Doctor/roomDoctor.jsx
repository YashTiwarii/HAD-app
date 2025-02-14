import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';
import { useState,useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

const RoomPageDoctor=()=>{
    
    const [roomId,setRoomId]=useState(123);
    const [load,setLoad]=useState(false);
    useEffect(()=>{
        axios.post(`http://localhost:8081/doctor/consultation/${1}`)
        .then((response)=>{
            setRoomId(response.data);  
            setLoad(true); 
        })
        .catch((error)=>{
            console.log('error while pop patient from queue',error);
        })
    },[])
    if(!load)
    {
        <LinearProgress />
        return <div>Loading...</div>;
        
    }
    console.log(typeof(roomId))
    const roomnum=roomId.toString();
    console.log(roomnum);
    const myMeeting =async (element) =>{
        
        const appID =2066795294
        const serverSecret ="dd1496412c994d3e0f2b99f6717683e1";
        const kitToken =ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomnum,'123456','sudhanshu');
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom(
            {
            container:element,
            scenario:{
                mode:ZegoUIKitPrebuilt.VideoConference
            },
        });
    }

    return (
        // <button onClick={myMeeting()}> click me</button>
        <div ref={myMeeting()}></div>
    )
}

export default RoomPageDoctor;