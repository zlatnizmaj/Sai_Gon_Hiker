import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "src/hooks/redux"
import { getAssignmentById } from "../reducer"
import AssignmentFormContainer from "../AssignmentForm"
import IAssignmentForm from "src/interfaces/Assignment/IAssignmentForm"

const UpdateAssignmentContainer = () => {
    const { assignment } = useAppSelector((state) => state.assignmentReducer);
    const dispatch = useAppDispatch();
    const [assignmentForm, setAssignmentForm] = useState(undefined as IAssignmentForm | undefined);
    const { id } = useParams<{ id: string}>();
    const handleResult = (isSuccess: boolean) => {};

    const handleUpdateDate = (date: Date) => {
      const assignedDate = new Date(date)
      const dateNow = new Date()
      if(assignedDate < dateNow) return dateNow 
        return assignedDate
    }

    useEffect(() => {
        dispatch(getAssignmentById({ handleResult, assignmentId: id }));
    }, []);

    useEffect(() => {
        if (assignment) {
            setAssignmentForm({
              id: assignment.id,
              assignTo: assignment.assignedToStaffCode,
              assignToFullName: assignment.assignedToFullName,
              assetCode: assignment.assetCode,
              assetName: assignment.assetName,
              assignedDate: handleUpdateDate(assignment.assignedDate),
              note: assignment.note
          });
        }
    }, [assignment]);

    return (
        <div className="ml-5">
          <div className="primaryColor text-title intro-x">
            Edit Assignment
          </div>
    
          <div className="row">
            {assignmentForm && <AssignmentFormContainer initialAssignmentForm={assignmentForm} />}
          </div>
        </div>
      );
}

export default UpdateAssignmentContainer