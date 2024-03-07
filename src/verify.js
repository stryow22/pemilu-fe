import React, { useState } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import NavigationBar from "./Components/Navbar";
import Tesseract from "node-tesseract-ocr";

const Verify = () => {
  const [ocrText, setOcrText] = useState("");
  const [scanning, setScanning] = useState(false);

  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };

  const handleScan = async () => {
    setScanning(true);
    const img = await fetch("/path/to/your/image.jpg").then((res) =>
      res.blob()
    );
    Tesseract.recognize(img, config)
      .then(({ data: { text } }) => {
        setOcrText(text);
        setScanning(false);
      })
      .catch((error) => {
        console.log("Error:", error.message);
        setScanning(false);
      });
  };

  return (
    <>
      <NavigationBar />
      <div
        style={{
          backgroundColor: "#F7F7F7",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <Row xs={1} md={2} lg={3} className="g-2 justify-content-center">
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Scan KTP Anda</Card.Title>
                  <Button
                    variant="primary"
                    onClick={handleScan}
                    disabled={scanning}
                  >
                    {scanning ? "Scanning..." : "Mulai"}
                  </Button>
                  {ocrText && (
                    <Card.Text>
                      <strong>Hasil OCR:</strong> {ocrText}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Verify;
