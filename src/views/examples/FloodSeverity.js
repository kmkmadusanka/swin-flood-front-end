import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Button,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Modal,
} from "reactstrap";
import * as Yup from "yup";
// core components
import Header from "components/Headers/Header.js";
// excel download
import exportFromJSON from "export-from-json";
import ReactPaginate from "react-paginate";

import { db } from "../../Firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import "../examples/styles/table.css";

const schema = Yup.object().shape({
  address: Yup.string()
    .trim()
    .min(6)
    .required(),
  severity: Yup.string().required(),
  point: Yup.string().required().matches(/^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?,([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?$/, "Location point should contain latitude and longitude seperated by comma!"),
});

const FloodSeverity = () => {
  const [searchedVal, setSearchedVal] = useState("");
  const [items, setItems] = useState([]);
  const [defaultModal, setDefaultModal] = useState(false);
  const [address, setAddress] = useState("");
  const [severity, setSeverity] = useState("");
  const [point, setPoint] = useState("");

  const toggleModal = () => {
    setDefaultModal(!defaultModal);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate({
        address, severity, point
      });
      await addDoc(collection(db, "severities"), {
        address: address,
        severity: severity,
        point: point,
      }).catch((e) => {
        alert(e);
      });
      setAddress("");
      setPoint("");
      setSeverity("");
      setDefaultModal(false);
    } catch (error) {
      alert(error)
    }

  };

  const fetchData = () => {
    const q = query(collection(db, "severities"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        const inner_data = doc.data();
        data.push({
          id: doc.id,
          address: inner_data.address,
          severity: inner_data.severity,
          point: inner_data.point,
        });
      });
      data.sort((a, b) => a.severity - b.severity);
      setItems(data);
    });

    return () => unsub();
  };

  const Export = () => {
    const data = items;
    const fileName = "flood-severity";
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const Delete = async (id) => {
    await deleteDoc(doc(db, "severities", id));
  };

  function Items({ currentItems }) {
    return (
      <>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Address</th>
              <th scope="col">Severity</th>
              <th scope="col">Location Point</th>
              <th scope="col" />
            </tr>
          </thead>

          <tbody>
            {currentItems &&
              currentItems
                .filter(
                  (row) =>
                    !searchedVal.length ||
                    row.address
                      .toString()
                      .toLowerCase()
                      .includes(searchedVal.toString().toLowerCase())
                )
                .map((row, i) => (
                  <tr key={i}>
                    <td>{row.address}</td>
                    <td>
                      {" "}
                      {row.severity && (
                        <img
                          alt="..."
                          src={require(`assets/img/icons/common/triangle-${row.severity}.ico`)}
                          height={24}
                        />
                      )}
                    </td>
                    <td>{row.point}</td>
                    <td>
                      {" "}
                      <UncontrolledDropdown className="col-md-4 d-flex justify-content-end">
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
                          <DropdownItem onClick={() => Delete(row.id)}>
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <div className="col-md-12 d-flex justify-content-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow ">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Flood Severity Management</h3>
                <div className="col-md-8 d-flex  align-items-end">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search from Address"
                      onChange={(e) => setSearchedVal(e.target.value)}
                    />
                  </div>
                  <UncontrolledDropdown className="col-md-4 d-flex justify-content-center">
                    <Button
                      type="button"
                      size="sm"
                      className="btn-info "
                      onClick={toggleModal}
                    >
                      Add
                    </Button>
                    <DropdownToggle
                      className="btn-info"
                      href="#pablo"
                      role="button"
                      size="sm"
                      color=""
                    >
                      <span> Actions</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem onClick={Export}>Download</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </CardHeader>
              <PaginatedItems itemsPerPage={4} />
            </Card>
          </div>
        </Row>
      </Container>
      <Modal
        className="modal-dialog-centered"
        size="sm"
        isOpen={defaultModal}
        toggle={toggleModal}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Add Severity Location</small>
              </div>
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <Input
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                    />
                  </InputGroup>
                </FormGroup>

                <select
                  className="col-12 input-group-alternative py-2 mb-3"
                  aria-label="Default select example"
                  name="severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
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
                      value={point}
                      onChange={(e) => setPoint(e.target.value)}
                      placeholder="Location Point"
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default FloodSeverity;
