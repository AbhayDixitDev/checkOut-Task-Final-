import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeFromCart, descrementQnty, incrementQnty } from '../reduxSlices/cartSlice'
import { FaRupeeSign } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const cart = useSelector((state) => state.cart.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const totalAmount = cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <Container fluid className='px-4 mt-4'>
      <Row className='g-4' xs={1} sm={2} md={3} lg={6}>
        {cart.map((item) => (
          <Col key={item.id} className="d-flex">
            <Card style={{ flex: '1 1 auto', border: '1px solid lightgray' }}>
              <Card.Header style={{display: 'flex', justifyContent: 'space-between'}}>
                <Card.Title>{item.name}</Card.Title>
                <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(item)}><FaTrash /></Button>
              </Card.Header>
              <Card.Img variant="top" src={item.image} style={{width: '100%', height: '150px'}} />
              <Card.Footer style={{display: 'flex', justifyContent: 'space-between'}}>
                <Card.Text>Rs. {item.quantity * item.price}</Card.Text>
                <Card.Text>Quantity: 
                    <button onClick={()=>dispatch(descrementQnty(item.id))}>-</button>
                    {item.quantity}
                    <button onClick={()=>dispatch(incrementQnty(item.id))}>+</button>
                    </Card.Text>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <Row style={{marginTop: '20px', marginBottom: '20px'}}>
        <Col>
          <Card.Footer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Total Amount: Rs. {totalAmount} <FaRupeeSign style={{fontSize: '1.2rem'}} /> 
            <Button variant="success" size="sm" onClick={()=>navigate('/checkout')} style={{fontSize: '1.2rem',marginLeft:"200px", fontWeight: 'bold'}}>Checkout</Button>
            </span>
          </Card.Footer>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
