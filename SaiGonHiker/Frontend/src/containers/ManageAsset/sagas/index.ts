import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";

import {
  createAsset,
  getCategories,
  getAssets,
  updateAsset,
  getAssetByAssetCode,
  deleteAsset,
  getAssignmentAssets,
} from "../reducer";
import {
  handleCreateAsset,
  handleGetCategories,
  handleGetAssets,
  handleUpdateAsset,
  handleGetAssetByStaffCode,
  handleDeleteAsset,
} from "./handles";

export default function* AssetSagas() {
  yield takeLatest(createAsset.type, handleCreateAsset);
  yield takeLatest(getCategories.type, handleGetCategories);
  yield takeLatest(getAssets.type, (action: PayloadAction<IQueryAssetModel>) => handleGetAssets(action, false));
  yield takeLatest(getAssignmentAssets.type, (action: PayloadAction<IQueryAssetModel>) => handleGetAssets(action, true));
  yield takeLatest(updateAsset.type, handleUpdateAsset);
  yield takeLatest(getAssetByAssetCode.type, handleGetAssetByStaffCode);
  yield takeLatest(deleteAsset.type, handleDeleteAsset);
}
