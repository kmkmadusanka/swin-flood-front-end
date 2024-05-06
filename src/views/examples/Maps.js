// reactstrap components
import React, { Component } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  CardTitle,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  FormGroup,
  Form,
  Input,
  Modal,
  InputGroup,
} from "reactstrap";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import "./styles/maps.css";
// core components
import Header from "components/Headers/Header.js";

const style = {
  width: "146%",
  height: "70vh",
};

const locations = [
  {
    point: { lat: 8.534487235852568, lng: 80.29865337839264 },
    address: "No 1234, ABC Road, XYZ place",
    distance_from_location: "2",
  },
  {
    point: { lat: 8.543207218523076, lng: 80.29468095325936 },
    address: "No 2345, CDE Road, ABC place",
    distance_from_location: "5",
  },
  {
    point: { lat: 8.496783908472604, lng: 80.29444347595162 },
    address: "No 3456, EFG Road, CDE place",
    distance_from_location: "10",
  },
  {
    point: { lat: 8.487702130663347, lng: 80.31660802467319 },
    address: "No 7890, DFG Road, HJK place",
    distance_from_location: "10",
  },
];

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: {
        lat: process.env.REACT_APP_DEFAULT_LOCATION_LAT,
        lng: process.env.REACT_APP_DEFAULT_LOCATION_LON,
      },
      formData: { address: "", distance: "", point: "" },
      role: "NA",
      zoom: 13,
      formModal: false,
    };
  }

  toggleModal = () => {
    console.log(this.state.formModal);
    this.setState({
      formModal: !this.state.formModal,
    });
  };

  Delete = () => {};

  componentDidMount() {
    if (
      localStorage.getItem("location") !== undefined &&
      localStorage.getItem("location") !== null
    ) {
      const userLocation = JSON.parse(localStorage.getItem("location"));
      this.setState({
        point: { lat: userLocation.lat, lng: userLocation.lon },
        zoom: 16,
      });
    }

    if (
      localStorage.getItem("role") !== undefined &&
      localStorage.getItem("role") !== null
    ) {
      this.setState({
        role: localStorage.getItem("role"),
      });
    }
  }

  handleChange(event) {}

  handleSubmit(event) {
    alert(`ook`);
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7 col-12" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0"></Card>
            </div>
          </Row>
          <div className="row col-12 p-0 m-0 ">
            <Card className="col-4  py-2 side-card">
              <div className=" d-flex">
                <CardTitle>
                  <h2 className="pl-2 mb-0">Safe Locations </h2>
                </CardTitle>
                {this.state.role === "admin" ? (
                  <div className="pl-2">
                    <Button
                      type="button"
                      size="sm"
                      className="btn-info"
                      onClick={this.toggleModal}
                    >
                      Add
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={this.state.formModal}
                toggle={this.toggleModal}
              >
                <div className="modal-body p-0">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Add Severity Location</small>
                      </div>
                      <Form role="form" onSubmit={this.handleSubmit}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              name="address"
                              value={this.state.formData.address}
                              onChange={this.handleChange}
                              placeholder="Address"
                            />
                          </InputGroup>
                        </FormGroup>

                        <select
                          className="col-12 input-group-alternative py-2 mb-3"
                          aria-label="Default select example"
                          name="severity"
                          value={this.state.formData.severity}
                          onChange={this.handleChange}
                        >
                          <option selected>Select Severity</option>
                          <option value="red">Red</option>
                          <option value="blue">Blue</option>
                          <option value="green">Green</option>
                        </select>

                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              name="point"
                              value={this.state.formData.point}
                              onChange={this.handleChange}
                              placeholder="Location Point"
                            />
                          </InputGroup>
                        </FormGroup>

                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                          >
                            Add
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </div>
              </Modal>
              {locations.map((location, i) => (
                <Card
                  key={i}
                  className="mb-2 pointer"
                  onClick={() =>
                    this.setState({
                      point: location.point,
                      zoom: 15,
                    })
                  }
                >
                  <CardBody className="d-flex col-12 px-0 mx-0">
                    <div className="col-10">
                      <CardTitle tag="h5" className="text-muted mb-0">
                        {i + Math.floor(Math.random() * 3)} Km from your
                        location
                      </CardTitle>
                      <span className="h4 mb-0">{location.address}</span>
                    </div>
                    {this.state.role === "admin" ? (
                      <div className="col-2 px-0 mx-0 text-right">
                        <UncontrolledDropdown className="d-flex ">
                          <DropdownToggle
                            className="btn-icon"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                          >
                            <i
                              className="fa fa-ellipsis-v"
                              aria-hidden="true"
                            ></i>
                          </DropdownToggle>

                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={this.Delete}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    ) : (
                      <></>
                    )}
                  </CardBody>
                </Card>
              ))}
            </Card>
            <div className="col-8">
              <Map
                google={this.props.google}
                zoom={this.state.zoom}
                initialCenter={this.state.point}
                center={this.state.point}
                position={"Center"}
                style={style}
                className="limit-height col-md-8 px-0 mx-0"
              >
                {locations.map((location, i) => (
                  <Marker
                    key={i}
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
  apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
})(Maps);
