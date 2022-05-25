import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import { Search as SearchIcon } from "react-feather";
import Select from "react-select";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";

import { getAssets } from "../reducer";
import AssetTable from "./AssetTable";
import { MANAGE_ASSET } from "src/constants/pages";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import ISelectOption from "src/interfaces/ISelectOption";
import { StateAssetTypeOptions } from "src/constants/selectOptions";
import { CategoryAssetTypeOptions } from "src/constants/selectOptions";
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_ASSET_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT,
} from "src/constants/paging";
import {
  AssignedValue,
  AvailableValue,
  NotAvailableValue,
} from "src/constants/Asset/AssetConstant";

const ManageAsset = () => {
  const dispatch = useAppDispatch();

  const { pagedAssets, assetResult } = useAppSelector(
    (state) => state.assetReducer
  );

  const { account } = useAppSelector((state) => state.authReducer);

  const [query, setQuery] = useState({
    Page: 1,
    Limit: DEFAULT_PAGE_LIMIT,
    SortOrder: ACCSENDING,
    SortColumn: DEFAULT_ASSET_SORT_COLUMN_NAME,
    Location: account?.location,
    Search: "",
  } as IQueryAssetModel);

  const [search, setSearch] = useState("");

  const [selectedState, setSelectedState] = useState(
    StateAssetTypeOptions.filter(
      (i) =>
        i.value === AvailableValue ||
        i.value === NotAvailableValue ||
        i.value === AssignedValue
    )
  );

  const [selectedCategory, setSelectedCategory] = useState(
    [] as ISelectOption[]
  );
  const handleState = (selected: ISelectOption[]) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        States: [],
        Page: 1,
      });

      setSelectedState([StateAssetTypeOptions[0]]);
      return;
    }

    const selectedAll = selected.find((item) => item.id === 1);

    setSelectedState((prevSelected) => {
      if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
        setQuery({
          ...query,
          States: [],
          Page: 1,
        });

        return [selectedAll];
      }

      const newSelected = selected.filter((item) => item.id !== 1);
      const state = newSelected.map((item) => item.value);

      setQuery({
        ...query,
        States: state as number[],
        Page: 1,
      });

      return newSelected;
    });
  };

  const handleCategory = (selected: ISelectOption[]) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        Categories: [],
        Page: 1,
      });

      setSelectedCategory([CategoryAssetTypeOptions[0]]);
      return;
    }
    const selectedAll = selected.find((item) => item.id === 1);

    setSelectedCategory((prevSelected) => {
      if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
        setQuery({
          ...query,
          Categories: [],
          Page: 1,
        });

        return [selectedAll];
      }

      const newSelected = selected.filter((item) => item.id !== 1);
      const category = newSelected.map((item) => item.value);

      setQuery({
        ...query,
        Categories: category as number[],
        Page: 1,
      });

      return newSelected;
    });
  };

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

  const handleCloseMutiple = () => {};

  const fetchData = () => {
    if (query.Location) dispatch(getAssets(query));
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

  const style = {
    dropdownButton: () => ({
      maxWidth: "100%",
      width: "200px",
      backgroundColor: "#fff",
      boxShadow: "none",
      padding: "8px 8px 4px 8px",
      fontWidth: "400",
      display: "inline-flex",
      textAlign: "left",
      borderRight: "1px solid #ddd",
    }),
  };

  return (
    <>
      <div className="primaryColor text-title intro-x">Asset List</div>

      <div>
        <div className="d-flex mb-5 intro-x">
          <div className="d-flex align-items-center mr-5 border">
            <ReactMultiSelectCheckboxes
              options={StateAssetTypeOptions}
              hideSearch={true}
              placeholderButtonLabel={"State"}
              value={selectedState}
              onChange={handleState}
              onMenuClose={handleCloseMutiple}
              styles={style}
            />

            <div className="p-2">
              <FunnelFill />
            </div>
          </div>
          <div className="d-flex align-items-center mr-5 border">
            <ReactMultiSelectCheckboxes
              options={CategoryAssetTypeOptions}
              hideSearch={true}
              placeholderButtonLabel="Category"
              value={selectedCategory}
              onChange={handleCategory}
              styles={style}
            />

            <div className="p-2">
              <FunnelFill />
            </div>
          </div>
          <div className="d-flex align-items-center w-ld ml-auto">
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

          <div className="d-flex align-items-center ml-3">
            <Link
              to={MANAGE_ASSET.CREATE}
              type="button"
              className="btn btn-danger"
            >
              Create New Asset
            </Link>
          </div>
        </div>
        <AssetTable
          pagedAssets={pagedAssets}
          handlePage={handlePage}
          handleSort={handleSort}
          sortState={{
            columnValue: query.SortColumn,
            orderBy: query.SortOrder,
          }}
          fetchData={fetchData}
        />
      </div>
    </>
  );
};

export default ManageAsset;
