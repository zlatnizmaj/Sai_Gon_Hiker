import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import ConfirmModal from "src/components/ConfirmModal";
import { HOME, PAGENAME } from "src/constants/pages";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { logout } from "../Authorize/reducer";
import ChangePasswordModal from "./ChangePasswordModal";

// eslint-disable-next-line react/display-name
const CustomToggle = React.forwardRef<any, any>(
  ({ children, onClick }, ref): any => (
    <a
      className="btn btn-link dropdownButton"
      ref={ref as any}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children} <span>&#x25bc;</span>
    </a>
  )
);

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const { loading, account } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (account) {
      setShowModalChangePasswod(!account.isFirstLogin);
    }
  }, [account]);

  const [showModalChangePasswod, setShowModalChangePasswod] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const headerName = () => {
    const pathnameSplit = pathname.split('/');
    pathnameSplit.shift();
    const primaryPath = pathnameSplit.shift();
    pathnameSplit.unshift("")
    const result = pathnameSplit.map(path => PAGENAME["/" + primaryPath]["/"+path]??path)
    return result.join(' > ').toString() || 'Home';
  }

  const openModal = () => {
    setShowModalChangePasswod(true);
  };

  const handleHide = () => {
    setShowModalChangePasswod(false);
  };

  const handleLogout = () => {
    setShowConfirmLogout(true);
  };

  const handleCancleLogout = () => {
    setShowConfirmLogout(false);
  };

  const handleConfirmedLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="header align-items-center font-weight-bold">
        <div className="container-lg-min container-fluid d-flex pt-2">
          <p className="headText">{`${headerName()}`}</p>

          <div className="ml-auto text-white">
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                {account?.userName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={openModal}>
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        showModal={showModalChangePasswod}
        loading={loading}
        haveClose={account ? account?.isFirstLogin : false}
        onHide={!account?.isFirstLogin ? ()=>{} : handleHide}
      />
      <ConfirmModal
        title="Are you sure"
        isShow={showConfirmLogout}
        onHide={handleCancleLogout}
        haveClose={true}
      >
        <div>
          <div className="text-center">Do you want to log out?</div>
          <div className="text-center mt-3">
            <button
              className="btn btn-danger mr-3"
              onClick={handleConfirmedLogout}
              type="button"
            >
              Log out
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleCancleLogout}
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

export default Header;
