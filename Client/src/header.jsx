import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaHome, FaLaptop, FaMobileAlt, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.data);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaHome style={{ marginRight: 5 }} />
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/desktop">
              <FaLaptop style={{ marginRight: 5 }} />
              Desktop
            </Nav.Link>
            <Nav.Link as={Link} to="/laptop">
              <FaLaptop style={{ marginRight: 5 }} />
              Laptop
            </Nav.Link>
            <Nav.Link as={Link} to="/mobile">
              <FaMobileAlt style={{ marginRight: 5 }} />
              Mobile
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={() => navigate("/cart")}
              style={{ cursor: "pointer" }}
            >
              <FaShoppingCart style={{ marginRight: 5 }} />
              <Badge bg="light" text="dark">
                {cartData.length}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
