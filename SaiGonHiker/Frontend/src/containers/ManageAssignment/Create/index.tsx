import React from 'react'
import AssignmentFormContainer from '../AssignmentForm'

const AssignmentCreate = () => {
  return (
    <>
      <div className="ml-5">
        <div className="primaryColor text-title intro-x">Create New Assignment</div>
        <div className="row">
          <AssignmentFormContainer />
        </div>
      </div>
    </>
  )
}

export default AssignmentCreate
