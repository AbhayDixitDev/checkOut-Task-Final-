
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, OverlayTrigger, Tooltip, Button, Image, Modal, ListGroup } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../reduxSlices/cartSlice'


const Desktop=()=> {
    const [items, setItems] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('http://localhost:4000/components?type=computer')
        .then(res=>res.data)
        .then(data=>setItems(data))
    }, [])
    const handleShowModal = (item) => {
        setSelectedItem({
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            type: item.type,
            category: item.category,
            publish_year: item.publish_year,
            model_number: item.model_number,
            technology: item.technology,
            version: item.version,
        })
        setShowModal(true)
    }
    const handleAddToCart = (item) => {
        const newitem = {...item, quantity: 1}
        console.log(newitem);
        dispatch(addToCart(newitem))
    }
    return (
        <>
            <Container fluid className='px-4 mt-4'>
                <Row className='g-4' xs={1} sm={2} md={3} lg={6}>
                    {items.map(item => (
                        <Col key={item.id} className="d-flex">
                            <Card style={{flex: '1 1 auto', border: '1px solid lightgray'}}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>{item.name}</Tooltip>}
                                >
                                    <Image src={item.image} style={{width: '100%', height: '150px'}} />
                                </OverlayTrigger>
                                <Card.Body>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Button variant="primary" size="sm" className="d-inline-block align-items-center me-2" onClick={()=>handleAddToCart(item)}><FaShoppingCart className="me-2" />Add to Cart</Button>
                                        <Button variant="secondary" size="sm" className="d-inline-block" onClick={()=>handleShowModal(item)}>View</Button>
                                    </div>
                                    <Card.Title style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.name} <br/> Rs. {item.price}</Card.Title>
                                    <Card.Text style={{overflowY: 'hidden', maxHeight: '50px'}}>
                                        <ul style={{listStyle: 'none', padding: 0}}>
                                            <li><b>Type:</b> {item.type}</li>
                                            <li><b>Category:</b> {item.category}</li>
                                            <li><b>Publish Year:</b> {item.publish_year}</li>
                                            <li><b>Model Number:</b> {item.model_number}</li>
                                            <li><b>Technology:</b> {item.technology}</li>
                                            <li><b>Version:</b> {item.version}</li>
                                        </ul>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Modal show={showModal} onHide={()=>setShowModal(false)} style={{maxWidth: '1000px'}}>
                <Modal.Header closeButton style={{border: 'none', backgroundColor: 'white'}}>
                    <Modal.Title style={{display: 'flex', justifyContent: 'center', color: 'black'}}>{selectedItem && selectedItem.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: 'white'}}>
                    <Image src={selectedItem && selectedItem.image} style={{width: '80%', height: '100px', display: 'block', margin: '0 auto'}} />
                    <Row className="g-0 mt-4">
                        <Col xs={12} className="d-flex flex-column">
                            <ListGroup variant="flush">
                                {selectedItem && Object.entries(selectedItem).map(([key, value]) => (
                                    <ListGroup.Item key={key} style={{borderBottom: '1px solid lightgray'}}>
                                        <b>{key}:</b> {value}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer style={{border: 'none', justifyContent: 'center', backgroundColor: 'white'}}>
                    <Button variant="secondary" onClick={()=>setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Desktop