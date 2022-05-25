import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { useField, validateYupSchema } from "formik";
import { CalendarDateFill } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

type DateFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  name: string;
  isrequired?: boolean;
  notvalidate?: boolean;
  maxDate?: Date;
  minDate?: Date;
  filterDate?: (date: Date) => boolean;
};

const DateField: React.FC<DateFieldProps> = (props) => {
  const [{ value }, { error, touched }, { setValue, setTouched }] =
    useField(props);
  const { label, isrequired, notvalidate, maxDate, minDate, filterDate } =
    props;

  const validateClass = () => {
    if (error && touched) return "is-invalid invalid  ";
    if (notvalidate) return "";
    if (touched) return "is-valid";

    return "";
  };
  const validateClassParent = () => {
    if (error && touched) return "invalid border-invalid";
    if (notvalidate) return "border";
    if (touched) return "valid border-valid";

    return "border";
  };
  const handleChangeAssignedDate = (assignDate: Date) => {
    setTouched(true);
    setValue(assignDate);
  };
  const handleOnTouchedSet = () => {
    setTouched(true);
  };
  return (
    <>
      <div className="mb-3 row">
        <label className="col-4 col-form-label d-flex">
          {label}
          {isrequired && <div className="invalid ml-1">* </div>}
        </label>
        <div className="col">
          <div className={`d-flex align-items-center w-100 ${validateClassParent()} `}>
            <div className={`date-picker-wrapper d-flex text-center w-100 form-control ${validateClass()} border-none`}>
              <DatePicker
                placeholderText={label}
                className={`w-100 ${validateClass()}`}
                dateFormat="dd/MM/yyyy"
                selected={value}
                onClickOutside={handleOnTouchedSet}
                onChange={handleChangeAssignedDate}
                showDisabledMonthNavigation
                maxDate={maxDate}
                minDate={minDate}
                filterDate={filterDate}
              />
            </div>
            <div className="p-2 d-flex jusity-content-center">
              <CalendarDateFill/>
            </div>
          </div>

          {error && touched && (
            <div className="d-flex text-left invalid">
              <p id="errorMessage">{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default DateField;
