import { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ProgressBar from "react-bootstrap/ProgressBar";
import passwordImg from "../assets/images/password_image.png";

function InputPasswordGenerator() {
  const [baseText, setBaseText] = useState("");
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  /* ==========================
     SECURE RANDOM
  ========================== */

  const cryptoRandom = (max) => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  };

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = cryptoRandom(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  /* ==========================
     PASSWORD GENERATION
  ========================== */

  const generatePassword = () => {
    if (!baseText.trim()) {
      alert("Enter some input text");
      return;
    }

    const extraChars = "0123456789!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let combined = baseText.trim();

    while (combined.length < length) {
      combined += extraChars[cryptoRandom(extraChars.length)];
    }

    const finalPassword = shuffle(combined.split(""))
      .join("")
      .slice(0, length);

    setPassword(finalPassword);
    setCopied(false);
  };

  /* ==========================
     STRENGTH INDICATOR
  ========================== */

  const getStrength = (password) => {
    let score = 0;

    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;

    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Slight penalty if password heavily contains base text
    if (password.toLowerCase().includes(baseText.toLowerCase())) {
      score -= 1;
    }

    if (score <= 2) return { label: "Weak", variant: "danger", value: 30 };
    if (score <= 4) return { label: "Medium", variant: "warning", value: 60 };
    return { label: "Strong", variant: "success", value: 100 };
  };

  const strength = password ? getStrength(password) : null;

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
            <h3 className="text-center mb-3">
              Input-Based Password Generator
            </h3>

            <InputGroup className="mb-2">
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

            {/* Strength Indicator */}
            {strength && (
              <div className="mb-3">
                <strong className={`text-${strength.variant}`}>
                  Strength: {strength.label}
                </strong>
                <ProgressBar
                  now={strength.value}
                  variant={strength.variant}
                  className="mt-2"
                />
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Input Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name or keyword"
                value={baseText}
                onChange={(e) => setBaseText(e.target.value)}
              />
            </Form.Group>

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