
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import passwordImg from "../assets/images/password_image.png";
import "../styles/global.css";
import { Link } from "react-router-dom";

function AboutPage(){
    return(<>
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
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 mt-5">
     <div class= "pt-2 pt-sm-5 pt-md-5 pt-lg-5">
        <h1>
          About Secure Password Generator
        </h1><br/>
        <h3>
            Random Password Generator
        </h3>
        <p>
           Generate highly secure random passwords with customizable length and optional symbols and numbers for better security. 
        </p>
             <Link to="/generate1">
  <button className="btn btn-primary">Generate Password</button>
</Link>
<br/><br/>

        <h3>
            Input Based Password Generator
        </h3>
        <p>
Generate personalized passwords from user input with customizable length and optional symbols and numbers.        </p>
        </div>

     
 <Link to="/generate2">
  <button className="btn btn-primary">Generate Password</button>
</Link>
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 mt-5">
          <div class= "pt-4 mt-sm-5 pt-sm-5 pt-md-5 pt-lg-5">

         <img src={passwordImg} class="img-fluid " alt="password pic 2"/>
    </div>
    </div>
  </div>
</div>


       
    </>)
}
export default AboutPage;