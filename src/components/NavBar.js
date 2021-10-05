import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">Recipes</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={ Link } to="/">Home</Nav.Link>
        <Nav.Link as={ Link } to="/recipe">Recipe</Nav.Link>
        <Nav.Link as={ Link } to="/article">Article</Nav.Link>
        <Nav.Link as={ Link } to="/category">Category</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar;
