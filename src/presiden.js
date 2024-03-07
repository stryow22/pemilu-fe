// presiden.js
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import PaslonCard from "./Components/PresidenCard";
import { searchByID } from "./api";

const Presiden = () => {
  const [candidates, setCandidates] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false); // Initialize with false by default

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidatesMapping = {
          1: { images: "candidates1.png", number: "01", candidates: ["kdd480xfxc3tnky7uboenmi5", "rcsr5cuhjug310834cn3740p"] },
          2: { images: "candidates2.png", number: "02", candidates: ["xw2taezytkvy9x6sv97q5es2", "o4nj02iyxl8malg4ugvdxaji"] }
        };

        const candidatesData = await Promise.all(
          Object.values(candidatesMapping).map(async ({ images, number, candidates }) => {
            const capresResponse = await searchByID(candidates[0]);
            const wapresResponse = await searchByID(candidates[1]);

            if (capresResponse.success && wapresResponse.success) {
              return {
                images,
                number,
                capres: capresResponse.data.name,
                wapres: wapresResponse.data.name
              };
            } else {
              return null;
            }
          })
        );

        const filteredCandidates = candidatesData.filter(candidate => candidate !== null);
        setCandidates(filteredCandidates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Retrieve hasVoted from local storage
    const storedHasVoted = localStorage.getItem("hasVoted");
    if (storedHasVoted) {
      setHasVoted(true);
    }
  }, []);

  const handleVote = (candidate) => {
    // Check if user has already voted
    if (hasVoted) {
      alert("You have already voted.");
      return;
    }

    // Save vote temporarily in local storage
    localStorage.setItem("hasVoted", true);
    localStorage.setItem("selectedCandidate", JSON.stringify(candidate));

    setSelectedCandidate(candidate);
    setShowSuccessModal(true);
    setHasVoted(true); // Update hasVoted state
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
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
          {candidates.map((candidate) => (
            <Col key={candidate.number}>
              <PaslonCard
                images={candidate.images}
                number={candidate.number}
                capres={candidate.capres}
                wapres={candidate.wapres}
                onVote={() => handleVote(candidate)}
                hasVoted={hasVoted} // Pass hasVoted as a prop
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCandidate && (
            <>
              <p>Successfully voted for Paslon Nomor {selectedCandidate.number}</p>
              <p>Nama Calon Presiden: {selectedCandidate.capres}</p>
              <p>Nama Wakil Presiden: {selectedCandidate.wapres}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Presiden;