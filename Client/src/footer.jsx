import { Container, Row, Col } from 'react-bootstrap';

const Footer1 = () => {
  return (
    <Container fluid style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', textAlign: 'center', backgroundColor: 'black', color: 'white', fontFamily: 'Dancing Script, cursive' }}>
      <Row>
        <Col>
          <p>
            Made with <span style={{ color: 'red' }}>&#9829;</span> by Abhay Dixit
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer1;
