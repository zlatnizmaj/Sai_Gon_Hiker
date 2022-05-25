import { AxiosResponse } from "axios";
import qs from 'qs';

import RequestService from 'src/services/request';
import EndPoints from 'src/constants/endpoints';
import { PagedModel } from "src/types/PagedModel";
import IAssetForm from "src/interfaces/Asset/IAssetForm";
import IAsset from "src/interfaces/Asset/IAsset";
import ICategory from "src/interfaces/Asset/ICategory";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";

export function createAssetRequest(assetForm: IAssetForm): Promise<AxiosResponse<IAsset>> {
    return RequestService.axios.post(EndPoints.asset, assetForm, {
        paramsSerializer: params => qs.stringify(params),
    });
}

export function getCategoriesRequest(): Promise<AxiosResponse<Array<ICategory>>> {
    return RequestService.axios.get(EndPoints.category);
}

export function getAssetsRequest(query: IQueryAssetModel): Promise<AxiosResponse<PagedModel<IAsset, IQueryAssetModel>>> {
    return RequestService.axios.get(EndPoints.asset, {
        params: query,
        paramsSerializer: params => qs.stringify(params),
    });
}

export function GetAssetByStaffCodeRequest(assetCode: string): Promise<AxiosResponse<IAsset>> {
    return RequestService.axios.get(EndPoints.assetCode(assetCode));
}

export function UpdateAssetRequest(assetForm: IAssetForm): Promise<AxiosResponse<IAsset>> {
    return RequestService.axios.put(EndPoints.assetCode(assetForm.id ?? ''), assetForm, {
        paramsSerializer: params => qs.stringify(params),
    });
}

export function DeleteAssetRequest(assetCode: string): Promise<AxiosResponse<IAsset>> {
    return RequestService.axios.delete(EndPoints.assetCode(assetCode));
}
