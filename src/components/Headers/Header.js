import { useEffect, useState } from "react";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import header from "../../language/header_lan.js";

const Header = () => {
  const [language, setLanguage] = useState("eng");
  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (
      localStorage.getItem("lan") !== undefined &&
      localStorage.getItem("lan") !== null
    ) {
      setLanguage(localStorage.getItem("lan"));
    }
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.REACT_APP_DEFAULT_LOCATION_LAT}&lon=${process.env.REACT_APP_DEFAULT_LOCATION_LON}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        setData(postsData);

        setCounter(0);
      } catch (err) {
        setData(null);
      }
    };

    // fetchDataForPosts();
  }, []);

  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 60000);
  }, [counter]);

  return (
    <>
      <div className="header bg-gradient-cyan pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {header.temperature[language]}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data !== null ? data.main.temp : "0"} °C
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fa-solid fa-temperature-half" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        {header.updated[language]} {counter}{" "}
                        {header.minuit[language]}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {header.humidity[language]}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {" "}
                          {data !== null ? data.main.humidity : "0"} %
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fa-solid fa-droplet" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        {header.updated[language]} {counter}{" "}
                        {header.minuit[language]}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {header.wind_speed[language]}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data !== null ? data.wind.speed : "0"} Km/h
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fa-solid fa-wind" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        {header.updated[language]} {counter}{" "}
                        {header.minuit[language]}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {header.pressure[language]}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data !== null ? data.main.pressure : "0"} hPa
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fa-solid fa-gauge-high" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        {header.updated[language]} {counter}{" "}
                        {header.minuit[language]}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
