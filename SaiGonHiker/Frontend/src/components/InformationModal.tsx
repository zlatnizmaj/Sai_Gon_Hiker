import React from 'react'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faRectangleXmark)

type Props = {
  title: string
  objectType: string
  isShow: boolean
  onHide?: () => void
  children: React.ReactNode
  haveClose: Function
}

const InformationModal: React.FC<Props> = ({
  title,
  objectType,
  isShow,
  onHide,
  children,
}) => {
    const modalWidth = objectType === "Asset" ? "modal-700w" : "modal-90w"
  return (
    <Modal
      show={isShow}
      onHide={onHide}
      dialogClassName={modalWidth}
      aria-labelledby="information-modal"
      centered
      animation={true}
    >
      <Modal.Header>
        <Modal.Title id="information-modal">{title}</Modal.Title>
        <FontAwesomeIcon
          className="text-danger close-icon mr-4 mt-2 pe-auto"
          icon={faRectangleXmark}
          onClick={onHide}
        />

      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

export default InformationModal
