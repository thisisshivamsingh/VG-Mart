import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Loading() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <p>Loading.........</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Loading;
