 import { Form, Formik } from "formik";
// import React, { useEffect, useState } from "react";
// import ConfirmModal from "src/components/ConfirmModal";
// import TextField from "src/components/FormInputs/TextField";
// import { useAppDispatch, useAppSelector } from "src/hooks/redux";
// import IChangePassword from "src/interfaces/IChangePassword";
// import ISubmitActions from "src/interfaces/ISubmitActions";
// import { changePassword } from "../Login/reducer";

// const initialValues: IChangePassword = {
//   changePassword: "",
//   confrimPassword: "",
// };

// type Props = {
//   showModal: boolean;
//   loading: boolean;
//   haveClose: boolean;
//   onHide?: (()=>void);
// };

// const ChangePasswordModal: React.FC<Props> = ({ showModal, loading, haveClose, onHide }) => {
//   const [disableSave, setDisableSave] = useState(true);

//   const dispatch = useAppDispatch();
  
//   const handleConfirmChangePassword = (values: IChangePassword) => {
//     const formSubmit: ISubmitActions<IChangePassword> = {
//       values,
//     };
//     dispatch(changePassword(formSubmit));
//   };

//   return (
//     <>
//       <ConfirmModal
//         title="Change Password"
//         isShow={showModal}
//         onHide={onHide}
//         haveClose={haveClose}
//       >
//         <div>
//           <div>This is the first time you logged in.</div>
//           <div>You have to change your password to continue.</div>
//           <Formik
//             initialValues={initialValues}
//             onSubmit={handleConfirmChangePassword}
//             validate={(values) => {
//               setDisableSave(
//                 !(
//                   values.changePassword &&
//                   values.confrimPassword &&
//                   values.changePassword == values.confrimPassword
//                 )
//               );
//             }}
//           >
//             {(actions) => (
//               <Form className="intro-y mt-3">
//                 <TextField
//                   id="changePassword"
//                   name="changePassword"
//                   label="New Password"
//                   placeholder="Enter new password"
//                   type="password"
//                   ispassword
//                   notvalidate
//                   isrequired
//                 />
//                 <TextField
//                   id="confrimPassword"
//                   name="confrimPassword"
//                   label="Confirm"
//                   placeholder="Confirm your new password"
//                   type="password"
//                   ispassword
//                   notvalidate
//                   isrequired
//                 />

//                 <div className="text-right">
//                   <button
//                     className="btn btn-danger"
//                     type="submit"
//                     disabled={disableSave || loading}
//                   >
//                     Save
//                     {loading && (
//                       <img
//                         src="/oval.svg"
//                         className="w-4 h-4 ml-2 inline-block"
//                       />
//                     )}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </ConfirmModal>
//     </>
//   );
// };

// export default ChangePasswordModal;
