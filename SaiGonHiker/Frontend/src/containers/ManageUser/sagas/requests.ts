import { AxiosResponse } from "axios";
import qs from 'qs';

import RequestService from 'src/services/request';
import EndPoints from 'src/constants/endpoints';
import IUserForm from "src/interfaces/User/IUserForm";
import IUser from "src/interfaces/User/IUser";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import { PagedModel } from "src/types/PagedModel";

export function createUserRequest(userForm: IUserForm): Promise<AxiosResponse<IUser>> {
    return RequestService.axios.post(EndPoints.user, userForm, {
        paramsSerializer: params => qs.stringify(params),
    });
}

export function getUsersRequest(query: IQueryUserModel): Promise<AxiosResponse<PagedModel<IUser, IQueryUserModel>>> {
    return RequestService.axios.get(EndPoints.user, {
        params: query,
        paramsSerializer: params => qs.stringify(params),
    });
}

export function GetUserByStaffCodeRequest(staffCode: string ): Promise<AxiosResponse<IUser>> {
    return RequestService.axios.get(EndPoints.userId(staffCode));
}

export function UpdateUserRequest(userForm: IUserForm): Promise<AxiosResponse<IUser>> {
    return RequestService.axios.put(EndPoints.userId(userForm.id ?? ""), userForm, {
        paramsSerializer: params => qs.stringify(params),
    });
}

export function DisableUserRequest(userId: string): Promise<AxiosResponse<Boolean>> {
    return RequestService.axios.delete(EndPoints.userId(userId ?? ""));
}