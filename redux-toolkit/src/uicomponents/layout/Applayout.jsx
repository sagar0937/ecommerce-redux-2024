import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "../../pages/Header";

const Applayout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Applayout;
