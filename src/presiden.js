import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavigationBar from "./Components/Navbar";
import PaslonCard from "./Components/PresidenCard";

const Presiden = () => {
  const paslonData = [
    {
      number: "01",
      candidate1: "Ir. Lorem Ipsum",
      candidate2: "Ir. Lorem Ipsum",
    },
    {
      number: "02",
      candidate1: "Ir. Dolor Sit Amet",
      candidate2: "Ir. Dolor Sit Amet",
    },
    {
      number: "03",
      candidate1: "Ir. Consectetur H",
      candidate2: "Ir. Consectetur H",
    },
  ];

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
            {paslonData.map((paslon, index) => (
              <Col key={index}>
                <PaslonCard
                  number={paslon.number}
                  candidate1={paslon.candidate1}
                  candidate2={paslon.candidate2}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Presiden;
