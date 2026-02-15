import { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import passwordImg from "../assets/images/password_image.png";

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

  /* ==============================
     SECURE RANDOM FUNCTIONS
  ============================== */

  const cryptoRandom = (max) => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  };

  const getRandomChar = (chars) => {
    return chars[cryptoRandom(chars.length)];
  };

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = cryptoRandom(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  /* ==============================
     PASSWORD GENERATION
  ============================== */

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+{}[]<>?/";

    let pool = "";
    let mandatory = [];

    if (options.lowercase) {
      pool += lowercase;
      mandatory.push(getRandomChar(lowercase));
    }

    if (options.uppercase) {
      pool += uppercase;
      mandatory.push(getRandomChar(uppercase));
    }

    if (options.numbers) {
      pool += numbers;
      mandatory.push(getRandomChar(numbers));
    }

    if (options.symbols) {
      pool += symbols;
      mandatory.push(getRandomChar(symbols));
    }

    if (!pool) {
      alert("Select at least one option");
      return;
    }

    if (options.length < mandatory.length) {
      alert("Length too short for selected options");
      return;
    }

    while (mandatory.length < options.length) {
      mandatory.push(getRandomChar(pool));
    }

    const finalPassword = shuffle(mandatory).join("");
    setPassword(finalPassword);
    setCopied(false);
  };

  /* ==============================
     PASSWORD STRENGTH
  ============================== */

  const getStrength = (password) => {
    let score = 0;

    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;

    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", variant: "danger" };
    if (score <= 4) return { label: "Medium", variant: "warning" };
    return { label: "Strong", variant: "success" };
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

  const strength = password ? getStrength(password) : null;

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
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link href="/" className="ms-5">Home</Nav.Link>
              <Nav.Link href="/about" className="ms-5">About</Nav.Link>
              <Nav.Link href="/generate1" className="ms-5">
                Random Password Generator
              </Nav.Link>
              <Nav.Link href="/generate2" className="ms-5">
                Input Password Generator
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
          <Card.Body>
            <h3 className="text-center mb-3">Password Generator</h3>

            <InputGroup className="mb-2">
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

            {/* Strength Indicator */}
            {strength && (
              <div className="mb-3">
                <strong>
                  Strength:{" "}
                  <span className={`text-${strength.variant}`}>
                    {strength.label}
                  </span>
                </strong>
              </div>
            )}

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