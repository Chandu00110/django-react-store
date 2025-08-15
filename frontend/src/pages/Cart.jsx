import React,{ useEffect,useState } from 'react';
import api from '../api/axios';
import {Container,Row,Col,Card,Badge,Button,Carousel} from 'react-bootstrap';
import { RxCross2 } from "react-icons/rx";
import { PiKeyReturnLight } from "react-icons/pi";
import '../styles/Cart.css';

const Cart = () => {

    const [cartItems,setCartItems] = useState([]);
    const [loading,setLoading] = useState(true);

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

    const createPayment = async () => {
        try{
            const { data } = await api.post("create-payment/",{
                amount : (totalPrice - discount)
            });

            console.log("Data === ",data.currecy);

            const options = {
                key : data.key,
                amount : data.amount,
                currency : data.currecy,
                name : "My E-commerce",
                description : "Order Payment",
                order_id : data.order_id,
                handler : function(response){
                    alert(`Payment Successfull! Payment ID : ${response.razorpay_payment_id}`);
                    storePayment(response,data.amount)
                },
                theme : { color : "#3399cc" }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }
        catch(error){
            console.error(error);
        }
    };

    const storePayment = async (response,amount) => {
        const res = await api.post("store-payment/",
            {
                payment_id : response.razorpay_payment_id,
                order_id : response.razorpay_order_id,
                signature : response.razorpay_signature,
                amount : amount
            }
        );
        if(res.status === 200){
            console.log("ok")
        }
    };

    useEffect(() => {
        fetchCart();
    },[]);

    if (loading) return <p>Loading cart...</p>;

  return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <Container>
                        <Row>
                            <Col>
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
                            <Col>
                                <Card className='cart_total'>
                                    <Card.Body>
                                        <Card.Title>PRICE DETAILS</Card.Title>
                                        <Card.Text>Total MRP - ₹{totalPrice.toFixed(2)}</Card.Text>
                                        <Card.Text>Discount on MRP - ₹{discount.toFixed(2)}</Card.Text>
                                        <hr />
                                        <Card.Text>Totla Amount - ₹{(totalPrice - discount).toFixed(2)}</Card.Text>
                                        <Button id="rzp-button1" onClick={createPayment}>Pay Now</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                
                    </Container>
                </>
            )}
        </div>
    );
}

export default Cart