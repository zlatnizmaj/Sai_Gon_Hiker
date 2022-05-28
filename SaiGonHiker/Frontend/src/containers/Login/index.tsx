import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import TextField from "src/components/FormInputs/TextField";
import ILoginModel from "src/interfaces/ILoginModel";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { cleanUp, login } from "./reducer";


// import logo from "../../../public/images/logo.svg";

const initialValues: ILoginModel = {
  userName: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading, error, status } = useAppSelector(
    (state) => state.authReducer
  );
  const [isDisabled, setIsDisabled] = useState(true);
  //const [errorMessage, setErrorMessage] = useState('');
  //setErrorMessage('Example error message!');

  useEffect(() => {
    return () => {
      dispatch(cleanUp());
    };
  }, []);

  return (
    <>
      <div className="header font-weight-bold">
        <div className="container-lg-min container-fluid d-flex ">
          <img className="imgx" src="/images/Logo_lk.png" alt="logo" />
          <p className="headText p-2">Online Asset Management</p>
        </div>
      </div>
      <div className="container">
        <div className="row w-100 d-flex align-items-center justify-content-center">
          <div className="col col-sm-6">
            <p className="content-login text-center text-danger">
              Welcome to Online Asset Management
            </p>

            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                dispatch(login(values));
              }}
              validate={(values) => {
                setIsDisabled(!values.password || !values.userName);
              }}
            >
              {(actions) => (
                <Form className="intro-y p-5 login-form">
                  {error?.error && (
                    <div className="error-context invalid pb-3 text-center">
                      {error.message}
                    </div>
                  )}
                  <TextField
                    name="userName"
                    label="Username"
                    type="text"
                    isrequired
                    notvalidate
                  />
                  {/* <TextField
                    name="password"
                    label="Password"
                    type="password"
                    ispassword
                    isrequired
                    notvalidate
                  /> */}

                  <div className="text-right">
                    <button
                      className="btn btn-danger"
                      type="submit"
                      disabled={isDisabled || loading}
                    >
                      Login
                      {loading && (
                        <img
                          src="/oval.svg"
                          className="w-4 h-4 ml-2 inline-block"
                        />
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
