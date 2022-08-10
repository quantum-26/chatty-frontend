import React, { useContext } from "react";
import './Styles.scss';
import { useMutation } from "@apollo/client";
import Logout from "../Logout/Logout";
import ChatInput from "../ChatInput/ChatInput";
import { Messages } from "../Messages/Message";
import userContext from "../reactContext/userContext";
import { POST_MESSAGE } from "../../Utils/Query";

export default function ChatContainer({ currentChat }) {
    const {userData} = useContext(userContext);
    const currentUser = userData.user;
    const [postMessage] = useMutation(POST_MESSAGE)

    const handleSendMessage= async (msg)=>{
        if(msg && currentChat.userName){
        //calls the mutate function
        await postMessage({
            variables:{ 
                senderName: currentUser.userName,
                receiverName: currentChat.userName,
                text: msg 
            }
        })
        }else{
        // 3.
            alert("Missing fields!")
        }
    }

    return (
        <div className="chat_container">
        <div className="chat-header">
            <div className="user-details">
            <div className="avatar">
                <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt=""
                />
            </div>
            <div className="username">
                <h3>{currentChat.userName}</h3>
            </div>
            </div>
            <Logout />
        </div>
        <div className="chat-messages">
            <Messages senderUserName={currentUser.userName} receiverUserName={currentChat.userName} />
        </div>
        <ChatInput handleSendMsg={handleSendMessage} />
        </div>
    );
}
