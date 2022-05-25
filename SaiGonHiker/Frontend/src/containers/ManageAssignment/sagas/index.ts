import { takeLatest } from "redux-saga/effects";
import {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../reducer";
import {
  handleGetAssignments,
  handleGetAssignmentById,
  handleCreateAssignment,
  handleUpdateAssignment,
  handleDeleteAssignment,
} from "../sagas/handles";

export default function* AssignmentSagas() {
  yield takeLatest(getAssignments.type, handleGetAssignments);
  yield takeLatest(getAssignmentById.type, handleGetAssignmentById);
  yield takeLatest(createAssignment.type, handleCreateAssignment);
  yield takeLatest(deleteAssignment.type, handleDeleteAssignment);
  yield takeLatest(updateAssignment.type, handleUpdateAssignment);
}
