import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';

const CardElement= () => {
    const stripe = useStripe();
    const elements = useElements();

    return (
        <Card className="mb-4">
            <Card.Header className="bg-dark text-white">
                <Row>
                    <Col>
                        <FaLock className="mb-1" />
                    </Col>
                    <Col className="text-end">
                        <Form.Label className="text-white">Card Information</Form.Label>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body className="p-4">
                <CardElement options={{hidePostalCode: true}} />
            </Card.Body>
        </Card>
    );
};

export default CardElement;
