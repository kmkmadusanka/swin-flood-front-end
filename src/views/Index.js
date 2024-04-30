import { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
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

  CardText,
} from "reactstrap";

import Header from "components/Headers/Header.js";

import index_lan from "../language/index_lan.js";

const style = {
  width: "95%",
  height: "50vh",
};

const Index = (props) => {
  const [locations, setLocations] = useState([]);

  const [predictions, setPrediction] = useState([]);
  const [lat, setLat] = useState(process.env.REACT_APP_DEFAULT_LOCATION_LAT);
  const [lon, setLon] = useState(process.env.REACT_APP_DEFAULT_LOCATION_LON);
  const [zoom, setZoom] = useState(12);
  const [language, setLanguage] = useState("eng");

  useEffect(() => {
    if (
      localStorage.getItem("lan") !== undefined &&
      localStorage.getItem("lan") !== null
    ) {
      setLanguage(localStorage.getItem("lan"));
    }
    if (
      localStorage.getItem("location") !== undefined &&
      localStorage.getItem("location") !== null
    ) {
      const userLocation = JSON.parse(localStorage.getItem("location"));
      setLat(userLocation.lat);
      setLon(userLocation.lon);
      setZoom(15);
    }
  }, []);
  useEffect(() => {
    // set locations into the component
    setLocations([
      {
        point: { lat: 8.534487235852568, lng: 80.29865337839264 },
        address: "No 1234, ABC Road, XYZ place",
        severity: "red",
      },
      {
        point: { lat: 8.543207218523076, lng: 80.29468095325936 },
        address: "No 2345, CDE Road, ABC place",
        severity: "green",
      },
      {
        point: { lat: 8.496783908472604, lng: 80.29444347595162 },
        address: "No 3456, EFG Road, CDE place",
        severity: "blue",
      },
      {
        point: { lat: 8.487702130663347, lng: 80.31660802467319 },
        address: "No 7890, DFG Road, HJK place",
        severity: "red",
      },
    ]);
    // flood prevention tips

    // set prediction data
    setPrediction([
      { date: "today", rainfall: "187", prediction: "60" },
      { date: "Tomorrow", rainfall: "100", prediction: "70" },
      { date: "20th April", rainfall: "195", prediction: "80" },
      { date: "21st April", rainfall: "165", prediction: "75" },
      { date: "22nd April", rainfall: "67", prediction: "30" },
      { date: "23rd April", rainfall: "65", prediction: "30" },
      { date: "24th April", rainfall: "60", prediction: "30" },
    ]);
  }, []);

  const preventionTips = [
    {
      image: "1.jpg",
      title: index_lan.early_warning_title[language],
      description: index_lan.early_warning_description[language],
    },
    {
      image: "2.jpg",
      title: index_lan.land_use_title[language],
      description: index_lan.land_use_description[language],
    },
    {
      image: "3.jpg",
      title: index_lan.household_title[language],
      description: index_lan.household_description[language],
    },
  ];
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
                    <h3 className=" mb-0">
                      {index_lan.flood_severit[language]}
                    </h3>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="d-flex flex-row">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/triangle-red.ico")}
                        height={24}
                      />
                      <p className="pl-2"> - {index_lan.high[language]}</p>
                    </div>
                    <div className="d-flex flex-row pl-3">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/triangle-blue.ico")}
                        height={24}
                      />
                      <p className="pl-2"> - {index_lan.medium[language]}</p>
                    </div>
                    <div className="d-flex flex-row pl-3 pr-3">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/triangle-green.ico")}
                        height={24}
                      />
                      <p className="pl-2"> - {index_lan.low[language]}</p>
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="map-wrapper">
                <small>* {index_lan.severity_notice[language]}</small>
                <Map
                  google={props.google}
                  zoom={zoom}
                  initialCenter={{ lat: lat, lng: lon }}
                  center={{ lat: lat, lng: lon }}
                  position={"Center"}
                  style={style}
                >
                  {locations.map((location, i) => (
                    <Marker
                      name={location.address}
                      title={location.address}
                      position={location.point}
                      icon={{
                        url: require(`assets/img/icons/common/triangle-${location.severity}.ico`),
                      }}
                    ></Marker>
                  ))}
                </Map>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">
                      {index_lan.flood_prediction_title[language]}
                    </h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">{index_lan.date[language]}</th>
                    <th scope="col">{index_lan.rainfall[language]}</th>
                    <th scope="col">{index_lan.flood_prediction[language]}</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((p, i) => (
                    <tr>
                      <th scope="row">{p.date}</th>
                      <td>{p.rainfall} mm</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{p.prediction}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={`${p.prediction}`}
                              barClassName={
                                Number(p.prediction) >= 70
                                  ? "bg-gradient-danger"
                                  : Number(p.prediction) > 50
                                    ? "bg-gradient-info"
                                    : "bg-gradient-success"
                              }
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0 mt-5" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">
                      {index_lan.prevention_title[language]}
                    </h3>
                  </div>
                </Row>
              </CardHeader>
              <row className="d-flex flex-row pl-3 mb-3">
                {preventionTips.map((tip, i) => (
                  <Col>
                    <Card style={{ width: "23vw", minHeight: "50vh" }}>
                      <CardImg
                        alt="..."
                        src={require(`assets/img/detailed/${tip.image}`)}
                        top
                      />
                      <CardBody>
                        <CardTitle>{tip.title}</CardTitle>
                        <CardText>
                          <small>{tip.description}</small>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  version: 3.31,
})(Index);
