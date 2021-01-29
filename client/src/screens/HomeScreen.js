import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get('/api/products');

      setProducts(data);
    };

    fetchproducts();
  }, []);

  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product, index) => (
          <Col key={index} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
        <Col></Col>
      </Row>
    </>
  );
};

export default HomeScreen;
