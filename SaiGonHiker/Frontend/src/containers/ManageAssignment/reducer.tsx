import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SetStatusType } from 'src/constants/status'

import IError from 'src/interfaces/IError'
import IQueryAssignmentModel from 'src/interfaces/Assignment/IQueryAssignmentModel'
import IAssignment from 'src/interfaces/Assignment/IAssignment'
import IAssignmentForm from 'src/interfaces/Assignment/IAssignmentForm'
import { PagedModel } from 'src/types/PagedModel'

type AssignmentState = {
  loading: boolean
  assignmentResult?: IAssignment
  assignment?: IAssignment
  pagedAssignments: PagedModel<IAssignment, IQueryAssignmentModel> | null
  status?: number
  error?: IError
  disable: boolean
}

export type CreateAction = {
  handleResult: Function
  formValues: IAssignmentForm
}

export type DeleteAction = {
  handleResult: Function
  assignmentId: number
}

export type GetAssignmentAction = {
  handleResult: Function
  assignmentId: string
}

const initialState: AssignmentState = {
  pagedAssignments: null,
  loading: false,
  disable: false,
}

const assignmentReducerSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    getAssignments: (state, action: PayloadAction<IQueryAssignmentModel>): AssignmentState => {
      return {
        ...state,
        loading: true,
      }
    },
    setAssignments: (
      state,
      action: PayloadAction<PagedModel<IAssignment, IQueryAssignmentModel>>,
    ): AssignmentState => {
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
    getAssignmentById: (state, action: PayloadAction<GetAssignmentAction>): AssignmentState => {
      return {
        ...state,
        loading: true,
      }
    },
    setAssignmentById: (state, action: PayloadAction<IAssignment>): AssignmentState => {
      const assignment = action.payload
      return {
        ...state,
        assignment
      }
    },
    createAssignment: (state, action: PayloadAction<CreateAction>): AssignmentState => {
      return {
        ...state,
        loading: true,
      }
    },
    updateAssignment: (state, action: PayloadAction<CreateAction>): AssignmentState => {
      return {
        ...state,
        loading: true,
      }
    },
    setAssignment: (state, action: PayloadAction<IAssignment>): AssignmentState => {
      const assignmentResult = action.payload

      return {
        ...state,
        assignmentResult,
        loading: false,
      }
    },
    setStatus: (state, action: PayloadAction<SetStatusType>): AssignmentState => {
      const { status, error } = action.payload

      return {
        ...state,
        status,
        error,
        loading: false,
      }
    },
    deleteAssignment: (state, action: PayloadAction<DeleteAction>): AssignmentState => ({
      ...state,
      loading: true,
    }),
    cleanUp: (state): AssignmentState => ({
      ...state,
      loading: false,
      assignmentResult: undefined,
      status: undefined,
      error: undefined,
    })
  },
})

export const {
  createAssignment,
  setAssignment,
  setStatus,
  cleanUp,
  getAssignments,
  setAssignments,
  getAssignmentById,
  setAssignmentById,
  updateAssignment,
  deleteAssignment
} = assignmentReducerSlice.actions

export default assignmentReducerSlice.reducer
