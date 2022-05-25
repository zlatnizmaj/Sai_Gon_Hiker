import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";

import IError from "src/interfaces/IError";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import {
  setAsset,
  deleteAsset,
  CreateAction,
  setAssets,
  setStatus,
  DisableAction,
  setCategories,
  setAssetByAssetCode,
  GetAssetAction,
  DeleteAction,
  setAssignmentAssets
} from "../reducer";

import {
  createAssetRequest,
  DeleteAssetRequest,
  getAssetsRequest,
  getCategoriesRequest,
  GetAssetByStaffCodeRequest,
  UpdateAssetRequest,
} from "./requests";

import IAssetForm from "src/interfaces/Asset/IAssetForm";
import { BadRequestError } from "src/types/BadRequestError";


export function* handleCreateAsset(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;

  try {
    const { data } = yield call(createAssetRequest, formValues);

    if (data) {
      handleResult(true, data.name);
    }

    yield put(setAsset(data));
  } catch (error: any) {
    if (error.response.status == 400) {
      const errorModel = error.response.data
        .errors as BadRequestError<IAssetForm>;

      for (const i in errorModel) {
        handleResult(false, errorModel[i][0]);
      }
    } else {
      const errorModel = error.response.data as IError;
      handleResult(false, errorModel.message);
    }
  }
}

export function* handleGetCategories(action: PayloadAction) {
  try {
    const { data } = yield call(getCategoriesRequest);
    yield put(setCategories(data));
  } catch (error: any) {
    if (error.response.status == 400) {
      const errorModel = error.response.data
        .errors as BadRequestError<IAssetForm>;
    } else {
      const errorModel = error.response.data as IError;
    }
  }
}

export function* handleGetAssets(action: PayloadAction<IQueryAssetModel>, forCreateAssigment: boolean) {
  const query = action.payload;
  try {
    const { data } = yield call(getAssetsRequest, query);
    
    yield put(forCreateAssigment?setAssignmentAssets(data):setAssets(data));
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

export function* handleDeleteAsset(action: PayloadAction<DeleteAction>) {
  const { handleResult, assetCode } = action.payload;

  try {
    const { data } = yield call(DeleteAssetRequest, assetCode);
    handleResult(data.assetCode?true:false, assetCode);
  } catch (error: any) {
    const errorModel = error.response.data as IError;

    handleResult(false, errorModel.message);
  }
}

export function* handleUpdateAsset(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    const { data } = yield call(UpdateAssetRequest, formValues);

    handleResult(true, data.name);

    yield put(setAsset(data));

  } catch (error: any) {
    if (error.response.status == 400) {
      const errorModel = error.response.data
        .errors as BadRequestError<IAssetForm>;
        
      for (const i in errorModel) {
        handleResult(false, errorModel[i][0]);
      }
    }else{
        const errorModel = error.response.data as IError;
        handleResult(false, errorModel.message);
    }
  }
}

export function* handleGetAssetByStaffCode(action: PayloadAction<GetAssetAction>){
  const {assetCode, handleResult} = action.payload;
  try {
    const { data } = yield call(GetAssetByStaffCodeRequest, assetCode);
    if (data.userName)
      handleResult(true, data);
    else{
      handleResult(false, data);
    }
    yield put(setAssetByAssetCode(data))
  } catch (error: any) {
  }
}


