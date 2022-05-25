import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from "react-notifications";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faRotateLeft);

import {
  AcceptedLabel,
  WaitingForAcceptanceLabel,
} from "../../../constants/Assignment/AssignmentConstant";
import ButtonIcon from "src/components/ButtonIcon";
import Table, { SortType } from "src/components/Table";
import IMyAssignment from "../../../interfaces/MyAssignment/IMyAssignment";
import IQueryMyAssignmentModel from "../../../interfaces/MyAssignment/IQueryMyAssignmentModel";
import { PagedModel } from "src/types/PagedModel";
import IColumnOption from "src/interfaces/IColumnOption";
import Info from "../Info";
import ConfirmModal from "src/components/ConfirmModal";
import { useDispatch } from "react-redux";
import { respondToAssignment } from "../reducer";
import { useAppSelector } from "src/hooks/redux";

const column: IColumnOption[] = [
  { columnName: "Asset Code", columnValue: "assetCode", isSortable: true },
  { columnName: "Asset Name", columnValue: "assetName", isSortable: true },
  { columnName: "Category", columnValue: "categoryName", isSortable: true },
  {
    columnName: "Assigned Date",
    columnValue: "assignedDate",
    isSortable: true,
  },
  { columnName: "State", columnValue: "stateName", isSortable: true },
];

type Props = {
  pagedAssignments: PagedModel<IMyAssignment, IQueryMyAssignmentModel> | null;
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

  const { loading } = useAppSelector((state) => state.myassignmentReducer);
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const [assignmentDetail, setAssignmentDetail] = useState(
    null as IMyAssignment | null
  );
  const [showModal, setShowModal] = useState(false);
  const [isAcceptAction, setIsAcceptAction] = useState(true);
  const [actionAssignmentId, setActionAssignmentId] = useState<number | null>(
    null
  );
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShowInfo = (id: number) => {
    const assignment = pagedAssignments?.items.find((item) => item.id === id);

    if (assignment) {
      setAssignmentDetail(assignment);
      setShowDetail(true);
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const getDateTime = (date: Date) => {
    const _date = new Date(date);
    const dd = String(_date.getDate()).padStart(2, "0");
    const mm = String(_date.getMonth() + 1).padStart(2, "0");
    const yyyy = _date.getFullYear();

    return dd + "/" + mm + "/" + yyyy;
  };

  const handleAcceptAssignment = (id: number) => {
    setActionAssignmentId(id);
    setShowModal(true);
    setIsAcceptAction(true);
  };

  const handleDeclineAssignment = (id: number) => {
    setActionAssignmentId(id);
    setShowModal(true);
    setIsAcceptAction(false);
  };

  const handleResult = (isSuccess: boolean, assignmentId: number) => {
    if (isSuccess) {
      NotificationManager.success(
        ` ${
          isAcceptAction ? "Accept assignment" : "Decline assignment"
        } Successfully `,
        `Respond to ${assignmentId}`,
        2000
      );
      fetchData();
    } else
      NotificationManager.error(
        ` ${
          isAcceptAction ? "Accept assignment" : "Decline assignment"
        } failed `,
        `Respond to ${assignmentId}`,
        2000
      );
      setShowModal(false);
  };

  const handleConfirmAction = () => {
    dispatch(
      respondToAssignment({
        assignmentId: actionAssignmentId as number,
        isAccepted: isAcceptAction,
        handleResult: handleResult,
      })
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
          <tr
            key={index}
            className=""
            onClick={() => {
              handleShowInfo(data.id);
            }}
          >
            <td>{data.assetCode}</td>
            <td>{data.assetName}</td>
            <td>{data.categoryName}</td>
            <td>{getDateTime(data.assignedDate)}</td>
            <td>{data.stateName}</td>

            <td className="d-flex" style={{ border: "none" }}>
              <ButtonIcon
                disable={data.stateName === AcceptedLabel}
                onClick={() => handleAcceptAssignment(data.id)}
              >
                <FontAwesomeIcon
                  className="fa-lg mt-1 text-danger"
                  icon={faCheck}
                />
              </ButtonIcon>
              <ButtonIcon
                disable={data.stateName === AcceptedLabel}
                onClick={() => handleDeclineAssignment(data.id)}
              >
                <FontAwesomeIcon className="mx-3 fa-lg mt-1" icon={faClose} />
              </ButtonIcon>
              <ButtonIcon
                disable={data.stateName === WaitingForAcceptanceLabel}
              >
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

      {showDetail && assignmentDetail && (
        <Info
          showModal={showDetail}
          assignment={assignmentDetail}
          handleClose={handleCloseDetail}
        />
      )}

      <ConfirmModal
        title="Are you sure? "
        isShow={showModal}
        onHide={handleClose}
        haveClose={false}
      >
        <div className="d-flex mx-3">
          Do you want to {isAcceptAction ? "accept" : "decline"} this
          assignment?
        </div>

        <div className="d-flex mx-3 my-4">
          <div className="mr-auto ">
            <button
              onClick={handleConfirmAction}
              className="btn btn-danger"
              type="submit"
            >
              {loading && (
                <img src="/oval.svg" className="w-4 h-4 ml-2 inline-block" />
              )}
              {isAcceptAction ? "Accept" : "Decline"}
            </button>

            <button
              onClick={handleClose}
              className="btn btn-outline-secondary ml-2 mx-4"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </ConfirmModal>
    </>
  );
};

export default AssignmentTable;
