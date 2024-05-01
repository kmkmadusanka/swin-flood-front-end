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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
// excel download
import exportFromJSON from "export-from-json";
import ReactPaginate from "react-paginate";

import "../examples/styles/table.css";

const Users = () => {
  const [searchedVal, setSearchedVal] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([
      {
        name: "Kasun Madusanka",
        email: "kasun@gmail.com",
        role: "admin",
      },
      {
        name: "Kamal Perera",
        email: "kamal@gmail.com",
        role: "user",
      },
      {
        name: "Amal Perera",
        email: "amal@gmail.com",
        role: "user",
      },
    ]);
  }, []);

  const Export = () => {
    const data = items;
    const fileName = "users";
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const Delete = () => {};

  function Items({ currentItems }) {
    return (
      <>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email Address</th>
              <th scope="col">User Role</th>
              <th scope="col" />
            </tr>
          </thead>

          <tbody>
            {currentItems &&
              currentItems
                .filter(
                  (row) =>
                    !searchedVal.length ||
                    row.name
                      .toString()
                      .toLowerCase()
                      .includes(searchedVal.toString().toLowerCase())
                )
                .map((row, i) => (
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.role}</td>
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
                          <DropdownItem onClick={Delete}>Delete</DropdownItem>
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
                <h3 className="mb-0">User Management</h3>
                <div className="col-md-6 d-flex  align-items-center">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search from User Name"
                      onChange={(e) => setSearchedVal(e.target.value)}
                    />
                  </div>
                  <UncontrolledDropdown className="col-md-4 d-flex justify-content-end">
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
    </>
  );
};

export default Users;
