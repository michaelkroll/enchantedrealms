import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./Tokens.css";

const Tokens = () => {
  return (
    <>
      <div className="token-container">
        <Container>
          <Row>
            <Col className="pt-4">
              <h2>Tokens</h2>
            </Col>
          </Row>
          <Row>
            <Col className="my-2">
              <Card style={{ width: "18rem" }}>
                <Card.Img src="/logo.svg" variant="top"/>
                <Card.Body>
                  <Card.Title className="token-card-title">Name</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dolore quos earum maxime similique fuga voluptates. Quidem
                    soluta ipsam autem vero!
                  </Card.Text>
                  <Button className="btn-secondary me-2">Edit</Button>
                  <Button className="btn-danger me-2">Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Tokens;
