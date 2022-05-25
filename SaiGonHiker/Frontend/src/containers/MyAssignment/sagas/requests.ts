import { AxiosResponse } from "axios";
import qs from 'qs';

import RequestService from 'src/services/request';
import EndPoints from 'src/constants/endpoints';
import { PagedModel } from "src/types/PagedModel";
import IMyAssignemnt from 'src/interfaces/MyAssignment/IMyAssignment'
import IQueryMyAssignmentModel from 'src/interfaces/MyAssignment/IQueryMyAssignmentModel'

export function getMyAssignmentsRequest(query: IQueryMyAssignmentModel): Promise<AxiosResponse<PagedModel<IMyAssignemnt, IQueryMyAssignmentModel>>> {
    return RequestService.axios.get(EndPoints.myassignment, {
        params: query,
        paramsSerializer: params => qs.stringify(params),
    });
}

export function acceptAssignmentsRequest(assignmentId: number): Promise<AxiosResponse<boolean>> {
    return RequestService.axios.post(EndPoints.acceptAssignmentId(assignmentId));
}

export function declineAssignmentsRequest(assignmentId: number): Promise<AxiosResponse<boolean>> {
    return RequestService.axios.post(EndPoints.declineAssignmentId(assignmentId));
}