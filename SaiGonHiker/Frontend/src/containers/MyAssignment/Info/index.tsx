import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faRectangleXmark)

import InformationModal from '../../../components/InformationModal'

const Info = ({ showModal, assignment, handleClose }) => {

  const handleFormatDate = (date) => {
    const _date = new Date(date)
    const dd = String(_date.getDate()).padStart(2, '0')
    const mm = String(_date.getMonth() + 1).padStart(2, '0')
    const yyyy = _date.getFullYear()

    return dd + '/' + mm + '/' + yyyy
  }

  return (
    <>
      <InformationModal
        title="Detailed Assignment Information"
        objectType="Assignment"
        isShow={showModal}
        onHide={handleClose}
        haveClose={handleClose}
      >
        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Asset Code:</div>
          <div>{assignment.assetCode}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Asset Name:</div>
          <div>{assignment.assetName}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Specification:</div>
          <div>{assignment.specification}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Assigned To:</div>
          <div>{assignment.assignedToUserName}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Assigned By:</div>
          <div>{assignment.assignedByUserName}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Assigned Date:</div>
          <div>{handleFormatDate(assignment.assignedDate)}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">State:</div>
          <div>{assignment.stateName}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Note:</div>
          <div>{assignment.note}</div>
        </div>

      </InformationModal>
    </>
  )
}

export default Info
