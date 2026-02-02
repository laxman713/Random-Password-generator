import { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import passwordImg from "../assets/images/password_image.png";

function InputPasswordGenerator() {
  const [baseText, setBaseText] = useState("");
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    if (!baseText.trim()) {
      alert("Enter some input text");
      return;
    }

    const extraChars = "0123456789!@#$%^&*";
    let combined = baseText;

    // Add extra characters until we reach desired length
    while (combined.length < length) {
      combined += extraChars[Math.floor(Math.random() * extraChars.length)];
    }

    // Shuffle characters
    const shuffled = combined
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
      .slice(0, length);

    setPassword(shuffled);
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
          <h3 className="text-center mb-3">🧩 Input-Based Password Generator</h3>
          <p className="text-center text-muted">
            Generate passwords using your own text as the base
          </p>

          {/* Output + Copy */}
          <InputGroup className="mb-4">
            <Form.Control
              type="text"
              value={password}
              readOnly
              placeholder="Generated password"
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

          {/* Base Input */}
          <Form.Group className="mb-3">
            <Form.Label>Input Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name or keyword"
              value={baseText}
              onChange={(e) => setBaseText(e.target.value)}
            />
          </Form.Group>

          {/* Length */}
          <Form.Group className="mb-4">
            <Form.Label>Password Length</Form.Label>
            <Form.Control
              type="number"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </Form.Group>

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

export default InputPasswordGenerator;
