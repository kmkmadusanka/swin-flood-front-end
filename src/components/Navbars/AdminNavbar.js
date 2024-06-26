import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const name = localStorage.getItem("name");
  function signOut() {
    const ans = window.confirm("Do you want to logout ? ");
    if (ans) {
      localStorage.removeItem("email");
      localStorage.removeItem("location");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      window.location.reload();
    }
  }
  function setLanguageSinhala() {
    localStorage.setItem("lan", "sin");
    window.location.reload();
  }
  function setLanguageEnglish() {
    localStorage.setItem("lan", "eng");
    window.location.reload();
  }
  return (
    <>
      <Navbar className="navbar-top" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            {name !== null ? (
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("../../assets/img/icons/common/user.png")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {name}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={signOut}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <></>
            )}
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm ">Language</span>
                  </Media>
                  <i className="fa fa-arrow-down ml-2" aria-hidden="true"></i>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem href="#pablo" onClick={setLanguageSinhala}>
                  <span>Sinhala</span>
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={setLanguageEnglish}>
                  <span>English</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
