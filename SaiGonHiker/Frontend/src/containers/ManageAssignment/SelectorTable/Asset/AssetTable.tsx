import React, { useEffect, useState } from "react";

import Table, { SortType } from "src/components/Table";
import IAsset from "src/interfaces/Asset/IAsset";
import IColumnOption from "src/interfaces/IColumnOption";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import { PagedModel } from "src/types/PagedModel";

const column: IColumnOption[] = [
  { columnName: "", columnValue: "radio", isSortable: false },
  { columnName: "Asset code", columnValue: "assetCode", isSortable: true },
  { columnName: "Asset Name", columnValue: "name", isSortable: true },
  { columnName: "Category", columnValue: "category", isSortable: true },
];

type Props = {
  pagedAssets: PagedModel<IAsset, IQueryAssetModel> | null;
  handlePage: (page: number) => void;
  handleSort: (colValue: string) => void;
  sortState: SortType;
  fetchData: Function;
  handleAssetSelected: (name: string, code: string) => void;
  currentAssetSelected?: string;
};

const AssetTable: React.FC<Props> = ({
  pagedAssets,
  handlePage,
  sortState,
  handleSort,
  fetchData,
  handleAssetSelected,
  currentAssetSelected,
}) => {
  useEffect(() => {
    fetchData();
  }, []);

  const handleCheck = (code: string, name: string) => {
    if (currentAssetSelected === code){
      handleAssetSelected(code, name)
      return true
    }
    return false
  }

  return (
    <>
      <Table
        columns={column}
        sortState={sortState}
        handleSort={handleSort}
        page={{
          currentPage: pagedAssets?.currentPage,
          totalPage: pagedAssets?.totalPages,
          handleChange: handlePage,
        }}
      >
        {pagedAssets?.items.map((data, index) => (
          <tr key={index} onClick={()=>handleAssetSelected(data.assetCode, data.name)}>
            <td style={{ border: "none" }}>
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  id={index.toString()}
                  type="radio"
                  value={data.assetCode}
                  onChange={(value)=>handleAssetSelected(data.assetCode, data.name)}
                  checked={handleCheck(data.assetCode, data.name)}
                />
              </div>
            </td>
            <td>{data.assetCode}</td>
            <td>{data.name}</td>
            <td>{data.category}</td>
          </tr>
        ))}
      </Table>
      {pagedAssets?.totalItems == 0 ? (
        <h6 className="text-center">No Data Found</h6>
      ) : (
        <></>
      )}
    </>
  );
};
export default AssetTable;
