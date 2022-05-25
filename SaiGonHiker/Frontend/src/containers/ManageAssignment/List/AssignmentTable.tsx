import React, { useEffect, useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Info from "../Info";
library.add(faRotateLeft);

import { AcceptedValue } from "../../../constants/Assignment/AssignmentConstant";
import ButtonIcon from "src/components/ButtonIcon";
import Table, { SortType } from "src/components/Table";
import IAssignment from "../../../interfaces/Assignment/IAssignment";
import IQueryAssignmentModel from "../../../interfaces/Assignment/IQueryAssignmentModel";
import { PagedModel } from "src/types/PagedModel";
import IColumnOption from "src/interfaces/IColumnOption";
import Delete from "../Delete";
import { EDIT_ASSIGNMENT_ID } from "../../../constants/pages";

const column: IColumnOption[] = [
  { columnName: "No.", columnValue: "assetCode", isSortable: false },
  { columnName: "Asset Code", columnValue: "assetCode", isSortable: true },
  { columnName: "Asset Name", columnValue: "assetName", isSortable: true },
  {
    columnName: "Assigned to",
    columnValue: "assignedToUserName",
    isSortable: true,
  },
  {
    columnName: "Assigned by",
    columnValue: "assignedByUserName",
    isSortable: true,
  },
  {
    columnName: "Assigned Date",
    columnValue: "assignedDate",
    isSortable: true,
  },
  { columnName: "State", columnValue: "stateName", isSortable: true },
];

type Props = {
  pagedAssignments: PagedModel<IAssignment, IQueryAssignmentModel> | null;
  handlePage: (page: number) => void;
  handleSort: (colValue: string) => void;
  sortState: SortType;
  fetchData: Function;
};

const AssignmentTable: React.FC<Props> = ({
  pagedAssignments,
  handlePage,
  sortState,
  handleSort,
  fetchData,
}) => {
  useEffect(() => {
    fetchData();
  }, []);

  const [showDetail, setShowDetail] = useState(false);
  const [assignmentDetail, setAssignmentDetail] = useState(
    null as IAssignment | null
  );
  const [showDelete, setShowDelete] = useState(false);
  const [assignmentId, setAssignmentId] = useState<number | null>(null);

  const handleShowInfo = (id: number) => {
    const assignment = pagedAssignments?.items.find((item) => item.id === id);

    if (assignment) {
      setAssignmentDetail(assignment);
      setShowDetail(true);
    }
  };

  const getDateTime = (date: Date) => {
    const _date = new Date(date);
    const dd = String(_date.getDate()).padStart(2, "0");
    const mm = String(_date.getMonth() + 1).padStart(2, "0");
    const yyyy = _date.getFullYear();

    return dd + "/" + mm + "/" + yyyy;
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const history = useHistory();
  const handleEdit = (id: number) => {
    history.push(EDIT_ASSIGNMENT_ID(id));
  };

  const handleDelete = (id: number) => {
    setAssignmentId(id);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleButtonDisable = (state: number) => {
    if (state == AcceptedValue) return true;
  };

  const handleResult = (isSuccess: boolean, assignmentId: number) => {
    if (isSuccess) {
      NotificationManager.success(
        ` Delete Successfully `,
        ``,
        1000
      );
      fetchData();
    } else
      NotificationManager.error(
        ` Delete failed `,
        ``,
        1000
      );
  };
  
  return (
    <>
      <Table
        columns={column}
        sortState={sortState}
        handleSort={handleSort}
        page={{
          currentPage: pagedAssignments?.currentPage,
          totalPage: pagedAssignments?.totalPages,
          handleChange: handlePage,
        }}
      >
        {pagedAssignments?.items.map((data, index) => (
          <tr key={index} className=""
          onClick={() => handleShowInfo(data.id)}>         
            <td>{index + 1}</td>
            <td>{data.assetCode}</td>
            <td>{data.assetName}</td>
            <td>{data.assignedToUserName}</td>
            <td>{data.assignedByUserName}</td>
            <td>{getDateTime(data.assignedDate)}</td>
            <td>{data.stateName}</td>

            <td className="d-flex" style={{ border: 'none' }}>
              <ButtonIcon
                onClick={() => handleEdit(data.id)}
                disable={handleButtonDisable(data.stateId)}
              >
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon
                onClick={() => handleDelete(data.id)}
                disable={handleButtonDisable(data.stateId)}
              >
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
              <ButtonIcon>
                <FontAwesomeIcon
                  className="text-primary close-icon mr-4 mt-2 pe-auto"
                  icon={faRotateLeft}
                />
              </ButtonIcon>
            </td>
          </tr>
        ))}
      </Table>
      {pagedAssignments?.totalItems == 0 ? (
        <h6 className="no-data">No Data Found</h6>
      ) : (
        <></>
      )}

      {showDelete && assignmentId && (
        <Delete
          showModal={showDelete}
          assignmentId={assignmentId}
          handleResult={handleResult}
          handleClose={handleCloseDelete}
        />
      )}

      {showDetail && assignmentDetail && (
        <Info
        showModal={showDetail}
        assignment={assignmentDetail}
        handleClose={handleCloseDetail}
        />        
      )}
    </>
  );
};

export default AssignmentTable;
