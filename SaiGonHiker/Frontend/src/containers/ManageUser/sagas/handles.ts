import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";

import IError from "src/interfaces/IError";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import {
  setUser,
  CreateAction,
  setUsers,
  setStatus,
  DisableAction,
  setUserByStaffCode,
  GetUserAction,
  setAssignmentUsers,
} from "../reducer";

import {
  createUserRequest,
  DisableUserRequest,
  getUsersRequest,
  GetUserByStaffCodeRequest,
  UpdateUserRequest,
} from "./requests";
import IUserForm from "src/interfaces/User/IUserForm";
import { BadRequestError } from "src/types/BadRequestError";

export function* handleCreateUser(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;

  try {
    const { data } = yield call(createUserRequest, formValues);

    if (data) {
      handleResult(true, data.userName);
    }

    yield put(setUser(data));
  } catch (error: any) {
    if (error.response.status == 400) {
      const errorModel = error.response.data
        .errors as BadRequestError<IUserForm>;

      for (const i in errorModel) {
        handleResult(false, errorModel[i][0]);
      }
    } else {
      const errorModel = error.response.data as IError;
      handleResult(false, errorModel.message);
    }
  }
}

export function* handleGetUsers(action: PayloadAction<IQueryUserModel>, forCreateAssigment: boolean) {
  const query = action.payload;

  try {
    const { data } = yield call(getUsersRequest, query);
    yield put(forCreateAssigment?setAssignmentUsers(data):setUsers(data));
  } catch (error: any) {
    const errorModel = error.response.data as IError;

    yield put(
      setStatus({
        status: Status.Failed,
        error: errorModel,
      })
    );
  }
}

export function* handleUpdateUser(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    const { data } = yield call(UpdateUserRequest, formValues);
    handleResult(true, data.name);

    yield put(setUser(data));
  } catch (error: any) {
    if (error.response.status == 400) {
      const errorModel = error.response.data
        .errors as BadRequestError<IUserForm>;
        
      for (const i in errorModel) {
        handleResult(false, errorModel[i][0]);
      }
    } else {
      const errorModel = error.response.data as IError;
      handleResult(false, errorModel.message);
    }
  }
}

export function* handleDisableUser(action: PayloadAction<DisableAction>) {
  const { handleResult, staffCode } = action.payload;

  try {
    const { data } = yield call(DisableUserRequest, staffCode);
    handleResult(data, "");
  } catch (error: any) {
    const errorModel = error.response.data as IError;
    handleResult(false, errorModel.message);
  }
}

export function* handleGetUserByStaffCode(action: PayloadAction<GetUserAction>) {
  const { staffCode, handleResult } = action.payload;
  try {
    const { data } = yield call(GetUserByStaffCodeRequest, staffCode);
    if (data.userName)
      handleResult(true, data);
    else {
      handleResult(false, data);
    }
    yield put(setUserByStaffCode(data))
  } catch (error: any) {
  }
}