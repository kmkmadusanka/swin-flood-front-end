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
import { db } from "../Firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

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
    fetchSeverityData();
    // flood prevention tips

    // set prediction data
    setPrediction([
      { date: "2023/05/16", rainfall: "0.8", prediction: "23.7" },
      { date: "2023/05/17", rainfall: "3.4", prediction: "95.3" },
      { date: "2023/05/18", rainfall: "0.96", prediction: "36.7" },
    ]);
  }, []);

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
      setZoom(14);
      setPrediction([
        { date: "2023/05/16", rainfall: "0.78", prediction: "21.4" },
        { date: "2023/05/17", rainfall: "3.1", prediction: "92.3" },
        { date: "2023/05/18", rainfall: "1.01", prediction: "38.2" },
      ]);
    }
  }, []);

  const fetchSeverityData = () => {
    const q = query(collection(db, "severities"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        const inner_data = doc.data();
        data.push({
          id: doc.id,
          address: inner_data.address,
          severity: inner_data.severity,
          point: {
            lat: inner_data.point.split(",")[0],
            lng: inner_data.point.split(",")[1],
          },
        });
      });
      data.sort((a, b) => a.severity - b.severity);
      setLocations(data);
    });

    return () => unsub();
  };

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
                      key={i}
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
                    <tr key={i}>
                      <th scope="row">{p.date}</th>
                      <td>{p.rainfall} m</td>
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
          <Col className="mb-5 mb-xl-0 mt-5 col-md-12">
            <Card className="shadow col-md-12">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">
                      {index_lan.prevention_title[language]}
                    </h3>
                  </div>
                </Row>
              </CardHeader>
              <div className=" pl-3 mb-3 row">
                {preventionTips.map((tip, i) => (
                  <div className="col-md-4 col-sm-4 col-lg-4 mb-1" key={i}>
                    <Card>
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
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
})(Index);
