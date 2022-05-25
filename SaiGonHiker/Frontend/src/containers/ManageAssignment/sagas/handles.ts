import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";

import IError from "src/interfaces/IError";
import IQueryAssignmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";
import {
  setAssignment,
  CreateAction,
  setAssignments,
  setAssignmentById,
  setStatus,
  DeleteAction,
  GetAssignmentAction,
} from "../reducer";

import {
  createAssignmentRequest,
  getAssignmentsRequest,
  getAssignmentByIdRequest,
  UpdateAssignmentRequest,
  DeleteAssignmentRequest,
} from "./requests";
import IAssignmentForm from "src/interfaces/Assignment/IAssignmentForm";
import { BadRequestError } from "src/types/BadRequestError";

export function* handleCreateAssignment(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    const { data } = yield call(createAssignmentRequest, formValues);

    if (data) {
      handleResult(true, "Successfully created");
    }

    yield put(setAssignment(data));
  } catch (error: any) {
    if (error.response.status == 400) {
      const errorModel = error.response.data
        .errors as BadRequestError<IAssignmentForm>;

      for (const i in errorModel) {
        handleResult(false, errorModel[i][0]);
      }
    } else {
      const errorModel = error.response.data as IError;
      handleResult(false, errorModel.message);
    }
  }
}

export function* handleDeleteAssignment(action: PayloadAction<DeleteAction>) {
  const { handleResult, assignmentId } = action.payload;

  try {
    const { data } = yield call(DeleteAssignmentRequest, assignmentId);
    handleResult(data?true:false, data.id);
  } catch (error: any) {
    const errorModel = error.response.data as IError;
    handleResult(false, errorModel.message);
  }
}

export function* handleGetAssignments(
  action: PayloadAction<IQueryAssignmentModel>
) {
  const query = action.payload;
  try {
    const { data } = yield call(getAssignmentsRequest, query);
    yield put(setAssignments(data));
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

export function* handleGetAssignmentById(
  action: PayloadAction<GetAssignmentAction>
) {
  const { assignmentId, handleResult } = action.payload;
  try {
    const { data } = yield call(getAssignmentByIdRequest, assignmentId);
    if (data.assetName) {
      handleResult(true, '');
    } else {
      handleResult(false, '');
    }
    yield put(setAssignmentById(data));
  } catch (error: any) {}
}

export function* handleUpdateAssignment(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    const { data } = yield call(UpdateAssignmentRequest, formValues);

    handleResult(true, data.name);

    yield put(setAssignment(data));
  } catch (error: any) {
    if (error.response.status == 400) {
      const errorModel = error.response.data
        .errors as BadRequestError<IAssignmentForm>;

      for (const i in errorModel) {
        handleResult(false, errorModel[i][0]);
      }
    } else {
      const errorModel = error.response.data as IError;
      handleResult(false, errorModel.message);
    }
  }
}
