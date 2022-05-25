import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faRectangleXmark)

import ConfirmModal from 'src/components/ConfirmModal'
import { useAppDispatch } from 'src/hooks/redux';
import { deleteAsset } from '../reducer';

const Delete = ({ showModal, assetCode, handleClose, handleResult }) => {

   const dispatch = useAppDispatch();
  
   function DeleteAsset() {
    dispatch(deleteAsset({ handleResult, assetCode: assetCode }));
    handleClose();
  }

  return (
    <>
      <ConfirmModal
        title="Are you sure?"
        isShow={showModal}
        onHide={handleClose}
        haveClose={handleClose}
      >
        <div className='d-flex mx-3'>
          Do you want to delete this asset?
        </div>
        
        <div className="d-flex mx-3 my-4">
            <div className="mr-auto ">
            <button onClick={DeleteAsset}
                className="btn btn-danger"
                type="submit"
              >
                Delete
              </button>

              <button onClick={handleClose}
                className="btn btn-outline-secondary ml-2 mx-4"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
      </ConfirmModal>
    </>
  )
}

export default Delete
