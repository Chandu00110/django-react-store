import React,{ useEffect,useState } from 'react';
import api from '../api/axios';
import {Container,Row,Col,Card,Badge,Button,Carousel,Nav} from 'react-bootstrap';
import { RxCross2 } from "react-icons/rx";
import { PiKeyReturnLight } from "react-icons/pi";
import Address from './Address';
import '../styles/Cart.css';

const Cart = () => {

    const [cartItems,setCartItems] = useState([]);
    const [loading,setLoading] = useState(true);
    const [show,setShow] = useState("address");

    const fetchCart = async () => {
        try{
            const data = await api.get("cartItems/");
            if(data){
                setCartItems(data.data.results);
            }
        }
        catch(error) {
            if(error.response?.status === 401 ){
                alert("Please log in to view you cart");
            } else {
                alert("Error loading Cart.");
            }
        }
        finally {
            setLoading(false);
        }
    };

    const hadndleRemove = async (itemId) => {
        if(!window.confirm("Remove this item from your cart?")) return;
        try{
            await api.delete(`cartItems/${itemId}/`);
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (err) {
            console.error("Error removing item:",err.response?.data || err.message);
            throw err;
        }
    };

    const totalPrice = cartItems.reduce(
        (total,item) => total + item.product_price * item.quantity,
        0
    );

    const discount = totalPrice - 1;

    useEffect(() => {
        fetchCart();
    },[]);

    if (loading) return <p>Loading cart...</p>;

  return (
        <div>
            <Nav variant="underline" className="justify-content-center mt-4" activeKey="/home">
                <Nav.Item>
                    <Nav.Link>Bag</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Address</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Payment</Nav.Link>
                </Nav.Item>
            </Nav>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                   {show === "Bag" && (
                     <Container>
                        <Row style={{margin: '0px 150px'}} className='g-4'>
                            <Col className='mt-2'>
                                {cartItems.map(item => (
                                    <Card className='cart-card' key={item.id}>
                                       <div className="item-images">
                                            <Carousel fade controls={false} indicators={false}>
                                                {item.product_images.map((image) =>(
                                                    <Carousel.Item>
                                                        <Card.Img variant="top" className="" src={image.image} alt={item.name} />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                       </div>
                                        <Card.Body>
                                            <Card.Title>{item.product_name}</Card.Title>
                                            <Card.Text>QTY × {item.quantity}</Card.Text>
                                            <Card.Text>₹{item.subtotal}</Card.Text>
                                            <span><PiKeyReturnLight className='return-icon'/><b>14 days</b> return available</span>
                                            <Badge onClick={() => hadndleRemove(item.id)} bg="danger"><RxCross2 /></Badge>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Col>
                            <Col className='mt-2'>
                                <Card className='cart_total'>
                                    <Card.Body className='d-grid gap-2'>
                                        <Card.Title className='mb-2'>PRICE DETAILS</Card.Title>
                                        <Card.Text className='cart_total_text'> 
                                            <span>Total MRP</span>
                                            <span>₹{totalPrice.toFixed(2)}</span>
                                        </Card.Text>
                                        <Card.Text className='cart_total_text'>
                                            <span>Discount on MRP</span>
                                            <span>₹{discount.toFixed(2)}</span>
                                        </Card.Text>
                                        <hr />
                                        <Card.Text className='cart_total_text fw-bold'>
                                             <span>Total Amount</span>
                                            <span>₹{(totalPrice - discount).toFixed(2)}</span>
                                        </Card.Text>
                                        <Button href='/checkout/'>Place Order</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                
                    </Container>
                   )}

                   {show === "address" && (
                    <Address />
                   )}
                </>
            )}
        </div>
    );
}

export default Cart