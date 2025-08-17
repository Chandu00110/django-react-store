import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";

const VerifyEmail = () => {
    const { uid, token } = useParams();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyEmail = async () => {
            try{
                const res = await api.get(`verify-email/${uid}/${token}/`);
                setMessage(res.data.message);
            } catch(err){
                if (err.response && err.response.data.error) {
                    setError(err.response.data.error);
                } else {
                    setError("Verification failed. Please try again.");
                }
            }
            finally {
                setLoading(false);
            }
        };

        verifyEmail();
    },[uid,token]);

  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          {loading ? (
            <Spinner animation="border" />
          ) : message ? (
            <Alert variant="success">{message}</Alert>
          ) : (
            <Alert variant="danger">{error}</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default VerifyEmail