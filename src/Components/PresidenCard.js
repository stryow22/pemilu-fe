import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

const PaslonCard = ({ number, candidate1, candidate2 }) => {
  return (
    <Card style={{ width: '25rem' }} className='h-100'>
      <Card.Header as="h5"className="text-center">{number}</Card.Header>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Row>
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
