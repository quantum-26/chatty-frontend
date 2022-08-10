import React, { useContext, useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { ApolloProvider } from '@apollo/client';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom'

import { client } from './Utils/Connection';
import UserContext from './component/reactContext/userContext';
import SetAvatar from './component/Avatar/setAvatar';
import LoginPage from './pages/Login/Login';
import { getUser, tokenValidation } from './Utils/APIRoutes';
import RegisterPage from './pages/Register/Register';
import ChatPage from './pages/Chat/Chat';
import Rhombus from "./assets/Rhombus.gif";

function App() {
  const navigate = useNavigate();
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if(token === null){
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY, 
          ""
        );
        token = "";
      }
      const tokenResponse = await axios.post(tokenValidation, 
        null, 
        {headers: {"x-auth-token": token}}
      );
      if (tokenResponse.data.success) {
        const userResponse = await axios.get(getUser, {
          headers: { "x-auth-token": token },
        });
        if(!userResponse.data.success) {
          setTimeout(() => {
            localStorage.clear();
            setLoading(false);
            navigate("/login");
          }, "2000")
        }else{
          navigate("/");
          setTimeout(() => {
            localStorage.clear();
            setLoading(false);
            setUserData({
              token,
              user: userResponse.data.user,
            });
            navigate("/");
          }, "2000")
        }
      }else{
        setTimeout(() => {
          localStorage.clear();
          setLoading(false);
          navigate("/login");
        }, "2000")
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <>
      {isLoading ? (
          <div className="setAvatar_container">
              <img src={Rhombus} alt="loader" className="loader" />
          </div>
      ) : (
        <ApolloProvider client={client}>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/setAvatar" element={<SetAvatar />} />
              <Route path="/" element={<ChatPage />} />
            </Routes>
          </UserContext.Provider>
        </ApolloProvider>
      )}
    </>
  )
}
export default App