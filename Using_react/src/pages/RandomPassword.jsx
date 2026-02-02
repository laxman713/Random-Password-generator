import { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import passwordImg from "../assets/images/password_image.png";
import InputGroup from "react-bootstrap/InputGroup";
function RandomPage() {
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false,
    length: 12,
  });

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setOptions({
      ...options,
      [name]: type === "checkbox" ? checked : Number(value),
    });
  };

  const generatePassword = () => {
    let chars = "";

    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+{}[]<>?/";

    if (!chars) {
      alert("Select at least one option");
      return;
    }

    let result = "";
    for (let i = 0; i < options.length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <>
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

    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <Card.Body>
          <h3 className="text-center mb-3">🔐 Password Generator</h3>
          <p className="text-center text-muted">
            Create strong and secure passwords instantly
          </p>

          {/* Password Output + Copy */}
          <InputGroup className="mb-4">
            <Form.Control
              type="text"
              value={password}
              readOnly
              placeholder="Your password will appear here"
              className="fw-bold"
            />
            <Button
              variant={copied ? "success" : "outline-secondary"}
              onClick={copyToClipboard}
              disabled={!password}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </InputGroup>

          {/* Length */}
          <Form.Group className="mb-3">
            <Form.Label>Password Length</Form.Label>
            <Form.Control
              type="number"
              min="4"
              max="32"
              name="length"
              value={options.length}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Options */}
          <Row className="mb-3">
            <Col xs={6}>
              <Form.Check
                type="checkbox"
                label="Lowercase"
                name="lowercase"
                checked={options.lowercase}
                onChange={handleChange}
              />
            </Col>
            <Col xs={6}>
              <Form.Check
                type="checkbox"
                label="Uppercase"
                name="uppercase"
                checked={options.uppercase}
                onChange={handleChange}
              />
            </Col>
            <Col xs={6}>
              <Form.Check
                type="checkbox"
                label="Numbers"
                name="numbers"
                checked={options.numbers}
                onChange={handleChange}
              />
            </Col>
            <Col xs={6}>
              <Form.Check
                type="checkbox"
                label="Symbols"
                name="symbols"
                checked={options.symbols}
                onChange={handleChange}
              />
            </Col>
          </Row>

          {/* Generate Button */}
          <div className="d-grid">
            <Button variant="primary" size="lg" onClick={generatePassword}>
              Generate Password
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}

export default RandomPage;