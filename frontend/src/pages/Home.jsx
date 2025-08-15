import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Categories from './Categories';
import Products from './Products';


const Home = () => {
  return (
    <Container fluid style={{ padding: "20px" }}>
      <Row>
        <Col sm="2"><Categories /></Col>
        <Col><Products /></Col>
      </Row>
    </Container>
  )
}

export default Home