import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import TextField from "src/components/FormInputs/TextField";
import SelectField from "src/components/FormInputs/SelectField";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import IUserForm from "src/interfaces/User/IUserForm";
import { FemaleType } from "src/constants/User/UserConstants";
import { MANAGE_USER } from "src/constants/pages";
import { createUser, updateUser } from "./reducer";
import DateField from "src/components/FormInputs/DateField";
import CheckboxField from "src/components/FormInputs/CheckboxField";
import {
  CreateUserTypeOptions,
  GenderTypeOptions,
} from "src/constants/selectOptions";

const initialFormValues: IUserForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: undefined,
  gender: FemaleType,
  joinedDate: undefined,
  type: undefined,
  staffCode: "",
};

const calculateAgeFromDateTo = (fromDate: Date, toDate: Date) => {
  return ~~((+new Date(toDate) - +new Date(fromDate)) / 31557600000);
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  dateOfBirth: Yup.date()
    .typeError("Required")
    .test("dateOfBirth", "Required", function (value) {
      return value != undefined;
    })
    .test(
      "dateOfBirth",
      "User is under 18. Please select a different date",
      function (value) {
        return (
          value != undefined &&
          calculateAgeFromDateTo(value as Date, new Date()) >= 18
        );
      }
    ),
  joinedDate: Yup.date()
    .typeError("Required")
    .test("joinedDate", "Required", function (value) {
      return value != undefined;
    })
    .test("joinedDate", "Please select Date of birth", function (value) {
      return !isNaN(this.parent.dateOfBirth);
    })
    .test(
      "joinedDate",
      "User under the age of 18 may not join company. Please select a different date",
      function (value) {
        return (
          !this.parent.dateOfBirth ||
          !value ||
          calculateAgeFromDateTo(
            this.parent.dateOfBirth as Date,
            value as Date
          ) >= 18
        );
      }
    )
    .test(
      "joinedDate",
      "Joined date is Saturday or Sunday. Please select a different date",
      function (value) {
        return (
          !value ||
          ((value as Date).getDay() != 0 && (value as Date).getDay() != 6)
        );
      }
    ),
  type: Yup.string().required("Required"),
});

type Props = {
  initialUserForm?: IUserForm;
};

const UserFormContainer: React.FC<Props> = ({
  initialUserForm = {
    ...initialFormValues,
  },
}) => {
  const { account } = useAppSelector((state) => state.authReducer);

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const isUpdate = initialUserForm.staffCode ? true : false;

  const [isDisabled, setIsDisabled] = useState(!isUpdate);

  const history = useHistory();

  const handleResult = (result: boolean, message: string) => {
    if (result) {
      NotificationManager.success(
        `${isUpdate ? "Update" : "Create"} Successful`,
        ``,
        1000
      );

      setTimeout(() => {
        history.push(MANAGE_USER.BASE);
      }, 1000);
    } else {
      NotificationManager.error(
        message,
        `${isUpdate ? "Update" : "Create"} failed`,
        ``,
        1000
      );
    }
  };

  const handleDate = (form: IUserForm) => {
    form.dateOfBirth?.setHours(12, 0);
    form.joinedDate?.setHours(12, 0);
    return form;
  };

  return (
    <Formik
      initialValues={initialUserForm}
      enableReinitialize
      validationSchema={validationSchema}
      validate={(value) => {
        setIsDisabled(
          !value.dateOfBirth ||
            !value.firstName ||
            !value.gender ||
            !value.joinedDate ||
            !value.lastName ||
            !value.type
        );
      }}
      onSubmit={(values) => {
        setLoading(true);
        values.location = account?.location;
        values = handleDate(values);
        setTimeout(() => {
          if (isUpdate) {
            dispatch(updateUser({ handleResult, formValues: values }));
          } else {
            dispatch(createUser({ handleResult, formValues: values }));
          }

          setLoading(false);
        }, 1000);
      }}
    >
      {(actions) => (
        <Form className="intro-y col-lg-6 col-12">
          <TextField
            name="firstName"
            label="First Name"
            isrequired
            disabled={isUpdate ? true : false}
          />

          <TextField
            name="lastName"
            label="Last Name"
            isrequired
            disabled={isUpdate ? true : false}
          />

          <DateField
            name="dateOfBirth"
            label="Date Of Birth"
            isrequired
            disabled={isUpdate ? true : false}
          />

          <CheckboxField
            name="gender"
            label="Gender"
            isrequired
            isCol={true}
            options={GenderTypeOptions}
          />

          <DateField
            name="joinedDate"
            label="Joined Date"
            isrequired
            disabled={isUpdate ? true : false}
          />

          <SelectField
            name="type"
            label="Type"
            isrequired
            options={CreateUserTypeOptions}
          />

          <div className="d-flex">
            <div className="ml-auto">
              <button
                className="btn btn-danger"
                type="submit"
                disabled={loading || isDisabled}
              >
                Save{" "}
                {loading && (
                  <img src="/oval.svg" className="w-4 h-4 ml-2 inline-block" />
                )}
              </button>

              <Link
                to={MANAGE_USER.BASE}
                className="btn btn-outline-secondary ml-2"
              >
                Cancel
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserFormContainer;
