import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SetStatusType } from 'src/constants/status'

import IError from 'src/interfaces/IError'
import IAssignmentForm from 'src/interfaces/Assignment/IAssignmentForm'
import { PagedModel } from 'src/types/PagedModel'
import IMyAssignemnt from 'src/interfaces/MyAssignment/IMyAssignment'
import IQueryMyAssignmentModel from 'src/interfaces/MyAssignment/IQueryMyAssignmentModel'
import MyAssignmentSagas from './sagas'

type MyAssignmentState = {
  loading: boolean
  assignmentResult?: IMyAssignemnt
  pagedAssignments: PagedModel<IMyAssignemnt, IQueryMyAssignmentModel> | null
  status?: number
  error?: IError
  disable: boolean
}

export type CreateAction = {
  handleResult: Function
  formValues: IAssignmentForm
}

export type DisableAction = {
  handleResult: Function
  assignmentId: number
}

export type AssignmentRespondAction = {
  handleResult: Function
  assignmentId: number
  isAccepted: boolean
}

const initialState: MyAssignmentState = {
  pagedAssignments: null,
  loading: false,
  disable: false,
}

const myassignmentReducerSlice = createSlice({
  name: 'myassignment',
  initialState,
  reducers: {
    getMyAssignments: (state, action: PayloadAction<IQueryMyAssignmentModel>): MyAssignmentState => {
      return {
        ...state,
        loading: true,
      }
    },
    setMyAssignments: (
      state,
      action: PayloadAction<PagedModel<IMyAssignemnt, IQueryMyAssignmentModel>>,
    ): MyAssignmentState => {
      const pagedAssignments = action.payload
      if (state.assignmentResult) {
        pagedAssignments.items.unshift(state.assignmentResult)
      }
      return {
        ...state,
        pagedAssignments,
        assignmentResult: undefined,
        loading: false,
      }
    },
    disableAssignment: (state, action: PayloadAction<DisableAction>): MyAssignmentState => {
      return {
        ...state,
        loading: true,
      }
    },
    respondToAssignment: (state, action: PayloadAction<AssignmentRespondAction>): MyAssignmentState => {
      return {
        ...state,
        loading: true,
      }
    },
    doneRespondToAssignment: (state): MyAssignmentState => {
      return {
        ...state,
        loading: false,
      }
    },
    setMyAssignment: (state, action: PayloadAction<IMyAssignemnt>): MyAssignmentState => {
      const assignmentResult = action.payload

      return {
        ...state,
        assignmentResult,
        loading: false,
      }
    },
    setStatus: (state, action: PayloadAction<SetStatusType>): MyAssignmentState => {
      const { status, error } = action.payload

      return {
        ...state,
        status,
        error,
        loading: false,
      }
    },
    cleanUp: (state): MyAssignmentState => ({
      ...state,
      loading: false,
      assignmentResult: undefined,
      status: undefined,
      error: undefined,
    })
  },
})

export const {
  setMyAssignment,
  setStatus,
  cleanUp,
  getMyAssignments,
  setMyAssignments,
  disableAssignment,
  respondToAssignment,
  doneRespondToAssignment
} = myassignmentReducerSlice.actions

export default myassignmentReducerSlice.reducer
