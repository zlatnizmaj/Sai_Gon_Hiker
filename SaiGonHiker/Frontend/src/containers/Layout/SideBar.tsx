import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HOME,
  MANAGE_ASSET,
  REPORT,
  RETURNING,
  MANAGE_USER,
  MANAGE_ASSIGNMENT,
  MY_ASSIGNMENT,
} from "src/constants/pages";
import Roles from "src/constants/roles";
import { useAppSelector } from "src/hooks/redux";

const SideBar = () => {
  const { account } = useAppSelector((state) => state.authReducer);
  const { pathname } = useLocation();
  return (
    <div className="nav-left mb-5 ">
      <img src="/images/Logo_lk.png" alt="logo" />
      <p className="brand intro-x">Online Asset Management</p>

      {account?.roleName === Roles.Admin ? (
        <>
          <NavLink className="navItem intro-x" exact to={HOME}>
            <button className="btnCustom">Home</button>
          </NavLink>
          <NavLink
            className="navItem intro-x"
            exact
            to={MANAGE_USER.BASE}
            isActive={(match, location) =>
              location.pathname.startsWith(MANAGE_USER.BASE)
            }
          >
            <button className="btnCustom">Manage User</button>
          </NavLink>
          <NavLink
            className="navItem intro-x"
            exact
            to={MANAGE_ASSET.BASE}
            isActive={(match, location) =>
              location.pathname.startsWith(MANAGE_ASSET.BASE)
            }
          >
            <button className="btnCustom">Manage Asset</button>
          </NavLink>
          <NavLink
            className="navItem intro-x"
            exact
            to={MANAGE_ASSIGNMENT.BASE}
            isActive={(match, location) =>
              location.pathname.startsWith(MANAGE_ASSIGNMENT.BASE)
            }
          >
            <button className="btnCustom">Manage Assignment</button>
          </NavLink>
          <NavLink className="navItem intro-x" exact to={RETURNING}>
            <button className="btnCustom">Request for Returning</button>
          </NavLink>
          <NavLink className="navItem intro-x" exact to={REPORT}>
            <button className="btnCustom">Report</button>
          </NavLink>
        </>
      ) : (
        <></>
      )}

      {account?.roleName === Roles.Staff ? (
        <>
          <NavLink className="navItem intro-x" exact to={MY_ASSIGNMENT}>
            <button className="btnCustom">Home</button>
          </NavLink>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SideBar;
