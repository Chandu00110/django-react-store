import React,{useState } from 'react';
import api from '../api/axios';
import { postAPI } from '../api/fetchAPI';
import {Container,Row,Col,Card,Button,Nav} from 'react-bootstrap';
import Address from '../components/Address';
import CartItems from '../components/CartItems';
import Pricing from '../components/Pricing';
import '../styles/Cart.css';

const Cart = () => {
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState();
    const [loading,setLoading] = useState(true);
    const [show,setShow] = useState("Bag");
    const [total_price , setTotalPrice] = useState(0);

    const createPayment = async () => {
        try{
            const { data } = await postAPI("create-payment/",{
                amount : total_price
            });

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
        const res = await postAPI("store-payment/",
            {
                payment_id : response.razorpay_payment_id,
                order_id : response.razorpay_order_id,
                signature : response.razorpay_signature,
                amount : amount,
                address : selectedAddress
            }
        );
        if(res.status === 200){
            console.log("ok")
        }
    };

  return (
        <div>
            { !isCartEmpty && 
                <>
                <Nav variant="underline" className="justify-content-center mt-4 cart-nav">
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => setShow("Bag")}
                            className={show === "Bag" ? "active" : ""}
                        >
                            Bag
                        </Nav.Link>
                    </Nav.Item>

                    <span className="dots">...........................</span>

                    <Nav.Item>
                        <Nav.Link
                            className={show === "address" ? "active" : ""}
                        >
                            Address
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                   {show === "Bag" && (
                     <Container>
                        <Row style={{margin: '0px 150px'}} className='g-4'>
                            <Col className='mt-2'>
                                <CartItems loading={loading}
                                            setLoading={setLoading} 
                                            setIsCartEmpty={setIsCartEmpty}
                                            setTotalPrice={setTotalPrice}/>
                            </Col>
                            <Col className='mt-2'>
                                {!loading && <Pricing setShow={setShow} total_price={total_price}/>}
                            </Col>
                        </Row>
                
                    </Container>
                   )}

                   {show === "address" && (
                    <Container>
                        <Row style={{margin: '0px 150px'}} className='g-4'>
                            <Col className='mt-2'>
                                <Address selectedAddress={selectedAddress} 
                                            setSelectedAddress={setSelectedAddress} />
                            </Col>
                            <Col className='mt-2'>
                                <Pricing createPayment={createPayment} total_price={total_price}/>
                            </Col>
                        </Row>
                    </Container>
                   )}
                </>
            }
        </div>
    );
}

export default Cart