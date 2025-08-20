import React from 'react';
import {Card,Button} from 'react-bootstrap';

const Pricing = (props) => {
    const totalPrice = props.total_price || 0;
    const discount = totalPrice - 1; 
  return (
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
            {props.setShow && 
                <Button onClick={() => props.setShow("address")}>Place Order</Button>
            }
            {props.createPayment && 
                <Button onClick={props.createPayment}>Pay now</Button>
            }
        </Card.Body>
    </Card>
  )
}

export default Pricing