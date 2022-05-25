import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SetStatusType } from 'src/constants/status'

import IError from 'src/interfaces/IError'
import IQueryAssetModel from 'src/interfaces/Asset/IQueryAssetModel'
import IAsset from 'src/interfaces/Asset/IAsset'
import IAssetForm from 'src/interfaces/Asset/IAssetForm'
import { PagedModel } from 'src/types/PagedModel'
import ICategory from 'src/interfaces/Asset/ICategory'

type AssetState = {
  loading: boolean
  assetResult?: IAsset
  pagedAssets: PagedModel<IAsset, IQueryAssetModel> | null,
  pagedAssignmentAssets: PagedModel<IAsset, IQueryAssetModel> | null,
  status?: number
  error?: IError
  disable: boolean
  categories?: Array<ICategory>
  asset?:IAsset
}

export type CreateAction = {
  handleResult: Function
  formValues: IAssetForm
}

export type DisableAction = {
  handleResult: Function;
  assetCode: string;
};

export type DeleteAction = {
  handleResult: Function;
  assetCode: string;
}

export type GetAssetAction = {
  handleResult: Function,
  assetCode: string,
}

const initialState: AssetState = {
  pagedAssets: null,
  pagedAssignmentAssets: null,
  loading: false,
  disable: false,
}

const assetReducerSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    getAssets: (state, action: PayloadAction<IQueryAssetModel>): AssetState => {
      return {
        ...state,
        loading: true,
      }
    },
    setAssets: (
      state,
      action: PayloadAction<PagedModel<IAsset, IQueryAssetModel>>
    ): AssetState => {
      const pagedAssets = action.payload
      if (state.assetResult) {
        pagedAssets.items.unshift(state.assetResult)
      }
      return {
        ...state,
        pagedAssets,
        assetResult: undefined,
        loading: false,
      }
    },
    getAssignmentAssets:  (state, action: PayloadAction<IQueryAssetModel>): AssetState => {
      return {
        ...state,
        loading: true,
      }
    },
    setAssignmentAssets:  (
      state,
      action: PayloadAction<PagedModel<IAsset, IQueryAssetModel>>
    ): AssetState => {
      const pagedAssignmentAssets = action.payload
      
      return {
        ...state,
        pagedAssignmentAssets,
        loading: false,
      }
    },
    createAsset: (state, action: PayloadAction<CreateAction>): AssetState => {
      return {
        ...state,
        loading: true,
      }
    },
    updateAsset: (state, action: PayloadAction<CreateAction>): AssetState => {
      return {
        ...state,
        loading: true,
      }
    },
    deleteAsset: (state, action: PayloadAction<DeleteAction>): AssetState => {
      return {
        ...state,
        loading: true,
      }
    },
    setAsset: (state, action: PayloadAction<IAsset>): AssetState => {
      const assetResult = action.payload

      return {
        ...state,
        assetResult,
        loading: false,
      }
    },
    setStatus: (state, action: PayloadAction<SetStatusType>): AssetState => {
      const { status, error } = action.payload

      return {
        ...state,
        status,
        error,
        loading: false,
      }
    },
    cleanUp: (state): AssetState => ({
      ...state,
      loading: false,
      assetResult: undefined,
      asset:undefined,
      status: undefined,
      error: undefined,
    }),
    getAssetByStaffCode: (state, action: PayloadAction<GetAssetAction>): AssetState => {
      return {
          ...state,
          loading: true,
      }
    },
    setUserByStaffCode: (state, action: PayloadAction<IAsset>): AssetState => {
      const asset = action.payload
      return {
          ...state,
          asset
      }
    },
    getCategories: (state): AssetState => ({
      ...state,
      loading: true,
    }),
    setCategories: (
      state,
      action: PayloadAction<Array<ICategory>>,
    ): AssetState => {
      return {
        ...state,
        loading: false,
        categories: action.payload,
      }
    },
    getAssetByAssetCode: (state, action: PayloadAction<GetAssetAction>): AssetState => {
      return {
          ...state,
          loading: true,
      }
    },
    setAssetByAssetCode: (state, action: PayloadAction<IAsset>): AssetState => {
      const asset = action.payload
      return {
          ...state,
          asset
      }
    }
  },
})

export const {
  createAsset,
  setAsset,
  setStatus,
  cleanUp,
  getAssets,
  setAssets,
  getAssignmentAssets,
  setAssignmentAssets,
  updateAsset,
  deleteAsset,
  getCategories,
  setCategories,
  getAssetByAssetCode,
  setAssetByAssetCode
} = assetReducerSlice.actions

export default assetReducerSlice.reducer
