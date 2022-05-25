import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import {
  HOME,
  LOGIN,
  MANAGE_ASSET,
  MANAGE_USER,
  MANAGE_ASSIGNMENT,
  MY_ASSIGNMENT,
} from "../constants/pages";
import InLineLoader from "../components/InlineLoader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import LayoutRoute from "./LayoutRoute";
import { me } from "src/containers/Authorize/reducer";

import ManageUser from "../containers/ManageUser"
import ManageAsset from "src/containers/ManageAsset";
import ManageAssignment from "../containers/ManageAssignment";
import MyAssignment from "../containers/MyAssignment"

const Home = lazy(() => import("../containers/Home"));
const Login = lazy(() => import("../containers/Login"));
const NotFound = lazy(() => import("../containers/NotFound"));

const SusspenseLoading = ({ children }) => (
  <Suspense fallback={<InLineLoader />}>{children}</Suspense>
);

const Routes = () => {
  const { isAuth, account } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  const history = useHistory();

  if (!isAuth) {
    history.push(LOGIN);
  } else {
    if (history.location.pathname === LOGIN) {
      if (account?.roleName == "Admin") {
        history.push(HOME);
      } else {
        history.push(MY_ASSIGNMENT);
      }
    }
  }
  return (
    <SusspenseLoading>
      <Switch>
        {!isAuth ? (
          <Route exact path={LOGIN}>
            <Login />
          </Route>
        ) : account?.roleName == "Admin" ? (
          <>
            <LayoutRoute exact path={HOME}>
              <MyAssignment />
            </LayoutRoute>
            <LayoutRoute path={MANAGE_USER.BASE}>
              <ManageUser />
            </LayoutRoute>
            <LayoutRoute path={MANAGE_ASSET.BASE}>
              <ManageAsset />
            </LayoutRoute>
            <LayoutRoute path={MANAGE_ASSIGNMENT.BASE}>
              <ManageAssignment />
            </LayoutRoute>
          </>
        ) : (
          <>
            <LayoutRoute exact path={MY_ASSIGNMENT}>
              <MyAssignment />
            </LayoutRoute>
          </>
        )}
      </Switch>
    </SusspenseLoading>
  );
};

export default Routes;
