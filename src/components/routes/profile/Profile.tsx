import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

import "./Profile.css";
import { ListGroup } from "react-bootstrap";

const Profile = () => {
  return (
    <>
      <div className="profile-container">
        <Container>
          <Row>
            <Col className="pt-4">
              <h2>Profile</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                <ListGroup.Item>
                  <Stack direction="horizontal">
                    <div className="p-2 profile-label">E-Mail</div>
                    <div className="p-2 ms-auto">...</div>
                  </Stack>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Stack direction="horizontal">
                    <div className="p-2 profile-label">Nickname</div>
                    <div className="p-2 ms-auto">...</div>
                    <Button className="mt-2" variant="primary" size="sm">Edit</Button>
                  </Stack>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
