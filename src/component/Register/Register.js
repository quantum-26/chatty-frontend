import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import "./styles.scss";
import MyTextInput from '../../Utils/FormsUtils/TextField';
import userContext from '../reactContext/userContext';
import axios from 'axios';
import Logo from "../../assets/logo-message.svg";
import { toast, ToastContainer } from 'react-toastify';
import { registerRoute } from '../../Utils/APIRoutes';
// import { useState } from 'react';

export default function Register () {
    const { setUserData } = useContext(userContext);
    const toastOptions = {
      position: "bottom-right",
      autoClose: 1000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    const navigate = useNavigate();
    return (
      <>
        <Formik
          initialValues={{
            userName: '',
            email: '',
            password: '',
            passwordCheck: '',
          }}
          validationSchema={Yup.object({
            userName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .required('Required'),
            passwordCheck: Yup.string()
              .required('Required'),
          })}
          onSubmit={ async (values, { setSubmitting }) => {
            setSubmitting(false);
            try {
              const {email, password, passwordCheck, userName} = values;
              const newUser = {email, password, passwordCheck, userName};
              const { data } = await axios.post(registerRoute, newUser);

              if (!data.success) {
                toast.error(data.msg, toastOptions);
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
            }
            catch(err) {
              toast.error(err.response.data.msg, toastOptions);
              err.response.data.msg && console.log(err.response.data.msg)
            }
          }}
        >
          <Form className = 'register-form'>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>chatty</h1>
            </div>

            <MyTextInput
              label="UserName"
              name="userName"
              type="text"
              placeholder="UserName"
            />

            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />

            <MyTextInput
              label="Password"
              name="password"
              type="text"
              placeholder="Password"
            />

            <MyTextInput
              label="confirm password"
              name="passwordCheck"
              type="text"
              placeholder="confirm password"
            />

            <button type="submit">Create User</button>
            <span>
              Already have an account ? <Link to="/login">Login.</Link>
            </span>

          </Form>
        </Formik>
        <ToastContainer limit={1} />
      </ >
    )
}