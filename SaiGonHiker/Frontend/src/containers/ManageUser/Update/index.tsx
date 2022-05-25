import React, { useEffect, useState } from "react";
import { Redirect, useLocation, useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import IUserForm from "src/interfaces/User/IUserForm";
import { getUserByStaffCode } from "../reducer";
import UserFormContainer from "../UserForm";
const UpdateUserContainer = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [userForm, setUserForm] = useState(undefined as IUserForm | undefined);

  const { id } = useParams<{ id: string }>();
  const handleResult = (isSuccess: boolean) => {

  };
  useEffect(() => {
    dispatch(getUserByStaffCode({ handleResult, staffCode: id }));
  }, []);

  useEffect(() => {
    if (user) {
      setUserForm({
        staffCode: user.staffCode,
        dateOfBirth: new Date(user.dateOfBirth),
        gender: user.gender,
        joinedDate: new Date(user.joinedDate),
        type: user.roleName === "Admin" ? 1 : 2,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
      });
    }
  }, [user]);

  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">
        Edit User {user?.fullName}
      </div>

      <div className="row">
        {userForm && <UserFormContainer initialUserForm={userForm} />}
      </div>
    </div>
  );
};

export default UpdateUserContainer;
