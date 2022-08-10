import React, { useState, useEffect, useContext } from "react";
import './Styles.scss';
import Logo from "../../assets/logo-message.svg";
import userContext from "../reactContext/userContext";
import { useNavigate } from "react-router";

export default function Contacts({ contacts, changeChat }) {
    const navigate = useNavigate();
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const {userData} = useContext(userContext);
    const currentUser = userData.user;

    useEffect(() => {
      if (!currentUser) {
        navigate("/login");
      }
    }, []);
    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      changeChat(contact);
    };
    return (
      <>
        {currentUser.avatarImage && currentUser.avatarImage && (
          <div className="contacts_container">
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>chatty</h3>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.userName}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUser.userName}</h2>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }