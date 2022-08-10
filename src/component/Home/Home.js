import React, { useEffect, useContext } from "react";
import './Styles.scss';
import Robot from "../../assets/robot.gif";
import userContext from "../reactContext/userContext";
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();
    const {userData} = useContext(userContext);
    const currentUser = userData.user;

    useEffect(() => {
        if (!currentUser) {
          navigate("/login");
        }
    }, []);
  return (
    <div className="Home_container">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{currentUser.userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}