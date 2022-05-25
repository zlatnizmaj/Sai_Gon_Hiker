import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faRectangleXmark)

import InformationModal from '../../../components/InformationModal'

const Info = ({ showModal, user, handleClose }) => {
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
        title="Detailed User Information"
        objectType="User"
        isShow={showModal}
        onHide={handleClose}
        haveClose={handleClose}
      >
        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Staff Code:</div>
          <div>{user.staffCode}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Full Name:</div>
          <div>{user.fullName}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Username:</div>
          <div>{user.userName}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Date of Birth:</div>
          <div>{handleFormatDate(user.dateOfBirth)}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Gender:</div>
          <div>{user.gender}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Joined Date:</div>
          <div>{handleFormatDate(user.joinedDate)}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Type:</div>
          <div>{user.roleName}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Location:</div>
          <div>{user.location}</div>
        </div>
      </InformationModal>
    </>
  )
}

export default Info
