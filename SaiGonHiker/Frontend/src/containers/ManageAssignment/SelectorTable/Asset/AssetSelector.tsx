import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "react-feather";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { getAssets, getAssignmentAssets } from "../../../ManageAsset/reducer";
import AssetTable from "./AssetTable";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_ASSET_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT,
} from "src/constants/paging";
import { AvailableValue } from "src/constants/Asset/AssetConstant";

type Props = {
  handleSave?: (staffCode: string, name:string) => void,
  handleCancel?: () => void,
  currCodeSelected?: string
  currNameSelected?: string
};
const AssetSelector: React.FC<Props> = ({ handleCancel, handleSave, currCodeSelected, currNameSelected }) => {
  const dispatch = useAppDispatch();
  const { pagedAssignmentAssets } = useAppSelector(
    (state) => state.assetReducer
  );
  const { account } = useAppSelector((state) => state.authReducer);
  const [query, setQuery] = useState({
    Page: 1,
    Limit: DEFAULT_PAGE_LIMIT,
    SortOrder: ACCSENDING,
    SortColumn: DEFAULT_ASSET_SORT_COLUMN_NAME,
    Location: account?.location,
    States: [AvailableValue]
  } as IQueryAssetModel);

  const [search, setSearch] = useState("");
  const [selectedAssetName, setSelectedAssetName] = useState(currNameSelected);
  const [selectedAssetCode, setSelectedAssetCode] = useState(currCodeSelected);
  const handleChangeSearch = (e) => {
    e.preventDefault();

    const Search = e.target.value;
    setSearch(Search);
  };

  const handlePage = (Page: number) => {
    setQuery({
      ...query,
      Page,
    });
  };

  const handleSearch = () => {
    setQuery({
      ...query,
      Search: search,
      Page: 1,
    });
  };

  const handleSort = (SortColumn: string) => {
    const SortOrder = query.SortOrder === ACCSENDING ? DECSENDING : ACCSENDING;

    setQuery({
      ...query,
      SortOrder,
      SortColumn,
    });
  };

  const fetchData = () => {
    if (query.Location) dispatch(getAssignmentAssets(query));
  };
  
  const handleAssetSelected = (assetCode: string, name: string) => {
    setSelectedAssetCode(assetCode);
    setSelectedAssetName(name);
  };

  useEffect(() => {
    if (!query.Location) {
      setQuery({
        ...query,
        Location: account?.location,
      });
    }
    fetchData();
  }, [query, account]);

  return (
    <>
      <div>
        <div className="d-flex intro-x justify-content-between h-auto">
          <div className="primaryColor text-title intro-x m-0">Select Asset</div>
          <div>
            <div className="input-group">
              <input
                onChange={handleChangeSearch}
                value={search}
                type="text"
                className="form-control"
              />
              <span
                onClick={handleSearch}
                className="d-flex align-items-center rounded-right border-bottom border-top border-right px-2 pointer"
              >
                <SearchIcon />
              </span>
            </div>
          </div>
        </div>

        <AssetTable
          pagedAssets={pagedAssignmentAssets}
          handlePage={handlePage}
          handleSort={handleSort}
          sortState={{
            columnValue: query.SortColumn,
            orderBy: query.SortOrder,
          }}
          fetchData={fetchData}
          handleAssetSelected={handleAssetSelected}
          currentAssetSelected={selectedAssetCode}
        />
      </div>
      <div className="d-flex justify-content-end my-3">
          <button
            onClick={()=>{
              console.log(selectedAssetCode, selectedAssetName)
              handleSave?handleSave(selectedAssetCode as string, selectedAssetName as string):{}
            }}
            className="btn btn-danger mx-3"
            type="submit"
            disabled={selectedAssetCode?false:true}
          >
            Save
          </button>

          <button
            onClick={handleCancel}
            className="btn btn-outline-secondary"
            type="button"
          >
            Cancel
          </button>
      </div>
    </>
  );
};

export default AssetSelector;
