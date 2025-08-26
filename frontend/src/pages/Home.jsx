import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Categories from './Categories';
import Products from './Products';


const Home = ({products,setProducts}) => {
  return (
    <Container fluid style={{ padding: "20px" }}>
      <Row>
        <Col sm="2"><Categories products={products} setProducts={setProducts} /></Col>
        <Col><Products products={products} setProducts={setProducts} /></Col>
      </Row>
    </Container>
  )
}

export default Home