// src/Payment.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const Payment = () => {
    const cart = useSelector(state => state.cart.data);
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const calculateTotalPrice = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const cardElement = elements.getElement(CardElement);

        try {
            const { data } = await axios.post('http://localhost:5000/orders', { amount: calculateTotalPrice() });

            const { error, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                    },
                }
            );

            if (error) {
                setError(error.message);
            } else {
                setSuccess(`Payment successful! PaymentIntent ID: ${paymentIntent.id}`);
            }
        } catch (error) {
            setError(error.response.data.error.message);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <Card>
                        <Card.Header>
                            <h3>Payment Gateway</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicAmount">
                                    <Form.Label>Total Amount</Form.Label>
                                    <Form.Control type="text" value={`$${calculateTotalPrice()}`} readOnly />
                                </Form.Group>
                                <CardElement />
                                <Button variant="primary" type="submit" disabled={!stripe}>
                                    <FaCreditCard /> Pay
                                </Button>
                                {error && <div className="text-danger">{error}</div>}
                                {success && <div className="text-success">{success}</div>}
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <FaLock /> Secure payment
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Payment;