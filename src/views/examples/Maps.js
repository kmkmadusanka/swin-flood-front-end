/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React, { Component } from "react";
import { Card, Container, Row } from "reactstrap";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import "./styles/maps.css";

// core components
import Header from "components/Headers/Header.js";
const style = {
  width: "95%",
  height: "70vh",
};

class Maps extends Component {
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
          <Map
            google={this.props.google}
            zoom={13}
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
              onMouseover={this.onMouseoverMarker}
              position={{ lat: 8.503673389577162, lng: 80.28383615620632 }}
            ></Marker>

            <Marker
              name={"Location A"}
              title="Location"
              onMouseover={this.onMouseoverMarker}
              position={{ lat: 8.543207218523076, lng: 80.29468095325936 }}
            ></Marker>

            <Marker
              name={"Location A"}
              title="Location"
              onMouseover={this.onMouseoverMarker}
              position={{ lat: 8.496783908472604, lng: 80.29444347595162 }}
            ></Marker>

            <Marker
              name={"Location A"}
              title="Location"
              onMouseover={this.onMouseoverMarker}
              position={{ lat: 8.487702130663347, lng: 80.31660802467319 }}
            ></Marker>
          </Map>
        </Container>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCOwqP559NkBp30UqCx3fVCc8xlxRZup2A",
  version: 3.31,
})(Maps);
