import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import { Search as SearchIcon } from "react-feather";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { CalendarDateFill } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";

import { getAssignments } from "../reducer";
import AssignmentTable from "./AssignmentTable";
import { MANAGE_ASSIGNMENT } from "src/constants/pages";
import ISelectOption from "src/interfaces/ISelectOption";
import IQueryAssignmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";
import { StateAssignmentTypeOptions } from "src/constants/selectOptions";
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_ASSET_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT,
} from "src/constants/paging";

const ManageAssignment = () => {
  const dispatch = useAppDispatch();

  const { pagedAssignments } = useAppSelector(
    (state) => state.assignmentReducer
  );

  const [touched, setTouched] = useState(false);
  const [assigedDate, setAssignedDate] = useState<Date>();

  const [query, setQuery] = useState({
    Page: 1,
    Limit: DEFAULT_PAGE_LIMIT,
    SortOrder: ACCSENDING,
    SortColumn: DEFAULT_ASSET_SORT_COLUMN_NAME,
    Search: "",
  } as IQueryAssignmentModel);

  const [search, setSearch] = useState("");

  const [selectedState, setSelectedState] = useState([] as ISelectOption[]);

  const handleState = (selected: ISelectOption[]) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        States: [],
        Page: 1,
      });

      setSelectedState([StateAssignmentTypeOptions[0]]);
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

  const handleOnTouchedSet = () => {
    setTouched(true);
  };

  const handleChangeAssignedDate = (assignedDate: Date) => {
    assignedDate ? assignedDate.setHours(12, 0) : undefined;
    setQuery({
      ...query,
      AssignedDate: assignedDate ? assignedDate.toUTCString() : undefined,
      Page: 1,
    });
    setAssignedDate(assignedDate);
  };

  function handleSort(SortColumn: string) {
    const SortOrder = query.SortOrder === ACCSENDING ? DECSENDING : ACCSENDING;

    setQuery({
      ...query,
      SortOrder,
      SortColumn,
    });
  }

  const fetchData = () => {
    dispatch(getAssignments(query));
  };

  useEffect(() => {
    fetchData();
  }, [query]);

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
      <div className="primaryColor text-title intro-x">Assignment List</div>

      <div>
        <div className="d-flex mb-5 intro-x">
          <div>
            <div className="d-flex align-items-center mr-5 border">
              <ReactMultiSelectCheckboxes
                options={StateAssignmentTypeOptions}
                hideSearch={true}
                placeholderButtonLabel="State"
                value={selectedState}
                onChange={handleState}
                styles={style}
              />

              <div className="p-2">
                <FunnelFill />
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center mr-5 border">
            <div className={`date-picker-wrapper d-flex text-center w-100 `}>
              <DatePicker
                placeholderText="Assigned Date"
                className="w-100 p-2"
                dateFormat="dd/MM/yyyy"
                selected={assigedDate}
                onChange={handleChangeAssignedDate}
                showDisabledMonthNavigation
                onCalendarOpen={handleOnTouchedSet}
              />

              <div className="p-2">
                <CalendarDateFill />
              </div>
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
              to={MANAGE_ASSIGNMENT.CREATE}
              type="button"
              className="btn btn-danger"
            >
              Create New Assignment
            </Link>
          </div>
        </div>
        
        <AssignmentTable
          pagedAssignments={pagedAssignments}
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

export default ManageAssignment;
