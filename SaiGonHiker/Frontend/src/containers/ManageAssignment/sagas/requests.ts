import { AxiosResponse } from "axios";
import qs from 'qs';

import RequestService from 'src/services/request';
import EndPoints from 'src/constants/endpoints';
import { PagedModel } from "src/types/PagedModel";
import IAssignmentForm from "src/interfaces/Assignment/IAssignmentForm";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IQueryAssignmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";

export function createAssignmentRequest(assignmentForm: IAssignmentForm): Promise<AxiosResponse<IAssignment>> {
    return RequestService.axios.post(EndPoints.assignment, assignmentForm, {
        paramsSerializer: params => qs.stringify(params),
    });
}

export function getAssignmentsRequest(query: IQueryAssignmentModel): Promise<AxiosResponse<PagedModel<IAssignment, IQueryAssignmentModel>>> {
    return RequestService.axios.get(EndPoints.assignment, {
        params: query,
        paramsSerializer: params => qs.stringify(params),
    });
}

export function getAssignmentByIdRequest(assignmentId: string | number): Promise<AxiosResponse<IAssignment>> {
    return RequestService.axios.get(EndPoints.assignmentId(assignmentId))
}

export function UpdateAssignmentRequest(assignmentForm: IAssignmentForm): Promise<AxiosResponse<IAssignment>> {
    return RequestService.axios.put(EndPoints.assignmentId(''), assignmentForm, {
        paramsSerializer: params => qs.stringify(params),
    });
}

export function DeleteAssignmentRequest(assignmentId: number): Promise<AxiosResponse<Boolean>> {
    return RequestService.axios.delete(EndPoints.assignmentId(assignmentId));
}
