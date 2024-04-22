import React, { useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
// import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { Container, Button, Link } from "react-floating-action-button";

import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";

import routes from "routes.js";

const Admin = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
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
      <div className="main-content" ref={mainContent}>
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

        <Col md="4">
          {/* <Button
            block
            color="default"
            type="button"
            onClick={setModalIsOpenToTrue}
          >
            Form
          </Button> */}
          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <div className="text-right ">
                  <button
                    className="btn btn-link pb-0 mb-0"
                    onClick={setModalIsOpenToFalse}
                  >
                    <h3>
                      <i className="ni ni-fat-remove" />
                    </h3>
                  </button>
                </div>

                <CardHeader className="bg-transparent pt-0">
                  <div className="text-muted text-center mb-3">
                    <h2>Subscribe to Flood Alerts</h2>
                  </div>
                  <div className="btn-wrapper text-center"></div>
                </CardHeader>
                <CardBody className="px-lg-5 ">
                  <div className="text-center text-muted mb-4">
                    <small>Enter your email to subscribe to this service</small>
                  </div>
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" />
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                      <input
                        className="btn btn-success"
                        type="submit"
                        value="Subscribe"
                      />
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </Col>
        <div className="mx-5" fluid>
          {/* <AdminFooter /> */}
        </div>
      </div>
    </>
  );
};

export default Admin;
