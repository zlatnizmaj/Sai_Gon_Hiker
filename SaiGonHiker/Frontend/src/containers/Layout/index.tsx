import React from "react";
import { NotificationContainer } from 'react-notifications';

import Header from "./Header";
import SideBar from "./SideBar";
import Login from "./Login";
import TourInformation from "./TourInformation";
import BookTour from "./BookTour";

const Layout = ({ children }) => {
  return (
    <>
      <NotificationContainer />
      <Header />
      <Login/>
      <TourInformation/>
      <BookTour/>

      <div className="container-lg-min container-fluid">
        <div className="row mt-5">

          <div className="col-lg-2 col-md-4 col-12 mr-5">
            <SideBar />
          </div>

          <div className="col-lg-9 col-md-7 ms-5">
            {children}
          </div>
        </div>

      </div>
    </>
  );
};

export default Layout;
