import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import TextField from "src/components/FormInputs/TextField";
import SelectField from "src/components/FormInputs/SelectField";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import IAssetForm from "src/interfaces/Asset/IAssetForm";
import { MANAGE_ASSET } from "src/constants/pages";
import DateField from "src/components/FormInputs/DateField";
import CheckboxField from "src/components/FormInputs/CheckboxField";
import {
  CreateStateAssetTypeOptions,
  UpdateStateAssetTypeOptions,
} from "src/constants/selectOptions";
import { AvailableValue } from "src/constants/Asset/AssetConstant";
import TextAreaField from "src/components/FormInputs/TextAreaField";
import { createAsset, getCategories, updateAsset } from "./reducer";
import ISelectOption from "src/interfaces/ISelectOption";

const initialFormValues: IAssetForm = {
  categoryId: undefined,
  installedDate: undefined,
  name: "",
  specification: "",
  stateId: AvailableValue,
};

const validationSchema = Yup.object().shape({
  categoryId: Yup.number().required("Required"),
  installedDate: Yup.date()
    .typeError("Required")
    .test("installedDate", "Required", function (value) {
      return value != undefined;
    }),
  name: Yup.string().required("Required"),
  specification: Yup.string().required("Required"),
  stateId: Yup.number().required("Required"),
});

type Props = {
  initialAssetForm?: IAssetForm;
};

const AssetFormContainer: React.FC<Props> = ({
  initialAssetForm = {
    ...initialFormValues,
  },
}) => {
  const { account } = useAppSelector((state) => state.authReducer);

  const { categories } = useAppSelector((state) => state.assetReducer);

  const [loading, setLoading] = useState(false);

  const [categoriesOption, setCategoriesOption] = useState<
    Array<ISelectOption>
  >([]);

  const dispatch = useAppDispatch();

  const isUpdate = initialAssetForm.assetCode ? true : false;

  const [isDisabled, setIsDisabled] = useState(!isUpdate);

  const history = useHistory();

  const handleResult = (result: boolean, message: string) => {
    if (result) {
      NotificationManager.success(
        `${isUpdate ? "Updated" : "Created"} Successful`,
        ``,
        1000
      );
      setTimeout(() => {
        history.push(MANAGE_ASSET.BASE);
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

  useEffect(() => {
    if (categories) {
      const categoryOptions = categories.map((_, i) => ({
        id: i,
        value: _.id,
        label: _.name,
      }));
      setCategoriesOption(categoryOptions as ISelectOption[]);
    } else dispatch(getCategories());
  }, [categories]);

  const handleDate = (date: Date) => {
    return new Date(date.setHours(12, 0));
  };

  return (
    <Formik
      initialValues={initialAssetForm}
      enableReinitialize
      validationSchema={validationSchema}
      validate={(values) => {
        setIsDisabled(
          !values.name ||
            !values.specification ||
            !values.categoryId ||
            !values.installedDate ||
            !values.stateId
        );
      }}
      onSubmit={(values) => {
        setLoading(true);
        setTimeout(() => {
          values.location = account?.location;
          values.installedDate = handleDate(values?.installedDate as Date);
          if (isUpdate) {
            dispatch(updateAsset({ handleResult, formValues: values }));
          } else {
            dispatch(createAsset({ handleResult, formValues: values }));
          }

          setLoading(false);
        }, 1000);
      }}
    >
      {(actions) => (
        <Form className="intro-y col-lg-6 col-12">
          <TextField name="name" label="Name" isrequired />

          <SelectField
            options={categoriesOption}
            name="categoryId"
            label="Category"
            isrequired
            disabled={isUpdate ? true : false}
          />

          <TextAreaField
            name="specification"
            label="Specification"
            isrequired
          />

          <DateField name="installedDate" label="Installed Date" isrequired />

          <CheckboxField
            name="stateId"
            label="State"
            isrequired
            options={
              isUpdate
                ? UpdateStateAssetTypeOptions
                : CreateStateAssetTypeOptions
            }
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
                to={MANAGE_ASSET.BASE}
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
