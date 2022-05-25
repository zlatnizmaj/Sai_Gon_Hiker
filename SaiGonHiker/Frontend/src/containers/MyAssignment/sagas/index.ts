import { takeLatest } from "redux-saga/effects";
import { respondToAssignment, getMyAssignments } from "../reducer";
import {
  handleGetMyAssignments,
  handleRespondToAssignment,
} from "../sagas/handles";

export default function* MyAssignmentSagas() {
  yield takeLatest(getMyAssignments.type, handleGetMyAssignments);
  yield takeLatest(respondToAssignment.type, handleRespondToAssignment);
}
