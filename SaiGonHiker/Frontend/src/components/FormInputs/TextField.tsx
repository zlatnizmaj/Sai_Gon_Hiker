import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { useField } from "formik";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash);
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  name: string;
  isrequired?: boolean;
  notvalidate?: boolean;
  ispassword?: boolean;
};

const TextField: React.FC<InputFieldProps> = (props) => {
  const [field, { error, touched }, meta] = useField(props);

  const { label, isrequired, notvalidate, ispassword } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const validateClass = () => {
    if (touched && error) return "is-invalid";
    if (notvalidate) return "";
    if (touched) return "is-valid";
    return "";
  };

  useEffect(()=>{
    setShowIcon(field.value ? false : true);
  }, [field.value])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="mb-3 row">
        <label className="col-4 col-form-label d-flex">
          {label}
          {isrequired && <div className="invalid ml-1">* </div>}
        </label>
        <div className="col">
          {ispassword ? (
            <div className="password-field">
              <input
                className={`form-control ${validateClass()}`}
                {...field}
                {...props}
                type={showPassword ? "text" : "password"}
              />
              <FontAwesomeIcon
                className={`input-icon ${showIcon ? "d-none" : ""}`}
                icon={!showPassword ? "eye" : "eye-slash"}
                onClick={handleClickShowPassword}
              />
            </div>
          ) : (
            <input
              className={`form-control ${validateClass()}`}
              {...field}
              {...props}
            />
          )}
          {error && touched && <div className="invalid">{error}</div>}
        </div>
      </div>
    </>
  );
};
export default TextField;
