import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import { clearCart } from '../reduxSlices/cartSlice';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const cart = useSelector((state) => state.cart.data);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
    setError(null);
    setSuccess(null);
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { data } = await axios.post('http://localhost:5000/orders', {
        cart,
        amount,
        name,
        email
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(`Payment error: ${error.message}`);
      } else {
        setSuccess(`Payment successful! PaymentIntent ID: ${paymentIntent.id}`);
        setSuccess(
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Successful Transaction</h4>
              <p>
                Name: {name} <br />
                Email: {email} <br />
                Total: ${amount} <br />
                Payment Type: Online Using Stripe
              </p>
            </div>
          );
        setTimeout(() => {
          setSuccess(
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,1)', zIndex: 9999 }}>
              <h1 className="display-1 text-success text-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Thank you for shopping with us!</h1>
              <h3>You will be redirected to the home page in 3 seconds</h3>
            </div>
          );
        }, 5000);
        setTimeout(() => {
          Navigate('/');
        }, 8000);
      }
    } catch (error) {
      console.log(error.response);
      setError(
        error.response && error.response.data
          ? error.response.data.error.message
          : 'An error occurred during payment processing.'
      );
    } finally {
      setLoading(false);
    }

    // Clear the cart
    dispatch(clearCart());
    
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card style={{ backgroundColor: success ? 'transparent' : '#fff' }}>
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
                <Form.Group controlId="formBasicAmount" className="mb-3">
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={`$${amount.toFixed(2)}`}
                    readOnly
                  />
                </Form.Group>
                <CardElement
                  className="mb-3 p-2 border rounded"
                  options={{
                    style: {
                      base: {
                        fontSize: '1rem',
                        color: '#495057',
                        backgroundColor: '#fff',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#dc3545',
                        ':focus': {
                          borderColor: '#dc3545',
                        },
                      },
                    },
                  }}
                />
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
                      <FaCreditCard className="me-2 border rounded-pill" /> Pay
                    </>
                  )}
                </Button>
                {error && <div className="text-danger mt-3">{error}</div>}
                {success && <div className="text-success mt-3">{success}</div>}
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