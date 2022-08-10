import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { avatarApi, setAvatarRoute } from "../../Utils/APIRoutes";
import userContext from "../reactContext/userContext";
import './styles.scss';
export default function SetAvatar() {
  const {userData, setUserData} = useContext(userContext);
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  
  const currentUser = userData.user;

  useEffect(() => {
    if (!currentUser)
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const { data } = await axios.post(`${setAvatarRoute}/${currentUser.id}`, {
        image: avatars[selectedAvatar],
      }, {
        headers: { "x-auth-token": userData.token },
      });

      if (data.success) {
        setUserData({
          token: data.token,
          user: data.user
        });
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY, 
          data.token
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const getAvatar = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const randomValue = Math.round(Math.random() * 1000);
        const getAvatarApi = `${avatarApi}/${randomValue} Bond.svg`;
        const image = await axios.get(
          getAvatarApi
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    getAvatar()
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="setAvatar_container">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="setAvatar_container">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  key={index}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

