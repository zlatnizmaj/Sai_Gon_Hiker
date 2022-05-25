import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faRectangleXmark)

import InformationModal from '../../../components/InformationModal'

const Info = ({ showModal, asset, handleClose }) => {

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
        title="Detailed Asset Information"
        objectType="Asset"
        isShow={showModal}
        onHide={handleClose}
        haveClose={handleClose}
      >
        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Asset Code:</div>
          <div>{asset.assetCode}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Asset Name:</div>
          <div>{asset.name}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Category:</div>
          <div>{asset.category}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Installed Date:</div>
          <div>{handleFormatDate(asset.installedDate)}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">State:</div>
          <div>{asset.stateName}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Location:</div>
          <div>{asset.location}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">Specification:</div>
          <div>{asset.specification}</div>
        </div>

        <div className="d-flex mb-3 intro-x">
          <div className="col-4">History:</div>
          <div>
            <table className="table">
              <tr>
                <th className="fs-2">Date</th>
                <th className="fs-2">Assigned To</th>
                <th className="fs-2">Assigned By</th>
                <th className="fs-2">Return Date</th>
              </tr>
              <tr>
                <td>12/02/2022</td>
                <td>luannv</td>
                <td>tuannv</td>
                <td>21/03/2022</td>
              </tr>
              <tr>
                <td>15/03/2022</td>
                <td>honv</td>
                <td>tuannv</td>
                <td>30/03/2022</td>
              </tr>
            </table>
          </div>
        </div>
      </InformationModal>
    </>
  )
}

export default Info
