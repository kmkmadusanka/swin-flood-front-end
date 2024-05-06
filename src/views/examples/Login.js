import React from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", loading: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "email") {
      this.setState({
        email: event.target.value,
      });
    }
    if (event.target.name === "password") {
      this.setState({
        password: event.target.value,
      });
    }
  }

  handleSubmit(event) {
    if (
      this.state.email !== null &&
      this.state.email !== undefined &&
      this.state.password !== null &&
      this.state.password !== undefined
    ) {
      // access users current location
      this.setState({
        loading: true,
      });
      accessLocation()
        .then((result) => {
          localStorage.setItem("location", JSON.stringify(result));
          localStorage.setItem("email", JSON.stringify(this.state.email));
          localStorage.setItem("role", "admin");
          this.props.navigate(`/admin/index`);
          window.location.reload();
          this.setState({
            loading: false,
          });
        })
        .catch(() => {
          alert("Can not Access Location!");
          this.setState({
            loading: false,
          });
        });
    }

    function accessLocation() {
      const location = { lat: "", lon: "" };
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(function (position) {
          location.lat = position.coords.latitude;
          location.lon = position.coords.longitude;
          resolve(location);
        });
      });
    }

    event.preventDefault();
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>

              <Form role="form" onSubmit={this.handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center d-flex align-items-center flex-column">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    value="Submit"
                  >
                    Sign in
                  </Button>
                  {this.state.loading ? (
                    <ReactLoading
                      className="text-center"
                      type={"bars"}
                      color={"black"}
                      height={"20%"}
                      width={"20%"}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default WithNavigate;
