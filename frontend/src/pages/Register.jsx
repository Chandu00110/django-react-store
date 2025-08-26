import React,{useState} from 'react';
import api from '../api/axios';
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const Register = () => {

    const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
        const response = await api.post('register/',formData);
        setMessage("Registertion successful! You can now log in.");
    } catch (err) {
        if(err.response && err.response.data){
            MdNoEncryptionGmailerrorred(err.response.data.detail || "something went wrong");
        } else{
            setError("An unexpected error occurred. Please try again later.");
        }
    }
  };

  return (
    <Container className='mt-5'>
        <Row className='justify-content-md-center'>
            <Col md={6}>
                <h2 className="mb-4">Register</h2>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group className='mb-3' controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' name='email' value={formData.email}
                                onChange={handleChange} placeholder='Enter email' required />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>password</Form.Label>
                        <Form.Control type='password' name='password' value={formData.password}
                                onChange={handleChange} placeholder='Enter password' required />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password2'>
                        <Form.Label>Confirm pasword</Form.Label>
                        <Form.Control type='password' name='password2' value={formData.password2}
                                onChange={handleChange} placeholder='Enter password' required />
                    </Form.Group>
                    
                    <Form.Group className='mb-3' controlId='first_name'>
                        <Form.Label>first_name</Form.Label>
                        <Form.Control type='text' name='first_name' value={formData.first_name}
                                onChange={handleChange} placeholder='Enter firstname' required />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='last_name'>
                        <Form.Label>last_name</Form.Label>
                        <Form.Control type='text' name='last_name' value={formData.last_name}
                                onChange={handleChange} placeholder='Enter lastname' required />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100"> Register </Button>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default Register;