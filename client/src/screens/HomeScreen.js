import React from 'react';
import { Col, Row } from 'react-bootstrap';
import products from '../products';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3>{product.name}</h3>
          </Col>
        ))}
        <Col></Col>
      </Row>
    </>
  );
};

export default HomeScreen;
