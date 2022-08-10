import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import userContext from "../../component/reactContext/userContext";

function AuthOptions () {
    const { userData, setUserData } = useContext(userContext);
    const navigate = useNavigate();

    const register = () => navigate("/register");
    const login = () => navigate("/login");
    const Message = () => navigate("/chat");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY,"");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    Messenger
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        {userData.user ? (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-primary mr-2" onClick={Message}>
                                        Chat
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-primary mr-2" onClick={logout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                            ) : (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-primary mr-2" onClick={login}>
                                        Login
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-primary mr-2" onClick={register}>
                                        Sign Up
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AuthOptions;