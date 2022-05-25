import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SetStatusType, Status } from "src/constants/status";
import IAccount from "src/interfaces/IAccount";
import IChangePassword from "src/interfaces/IChangePassword";
import IError from "src/interfaces/IError";
import ILoginModel from "src/interfaces/ILoginModel";
import ISubmitAction from "src/interfaces/ISubmitActions";
import request from "src/services/request";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "src/utils/localStorage";

type AuthState = {
    loading: boolean;
    isAuth: boolean,
    account?: IAccount;
    status?: number;
    error?: IError;
}

const token = getLocalStorage('token');

const initialState: AuthState = {
    isAuth: !!token,
    loading: false,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccount: (state: AuthState, action: PayloadAction<IAccount>): AuthState => {
            const account = action.payload;
            if (account?.token) {
                setLocalStorage('token', account.token);
                request.setAuthentication(account.token);
            }
            return {
                ...state,
                // status: Status.Success,
                account,
                isAuth: account.userName!=null,
                loading: false,
            };
        },
        setStatus: (state: AuthState, action: PayloadAction<SetStatusType>) =>
        {
            const {status, error} = action.payload;
            if (status === Status.Unauthentication){
                return {
                    ...state,
                    status,
                    isAuth: false,
                    error,
                    loading: false,
                }
            }else{
                return {
                    ...state,
                    status,
                    error,
                    loading: false,
                }
            }
        },
        me: (state) => {
            if (token) {
                request.setAuthentication(token);
            }
        },
        login: (state: AuthState, action: PayloadAction<ILoginModel>) => ({
            ...state,
            loading: true,
        }),
        accountAuthReject: (state: AuthState, action: PayloadAction<IAccount>): AuthState=>{
            let message = "";

            if (action.payload.isDisabled)
                message =  "Your account is disabled. Please contact with IT Team";
            else if (!action.payload.isSuccess)
                message =  "Username or password is incorrect. Please try again";
            
            const error: IError = {
                error: true,
                message
            }

            return {
                ...state,
                isAuth: false,
                error,
                loading: false,
            };
            
        },
        changePassword: (state: AuthState, action: PayloadAction<ISubmitAction<IChangePassword>>) => {
            return {
                ...state,
                loading: true,
            }
        },
        logout: (state: AuthState) => {

            removeLocalStorage('token');
            request.setAuthentication('')

            return {
                ...state,
                isAuth: false,
                account: undefined,
                status: undefined,
            };
        },
        cleanUp: (state) => ({
            ...state,
            loading: false,
            status: undefined,
            error: undefined,
        }),
    }
});

export const {
    setAccount, login, setStatus, me, changePassword, logout, cleanUp, accountAuthReject
} = AuthSlice.actions;

export default AuthSlice.reducer;
