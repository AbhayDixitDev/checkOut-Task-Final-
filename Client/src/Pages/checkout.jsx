import React, { useState, useEffect } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import { clearCart } from '../reduxSlices/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.data);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setAmount(total);
  }, [cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post('http://localhost:5000/orders/checkout', {
        cart,
        amount,
        name,
        email
      });

      // Redirect to Stripe Checkout
      console.log(data.url);
      window.location.href = data.url; // Use the URL returned from the backend
    } catch (error) {
      console.log(error.response);
      setError(
        error.response && error.response.data
          ? error.response.data.error.message
          : 'An error occurred during payment processing.'
      );
    } finally {
      setLoading(false);
      // Clear the cart
      dispatch(clearCart());
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card>
            <Card.Header>
              <h3 className="text-center">Payment Gateway</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit} className="m-4">
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!stripe || loading}
                  className="d-flex align-items-center"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCreditCard className="me-2 border rounded-pill" /> Checkout
                    </>
                  )}
                </Button>
                {error && <div className="text-danger mt-3">{error}</div>}
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <FaLock /> Secure payment
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;