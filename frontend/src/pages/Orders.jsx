import React,{useEffect,useState} from 'react';
import api from '../api/axios';
import { Container,Card,Row,Col } from 'react-bootstrap';
import { MdAccessTime } from "react-icons/md";
import '../styles/Order.css'

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try{
            const res = await api.get('order/');
            setOrders(res.data.results);
        }
        catch(error){
            console.error("Error fetching orders",error.message)
        }
    };

    useEffect(() =>{
        fetchOrders();
    },[]);

    if(!orders){
        return <p>Loading ...</p>
    }

  return (
    <Container className='order-container'>
      <h2>My Orders</h2>
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
            (order.order_items.length !== 0 && 
              <Card className='orders-card'>
                <Row>
                  <Col sm={8} style={{borderRight:"1px solid black"}}>
                    <Card.Body className='d-flex align-items-center'>
                      <MdAccessTime className='fs-3 ms-2 me-3'/>
                      <div>
                        <Card.Title className='m-0'>{order.status}</Card.Title>
                        <span>{new Date(order.ordered_on).toLocaleDateString()}</span>
                      </div>
                    </Card.Body>
                    <div className='items d-flex'>
                      {order.order_items.map((item, index) => (
                          <div className='ms-4 me-4'>
                            <Card.Img variant="top" src={item.product_images[0].image} style={{height:"100px",width : "100px"}} />
                            <p>{item.product_name}</p>
                          </div>
                      ))}
                    </div>
                  </Col>

                  <Col className='mt-5'>
                    <p><b>Order ID:</b> CS0110-{order.id}</p>
                    <p><b>Total amount:</b> {order.total_amount}</p>
                    <button disabled>View Details</button>
                  </Col>
                </Row>
              </Card>
            )
        ))
      )}
  
    </Container>
  );
}

export default Orders