import React, {
  Children,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { useField } from "formik";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchModal from "../SearchModal";
import ManageUser from "src/containers/ManageUser/List";
library.add(faSearch);
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  name: string;
  isrequired?: boolean;
  notvalidate?: boolean;
  isdisable?: boolean;
  table: JSX.Element;
  valueName: string;
};

const SearchField: React.FC<InputFieldProps> = (props) => {
  const [field, { error, touched, value }, { setValue, setTouched }] =
    useField(props);

  const { label, isrequired, notvalidate, table, isdisable, valueName } = props;
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(valueName);
  const handleHideModal = () => {
    if (!touched) setTouched(true);
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
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

  const handleSave = (code: string, name: string) => {
    handleHideModal();
    setName(name);
    setValue(code);
  };

  useEffect(()=>{
    setName(valueName)
  }, [valueName])
  
  return (
    <>
      <div className="mb-3 row">
        <label className="col-4 col-form-label d-flex">
          {label}
          {isrequired && <div className="invalid ml-1">* </div>}
        </label>
        <div className="col">
          <div className={`d-flex align-items-center ${validateClassParent()}`}>
            <input {...props} {...field} hidden />
            <input
              disabled={isdisable}
              className={`form-control ${validateClass()} border-none`}
              {...field}
              type="text"
              value={name}
            />
            <FontAwesomeIcon
              className="p-2 cursor-pointer"
              icon={"search"}
              onClick={handleShowModal}
            />
          </div>
          {error && touched && <div className="invalid">{error}</div>}
        </div>
        <SearchModal isShow={showModal} onHide={handleHideModal}>
          {React.cloneElement(table, {
            handleSave,
            handleCancel: handleHideModal,
            setCode: setValue,
            currCodeSelected: value,
            currNameSelected: valueName,
          })}
        </SearchModal>
      </div>
    </>
  );
};
export default SearchField;
