import React, { useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
// import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { Container, Button, Link } from "react-floating-action-button";

import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/swin-flood.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content overflow-hidden" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container
          styles={{
            bottom: "1vh",
            right: "1vw",
          }}
        >
          <Link href="#" tooltip="Police" icon="fa-solid fa-building-shield" />
          <Link href="#" tooltip="Hospital" icon="fa-solid fa-h" />
          <Link href="#" tooltip="Fire" icon="fa-solid fa-fire-flame-curved" />
          <Button tooltip="Emergency Contacts!" rotate={false}>
            <h2 className="pt-2 "> SOS</h2>
          </Button>
        </Container>

        <div className="mx-5" fluid>
          {/* <AdminFooter /> */}
        </div>
      </div>
    </>
  );
};

export default Admin;