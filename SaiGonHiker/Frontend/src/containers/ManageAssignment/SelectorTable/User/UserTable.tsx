import React, { useEffect, useState } from "react";

import Table, { SortType } from "src/components/Table";
import IUser from "src/interfaces/User/IUser";
import IColumnOption from "src/interfaces/IColumnOption";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import { PagedModel } from "src/types/PagedModel";

const column: IColumnOption[] = [
  { columnName: "", columnValue: "radio", isSortable: false },
  { columnName: "Staff code", columnValue: "staffCode", isSortable: true },
  { columnName: "Full Name", columnValue: "fullName", isSortable: true },
  { columnName: "Type", columnValue: "roleName", isSortable: true },
];

type Props = {
  pagedUsers: PagedModel<IUser, IQueryUserModel> | null;
  handlePage: (page: number) => void;
  handleSort: (colValue: string) => void;
  sortState: SortType;
  fetchData: Function;
  handleUserSelected: (code: string, name: string) => void;
  currentUserSelected?: string;
};

const UserTable: React.FC<Props> = ({
  pagedUsers,
  handlePage,
  sortState,
  handleSort,
  fetchData,
  handleUserSelected,
  currentUserSelected,
}) => {
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleCheck = (code: string, name: string) => {
    if (currentUserSelected === code){
      handleUserSelected(code, name)
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
          currentPage: pagedUsers?.currentPage,
          totalPage: pagedUsers?.totalPages,
          handleChange: handlePage,
        }}
      >
        {pagedUsers?.items.map((data, index) => (
          <tr
            key={index}
            onClick={() =>
              handleUserSelected
                ? handleUserSelected(data.staffCode, data.fullName)
                : {}
            }
          >
            <td style={{ border: "none" }}>
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  id={index.toString()}
                  type="radio"
                  value={data.staffCode}
                  onChange={(value) =>
                    handleUserSelected
                      ? handleUserSelected(data.staffCode, data.fullName)
                      : {}
                  }
                  checked={handleCheck(data.staffCode, data.fullName)}
                />
              </div>
            </td>
            <td>{data.staffCode}</td>
            <td>{data.fullName}</td>
            <td>{data.roleName}</td>
          </tr>
        ))}
      </Table>
      {pagedUsers?.totalItems == 0 ? (
        <h6 className="text-center">No Data Found</h6>
      ) : (
        <></>
      )}
    </>
  );
};
export default UserTable;
