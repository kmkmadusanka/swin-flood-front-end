import { useState } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import "./examples/styles/index.css";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardImg,
  CardTitle,
  Button,
  CardText,
} from "reactstrap";

import Header from "components/Headers/Header.js";

const style = {
  width: "95%",
  height: "50vh",
};

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row xl="8">
          <Col className=" mb-xl-0" xl="8">
            <Card className=" shadow">
              <CardHeader className="bg-transparent pb-1">
                <Row className=" d-flex justify-content-between">
                  <div className="col">
                    <h3 className=" mb-0">Flood Severity</h3>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="d-flex flex-row">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/triangle-red.ico")}
                        height={24}
                      />
                      <p className="pl-2"> - High</p>
                    </div>
                    <div className="d-flex flex-row pl-3">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/triangle-blue.ico")}
                        height={24}
                      />
                      <p className="pl-2"> - Medium</p>
                    </div>
                    <div className="d-flex flex-row pl-3 pr-3">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/triangle-green.ico")}
                        height={24}
                      />
                      <p className="pl-2"> - Low</p>
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="map-wrapper">
                <small>* Severity levels valid for 5 Km diagonal</small>
                <Map
                  google={props.google}
                  zoom={12}
                  initialCenter={{
                    lat: 8.534487235852568,
                    lng: 80.29865337839264,
                  }}
                  position={"Center"}
                  style={style}
                >
                  <Marker
                    name={"Location A"}
                    title="Location"
                    position={{
                      lat: 8.503673389577162,
                      lng: 80.28383615620632,
                    }}
                    icon={{
                      url: require("assets/img/icons/common/triangle-red.ico"),
                    }}
                  ></Marker>

                  <Marker
                    name={"Location A"}
                    title="Location"
                    position={{
                      lat: 8.543207218523076,
                      lng: 80.29468095325936,
                    }}
                    icon={{
                      url: require("assets/img/icons/common/triangle-green.ico"),
                    }}
                  ></Marker>

                  <Marker
                    name={"Location A"}
                    title="Location"
                    position={{
                      lat: 8.496783908472604,
                      lng: 80.29444347595162,
                    }}
                    icon={{
                      url: require("assets/img/icons/common/triangle-blue.ico"),
                    }}
                  ></Marker>

                  <Marker
                    name={"Location A"}
                    title="Location"
                    position={{
                      lat: 8.487702130663347,
                      lng: 80.31660802467319,
                    }}
                    icon={{
                      url: require("assets/img/icons/common/triangle-blue.ico"),
                    }}
                  ></Marker>
                </Map>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Rainfall with Flood Prediction</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Rainfall</th>
                    <th scope="col">Flood Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Today</th>
                    <td>187 mm</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Tomorrow</th>
                    <td>100 mm</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">20th April</th>
                    <td>195 mm</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">21st April</th>
                    <td>165 mm</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">22nd April</th>
                    <td>67 mm</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">23rd April</th>
                    <td>65 mm</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">24th April</th>
                    <td>60 mm</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0 mt-5" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Flood Prevention Information</h3>
                  </div>
                </Row>
              </CardHeader>
              <row className="d-flex flex-row pl-3">
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <CardImg
                      alt="..."
                      src={require("assets/img/brand/swin-flood.png")}
                      top
                    />
                    <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <CardImg
                      alt="..."
                      src={require("assets/img/brand/swin-flood.png")}
                      top
                    />
                    <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <CardImg
                      alt="..."
                      src={require("assets/img/brand/swin-flood.png")}
                      top
                    />
                    <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCOwqP559NkBp30UqCx3fVCc8xlxRZup2A",
  version: 3.31,
})(Index);
