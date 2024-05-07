import React from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import * as Yup from "yup";

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
import { db } from "../../Firebase";
import { query, where, collection, getDocs } from "firebase/firestore";
const citiesRef = collection(db, "users");

const schema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Email is not in correct format"
        )
        .required(),
    password: Yup.string().required(),
});

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

    accessLocation() {
        const location = { lat: "", lon: "" };
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(function (position) {
                location.lat = position.coords.latitude;
                location.lon = position.coords.longitude;
                resolve(location);
            });
        });
    }
    async handleSubmit(event) {
        event.preventDefault();

        try {
            await schema.validate({
                email: this.state.email,
                password: this.state.password,
            });


            // access users current location
            this.setState({
                loading: true,
            });

            const q = await query(
                citiesRef,
                where("email", "==", this.state.email),
                where("password", "==", this.state.password)
            );

            const querySnapshot = await getDocs(q);
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    role: doc.data().role,
                });
            });
            if (users.length > 0) {
                this.accessLocation()
                    .then((result) => {
                        localStorage.setItem("location", JSON.stringify(result));
                        localStorage.setItem("email", JSON.stringify(this.state.email));
                        localStorage.setItem("name", users[0]["name"]);
                        localStorage.setItem("role", users[0]["role"]);
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
            } else {
                this.setState({
                    loading: false,
                });
                alert("Invalid email or password!");
            }

        } catch (error) {
            alert(error);
        }
    }

    render() {
        return (
            <>
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <small> Sign in with credentials </small>
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
                                        <> </>
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
