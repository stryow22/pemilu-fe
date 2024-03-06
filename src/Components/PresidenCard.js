import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

const PaslonCard = ({ number, candidate1, candidate2 }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Row>
          <Card.Title className="text-center">{number}</Card.Title>
          <Col>
            <Card.Text>
              {candidate1}
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              {candidate2}
            </Card.Text>
          </Col>
          <Button variant="primary">Vote</Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PaslonCard;
