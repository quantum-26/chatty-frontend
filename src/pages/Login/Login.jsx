import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../component/Login/Login";
import "./style.scss";
export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  

  return (
    <>
      <div className = 'login_form_wrapper'>
        <Login />
      </div>
    </>
  );
}
