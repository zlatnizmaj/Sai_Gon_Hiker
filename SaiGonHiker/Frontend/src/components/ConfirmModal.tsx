import React from "react";
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faRectangleXmark)

type Props = {
    title: string,
    isShow: boolean,
    onHide?: (() => void),
    children: React.ReactNode,
    haveClose: boolean
}

const ConfirmModal: React.FC<Props> = ({ title, isShow, onHide, children, haveClose }) => {
    return (
        <Modal
            show={isShow}
            onHide={onHide}
            dialogClassName="modal-90w"
            aria-labelledby="login-modal"
            animation={false}
        >
            <Modal.Header>
                <Modal.Title id="login-modal">
                    {title}
                </Modal.Title>
                {haveClose?<FontAwesomeIcon
                    className="text-danger close-icon mr-4 mt-2 pe-auto"
                    icon={faRectangleXmark}
                    onClick={onHide}
                />:<></>}
                
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmModal;
