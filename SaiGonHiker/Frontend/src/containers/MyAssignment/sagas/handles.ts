import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";

import IError from "src/interfaces/IError";
import IQueryAssignmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";
import {
  AssignmentRespondAction,
  doneRespondToAssignment,
  setMyAssignments,
  setStatus,
} from "../reducer";

import {
  acceptAssignmentsRequest,
  declineAssignmentsRequest,
  getMyAssignmentsRequest,
} from "./requests";

export function* handleGetMyAssignments(
  action: PayloadAction<IQueryAssignmentModel>
) {
  const query = action.payload;
  try {
    const { data } = yield call(getMyAssignmentsRequest, query);
    yield put(setMyAssignments(data));
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

export function* handleRespondToAssignment(
  action: PayloadAction<AssignmentRespondAction>
) {
  const { assignmentId, isAccepted, handleResult } = action.payload;
  try {
    const { data } = yield call(
      isAccepted ? acceptAssignmentsRequest : declineAssignmentsRequest,
      assignmentId
    );
    handleResult(data, assignmentId);
    yield put(doneRespondToAssignment())
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
