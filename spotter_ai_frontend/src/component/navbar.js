import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="mx-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link> 
        <Nav.Link as={Link} to="/loghistory">Log History</Nav.Link> 
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
