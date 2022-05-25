import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { getAssetByAssetCode } from "../reducer";
import AssetFormContainer from "../AssetForm";
import IAssetForm from "src/interfaces/Asset/IAssetForm";

const UpdateAssetContainer = () => {
  const { asset } = useAppSelector((state) => state.assetReducer);
  const dispatch = useAppDispatch();
  const [assetForm, setAssetForm] = useState(undefined as IAssetForm | undefined);

  const { id } = useParams<{ id: string }>();
  const handleResult = (isSuccess: boolean) => {

  };
  useEffect(() => {
    dispatch(getAssetByAssetCode({ handleResult, assetCode: id }));
  }, []);

  useEffect(() => {
    if (asset) {
        setAssetForm({
            assetCode: asset.assetCode,
            categoryId: asset.categoryId,
            installedDate: new Date(asset.installedDate),
            name: asset.name,
            specification: asset.specification,
            stateId: asset.stateId,
            location: asset.location
      });
    }
  }, [asset]);

  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">
        Edit Asset {asset?.name}
      </div>

      <div className="row">
        {assetForm && <AssetFormContainer initialAssetForm={assetForm} />}
      </div>
    </div>
  );
};

export default UpdateAssetContainer;
