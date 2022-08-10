import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import "./styles.scss";
import MyTextInput from '../../Utils/FormsUtils/TextField';
import axios from 'axios';
import userContext from '../reactContext/userContext';
import Logo from "../../assets/logo-message.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from '../../Utils/APIRoutes';

export default function Login () {
  const { setUserData } = useContext(userContext);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect(() => {
  //   if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required.'),
          password: Yup.string()
            .required('Password is required.'),
        })}
        onSubmit={ async (values, { setSubmitting }) => {
          setSubmitting(false);
          try {
            const {email, password} = values;
            const loginUser = {email, password};
            const { data } = await axios.post(loginRoute, loginUser);

            if (!data.success) {
              toast.error(data.message, toastOptions);
            }else {
              setUserData({
                token: data.token,
                user: data.user
              });
              localStorage.setItem(
                process.env.REACT_APP_LOCALHOST_KEY, 
                data.token
              );
              
              navigate("/");
            }
          }catch(err) {
            toast.error(err.response.data.msg, toastOptions)
            err.response.data.error && console.log(err.response.data.error)
          }
        }}
      >
        <Form className = 'login_form'>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chatty</h1>
          </div>
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
          />

          <MyTextInput
            label="Password"
            name="password"
            type="text"
            placeholder="Password"
          />

          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </Form>
      </Formik>
      <ToastContainer limit={1}/>
    </>
  )
}