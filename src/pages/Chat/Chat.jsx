import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChatContainer from "../../component/ChatContainer/ChatContainer";
import Contacts from "../../component/Contacts/Contacts";
import Home from "../../component/Home/Home";
import userContext from "../../component/reactContext/userContext";
import { allUsersRoute } from "../../Utils/APIRoutes";
import './style.scss';
import Whatsapp from "../../assets/Whatsapp.gif";

export default function ChatPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const {userData} = useContext(userContext);
    const currentUser = userData.user;
    useEffect(() => {
        const getAllUsers = async () => {
            if (currentUser) {
                if (currentUser.hasAvatar) {
                    const { data } = await axios.get(`${allUsersRoute}/${currentUser.id}`, {
                        headers: { "x-auth-token": userData.token },
                    });
                    
                    setTimeout(() => {
                        setContacts(data.users);
                        setIsLoading(false);
                    }, "2000")
                } else {
                    setTimeout(() => {
                        setIsLoading(false);
                        navigate("/setAvatar");
                    }, "2000")
                }
            }
            else {
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/login");
                }, "2000")
            }
        }
        getAllUsers();
    }, []);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <>
            {isLoading ? (
                <div className="setAvatar_container">
                    <img src={Whatsapp} alt="loader" className="loader" />
                </div>
            ) : (
                <div className="container_wrapper">
                    { currentUser && <div className="container">
                        <Contacts contacts={contacts} changeChat={handleChatChange} />
                        {currentChat === undefined ? (
                        <Home />
                        ) : (
                        <ChatContainer currentChat={currentChat} />
                        )}
                    </div>}
                </div>
            )}
        </>
    );
}