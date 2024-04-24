// reactstrap components
import React, { Component } from "react";
import { Card, CardBody, Container, Row, CardTitle, Col } from "reactstrap";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import "./styles/maps.css";
// core components
import Header from "components/Headers/Header.js";

const style = {
  width: "71%",
  height: "70vh",
};

const locations = [
  {
    point: { lat: 8.534487235852568, lng: 80.29865337839264 },
    address: "No 1234, ABC Road, XYZ place",
  },
  {
    point: { lat: 8.543207218523076, lng: 80.29468095325936 },
    address: "No 2345, CDE Road, ABC place",
  },
  {
    point: { lat: 8.496783908472604, lng: 80.29444347595162 },
    address: "No 3456, EFG Road, CDE place",
  },
  {
    point: { lat: 8.487702130663347, lng: 80.31660802467319 },
    address: "No 7890, DFG Road, HJK place",
  },
];

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: { lat: 8.534487235852568, lng: 80.29865337839264 },
      zoom: 13,
    };
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7 " fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0"></Card>
            </div>
          </Row>
          <div className="d-flex align-items-star">
            <Card className="w-25 px-1 py-2 side-card">
              <CardTitle>
                <h2 className="pl-2 mb-0">Safe Locations </h2>
              </CardTitle>
              {locations.map((location, i) => (
                <Card
                  className="mb-2 pointer"
                  onClick={() =>
                    this.setState({
                      point: location.point,
                      zoom: 15,
                    })
                  }
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-muted mb-0">
                          {i + Math.floor(Math.random() * 3)} Km from your
                          location
                        </CardTitle>
                        <span className="h4 mb-0">{location.address}</span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              ))}
            </Card>
            <div>
              <Map
                google={this.props.google}
                zoom={this.state.zoom}
                initialCenter={this.state.point}
                center={this.state.point}
                position={"Center"}
                style={style}
                className="limit-height ml-2"
              >
                {locations.map((location) => (
                  <Marker
                    name={location.address}
                    title={location.address}
                    onMouseover={this.onMouseoverMarker}
                    position={location.point}
                  ></Marker>
                ))}
              </Map>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCOwqP559NkBp30UqCx3fVCc8xlxRZup2A",
  version: 3.31,
})(Maps);