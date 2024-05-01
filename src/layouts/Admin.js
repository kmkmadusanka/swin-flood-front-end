import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
// import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { Container, Button } from "react-floating-action-button";
import { useNavigate } from "react-router-dom";

import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  let navigate = useNavigate();
  function navigateDiscussion() {
    if (
      window.confirm("Are you sure? \nDo you need to send emergency message?")
    ) {
      navigate(`/admin/discussion`);
      localStorage.setItem("sos", "clicked");
    }
  }

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
          <Button
            tooltip="Emergency Contacts!"
            onClick={navigateDiscussion}
            rotate={false}
          >
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
