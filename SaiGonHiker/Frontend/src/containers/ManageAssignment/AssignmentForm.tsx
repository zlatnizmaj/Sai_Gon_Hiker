import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import IAssignmentForm from "src/interfaces/Assignment/IAssignmentForm";
import { MANAGE_ASSIGNMENT } from "src/constants/pages";
import DateField from "src/components/FormInputs/DateField";
import TextAreaField from "src/components/FormInputs/TextAreaField";
import { createAssignment, updateAssignment } from "./reducer";
import SearchField from "src/components/FormInputs/SearchField";
import UserSelector from "./SelectorTable/User/UserSelector";
import AssetSelector from "./SelectorTable/Asset/AssetSelector";

const initialFormValues: IAssignmentForm = {
  assignTo: "",
  assetCode: "",
  assignedDate: new Date(),
  note: "",
};

const validationSchema = Yup.object().shape({
  assignTo: Yup.string().required("Required"),
  assetCode: Yup.string().required("Required"),
  assignedDate: Yup.date()
    .typeError("Required")
    .test(
      "assignedDate",
      "Joined date is Saturday or Sunday. Please select a different date",
      function (value) {
        return (value as Date).getDay() != 0 && (value as Date).getDay() != 6;
      }
    ),
  note: Yup.string().required("Required"),
});

type Props = {
  initialAssignmentForm?: IAssignmentForm;
};

const AssetFormContainer: React.FC<Props> = ({
  initialAssignmentForm = {
    ...initialFormValues,
  },
}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const isUpdate = initialAssignmentForm.id ? true : false;
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
        history.push(MANAGE_ASSIGNMENT.BASE);
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

  const handleDate = (date: Date) => {
    date.setHours(12, 0);
    return date;
  };
  
  return (
    <Formik
      initialValues={initialAssignmentForm}
      enableReinitialize
      validationSchema={validationSchema}
      validate={(values) => {
        setIsDisabled(
          !values.assetCode ||
            !values.assignTo ||
            !values.note ||
            !values.assignedDate
        );
      }}
      onSubmit={(values) => {
        setLoading(true);
        values.assignedDate = handleDate(values.assignedDate)
        setTimeout(() => {
            if (isUpdate) {
              dispatch(updateAssignment({ handleResult, formValues: values }));
            } else {
              dispatch(createAssignment({ handleResult, formValues: values }));
            }

          setLoading(false);
        }, 1000);
      }}
    >
      {(actions) => (
        <Form className="intro-y col-lg-6 col-12">
          <SearchField
            name="assignTo"
            label="User"
            valueName={initialAssignmentForm.assignToFullName?? ''}
            isrequired
            isdisable
            table={<UserSelector />}
          />
          
          <SearchField
            name="assetCode"
            label="Asset"
            valueName={initialAssignmentForm.assetName?? ''}
            isrequired
            isdisable
            table={<AssetSelector />}
          />

          <DateField name="assignedDate" label="Assigned Date" isrequired minDate={new Date()} />

          <TextAreaField name="note" label="Note" isrequired />
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
                to={MANAGE_ASSIGNMENT.BASE}
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

export default AssetFormContainer;
