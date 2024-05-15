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
import { db } from "../../Firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import * as Yup from "yup";

const style = {
  width: "146%",
  height: "70vh",
};

const schema = Yup.object().shape({
  address: Yup.string().trim().min(6).required(),
  distance: Yup.number().required(),
  point: Yup.string()
    .required()
    .matches(
      /^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?,([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?$/,
      "Location point should contain latitude and longitude seperated by comma!"
    ),
});

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: {
        lat: process.env.REACT_APP_DEFAULT_LOCATION_LAT,
        lng: process.env.REACT_APP_DEFAULT_LOCATION_LON,
      },
      address: "",
      distance: null,
      location_point: "",
      role: "NA",
      zoom: 13,
      formModal: false,
      locations: [],
    };
  }

  toggleModal = () => {
    this.setState({
      formModal: !this.state.formModal,
    });
  };

  Delete = async (id) => {
    await deleteDoc(doc(db, "safeLocations", id));
  };

  fetchData = () => {
    const q = query(collection(db, "safeLocations"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        const inner_data = doc.data();
        data.push({
          id: doc.id,
          address: inner_data.address,
          distance: inner_data.distance,
          point: {
            lat: inner_data.point.split(",")[0],
            lng: inner_data.point.split(",")[1],
          },
        });
      });
      data.sort((a, b) => a.distance - b.distance);
      this.setState({
        locations: data,
      });
    });

    return () => unsub();
  };

  componentDidMount() {
    if (
      localStorage.getItem("location") !== undefined &&
      localStorage.getItem("location") !== null
    ) {
      const userLocation = JSON.parse(localStorage.getItem("location"));
      this.setState({
        point: { lat: userLocation.lat, lng: userLocation.lon },
        zoom: 15,
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

    this.fetchData();
  }

  handleChange = (event) => {
    if (event.target.name === "address") {
      this.setState({
        address: event.target.value,
      });
    }
    if (event.target.name === "distance") {
      this.setState({
        distance: event.target.value,
      });
    }
    if (event.target.name === "point") {
      this.setState({
        location_point: event.target.value,
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        address: this.state.address,
        distance: this.state.distance,
        point: this.state.location_point,
      };

      await schema.validate(formData);

      await addDoc(collection(db, "safeLocations"), formData);

      this.setState({
        address: "",
        distance: "",
        location_point: "",
        formModal: false,
      });
    } catch (error) {
      alert(error);
    }
  };
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
            <Card className="col-md-4 col-sm-12  col-lg-4 py-2 side-card">
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
                              value={this.state.address}
                              onChange={this.handleChange}
                              placeholder="Address"
                            />
                          </InputGroup>
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              name="distance"
                              type="number"
                              value={this.state.distance}
                              onChange={this.handleChange}
                              placeholder="distance"
                            />
                          </InputGroup>
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              name="point"
                              value={this.state.location_point}
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
              {this.state.locations.map((location, i) => (
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
                        {location.distance} Km from your location
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
                            <DropdownItem
                              onClick={() => this.Delete(location.id)}
                            >
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
            <div className="col-md-8 col-sm-12">
              <Map
                google={this.props.google}
                zoom={this.state.zoom}
                initialCenter={this.state.point}
                center={this.state.point}
                position={"Center"}
                style={style}
                className="limit-height col-md-8 px-0 mx-0"
              >
                {this.state.locations.map((location, i) => (
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
