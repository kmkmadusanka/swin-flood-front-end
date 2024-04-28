import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
// excel download
import exportFromJSON from "export-from-json";

const rows = [
  {
    date: "20th April 2024",
    rainfall: "30",
    flood_prediction: "40",
  },
  {
    date: "22th April 2024",
    rainfall: "30",
    flood_prediction: "40",
  },
  {
    date: "22th April 2024",
    rainfall: "30",
    flood_prediction: "40",
  },
  {
    date: "22th April 2024",
    rainfall: "30",
    flood_prediction: "40",
  },
];

const Tables = () => {
  const Export = () => {
    const data = rows;
    const fileName = "flood-prediction-data";
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };
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
                <UncontrolledDropdown>
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
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Rainfall</th>
                    <th scope="col">Flood Prediction Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr>
                      <td>{row.date}</td>
                      <td>{row.rainfall} ml</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">
                            {" "}
                            {row.flood_prediction} %
                          </span>
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
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
