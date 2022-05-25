import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import IUser from "src/interfaces/User/IUser";
import IUserForm from "src/interfaces/User/IUserForm";
import { PagedModel } from "src/types/PagedModel";

type UserState = {
  loading: boolean;
  userResult?: IUser;
  pagedUsers: PagedModel<IUser, IQueryUserModel> | null;
  pagedAssignmentUsers: PagedModel<IUser, IQueryUserModel> | null;
  status?: number;
  error?: IError;
  disable: boolean;
  user?: IUser;
};

export type CreateAction = {
  handleResult: Function;
  formValues: IUserForm;
};

export type DisableAction = {
  handleResult: Function;
  staffCode: string;
};

export type GetUserAction = {
  handleResult: Function;
  staffCode: string;
};

const initialState: UserState = {
  pagedUsers: null,
  pagedAssignmentUsers: null,
  loading: false,
  disable: false,
};

const userReducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<IQueryUserModel>): UserState => {
      return {
        ...state,
        loading: true,
      };
    },
    setUsers: (
      state,
      action: PayloadAction<PagedModel<IUser, IQueryUserModel>>
    ): UserState => {
      const pagedUsers = action.payload;
      if (state.userResult) {
        pagedUsers.items.unshift(state.userResult);
      }

      return {
        ...state,
        pagedUsers,
        userResult: undefined,
        loading: false,
      };
    },
    getAssignmentUsers:(state, action: PayloadAction<IQueryUserModel>): UserState => {
        return {
          ...state,
          loading: true,
        };
      },
    setAssignmentUsers: (
        state,
        action: PayloadAction<PagedModel<IUser, IQueryUserModel>>
      ): UserState => {
        const pagedAssignmentUsers = action.payload;
        
        return {
          ...state,
          pagedAssignmentUsers,
          loading: false,
        };
      },
    createUser: (state, action: PayloadAction<CreateAction>): UserState => {
      return {
        ...state,
        loading: true,
      };
    },
    updateUser: (state, action: PayloadAction<CreateAction>): UserState => {
      return {
        ...state,
        loading: true,
      };
    },
    disableUser: (state, action: PayloadAction<DisableAction>): UserState => {
      return {
        ...state,
        loading: true,
      };
    },
    setUser: (state, action: PayloadAction<IUser>): UserState => {
      const userResult = action.payload;

      return {
        ...state,
        userResult,
        loading: false,
      };
    },
    setStatus: (state, action: PayloadAction<SetStatusType>): UserState => {
      const { status, error } = action.payload;

      return {
        ...state,
        status,
        error,
        loading: false,
      };
    },
    cleanUp: (state): UserState => ({
      ...state,
      loading: false,
      userResult: undefined,
      user: undefined,
      status: undefined,
      error: undefined,
    }),
    getUserByStaffCode: (
      state,
      action: PayloadAction<GetUserAction>
    ): UserState => {
      return {
        ...state,
        loading: true,
      };
    },
    setUserByStaffCode: (state, action: PayloadAction<IUser>): UserState => {
      const user = action.payload;
      return {
        ...state,
        user,
      };
    },
  },
});

export const {
  createUser,
  setUser,
  setStatus,
  cleanUp,
  getUsers,
  setUsers,
  updateUser,
  disableUser,
  getUserByStaffCode,
  setUserByStaffCode,
  getAssignmentUsers,
  setAssignmentUsers,
} = userReducerSlice.actions;

export default userReducerSlice.reducer;
