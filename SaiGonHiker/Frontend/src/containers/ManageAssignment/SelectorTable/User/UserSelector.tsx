import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "react-feather";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { getAssignmentUsers, getUsers } from "../../../ManageUser/reducer";
import UserTable from "./UserTable";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";

import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_USER_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT,
} from "src/constants/paging";

type Props = {
  handleSave?: (staffCode: string, name:string) => void;
  handleCancel?: () => void;
  currCodeSelected?: string;
  currNameSelected?: string;
  
};
const UserSelector: React.FC<Props> = ({
  currCodeSelected,
  currNameSelected,
  handleSave,
  handleCancel
}) => {
  const dispatch = useAppDispatch();
  const { pagedAssignmentUsers } = useAppSelector(
    (state) => state.userReducer
  );
  const { account } = useAppSelector((state) => state.authReducer);
  const [query, setQuery] = useState({
    Page: 1,
    Limit: DEFAULT_PAGE_LIMIT,
    SortOrder: ACCSENDING,
    SortColumn: DEFAULT_USER_SORT_COLUMN_NAME,
    Location: account?.location,
  } as IQueryUserModel);

  const [search, setSearch] = useState("");
  const [selectedUserName, setSelectedUserName] = useState(currNameSelected);
  const [selectedUserCode, setSelectedUserCode] = useState(currCodeSelected);

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
    if (query.Location) dispatch(getAssignmentUsers(query));
  };
  
  const handleUserSelected = (staffCode: string, name: string) => {
    setSelectedUserName(name);
    setSelectedUserCode(staffCode);
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
          <div className="primaryColor text-title intro-x m-0">Select User</div>
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

        <UserTable
          pagedUsers={pagedAssignmentUsers}
          handlePage={handlePage}
          handleSort={handleSort}
          sortState={{
            columnValue: query.SortColumn,
            orderBy: query.SortOrder,
          }}
          fetchData={fetchData}
          handleUserSelected={handleUserSelected}
          currentUserSelected={selectedUserCode}
        />
      </div>
      <div className="d-flex justify-content-end my-3">
          <button
            onClick={()=>handleSave?handleSave(selectedUserCode as string, selectedUserName as string):{}}
            className="btn btn-danger mx-3"
            type="submit"
            disabled={selectedUserCode?false:true}
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

export default UserSelector;
