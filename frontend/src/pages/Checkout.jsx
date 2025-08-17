import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Form, Button, Alert, Card,Modal } from "react-bootstrap";
import api from '../api/axios';

const Checkout = () => {
    const [addresses, setAddresses] = useState([]);
    const [storeAddress, setStoreAddress] = useState({
        adderss_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone_number: "",
    });
    const [selectedAddress, setSelectedAddress] = useState();
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            try{
                const response = await api.get('shippingAddress/');
                setAddresses(response.data.results);
                response.data.results.map((addr) => {
                    if(addr.is_default) {
                        setSelectedAddress(addr.id);
                    }
                });
            }catch(error){
                setError("Failed to load addresses. Please log in.");
            }
        }

        fetchAddresses();
    },[]);

    const createPayment = async () => {
        try{
            const { data } = await api.post("create-payment/",{
                amount : 500
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
                amount : amount,
                address : selectedAddress
            }
        );
        if(res.status === 200){
            console.log("ok")
        }
    };

    const handleChange = (e) => {
    setStoreAddress({
        ...storeAddress,
        [e.target.name]:e.target.value
    });
  };

  const postAddress = async () => {
    console.log("Store Address === ",storeAddress);
    const res = await api.post("shippingAddress/",storeAddress);
    if(res.status === 201){
        setMessage("Address added successfully!");
        setShow(false);
        setAddresses([...addresses, res.data]);
        setSelectedAddress(res.data.id);
    }
  };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if(!selectedAddress){
            setError("Please select a shipping address.");
            return;
        }

    };

  return (
    <Container>
        <h1 className="text-center my-4">Checkout Page</h1>
        <Row>
        <Col md={8}>
          <h2>Checkout</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Shipping Address */}
            <Card className="mb-3 p-3">
              <h5>Shipping Address</h5>
              {addresses.length === 0 ? (
                <Alert variant="warning">No addresses found. Please add one in your profile.</Alert>
              ) : (
                addresses.map((addr) => (
                  <Form.Check
                    key={addr.id}
                    type="radio"
                    label={`${addr.adderss_line_1}, ${addr.city}, ${addr.postal_code}`}
                    name="address"
                    value={addr.id}
                    onChange={(e) => setSelectedAddress(addr.id)}
                    checked={selectedAddress === addr.id}
                  />
                ))
              )}
              <Button className='mt-3' bg="secondary" onClick={handleShow}>Add Address</Button>
            </Card>

            {/* Payment Method */}
            <Card className="mb-3 p-3">
              <h5>Payment Method</h5>
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="UPI"
                name="payment"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Card>

            {paymentMethod === "COD" &&
                <Button variant="primary" type="submit" className="w-100">
                    Place Order
                </Button>
            }

            {paymentMethod === "UPI" &&
                <Button variant="primary" onClick={createPayment} className="w-100" id="rzp-button1">
                    Pay Now
                </Button>
            }

          </Form>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered >
        <Modal.Header closeButton>
            <Modal.Title>Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="address1">
                        <Form.Label>Address 1</Form.Label>
                        <Form.Control type="text" name='adderss_line_1' onChange={handleChange} placeholder="enter the address 1" autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address2" >
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control type="text" name='address_line_2' onChange={handleChange} placeholder="enter the address 1" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city" >
                        <Form.Label>city</Form.Label>
                        <Form.Control type="text" name='city' onChange={handleChange} placeholder="enter the city" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="state" >
                        <Form.Label>state</Form.Label>
                        <Form.Control type="text" name='state' onChange={handleChange} placeholder="enter the state" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalcode" >
                        <Form.Label>postalcode</Form.Label>
                        <Form.Control type="text" name='postal_code' onChange={handleChange} placeholder="enter the postalcode" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country" >
                        <Form.Label>country</Form.Label>
                        <Form.Control type="text" name='country' onChange={handleChange} placeholder="enter the country" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone_number" >
                        <Form.Label>phonenumber</Form.Label>
                        <Form.Control type="number" name='phone_number' onChange={handleChange} placeholder="enter the phonenumber" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={postAddress}>submit</Button>
            </Modal.Footer>
        </Modal>
    </Container>
  )
}

export default Checkout;
