import React from "react";
import { Modal } from "react-bootstrap";
import IColumnOption from "src/interfaces/IColumnOption";

type Props = {
  isShow: boolean;
  children: React.ReactNode;
  onHide?: () => void;
};

const SearchModal: React.FC<Props> = ({
  isShow,
  onHide,
  children,
}) => {
  return (
    <Modal
      show={isShow}
      onHide={onHide}
      dialogClassName="modal-lg"
      aria-labelledby="login-modal"
      animation={false}
      centered
    >
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default SearchModal;
