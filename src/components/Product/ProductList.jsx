import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../redux/slices/productSlice';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';
import Filters from './Filters';
import ProductCard from './ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.products);

  useEffect(() => {
    axios.get('http://localhost:5000/products').then((response) => {
      dispatch(setProducts(response.data));
    });
  }, []);

  return (
    <Row>
      <Col md={12} className="mb-2">
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={4} className="mb-4">
              {/* ProductCard component to display each product */}
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ProductList;