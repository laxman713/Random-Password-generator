import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import passwordImg from "../assets/images/password_image.png";
import "../styles/global.css";
import {Link} from "react-router-dom";
function AppNavbar() {
  return (
    <>
      {/* Navbar */}
      <Navbar className="navColor" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src={passwordImg}
              alt="logo"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            Password Generator
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="ms-5">Home</Nav.Link>
              <Nav.Link href="/about" className="ms-5">About</Nav.Link>
              <Nav.Link href="/generate1" className="ms-5">Random Password Generator</Nav.Link>
                            <Nav.Link href="/generate2" className="ms-5">Input Password Generator</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

<div class="container">
  <div class="row">
    <div class="col-12 col-sm-4 col-md-5 col-lg-6 mt-5">
     <div class= "pt-4 pt-sm-5 pt-md-5 pt-lg-5">
        <h1>
            Secure Password Generator
        </h1><br/><br/>
        <p> Create strong random passwords or name-based passwords
              with customizable length and extra symbols & numbers.
        </p>
        </div>

     
 <Link to="/about">
  <button className="btn btn-primary">Generate Password</button>
</Link>    </div>
    <div class="col-12 col-sm-8 col-md-7 col-lg-6 mt-5">
          <div class= "pt-4 mt-sm-5 pt-sm-5 pt-md-5 pt-lg-5">

         <img src={passwordImg} class="img-fluid " alt="password pic 1"/>
    </div>
    </div>
  </div>
</div>


       
    </>
  );
}

export default AppNavbar;
