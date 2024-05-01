import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Progress,
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

const Tables = () => {
  const [searchedVal, setSearchedVal] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([
      {
        date: "20th April 2024",
        rainfall: "30",
        flood_prediction: "40",
      },
      {
        date: "22th April 2024",
        rainfall: "34",
        flood_prediction: "40",
      },
      {
        date: "22th April 2024",
        rainfall: "35",
        flood_prediction: "40",
      },
      {
        date: "22th April 2024",
        rainfall: "36",
        flood_prediction: "40",
      },
      {
        date: "20th April 2024",
        rainfall: "300",
        flood_prediction: "40",
      },
      {
        date: "22th April 2024",
        rainfall: "340",
        flood_prediction: "40",
      },
      {
        date: "22th April 2024",
        rainfall: "350",
        flood_prediction: "40",
      },
      {
        date: "22th April 2024",
        rainfall: "360",
        flood_prediction: "40",
      },
    ]);
  }, []);

  const Export = () => {
    const data = items;
    const fileName = "flood-prediction-data";
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  function Items({ currentItems }) {
    return (
      <>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Rainfall</th>
              <th scope="col">Flood Prediction Percentage</th>
            </tr>
          </thead>

          <tbody>
            {currentItems &&
              currentItems
                .filter(
                  (row) =>
                    !searchedVal.length ||
                    row.date
                      .toString()
                      .toLowerCase()
                      .includes(searchedVal.toString().toLowerCase())
                )
                .map((row, i) => (
                  <tr key={i}>
                    <td>{row.date}</td>
                    <td>{row.rainfall} ml</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2"> {row.flood_prediction} %</span>
                        <div>
                          <Progress
                            max="100"
                            value={`${row.flood_prediction}`}
                            barClassName={
                              Number(row.flood_prediction) >= 70
                                ? "bg-gradient-danger"
                                : Number(row.flood_prediction) > 50
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
                <h3 className="mb-0">Flood Record History Table</h3>
                <div className="col-md-6 d-flex  align-items-center">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search from Date"
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

export default Tables;
