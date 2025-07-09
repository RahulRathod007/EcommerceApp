import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts,
  setFilters,
  setSort,
  setSearchQuery,
  loadMore,
} from '../../redux/slices/productSlice';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from './SearchBar';
import Filters from './Filters';
import ProductCard from './ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const { filteredProducts, visibleCount } = useSelector((state) => state.products);

  // Load products from API
  useEffect(() => {
    axios.get('http://localhost:5000/products').then((response) => {
      dispatch(setProducts(response.data));
    });
  }, [dispatch]);

  // Handlers for Filters, Sort, Search
  const handleFilterChange = (filters) => {
    dispatch(setFilters(filters));
  };

  const handleSortChange = (sortValue) => {
    dispatch(setSort(sortValue));
  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  return (
    <Container>
      <Filters onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

      <Row>
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {visibleCount < filteredProducts.length && (
        <div className="text-center mb-4">
          <Button variant="primary" onClick={() => dispatch(loadMore())}>
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ProductList;
