import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function NotFound({ Message }: { Message: string }) {
  const router = useRouter();
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <p>{Message ? Message : "Not Found"}</p>
            <Button variant="danger" onClick={() => router.push("/")}>
              Back To Home
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NotFound;
