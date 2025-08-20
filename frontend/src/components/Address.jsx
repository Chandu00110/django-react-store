import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Modal } from "react-bootstrap";
import api from '../api/axios';
import fetchAPI from '../api/fetchAPI';
import { postAPI } from '../api/fetchAPI';

const Address = ({selectedAddress,setSelectedAddress}) => {
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchAddresses = async () => {
        try {
            const res = await fetchAPI(`shippingAddress/`);
            
            if (res.status === 200) {
              const fetchedAddresses = res.data.results;
              setAddresses(fetchedAddresses);
              const defaultAddr = fetchedAddresses.find(addr => addr.is_default);
              if (defaultAddr) setSelectedAddress(defaultAddr.id);
            } else {
            console.error("Error fetching categories:", res.status, res.statusText);
            }
        } catch (err) {
            console.error("Network or server error while fetching categories:", err);
        }
    };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setStoreAddress({
      ...storeAddress,
      [e.target.name]: e.target.value
    });
  };

  const postAddress = async () => {
    const res = await postAPI("shippingAddress/", storeAddress);
    if (res.status === 201) {
      setMessage("Address added successfully!");
      setShow(false);
      setAddresses([...addresses, res.data]);
      setSelectedAddress(res.data.id);
    }
  };

  const AddressCard = ({ addr }) => (
    <Card
      className={`mb-3 p-3 address-card ${selectedAddress === addr.id ? 'border-primary' : ''}`}
      onClick={() => setSelectedAddress(addr.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className='d-flex align-items-center'>
        <Form.Check
          type="radio"
          name="address"
          value={addr.id}
          onChange={(e) => setSelectedAddress(addr.id)}
          checked={selectedAddress === addr.id}
          className="me-3"
        />
        <div>
          <Card.Text className="text-muted">
            {addr.adderss_line_1}, {addr.city}, {addr.state}, {addr.postal_code}, {addr.country}
          </Card.Text>
          <Card.Text className="text-muted">
            {addr.phone_number}
          </Card.Text>
        </div>
      </div>
    </Card>
  );

  return (
    <Container style={{ maxWidth: "700px", marginTop: "2rem" }}>
      <h4 className="mb-4">Select Delivery Address</h4>
      <Form>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <h5 className="text-secondary">Default Address</h5>
        {addresses.filter(addr => addr.is_default).length === 0 ? (
          <Alert variant="warning">No default address found.</Alert>
        ) : (
          addresses
            .filter(addr => addr.is_default)
            .map(addr => <AddressCard key={addr.id} addr={addr} />)
        )}

        <h5 className="text-secondary mt-4">Other Addresses</h5>
        {addresses.filter(addr => !addr.is_default).length === 0 ? (
          <Alert variant="warning">No other addresses found.</Alert>
        ) : (
          addresses
            .filter(addr => !addr.is_default)
            .map(addr => <AddressCard key={addr.id} addr={addr} />)
        )}

        <Button className='mt-3' variant="outline-secondary" onClick={handleShow}>
          + Add New Address
        </Button>
      </Form>

      {/* Add Address Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              { label: "Address Line 1", name: "adderss_line_1", placeholder: "Enter address line 1" },
              { label: "Address Line 2", name: "address_line_2", placeholder: "Enter address line 2" },
              { label: "City", name: "city", placeholder: "Enter city" },
              { label: "State", name: "state", placeholder: "Enter state" },
              { label: "Postal Code", name: "postal_code", placeholder: "Enter postal code" },
              { label: "Country", name: "country", placeholder: "Enter country" },
              { label: "Phone Number", name: "phone_number", placeholder: "Enter phone number", type: "number" },
            ].map(({ label, name, placeholder, type = "text" }) => (
              <Form.Group className="mb-3" controlId={name} key={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={postAddress}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Address;
